<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->onDelete('cascade');
            $table->string('payment_code', 50)->unique();
            $table->decimal('amount', 10, 2);
            $table->string('payment_method', 50)->nullable();
            $table->timestamp('payment_date')->nullable();
            $table->enum('payment_status', ['PENDING', 'SUCCESS', 'FAILED', 'EXPIRED'])->default('PENDING');
            $table->string('payment_proof', 500)->nullable();
            $table->timestamp('verification_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
