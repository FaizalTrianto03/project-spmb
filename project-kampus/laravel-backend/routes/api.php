<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController as GlobalAuthApiController;

// Import Controllers Master PMB
use App\Http\Controllers\Api\Master\PMB\BiayaPendaftaranController;
use App\Http\Controllers\Api\Master\PMB\GelombangPendaftaranController;
use App\Http\Controllers\Api\Master\PMB\JadwalPMBController;
use App\Http\Controllers\Api\Master\PMB\JalurPendaftaranController;
use App\Http\Controllers\Api\Master\PMB\PendaftarController;
use App\Http\Controllers\Api\Master\PMB\PeriodePendaftaranController;
use App\Http\Controllers\Api\Master\PMB\SyaratPendaftaranController;

// Import Controllers Master Akademik
use App\Http\Controllers\Api\Master\Akademik\ProgramStudiController;

// Rute standar user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rute autentikasi API umum
Route::post('/login', [GlobalAuthApiController::class, 'login']);
Route::post('/logout', [GlobalAuthApiController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/forgot-password', [GlobalAuthApiController::class, 'forgotPassword']);
Route::post('/reset-password', [GlobalAuthApiController::class, 'resetPassword']);
Route::post('/register', [GlobalAuthApiController::class, 'register']);

// Rute API untuk Master Data (Membutuhkan Autentikasi Sanctum)
Route::middleware('auth:sanctum')->group(function () {

    // MASTER PMB
    Route::apiResource('pmb/periode', PeriodePendaftaranController::class);
    Route::apiResource('pmb/jalur', JalurPendaftaranController::class);
    Route::apiResource('pmb/biaya', BiayaPendaftaranController::class);
    Route::apiResource('pmb/syarat', SyaratPendaftaranController::class);
    Route::apiResource('pmb/gelombang', GelombangPendaftaranController::class);
    Route::apiResource('pmb/jadwal', JadwalPMBController::class);

    // PMB - Routes tambahan khusus (harus sebelum apiResource)
    Route::get('pmb/syarat/statistics', [SyaratPendaftaranController::class, 'getStatistics']);
    Route::get('pmb/syarat/jalur/{jalur_id}', [SyaratPendaftaranController::class, 'getByJalur']);
    Route::put('pmb/syarat/reorder', [SyaratPendaftaranController::class, 'reorder']);
    Route::delete('pmb/syarat/bulk', [SyaratPendaftaranController::class, 'bulkDestroy']);
    Route::get('pmb/periode/active', [PeriodePendaftaranController::class, 'getActive']);
    Route::get('pmb/periode/statistics', [PeriodePendaftaranController::class, 'getStatistics']);
    Route::get('pmb/periode/tahun-akademik/{taka_id}', [PeriodePendaftaranController::class, 'getByTahunAkademik']);
    Route::get('pmb/jalur/periode/{periode_id}', [JalurPendaftaranController::class, 'getByPeriode']);
    Route::get('pmb/jalur/with-stats', [JalurPendaftaranController::class, 'getWithStats']);
    
    // PMB - Pendaftar
    Route::apiResource('pmb/pendaftar', PendaftarController::class);
    Route::post('pmb/pendaftar/{pendaftar}/dokumen', [PendaftarController::class, 'handleDokumen']);
    Route::patch('pmb/pendaftar/{pendaftar}/validasi', [PendaftarController::class, 'validasiDokumen']);
    Route::get('pmb/pendaftar/export/excel', [PendaftarController::class, 'exportPendaftarExcel']);
    Route::get('pmb/pendaftar/export/pdf', [PendaftarController::class, 'exportPendaftarPDF']);
    Route::post('pmb/pendaftar/batch/validasi', [PendaftarController::class, 'batchValidasiDokumen']);
    Route::post('pmb/pendaftar/batch/status', [PendaftarController::class, 'batchUpdateStatus']);

    // MASTER AKADEMIK
    
    // Program Studi - Routes tambahan khusus (harus sebelum apiResource)
    Route::get('akademik/program-studi/statistics', [ProgramStudiController::class, 'getStatistics']);
    Route::get('akademik/program-studi/fakultas/{fakultas_id}', [ProgramStudiController::class, 'getByFakultas']);
    Route::get('akademik/program-studi/active', [ProgramStudiController::class, 'getActive']);
    Route::get('akademik/program-studi/with-kaprodi', [ProgramStudiController::class, 'getWithKaprodi']);
    Route::delete('akademik/program-studi/bulk', [ProgramStudiController::class, 'bulkDestroy']);
    Route::patch('akademik/program-studi/bulk/status', [ProgramStudiController::class, 'bulkUpdateStatus']);
    
    // Program Studi - Resource routes
    Route::apiResource('akademik/program-studi', ProgramStudiController::class);
});
