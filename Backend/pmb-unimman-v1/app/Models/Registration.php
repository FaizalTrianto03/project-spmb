<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Registration extends Model
{
    use HasFactory;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    // =================================================================
    // RELASI "BELONGS TO" (Satu Pendaftaran ini Milik Siapa?)
    // =================================================================

    /**
     * Mendapatkan data jalur pendaftaran yang dimiliki oleh pendaftaran ini.
     * Relasi: registrations.admission_path_id -> admission_paths.id
     */
    public function admissionPath(): BelongsTo
    {
        return $this->belongsTo(AdmissionPath::class);
    }

    /**
     * Mendapatkan data sekolah asal yang dimiliki oleh pendaftaran ini.
     * Relasi: registrations.school_id -> schools.id
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /**
     * Mendapatkan data provinsi yang dimiliki oleh pendaftaran ini.
     * Relasi: registrations.province_id -> provinces.id
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    /**
     * Mendapatkan data kota yang dimiliki oleh pendaftaran ini.
     * Relasi: registrations.city_id -> cities.id
     */
    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    /**
     * Mendapatkan data program studi pilihan pertama.
     * Kita perlu menyebutkan nama foreign key-nya karena tidak mengikuti standar Laravel (bukan study_program_id).
     * Relasi: registrations.first_choice_program_id -> study_programs.id
     */
    public function firstChoiceProgram(): BelongsTo
    {
        return $this->belongsTo(StudyProgram::class, 'first_choice_program_id');
    }

    /**
     * Mendapatkan data program studi pilihan kedua.
     * Relasi: registrations.second_choice_program_id -> study_programs.id
     */
    public function secondChoiceProgram(): BelongsTo
    {
        return $this->belongsTo(StudyProgram::class, 'second_choice_program_id');
    }

    // =================================================================
    // RELASI "HAS ONE" & "HAS MANY" (Pendaftaran ini Memiliki Apa?)
    // =================================================================

    /**
     * Mendapatkan data pembayaran yang terkait dengan pendaftaran ini.
     * Relasi: registrations.id -> payments.registration_id
     */
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    /**
     * Mendapatkan data user (akun) yang terkait dengan pendaftaran ini.
     * Relasi: registrations.id -> users.registration_id
     */
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    /**
     * Mendapatkan semua dokumen yang diunggah untuk pendaftaran ini.
     * Relasi: registrations.id -> registration_documents.registration_id
     */
    public function documents(): HasMany
    {
        return $this->hasMany(RegistrationDocument::class);
    }

    /**
     * Mendapatkan data mahasiswa yang dihasilkan dari pendaftaran ini (jika sudah diterima).
     * Relasi: registrations.id -> mahasiswa.registration_id
     */
    public function mahasiswa(): HasOne
    {
        return $this->hasOne(Mahasiswa::class);
    }
}
