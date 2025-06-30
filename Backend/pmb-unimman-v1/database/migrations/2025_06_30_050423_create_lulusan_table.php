<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lulusan', function (Blueprint $table) {
            $table->string('periode_yudisium_', 50);
            $table->string('program_studi', 100);
            $table->string('nim', 10)->primary(); // NIM sebagai Primary Key
            $table->string('no__sk_yudisium', 100)->nullable();
            $table->date('tgl_sk_yudisium')->nullable();
            $table->string('no__ijazah', 100)->nullable();
            $table->date('tgl_ijazah')->nullable();
            $table->string('no__transkrip', 50)->nullable();
            $table->date('tgl_transkrip')->nullable();
            $table->text('judul_skripsi')->nullable();

            // Relasi
            $table->foreign('program_studi')->references('kode_unit')->on('unit');
            $table->foreign('nim')->references('nim')->on('mahasiswa');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lulusan');
    }
};
