<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Province
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon $created_at
 */
class Province extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'provinces';

    /**
     * Indicates if the model should be timestamped.
     * Kita set false karena tabel ini tidak memiliki kolom updated_at.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Indicates if the model's ID is auto-incrementing.
     * Kita set false karena ID provinsi sudah ditentukan (bukan auto-increment).
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The data type of the auto-incrementing ID.
     * Kita set 'integer' sesuai dengan skema di migrasi.
     *
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'created_at',
    ];

    /**
     * Relasi one-to-many dengan City.
     * Satu provinsi memiliki banyak kota.
     */
    public function cities(): HasMany
    {
        return $this->hasMany(City::class);
    }

    /**
     * Relasi one-to-many dengan School.
     * Satu provinsi memiliki banyak sekolah.
     */
    public function schools(): HasMany
    {
        return $this->hasMany(School::class);
    }
}
