<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudyProgramResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'program_code' => $this->code,
            'program_name' => $this->name,
            'education_level' => $this->level,
            'accreditation' => $this->accreditation,
        ];
    }
}
