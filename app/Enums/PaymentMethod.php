<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case STRIPE = 'stripe';
    case PAYPAL = 'paypal';
    case AUTHORIZE_NET = 'authorize_net';

    public function label(): string
    {
        return match ($this) {
            self::STRIPE => 'Stripe',
            self::PAYPAL => 'PayPal',
            self::AUTHORIZE_NET => 'Authorize.Net',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::STRIPE => 'badge-success',
            self::PAYPAL => 'badge-info',
            self::AUTHORIZE_NET => 'badge-warning',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn ($case) => ['value' => $case->value, 'label' => $case->label()],
            self::cases()
        );
    }
}
