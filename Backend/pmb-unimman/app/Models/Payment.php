<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Payment
 *
 * @property int $id
 * @property int $registration_id
 * @property string $payment_code
 * @property float $amount
 * @property ?string $payment_method
 * @property ?\Illuminate\Support\Carbon $payment_date
 * @property string $payment_status
 * @property ?string $payment_proof
 * @property ?\Illuminate\Support\Carbon $verification_date
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class Payment extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'payments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'registration_id',
        'payment_code',
        'amount',
        'payment_method',
        'payment_date',
        'payment_status',
        'payment_proof',
        'verification_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'datetime',
        'verification_date' => 'datetime',
    ];

    /**
     * Relasi many-to-one dengan Registration.
     * Satu data pembayaran hanya milik satu pendaftaran.
     */
    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }
}
