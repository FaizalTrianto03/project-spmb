<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skripsi', function (Blueprint $table) {
            $table->string('nim', 10)->primary();
            $table->string('nama', 100)->nullable();
            $table->text('judul')->nullable();
            $table->string('status', 10)->nullable();

            // Relasi
            $table->foreign('nim')->references('nim')->on('mahasiswa');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('skripsi');
    }
};
