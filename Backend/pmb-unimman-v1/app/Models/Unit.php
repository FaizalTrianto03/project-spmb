<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unit extends Model
{
    use HasFactory;

    // Karena primary key bukan 'id', kita perlu menentukannya
    protected $primaryKey = 'kode_unit';
    // Dan tipenya bukan integer
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Satu unit memiliki banyak program studi.
     */
    public function studyPrograms(): HasMany
    {
        // Kita perlu menyebutkan foreign key dan local key karena non-standar
        return $this->hasMany(StudyProgram::class, 'unit_kode', 'kode_unit');
    }
}
