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
        Schema::create('admission_paths', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('registration_fee', 10, 2)->default(0.00);
            $table->string('study_system', 50)->nullable();
            $table->text('target_students')->nullable();
            $table->string('schedule', 100)->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->string('wave', 50)->nullable();
            $table->string('academic_year', 10);
            $table->enum('semester', ['GANJIL', 'GENAP']);
            $table->boolean('is_active')->default(true); // tinyint(1) diterjemahkan menjadi boolean
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_paths');
    }
};
