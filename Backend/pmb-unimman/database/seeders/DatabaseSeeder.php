<?php

namespace Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Model::unguard(); // Izinkan mass assignment untuk sementara

        // Nonaktifkan foreign key check untuk kelancaran seeder
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Kosongkan tabel sebelum diisi (dalam urutan terbalik dari dependensi)
        DB::table('payments')->truncate();
        DB::table('registration_documents')->truncate();
        DB::table('registrations')->truncate();
        DB::table('users')->truncate();
        DB::table('admission_path_programs')->truncate();
        DB::table('admission_requirements')->truncate();
        DB::table('schools')->truncate();
        DB::table('cities')->truncate();
        DB::table('provinces')->truncate();
        DB::table('admission_paths')->truncate();
        DB::table('study_programs')->truncate();
        DB::table('universities')->truncate();
        DB::table('announcements')->truncate();

        // Panggil semua seeder dalam urutan yang benar
        $this->call([
            UniversitySeeder::class,
            ProvinceSeeder::class,
            CitySeeder::class,
            StudyProgramSeeder::class,
            AdmissionPathSeeder::class,
            SchoolSeeder::class,
            AdmissionRequirementSeeder::class,
            AdmissionPathProgramSeeder::class,
            UserSeeder::class, // Admin/Operator Users
            RegistrationSeeder::class,
            RegistrationDocumentSeeder::class,
            PaymentSeeder::class,
            AnnouncementSeeder::class,
        ]);

        // Aktifkan kembali foreign key check
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        Model::reguard();
    }
}
