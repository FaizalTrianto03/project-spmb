<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Otorisasi sudah ditangani oleh Policy, jadi kita set true di sini.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        // this->route('registration') akan mengambil model dari URL
        $registrationId = $this->route('registration')->id;

        return [
            'full_name' => 'required|string|max:255',
            'gender' => 'required|in:MALE,FEMALE',
            'mobile_number' => 'required|string|max:20',
            // NIK harus unik, tapi abaikan untuk record pendaftaran saat ini
            'nik' => ['required', 'string', 'size:16', Rule::unique('registrations')->ignore($registrationId)],
            'date_of_birth' => 'required|date',
            'place_of_birth' => 'required|string|max:100',
            'nationality' => 'required|string|max:50',
            'province_id' => 'required|integer|exists:provinces,id',
            'city_id' => 'required|integer|exists:cities,id',
            'school_id' => 'required|integer|exists:schools,id',
            'school_specialization' => 'required|string|max:100',
            'graduation_year' => 'required|integer|digits:4',
            'first_choice_program_id' => 'required|integer|exists:study_programs,id',
            'second_choice_program_id' => 'nullable|integer|exists:study_programs,id|different:first_choice_program_id',
        ];
    }
}
