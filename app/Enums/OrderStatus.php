<?php

namespace App\Enums;

enum OrderStatus:string
{
    case PENDING = 'pending';
    case CONFIRMED = 'confirmed';
    case PROCESSING = 'processing';
    case SHIPPED = 'shipped';
    case DELIVERED = 'delivered';
    case CANCELLED = 'cancelled';
    
    public function label(): string
    {
        return match($this) {
            self::PENDING => 'Pending',
            self::CONFIRMED => 'Confirmed',
            self::PROCESSING => 'Processing',
            self::SHIPPED => 'Shipped',
            self::DELIVERED => 'Delivered',
            self::CANCELLED => 'Cancelled',
        };
    }

    public function color(): string
    {
        return match($this) {
            self::PENDING => 'badge-warning',
            self::CONFIRMED => 'badge-info',
            self::PROCESSING => 'badge-warning',
            self::SHIPPED => 'badge-success',
            self::DELIVERED => 'badge-success',
            self::CANCELLED => 'badge-error',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn($case) => ['value' => $case->value, 'label' => $case->label(), 'color' => $case->color()],
            self::cases()
        );
    }
}
