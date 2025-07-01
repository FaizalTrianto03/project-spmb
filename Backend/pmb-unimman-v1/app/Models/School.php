<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class School extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Mendapatkan semua pendaftar dari sekolah ini.
     */
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * Mendapatkan data provinsi dari sekolah ini.
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    /**
     * Mendapatkan data kota dari sekolah ini.
     */
    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }
}
