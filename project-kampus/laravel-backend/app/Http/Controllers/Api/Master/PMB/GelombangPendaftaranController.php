<?php

namespace App\Http\Controllers\Api\Master\PMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\PMB\GelombangPendaftaran;
use App\Models\PMB\JalurPendaftaran;
use App\Models\Pengaturan\WebSetting;

class GelombangPendaftaranController extends Controller
{
    /**
     * Display a listing of the resource.
     * GET /api/pmb/gelombang
     */
    public function index()
    {
        try {
            $gelombangs = GelombangPendaftaran::with('jalur')->get();
            $jalurs = JalurPendaftaran::all();

            return response()->json([
                'success' => true,
                'message' => 'Data gelombang pendaftaran berhasil diambil',
                'data' => [
                    'gelombangs' => $gelombangs,
                    'jalurs' => $jalurs,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     * POST /api/pmb/gelombang
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'jalur_id' => 'required|exists:jalur_pendaftarans,id',
                'start_date' => 'required|date',
                'ended_date' => 'required|date|after:start_date',
                'desc' => 'nullable|string',
            ]);

            $code = 'GEL-' . Str::random(8);

            $gelombang = GelombangPendaftaran::create([
                'name' => $validated['name'],
                'code' => $code,
                'jalur_id' => $validated['jalur_id'],
                'start_date' => $validated['start_date'],
                'ended_date' => $validated['ended_date'],
                'desc' => $validated['desc'],
                'created_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $gelombang->load('jalur');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Gelombang Pendaftaran berhasil ditambahkan',
                'data' => $gelombang
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan Gelombang Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     * GET /api/pmb/gelombang/{id}
     */
    public function show($id)
    {
        try {
            $gelombang = GelombangPendaftaran::with('jalur')->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Data gelombang pendaftaran berhasil diambil',
                'data' => $gelombang
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gelombang Pendaftaran tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     * PUT/PATCH /api/pmb/gelombang/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'jalur_id' => 'required|exists:jalur_pendaftarans,id',
                'start_date' => 'required|date',
                'ended_date' => 'required|date|after:start_date',
                'desc' => 'nullable|string',
            ]);

            $gelombang = GelombangPendaftaran::findOrFail($id);

            $gelombang->update([
                'name' => $validated['name'],
                'jalur_id' => $validated['jalur_id'],
                'start_date' => $validated['start_date'],
                'ended_date' => $validated['ended_date'],
                'desc' => $validated['desc'],
                'updated_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $gelombang->load('jalur');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Gelombang Pendaftaran berhasil diperbarui',
                'data' => $gelombang
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gelombang Pendaftaran tidak ditemukan'
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui Gelombang Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /api/pmb/gelombang/{id}
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $gelombang = GelombangPendaftaran::findOrFail($id);

            // Cek apakah masih ada pendaftar terkait
            if (method_exists($gelombang, 'pendaftar') && $gelombang->pendaftar()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak dapat menghapus Gelombang yang masih memiliki Pendaftar terkait'
                ], 400);
            }

            $gelombang->update(['deleted_by' => Auth::id()]);
            $gelombang->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Gelombang Pendaftaran berhasil dihapus'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gelombang Pendaftaran tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Gelombang Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }
}
