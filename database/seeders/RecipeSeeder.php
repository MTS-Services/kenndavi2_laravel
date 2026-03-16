<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Recipe::insert([
            [
                'id' => 1,
                'title' => 'Sweet BBQ Glazed Chicken Wings',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'title' => 'Smoky Sweet BBQ Chicken Sandwich',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'title' => 'Sweet & Smoky Teriyaki Salmon',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'title' => 'Teriyaki BBQ Glazed Drumsticks',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'title' => 'Sweet BBQ Pulled Chicken Sliders',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'title' => 'Honey BBQ Meatballs',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'title' => 'Teriyaki BBQ Glazed Drumsticks',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'title' => 'Sweet BBQ Pulled Chicken Sliders',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'title' => 'Honey BBQ Meatballs',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'title' => 'Teriyaki BBQ Glazed Drumsticks',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 11,
                'title' => 'Sweet BBQ Pulled Chicken Sliders',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 12,
                'title' => 'Honey BBQ Meatballs',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 13,
                'title' => 'Teriyaki BBQ Glazed Drumsticks',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 14,
                'title' => 'Sweet BBQ Pulled Chicken Sliders',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 15,
                'title' => 'Honey BBQ Meatballs',
                'prep_time' => 'Prep time 4 min',
                'cook_time' => 'Cook 4h',
                'image' => 'https://via.placeholder.com/150',
                'description' => 'A delicious sweet BBQ glazed chicken wings recipe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
