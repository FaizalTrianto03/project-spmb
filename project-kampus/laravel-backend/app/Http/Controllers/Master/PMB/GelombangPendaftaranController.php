<?php

namespace App\Http\Controllers\Master\PMB;

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
    public function renderGelombang()
    {
        try {
            $user = Auth::user();
            $webs = WebSetting::first();
            $gelombangs = GelombangPendaftaran::with('jalur')->get();
            $jalurs = JalurPendaftaran::all();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diambil',
                'data' => [
                    'user' => $user,
                    'webs' => $webs,
                    'menus' => 'Master',
                    'pages' => 'Gelombang Pendaftaran',
                    'academy' => $webs->school_apps . ' by ' . $webs->school_name,
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

    public function handleGelombang(Request $request)
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

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Gelombang Pendaftaran berhasil ditambahkan',
                'data' => $gelombang
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan Gelombang Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateGelombang(Request $request, $code)
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

            $gelombang = GelombangPendaftaran::where('code', $code)->firstOrFail();

            $gelombang->update([
                'name' => $validated['name'],
                'jalur_id' => $validated['jalur_id'],
                'start_date' => $validated['start_date'],
                'ended_date' => $validated['ended_date'],
                'desc' => $validated['desc'],
                'updated_by' => Auth::id(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Gelombang Pendaftaran berhasil diperbarui',
                'data' => $gelombang
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui Gelombang Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteGelombang($code)
    {
        try {
            DB::beginTransaction();

            $gelombang = GelombangPendaftaran::where('code', $code)->firstOrFail();

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
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Gelombang Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }
}