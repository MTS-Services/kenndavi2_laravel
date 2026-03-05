<?php

namespace App\Enums;

enum ProductTag: string
{
    case SWEET = 'sweet';
    case HONEY = 'honey';
    case SPICY = 'spicy';

    public function label(): string
    {
        return match($this) {
            self::SWEET => 'Sweet',
            self::HONEY => 'Honey',
            self::SPICY => 'Spicy',
        };
    }

    public function color(): string
    {
        return match($this) {
            self::SWEET => 'badge-success',
            self::HONEY => 'badge-warning',
            self::SPICY => 'badge-error',
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
