<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admission_path_programs', function (Blueprint $table) {
            $table->id(); // INT, PRIMARY KEY, AUTO_INCREMENT
            $table->foreignId('admission_path_id')->constrained()->onDelete('cascade');
            $table->foreignId('study_program_id')->constrained()->onDelete('cascade');
            $table->integer('quota')->default(0);
            $table->timestamp('created_at')->nullable()->useCurrent();

            // Mencegah duplikasi data relasi
            $table->unique(['admission_path_id', 'study_program_id'], 'adm_path_prog_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admission_path_programs');
    }
};
