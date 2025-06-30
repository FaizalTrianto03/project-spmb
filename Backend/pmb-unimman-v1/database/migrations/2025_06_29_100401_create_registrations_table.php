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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('registration_number', 50)->unique();

            // Relasi ke jalur pendaftaran
            $table->foreignId('admission_path_id')->constrained('admission_paths');

            // Data Diri Pendaftar
            $table->string('full_name');
            $table->enum('gender', ['MALE', 'FEMALE']);
            $table->string('mobile_number', 20);
            $table->string('email', 100);
            $table->date('date_of_birth');
            $table->string('place_of_birth', 100);
            $table->string('nationality', 50)->default('Indonesia');
            $table->string('nik', 20)->unique();

            // Relasi ke data wilayah dan sekolah
            $table->foreignId('province_id')->constrained('provinces');
            $table->foreignId('city_id')->constrained('cities');
            $table->foreignId('school_id')->constrained('schools');

            // Data Pendidikan Sebelumnya
            $table->string('school_specialization', 100);
            $table->year('graduation_year');

            // Relasi ke Pilihan Program Studi
            $table->foreignId('first_choice_program_id')->constrained('study_programs');
            $table->foreignId('second_choice_program_id')->nullable()->constrained('study_programs');

            // Status Pendaftaran dan Pembayaran
            $table->enum('registration_status', ['DRAFT', 'SUBMITTED', 'VERIFIED', 'ACCEPTED', 'REJECTED'])->default('DRAFT');
            $table->enum('payment_status', ['PENDING', 'PAID', 'FAILED'])->default('PENDING');

            $table->timestamps();

            // Index untuk optimasi query, sesuai skema SQL
            $table->index('mobile_number');
            $table->index('email');
            $table->index('registration_status');
            $table->index('payment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
