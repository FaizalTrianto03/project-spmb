<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('nilaipindahan', function (Blueprint $table) {
            // Kolom Kunci
            $table->string('program_studi', 100);
            $table->string('nim', 10);
            $table->string('kode_matakuliah_asal', 50);

            // Detail Mata Kuliah Asal
            $table->string('nama_matakuliah_asal', 100)->nullable();
            $table->decimal('sks_matakuliah_asal', 4, 2)->nullable();
            $table->string('nilai_huruf_matakuliah_asal', 10)->nullable();

            // Detail Mata Kuliah yang Diakui
            $table->string('program_studi_pengampu_matakuliah_diakui', 100)->nullable();
            $table->string('kurikulum_matakuliah_diakui', 10)->nullable();
            $table->string('kode_matakuliah_diakui', 10)->nullable();
            $table->string('nama_matakuliah_diakui', 100)->nullable();
            $table->integer('sks_matakuliah_diakui')->nullable();
            $table->char('nilai_huruf_matakuliah_diakui', 1)->nullable();
            $table->decimal('nilai_angka_matakuliah_diakui', 5, 2)->nullable();

            // Kunci dan Relasi
            $table->primary(['program_studi', 'nim', 'kode_matakuliah_asal']);
            $table->foreign('program_studi')->references('kode_unit')->on('unit');
            $table->foreign('nim')->references('nim')->on('mahasiswa');
            $table->foreign('program_studi_pengampu_matakuliah_diakui', 'nilaipindahan_ps_diakui_foreign')
                ->references('kode_unit')->on('unit');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('nilaipindahan');
    }
};
