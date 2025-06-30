<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proporsinilai', function (Blueprint $table) {
            $table->string('periode', 50);
            $table->string('program_studi', 100);
            $table->string('kurikulum', 10);
            $table->string('kode_matakuliah', 10);
            $table->string('nama_matakuliah', 100)->nullable();
            $table->string('nama_kelas', 10);
            $table->string('nim', 10);
            $table->string('komposisi_nilai', 50);
            $table->decimal('nilai', 5, 2)->nullable();

            // Kunci Primer Gabungan Super Panjang
            $table->primary(['periode', 'program_studi', 'kurikulum', 'kode_matakuliah', 'nama_kelas', 'nim', 'komposisi_nilai'], 'proporsinilai_primary');

            // Kunci Asing Gabungan ke tabel krs
            $table->foreign(['periode', 'program_studi', 'kurikulum', 'kode_matakuliah', 'nama_kelas', 'nim'], 'proporsinilai_krs_foreign')
                ->references(['periode', 'program_studi_pengampu', 'kurikulum', 'kode_matakuliah', 'nama_kelas', 'nim'])
                ->on('krs');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proporsinilai');
    }
};
