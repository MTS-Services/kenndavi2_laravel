<?php

namespace App\Models;

use App\Enums\ProductDiscountType;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'description',
        'tag_id',
        'price',
        'discount',
        'discount_type',
        'stock_level',

        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [

            'discount_type' => ProductDiscountType::class,
            'price' => 'decimal:2',
            'discount' => 'decimal:2',
            'stock_level' => 'integer',
        ];
    }
    
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
    
    public function tag()
    {
        return $this->belongsTo(ProductTag::class);
    }
}
