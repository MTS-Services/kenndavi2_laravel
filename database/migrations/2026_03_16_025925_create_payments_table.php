<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->nullable()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->nullable()->cascadeOnDelete();

            $table->string('method')->index();
            $table->string('txn_id')->nullable()->index();
            $table->string('gateway_txn_id')->nullable()->index();
            $table->decimal('amount', 15, 2)->index();
            $table->string('currency')->default('USD')->index();
            $table->string('status')->index();
            $table->json('gateway_response')->nullable();
            $table->timestamp('paid_at')->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
