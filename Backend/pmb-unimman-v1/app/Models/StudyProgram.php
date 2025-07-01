<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StudyProgram extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Mendapatkan unit (fakultas/jurusan) dari program studi ini.
     */
    public function unit(): BelongsTo
    {
        // Foreign key-nya adalah 'unit_kode'
        return $this->belongsTo(Unit::class, 'unit_kode', 'kode_unit');
    }

    /**
     * Mendapatkan semua pendaftaran yang memilih prodi ini sebagai pilihan pertama.
     */
    public function firstChoiceRegistrations(): HasMany
    {
        return $this->hasMany(Registration::class, 'first_choice_program_id');
    }

    /**
     * Mendapatkan semua pendaftaran yang memilih prodi ini sebagai pilihan kedua.
     */
    public function secondChoiceRegistrations(): HasMany
    {
        return $this->hasMany(Registration::class, 'second_choice_program_id');
    }
}
