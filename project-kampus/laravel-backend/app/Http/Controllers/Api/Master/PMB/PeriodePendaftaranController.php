<?php

namespace App\Http\Controllers\Api\Master\PMB;

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
    /**
     * Display a listing of the resource.
     * GET /api/pmb/periode
     */
    public function index(Request $request)
    {
        try {
            $query = PeriodePendaftaran::with('taka'); // Ubah dari 'tahunAkademik' ke 'taka'

            // Filter berdasarkan tahun akademik
            if ($request->has('taka_id') && $request->taka_id) {
                $query->where('taka_id', $request->taka_id);
            }

            // Filter berdasarkan status aktif (berdasarkan tanggal)
            if ($request->has('status') && $request->status) {
                $now = now();
                if ($request->status === 'active') {
                    $query->where('start_date', '<=', $now)
                          ->where('ended_date', '>=', $now);
                } elseif ($request->status === 'upcoming') {
                    $query->where('start_date', '>', $now);
                } elseif ($request->status === 'expired') {
                    $query->where('ended_date', '<', $now);
                }
            }

            // Search berdasarkan nama
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('desc', 'like', "%{$search}%");
                });
            }

            $periodes = $query->get();
            $takas = TahunAkademik::all();

            return response()->json([
                'success' => true,
                'message' => 'Data periode pendaftaran berhasil diambil',
                'data' => [
                    'periodes' => $periodes,
                    'takas' => $takas
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
     * POST /api/pmb/periode
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'desc' => 'nullable|string',
                'taka_id' => 'required|integer|exists:tahun_akademiks,id',
                'start_date' => 'required|date',
                'ended_date' => 'required|date|after:start_date',
            ]);

            // Cek overlap periode dalam tahun akademik yang sama
            $overlap = PeriodePendaftaran::where('taka_id', $validated['taka_id'])
                ->where(function($query) use ($validated) {
                    $query->whereBetween('start_date', [$validated['start_date'], $validated['ended_date']])
                          ->orWhereBetween('ended_date', [$validated['start_date'], $validated['ended_date']])
                          ->orWhere(function($q) use ($validated) {
                              $q->where('start_date', '<=', $validated['start_date'])
                                ->where('ended_date', '>=', $validated['ended_date']);
                          });
                })->exists();

            if ($overlap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Periode pendaftaran tidak boleh overlap dengan periode lain dalam tahun akademik yang sama'
                ], 422);
            }

            $code = 'PRD-' . Str::random(8);

            $periode = PeriodePendaftaran::create([
                'name' => $validated['name'],
                'code' => $code,
                'desc' => $validated['desc'],
                'taka_id' => $validated['taka_id'],
                'start_date' => $validated['start_date'],
                'ended_date' => $validated['ended_date'],
                'created_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $periode->load('taka'); // Ubah dari 'tahunAkademik' ke 'taka'

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Periode Pendaftaran berhasil ditambahkan',
                'data' => $periode
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
                'message' => 'Gagal menambahkan Periode Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     * GET /api/pmb/periode/{id}
     */
    public function show($id)
    {
        try {
            $periode = PeriodePendaftaran::with(['taka', 'jalurs']) // Ubah dari 'tahunAkademik' ke 'taka'
                ->findOrFail($id);

            // Tambahkan informasi status periode
            $now = now();
            $status = 'expired';
            if ($periode->start_date <= $now && $periode->ended_date >= $now) {
                $status = 'active';
            } elseif ($periode->start_date > $now) {
                $status = 'upcoming';
            }

            $periode->status = $status;

            return response()->json([
                'success' => true,
                'message' => 'Data periode pendaftaran berhasil diambil',
                'data' => $periode
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
     * Update the specified resource in storage.
     * PUT/PATCH /api/pmb/periode/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'desc' => 'nullable|string',
                'taka_id' => 'required|integer|exists:tahun_akademiks,id',
                'start_date' => 'required|date',
                'ended_date' => 'required|date|after:start_date',
            ]);

            $periode = PeriodePendaftaran::findOrFail($id);

            // Cek overlap periode dalam tahun akademik yang sama (kecuali diri sendiri)
            $overlap = PeriodePendaftaran::where('taka_id', $validated['taka_id'])
                ->where('id', '!=', $id)
                ->where(function($query) use ($validated) {
                    $query->whereBetween('start_date', [$validated['start_date'], $validated['ended_date']])
                          ->orWhereBetween('ended_date', [$validated['start_date'], $validated['ended_date']])
                          ->orWhere(function($q) use ($validated) {
                              $q->where('start_date', '<=', $validated['start_date'])
                                ->where('ended_date', '>=', $validated['ended_date']);
                          });
                })->exists();

            if ($overlap) {
                return response()->json([
                    'success' => false,
                    'message' => 'Periode pendaftaran tidak boleh overlap dengan periode lain dalam tahun akademik yang sama'
                ], 422);
            }

            $periode->update([
                'name' => $validated['name'],
                'desc' => $validated['desc'],
                'taka_id' => $validated['taka_id'],
                'start_date' => $validated['start_date'],
                'ended_date' => $validated['ended_date'],
                'updated_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $periode->load('taka'); // Ubah dari 'tahunAkademik' ke 'taka'

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Periode Pendaftaran berhasil diperbarui',
                'data' => $periode
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Periode Pendaftaran tidak ditemukan'
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
                'message' => 'Gagal memperbarui Periode Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /api/pmb/periode/{id}
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $periode = PeriodePendaftaran::findOrFail($id);

            // Cek apakah masih ada jalur terkait
            if (method_exists($periode, 'jalurs') && $periode->jalurs()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tidak dapat menghapus Periode yang masih memiliki Jalur Pendaftaran'
                ], 400);
            }

            $periode->update(['deleted_by' => Auth::id()]);
            $periode->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Periode Pendaftaran berhasil dihapus'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Periode Pendaftaran tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Periode Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get active periode
     * GET /api/pmb/periode/active
     */
    public function getActive()
    {
        try {
            $now = now();
            $activePeriodes = PeriodePendaftaran::with('taka') // Ubah dari 'tahunAkademik' ke 'taka'
                ->where('start_date', '<=', $now)
                ->where('ended_date', '>=', $now)
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Data periode aktif berhasil diambil',
                'data' => $activePeriodes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get periode by tahun akademik
     * GET /api/pmb/periode/tahun-akademik/{taka_id}
     */
    public function getByTahunAkademik($taka_id)
    {
        try {
            // Validasi tahun akademik exists
            $taka = TahunAkademik::findOrFail($taka_id);

            $periodes = PeriodePendaftaran::with('taka') // Ubah dari 'tahunAkademik' ke 'taka'
                ->where('taka_id', $taka_id)
                ->get();

            return response()->json([
                'success' => true,
                'message' => "Data periode pendaftaran tahun akademik {$taka->name} berhasil diambil",
                'data' => [
                    'tahun_akademik' => $taka,
                    'periodes' => $periodes
                ]
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Tahun Akademik tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get periode statistics
     * GET /api/pmb/periode/statistics
     */
    public function getStatistics()
    {
        try {
            $now = now();
            
            $stats = [
                'total' => PeriodePendaftaran::count(),
                'active' => PeriodePendaftaran::where('start_date', '<=', $now)
                    ->where('ended_date', '>=', $now)->count(),
                'upcoming' => PeriodePendaftaran::where('start_date', '>', $now)->count(),
                'expired' => PeriodePendaftaran::where('ended_date', '<', $now)->count(),
                'by_tahun_akademik' => PeriodePendaftaran::select('taka_id')
                    ->selectRaw('COUNT(*) as total')
                    ->with('taka:id,name') // Ubah dari 'tahunAkademik:id,name' ke 'taka:id,name'
                    ->groupBy('taka_id')
                    ->get(),
            ];

            return response()->json([
                'success' => true,
                'message' => 'Statistik periode pendaftaran berhasil diambil',
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil statistik: ' . $e->getMessage()
            ], 500);
        }
    }
}
