<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    use HasFactory;

    // Menentukan nama tabel secara eksplisit
    protected $table = 'pegawai';

    // Properti untuk Primary Key non-standar
    protected $primaryKey = 'nip';
    public $incrementing = false;
    protected $keyType = 'string';

    // Tidak ada kolom timestamps (created_at, updated_at)
    public $timestamps = false;
}
