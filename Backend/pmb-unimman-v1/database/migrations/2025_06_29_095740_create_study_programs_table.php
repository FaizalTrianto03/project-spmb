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
        Schema::create('study_programs', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->unique();
            $table->string('name');
            $table->enum('level', ['D3', 'S1', 'PROFESI']);
            $table->string('accreditation', 50)->nullable();
            $table->string('website')->nullable();
            $table->integer('quota')->default(0);
            $table->boolean('is_active')->default(true);

            // Relasi ke tabel unit menggunakan primary key non-standar (kode_unit)
            $table->string('unit_kode', 10)->nullable();
            $table->foreign('unit_kode')->references('kode_unit')->on('unit');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('study_programs');
    }
};
