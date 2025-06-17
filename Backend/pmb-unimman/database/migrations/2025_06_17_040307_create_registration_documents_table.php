<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registration_documents', function (Blueprint $table) {
            $table->id();

            // Kolom untuk relasi ke tabel registrations
            $table->foreignId('registration_id')->constrained()->onDelete('cascade');

            // Kolom untuk relasi ke tabel admission_requirements
            $table->foreignId('requirement_id')->constrained('admission_requirements')->onDelete('cascade');

            $table->string('file_name', 255);
            $table->string('file_path', 500);
            $table->integer('file_size')->comment('dalam bytes');
            $table->timestamp('upload_date')->useCurrent();
            $table->enum('verification_status', ['PENDING', 'APPROVED', 'REJECTED'])->default('PENDING');
            $table->text('verification_notes')->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registration_documents');
    }
};
