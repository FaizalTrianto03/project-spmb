<?php
// generate_controllers.php

$models = [
    // Root Models
    'Dosen' => '',
    'KotakSaran' => '',
    'Mahasiswa' => '',
    'User' => '',
    
    // Akademik
    'Fakultas' => 'Akademik',
    'JadwalKuliah' => 'Akademik',
    'JenisKelas' => 'Akademik',
    'Kelas' => 'Akademik',
    'Kurikulum' => 'Akademik',
    'MataKuliah' => 'Akademik',
    'ProgramStudi' => 'Akademik',
    'TahunAkademik' => 'Akademik',
    'WaktuKuliah' => 'Akademik',
    
    // FeedBack
    'FBPerkuliahan' => 'FeedBack',
    
    // Infrastruktur
    'Barang' => 'Infrastruktur',
    'Gedung' => 'Infrastruktur',
    'InventarisBarang' => 'Infrastruktur',
    'KategoriBarang' => 'Infrastruktur',
    'MutasiBarang' => 'Infrastruktur',
    'PengadaanBarang' => 'Infrastruktur',
    'Ruang' => 'Infrastruktur',
    
    // Kepegawaian
    'Absensi' => 'Kepegawaian',
    
    // Keuangan
    'RiwayatPembayaran' => 'Keuangan',
    'Saldo' => 'Keuangan',
    'TagihanKuliah' => 'Keuangan',
    'TagihanKuliahGroup' => 'Keuangan',
    
    // Pendaftaran
    'DokumenPMB' => 'Pendaftaran',
    'Pendaftar' => 'Pendaftaran',
    
    // Pengaturan
    'ActivityLogChange' => 'Pengaturan',
    'LogAktivitas' => 'Pengaturan',
    'WebSetting' => 'Pengaturan',
    
    // PMB
    'BiayaPendaftaran' => 'PMB',
    'GelombangPendaftaran' => 'PMB',
    'JadwalPMB' => 'PMB',
    'JalurPendaftaran' => 'PMB',
    'PeriodePendaftaran' => 'PMB',
    'SyaratPendaftaran' => 'PMB',
    
    // Publikasi
    'Berita' => 'Publikasi',
    'Galeri' => 'Publikasi',
    'GaleriFoto' => 'Publikasi',
    'Kategori' => 'Publikasi',
    'Pengumuman' => 'Publikasi',
];

function generateController($modelName, $namespace = '') {
    $controllerName = $modelName . 'Controller';
    $modelPath = $namespace ? "App\\Models\\{$namespace}\\{$modelName}" : "App\\Models\\{$modelName}";
    $namespaceDeclaration = $namespace ? "\\{$namespace}" : '';
    
    return "<?php

namespace App\\Http\\Controllers{$namespaceDeclaration};

use App\\Http\\Controllers\\Controller;
use {$modelPath};
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Support\\Facades\\Validator;
use Illuminate\\Database\\Eloquent\\ModelNotFoundException;

class {$controllerName} extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request \$request): JsonResponse
    {
        try {
            \$query = {$modelName}::query();
            
            // Search functionality
            if (\$request->has('search') && \$request->search) {
                \$searchTerm = \$request->search;
                \$query->where(function (\$q) use (\$searchTerm) {
                    // Add searchable fields here based on your model
                    \$q->where('nama', 'like', \"%{\$searchTerm}%\")
                      ->orWhere('kode', 'like', \"%{\$searchTerm}%\");
                });
            }
            
            // Sorting
            \$sortBy = \$request->get('sort_by', 'id');
            \$sortOrder = \$request->get('sort_order', 'desc');
            \$query->orderBy(\$sortBy, \$sortOrder);
            
            // Pagination
            \$perPage = \$request->get('per_page', 15);
            \$data = \$query->paginate(\$perPage);
            
            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diambil',
                'data' => \$data
            ]);
            
        } catch (\\Exception \$e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data',
                'error' => \$e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request \$request): JsonResponse
    {
        try {
            // Validation rules - customize based on your model
            \$validator = Validator::make(\$request->all(), [
                // Add your validation rules here
                // 'nama' => 'required|string|max:255',
                // 'kode' => 'required|string|unique:" . strtolower($modelName) . "s,kode',
            ]);

            if (\$validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => \$validator->errors()
                ], 422);
            }

            \$data = {$modelName}::create(\$request->all());

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil ditambahkan',
                'data' => \$data
            ], 201);

        } catch (\\Exception \$e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan data',
                'error' => \$e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(\$id): JsonResponse
    {
        try {
            \$data = {$modelName}::findOrFail(\$id);
            
            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diambil',
                'data' => \$data
            ]);
            
        } catch (ModelNotFoundException \$e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        } catch (\\Exception \$e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data',
                'error' => \$e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request \$request, \$id): JsonResponse
    {
        try {
            \$data = {$modelName}::findOrFail(\$id);
            
            // Validation rules - customize based on your model
            \$validator = Validator::make(\$request->all(), [
                // Add your validation rules here
                // 'nama' => 'required|string|max:255',
                // 'kode' => 'required|string|unique:" . strtolower($modelName) . "s,kode,' . \$id,
            ]);

            if (\$validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => \$validator->errors()
                ], 422);
            }

            \$data->update(\$request->all());

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diperbarui',
                'data' => \$data
            ]);

        } catch (ModelNotFoundException \$e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        } catch (\\Exception \$e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui data',
                'error' => \$e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(\$id): JsonResponse
    {
        try {
            \$data = {$modelName}::findOrFail(\$id);
            \$data->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil dihapus'
            ]);

        } catch (ModelNotFoundException \$e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        } catch (\\Exception \$e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus data',
                'error' => \$e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk delete resources.
     */
    public function bulkDelete(Request \$request): JsonResponse
    {
        try {
            \$validator = Validator::make(\$request->all(), [
                'ids' => 'required|array',
                'ids.*' => 'exists:" . strtolower($modelName) . "s,id'
            ]);

            if (\$validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => \$validator->errors()
                ], 422);
            }

            {$modelName}::whereIn('id', \$request->ids)->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil dihapus secara massal'
            ]);

        } catch (\\Exception \$e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus data secara massal',
                'error' => \$e->getMessage()
            ], 500);
        }
    }

    /**
     * Get data for dropdown/select options.
     */
    public function options(): JsonResponse
    {
        try {
            \$data = {$modelName}::select('id', 'nama as text')
                ->orderBy('nama')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Data options berhasil diambil',
                'data' => \$data
            ]);

        } catch (\\Exception \$e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data options',
                'error' => \$e->getMessage()
            ], 500);
        }
    }
}";
}

// Create controllers directory structure
$baseControllerPath = 'app/Http/Controllers';

foreach ($models as $modelName => $namespace) {
    $controllerPath = $baseControllerPath;
    
    if ($namespace) {
        $controllerPath .= '/' . $namespace;
        if (!is_dir($controllerPath)) {
            mkdir($controllerPath, 0755, true);
        }
    }
    
    $controllerFile = $controllerPath . '/' . $modelName . 'Controller.php';
    $controllerContent = generateController($modelName, $namespace);
    
    file_put_contents($controllerFile, $controllerContent);
    echo " Generated: {$controllerFile}\n";
}

echo "\n🎉 Semua controller berhasil di-generate!\n";
echo "📁 Total: " . count($models) . " controllers\n";
echo "\n📝 Jangan lupa untuk:\n";
echo "1. Sesuaikan validation rules di setiap controller\n";
echo "2. Tambahkan routes di web.php atau api.php\n";
echo "3. Sesuaikan field searchable di method index\n";
echo "4. Sesuaikan field untuk options method\n";
?>
