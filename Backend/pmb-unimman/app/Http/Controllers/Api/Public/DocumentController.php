<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Resources\RegistrationDocumentResource;
use App\Models\Registration;
use App\Models\RegistrationDocument;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DocumentController extends Controller
{
    use AuthorizesRequests;

    // GET /registrations/{registration}/documents
    public function index(Registration $registration)
    {
        // Otorisasi: Cek apakah user boleh melihat dokumen pendaftaran ini
        $this->authorize('update', $registration); // Kita bisa pakai policy 'update' dari Registration

        $documents = $registration->documents()->with('admissionRequirement')->get();

        return RegistrationDocumentResource::collection($documents);
    }

    // POST /registrations/{registration}/documents
    public function store(StoreDocumentRequest $request, Registration $registration): RegistrationDocumentResource
    {
        $this->authorize('update', $registration);

        $file = $request->file('file');
        // Simpan file ke storage/app/public/documents dan dapatkan path-nya
        $path = $file->store('documents', 'public');

        $document = $registration->documents()->create([
            'requirement_id' => $request->input('requirement_id'),
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_size' => $file->getSize(), // dalam bytes
        ]);

        return new RegistrationDocumentResource($document->load('admissionRequirement'));
    }

    // DELETE /documents/{document}
    public function destroy(RegistrationDocument $document): JsonResponse
    {
        // Otorisasi: Cek apakah user boleh menghapus dokumen ini
        $this->authorize('delete', $document);

        // Hanya boleh hapus jika status verifikasi masih PENDING
        if ($document->verification_status !== 'PENDING') {
            return response()->json(['message' => 'Dokumen yang sudah diverifikasi tidak dapat dihapus.'], 403);
        }

        // Hapus file fisik dari storage
        Storage::disk('public')->delete($document->file_path);

        // Hapus record dari database
        $document->delete();

        return response()->json([
            'message' => 'Dokumen berhasil dihapus.'
        ], 200);
    }
}
