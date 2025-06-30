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
        Schema::create('unit', function (Blueprint $table) {
            // Berdasarkan skema SQL, primary key-nya adalah kode_unit, bukan id auto-increment
            $table->string('kode_unit', 10)->primary();

            $table->string('parent_unit', 100)->nullable();
            $table->string('nama_unit', 100);
            $table->string('nama_singkat', 50)->nullable();
            $table->string('jenjang_pendidikan', 50)->nullable();
            $table->integer('level')->nullable();
            $table->string('alamat', 255)->nullable();
            $table->string('telepon', 50)->nullable();
            $table->string('akreditasi', 10)->nullable();
            $table->string('sk_akreditasi', 100)->nullable();
            $table->string('kode_nim', 50)->nullable();
            $table->string('gelar', 50)->nullable();
            $table->string('ketua', 100)->nullable();

            // Kolom created_at dan updated_at tidak ada di skema awal,
            // jadi kita tidak menggunakan $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unit');
    }
};
