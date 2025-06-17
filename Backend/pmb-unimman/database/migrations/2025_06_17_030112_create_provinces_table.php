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
        Schema::create('provinces', function (Blueprint $table) {
            $table->integer('id')->primary(); // INT, PRIMARY KEY (bukan auto-increment)
            $table->string('name', 100);
            $table->timestamp('created_at')->nullable()->useCurrent();
            // Tidak ada updated_at sesuai permintaan
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};
