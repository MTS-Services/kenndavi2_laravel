<?php

namespace App\Models;

use App\Enums\OrderPaymentStatus;
use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Model;

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

        'created_at',
        'updated_at',
        'creater_id',
        'creater_type',
        'updater_id',
        'updater_type',
    ];

    protected function casts(): array
    {
        return [
            'payment_status' => OrderPaymentStatus::class,
            'order_status' => OrderStatus::class,
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
}
