<?php

namespace App\Http\Controllers\Api\Master\Akademik;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\Akademik\ProgramStudi;
use App\Models\Akademik\Fakultas;
use App\Models\Dosen;

class ProgramStudiController extends Controller
{
    /**
     * Display a listing of the resource.
     * GET /api/akademik/program-studi
     */
    public function index(Request $request)
    {
        try {
            $query = ProgramStudi::with(['fakultas', 'kaprodi']);

            // Filter berdasarkan fakultas
            if ($request->has('fakultas_id') && $request->fakultas_id) {
                $query->where('fakultas_id', $request->fakultas_id);
            }

            // Filter berdasarkan level
            if ($request->has('level') && $request->level) {
                $query->where('level', $request->level);
            }

            // Filter berdasarkan title (jenjang)
            if ($request->has('title') && $request->title) {
                $query->where('title', $request->title);
            }

            // Filter berdasarkan status
            if ($request->has('status') && $request->status) {
                $query->where('status', $request->status);
            }

            // Search berdasarkan nama atau kode
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('code', 'like', "%{$search}%")
                      ->orWhere('slug', 'like', "%{$search}%");
                });
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination atau get all
            if ($request->has('per_page')) {
                $prodis = $query->paginate($request->per_page);
            } else {
                $prodis = $query->get();
            }
            
            // Data pendukung untuk form
            $fakultas = Fakultas::where('status', 'Aktif')->get();
            $dosens = Dosen::where('type', 1)->get();

