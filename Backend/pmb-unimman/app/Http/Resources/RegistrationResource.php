<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'registration_number' => $this->registration_number,
            'status' => $this->registration_status,
            'payment_status' => $this->payment_status,
            'personal_data' => [
                'full_name' => $this->full_name,
                'gender' => $this->gender,
                'mobile_number' => $this->mobile_number,
                'email' => $this->email,
                'date_of_birth' => $this->date_of_birth->format('Y-m-d'),
                'place_of_birth' => $this->place_of_birth,
                'nationality' => $this->nationality,
                'nik' => $this->nik,
            ],
            'education_data' => [
                'school_id' => $this->school_id,
                'school_name' => $this->whenLoaded('school', $this->school->name),
                'specialization' => $this->school_specialization,
                'graduation_year' => $this->graduation_year,
            ],
            'path_and_programs' => [
                'admission_path' => new AdmissionPathResource($this->whenLoaded('admissionPath')),
                'first_choice' => new StudyProgramResource($this->whenLoaded('firstChoiceStudyProgram')),
                'second_choice' => new StudyProgramResource($this->whenLoaded('secondChoiceStudyProgram')),
            ],
            'registered_at' => $this->created_at->toIso8601String(),
        ];
    }
}
