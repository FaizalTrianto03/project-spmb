<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Models\Registration; // <-- Tambahkan ini
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    public function create(array $input): User
    {
        // Validasi input sesuai dengan kebutuhan Anda
        Validator::make($input, [
            'full_name' => ['required', 'string', 'max:255'],
            'mobile_number' => ['required', 'string', 'max:20'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => $this->passwordRules(),
        ])->validate();

        // Menggunakan database transaction untuk memastikan semua proses berhasil
        return DB::transaction(function () use ($input) {
            // 1. Buat data pendaftaran terlebih dahulu
            $registration = Registration::create([
                'full_name' => $input['full_name'],
                'email' => $input['email'],
                'mobile_number' => $input['mobile_number'],
                // Isi dengan nilai default yang sesuai
                'admission_path_id' => 1, // Ganti dengan ID jalur default jika ada
                'gender' => 'MALE', // Atau nilai default lain
                'date_of_birth' => now(), // Atau nilai default lain
                'place_of_birth' => 'Default', // Atau nilai default lain
                'nik' => 'DRAFT-' . uniqid(), // NIK sementara
                'province_id' => 71, // Ganti dengan ID provinsi default
                'city_id' => 7101, // Ganti dengan ID kota default
                'school_id' => 1, // Ganti dengan ID sekolah default
                'school_specialization' => 'Default',
                'graduation_year' => date('Y'),
                'first_choice_program_id' => 1, // Ganti dengan ID prodi default
                'registration_number' => 'DRAFT-' . now()->timestamp,
            ]);

            // 2. Buat user dan hubungkan dengan data pendaftaran
            return User::create([
                'username' => $input['email'], // Gunakan email sebagai username awal
                'email' => $input['email'],
                'password' => $input['password'], // Password sudah otomatis di-hash oleh cast di Model User
                'role' => 'STUDENT',
                'registration_id' => $registration->id, // Hubungkan ke pendaftaran
            ]);
        });
    }
}
