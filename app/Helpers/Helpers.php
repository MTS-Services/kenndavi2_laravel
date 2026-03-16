<?php

use App\Models\Cart;

if (!function_exists('cart_count')) {
    function cart_count()
    {
        if (auth('web')->check()) {
            $cart = Cart::where('user_id', auth('web')->id())->first();
            return $cart ? $cart->items->count() : 0;
        } else {
            $cart = Cart::where('session_id', session()->getId())->first();
            return $cart ? $cart->items->count() : 0;
        }
    }
}
