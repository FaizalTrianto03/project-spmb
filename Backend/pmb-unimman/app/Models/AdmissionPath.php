<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class AdmissionPath
 *
 * @property int $id
 * @property string $code
 * @property string $name
 * @property ?string $description
 * @property float $registration_fee
 * @property ?string $study_system
 * @property ?string $target_students
 * @property ?string $schedule
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property ?string $wave
 * @property string $academic_year
 * @property string $semester
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class AdmissionPath extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'admission_paths';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'code',
        'name',
        'description',
        'registration_fee',
        'study_system',
        'target_students',
        'schedule',
        'start_date',
        'end_date',
        'wave',
        'academic_year',
        'semester',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'registration_fee' => 'decimal:2',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Relasi many-to-many dengan StudyProgram.
     * Satu jalur pendaftaran bisa membuka banyak program studi.
     */
    public function studyPrograms(): BelongsToMany
    {
        // Mengambil pivot 'quota' dan 'created_at' secara eksplisit
        return $this->belongsToMany(StudyProgram::class, 'admission_path_programs')
            ->withPivot('quota', 'created_at');
    }

    /**
     * Relasi one-to-many dengan Registration.
     * Satu jalur pendaftaran bisa memiliki banyak pendaftar.
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * Relasi one-to-many dengan AdmissionRequirement.
     * Satu jalur pendaftaran bisa memiliki banyak persyaratan.
     */
    public function admissionRequirements(): HasMany
    {
        return $this->hasMany(AdmissionRequirement::class);
    }
}
