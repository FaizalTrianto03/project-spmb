<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\RegistrationResource;
use App\Http\Requests\UpdateRegistrationRequest;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class RegistrationController extends Controller
{
    use AuthorizesRequests;
    // GET /api/public/registrations/my
    public function myRegistration(Request $request)
    {
        $user = $request->user();

        $registration = $user->registration()->with([
            'admissionPath',
            'school',
            'firstChoiceStudyProgram',
            'secondChoiceStudyProgram'
        ])->first();

        if (!$registration) {
            return response()->json(['message' => 'Data pendaftaran tidak ditemukan.'], 404);
        }

        // Gunakan Resource untuk mengubah data menjadi format JSON yang kita inginkan
        return new RegistrationResource($registration);
    }

    // PUT /api/public/registrations/{registration}
    public function update(UpdateRegistrationRequest $request, Registration $registration): RegistrationResource|JsonResponse
    {
        // 1. Otorisasi: Cek apakah user boleh mengupdate pendaftaran ini
        $this->authorize('update', $registration);

        // 2. Cek apakah status masih DRAFT (sesuai dokumen)
        if ($registration->registration_status !== 'DRAFT') {
            return response()->json([
                'message' => 'Pendaftaran tidak dapat diubah karena sudah di-submit.'
            ], 403); // 403 Forbidden
        }

        // 3. Ambil data yang sudah tervalidasi dari Form Request
        $validatedData = $request->validated();

        // 4. Update data di database
        $registration->update($validatedData);

        // 5. Kembalikan data yang sudah diupdate dengan format Resource
        return new RegistrationResource($registration);
    }

    // POST /api/public/registrations/{registration}/submit
    public function submit(Request $request, Registration $registration): RegistrationResource|JsonResponse
    {
        // 1. Otorisasi: Cek apakah user boleh men-submit pendaftaran ini
        $this->authorize('submit', $registration);

        // 2. Validasi Status: Pastikan pendaftaran masih dalam status DRAFT.
        if ($registration->registration_status !== 'DRAFT') {
            return response()->json([
                'message' => 'Pendaftaran ini sudah di-submit sebelumnya dan tidak bisa diubah lagi.'
            ], 422); // 422 Unprocessable Entity
        }

        // TODO (Opsional): Di sini Anda bisa menambahkan validasi kelengkapan data
        // sebelum memperbolehkan user untuk submit.

        // 3. Ubah status dan simpan
        $registration->registration_status = 'SUBMITTED';
        $registration->save();

        // 4. Kembalikan data pendaftaran dengan status baru
        return new RegistrationResource($registration);
    }
}
