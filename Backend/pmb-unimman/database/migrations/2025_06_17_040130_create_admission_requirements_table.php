<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admission_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admission_path_id')->constrained()->onDelete('cascade');
            $table->string('requirement_name', 255);
            $table->text('description')->nullable();
            $table->boolean('is_mandatory')->default(true);
            $table->string('file_type', 50)->nullable();
            $table->integer('max_file_size')->comment('dalam KB')->default(2048);
            $table->timestamp('created_at')->nullable()->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admission_requirements');
    }
};