            return response()->json([
                'success' => true,
                'message' => 'Data program studi berhasil diambil',
                'data' => [
                    'program_studis' => $prodis,
                    'fakultas' => $fakultas,
                    'dosens' => $dosens,
                    'levels' => ['Diploma', 'Sarjana', 'Magister', 'Doktoral'],
                    'titles' => ['D3', 'S1', 'S2', 'S3']
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
     * POST /api/akademik/program-studi
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'fakultas_id' => 'required|exists:fakultas,id',
                'kaprodi_id' => 'nullable|exists:dosens,id',
                'level' => 'required|in:Diploma,Sarjana,Magister,Doktoral',
                'title' => 'required|in:D3,S1,S2,S3',
                'title_start' => 'nullable|string|max:50',
                'title_ended' => 'nullable|string|max:50',
                'accreditation' => 'nullable|string|max:10',
                'duration' => 'nullable|integer|min:1',
                'desc' => 'nullable|string',
                'objectives' => 'nullable|string',
                'careers' => 'nullable|string',
            ]);

            // Cek duplikasi nama program studi
            $exists = ProgramStudi::where('name', $validated['name'])->exists();
            if ($exists) {
                return response()->json([
                    'success' => false,
                    'message' => 'Program studi dengan nama tersebut sudah ada'
                ], 422);
            }

            $code = 'PS-' . Str::random(8);

            $prodi = ProgramStudi::create([
                'name' => $validated['name'],
                'code' => $code,
                'slug' => Str::slug($validated['name']),
                'fakultas_id' => $validated['fakultas_id'],
                'kaprodi_id' => $validated['kaprodi_id'],
                'level' => $validated['level'],
                'title' => $validated['title'],
                'title_start' => $validated['title_start'],
                'title_ended' => $validated['title_ended'],
                'accreditation' => $validated['accreditation'],
                'duration' => $validated['duration'],
                'desc' => $validated['desc'],
                'objectives' => $validated['objectives'],
                'careers' => $validated['careers'],
                'status' => 'Aktif',
                'created_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $prodi->load(['fakultas', 'kaprodi']);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Program Studi berhasil ditambahkan',
                'data' => $prodi
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
                'message' => 'Gagal menambahkan Program Studi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     * GET /api/akademik/program-studi/{id}
     */
    public function show($id)
    {
        try {
            $prodi = ProgramStudi::with(['fakultas', 'kaprodi'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Data program studi berhasil diambil',
                'data' => $prodi
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Program Studi tidak ditemukan'
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
     * PUT/PATCH /api/akademik/program-studi/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'fakultas_id' => 'required|exists:fakultas,id',
                'kaprodi_id' => 'nullable|exists:dosens,id',
                'level' => 'required|in:Diploma,Sarjana,Magister,Doktoral',
                'title' => 'required|in:D3,S1,S2,S3',
                'title_start' => 'nullable|string|max:50',
                'title_ended' => 'nullable|string|max:50',
                'accreditation' => 'nullable|string|max:10',
                'duration' => 'nullable|integer|min:1',
                'desc' => 'nullable|string',
                'objectives' => 'nullable|string',
                'careers' => 'nullable|string',
                'status' => 'required|in:Aktif,Tidak Aktif',
            ]);

            $prodi = ProgramStudi::findOrFail($id);

            // Cek duplikasi nama program studi (kecuali diri sendiri)
            $exists = ProgramStudi::where('name', $validated['name'])
                ->where('id', '!=', $id)
                ->exists();
            if ($exists) {
                return response()->json([
                    'success' => false,
                    'message' => 'Program studi dengan nama tersebut sudah ada'
                ], 422);
            }

            $prodi->update([
                'name' => $validated['name'],
                'slug' => Str::slug($validated['name']),
                'fakultas_id' => $validated['fakultas_id'],
                'kaprodi_id' => $validated['kaprodi_id'],
                'level' => $validated['level'],
                'title' => $validated['title'],
                'title_start' => $validated['title_start'],
                'title_ended' => $validated['title_ended'],
                'accreditation' => $validated['accreditation'],
                'duration' => $validated['duration'],
                'desc' => $validated['desc'],
                'objectives' => $validated['objectives'],
                'careers' => $validated['careers'],
                'status' => $validated['status'],
                'updated_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $prodi->load(['fakultas', 'kaprodi']);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Program Studi berhasil diperbarui',
                'data' => $prodi
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Program Studi tidak ditemukan'
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
                'message' => 'Gagal memperbarui Program Studi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /api/akademik/program-studi/{id}
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $prodi = ProgramStudi::findOrFail($id);

            // Cek apakah program studi masih digunakan
            // (Sesuaikan dengan relasi yang ada)
            // if ($prodi->mahasiswas()->count() > 0) {
            //     return response()->json([
            //         'success' => false,
            //         'message' => 'Tidak dapat menghapus program studi yang masih memiliki mahasiswa'
            //     ], 400);
            // }

            $prodi->update(['deleted_by' => Auth::id()]);
            $prodi->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Program Studi berhasil dihapus'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Program Studi tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Program Studi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get program studi by fakultas
     * GET /api/akademik/program-studi/fakultas/{fakultas_id}
     */
    public function getByFakultas($fakultas_id)
    {
        try {
            $fakultas = Fakultas::findOrFail($fakultas_id);
            
            $prodis = ProgramStudi::with(['kaprodi'])
                ->where('fakultas_id', $fakultas_id)
                ->where('status', 'Aktif')
                ->orderBy('name')
                ->get();

            return response()->json([
                'success' => true,
                'message' => "Data program studi fakultas {$fakultas->name} berhasil diambil",
                'data' => [
                    'fakultas' => $fakultas,
                    'program_studis' => $prodis
                ]
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Fakultas tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get active program studi
     * GET /api/akademik/program-studi/active
     */
    public function getActive()
    {
        try {
            $prodis = ProgramStudi::with(['fakultas', 'kaprodi'])
                ->where('status', 'Aktif')
                ->orderBy('name')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Data program studi aktif berhasil diambil',
                'data' => $prodis
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get program studi with kaprodi info
     * GET /api/akademik/program-studi/with-kaprodi
     */
    public function getWithKaprodi()
    {
        try {
            $prodis = ProgramStudi::with(['fakultas', 'kaprodi'])
                ->whereHas('kaprodi')
                ->where('status', 'Aktif')
                ->orderBy('name')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Data program studi dengan kaprodi berhasil diambil',
                'data' => $prodis
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get statistics
     * GET /api/akademik/program-studi/statistics
     */
    public function getStatistics()
    {
        try {
            $stats = [
                'total' => ProgramStudi::count(),
                'aktif' => ProgramStudi::where('status', 'Aktif')->count(),
                'tidak_aktif' => ProgramStudi::where('status', 'Tidak Aktif')->count(),
                'by_level' => ProgramStudi::select('level')
                    ->selectRaw('COUNT(*) as total')
                    ->groupBy('level')
                    ->get(),
                'by_fakultas' => ProgramStudi::select('fakultas_id')
                    ->selectRaw('COUNT(*) as total')
                    ->with('fakultas:id,name')
                    ->groupBy('fakultas_id')
                    ->get(),
                'with_kaprodi' => ProgramStudi::whereNotNull('kaprodi_id')->count(),
                'without_kaprodi' => ProgramStudi::whereNull('kaprodi_id')->count(),
            ];

            return response()->json([
                'success' => true,
                'message' => 'Statistik program studi berhasil diambil',
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil statistik: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk delete program studi
     * DELETE /api/akademik/program-studi/bulk
     */
    public function bulkDestroy(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'ids' => 'required|array|min:1',
                'ids.*' => 'integer|exists:program_studis,id'
            ]);

            $deletedCount = 0;
            foreach ($validated['ids'] as $id) {
                $prodi = ProgramStudi::find($id);
                if ($prodi) {
                    $prodi->update(['deleted_by' => Auth::id()]);
                    $prodi->delete();
                    $deletedCount++;
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => "{$deletedCount} program studi berhasil dihapus"
            ]);
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
                'message' => 'Gagal menghapus program studi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk update status
     * PATCH /api/akademik/program-studi/bulk/status
     */
    public function bulkUpdateStatus(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'ids' => 'required|array|min:1',
                'ids.*' => 'integer|exists:program_studis,id',
                'status' => 'required|in:Aktif,Tidak Aktif'
            ]);

            $updatedCount = ProgramStudi::whereIn('id', $validated['ids'])
                ->update([
                    'status' => $validated['status'],
                    'updated_by' => Auth::id()
                ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => "{$updatedCount} program studi berhasil diperbarui statusnya"
            ]);
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
                'message' => 'Gagal mengupdate status: ' . $e->getMessage()
            ], 500);
        }
    }
}
