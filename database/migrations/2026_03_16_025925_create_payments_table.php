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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('payment_method');
            $table->string('transaction_id')->nullable();
            $table->string('payment_intent_id')->nullable();
            $table->decimal('amount', 15, 2);
            $table->string('currency')->default('USD');
            $table->string('status');
            $table->json('gateway_response')->nullable();
            $table->timestamp('paid_at')->nullable();
            $this->addMorphedAuditColumns($table);

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
