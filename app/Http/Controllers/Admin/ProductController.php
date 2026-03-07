<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductTag;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        $products = $this->productService->getPaginated(10);
        
        return Inertia::render('admin/product-management/index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $productTags = ProductTag::all();
        
        return Inertia::render('admin/product-management/create', [
            'productTags' => $productTags
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'tag_id' => 'required|exists:product_tags,id',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|in:percentage,fixed',
            'stock_level' => 'required|integer|min:0',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $images = $request->file('images', []);
        $product = $this->productService->create($validated, $images);

        return redirect()
            ->route('admin.pm.index')
            ->with('success', 'Product created successfully!');
    }

    public function show(int $id)
    {
        $product = $this->productService->getById($id);
        
        return Inertia::render('admin/product-management/show', [
            'product' => $product
        ]);
    }

    public function edit(int $id)
    {
        $product = $this->productService->getById($id);
        $productTags = ProductTag::all();
        
        return Inertia::render('admin/product-management/edit', [
            'product' => $product,
            'productTags' => $productTags
        ]);
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'tag_id' => 'required|exists:product_tags,id',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|in:percentage,fixed',
            'stock_level' => 'required|integer|min:0',
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $images = $request->file('images', []);
        $product = $this->productService->getById($id);
        $this->productService->update($product, $validated, $images);

        return redirect()
            ->route('admin.pm.index')
            ->with('success', 'Product updated successfully!');
    }

    public function setPrimaryImage(Request $request, int $productId, int $imageId)
    {
        $product = $this->productService->getById($productId);
        $this->productService->setPrimaryImage($product, $imageId);

        return redirect()
            ->route('admin.products.edit', $productId)
            ->with('success', 'Primary image updated successfully!');
    }

    public function removeImage(Request $request, int $productId, int $imageId)
    {
        $product = $this->productService->getById($productId);
        $this->productService->removeImage($product, $imageId);

        return redirect()
            ->route('admin.products.edit', $productId)
            ->with('success', 'Image removed successfully!');
    }

    public function destroy(int $id)
    {
        $product = $this->productService->getById($id);
        $this->productService->delete($product);

        return redirect()
            ->route('admin.pm.index')
            ->with('success', 'Product deleted successfully!');
    }
}
