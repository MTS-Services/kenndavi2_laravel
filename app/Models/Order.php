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
        'subtotal',
        'discount',
        'shipping_cost',
        'tax',
        'total',
        'currency',
        'payment_status',
        'order_status',
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
    public function orderAddress()
    {
        return $this->hasOne(OrderAddresse::class);
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

}
