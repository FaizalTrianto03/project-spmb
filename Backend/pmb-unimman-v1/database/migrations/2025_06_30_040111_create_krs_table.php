<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('krs', function (Blueprint $table) {
            $table->string('periode', 50);
            $table->string('program_studi_pengampu', 100);
            $table->string('kurikulum', 10);
            $table->string('kode_matakuliah', 10);
            $table->string('nama_matakuliah', 100)->nullable();
            $table->string('nama_kelas', 10);
            $table->string('nim', 10);

            // Nilai
            $table->decimal('nilai_akhir', 5, 2)->nullable();
            $table->decimal('nilai_mutu', 3, 2)->nullable();
            $table->char('nilai_huruf', 1)->nullable();

            // Kunci dan Relasi
            $table->primary(['periode', 'program_studi_pengampu', 'kurikulum', 'kode_matakuliah', 'nama_kelas', 'nim'], 'krs_primary');
            $table->foreign('program_studi_pengampu')->references('kode_unit')->on('unit');
            $table->foreign('nim')->references('nim')->on('mahasiswa');
            $table->foreign(['program_studi_pengampu', 'kurikulum', 'kode_matakuliah'], 'krs_kurikulummk_foreign')
                ->references(['program_studi', 'kurikulum_', 'kode_matakuliah'])
                ->on('kurikulummk');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('krs');
    }
};
