<?php

namespace App\Http\Controllers\Api\Master\PMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\Pendaftaran\Pendaftar;
use App\Models\Pendaftaran\DokumenPMB;
use App\Models\PMB\SyaratPendaftaran;
use App\Models\Pengaturan\WebSetting;
use App\Models\Mahasiswa;
use App\Models\Akademik\JenisKelas;
use App\Models\Akademik\ProgramStudi;
use App\Models\PMB\JalurPendaftaran;
use App\Models\PMB\GelombangPendaftaran;

class PendaftarController extends Controller
{
    /**
     * Display a listing of the resource.
     * GET /api/pmb/pendaftar
     */
    public function index(Request $request)
    {
        try {
            $query = Pendaftar::with(['dokumen.syarat', 'jalur', 'gelombang', 'mahasiswa']);

            // Filter berdasarkan status
            if ($request->has('status') && $request->status) {
                $query->where('status', $request->status);
            }

            // Filter berdasarkan jalur
            if ($request->has('jalur_id') && $request->jalur_id) {
                $query->where('jalur_id', $request->jalur_id);
            }

            // Filter berdasarkan gelombang
            if ($request->has('gelombang_id') && $request->gelombang_id) {
                $query->where('gelombang_id', $request->gelombang_id);
            }

            // Search berdasarkan nama atau email
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('phone', 'like', "%{$search}%")
                      ->orWhere('numb_reg', 'like', "%{$search}%");
                });
            }

            $pendaftars = $query->get();

            return response()->json([
                'success' => true,
                'message' => 'Data pendaftar berhasil diambil',
                'data' => $pendaftars
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
     * POST /api/pmb/pendaftar
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'jalur_id' => 'required|integer|exists:jalur_pendaftarans,id',
                'prodi_1' => 'required|integer|exists:program_studis,id',
                'prodi_2' => 'required|integer|exists:program_studis,id',
                'jenis_id' => 'required|integer|exists:jenis_kelas,id',
                'gelombang_id' => 'required|integer|exists:gelombang_pendaftarans,id',
                'phone' => 'required|string|unique:mahasiswas',
                'email' => 'required|email|unique:mahasiswas',
                'name' => 'required|string|max:255',
                'bio_gender' => 'required|in:Laki-laki,Perempuan',
                'bio_placebirth' => 'required|string|max:255',
                'bio_datebirth' => 'required|date',
                'bio_religion' => 'required|string|max:100',
                'ktp_addres' => 'required|string',
                'ktp_rt' => 'required|string|max:10',
                'ktp_rw' => 'required|string|max:10',
                'ktp_village' => 'required|string|max:255',
                'ktp_subdistrict' => 'required|string|max:255',
                'ktp_city' => 'required|string|max:255',
                'ktp_province' => 'required|string|max:255',
                'ktp_poscode' => 'required|string|max:10',
                'numb_ktp' => 'required|string|unique:mahasiswas|size:16',
            ]);

            $mahasiswaCode = 'MHS-' . Str::random(8);
            $code = 'PMB-' . Str::random(8);
            $numbReg = 'REG-' . date('Ymd') . '-' . Str::random(4);

            $mahasiswa = Mahasiswa::create([
                'type' => 0,
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'bio_gender' => $validated['bio_gender'],
                'bio_placebirth' => $validated['bio_placebirth'],
                'bio_datebirth' => $validated['bio_datebirth'],
                'bio_religion' => $validated['bio_religion'],
                'ktp_addres' => $validated['ktp_addres'],
                'ktp_rt' => $validated['ktp_rt'],
                'ktp_rw' => $validated['ktp_rw'],
                'ktp_village' => $validated['ktp_village'],
                'ktp_subdistrict' => $validated['ktp_subdistrict'],
                'ktp_city' => $validated['ktp_city'],
                'ktp_province' => $validated['ktp_province'],
                'ktp_poscode' => $validated['ktp_poscode'],
                'numb_ktp' => $validated['numb_ktp'],
                'numb_reg' => $numbReg,
                'code' => $mahasiswaCode,
                'password' => Hash::make($mahasiswaCode),
                'created_by' => Auth::id(),
            ]);

            $pendaftar = Pendaftar::create([
                'mahasiswa_id' => $mahasiswa->id,
                'jalur_id' => $validated['jalur_id'],
                'jenis_id' => $validated['jenis_id'],
                'prodi_1' => $validated['prodi_1'],
                'prodi_2' => $validated['prodi_2'],
                'gelombang_id' => $validated['gelombang_id'],
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'name' => $validated['name'],
                'code' => $code,
                'numb_reg' => $numbReg,
                'register_date' => now(),
                'status' => 'Pending',
                'created_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $pendaftar->load(['dokumen.syarat', 'jalur', 'gelombang', 'mahasiswa']);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pendaftaran berhasil ditambahkan',
                'data' => $pendaftar
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
                'message' => 'Gagal menambahkan pendaftaran: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     * GET /api/pmb/pendaftar/{id}
     */
    public function show($id)
    {
        try {
            $pendaftar = Pendaftar::with([
                'dokumen.syarat', 
                'jalur', 
                'gelombang', 
                'mahasiswa',
                'prodi1',
                'prodi2',
                'jenisKelas'
            ])->findOrFail($id);

            return response()->json([
                'success' => true,
                'message' => 'Data pendaftar berhasil diambil',
                'data' => $pendaftar
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pendaftar tidak ditemukan'
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
     * PUT/PATCH /api/pmb/pendaftar/{id}
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $pendaftar = Pendaftar::findOrFail($id);

            $validated = $request->validate([
                'phone' => 'required|string|unique:pendaftars,phone,' . $id,
                'email' => 'required|email|unique:pendaftars,email,' . $id,
                'name' => 'required|string|max:255',
                'status' => 'required|in:Pending,Lulus,Gagal,Batal'
            ]);

            $mahasiswa = Mahasiswa::findOrFail($pendaftar->mahasiswa_id);

            $pendaftar->update([
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'name' => $validated['name'],
                'status' => $validated['status'],
                'updated_by' => Auth::id(),
            ]);

            $mahasiswa->update([
                'phone' => $validated['phone'],
                'email' => $validated['email'],
                'name' => $validated['name'],
                'updated_by' => Auth::id(),
            ]);

            // Load relasi untuk response
            $pendaftar->load(['dokumen.syarat', 'jalur', 'gelombang', 'mahasiswa']);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Data pendaftar berhasil diperbarui',
                'data' => $pendaftar
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Pendaftar tidak ditemukan'
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
                'message' => 'Gagal memperbarui data pendaftar: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /api/pmb/pendaftar/{id}
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $pendaftar = Pendaftar::findOrFail($id);
            $mahasiswa = Mahasiswa::findOrFail($pendaftar->mahasiswa_id);

            // Hapus dokumen terkait
            DokumenPMB::where('pendaftar_id', $pendaftar->id)->update(['deleted_by' => Auth::id()]);
            DokumenPMB::where('pendaftar_id', $pendaftar->id)->delete();

            $pendaftar->update(['deleted_by' => Auth::id()]);
            $mahasiswa->update(['deleted_by' => Auth::id()]);

            $pendaftar->delete();
            $mahasiswa->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pendaftar berhasil dihapus'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Pendaftar tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus pendaftar: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload dokumen untuk pendaftar
     * POST /api/pmb/pendaftar/{id}/dokumen
     */
    public function uploadDokumen(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validate([
                'dokumen' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
                'type' => 'required|string|max:100',
                'syarat_id' => 'required|exists:syarat_pendaftarans,id'
            ]);

            $pendaftar = Pendaftar::findOrFail($id);
            $file = $request->file('dokumen');
            $path = $file->store('dokumen-pmb/' . $pendaftar->code);
            $dokumenCode = 'DOC-' . Str::random(8);

            $dokumen = DokumenPMB::create([
                'pendaftar_id' => $pendaftar->id,
                'syarat_id' => $validated['syarat_id'],
                'type' => $validated['type'],
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'code' => $dokumenCode,
                'status' => 'Pending',
                'created_by' => Auth::id(),
            ]);

            // Load relasi
            $dokumen->load('syarat');

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Dokumen berhasil diupload',
                'data' => $dokumen
            ], 201);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Pendaftar tidak ditemukan'
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
                'message' => 'Gagal upload dokumen: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get pendaftar by status
     * GET /api/pmb/pendaftar/status/{status}
     */
    public function getByStatus($status)
    {
        try {
            $allowedStatus = ['Pending', 'Lulus', 'Gagal', 'Batal'];
            
            if (!in_array($status, $allowedStatus)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Status tidak valid. Status yang diizinkan: ' . implode(', ', $allowedStatus)
                ], 400);
            }

            $pendaftars = Pendaftar::with(['dokumen.syarat', 'jalur', 'gelombang', 'mahasiswa'])
                ->where('status', $status)
                ->get();

            return response()->json([
                'success' => true,
                'message' => "Data pendaftar dengan status {$status} berhasil diambil",
                'data' => $pendaftars
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get statistics pendaftar
     * GET /api/pmb/pendaftar/statistics
     */
    public function getStatistics()
    {
        try {
            $stats = [
                'total' => Pendaftar::count(),
                'pending' => Pendaftar::where('status', 'Pending')->count(),
                'lulus' => Pendaftar::where('status', 'Lulus')->count(),
                'gagal' => Pendaftar::where('status', 'Gagal')->count(),
                'batal' => Pendaftar::where('status', 'Batal')->count(),
                'by_jalur' => Pendaftar::select('jalur_id')
                    ->selectRaw('COUNT(*) as total')
                    ->with('jalur:id,name')
                    ->groupBy('jalur_id')
                    ->get(),
                'by_gelombang' => Pendaftar::select('gelombang_id')
                    ->selectRaw('COUNT(*) as total')
                    ->with('gelombang:id,name')
                    ->groupBy('gelombang_id')
                    ->get(),
            ];

            return response()->json([
                'success' => true,
                'message' => 'Statistik pendaftar berhasil diambil',
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
