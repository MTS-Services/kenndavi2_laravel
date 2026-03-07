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
        'creater_id',
        'creater_type',
        'updater_id',
        'updater_type',

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

    public function addresses()
    {
        return $this->hasMany(UserAddresse::class);
    }

    protected $appends = ['image_url'];

public function getImageUrlAttribute()
{
    // Google login এর জন্য
    if ($this->provider_avatar) {
        return $this->provider_avatar;
    }

    // Regular login এর জন্য
    if (filter_var($this->image, FILTER_VALIDATE_URL)) {
        return $this->image;
    }

    if (!$this->image) {
        return asset('no-user-image-icon.png');
    }

    return asset('storage/user_images/' . $this->image);
}
}
