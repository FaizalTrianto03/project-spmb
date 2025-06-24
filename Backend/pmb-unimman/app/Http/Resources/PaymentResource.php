<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'payment_code' => $this->payment_code,
            'amount' => (float) $this->amount,
            'status' => $this->payment_status,
            'payment_method' => $this->payment_method,
            'payment_date' => $this->payment_date?->toIso8601String(),
            'proof_url' => $this->payment_proof ? Storage::url($this->payment_proof) : null,
            'verification_date' => $this->verification_date?->toIso8601String(),
        ];
    }
}
