<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tagihan', function (Blueprint $table) {
            $table->string('kode_tagihan', 50)->primary();
            $table->string('nim', 10);
            $table->string('nama', 100)->nullable();
            $table->string('jenis_cicilan', 10)->nullable();
            $table->string('bulan', 10)->nullable();
            $table->decimal('potongan', 12, 2)->nullable();
            $table->decimal('denda', 12, 2)->nullable();
            $table->decimal('nominal', 12, 2);
            $table->decimal('nominal_bayar', 12, 2)->nullable();
            $table->string('status_lunas', 50)->nullable();

            // Relasi
            $table->foreign('nim')->references('nim')->on('mahasiswa');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tagihan');
    }
};
