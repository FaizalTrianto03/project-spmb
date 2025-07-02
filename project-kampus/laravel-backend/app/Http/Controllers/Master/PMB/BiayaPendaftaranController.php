<?php

namespace App\Http\Controllers\Master\PMB;

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
    public function renderBiaya()
    {
        try {
            $user = Auth::user();
            $webs = WebSetting::first();
            $biayas = BiayaPendaftaran::with('jalur')->get();
            $jalurs = JalurPendaftaran::all();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diambil',
                'data' => [
                    'user' => $user,
                    'webs' => $webs,
                    'menus' => "Master",
                    'pages' => "Biaya Pendaftaran",
                    'academy' => $webs->school_apps . ' by ' . $webs->school_name,
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

    public function handleBiaya(Request $request)
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

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Biaya Pendaftaran berhasil ditambahkan',
                'data' => $biaya
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan Biaya Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateBiaya(Request $request, $code)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'jalur_id' => 'required|exists:jalur_pendaftarans,id',
                'value' => 'required|numeric|min:0',
                'desc' => 'nullable|string',
            ]);

            $biaya = BiayaPendaftaran::where('code', $code)->firstOrFail();

            $biaya->update([
                'name' => $validated['name'],
                'jalur_id' => $validated['jalur_id'],
                'value' => $validated['value'],
                'desc' => $validated['desc'],
                'updated_by' => Auth::id(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Biaya Pendaftaran berhasil diperbarui',
                'data' => $biaya
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui Biaya Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteBiaya($code)
    {
        try {
            DB::beginTransaction();

            $biaya = BiayaPendaftaran::where('code', $code)->firstOrFail();

            $biaya->update(['deleted_by' => Auth::id()]);
            $biaya->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Biaya Pendaftaran berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Biaya Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }
}