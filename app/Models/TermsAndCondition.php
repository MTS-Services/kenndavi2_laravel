<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TermsAndCondition extends Model
{
    protected $fillable = [
        'id',
        'title',
        'content',


        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
    ];
}
