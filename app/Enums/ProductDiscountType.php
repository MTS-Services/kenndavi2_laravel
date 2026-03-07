<?php

namespace App\Enums;

enum ProductDiscountType: string
{
    case PERCENTAGE = 'percentage';
    case FIXED = 'fixed';
    public function label(): string
    {
        return match ($this) {
            self::PERCENTAGE => 'percentage',
            self::FIXED => 'fixed',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::PERCENTAGE => 'badge-success',
            self::FIXED => 'badge-info',
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
