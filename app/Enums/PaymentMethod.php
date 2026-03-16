<?php

namespace App\Enums;

enum PaymentMethod:string
{
    case STRIPE = 'stripe';
    case PAYPAL = 'paypal';

    public function label(): string
    {
        return match ($this) {
            self::STRIPE => 'Stripe',
            self::PAYPAL => 'PayPal',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::STRIPE => 'badge-success',
            self::PAYPAL => 'badge-info',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn($case) => ['value' => $case->value, 'label' => $case->label()],
            self::cases()
        );
    }
}
