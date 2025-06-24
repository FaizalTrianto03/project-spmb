<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Otorisasi ditangani di Controller/Policy
    }

    public function rules(): array
    {
        return [
            'requirement_id' => 'required|integer|exists:admission_requirements,id',
            // File wajib ada, tipe pdf/jpg/png, maks 2MB (2048 KB)
            'file' => 'required|file|mimes:pdf,jpg,png|max:2048',
        ];
    }
}
