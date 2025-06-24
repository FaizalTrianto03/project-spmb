<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdmissionRequirementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->requirement_name,
            'description' => $this->description,
            'is_mandatory' => $this->is_mandatory,
            'allowed_file_types' => $this->file_type,
            'max_size_in_kb' => $this->max_file_size,
        ];
    }
}
