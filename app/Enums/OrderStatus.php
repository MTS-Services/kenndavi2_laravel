<?php

namespace App\Enums;

enum OrderStatus: string
{
    case INITIALIZED = 'initialized';
    case PENDING = 'pending';
    case CONFIRMED = 'confirmed';
    case PROCESSING = 'processing';
    case SHIPPED = 'shipped';
    case DELIVERED = 'delivered';
    case CANCELLED = 'cancelled';
    case FAILED = 'failed';

    public function label(): string
    {
        return match ($this) {
            self::INITIALIZED => 'Initialized',
            self::PENDING => 'Pending',
            self::CONFIRMED => 'Confirmed',
            self::PROCESSING => 'Processing',
            self::SHIPPED => 'Shipped',
            self::DELIVERED => 'Delivered',
            self::CANCELLED => 'Cancelled',
            self::FAILED => 'Failed',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::INITIALIZED => 'badge badge-secondary',
            self::PENDING => 'badge badge-warning',
            self::CONFIRMED => 'badge badge-info',
            self::PROCESSING => 'badge badge-warning',
            self::SHIPPED => 'badge badge-success',
            self::DELIVERED => 'badge badge-success',
            self::CANCELLED => 'badge badge-error',
            self::FAILED => 'badge badge-danger',
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
