<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $table = 'mahasiswa';

    // Properti untuk Primary Key non-standar
    protected $primaryKey = 'nim';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = false;

    /**
     * Relasi ke data pendaftaran asalnya.
     */
    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    /**
     * Relasi ke data program studi di tabel unit.
     */
    public function programStudi(): BelongsTo
    {
        return $this->belongsTo(Unit::class, 'program_studi', 'kode_unit');
    }

    /**
     * Seorang mahasiswa memiliki banyak data KRS.
     */
    public function krs(): HasMany
    {
        return $this->hasMany(Krs::class, 'nim', 'nim');
    }
}
