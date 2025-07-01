<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdmissionRequirement extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Mendapatkan jalur pendaftaran dari persyaratan ini.
     */
    public function admissionPath(): BelongsTo
    {
        return $this->belongsTo(AdmissionPath::class);
    }
}
