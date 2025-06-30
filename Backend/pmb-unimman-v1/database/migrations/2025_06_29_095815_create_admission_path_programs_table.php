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
        Schema::create('admission_path_programs', function (Blueprint $table) {
            $table->id();

            // Relasi-relasi
            $table->foreignId('admission_path_id')->constrained()->onDelete('cascade');
            $table->foreignId('study_program_id')->constrained()->onDelete('cascade');

            $table->integer('quota')->default(0);
            $table->timestamp('created_at')->nullable()->useCurrent();

            // Membuat sebuah unique key untuk kombinasi admission_path_id dan study_program_id
            $table->unique(['admission_path_id', 'study_program_id'], 'adm_path_prog_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_path_programs');
    }
};
