<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class StudyProgram
 *
 * @property int $id
 * @property string $code
 * @property string $name
 * @property string $level
 * @property ?string $accreditation
 * @property ?string $website
 * @property int $quota
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class StudyProgram extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'study_programs';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'code',
        'name',
        'level',
        'accreditation',
        'website',
        'quota',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Relasi many-to-many dengan AdmissionPath.
     * Satu program studi bisa ada di banyak jalur pendaftaran.
     */
    public function admissionPaths(): BelongsToMany
    {
        // Parameter kedua adalah nama tabel pivot yang kita buat sebelumnya.
        return $this->belongsToMany(AdmissionPath::class, 'admission_path_programs')
            ->withPivot('quota') // Jika ingin mengambil data kuota spesifik dari tabel pivot
            ->withTimestamps(); // Jika tabel pivot memiliki created_at/updated_at
    }
}
