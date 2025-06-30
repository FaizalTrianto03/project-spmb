<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('document_verification_log', function (Blueprint $table) {
            $table->id();
            $table->foreignId('document_id')->constrained('registration_documents')->onDelete('cascade');
            $table->enum('old_status', ['PENDING', 'APPROVED', 'REJECTED'])->nullable();
            $table->enum('new_status', ['PENDING', 'APPROVED', 'REJECTED']);

            // Relasi ke user yang melakukan verifikasi
            $table->foreignId('verifier_id')->nullable()->constrained('users')->onDelete('set null');

            $table->text('verification_notes')->nullable();
            $table->timestamp('verified_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('document_verification_log');
    }
};
