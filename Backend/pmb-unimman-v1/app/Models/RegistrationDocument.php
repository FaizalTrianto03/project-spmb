<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RegistrationDocument extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Mendapatkan data pendaftaran dari dokumen ini.
     */
    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    /**
     * Mendapatkan data persyaratan dari dokumen ini.
     */
    public function requirement(): BelongsTo
    {
        return $this->belongsTo(AdmissionRequirement::class);
    }
}
