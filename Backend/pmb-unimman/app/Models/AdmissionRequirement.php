<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class AdmissionRequirement
 *
 * @property int $id
 * @property int $admission_path_id
 * @property string $requirement_name
 * @property ?string $description
 * @property bool $is_mandatory
 * @property ?string $file_type
 * @property ?int $max_file_size
 * @property \Illuminate\Support\Carbon $created_at
 */
class AdmissionRequirement extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'admission_requirements';

    /**
     * Indicates if the model should be timestamped.
     * Kita set false karena tabel ini tidak memiliki kolom updated_at.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'admission_path_id',
        'requirement_name',
        'description',
        'is_mandatory',
        'file_type',
        'max_file_size',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_mandatory' => 'boolean',
    ];

    /**
     * Relasi many-to-one dengan AdmissionPath.
     * Satu persyaratan hanya milik satu jalur pendaftaran.
     */
    public function admissionPath(): BelongsTo
    {
        return $this->belongsTo(AdmissionPath::class);
    }
}
