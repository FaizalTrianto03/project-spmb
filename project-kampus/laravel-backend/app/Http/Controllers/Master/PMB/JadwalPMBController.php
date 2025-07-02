<?php

namespace App\Http\Controllers\Master\PMB;

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
    public function renderJadwal()
    {
        try {
            $user = Auth::user();
            $webs = WebSetting::first();
            $jadwals = JadwalPMB::with('gelombang')->get();
            $gelombangs = GelombangPendaftaran::all();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diambil',
                'data' => [
                    'user' => $user,
                    'webs' => $webs,
                    'menus' => 'Master',
                    'pages' => 'Jadwal PMB',
                    'academy' => $webs->school_apps . ' by ' . $webs->school_name,
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

    public function handleJadwal(Request $request)
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

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jadwal PMB berhasil ditambahkan',
                'data' => $jadwal
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan Jadwal PMB: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateJadwal(Request $request, $code)
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

            $jadwal = JadwalPMB::where('code', $code)->firstOrFail();

            $jadwal->update([
                'name' => $validated['name'],
                'type' => $validated['type'],
                'gelombang_id' => $validated['gelombang_id'],
                'start_date' => $validated['start_date'],
                'ended_date' => $validated['ended_date'],
                'desc' => $validated['desc'],
                'updated_by' => Auth::id(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jadwal PMB berhasil diperbarui',
                'data' => $jadwal
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui Jadwal PMB: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteJadwal($code)
    {
        try {
            DB::beginTransaction();

            $jadwal = JadwalPMB::where('code', $code)->firstOrFail();

            $jadwal->update(['deleted_by' => Auth::id()]);
            $jadwal->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jadwal PMB berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Jadwal PMB: ' . $e->getMessage()
            ], 500);
        }
    }
}