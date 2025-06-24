<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class RegistrationDocumentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'requirement_name' => $this->whenLoaded('admissionRequirement', $this->admissionRequirement->requirement_name),
            'original_file_name' => $this->file_name,
            'file_url' => Storage::url($this->file_path), // <-- Membuat URL publik ke file
            'file_size_in_kb' => round($this->file_size / 1024, 2),
            // 'upload_date' => $this->upload_date->toIso8601String(),
            'upload_date' => now(),
            'verification_status' => $this->verification_status,
            'notes' => $this->verification_notes,
        ];
    }
}
