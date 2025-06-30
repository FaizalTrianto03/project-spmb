<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mahasiswakm', function (Blueprint $table) {
            $table->string('nim', 50)->primary();
            $table->string('periode_masuk', 10);
            $table->string('perguruan_tinggi_asal', 100)->nullable();
            $table->string('program_studi_asal', 100)->nullable();
            $table->string('nama', 100);
            $table->char('jenis_kelamin', 1);
            $table->string('tempat_lahir', 100)->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('no__hp', 50)->nullable();
            $table->string('email')->unique()->nullable();
            $table->text('alamat')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mahasiswakm');
    }
};
