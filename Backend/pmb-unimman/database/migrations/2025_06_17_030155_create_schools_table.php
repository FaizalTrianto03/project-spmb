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
        Schema::create('schools', function (Blueprint $table) {
            $table->id(); // INT, PRIMARY KEY, AUTO_INCREMENT
            $table->string('npsn', 20)->unique()->nullable();
            $table->string('name', 255);
            $table->enum('type', ['SMA', 'SMK', 'MA', 'LAINNYA']);
            $table->integer('province_id');
            $table->integer('city_id');
            $table->boolean('is_verified')->default(false);
            $table->timestamps(); // created_at dan updated_at

            // Definisi Foreign Keys
            $table->foreign('province_id')->references('id')->on('provinces')->onDelete('cascade');
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
