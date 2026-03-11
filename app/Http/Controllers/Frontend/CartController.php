<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('frontend/product-card');
    }
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'integer|min:1',
        ]);

        
        try {
            if (auth()->check()) {
                $cart = Cart::firstOrCreate(['user_id' => auth()->id()]);
            } else {
                $sessionId = session()->getId();
                $cart = Cart::firstOrCreate(['session_id' => $sessionId]);
            }

            $product = Product::findOrFail($request->product_id);

            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $product->id)
                ->first();

            if ($cartItem) {
                $cartItem->increment('quantity', $request->quantity ?? 1);
            } else {
                CartItem::create([
                    'cart_id'      => $cart->id,
                    'product_id'   => $product->id,
                    'product_name' => $product->title,
                    'quantity'     => $request->quantity ?? 1,
                ]);
            }

            return redirect()->back()->with('success', 'Product added to cart successfully!');
            
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to add product to cart. Please try again.');
        }
    }
}
