<?php

namespace App\Http\Controllers\Master\PMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\PMB\SyaratPendaftaran;
use App\Models\PMB\JalurPendaftaran;

class SyaratPendaftaranController extends Controller
{
    public function renderSyarat()
    {
        try {
            $syarats = SyaratPendaftaran::with('jalur')->get();
            $jalurs = JalurPendaftaran::all();

            return response()->json([
                'syarats' => $syarats,
                'jalurs' => $jalurs
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal mengambil data', 'message' => $e->getMessage()], 500);
        }
    }

    public function handleSyarat(Request $request)
    {
        try {
            DB::beginTransaction();

            $request->validate([
                'name' => 'required|string|max:255',
                'jalur_id' => 'required|exists:jalur_pendaftarans,id',
                'desc' => 'nullable|string',
            ]);

            $code = 'SYR-' . Str::random(8);

            $syarat = SyaratPendaftaran::create([
                'name' => $request->name,
                'code' => $code,
                'jalur_id' => $request->jalur_id,
                'desc' => $request->desc,
                'created_by' => Auth::id(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Syarat Pendaftaran berhasil ditambahkan', 'data' => $syarat], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Gagal menambahkan Syarat Pendaftaran', 'message' => $e->getMessage()], 500);
        }
    }

    public function updateSyarat(Request $request, $code)
    {
        try {
            DB::beginTransaction();

            $request->validate([
                'name' => 'required|string|max:255',
                'jalur_id' => 'required|exists:jalur_pendaftarans,id',
                'desc' => 'nullable|string',
            ]);

            $syarat = SyaratPendaftaran::where('code', $code)->firstOrFail();

            $syarat->update([
                'name' => $request->name,
                'jalur_id' => $request->jalur_id,
                'desc' => $request->desc,
                'updated_by' => Auth::id(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Syarat Pendaftaran berhasil diperbarui', 'data' => $syarat]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Gagal memperbarui Syarat Pendaftaran', 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteSyarat($code)
    {
        try {
            DB::beginTransaction();

            $syarat = SyaratPendaftaran::where('code', $code)->firstOrFail();

            $syarat->update([
                'deleted_by' => Auth::id()
            ]);
            $syarat->delete();

            DB::commit();
            return response()->json(['message' => 'Syarat Pendaftaran berhasil dihapus']);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Gagal menghapus Syarat Pendaftaran', 'message' => $e->getMessage()], 500);
        }
    }
}