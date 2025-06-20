<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class School
 *
 * @property int $id
 * @property ?string $npsn
 * @property string $name
 * @property string $type
 * @property int $province_id
 * @property int $city_id
 * @property bool $is_verified
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class School extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'schools';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'npsn',
        'name',
        'type',
        'province_id',
        'city_id',
        'is_verified',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_verified' => 'boolean',
    ];

    /**
     * Relasi many-to-one dengan Province.
     * Satu sekolah hanya berlokasi di satu provinsi.
     */
    public function province(): BelongsTo
    {
        // Parameter kedua ('province_id') adalah nama foreign key di tabel 'schools'
        return $this->belongsTo(Province::class, 'province_id');
    }

    /**
     * Relasi many-to-one dengan City.
     * Satu sekolah hanya berlokasi di satu kota.
     */
    public function city(): BelongsTo
    {
        // Parameter kedua ('city_id') adalah nama foreign key di tabel 'schools'
        return $this->belongsTo(City::class, 'city_id');
    }
}
