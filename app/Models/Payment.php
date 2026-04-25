<?php

namespace App\Models;

use App\Enums\CurrencyCode;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id',
        'method',
        'gateway_txn_id',
        'txn_id',
        'amount',
        'currency',
        'status',
        'paid_at',
        'gateway_response',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'currency' => CurrencyCode::class,
            'status' => PaymentStatus::class,
            'method' => PaymentMethod::class,
            'paid_at' => 'datetime',
        ];
    }
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
