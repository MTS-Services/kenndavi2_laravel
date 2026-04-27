<?php

namespace Database\Seeders;

use App\Enums\ProductDiscountType;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::insert([
            [
                'id' => 1,
                'title' => 'Sweet BBQ Sauce',
                'description' => 'A rich and smooth sweet BBQ sauce crafted with the perfect balance of sweetness and smoky flavor. Ideal for grilling, dipping, or glazing to make every bite irresistibly delicious.',
                'tag_id' => 1,
                'price' => 100,
                'discount' => 10,
                'discount_type' => ProductDiscountType::PERCENTAGE->value,
                'stock_level' => 10,
                'created_at' => now(),
                'updated_at' => now(),
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'id' => 2,
                'title' => 'Sweet Honey BBQ Sauce',
                'description' => 'A bold and fiery sauce that brings a zesty kick to any dish. Perfect for those who love heat with a tangy twist, ideal for tacos, wings, or grilled meats.',
                'tag_id' => 2,
                'price' => 100,
                'discount' => 10,
                'discount_type' => ProductDiscountType::FIXED->value,
                'stock_level' => 10,
                'created_at' => now(),
                'updated_at' => now(),
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'id' => 3,
                'title' => 'Teriyaki BBQ Sauce',
                'description' => 'A bright and zesty sauce with a tangy citrus finish. Perfect for adding a refreshing twist to grilled fish, salads, or roasted vegetables.',
                'tag_id' => 3,
                'price' => 100,
                'discount' => 10,
                'discount_type' => ProductDiscountType::PERCENTAGE->value,
                'stock_level' => 10,
                'created_at' => now(),
                'updated_at' => now(),
                'created_by' => 1,
                'updated_by' => 1,
            ],
        ]);
    }
}
