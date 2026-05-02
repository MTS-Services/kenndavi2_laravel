<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductTag;
use App\Services\FeedbackService;
use App\Services\ProductService;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected ProductService $productService;
    protected FeedbackService $feedbackService;

    public function __construct(ProductService $productService, FeedbackService $feedbackService)
    {
        $this->productService = $productService;
        $this->feedbackService = $feedbackService;
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
        $productTags = ProductTag::where('status', 'active')->get();

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
        $product        = $this->productService->getById($id);
        $calculatedData = $this->productService->getProductCalculatedData($product);
        $page        = (int) request()->get('feedback_page', 1);
        $feedbackData = $this->feedbackService->getFeedbacksByProductId($id, 10, $page);
        $frontendUrl = route('frontend.product-details', ['id' => $id]);
        return Inertia::render('admin/product-management/details', [
            'product'          => $product,
            'calculated'       => $calculatedData,
            'feedbacks'        => $feedbackData['feedbacks'],
            'rating_breakdown' => $feedbackData['rating_breakdown'],
            'average_rating'   => $feedbackData['average_rating'],
            'total_reviews'    => $feedbackData['total_reviews'],
            'pagination'       => $feedbackData['pagination'],
            'frontendUrl'      => $frontendUrl,
        ]);
    }

    public function edit(int $id)
    {
        $product = $this->productService->getById($id);
        $productTags = ProductTag::where('status', 'active')->get();


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

    public function delete(int $id)
    {
        $product = $this->productService->getById($id);
        $this->productService->delete($product);

        return redirect()
            ->route('admin.pm.index')
            ->with('success', 'Product deleted successfully!');
    }
}
