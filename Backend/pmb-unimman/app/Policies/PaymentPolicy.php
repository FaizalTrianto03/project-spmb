<?php

namespace App\Policies;

use App\Models\Payment;
use App\Models\User;

class PaymentPolicy
{
    // User boleh melihat pembayaran jika dia adalah pemilik pendaftaran terkait.
    public function view(User $user, Payment $payment): bool
    {
        return $user->registration_id === $payment->registration_id;
    }

    // User boleh mengupdate (upload bukti) jika dia adalah pemilik pendaftaran terkait.
    public function update(User $user, Payment $payment): bool
    {
        return $user->registration_id === $payment->registration_id;
    }
}
