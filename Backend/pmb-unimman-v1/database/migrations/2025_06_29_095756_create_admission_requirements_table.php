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
        Schema::create('admission_requirements', function (Blueprint $table) {
            $table->id();

            // Relasi ke tabel admission_paths
            $table->foreignId('admission_path_id')
                ->constrained('admission_paths')
                ->onDelete('cascade');

            $table->string('requirement_name');
            $table->text('description')->nullable();
            $table->boolean('is_mandatory')->default(true);
            $table->string('file_type', 50)->nullable();
            $table->integer('max_file_size')->default(2048)->comment('dalam KB');
            $table->timestamp('created_at')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_requirements');
    }
};
