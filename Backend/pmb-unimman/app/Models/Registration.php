<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Class Registration
 *
 * @property int $id
 * @property string $registration_number
 * @property int $admission_path_id
 * @property string $full_name
 * @property string $gender
 * @property string $mobile_number
 * @property string $email
 * @property \Illuminate\Support\Carbon $date_of_birth
 * @property string $place_of_birth
 * @property string $nationality
 * @property string $nik
 * @property int $province_id
 * @property int $city_id
 * @property int $school_id
 * @property string $school_specialization
 * @property int $graduation_year
 * @property int $first_choice_program_id
 * @property ?int $second_choice_program_id
 * @property string $registration_status
 * @property string $payment_status
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Registration extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'registrations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'registration_number',
        'admission_path_id',
        'full_name',
        'gender',
        'mobile_number',
        'email',
        'date_of_birth',
        'place_of_birth',
        'nationality',
        'nik',
        'province_id',
        'city_id',
        'school_id',
        'school_specialization',
        'graduation_year',
        'first_choice_program_id',
        'second_choice_program_id',
        'registration_status',
        'payment_status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
    ];

    /**
     * Relasi ke AdmissionPath: Satu pendaftaran milik satu jalur pendaftaran.
     */
    public function admissionPath(): BelongsTo
    {
        return $this->belongsTo(AdmissionPath::class);
    }

    /**
     * Relasi ke School: Satu pendaftaran berasal dari satu sekolah.
     */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /**
     * Relasi ke StudyProgram untuk pilihan pertama.
     */
    public function firstChoiceStudyProgram(): BelongsTo
    {
        return $this->belongsTo(StudyProgram::class, 'first_choice_program_id');
    }

    /**
     * Relasi ke StudyProgram untuk pilihan kedua.
     */
    public function secondChoiceStudyProgram(): BelongsTo
    {
        return $this->belongsTo(StudyProgram::class, 'second_choice_program_id');
    }

    /**
     * Relasi ke RegistrationDocument: Satu pendaftaran memiliki banyak dokumen.
     */
    public function documents(): HasMany
    {
        return $this->hasMany(RegistrationDocument::class);
    }

    /**
     * Relasi ke Payment: Satu pendaftaran memiliki satu data pembayaran.
     */
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    /**
     * Relasi ke User: Satu pendaftaran memiliki satu akun user.
     */
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
}
