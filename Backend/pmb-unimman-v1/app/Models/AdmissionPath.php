<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdmissionPath extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Mendapatkan semua pendaftaran yang ada di jalur ini.
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * Mendapatkan semua persyaratan untuk jalur pendaftaran ini.
     */
    public function requirements(): HasMany
    {
        return $this->hasMany(AdmissionRequirement::class);
    }
}
