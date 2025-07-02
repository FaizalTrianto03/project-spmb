<?php

namespace App\Http\Controllers\Api\Master\PMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\PMB\JadwalPMB;
use App\Models\PMB\GelombangPendaftaran;
use App\Models\Pengaturan\WebSetting;

class JadwalPMBController extends Controller
{
    /**
     * Display a listing of the resource.
     * GET /api/pmb/jadwal
     */
    public function index()
    {
        try {
            $jadwals = JadwalPMB::with('gelombang')->get();
            $gelombangs = GelombangPendaftaran::all();

            return response()->json([
                'success' => true,
                'message' => 'Data jadwal PMB berhasil diambil',
                'data' => [
                    'jadwals' => $jadwals,
                    'gelombangs' => $gelombangs,
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
     * POST /api/pmb/jadwal
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'type' => 'required|in:Pendaftaran,Tes,Wawancara,Pengumuman,Daftar Ulang',
                'gelombang_id' => 'required|exists:gelombang_pendaftarans,id',
                'start_date' => 'required|date',
                'ended_date' => 'required|date|after:start_date',
                'desc' => 'nullable|string',
            ]);

            $code = 'JAD-' . Str::random(8);

            $jadwal = JadwalPMB::create([
                'name' => $validated['name'],
                'code' => $code,
                'type' => $validated['type'],
                'gelombang_id' => $validated['gelombang_id'],
                'start_date' => $validated['start_date'],
                'ended_date' => $validated['ended_date'],
                'desc' => $validated['desc'],
                'created_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $jadwal->load('gelombang');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jadwal PMB berhasil ditambahkan',
                'data' => $jadwal
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
                'message' => 'Gagal menambahkan Jadwal PMB: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     * GET /api/pmb/jadwal/{id}
     */
    public function show($id)
    {
        try {
            $jadwal = JadwalPMB::with('gelombang')->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Data jadwal PMB berhasil diambil',
                'data' => $jadwal
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Jadwal PMB tidak ditemukan'
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
     * PUT/PATCH /api/pmb/jadwal/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'type' => 'required|in:Pendaftaran,Tes,Wawancara,Pengumuman,Daftar Ulang',
                'gelombang_id' => 'required|exists:gelombang_pendaftarans,id',
                'start_date' => 'required|date',
                'ended_date' => 'required|date|after:start_date',
                'desc' => 'nullable|string',
            ]);

            $jadwal = JadwalPMB::findOrFail($id);

            $jadwal->update([
                'name' => $validated['name'],
                'type' => $validated['type'],
                'gelombang_id' => $validated['gelombang_id'],
                'start_date' => $validated['start_date'],
                'ended_date' => $validated['ended_date'],
                'desc' => $validated['desc'],
                'updated_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $jadwal->load('gelombang');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jadwal PMB berhasil diperbarui',
                'data' => $jadwal
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Jadwal PMB tidak ditemukan'
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
                'message' => 'Gagal memperbarui Jadwal PMB: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /api/pmb/jadwal/{id}
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $jadwal = JadwalPMB::findOrFail($id);

            $jadwal->update(['deleted_by' => Auth::id()]);
            $jadwal->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jadwal PMB berhasil dihapus'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Jadwal PMB tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Jadwal PMB: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get jadwal by type
     * GET /api/pmb/jadwal/type/{type}
     */
    public function getByType($type)
    {
        try {
            $allowedTypes = ['Pendaftaran', 'Tes', 'Wawancara', 'Pengumuman', 'Daftar Ulang'];
            
            if (!in_array($type, $allowedTypes)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tipe jadwal tidak valid. Tipe yang diizinkan: ' . implode(', ', $allowedTypes)
                ], 400);
            }

            $jadwals = JadwalPMB::with('gelombang')
                ->where('type', $type)
                ->get();

            return response()->json([
                'success' => true,
                'message' => "Data jadwal PMB tipe {$type} berhasil diambil",
                'data' => $jadwals
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get active jadwal (current date between start_date and ended_date)
     * GET /api/pmb/jadwal/active
     */
    public function getActive()
    {
        try {
            $currentDate = now()->format('Y-m-d');
            
            $jadwals = JadwalPMB::with('gelombang')
                ->whereDate('start_date', '<=', $currentDate)
                ->whereDate('ended_date', '>=', $currentDate)
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Data jadwal PMB aktif berhasil diambil',
                'data' => $jadwals
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }
}
