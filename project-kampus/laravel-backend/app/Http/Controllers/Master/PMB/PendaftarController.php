<?php

namespace App\Http\Controllers\Master\PMB;

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
use PDF;
use Excel;

class PendaftarController extends Controller
{
    public function renderPendaftar()
    {
        $pendaftars = Pendaftar::with(['dokumen.syarat', 'jalur', 'gelombang'])->get();
        return response()->json($pendaftars);
    }

    public function handlePendaftar(Request $request)
    {
        try {
            DB::beginTransaction();

            $request->validate([
                'jalur_id' => 'required|integer',
                'prodi_1' => 'required|integer',
                'prodi_2' => 'required|integer',
                'jenis_id' => 'required|integer',
                'gelombang_id' => 'required|integer',
                'phone' => 'required|string|unique:mahasiswas',
                'email' => 'required|email|unique:mahasiswas',
                'name' => 'required|string',
                'bio_gender' => 'required|string',
                'bio_placebirth' => 'required|string',
                'bio_datebirth' => 'required|date',
                'bio_religion' => 'required|string',
                'ktp_addres' => 'required|string',
                'ktp_rt' => 'required|string',
                'ktp_rw' => 'required|string',
                'ktp_village' => 'required|string',
                'ktp_subdistrict' => 'required|string',
                'ktp_city' => 'required|string',
                'ktp_province' => 'required|string',
                'ktp_poscode' => 'required|string',
                'numb_ktp' => 'required|string|unique:mahasiswas',
            ]);

            $mahasiswaCode = 'MHS-' . Str::random(8);
            $code = 'PMB-' . Str::random(8);
            $numbReg = 'REG-' . date('Ymd') . '-' . Str::random(4);

            $mahasiswa = Mahasiswa::create([
                'type' => 0,
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'bio_gender' => $request->bio_gender,
                'bio_placebirth' => $request->bio_placebirth,
                'bio_datebirth' => $request->bio_datebirth,
                'bio_religion' => $request->bio_religion,
                'ktp_addres' => $request->ktp_addres,
                'ktp_rt' => $request->ktp_rt,
                'ktp_rw' => $request->ktp_rw,
                'ktp_village' => $request->ktp_village,
                'ktp_subdistrict' => $request->ktp_subdistrict,
                'ktp_city' => $request->ktp_city,
                'ktp_province' => $request->ktp_province,
                'ktp_poscode' => $request->ktp_poscode,
                'numb_ktp' => $request->numb_ktp,
                'numb_reg' => $numbReg,
                'code' => $mahasiswaCode,
                'password' => Hash::make($mahasiswaCode),
                'created_by' => Auth::id(),
            ]);

            $pendaftar = Pendaftar::create([
                'mahasiswa_id' => $mahasiswa->id,
                'jalur_id' => $request->jalur_id,
                'jenis_id' => $request->jenis_id,
                'prodi_1' => $request->prodi_1,
                'prodi_2' => $request->prodi_2,
                'gelombang_id' => $request->gelombang_id,
                'phone' => $request->phone,
                'email' => $request->email,
                'name' => $request->name,
                'code' => $code,
                'numb_reg' => $numbReg,
                'register_date' => now(),
                'status' => 'Pending',
                'created_by' => Auth::id(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Pendaftaran berhasil ditambahkan', 'data' => $pendaftar], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Gagal menambahkan pendaftaran', 'message' => $e->getMessage()], 500);
        }
    }

    public function updatePendaftar(Request $request, $code)
    {
        try {
            DB::beginTransaction();

            $request->validate([
                'phone' => 'required|string|unique:pendaftars,phone,' . $code . ',code',
                'email' => 'required|email|unique:pendaftars,email,' . $code . ',code',
                'name' => 'required|string',
                'status' => 'required|in:Pending,Lulus,Gagal,Batal'
            ]);

            $pendaftar = Pendaftar::where('code', $code)->firstOrFail();
            $mahasiswa = Mahasiswa::findOrFail($pendaftar->mahasiswa_id);

            $pendaftar->update([
                'phone' => $request->phone,
                'email' => $request->email,
                'name' => $request->name,
                'status' => $request->status,
                'updated_by' => Auth::id(),
            ]);

            $mahasiswa->update([
                'phone' => $request->phone,
                'email' => $request->email,
                'name' => $request->name,

                // di tabel mahasiswas tidak ada kolom status
                // 'status' => $request->status,
                'updated_by' => Auth::id(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Data pendaftar berhasil diperbarui', 'data' => $pendaftar]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Gagal memperbarui data pendaftar', 'message' => $e->getMessage()], 500);
        }
    }

    public function deletePendaftar($code)
    {
        try {
            DB::beginTransaction();

            $pendaftar = Pendaftar::where('code', $code)->firstOrFail();
            $mahasiswa = Mahasiswa::findOrFail($pendaftar->mahasiswa_id);

            DokumenPMB::where('pendaftar_id', $pendaftar->id)->update(['deleted_by' => Auth::id()]);
            DokumenPMB::where('pendaftar_id', $pendaftar->id)->delete();

            $pendaftar->update(['deleted_by' => Auth::id()]);
            $mahasiswa->update(['deleted_by' => Auth::id()]);

            $pendaftar->delete();
            $mahasiswa->delete();

            DB::commit();
            return response()->json(['message' => 'Pendaftar berhasil dihapus']);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Gagal menghapus pendaftar', 'message' => $e->getMessage()], 500);
        }
    }

    public function uploadDokumen(Request $request, $code)
    {
        try {
            DB::beginTransaction();

            $request->validate([
                'dokumen' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
                'type' => 'required|string',
                'syarat_id' => 'required|exists:syarat_pendaftarans,id'
            ]);

            $pendaftar = Pendaftar::where('code', $code)->firstOrFail();
            $file = $request->file('dokumen');
            $path = $file->store('dokumen-pmb/' . $code);
            $dokumenCode = 'DOC-' . Str::random(8);

            $dokumen = DokumenPMB::create([
                'pendaftar_id' => $pendaftar->id,
                'syarat_id' => $request->syarat_id,
                'type' => $request->type,
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'code' => $dokumenCode,
                'status' => 'Pending',
                'created_by' => Auth::id(),
            ]);

            DB::commit();
            return response()->json(['message' => 'Dokumen berhasil diupload', 'data' => $dokumen]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal upload dokumen', 'error' => $e->getMessage()], 500);
        }
    }
}