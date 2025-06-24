<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadProofRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\Models\Registration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PaymentController extends Controller
{
    use AuthorizesRequests;
    // GET /registrations/{registration}/payment
    public function show(Registration $registration)
    {
        $this->authorize('update', $registration); // Pakai policy registrasi

        $payment = $registration->payment;

        if (!$payment) {
            return response()->json(['message' => 'Informasi pembayaran belum tersedia.'], 404);
        }

        $this->authorize('view', $payment); // Pakai policy pembayaran
        return new PaymentResource($payment);
    }

    // POST /registrations/{registration}/payment
    public function store(Request $request, Registration $registration)
    {
        $this->authorize('update', $registration);

        // Cek apakah pembayaran sudah pernah dibuat
        if ($registration->payment) {
            return response()->json(['message' => 'Tagihan pembayaran sudah pernah dibuat.'], 422);
        }

        // Cek apakah pendaftaran sudah di-submit
        if ($registration->registration_status === 'DRAFT') {
            return response()->json(['message' => 'Harap submit pendaftaran terlebih dahulu.'], 422);
        }

        $payment = $registration->payment()->create([
            'payment_code' => 'PAY-' . time() . '-' . $registration->id,
            'amount' => $registration->admissionPath->registration_fee,
            'payment_method' => $request->input('payment_method', 'Belum Dipilih'),
            'payment_status' => 'PENDING',
        ]);

        return new PaymentResource($payment);
    }

    // POST /payments/{payment}/upload-proof
    public function uploadProof(UploadProofRequest $request, Payment $payment)
    {
        $this->authorize('update', $payment);

        // Hapus bukti lama jika ada
        if ($payment->payment_proof) {
            Storage::disk('public')->delete($payment->payment_proof);
        }

        // Simpan file baru
        $path = $request->file('payment_proof')->store('payment-proofs', 'public');

        // Update record di database
        $payment->update([
            'payment_proof' => $path,
            'payment_date' => now(),
        ]);

        return new PaymentResource($payment);
    }
}
