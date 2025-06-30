<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registration_status_log', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained('registrations')->onDelete('cascade');
            $table->enum('old_status', ['DRAFT', 'SUBMITTED', 'VERIFIED', 'ACCEPTED', 'REJECTED'])->nullable();
            $table->enum('new_status', ['DRAFT', 'SUBMITTED', 'VERIFIED', 'ACCEPTED', 'REJECTED']);
            $table->timestamp('changed_at')->useCurrent();
            $table->string('changed_by', 100)->nullable();
            $table->text('notes')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registration_status_log');
    }
};
