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
        Schema::create('provinces', function (Blueprint $table) {
            // Di SQL-nya id adalah int(11), di laravel $table->id() adalah BigInt.
            // Ini tidak masalah dan lebih modern.
            $table->id();

            $table->string('name', 100);

            // Sesuai skema, hanya ada created_at, kita bisa spesifik seperti ini
            $table->timestamp('created_at')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};
