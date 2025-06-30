<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skalanilai', function (Blueprint $table) {
            $table->string('kurikulum', 10);
            $table->string('jenjang', 50);
            $table->string('unit', 100);
            $table->decimal('nilai_angka', 4, 2);
            $table->char('nilai_huruf', 1);
            $table->decimal('batas_bawah', 4, 2);
            $table->decimal('batas_atas', 4, 2);

            // Definisi Composite Primary Key
            $table->primary(['kurikulum', 'jenjang', 'unit', 'nilai_huruf'], 'skalanilai_primary');

            // Definisi Foreign Key
            $table->foreign('unit')->references('kode_unit')->on('unit');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('skalanilai');
    }
};
