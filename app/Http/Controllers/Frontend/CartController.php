<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Services\CartService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    protected CartService $cartService;
    protected ProductService $productService;

    public function __construct(CartService $cartService, ProductService $productService)
    {
        $this->cartService = $cartService;
        $this->productService = $productService;
    }
    public function index(): Response
    {
        $data = $this->cartService->getAllDatas();

        return Inertia::render('frontend/product-card', $data);
    }
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'integer|min:1',
        ]);

        try {
            $this->cartService->addToCart($request->all());
            return redirect()->back()->with('success', 'Product added to cart successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to add product to cart. Please try again.');
        }
    }
    public function update(Request $request)
    {
        $request->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        try {
            $this->cartService->updateCartItem($request->all());
            return redirect()->back()->with('success', 'Cart updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update cart. Please try again.');
        }
    }

    public function remove($id)
    {
        try {
            $this->cartService->removeCartItem($id);
            return redirect()->back()->with('success', 'Item removed from cart successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to remove item from cart. Please try again.');
        }
    }
}
