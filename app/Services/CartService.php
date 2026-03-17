<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class CartService
{
    public function __construct(
        protected Cart $model,
        protected CartItem $cartItem,
        protected Product $product
    ) {}

    public function getAllDatas(): array
    {
        $cart = $this->model
            ->with([
                'items.product.images' => function ($query) {
                    $query->orderBy('is_primary', 'desc')->orderBy('id', 'asc');
                },
            ])
            ->when(auth('web')->check(), function ($query) {
                $query->where('user_id', auth('web')->id());
            }, function ($query) {
                $query->where('session_id', session()->getId());
            })
            ->first();

        $cartItems = $cart ? $cart->items->map(function ($cartItem) {
            if ($cartItem->product) {
                $cartItem->calculated = $this->calculateItemData(
                    $cartItem->product,
                    $cartItem->quantity
                );
            }
            return $cartItem;
        }) : collect();

        return [
            'cart'      => $cart,
            'cartItems' => $cartItems,
        ];
    }

    public function addToCart(array $data): bool
    {
        if (Auth::guard('web')->check()) {
            $cart = $this->model::firstOrCreate(
                ['user_id' => Auth::guard('web')->id()],
                [
                    'creater_type' => User::class,
                    'creater_id'   => Auth::guard('web')->id(),
                ]
            );
        } else {
            $cart = $this->model::firstOrCreate(
                ['session_id' => session()->getId()],
                [
                    'creater_type' => null,
                    'creater_id'   => null,
                ]
            );
        }

        $product  = $this->product::findOrFail($data['product_id']);
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
                'creater_type' => User::class,
                'creater_id'   => Auth::guard('web')->check() ? Auth::guard('web')->id() : null,
            ]);
        }

        return true;
    }

    // public function addToCart(array $data): bool
    // {
    //     if (Auth::guard('web')->check()) {
    //         $cart = $this->model::firstOrCreate([
    //             'user_id'      => Auth::guard('web')->id(),
    //             'creater_type' => User::class,
    //             'creater_id'   => Auth::guard('web')->id(),
    //         ]);
    //     } else {
    //         $cart = $this->model::firstOrCreate([
    //             'session_id'   => session()->getId(),
    //             'creater_type' => null,
    //             'creater_id'   => null,
    //         ]);
    //     }

    //     $product  = $this->product::findOrFail($data['product_id']);
    //     $cartItem = $this->cartItem::where('cart_id', $cart->id)
    //         ->where('product_id', $product->id)
    //         ->first();

    //     if ($cartItem) {
    //         $cartItem->increment('quantity', $data['quantity'] ?? 1);
    //     } else {
    //         $this->cartItem::create([
    //             'cart_id'      => $cart->id,
    //             'product_id'   => $product->id,
    //             'product_name' => $product->title,
    //             'quantity'     => $data['quantity'] ?? 1,
    //             'creater_type' => User::class,
    //             'creater_id'   => Auth::guard('web')->check() ? Auth::guard('web')->id() : null,
    //         ]);
    //     }

    //     return true;
    // }

    public function updateCartItem(array $data): bool
    {
        $cartItem = $this->cartItem::findOrFail($data['cart_item_id']);
        $cart     = $this->getUserCart();

        if (!$cart || $cartItem->cart_id !== $cart->id) {
            throw new \Exception('Cart item not found');
        }

        $cartItem->update(['quantity' => $data['quantity']]);

        return true;
    }

    public function removeCartItem(int $id): bool
    {
        $cartItem = $this->cartItem::findOrFail($id);
        $cart     = $this->getUserCart();

        if (!$cart || $cartItem->cart_id !== $cart->id) {
            throw new \Exception('Cart item not found');
        }

        $cartItem->delete();

        return true;
    }

    public function authCheck(string $sessionId = null): bool
    {
        if (!Auth::guard('web')->check()) {
            return false;
        }

        $user      = Auth::guard('web')->user();
        $sessionId = $sessionId ?? session()->getId();

        $guestCarts = $this->model::with('items')
            ->where('session_id', $sessionId)
            ->get();

        if ($guestCarts->isEmpty()) {
            return false;
        }

        $userCart = $this->model::firstOrCreate([
            'user_id' => $user->id,
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

    // ─── Private Helpers ─────────────────────────────────────────────────────

    private function getUserCart(): ?Cart
    {
        return Auth::guard('web')->check()
            ? $this->model::where('user_id', Auth::guard('web')->id())->first()
            : $this->model::where('session_id', session()->getId())->first();
    }

    private function calculateItemData(Product $product, int $quantity): array
    {
        $price        = (float) ($product->price ?? 0);
        $discountRate = (float) ($product->discount ?? 0);

        $discountAmount = ($price * $discountRate) / 100;
        $unitPrice      = $price - $discountAmount;
        $totalPrice     = $unitPrice * $quantity;

        return [
            'original_price'  => round($price, 2),
            'discount_amount' => round($discountAmount, 2),
            'unit_price'      => round($unitPrice, 2),
            'total_price'     => round($totalPrice, 2),
        ];
    }
}
