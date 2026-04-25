<?php

namespace App\Models;

use App\Enums\CurrencyCode;
use App\Enums\OrderPaymentStatus;
use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'order_number',
        'idempotency_key',
        'shipping_address_id',
        'subtotal',
        'discount',
        'discount_amount',
        'shipping_cost',
        'tax',
        'tax_amount',
        'total',
        'grand_total',
        'currency',
        'payment_status',
        'order_status',
        'status',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'payment_status' => OrderPaymentStatus::class,
            'order_status' => OrderStatus::class,
            'currency' => CurrencyCode::class,
            'subtotal' => 'decimal:2',
            'discount' => 'decimal:2',
            'shipping_cost' => 'decimal:2',
            'tax' => 'decimal:2',
            'total' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Compatibility alias for newer payment flow naming.
    public function items()
    {
        return $this->orderItems();
    }

    public function orderAddress()
    {
        return $this->hasOne(OrderAddresse::class);
    }

    // Compatibility alias for newer payment flow naming.
    public function shippingAddress()
    {
        return $this->orderAddress();
    }

    public function feedback()
    {
        return $this->hasOne(Feedback::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function statusHistory(): HasMany
    {
        return $this->hasMany(OrderStatusHistory::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function getStatusAttribute(): ?OrderStatus
    {
        $value = $this->attributes['order_status'] ?? null;
        if ($value === null) {
            return null;
        }

        return OrderStatus::tryFrom($value);
    }

    public function setStatusAttribute(OrderStatus|string $value): void
    {
        $this->attributes['order_status'] = $value instanceof OrderStatus ? $value->value : $value;
    }

    public function getGrandTotalAttribute(): float
    {
        return (float) ($this->attributes['total'] ?? 0);
    }

    public function setGrandTotalAttribute(float|int|string $value): void
    {
        $this->attributes['total'] = $value;
    }

    public function scopeNotInitialized($query)
    {
        return $query->where('order_status', '!=', OrderStatus::INITIALIZED->value);
    }
}
