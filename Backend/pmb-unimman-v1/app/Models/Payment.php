<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Mendapatkan data pendaftaran dari pembayaran ini.
     */
    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }
}
