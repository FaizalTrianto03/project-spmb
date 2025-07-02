<?php

namespace App\Http\Controllers\Api\Master\PMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\PMB\BiayaPendaftaran;
use App\Models\PMB\JalurPendaftaran;
use App\Models\Pengaturan\WebSetting;

class BiayaPendaftaranController extends Controller
{
    /**
     * Display a listing of the resource.
     * GET /api/pmb/biaya
     */
    public function index()
    {
        try {
            $biayas = BiayaPendaftaran::with('jalur')->get();
            $jalurs = JalurPendaftaran::all();

            return response()->json([
                'success' => true,
                'message' => 'Data biaya pendaftaran berhasil diambil',
                'data' => [
                    'biayas' => $biayas,
                    'jalurs' => $jalurs
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
     * POST /api/pmb/biaya
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'jalur_id' => 'required|exists:jalur_pendaftarans,id',
                'value' => 'required|numeric|min:0',
                'desc' => 'nullable|string',
            ]);

            $code = 'BIA-' . Str::random(8);

            $biaya = BiayaPendaftaran::create([
                'name' => $validated['name'],
                'code' => $code,
                'jalur_id' => $validated['jalur_id'],
                'value' => $validated['value'],
                'desc' => $validated['desc'],
                'created_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $biaya->load('jalur');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Biaya Pendaftaran berhasil ditambahkan',
                'data' => $biaya
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
                'message' => 'Gagal menambahkan Biaya Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     * GET /api/pmb/biaya/{id}
     */
    public function show($id)
    {
        try {
            $biaya = BiayaPendaftaran::with('jalur')->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Data biaya pendaftaran berhasil diambil',
                'data' => $biaya
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Biaya Pendaftaran tidak ditemukan'
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
     * PUT/PATCH /api/pmb/biaya/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'jalur_id' => 'required|exists:jalur_pendaftarans,id',
                'value' => 'required|numeric|min:0',
                'desc' => 'nullable|string',
            ]);

            $biaya = BiayaPendaftaran::findOrFail($id);

            $biaya->update([
                'name' => $validated['name'],
                'jalur_id' => $validated['jalur_id'],
                'value' => $validated['value'],
                'desc' => $validated['desc'],
                'updated_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $biaya->load('jalur');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Biaya Pendaftaran berhasil diperbarui',
                'data' => $biaya
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Biaya Pendaftaran tidak ditemukan'
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
                'message' => 'Gagal memperbarui Biaya Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /api/pmb/biaya/{id}
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $biaya = BiayaPendaftaran::findOrFail($id);

            $biaya->update(['deleted_by' => Auth::id()]);
            $biaya->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Biaya Pendaftaran berhasil dihapus'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Biaya Pendaftaran tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Biaya Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }
}
