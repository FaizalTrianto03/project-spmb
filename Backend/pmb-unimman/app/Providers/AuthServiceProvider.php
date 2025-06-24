<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Registration; // <-- Tambahkan ini
use App\Policies\RegistrationPolicy; // <-- Tambahkan ini
use App\Models\RegistrationDocument; // <-- Tambahkan ini
use App\Policies\DocumentPolicy; // <-- Tambahkan ini
use App\Models\Payment; // <-- Tambahkan ini
use App\Policies\PaymentPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Registration::class => RegistrationPolicy::class,
        RegistrationDocument::class => DocumentPolicy::class,
        Payment::class => PaymentPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
