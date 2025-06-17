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
            $table->id(); // INT, PRIMARY KEY, AUTO_INCREMENT
            $table->string('code', 20)->unique();
            $table->string('name', 255);
            $table->enum('level', ['D3', 'S1', 'PROFESI']);
            $table->string('accreditation', 50)->nullable();
            $table->string('website', 255)->nullable();
            $table->integer('quota')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps(); // created_at dan updated_at
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
