<?php

namespace App\Listeners;

use App\Models\User;
use App\Services\CartService;
use Illuminate\Auth\Events\Login;

class MergeGuestCartOnLogin
{
    public function __construct(
        protected CartService $cartService,
    ) {}

    public function handle(Login $event): void
    {
        if ($event->guard !== 'web') {
            return;
        }

        $user = $event->user;
        if (! $user instanceof User) {
            return;
        }

        if ($user->email_verified_at === null) {
            return;
        }

        $cartIdRaw = session()->get(CartService::SESSION_CART_ID_KEY);
        $sessionCartId = is_numeric($cartIdRaw) ? (int) $cartIdRaw : null;

        $this->cartService->mergeGuestCartsForUser(
            $user,
            session()->getId(),
            $sessionCartId,
        );
    }
}
