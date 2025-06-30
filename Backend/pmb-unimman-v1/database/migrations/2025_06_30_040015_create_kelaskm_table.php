<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kelaskm', function (Blueprint $table) {
            $table->string('program_studi_pengampu', 100);
            $table->string('tahun_kurikulum', 10);
            $table->string('kode_mata_kuliah', 10);
            $table->string('periode', 10);
            $table->string('nama_kelas', 50);

            // Jadwal
            $table->string('hari_1', 10)->nullable();
            $table->time('jam_mulai_1')->nullable();
            $table->time('jam_selesai_1')->nullable();
            $table->string('hari_2', 10)->nullable();
            $table->time('jam_mulai_2')->nullable();
            $table->time('jam_selesai_2')->nullable();
            $table->string('hari_3', 10)->nullable();
            $table->time('jam_mulai_3')->nullable();
            $table->time('jam_selesai_3')->nullable();
            $table->string('hari_4', 10)->nullable();
            $table->time('jam_mulai_4')->nullable();
            $table->time('jam_selesai_4')->nullable();

            $table->integer('daya_tampung')->nullable();

            // Dosen Pengampu
            $table->string('nip_dosen_1', 50)->nullable();
            $table->string('nama_dosen_1', 100)->nullable();
            $table->string('nip_dosen_2', 50)->nullable();
            $table->string('nama_dosen_2', 100)->nullable();

            // Kunci dan Relasi
            $table->primary(['program_studi_pengampu', 'tahun_kurikulum', 'kode_mata_kuliah', 'periode', 'nama_kelas'], 'kelaskm_primary');
            $table->foreign('program_studi_pengampu')->references('kode_unit')->on('unit');
            $table->foreign('nip_dosen_1')->references('nip')->on('pegawai');
            $table->foreign('nip_dosen_2')->references('nip')->on('pegawai');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kelaskm');
    }
};
