<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('krskm', function (Blueprint $table) {
            $table->string('periode', 10);
            $table->string('program_studi_pengampu', 100);
            $table->string('kurikulum', 50);
            $table->string('kode_matakuliah', 50);
            $table->string('nama_matakuliah', 100)->nullable();
            $table->string('nama_kelas', 50);
            $table->string('perguruan_tinggi_asal', 100)->nullable();
            $table->string('program_studi_asal', 100)->nullable();
            $table->string('nim', 50);

            // Nilai
            $table->decimal('nilai_akhir', 5, 2)->nullable();
            $table->decimal('nilai_mutu', 3, 2)->nullable();
            $table->string('nilai_huruf', 10)->nullable();

            // Kunci dan Relasi
            $table->primary(['periode', 'program_studi_pengampu', 'kurikulum', 'kode_matakuliah', 'nama_kelas', 'nim'], 'krskm_primary');
            $table->foreign('program_studi_pengampu')->references('kode_unit')->on('unit');
            $table->foreign('nim')->references('nim')->on('mahasiswakm');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('krskm');
    }
};
