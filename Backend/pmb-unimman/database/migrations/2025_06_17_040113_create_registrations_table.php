<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id(); // INT, PRIMARY KEY, AUTO_INCREMENT
            $table->string('registration_number', 50)->unique();
            $table->foreignId('admission_path_id')->constrained('admission_paths');
            $table->string('full_name', 255);
            $table->enum('gender', ['MALE', 'FEMALE']);
            $table->string('mobile_number', 20);
            $table->string('email', 100);
            $table->date('date_of_birth');
            $table->string('place_of_birth', 100);
            $table->string('nationality', 50)->default('Indonesia');
            $table->string('nik', 20)->unique();

            // Foreign keys ke tabel dengan ID non-standar
            $table->integer('province_id');
            $table->integer('city_id');
            $table->foreignId('school_id')->constrained('schools');

            $table->string('school_specialization', 100);
            $table->year('graduation_year');

            $table->foreignId('first_choice_program_id')->constrained('study_programs');
            $table->foreignId('second_choice_program_id')->nullable()->constrained('study_programs');

            $table->enum('registration_status', ['DRAFT', 'SUBMITTED', 'VERIFIED', 'ACCEPTED', 'REJECTED'])->default('DRAFT');
            $table->enum('payment_status', ['PENDING', 'PAID', 'FAILED'])->default('PENDING');

            $table->timestamps(); // created_at dan updated_at

            // Definisi Foreign Keys
            $table->foreign('province_id')->references('id')->on('provinces');
            $table->foreign('city_id')->references('id')->on('cities');

            // Definisi Indexes
            $table->index('mobile_number');
            $table->index('email');
            $table->index('registration_status');
            $table->index('payment_status');
        });
    }

    public function down(): void
    {
        // Nonaktifkan foreign key check sebelum drop tabel
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('registrations');
        // Aktifkan kembali setelah selesai
        Schema::enableForeignKeyConstraints();
    }
};
