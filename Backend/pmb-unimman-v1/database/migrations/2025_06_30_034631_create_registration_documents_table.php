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
        Schema::create('registration_documents', function (Blueprint $table) {
            $table->id();

            // Relasi ke pendaftaran dan persyaratan
            $table->foreignId('registration_id')->constrained('registrations')->onDelete('cascade');
            $table->foreignId('requirement_id')->constrained('admission_requirements')->onDelete('cascade');

            $table->string('file_name');
            $table->string('file_path', 500);
            $table->integer('file_size')->comment('dalam bytes');
            $table->timestamp('upload_date')->useCurrent();
            $table->enum('verification_status', ['PENDING', 'APPROVED', 'REJECTED'])->default('PENDING');
            $table->text('verification_notes')->nullable();
            $table->timestamp('created_at')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_documents');
    }
};
