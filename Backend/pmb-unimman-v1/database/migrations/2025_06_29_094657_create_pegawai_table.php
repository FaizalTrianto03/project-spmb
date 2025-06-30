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
        Schema::create('pegawai', function (Blueprint $table) {
            $table->string('nip', 50)->primary();
            $table->string('nama', 100);

            // Kolom ini berelasi dengan tabel 'unit'
            $table->string('hombase', 100)->nullable();
            $table->foreign('hombase')->references('kode_unit')->on('unit');

            $table->char('jenis_kelamin', 1);
            $table->string('tempat_lahir', 50)->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('agama', 50)->nullable();
            $table->char('nidn', 10)->unique()->nullable();
            $table->string('gelar_depan', 10)->nullable();
            $table->string('gelar_belakang', 100)->nullable();
            $table->string('golonganpangkat', 50)->nullable();
            $table->string('jabatan_fungsional', 100)->nullable();
            $table->string('jabatan_struktural', 100)->nullable();
            $table->string('alamat_rumah', 255)->nullable();
            $table->string('no__telepon', 50)->nullable(); // Nama kolom dengan dua underscore
            $table->string('email_pribadi', 100)->nullable();
            $table->string('email_kampus', 255)->unique()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pegawai');
    }
};
