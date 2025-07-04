<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username', 50)->unique();
            $table->string('email', 100)->unique();
            // Menggunakan 'password' sesuai konvensi Laravel, hashing ditangani otomatis
            $table->string('password');
            $table->enum('role', ['ADMIN', 'OPERATOR', 'STUDENT']);
            // onDelete('set null') agar akun user tidak ikut terhapus jika data pendaftarannya dihapus
            $table->foreignId('registration_id')->nullable()->constrained()->onDelete('set null');
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_login')->nullable();
            $table->rememberToken(); // Direkomendasikan oleh Laravel
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
