<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('yudisium', function (Blueprint $table) {
            $table->string('periode_yudisium', 50);
            $table->string('nim', 10)->primary(); // NIM sebagai Primary Key
            $table->string('nama', 100)->nullable();
            $table->string('prodi', 100)->nullable();
            $table->string('periode_masuk', 50)->nullable();
            $table->integer('sks_lulus')->nullable();
            $table->decimal('ipk_lulus', 3, 2)->nullable();
            $table->date('tgl_sk_yudisium')->nullable();
            $table->string('nomer_sk_yudisium', 100)->nullable();
            $table->string('pin', 100)->nullable();

            // Relasi
            $table->foreign('nim')->references('nim')->on('mahasiswa');
            $table->foreign('prodi')->references('kode_unit')->on('unit');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('yudisium');
    }
};
