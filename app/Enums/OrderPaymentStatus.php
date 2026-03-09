<?php

namespace App\Enums;

enum OrderPaymentStatus:string
{
    case UNPAID = 'unpaid';
    case PAID = 'paid';
    case FAILED = 'failed';
    case REFUNDED = 'refunded';


    public function label(): string
    {
        return match ($this) {
            self::UNPAID => 'unpaid',
            self::PAID => 'paid',
            self::FAILED => 'failed',
            self::REFUNDED => 'refunded',
        };
    }

    public function color(): string
    {
         return match ($this) {
            self::UNPAID => 'badge-warning',
            self::PAID => 'badge-success',
            self::FAILED => 'badge-danger',
            self::REFUNDED => 'badge-info',
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
