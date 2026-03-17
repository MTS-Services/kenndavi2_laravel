<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductImage;
use App\Enums\ProductDiscountType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class ProductService
{
    public function __construct(
        protected Product $model,
        protected ProductImage $productImage
    ) {}

    public function getAll()
    {
        return $this->model::with(['images', 'tag'])->latest()->get();
    }

    public function getById(int $id): Product
    {
        return $this->model::with(['images', 'tag'])->findOrFail($id);
    }

    public function getDiscountPrice(Product $product): float
    {
        $price = (float) $product->price;
        $discount = (float) ($product->discount ?? 0);
        $discountType = $product->discount_type ?? ProductDiscountType::PERCENTAGE;
        
        if ($discount <= 0) {
            return $price;
        }
        
        return match($discountType) {
            ProductDiscountType::PERCENTAGE => $price - ($price * $discount / 100),
            ProductDiscountType::FIXED => max(0, $price - $discount),
            default => $price
        };
    }

    public function getTotalPrice(Product $product, int $quantity = 1): float
    {
        return $this->getDiscountPrice($product) * $quantity;
    }

    public function getDiscountAmount(Product $product): float
    {
        $price = (float) $product->price;
        $discount = (float) ($product->discount ?? 0);
        $discountType = $product->discount_type ?? ProductDiscountType::PERCENTAGE;
        
        if ($discount <= 0) {
            return 0;
        }
        
        return match($discountType) {
            ProductDiscountType::PERCENTAGE => $price * $discount / 100,
            ProductDiscountType::FIXED => min($discount, $price),
            default => 0
        };
    }

    public function getFormattedPrice(float $price): string
    {
        return '$' . number_format($price, 2);
    }

    public function getFormattedDiscount(Product $product): string
    {
        $discount = (float) ($product->discount ?? 0);
        $discountType = $product->discount_type ?? ProductDiscountType::PERCENTAGE;
        
        if ($discount <= 0) {
            return '';
        }
        
        return match($discountType) {
            ProductDiscountType::PERCENTAGE => $discount . '% ',
            ProductDiscountType::FIXED => '$' . number_format($discount, 2),
            default => ''
        };
    }

    public function hasDiscount(Product $product): bool
    {
        return !empty($product->discount) && (float) $product->discount > 0;
    }

    public function getStockStatus(Product $product): string
    {
        $stock = (int) ($product->stock_level ?? 0);
        
        return match(true) {
            $stock <= 0 => 'out_of_stock',
            $stock <= 5 => 'low_stock',
            default => 'in_stock'
        };
    }

    public function getStockStatusText(Product $product): string
    {
        return match($this->getStockStatus($product)) {
            'out_of_stock' => 'Out of Stock',
            'low_stock' => 'Low Stock',
            'in_stock' => 'In Stock',
            default => 'Unknown'
        };
    }

    public function canAddToCart(Product $product, int $quantity = 1): bool
    {
        return (int) ($product->stock_level ?? 0) >= $quantity;
    }

    public function getShippingCost(): float
    {
        $shippingCost = \App\Models\ShippingCost::latest()->first();
        return $shippingCost ? (float) $shippingCost->cost : 20.00;
    }

    public function getProductCalculatedData(Product $product, int $quantity = 1): array
    {
        $originalPrice = (float) $product->price;
        $discountValue = (float) ($product->discount ?? 0);
        $discountType = $product->discount_type ?? ProductDiscountType::PERCENTAGE;
        $discountedPrice = $this->getDiscountPrice($product);
        $discountAmount = $this->getDiscountAmount($product);
        
        return [
            'original_price' => $originalPrice,
            'discount_value' => $discountValue,
            'discount_type' => $discountType->value,
            'discount_amount' => $discountAmount,
            'discounted_price' => $discountedPrice,
            'total_price' => $discountedPrice * $quantity,
            'formatted_original_price' => $this->getFormattedPrice($originalPrice),
            'formatted_discounted_price' => $this->getFormattedPrice($discountedPrice),
            'formatted_discount' => $this->getFormattedDiscount($product),
            'has_discount' => $this->hasDiscount($product),
            'stock_status' => $this->getStockStatus($product),
            'stock_status_text' => $this->getStockStatusText($product),
            'can_add_to_cart' => $this->canAddToCart($product, $quantity),
            'stock_level' => (int) ($product->stock_level ?? 0),
        ];
    }

    public function getPaginated(int $perPage = 10)
    {
        return $this->model::with(['images', 'tag'])->latest()->paginate($perPage);
    }

    public function create(array $productData, array $images = []): Product
    {
        $productData['created_by'] = Auth::id();

        $product = $this->model::create($productData);

        if (!empty($images)) {
            $this->attachImages($product, $images);
        }

        return $product;
    }

    public function update(Product $product, array $productData, array $images = []): Product
    {
        $productData['updated_by'] = auth('admin')->id();

        $product->update($productData);

        if (!empty($images)) {
            $this->updateImages($product, $images);
        }

        return $product;
    }

    public function updateImages(Product $product, array $images): void
    {
        foreach ($images as $index => $image) {
            if ($image instanceof UploadedFile) {
                $existingImage = $product->images()->skip($index)->first();

                if ($existingImage) {
                    if ($existingImage->image && Storage::disk('public')->exists($existingImage->image)) {
                        Storage::disk('public')->delete($existingImage->image);
                    }

                    $path = $image->store('products', 'public');
                    $existingImage->update([
                        'image' => $path,
                        'updated_by' => auth('admin')->id(),
                    ]);
                } else {
                    $path = $image->store('products', 'public');

                    $this->productImage->create([
                        'product_id' => $product->id,
                        'image' => $path,
                        'is_primary' => $index === 0 && $product->images()->count() === 0,
                        'created_by' => auth('admin')->id(),
                        'updated_by' => auth('admin')->id(),
                    ]);
                }
            }
        }
    }

    public function attachImages(Product $product, array $images): void
    {
        foreach ($images as $index => $image) {
            if ($image instanceof UploadedFile) {
                $path = $image->store('products', 'public');

                $this->productImage->create([
                    'product_id' => $product->id,
                    'image' => $path,
                    'is_primary' => $index === 0,
                    'created_by' => auth('admin')->id(),
                    'updated_by' => auth('admin')->id(),
                ]);
            }
        }
    }

    public function setPrimaryImage(Product $product, int $imageId): void
    {
        $this->productImage->where('product_id', $product->id)->update(['is_primary' => false]);
        $this->productImage->where('id', $imageId)->update(['is_primary' => true]);
    }

    public function removeImage(Product $product, int $imageId): void
    {
        $image = $this->productImage->where('product_id', $product->id)->findOrFail($imageId);


        if ($image->image && Storage::disk('public')->exists($image->image)) {
            Storage::disk('public')->delete($image->image);
        }

        $image->delete();
    }

    public function delete(Product $product): bool
    {

        foreach ($this->productImage->where('product_id', $product->id)->get() as $image) {
            if ($image->image && Storage::disk('public')->exists($image->image)) {
                Storage::disk('public')->delete($image->image);
            }
            $image->delete();
        }

        return $product->delete();
    }



    public function updateQuantity(Product $product, int $quantity): Product
    {
        $product->update([
            'quantity' => $quantity,
            'updated_by' => auth('admin')->id(),
        ]);

        return $product;
    }

    public function search(string $query)
    {
        return Product::where('title', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->orWhere('tag', 'like', "%{$query}%")
            ->with('images')
            ->latest()
            ->get();
    }
}
