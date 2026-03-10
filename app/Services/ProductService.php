<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductImage;
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
