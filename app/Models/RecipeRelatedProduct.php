<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeRelatedProduct extends Model
{
    protected $fillable = [
        'id',
        'product_id',
        'recipe_id',
        
        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
