<?php

namespace App\Enums;

enum PaymentStatus:string
{
    case PENDING = 'pending';
    case PROCESSING = 'processing';
    case COMPLETED = 'completed';
    case FAILED = 'failed';
    case REFUNDED = 'refunded';

    public function label():string
    {
        return match ($this) {
            self::PENDING => 'Pending',
            self::PROCESSING => 'Processing',
            self::COMPLETED => 'Completed',
            self::FAILED => 'Failed',
            self::REFUNDED => 'Refunded',
        };
    }
    
    public function color(): string
    {
        return match ($this) {
            self::PENDING => 'badge-warning',
            self::PROCESSING => 'badge-info',
            self::COMPLETED => 'badge-success',
            self::FAILED => 'badge-danger',
            self::REFUNDED => 'badge-secondary',
        };
    }
    
    public static function options(): array
    {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->label(),
            'color' => $case->color(),
        ], self::cases());
    }
}
