<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderAddresse extends Model
{
        protected $fillable = [
        'id',
        'order_id',
        'full_name',
        'phone',
        'address_line1',
        'address_line2',
        'city',
        'state',
        'postal_code',
        'country',


        'created_at',
        'updated_at',
        'creater_id',
        'creater_type',
        'updater_id',
        'updater_type',
    ];

    protected $hidden = [
        
    ];
    
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
