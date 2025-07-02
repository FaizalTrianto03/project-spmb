<?php

namespace App\Http\Controllers\Api\Master\PMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\PMB\JalurPendaftaran;
use App\Models\PMB\PeriodePendaftaran;
use App\Models\Pengaturan\WebSetting;

class JalurPendaftaranController extends Controller
{
    /**
     * Display a listing of the resource.
     * GET /api/pmb/jalur
     */
    public function index()
    {
        try {
            $jalurs = JalurPendaftaran::with('periode')->get();
            $periodes = PeriodePendaftaran::all();

            return response()->json([
                'success' => true,
                'message' => 'Data jalur pendaftaran berhasil diambil',
                'data' => [
                    'jalurs' => $jalurs,
                    'periodes' => $periodes,
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
     * POST /api/pmb/jalur
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'periode_id' => 'required|integer|exists:periode_pendaftarans,id',
                'desc' => 'nullable|string',
            ]);

            $code = 'JAL-' . Str::random(8);

            $jalur = JalurPendaftaran::create([
                'name' => $validated['name'],
                'code' => $code,
                'periode_id' => $validated['periode_id'],
                'desc' => $validated['desc'],
                'created_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $jalur->load('periode');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jalur Pendaftaran berhasil ditambahkan',
                'data' => $jalur
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
                'message' => 'Gagal menambahkan Jalur Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     * GET /api/pmb/jalur/{id}
     */
    public function show($id)
    {
        try {
            $jalur = JalurPendaftaran::with('periode')->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Data jalur pendaftaran berhasil diambil',
                'data' => $jalur
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Jalur Pendaftaran tidak ditemukan'
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
     * PUT/PATCH /api/pmb/jalur/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'periode_id' => 'required|integer|exists:periode_pendaftarans,id',
                'desc' => 'nullable|string',
            ]);

            $jalur = JalurPendaftaran::findOrFail($id);

            $jalur->update([
                'name' => $validated['name'],
                'periode_id' => $validated['periode_id'],
                'desc' => $validated['desc'],
                'updated_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $jalur->load('periode');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jalur Pendaftaran berhasil diperbarui',
                'data' => $jalur
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Jalur Pendaftaran tidak ditemukan'
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
                'message' => 'Gagal memperbarui Jalur Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /api/pmb/jalur/{id}
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $jalur = JalurPendaftaran::findOrFail($id);

            // Cek apakah masih ada pendaftar terkait
            if (method_exists($jalur, 'pendaftar') && $jalur->pendaftar()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak dapat menghapus Jalur Pendaftaran yang masih memiliki data pendaftar'
                ], 400);
            }

            // Cek apakah masih ada gelombang terkait
            if (method_exists($jalur, 'gelombangs') && $jalur->gelombangs()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak dapat menghapus Jalur Pendaftaran yang masih memiliki Gelombang terkait'
                ], 400);
            }

            $jalur->update(['deleted_by' => Auth::id()]);
            $jalur->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jalur Pendaftaran berhasil dihapus'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Jalur Pendaftaran tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Jalur Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get jalur by periode
     * GET /api/pmb/jalur/periode/{periode_id}
     */
    public function getByPeriode($periode_id)
    {
        try {
            // Validasi periode exists
            $periode = PeriodePendaftaran::findOrFail($periode_id);

            $jalurs = JalurPendaftaran::with('periode')
                ->where('periode_id', $periode_id)
                ->get();

            return response()->json([
                'success' => true,
                'message' => "Data jalur pendaftaran periode {$periode->name} berhasil diambil",
                'data' => [
                    'periode' => $periode,
                    'jalurs' => $jalurs
                ]
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Periode Pendaftaran tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get jalur with gelombang count
     * GET /api/pmb/jalur/with-stats
     */
    public function getWithStats()
    {
        try {
            $jalurs = JalurPendaftaran::with('periode')
                ->withCount(['gelombangs', 'pendaftar'])
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Data jalur pendaftaran dengan statistik berhasil diambil',
                'data' => $jalurs
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }
}
