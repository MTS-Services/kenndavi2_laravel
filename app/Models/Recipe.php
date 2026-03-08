<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'id',
        'title',
        'image',
        'prep_time',
        'cook_time',
        'description',

        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
    ];
    
    public function relatedProducts()
    {
        return $this->belongsToMany(Product::class, 'recipe_related_products', 'recipe_id', 'product_id');
    }
}
