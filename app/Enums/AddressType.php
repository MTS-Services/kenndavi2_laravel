<?php

namespace App\Enums;

enum AddressType: string
{
    case SHIPPING = 'shipping';
    case BILLING = 'billing';
    
    public function label(): string
    {
        return match ($this) {
            self::SHIPPING => 'Shipping',
            self::BILLING => 'Billing',
        };
    }

    public function color(): string
    {
        return match($this) {
            self::SHIPPING => 'badge-success',
            self::BILLING => 'badge-info',
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
