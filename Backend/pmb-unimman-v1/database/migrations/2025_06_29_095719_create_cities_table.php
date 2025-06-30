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
        Schema::create('cities', function (Blueprint $table) {
            $table->id();

            // Relasi ke tabel provinces.
            // constrained() akan otomatis mengasumsikan relasi ke kolom 'id' di tabel 'provinces'.
            $table->foreignId('province_id')
                ->constrained('provinces')
                ->onDelete('cascade');

            $table->string('name', 100);
            $table->timestamp('created_at')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
