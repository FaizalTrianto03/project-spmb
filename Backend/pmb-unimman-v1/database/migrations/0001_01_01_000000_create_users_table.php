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
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // Kolom dari skema Anda
            $table->string('username', 50)->unique();
            $table->string('email', 100)->unique();
            $table->string('password');

            // Kolom Two Factor (opsional, tapi ada di skema Anda)
            $table->text('two_factor_secret')->nullable();
            $table->text('two_factor_recovery_codes')->nullable();
            $table->timestamp('two_factor_confirmed_at')->nullable();

            // Kolom kustom yang paling penting
            $table->enum('role', ['SUPER_ADMIN', 'ADMIN', 'OPERATOR', 'VERIFIER', 'STUDENT']);

            // IMPORTANT: Foreign key ke tabel registrations.
            // Kita definisikan kolomnya dulu, tapi relasinya akan dibuat di migrasi terpisah
            // setelah tabel 'registrations' ada.
            $table->unsignedBigInteger('registration_id')->nullable();

            $table->boolean('is_active')->default(true);
            $table->timestamp('last_login')->nullable();

            // Kolom remember_token dari standar Laravel
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
