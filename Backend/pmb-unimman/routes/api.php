<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Public\UniversityController;
use App\Http\Controllers\Api\Public\StudyProgramController;
use App\Http\Controllers\Api\Public\AdmissionPathController;
use App\Http\Controllers\Api\Public\LocationController;
use App\Http\Controllers\Api\Public\AnnouncementController;

use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\Api\Public\AuthController;
use App\Http\Controllers\Api\Public\RegistrationController;
use App\Http\Controllers\Api\Public\DocumentController;
use App\Http\Controllers\Api\Public\PaymentController;

Route::prefix('public')->group(function () {
    // University Information
    Route::get('/university', [UniversityController::class, 'show']);
    Route::get('/study-programs', [StudyProgramController::class, 'index']);
    Route::get('/study-programs/{studyProgram}', [StudyProgramController::class, 'show']);

    // Admission Paths
    Route::get('/admission-paths', [AdmissionPathController::class, 'index']);
    Route::get('/admission-paths/{admissionPath}', [AdmissionPathController::class, 'show']);
    Route::get('/admission-paths/{admissionPath}/programs', [AdmissionPathController::class, 'programs']);
    Route::get('/admission-paths/{admissionPath}/requirements', [AdmissionPathController::class, 'requirements']);

    // Location Endpoints
    Route::get('/provinces', [LocationController::class, 'provinces']);
    Route::get('/provinces/{province}/cities', [LocationController::class, 'cities']);
    Route::get('/schools', [LocationController::class, 'schools']);

    // Announcements Endpoints
    Route::get('/announcements', [AnnouncementController::class, 'index']);
    Route::get('/announcements/latest', [AnnouncementController::class, 'latest']); // <-- PENTING: ini harus sebelum /{announcement}
    Route::get('/announcements/{announcement}', [AnnouncementController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function () {
        // ... (Route /logout dan /me yang sudah ada)

        // Registration Endpoint
        Route::get('/registrations/my', [RegistrationController::class, 'myRegistration']);
        // Route untuk update pendaftaran
        Route::put('/registrations/{registration}', [RegistrationController::class, 'update']);
        // Route untuk submit pendaftaran
        Route::post('/registrations/{registration}/submit', [RegistrationController::class, 'submit']);

        // Document Upload Endpoints
        Route::get('/registrations/{registration}/documents', [DocumentController::class, 'index']);
        Route::post('/registrations/{registration}/documents', [DocumentController::class, 'store']);
        Route::delete('/documents/{document}', [DocumentController::class, 'destroy']);

        // Payment Endpoints
        Route::get('/registrations/{registration}/payment', [PaymentController::class, 'show']);
        Route::post('/registrations/{registration}/payment', [PaymentController::class, 'store']);
        Route::post('/payments/{payment}/upload-proof', [PaymentController::class, 'uploadProof']);
    });
});

Route::prefix('public/auth')->group(function () {
    // Endpoint yang tidak butuh login
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
    Route::post('/reset-password', [NewPasswordController::class, 'store']);

    // Endpoint yang butuh login (middleware auth:sanctum)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});
