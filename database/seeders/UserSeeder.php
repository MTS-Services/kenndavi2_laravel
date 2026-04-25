<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert(
            [
                [
                    'name' => 'User',
                    'email' => 'user@dev.com',
                    'password' => Hash::make('user@dev.com'),
                    // 'email_verified_at' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Manager',
                    'email' => 'manager@dev.com',
                    'password' => Hash::make('manager@dev.com'),
                    // 'email_verified_at' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Realtor',
                    'email' => 'realtor@dev.com',
                    'password' => Hash::make('realtor@dev.com'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Realtor & Rentals',
    
                    'email' => 'realtor&rentals@dev.com',
                    'password' => Hash::make('realtor&rentals@dev.com'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]
        );
    }
}
