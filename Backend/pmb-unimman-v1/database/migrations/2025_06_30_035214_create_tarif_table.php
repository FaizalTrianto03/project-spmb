<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tarif', function (Blueprint $table) {
            $table->string('periode_masuk', 50);
            $table->string('gelombang', 50);
            $table->string('jalur_pendaftaran', 50);
            $table->string('sistem_kuliah', 50);
            $table->string('jenis_akun', 50);
            $table->decimal('nominal', 12, 2);
            $table->integer('cicilan')->nullable();
            $table->decimal('denda', 12, 2)->nullable();

            // Definisi Composite Primary Key
            $table->primary(['periode_masuk', 'gelombang', 'jalur_pendaftaran', 'sistem_kuliah', 'jenis_akun'], 'tarif_primary');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tarif');
    }
};
