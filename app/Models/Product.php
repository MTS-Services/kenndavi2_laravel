<?php

namespace App\Models;

use App\Enums\ProductTag;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'description',
        'tag',
        'price',
        'discount_price',
        'ingredients',
        'quantity',

        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [

            'tag' => ProductTag::class
        ];
    }
    
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
