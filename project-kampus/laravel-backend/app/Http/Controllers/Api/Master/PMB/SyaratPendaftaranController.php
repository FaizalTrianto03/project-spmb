<?php

namespace App\Http\Controllers\Api\Master\PMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\PMB\SyaratPendaftaran;
use App\Models\PMB\JalurPendaftaran;

class SyaratPendaftaranController extends Controller
{
    /**
     * Display a listing of the resource.
     * GET /api/pmb/syarat
     */
    public function index(Request $request)
    {
        try {
            $query = SyaratPendaftaran::with('jalur');

            // Filter berdasarkan jalur pendaftaran
            if ($request->has('jalur_id') && $request->jalur_id) {
                $query->where('jalur_id', $request->jalur_id);
            }

            // Search berdasarkan nama atau deskripsi
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('desc', 'like', "%{$search}%");
                });
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            $syarats = $query->get();
            $jalurs = JalurPendaftaran::with('periode.taka')->get();

            return response()->json([
                'success' => true,
                'message' => 'Data syarat pendaftaran berhasil diambil',
                'data' => [
                    'syarats' => $syarats,
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
     * POST /api/pmb/syarat
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'jalur_id' => 'required|integer|exists:jalur_pendaftarans,id',
                'desc' => 'nullable|string',
                'is_required' => 'boolean',
                'order' => 'nullable|integer|min:1',
            ]);

            // Cek duplikasi nama syarat dalam jalur yang sama
            $exists = SyaratPendaftaran::where('jalur_id', $validated['jalur_id'])
                ->where('name', $validated['name'])
                ->exists();

            if ($exists) {
                return response()->json([
                    'success' => false,
                    'message' => 'Syarat dengan nama tersebut sudah ada dalam jalur pendaftaran ini'
                ], 422);
            }

            $code = 'SYR-' . Str::random(8);

            // Set order jika tidak disediakan
            if (!isset($validated['order'])) {
                $maxOrder = SyaratPendaftaran::where('jalur_id', $validated['jalur_id'])
                    ->max('order') ?? 0;
                $validated['order'] = $maxOrder + 1;
            }

            $syarat = SyaratPendaftaran::create([
                'name' => $validated['name'],
                'code' => $code,
                'jalur_id' => $validated['jalur_id'],
                'desc' => $validated['desc'],
                'is_required' => $validated['is_required'] ?? true,
                'order' => $validated['order'],
                'created_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $syarat->load('jalur.periode.taka');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Syarat Pendaftaran berhasil ditambahkan',
                'data' => $syarat
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
                'message' => 'Gagal menambahkan Syarat Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     * GET /api/pmb/syarat/{id}
     */
    public function show($id)
    {
        try {
            $syarat = SyaratPendaftaran::with(['jalur.periode.taka'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Data syarat pendaftaran berhasil diambil',
                'data' => $syarat
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Syarat Pendaftaran tidak ditemukan'
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
     * PUT/PATCH /api/pmb/syarat/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'jalur_id' => 'required|integer|exists:jalur_pendaftarans,id',
                'desc' => 'nullable|string',
                'is_required' => 'boolean',
                'order' => 'nullable|integer|min:1',
            ]);

            $syarat = SyaratPendaftaran::findOrFail($id);

            // Cek duplikasi nama syarat dalam jalur yang sama (kecuali diri sendiri)
            $exists = SyaratPendaftaran::where('jalur_id', $validated['jalur_id'])
                ->where('name', $validated['name'])
                ->where('id', '!=', $id)
                ->exists();

            if ($exists) {
                return response()->json([
                    'success' => false,
                    'message' => 'Syarat dengan nama tersebut sudah ada dalam jalur pendaftaran ini'
                ], 422);
            }

            // Set order jika tidak disediakan dan jalur berubah
            if (!isset($validated['order']) && $syarat->jalur_id != $validated['jalur_id']) {
                $maxOrder = SyaratPendaftaran::where('jalur_id', $validated['jalur_id'])
                    ->max('order') ?? 0;
                $validated['order'] = $maxOrder + 1;
            }

            $syarat->update([
                'name' => $validated['name'],
                'jalur_id' => $validated['jalur_id'],
                'desc' => $validated['desc'],
                'is_required' => $validated['is_required'] ?? $syarat->is_required,
                'order' => $validated['order'] ?? $syarat->order,
                'updated_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $syarat->load('jalur.periode.taka');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Syarat Pendaftaran berhasil diperbarui',
                'data' => $syarat
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Syarat Pendaftaran tidak ditemukan'
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
                'message' => 'Gagal memperbarui Syarat Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /api/pmb/syarat/{id}
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $syarat = SyaratPendaftaran::findOrFail($id);

            // Cek apakah syarat masih digunakan oleh pendaftar
            // (Sesuaikan dengan model yang ada)
            // if ($syarat->pendaftars()->count() > 0) {
            //     return response()->json([
            //         'success' => false,
            //         'message' => 'Tidak dapat menghapus syarat yang masih digunakan oleh pendaftar'
            //     ], 400);
            // }

            $syarat->update(['deleted_by' => Auth::id()]);
            $syarat->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Syarat Pendaftaran berhasil dihapus'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Syarat Pendaftaran tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus Syarat Pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get syarat by jalur pendaftaran
     * GET /api/pmb/syarat/jalur/{jalur_id}
     */
    public function getByJalur($jalur_id)
    {
        try {
            // Validasi jalur exists
            $jalur = JalurPendaftaran::with('periode.taka')->findOrFail($jalur_id);

            $syarats = SyaratPendaftaran::with('jalur')
                ->where('jalur_id', $jalur_id)
                ->orderBy('order')
                ->get();

            return response()->json([
                'success' => true,
                'message' => "Data syarat pendaftaran jalur {$jalur->name} berhasil diambil",
                'data' => [
                    'jalur' => $jalur,
                    'syarats' => $syarats
                ]
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Jalur Pendaftaran tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update order of syarat
     * PUT /api/pmb/syarat/reorder
     */
    public function reorder(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'jalur_id' => 'required|integer|exists:jalur_pendaftarans,id',
                'orders' => 'required|array',
                'orders.*.id' => 'required|integer|exists:syarat_pendaftarans,id',
                'orders.*.order' => 'required|integer|min:1',
            ]);

            foreach ($validated['orders'] as $orderData) {
                SyaratPendaftaran::where('id', $orderData['id'])
                    ->where('jalur_id', $validated['jalur_id'])
                    ->update([
                        'order' => $orderData['order'],
                        'updated_by' => Auth::id()
                    ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Urutan syarat pendaftaran berhasil diperbarui'
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
                'message' => 'Gagal mengubah urutan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get syarat statistics
     * GET /api/pmb/syarat/statistics
     */
    public function getStatistics()
    {
        try {
            $stats = [
                'total' => SyaratPendaftaran::count(),
                'required' => SyaratPendaftaran::where('is_required', true)->count(),
                'optional' => SyaratPendaftaran::where('is_required', false)->count(),
                'by_jalur' => SyaratPendaftaran::select('jalur_id')
                    ->selectRaw('COUNT(*) as total')
                    ->with('jalur:id,name')
                    ->groupBy('jalur_id')
                    ->get(),
            ];

            return response()->json([
                'success' => true,
                'message' => 'Statistik syarat pendaftaran berhasil diambil',
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
     * Bulk delete syarat
     * DELETE /api/pmb/syarat/bulk
     */
    public function bulkDestroy(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'ids' => 'required|array|min:1',
                'ids.*' => 'integer|exists:syarat_pendaftarans,id'
            ]);

            $deletedCount = 0;
            foreach ($validated['ids'] as $id) {
                $syarat = SyaratPendaftaran::find($id);
                if ($syarat) {
                    $syarat->update(['deleted_by' => Auth::id()]);
                    $syarat->delete();
                    $deletedCount++;
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => "{$deletedCount} syarat pendaftaran berhasil dihapus"
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
                'message' => 'Gagal menghapus syarat: ' . $e->getMessage()
            ], 500);
        }
    }
}
