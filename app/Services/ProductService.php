<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class ProductService
{
    public function create(array $productData, array $images = []): Product
    {
        $productData['created_by'] = Auth::id();
        $productData['updated_by'] = Auth::id();
        
        $product = Product::create($productData);
        
        if (!empty($images)) {
            $this->attachImages($product, $images);
        }
        
        return $product;
    }

    public function update(Product $product, array $productData, array $images = []): Product
    {
        $productData['updated_by'] = Auth::id();
        
        $product->update($productData);
        
        if (!empty($images)) {
            $this->attachImages($product, $images);
        }
        
        return $product;
    }

    public function attachImages(Product $product, array $images): void
    {
        foreach ($images as $index => $image) {
            if ($image instanceof UploadedFile) {
                $path = $image->store('products', 'public');
                
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => $path,
                    'is_primary' => $index === 0, // First image is primary
                    'created_by' => Auth::id(),
                    'updated_by' => Auth::id(),
                ]);
            }
        }
    }

    public function setPrimaryImage(Product $product, int $imageId): void
    {
        // Reset all images to non-primary
        $product->images()->update(['is_primary' => false]);
        
        // Set the specified image as primary
        $product->images()->where('id', $imageId)->update(['is_primary' => true]);
    }

    public function removeImage(Product $product, int $imageId): void
    {
        $image = $product->images()->findOrFail($imageId);
        
        // Delete file from storage
        if ($image->image && Storage::disk('public')->exists($image->image)) {
            Storage::disk('public')->delete($image->image);
        }
        
        $image->delete();
    }

    public function delete(Product $product): bool
    {
        // Delete all associated images
        foreach ($product->images as $image) {
            if ($image->image && Storage::disk('public')->exists($image->image)) {
                Storage::disk('public')->delete($image->image);
            }
            $image->delete();
        }
        
        return $product->delete();
    }

    public function getAll()
    {
        return Product::with('images')->latest()->get();
    }

    public function getById(int $id): Product
    {
        return Product::with('images')->findOrFail($id);
    }

    public function getPaginated(int $perPage = 10)
    {
        return Product::with('images')->latest()->paginate($perPage);
    }

    public function updateQuantity(Product $product, int $quantity): Product
    {
        $product->update([
            'quantity' => $quantity,
            'updated_by' => Auth::id(),
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
