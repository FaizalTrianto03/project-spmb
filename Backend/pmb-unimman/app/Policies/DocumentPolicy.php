<?php

namespace App\Policies;

use App\Models\RegistrationDocument;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DocumentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, RegistrationDocument $registrationDocument): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, RegistrationDocument $registrationDocument): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, RegistrationDocument $document): bool
    {
        // Izinkan HANYA JIKA ID pendaftaran user sama dengan ID pendaftaran pada dokumen
        return $user->registration_id === $document->registration_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, RegistrationDocument $registrationDocument): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, RegistrationDocument $registrationDocument): bool
    {
        return false;
    }
}
