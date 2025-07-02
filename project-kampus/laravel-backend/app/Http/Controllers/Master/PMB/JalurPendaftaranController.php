<?php

namespace App\Http\Controllers\Master\PMB;

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
    public function renderJalur()
    {
        try {
            $user = Auth::user();
            $webs = WebSetting::first();
            $jalurs = JalurPendaftaran::with('periode')->get();
            $periodes = PeriodePendaftaran::all();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diambil',
                'data' => [
                    'user' => $user,
                    'webs' => $webs,
                    'menus' => 'Master',
                    'pages' => 'Jalur Pendaftaran',
                    'academy' => $webs->school_apps . ' by ' . $webs->school_name,
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

    public function handleJalur(Request $request)
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

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jalur Pendaftaran berhasil ditambahkan',
                'data' => $jalur
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan Jalur Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateJalur(Request $request, $code)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'periode_id' => 'required|integer|exists:periode_pendaftarans,id',
                'desc' => 'nullable|string',
            ]);

            $jalur = JalurPendaftaran::where('code', $code)->firstOrFail();

            $jalur->update([
                'name' => $validated['name'],
                'periode_id' => $validated['periode_id'],
                'desc' => $validated['desc'],
                'updated_by' => Auth::id(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jalur Pendaftaran berhasil diperbarui',
                'data' => $jalur
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui Jalur Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteJalur($code)
    {
        try {
            DB::beginTransaction();

            $jalur = JalurPendaftaran::where('code', $code)->firstOrFail();

            if (method_exists($jalur, 'pendaftar') && $jalur->pendaftar()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak dapat menghapus Jalur Pendaftaran yang masih memiliki data pendaftar'
                ], 400);
            }

            $jalur->update(['deleted_by' => Auth::id()]);
            $jalur->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Jalur Pendaftaran berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Jalur Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }
}