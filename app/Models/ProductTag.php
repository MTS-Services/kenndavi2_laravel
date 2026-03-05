<?php

namespace App\Models;

use App\Enums\ProductTagStatus;
use Illuminate\Database\Eloquent\Model;

class ProductTag extends Model 
{
    
    protected $fillable = [
        'name',
        'status',

        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
    ];
    
    protected $casts = [
        'status' => ProductTagStatus::class,
    ];
}
