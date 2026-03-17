<?php

namespace App\Models;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'id',
        'order_id',
        'user_id',
        'payment_method',
        'transaction_id',
        'payment_intent_id',
        'amount',
        'currency',
        'status',
        'gateway_response',
        'paid_at',

        'created_at',
        'updated_at',
        'creater_id',
        'creater_type',
        'updater_id',
        'updater_type',
    ];


    protected $casts = [
        'payment_method' => PaymentMethod::class,
        'amount' => 'decimal:2',
        'status' => PaymentStatus::class,
        'paid_at' => 'datetime',
        'gateway_response' => 'array',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function isPaid(): bool
    {
        return $this->status === PaymentStatus::COMPLETED;
    }
}
