<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mahasiswa', function (Blueprint $table) {
            // Primary Key
            $table->string('nim', 10)->primary();

            // === KOLOM KUNCI INTEGRASI ===
            // Jika data pendaftaran dihapus, kolom ini akan menjadi NULL.
            $table->foreignId('registration_id')->nullable()->constrained('registrations')->onDelete('set null');

            // Info Akademik
            $table->string('periode_masuk', 50);
            $table->string('program_studi', 100);
            $table->foreign('program_studi')->references('kode_unit')->on('unit');
            $table->string('nama', 100);
            $table->string('sistem_kuliah', 50)->nullable();
            $table->string('jalur_penerimaan', 50)->nullable();
            $table->string('gelombang_daftar', 50)->nullable();
            $table->string('kurikulum', 10)->nullable();

            // Info Transfer (jika ada)
            $table->string('transfer__tidak', 10)->nullable();
            $table->string('universitas_asal', 100)->nullable();
            $table->string('nim_asal', 50)->nullable();
            $table->decimal('ipk_asal', 4, 2)->nullable();

            // Data Pribadi
            $table->string('agama', 50)->nullable();
            $table->string('kewarganegaraan', 50)->nullable();
            $table->string('status_mahasiswa', 50);
            $table->text('alamat')->nullable();
            $table->string('telepon', 50)->nullable();
            $table->string('hp', 50)->nullable();
            $table->string('tempat_lahir', 100)->nullable();
            $table->date('tgl__lahir')->nullable();
            $table->string('kodepos', 10)->nullable();
            $table->char('jenis_kelamin', 1);
            $table->string('golongan_darah', 10)->nullable();
            $table->string('status_nikah', 10)->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('no__ktpnik', 50)->unique()->nullable();
            $table->string('no__kk', 50)->nullable();
            $table->string('rt', 10)->nullable();
            $table->string('rw', 10)->nullable();
            $table->string('dusun', 50)->nullable();
            $table->string('desakelurahan', 100)->nullable();
            $table->string('kecamatan', 100)->nullable();
            $table->string('kota', 100)->nullable();
            $table->string('propinsi', 100)->nullable();
            $table->date('tgl__daftar')->nullable();

            // Data Orang Tua & Wali (semua nullable)
            $table->string('nama_ayah', 100)->nullable();
            $table->string('alamat_ayah', 255)->nullable();
            $table->string('telp__ayah', 50)->nullable();
            $table->date('tgl__lahir_ayah')->nullable();
            $table->string('pendidikan_ayah', 50)->nullable();
            $table->string('pekerjaan_ayah', 50)->nullable();
            $table->string('penghasilan_ayah', 10)->nullable();
            $table->string('nama_ibu', 100)->nullable();
            $table->string('alamat_ibu', 255)->nullable();
            $table->string('telp__ibu', 50)->nullable();
            $table->date('tgl__lahir_ibu')->nullable();
            $table->string('pendidikan_ibu', 50)->nullable();
            $table->string('pekerjaan_ibu', 50)->nullable();
            $table->string('penghasilan_ibu', 10)->nullable();
            $table->string('nama_wali', 100)->nullable();
            $table->string('alamat_wali', 255)->nullable();
            $table->string('telp__wali', 50)->nullable();
            $table->date('tgl__wali')->nullable(); // Di skema tgl__wali, mungkin maksudnya tgl_lahir_wali?
            $table->string('pendidikan_wali', 50)->nullable();
            $table->string('pekerjaan_wali', 100)->nullable();
            $table->string('penghasilan_wali', 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswa');
    }
};
