<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kurikulummk', function (Blueprint $table) {
            $table->string('program_studi', 100);
            $table->string('kurikulum_', 10);
            $table->string('kode_matakuliah', 10);
            $table->string('nama_matakuliah', 100);
            $table->integer('semester_matakuliah')->nullable();
            $table->integer('sks_matakuliah');
            $table->integer('sks_tatap_muka')->nullable();
            $table->integer('sks_praktikum')->nullable();
            $table->integer('sks_simulasi')->nullable();
            $table->integer('sks_praktikum_lapangan')->nullable();
            $table->decimal('nilai_lulus_minimal', 4, 2)->nullable();
            $table->string('kelompok_matakuliah', 50)->nullable();
            $table->string('jenis_matakuliah', 50)->nullable();

            // Definisi Composite Primary Key
            $table->primary(['program_studi', 'kurikulum_', 'kode_matakuliah'], 'kurikulummk_primary');

            // Definisi Foreign Key
            $table->foreign('program_studi')->references('kode_unit')->on('unit');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kurikulummk');
    }
};
