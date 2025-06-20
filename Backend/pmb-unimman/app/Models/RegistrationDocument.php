<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class RegistrationDocument
 *
 * @property int $id
 * @property int $registration_id
 * @property int $requirement_id
 * @property string $file_name
 * @property string $file_path
 * @property int $file_size
 * @property \Illuminate\Support\Carbon $upload_date
 * @property string $verification_status
 * @property ?string $verification_notes
 * @property \Illuminate\Support\Carbon $created_at
 */
class RegistrationDocument extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'registration_documents';

    /**
     * Define a custom name for the "updated at" timestamp column.
     * Kita set null karena tabel ini tidak memiliki kolom updated_at.
     */
    const UPDATED_AT = null;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'registration_id',
        'requirement_id',
        'file_name',
        'file_path',
        'file_size',
        'upload_date',
        'verification_status',
        'verification_notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'upload_date' => 'datetime',
    ];

    /**
     * Relasi many-to-one dengan Registration.
     * Satu dokumen hanya milik satu pendaftaran.
     */
    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    /**
     * Relasi many-to-one dengan AdmissionRequirement.
     * Satu dokumen mengacu pada satu jenis persyaratan.
     */
    public function admissionRequirement(): BelongsTo
    {
        return $this->belongsTo(AdmissionRequirement::class, 'requirement_id');
    }
}
