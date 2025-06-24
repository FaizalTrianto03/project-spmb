<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdmissionPathResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'path_code' => $this->code,
            'path_name' => $this->name,
            'academic_year' => $this->academic_year,
            'semester' => $this->semester,
            'description' => $this->description,
            'registration_fee' => (float) $this->registration_fee,
            'start_date' => $this->start_date->format('Y-m-d'),
            'end_date' => $this->end_date->format('Y-m-d'),
            'study_system' => $this->study_system,
            'schedule' => $this->schedule,
            'target_students' => $this->target_students,
        ];
    }
}
