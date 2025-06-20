<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class City
 *
 * @property int $id
 * @property int $province_id
 * @property string $name
 * @property \Illuminate\Support\Carbon $created_at
 */
class City extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cities';

    /**
     * Indicates if the model should be timestamped.
     * Kita set false karena tabel ini tidak memiliki kolom updated_at.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Indicates if the model's ID is auto-incrementing.
     * Kita set false karena ID kota sudah ditentukan (bukan auto-increment).
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
        'province_id',
        'name',
        'created_at',
    ];

    /**
     * Relasi many-to-one dengan Province.
     * Satu kota hanya milik satu provinsi.
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }
}
