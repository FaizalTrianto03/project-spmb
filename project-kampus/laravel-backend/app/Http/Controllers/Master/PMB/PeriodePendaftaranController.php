<?php

namespace App\Http\Controllers\Master\PMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\PMB\PeriodePendaftaran;
use App\Models\Akademik\TahunAkademik;
use App\Models\Pengaturan\WebSetting;

class PeriodePendaftaranController extends Controller
{
    public function renderPeriode()
    {
        try {
            $periodes = PeriodePendaftaran::all();
            $takas = TahunAkademik::all();

            return response()->json([
                'periodes' => $periodes,
                'takas' => $takas
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal mengambil data', 'message' => $e->getMessage()], 500);
        }
    }

    public function handlePeriode(Request $request)
    {
        
        try {
            DB::beginTransaction();

            $request->validate([
                'name' => 'required|string|max:255',
                'desc' => 'nullable|string',
                'taka_id' => 'required|integer',
                'start_date' => 'required|date',
                'ended_date' => 'required|date|after:start_date',
            ]);

            $code = 'PRD-' . Str::random(8);

            $periode = PeriodePendaftaran::create([
                'name' => $request->name,
                'code' => $code,
                'desc' => $request->desc,
                'taka_id' => $request->taka_id,
                'start_date' => $request->start_date,
                'ended_date' => $request->ended_date,
                'created_by' => Auth::id(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Periode Pendaftaran berhasil ditambahkan', 'data' => $periode], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Gagal menambahkan Periode Pendaftaran', 'message' => $e->getMessage()], 500);
        }
    }

    public function updatePeriode(Request $request, $code)
    {
        try {
            DB::beginTransaction();

            $request->validate([
                'name' => 'required|string|max:255',
                'desc' => 'nullable|string',
                'taka_id' => 'required|integer',
                'start_date' => 'required|date',
                'ended_date' => 'required|date|after:start_date',
            ]);

            $periode = PeriodePendaftaran::where('code', $code)->firstOrFail();

            $periode->update([
                'name' => $request->name,
                'desc' => $request->desc,
                'taka_id' => $request->taka_id,
                'start_date' => $request->start_date,
                'ended_date' => $request->ended_date,
                'updated_by' => Auth::id(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Periode Pendaftaran berhasil diperbarui', 'data' => $periode]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Gagal memperbarui Periode Pendaftaran', 'message' => $e->getMessage()], 500);
        }
    }

    public function deletePeriode($code)
    {
        try {
            DB::beginTransaction();

            $periode = PeriodePendaftaran::where('code', $code)->firstOrFail();

            if ($periode->jalurs()->count() > 0) {
                return response()->json(['error' => 'Tidak dapat menghapus Periode yang masih memiliki Jalur Pendaftaran'], 400);
            }

            $periode->update(['deleted_by' => Auth::id()]);
            $periode->delete();

            DB::commit();
            return response()->json(['message' => 'Periode Pendaftaran berhasil dihapus']);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Gagal menghapus Periode Pendaftaran', 'message' => $e->getMessage()], 500);
        }
    }
}