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
            $table->integer('id')->primary(); // INT, PRIMARY KEY (bukan auto-increment)
            $table->integer('province_id');
            $table->string('name', 100);
            $table->timestamp('created_at')->nullable()->useCurrent();
            // Tidak ada updated_at sesuai permintaan

            // Definisi Foreign Key
            $table->foreign('province_id')->references('id')->on('provinces')->onDelete('cascade');
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
