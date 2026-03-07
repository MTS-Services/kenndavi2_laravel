<?php

use App\Traits\AuditColumnsTrait;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use AuditColumnsTrait;
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('description');
            $table->unsignedBigInteger('tag_id')->nullable();
            $table->decimal('price', 15, 2);
            $table->decimal('discount', 15, 2)->nullable();
            $table->string('discount_type')->nullable();
            $table->bigInteger('stock_level');


            $table->foreign('tag_id')->references('id')->on('product_tags')->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
            $this->addAdminAuditColumns($table);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
