<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Traits\AuditColumnsTrait;

return new class extends Migration
{
    use AuditColumnsTrait;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipe_related_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('recipe_id');


            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();
            $table->foreign('recipe_id')->references('id')->on('recipes')->cascadeOnDelete();
            $table->timestamps();
            $this->addAdminAuditColumns($table);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipe_related_products');
    }
};
