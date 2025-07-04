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
        Schema::create('dokumen_p_m_b_s', function (Blueprint $table) {
            $table->id();
            // RELASI INTI
            $table->integer('pendaftar_id');    // ID AKUN MAHASISWA
            $table->integer('syarat_id');    // ID AKUN MAHASISWA

            $table->string('type');             // JENIS DOKUMEN GENERATED BY MODEL
            $table->string('name');             // NAMA FILE
            $table->string('path')->unique();   // PATH FILE
            $table->string('code')->unique();   // KODE DOKUMEN
            $table->text('desc')->nullable();   // DESKRIPSI
            $table->enum('status', ['Pending', 'Valid', 'Tidak Valid'])->default('Pending');   // STATUS PENDAFTARAN

            // AUDIT TRACKING
            $table->timestamps();
            $table->softDeletes();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_p_m_b_s');
    }
};
