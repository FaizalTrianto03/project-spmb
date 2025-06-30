<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kelas', function (Blueprint $table) {
            $table->string('program_studi', 100);
            $table->string('tahun_kurikulum', 10);
            $table->string('kode_mata_kuliah', 10);
            $table->string('periode', 50);
            $table->string('nama_kelas', 10);

            // Jadwal
            $table->integer('hari_1')->nullable();
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

            // Dosen Pengampu (NIP disesuaikan dengan panjang di tabel pegawai)
            $table->string('nip_dosen_1', 50)->nullable();
            $table->string('nama_dosen_1', 100)->nullable();
            $table->string('nip_dosen_2', 50)->nullable();
            $table->string('nama_dosen_2', 100)->nullable();

            // Kunci Primer Gabungan
            $table->primary(['program_studi', 'tahun_kurikulum', 'kode_mata_kuliah', 'periode', 'nama_kelas'], 'kelas_primary');

            // Kunci Asing Gabungan ke tabel kurikulummk
            $table->foreign(['program_studi', 'tahun_kurikulum', 'kode_mata_kuliah'], 'kelas_kurikulummk_foreign')
                ->references(['program_studi', 'kurikulum_', 'kode_matakuliah'])
                ->on('kurikulummk');

            // Kunci Asing ke tabel pegawai
            $table->foreign('nip_dosen_1')->references('nip')->on('pegawai');
            $table->foreign('nip_dosen_2')->references('nip')->on('pegawai');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kelas');
    }
};
