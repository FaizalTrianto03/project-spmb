<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('perwalian', function (Blueprint $table) {
            $table->string('periode', 50);
            $table->string('nim', 10);
            $table->string('nama', 100)->nullable();
            $table->string('prodi', 100)->nullable();
            $table->string('periode_masuk', 50)->nullable();
            $table->string('dosen_pembimbing_akademik', 100)->nullable();
            $table->integer('sks_lulus')->nullable();
            $table->decimal('ips', 3, 2)->nullable();
            $table->decimal('ipk', 3, 2)->nullable();
            $table->decimal('ipk_lulus', 3, 2)->nullable();

            // Kunci dan Relasi
            $table->primary(['periode', 'nim']);
            $table->foreign('nim')->references('nim')->on('mahasiswa');
            $table->foreign('prodi')->references('kode_unit')->on('unit');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('perwalian');
    }
};
