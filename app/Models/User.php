<?php

namespace App\Models;

use App\Enums\ActiveInactive;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'status',
        'password',
        'image',


        'provider',
        'provider_id',
        'provider_avatar',
        'provider_token',
        'provider_refresh_token',

        'created_at',
        'updated_at',
        'created_by',
        'updated_by'

    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'status' => ActiveInactive::class,
        ];
    }

    public function isAdmin()
    {
        return false;
    }

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }
        if (! $this->image) {
            return asset('no-user-image-icon.png');
        }

        return asset('storage/user_images/'.$this->image);
    }
}
