<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected Cart $model,
        protected CartItem $cartItem,
        protected Product $product
    ) {
    }

    public function getAllDatas()
    {
        $cart = $this->model
            ->with(['items.product.images' => function ($query) {
                $query->orderBy('is_primary', 'desc')->orderBy('id', 'asc');
            }])
            ->when(auth('web')->check(), function ($query) {
                $query->where('user_id', auth('web')->id());
            }, function ($query) {
                $query->where('session_id', session()->getId());
            })
            ->first();

        return [
            'cart' => $cart,
            'cartItems' => $cart?->items ?? [],
        ];
    }

    public function addToCart(array $data)
    {
        if (Auth::guard('web')->check()) {
            $cart = $this->model::firstOrCreate(['user_id' => Auth::guard('web')->id()]);
        } else {
            $sessionId = session()->getId();
            $cart = $this->model::firstOrCreate(['session_id' => $sessionId]);
        }

        $product = $this->product::findOrFail($data['product_id']);

        $cartItem = $this->cartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $data['quantity'] ?? 1);
        } else {
            $this->cartItem::create([
                'cart_id'      => $cart->id,
                'product_id'   => $product->id,
                'product_name' => $product->title,
                'quantity'     => $data['quantity'] ?? 1,
            ]);
        }

        return true;
    }

    public function updateCartItem(array $data)
    {
        $cartItem = $this->cartItem::findOrFail($data['cart_item_id']);
        
        if (Auth::guard('web')->check()) {
            $cart = $this->model::where('user_id', Auth::guard('web')->id())->first();
        } else {
            $cart = $this->model::where('session_id', session()->getId())->first();
        }
        
        if (!$cart || $cartItem->cart_id !== $cart->id) {
            throw new \Exception('Cart item not found');
        }
        
        $cartItem->update(['quantity' => $data['quantity']]);
        return true;
    }

    public function removeCartItem($id)
    {
        $cartItem = $this->cartItem::findOrFail($id);
        
        if (Auth::guard('web')->check()) {
            $cart = $this->model::where('user_id', Auth::guard('web')->id())->first();
        } else {
            $cart = $this->model::where('session_id', session()->getId())->first();
        }
        
        if (!$cart || $cartItem->cart_id !== $cart->id) {
            throw new \Exception('Cart item not found');
        }
        
        $cartItem->delete();
        return true;
    }

public function authCheck(string $sessionId = null)
{
    if (Auth::guard('web')->check()) {

        $user = Auth::guard('web')->user();

        $sessionId = $sessionId ?? session()->getId();

        $guestCarts = $this->model::with('items')
            ->where('session_id', $sessionId)
            ->get();


        if ($guestCarts->isEmpty()) {
            return false;
        }

        $userCart = $this->model::firstOrCreate([
            'user_id' => $user->id
        ]);

        foreach ($guestCarts as $guestCart) {
            foreach ($guestCart->items as $guestItem) {

                $existingItem = $this->cartItem::where('cart_id', $userCart->id)
                    ->where('product_id', $guestItem->product_id)
                    ->first();

                if ($existingItem) {
                    $existingItem->increment('quantity', $guestItem->quantity);
                } else {
                    $guestItem->update(['cart_id' => $userCart->id]);
                }
            }

            $guestCart->delete();
        }

        return true;
    }

    return false;
}
}
