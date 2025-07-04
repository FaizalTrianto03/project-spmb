-- =====================================================
-- STRUKTUR DATABASE TERINTEGRASI
-- SISTEM AKADEMIK, PENDAFTARAN, DAN PDDIKTI
-- =====================================================

-- Menggunakan PostgreSQL untuk kompatibilitas dengan PDDIKTI

-- =====================================================
-- PEMBUATAN SCHEMA
-- =====================================================

CREATE SCHEMA IF NOT EXISTS ref;
CREATE SCHEMA IF NOT EXISTS public;

-- =====================================================
-- TABEL REFERENSI PDDIKTI
-- =====================================================

-- Tabel Referensi Agama
CREATE TABLE ref.agama (
    id_agama VARCHAR(2) NOT NULL PRIMARY KEY,
    nm_agama VARCHAR(20) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Bentuk Pendidikan
CREATE TABLE ref.bentuk_pendidikan (
    id_bp VARCHAR(3) NOT NULL PRIMARY KEY,
    nm_bp VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Jenjang Pendidikan
CREATE TABLE ref.jenjang_pendidikan (
    id_jenj_didik NUMERIC(2) NOT NULL PRIMARY KEY,
    nm_jenj_didik VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Jalur Masuk
CREATE TABLE ref.jalur_masuk (
    id_jalur_masuk VARCHAR(2) NOT NULL PRIMARY KEY,
    nm_jalur_masuk VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Jenis Keluar
CREATE TABLE ref.jenis_keluar (
    id_jns_keluar NUMERIC(2) NOT NULL PRIMARY KEY,
    ket_keluar VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Jenis Pendaftaran
CREATE TABLE ref.jenis_pendaftaran (
    id_jns_daftar VARCHAR(2) NOT NULL PRIMARY KEY,
    nm_jns_daftar VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Jenis SMS (Satuan Manajemen Sumberdaya)
CREATE TABLE ref.jenis_sms (
    id_jns_sms VARCHAR(1) NOT NULL PRIMARY KEY,
    nm_jns_sms VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Jenis Tinggal
CREATE TABLE ref.jenis_tinggal (
    id_jns_tinggal VARCHAR(2) NOT NULL PRIMARY KEY,
    nm_jns_tinggal VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Kebutuhan Khusus
CREATE TABLE ref.kebutuhan_khusus (
    id_kk VARCHAR(3) NOT NULL PRIMARY KEY,
    nm_kk VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Level Wilayah
CREATE TABLE ref.level_wilayah (
    id_level_wil CHAR(1) NOT NULL PRIMARY KEY,
    nm_level_wil VARCHAR(20) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Negara
CREATE TABLE ref.negara (
    id_negara VARCHAR(10) NOT NULL PRIMARY KEY,
    nm_negara VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Pekerjaan
CREATE TABLE ref.pekerjaan (
    id_pekerjaan VARCHAR(5) NOT NULL PRIMARY KEY,
    nm_pekerjaan VARCHAR(100) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Penghasilan
CREATE TABLE ref.penghasilan (
    id_penghasilan VARCHAR(2) NOT NULL PRIMARY KEY,
    nm_penghasilan VARCHAR(80) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Status Mahasiswa
CREATE TABLE ref.status_mahasiswa (
    id_stat_mhs VARCHAR(1) NOT NULL PRIMARY KEY,
    nm_stat_mhs VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Semester
CREATE TABLE ref.semester (
    id_smt VARCHAR(5) NOT NULL PRIMARY KEY,
    nm_smt VARCHAR(50) NOT NULL,
    smt VARCHAR(1) NOT NULL,
    a_periode_aktif VARCHAR(1) NOT NULL,
    tgl_mulai DATE,
    tgl_selesai DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Tahun Ajaran
CREATE TABLE ref.tahun_ajaran (
    id_thn_ajaran VARCHAR(4) NOT NULL PRIMARY KEY,
    nm_thn_ajaran VARCHAR(50) NOT NULL,
    a_periode_aktif VARCHAR(1) NOT NULL,
    tgl_mulai DATE,
    tgl_selesai DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Ikatan Kerja Dosen
CREATE TABLE ref.ikatan_kerja_dosen (
    id_ikatan_kerja VARCHAR(2) NOT NULL PRIMARY KEY,
    nm_ikatan_kerja VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Jabatan Fungsional
CREATE TABLE ref.jabfung (
    id_jabfung NUMERIC(2,0) NOT NULL PRIMARY KEY,
    id_kel_prof NUMERIC(5,0) NOT NULL,
    nm_jabfung VARCHAR(50) NOT NULL,
    angka_kredit NUMERIC(7,2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Jenis Evaluasi
CREATE TABLE ref.jenis_evaluasi (
    id_jns_eval SMALLINT NOT NULL PRIMARY KEY,
    nm_jns_eval VARCHAR(50) NOT NULL,
    ket_jns_eval VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Jenis Sertifikasi
CREATE TABLE ref.jenis_sert (
    id_jns_sert NUMERIC(3,0) NOT NULL PRIMARY KEY,
    id_kk INTEGER NOT NULL,
    nm_jns_sert VARCHAR(50) NOT NULL,
    u_prof_guru NUMERIC(1,0) NOT NULL,
    u_kepsek NUMERIC(1,0) NOT NULL,
    u_laboran NUMERIC(1,0) NOT NULL,
    u_prof_dosen NUMERIC(1,0) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_kk) REFERENCES ref.kebutuhan_khusus(id_kk)
);

-- Tabel Referensi Jenis Substansi
CREATE TABLE ref.jenis_subst (
    id_jns_subst CHAR(5) NOT NULL PRIMARY KEY,
    nm_jns_subst VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Jurusan
CREATE TABLE ref.jurusan (
    id_jur VARCHAR(25) NOT NULL PRIMARY KEY,
    id_induk_jurusan VARCHAR(25),
    id_jenj_didik NUMERIC(2,0) NOT NULL,
    id_kel_bidang UUID NOT NULL,
    nm_jur VARCHAR(100) NOT NULL,
    nm_intl_jur VARCHAR(100),
    u_pt NUMERIC(1,0) NOT NULL,
    u_slb NUMERIC(1,0) NOT NULL,
    u_sma NUMERIC(1,0) NOT NULL,
    u_smk NUMERIC(1,0) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_jenj_didik) REFERENCES ref.jenjang_pendidikan(id_jenj_didik)
);

-- Tabel Referensi Lembaga Pengangkat
CREATE TABLE ref.lembaga_pengangkat (
    id_lemb_angkat NUMERIC(2,0) NOT NULL PRIMARY KEY,
    nm_lemb_angkat VARCHAR(100) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Pangkat Golongan
CREATE TABLE ref.pangkat_golongan (
    id_pangkat VARCHAR(5) NOT NULL PRIMARY KEY,
    nm_pangkat VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Status Keaktifan Pegawai
CREATE TABLE ref.status_keaktifan_pegawai (
    id_status_aktif VARCHAR(2) NOT NULL PRIMARY KEY,
    nm_status_aktif VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- Tabel Referensi Status Kepegawaian
CREATE TABLE ref.status_kepegawaian (
    id_status_kepegawaian VARCHAR(2) NOT NULL PRIMARY KEY,
    nm_status_kepegawaian VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP
);

-- =====================================================
-- TABEL UTAMA PDDIKTI DAN SISTEM AKADEMIK
-- =====================================================

-- Tabel Wilayah (Pengganti provinces dan cities)
CREATE TABLE wilayah (
    id_wil VARCHAR(10) NOT NULL PRIMARY KEY,
    id_negara VARCHAR(10),
    nm_wil VARCHAR(100),
    asal_wil VARCHAR(50),
    kode_bps VARCHAR(10),
    kode_dagri VARCHAR(10),
    kode_keu VARCHAR(10),
    id_induk_wilayah VARCHAR(10),
    id_level_wil CHAR(1),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_level_wil) REFERENCES ref.level_wilayah(id_level_wil),
    FOREIGN KEY (id_negara) REFERENCES ref.negara(id_negara)
);

-- Tabel Unit (Untuk struktur organisasi internal)
CREATE TABLE unit (
    kode_unit VARCHAR(100) NOT NULL PRIMARY KEY,
    nama_unit VARCHAR(255) NOT NULL,
    parent_unit VARCHAR(100),
    jenis_unit VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (parent_unit) REFERENCES unit(kode_unit)
);

-- Tabel Satuan Pendidikan (Pengganti universities)
CREATE TABLE satuan_pendidikan (
    id_sp VARCHAR(36) NOT NULL PRIMARY KEY,
    nm_lemb VARCHAR(100),
    jln VARCHAR(100),
    rt VARCHAR(5),
    rw VARCHAR(5),
    nm_dsn VARCHAR(60),
    ds_kel VARCHAR(60),
    kode_pos VARCHAR(5),
    lintang VARCHAR(15),
    bujur VARCHAR(15),
    no_tel VARCHAR(20),
    no_fax VARCHAR(20),
    email VARCHAR(60),
    website VARCHAR(100),
    npsn VARCHAR(15),
    nsm VARCHAR(15),
    npwp VARCHAR(30),
    id_sp_induk VARCHAR(36),
    sk_pendirian_sp VARCHAR(80),
    tgl_sk_pendirian DATE,
    id_status_milik VARCHAR(1),
    id_status_sp VARCHAR(1),
    sk_izin_sp VARCHAR(80),
    tgl_sk_izin DATE,
    tgl_berdiri DATE,
    id_alasan_capai_tdk_diakui VARCHAR(2),
    id_alasan_capai_diakui VARCHAR(2),
    id_wil VARCHAR(10),
    id_jenis_tinggal VARCHAR(2),
    id_alat_transport VARCHAR(2),
    id_kecamatan VARCHAR(10),
    a_kecamatan VARCHAR(60),
    id_kabupaten_kota VARCHAR(10),
    a_kabupaten_kota VARCHAR(60),
    id_provinsi VARCHAR(10),
    a_provinsi VARCHAR(60),
    id_negara VARCHAR(10),
    a_negara VARCHAR(60),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_wil) REFERENCES wilayah(id_wil),
    FOREIGN KEY (id_jenis_tinggal) REFERENCES ref.jenis_tinggal(id_jns_tinggal),
    FOREIGN KEY (id_negara) REFERENCES ref.negara(id_negara),
    FOREIGN KEY (id_sp_induk) REFERENCES satuan_pendidikan(id_sp)
);

-- Tabel SMS/Program Studi (Pengganti study_programs)
CREATE TABLE sms (
    id_sms VARCHAR(36) NOT NULL PRIMARY KEY,
    id_sp VARCHAR(36),
    id_jenj_didik NUMERIC(2),
    id_jns_sms VARCHAR(1),
    kode_prodi VARCHAR(10),
    nm_lemb VARCHAR(100),
    nm_prodi_english VARCHAR(100),
    sks_lulus NUMERIC(3),
    gelar_lulusan VARCHAR(50),
    gelar_lulusan_en VARCHAR(50),
    stat_prodi VARCHAR(1),
    sks_total NUMERIC(3),
    tgl_berdiri DATE,
    sk_selenggara VARCHAR(80),
    tgl_sk_penyelenggaraan DATE,
    no_sk_akred VARCHAR(30),
    tgl_sk_akred DATE,
    tgl_akhir_sk_akred DATE,
    jml_sem_normal NUMERIC(2),
    id_status_sms VARCHAR(1),
    id_jenis_keluar NUMERIC(2),
    id_jns_didik NUMERIC(2),
    id_fungsi_lab NUMERIC(2),
    id_kel_usaha NUMERIC(2),
    id_wil VARCHAR(10),
    a_kecamatan VARCHAR(60),
    id_jur_kel NUMERIC(6),
    id_bidang_ilmu NUMERIC(6),
    nm_bidang_ilmu VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    unit_kode VARCHAR(100),
    FOREIGN KEY (id_sp) REFERENCES satuan_pendidikan(id_sp),
    FOREIGN KEY (id_jenj_didik) REFERENCES ref.jenjang_pendidikan(id_jenj_didik),
    FOREIGN KEY (id_jns_sms) REFERENCES ref.jenis_sms(id_jns_sms),
    FOREIGN KEY (id_wil) REFERENCES wilayah(id_wil),
    FOREIGN KEY (unit_kode) REFERENCES unit(kode_unit)
);

-- Tabel Sekolah (Untuk pendaftaran)
CREATE TABLE schools (
    id BIGINT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    address TEXT,
    province_id VARCHAR(10),
    city_id VARCHAR(10),
    id_sp VARCHAR(36),
    nm_lemb VARCHAR(100),
    jln VARCHAR(100),
    id_wil VARCHAR(10),
    npsn VARCHAR(15),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (province_id) REFERENCES wilayah(id_wil),
    FOREIGN KEY (city_id) REFERENCES wilayah(id_wil)
);

-- Tabel Pegawai
CREATE TABLE pegawai (
    nip VARCHAR(20) NOT NULL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    unit VARCHAR(100) REFERENCES unit(kode_unit),
    jabatan VARCHAR(100),
    email VARCHAR(100),
    telepon VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Tabel Mahasiswa
CREATE TABLE mahasiswa (
    nim VARCHAR(20) NOT NULL PRIMARY KEY,
    id_pd VARCHAR(36) NOT NULL,
    registration_id BIGINT,
    periode_masuk VARCHAR(50),
    program_studi VARCHAR(100),
    nama VARCHAR(100),
    nm_pd VARCHAR(100),
    jk VARCHAR(1),
    sistem_kuliah VARCHAR(50),
    jalur_penerimaan VARCHAR(50),
    gelombang_daftar VARCHAR(50),
    transfer__tidak VARCHAR(10),
    universitas_asal VARCHAR(100),
    nim_asal VARCHAR(20),
    ipk_asal DECIMAL(10,2),
    kurikulum VARCHAR(10),
    agama VARCHAR(50),
    id_agama VARCHAR(2),
    kewarganegaraan VARCHAR(50),
    status_mahasiswa VARCHAR(50),
    alamat TEXT,
    jln VARCHAR(80),
    rt VARCHAR(5),
    rw VARCHAR(5),
    nm_dsn VARCHAR(60),
    ds_kel VARCHAR(60),
    telepon VARCHAR(20),
    hp VARCHAR(20),
    handphone VARCHAR(20),
    tempat_lahir VARCHAR(100),
    tmpt_lahir VARCHAR(32),
    tgl__lahir DATE,
    tgl_lahir DATE,
    kodepos VARCHAR(10),
    kode_pos VARCHAR(5),
    jenis_kelamin VARCHAR(1),
    golongan_darah VARCHAR(3),
    status_nikah VARCHAR(20),
    email VARCHAR(100),
    no__ktpnik VARCHAR(20),
    nik VARCHAR(16),
    nisn VARCHAR(10),
    no__kk VARCHAR(20),
    id_kk VARCHAR(3),
    id_wil VARCHAR(10),
    id_jns_tinggal VARCHAR(2),
    id_alat_transport VARCHAR(2),
    a_terima_kps VARCHAR(1),
    no_kps VARCHAR(40),
    stat_pd VARCHAR(1),
    kecamatan VARCHAR(100),
    kota VARCHAR(100),
    propinsi VARCHAR(100),
    tgl__daftar DATE,
    nama_ayah VARCHAR(100),
    nm_ayah VARCHAR(100),
    pekerjaan_ayah VARCHAR(100),
    id_pekerjaan_ayah VARCHAR(5),
    penghasilan_ayah VARCHAR(100),
    id_penghasilan_ayah VARCHAR(2),
    pendidikan_ayah VARCHAR(50),
    id_jenjang_pendidikan_ayah VARCHAR(2),
    tgl_lahir_ayah DATE,
    id_kebutuhan_khusus_ayah VARCHAR(2),
    nama_ibu VARCHAR(100),
    nm_ibu_kandung VARCHAR(100),
    pekerjaan_ibu VARCHAR(100),
    id_pekerjaan_ibu VARCHAR(5),
    penghasilan_ibu VARCHAR(100),
    id_penghasilan_ibu VARCHAR(2),
    pendidikan_ibu VARCHAR(50),
    id_jenjang_pendidikan_ibu VARCHAR(2),
    tgl_lahir_ibu DATE,
    id_kebutuhan_khusus_ibu VARCHAR(2),
    nama_wali VARCHAR(100),
    nm_wali VARCHAR(100),
    pekerjaan_wali VARCHAR(100),
    id_pekerjaan_wali VARCHAR(5),
    penghasilan_wali VARCHAR(100),
    id_penghasilan_wali VARCHAR(2),
    pendidikan_wali VARCHAR(50),
    id_jenjang_pendidikan_wali VARCHAR(2),
    tgl_lahir_wali DATE,
    id_kebutuhan_khusus_wali VARCHAR(2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_agama) REFERENCES ref.agama(id_agama),
    FOREIGN KEY (id_kk) REFERENCES ref.kebutuhan_khusus(id_kk),
    FOREIGN KEY (id_wil) REFERENCES wilayah(id_wil),
    FOREIGN KEY (id_jns_tinggal) REFERENCES ref.jenis_tinggal(id_jns_tinggal),
    FOREIGN KEY (id_pekerjaan_ayah) REFERENCES ref.pekerjaan(id_pekerjaan),
    FOREIGN KEY (id_penghasilan_ayah) REFERENCES ref.penghasilan(id_penghasilan),
    FOREIGN KEY (id_jenjang_pendidikan_ayah) REFERENCES ref.jenjang_pendidikan(id_jenj_didik),
    FOREIGN KEY (id_pekerjaan_ibu) REFERENCES ref.pekerjaan(id_pekerjaan),
    FOREIGN KEY (id_penghasilan_ibu) REFERENCES ref.penghasilan(id_penghasilan),
    FOREIGN KEY (id_jenjang_pendidikan_ibu) REFERENCES ref.jenjang_pendidikan(id_jenj_didik),
    FOREIGN KEY (id_pekerjaan_wali) REFERENCES ref.pekerjaan(id_pekerjaan),
    FOREIGN KEY (id_penghasilan_wali) REFERENCES ref.penghasilan(id_penghasilan),
    FOREIGN KEY (id_jenjang_pendidikan_wali) REFERENCES ref.jenjang_pendidikan(id_jenj_didik)
);

-- Tabel Mahasiswa PT (Untuk PDDIKTI)
CREATE TABLE mahasiswa_pt (
    id_reg_pd VARCHAR(36) NOT NULL PRIMARY KEY,
    id_pd VARCHAR(36) NOT NULL,
    id_sms VARCHAR(36) NOT NULL,
    id_sp VARCHAR(36) NOT NULL,
    nipd VARCHAR(60),
    tgl_masuk_sp DATE,
    id_jns_daftar VARCHAR(2),
    id_jns_keluar VARCHAR(2),
    tgl_keluar DATE,
    ket_keluar VARCHAR(100),
    sks_diakui NUMERIC(3),
    id_sp_asal VARCHAR(36),
    id_prodi_asal VARCHAR(36),
    nm_pt_asal VARCHAR(100),
    nm_prodi_asal VARCHAR(100),
    id_jalur_masuk VARCHAR(2),
    id_pembiayaan VARCHAR(2),
    biaya_masuk NUMERIC(16),
    mulai_smt VARCHAR(5),
    sks_total NUMERIC(3),
    batas_studi NUMERIC(2),
    no_seri_ijazah VARCHAR(80),
    sert_prof VARCHAR(40),
    a_pindah_mhs_asing VARCHAR(1),
    id_pt_asal VARCHAR(36),
    nm_mk_pindahan TEXT,
    sks_pindahan NUMERIC(3),
    judul_skripsi TEXT,
    bln_awal_bimbingan VARCHAR(6),
    bln_akhir_bimbingan VARCHAR(6),
    sk_yudisium VARCHAR(40),
    tgl_sk_yudisium DATE,
    ipk NUMERIC(4,2),
    no_ijazah VARCHAR(40),
    bln_lulus VARCHAR(6),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_pd) REFERENCES mahasiswa(id_pd),
    FOREIGN KEY (id_sms) REFERENCES sms(id_sms),
    FOREIGN KEY (id_sp) REFERENCES satuan_pendidikan(id_sp),
    FOREIGN KEY (id_jns_daftar) REFERENCES ref.jenis_pendaftaran(id_jns_daftar),
    FOREIGN KEY (id_jns_keluar) REFERENCES ref.jenis_keluar(id_jns_keluar),
    FOREIGN KEY (id_jalur_masuk) REFERENCES ref.jalur_masuk(id_jalur_masuk)
);

-- Tabel Mahasiswa KM (Untuk sistem akademik)
CREATE TABLE mahasiswakm (
    nim VARCHAR(20) NOT NULL,
    periode VARCHAR(50) NOT NULL,
    status_mahasiswa VARCHAR(50) NOT NULL,
    ips DECIMAL(10,2),
    ipk DECIMAL(10,2),
    sks_semester INT,
    sks_total INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (nim, periode),
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim)
);

-- Tabel Kuliah Mahasiswa (Untuk PDDIKTI)
CREATE TABLE kuliah_mahasiswa (
    id_reg_pd VARCHAR(36) NOT NULL,
    id_smt VARCHAR(5) NOT NULL,
    id_stat_mhs VARCHAR(1) NOT NULL,
    ips NUMERIC(4,2),
    sks_smt NUMERIC(3),
    ipk NUMERIC(4,2),
    sks_total NUMERIC(3),
    biaya_kuliah NUMERIC(16),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    PRIMARY KEY (id_reg_pd, id_smt),
    FOREIGN KEY (id_reg_pd) REFERENCES mahasiswa_pt(id_reg_pd),
    FOREIGN KEY (id_smt) REFERENCES ref.semester(id_smt),
    FOREIGN KEY (id_stat_mhs) REFERENCES ref.status_mahasiswa(id_stat_mhs)
);

-- Tabel Kurikulum
CREATE TABLE kurikulum (
    id_kurikulum_sp VARCHAR(36) NOT NULL PRIMARY KEY,
    id_sms VARCHAR(36) NOT NULL,
    id_smt VARCHAR(5) NOT NULL,
    nm_kurikulum_sp VARCHAR(60),
    jml_sem_normal NUMERIC(2),
    jml_sks_lulus NUMERIC(3),
    jml_sks_wajib NUMERIC(3),
    jml_sks_pilihan NUMERIC(3),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_sms) REFERENCES sms(id_sms),
    FOREIGN KEY (id_smt) REFERENCES ref.semester(id_smt)
);

-- Tabel Kurikulum MK (Untuk sistem akademik)
CREATE TABLE kurikulummk (
    kurikulum VARCHAR(10) NOT NULL,
    kode_matakuliah VARCHAR(20) NOT NULL,
    nama_matakuliah VARCHAR(100) NOT NULL,
    sks INT NOT NULL,
    semester INT NOT NULL,
    aktif VARCHAR(1) NOT NULL,
    jenis VARCHAR(10),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (kurikulum, kode_matakuliah)
);

-- Tabel Mata Kuliah
CREATE TABLE mata_kuliah (
    id_mk VARCHAR(36) NOT NULL PRIMARY KEY,
    id_sms VARCHAR(36) NOT NULL,
    kode_mk VARCHAR(20),
    nm_mk VARCHAR(200),
    jns_mk VARCHAR(1),
    kel_mk VARCHAR(1),
    sks_mk NUMERIC(3),
    sks_tm NUMERIC(3),
    sks_prak NUMERIC(3),
    sks_prak_lap NUMERIC(3),
    sks_sim NUMERIC(3),
    metode_pelaksanaan_kuliah VARCHAR(1),
    a_sap VARCHAR(1),
    a_silabus VARCHAR(1),
    a_bahan_ajar VARCHAR(1),
    acara_prak VARCHAR(1),
    a_diktat VARCHAR(1),
    tgl_mulai_efektif DATE,
    tgl_akhir_efektif DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_sms) REFERENCES sms(id_sms)
);

-- Tabel Mata Kuliah Kurikulum
CREATE TABLE mata_kuliah_kurikulum (
    id_mk VARCHAR(36) NOT NULL,
    id_kurikulum_sp VARCHAR(36) NOT NULL,
    smt NUMERIC(2),
    sks_mk NUMERIC(3),
    sks_tm NUMERIC(3),
    sks_prak NUMERIC(3),
    sks_prak_lap NUMERIC(3),
    sks_sim NUMERIC(3),
    a_wajib VARCHAR(1),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    PRIMARY KEY (id_mk, id_kurikulum_sp),
    FOREIGN KEY (id_mk) REFERENCES mata_kuliah(id_mk),
    FOREIGN KEY (id_kurikulum_sp) REFERENCES kurikulum(id_kurikulum_sp)
);

-- Tabel Kelas Kuliah
CREATE TABLE kelas_kuliah (
    id_kls VARCHAR(36) NOT NULL PRIMARY KEY,
    id_sms VARCHAR(36) NOT NULL,
    id_smt VARCHAR(5) NOT NULL,
    id_mk VARCHAR(36) NOT NULL,
    nm_kls VARCHAR(5),
    sks_mk NUMERIC(3),
    sks_tm NUMERIC(3),
    sks_prak NUMERIC(3),
    sks_prak_lap NUMERIC(3),
    sks_sim NUMERIC(3),
    a_selenggara_bersama VARCHAR(1),
    kuota_kls NUMERIC(3),
    a_penuh VARCHAR(1),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_sms) REFERENCES sms(id_sms),
    FOREIGN KEY (id_smt) REFERENCES ref.semester(id_smt),
    FOREIGN KEY (id_mk) REFERENCES mata_kuliah(id_mk)
);

-- Tabel Kelas (Untuk sistem akademik)
CREATE TABLE kelas (
    periode VARCHAR(50) NOT NULL,
    program_studi_pengampu VARCHAR(100) NOT NULL,
    kurikulum VARCHAR(10) NOT NULL,
    kode_matakuliah VARCHAR(20) NOT NULL,
    nama_kelas VARCHAR(10) NOT NULL,
    hari VARCHAR(10),
    jam_mulai TIME,
    jam_selesai TIME,
    ruang VARCHAR(20),
    kapasitas INT,
    nip_dosen_1 VARCHAR(20),
    nip_dosen_2 VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas),
    FOREIGN KEY (nip_dosen_1) REFERENCES pegawai(nip),
    FOREIGN KEY (nip_dosen_2) REFERENCES pegawai(nip)
);

-- Tabel Kelas KM (Untuk sistem akademik)
CREATE TABLE kelaskm (
    periode VARCHAR(50) NOT NULL,
    program_studi_pengampu VARCHAR(100) NOT NULL,
    kurikulum VARCHAR(10) NOT NULL,
    kode_matakuliah VARCHAR(20) NOT NULL,
    nama_kelas VARCHAR(10) NOT NULL,
    hari VARCHAR(10),
    jam_mulai TIME,
    jam_selesai TIME,
    ruang VARCHAR(20),
    kapasitas INT,
    nip_dosen_1 VARCHAR(20),
    nip_dosen_2 VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas),
    FOREIGN KEY (nip_dosen_1) REFERENCES pegawai(nip),
    FOREIGN KEY (nip_dosen_2) REFERENCES pegawai(nip)
);

-- Tabel KRS (Untuk sistem akademik)
CREATE TABLE krs (
    periode VARCHAR(50) NOT NULL,
    program_studi_pengampu VARCHAR(100) NOT NULL,
    kurikulum VARCHAR(10) NOT NULL,
    kode_matakuliah VARCHAR(20) NOT NULL,
    nama_kelas VARCHAR(10) NOT NULL,
    nim VARCHAR(20) NOT NULL,
    nilai_huruf VARCHAR(2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas, nim),
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas) 
        REFERENCES kelas(periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas)
);

-- Tabel KRS KM (Untuk sistem akademik)
CREATE TABLE krskm (
    periode VARCHAR(50) NOT NULL,
    program_studi_pengampu VARCHAR(100) NOT NULL,
    kurikulum VARCHAR(10) NOT NULL,
    kode_matakuliah VARCHAR(20) NOT NULL,
    nama_kelas VARCHAR(10) NOT NULL,
    nim VARCHAR(20) NOT NULL,
    nilai_huruf VARCHAR(2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas, nim),
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas) 
        REFERENCES kelaskm(periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas)
);

-- Tabel Nilai
CREATE TABLE nilai (
    id_kls VARCHAR(36) NOT NULL,
    id_reg_pd VARCHAR(36) NOT NULL,
    nilai_angka NUMERIC(5,2),
    nilai_huruf VARCHAR(3),
    nilai_indeks NUMERIC(4,2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    PRIMARY KEY (id_kls, id_reg_pd),
    FOREIGN KEY (id_kls) REFERENCES kelas_kuliah(id_kls),
    FOREIGN KEY (id_reg_pd) REFERENCES mahasiswa_pt(id_reg_pd)
);

-- Tabel Proporsi Nilai (Untuk sistem akademik)
CREATE TABLE proporsinilai (
    periode VARCHAR(50) NOT NULL,
    program_studi VARCHAR(100) NOT NULL,
    kurikulum VARCHAR(10) NOT NULL,
    kode_matakuliah VARCHAR(20) NOT NULL,
    nama_kelas VARCHAR(10) NOT NULL,
    nim VARCHAR(20) NOT NULL,
    komposisi_nilai VARCHAR(50) NOT NULL,
    nilai DECIMAL(10,2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (periode, program_studi, kurikulum, kode_matakuliah, nama_kelas, nim, komposisi_nilai),
    FOREIGN KEY (periode, program_studi, kurikulum, kode_matakuliah, nama_kelas, nim)
        REFERENCES krs(periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas, nim)
);

-- Tabel Nilai Transfer
CREATE TABLE nilai_transfer (
    id_ekuivalensi VARCHAR(36) NOT NULL,
    id_reg_pd VARCHAR(36) NOT NULL,
    id_mk VARCHAR(36) NOT NULL,
    kode_mk_asal VARCHAR(20),
    nm_mk_asal VARCHAR(200),
    sks_asal NUMERIC(3),
    nilai_huruf_asal VARCHAR(3),
    sks_diakui NUMERIC(3),
    nilai_huruf_diakui VARCHAR(3),
    nilai_angka_diakui NUMERIC(5,2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    PRIMARY KEY (id_ekuivalensi, id_reg_pd, id_mk),
    FOREIGN KEY (id_reg_pd) REFERENCES mahasiswa_pt(id_reg_pd),
    FOREIGN KEY (id_mk) REFERENCES mata_kuliah(id_mk)
);

-- Tabel Nilai Pindahan (Untuk sistem akademik)
CREATE TABLE nilaipindahan (
    nim VARCHAR(20) NOT NULL,
    kode_matakuliah VARCHAR(20) NOT NULL,
    nama_matakuliah VARCHAR(100) NOT NULL,
    sks INT NOT NULL,
    nilai_huruf VARCHAR(2) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (nim, kode_matakuliah),
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim)
);

-- Tabel Skala Nilai
CREATE TABLE skalanilai (
    kurikulum VARCHAR(10) NOT NULL,
    jenjang VARCHAR(50) NOT NULL,
    unit VARCHAR(100) NOT NULL,
    nilai_angka DECIMAL(10,2) NOT NULL,
    nilai_huruf VARCHAR(3) NOT NULL,
    batas_bawah DECIMAL(10,2) NOT NULL,
    batas_atas DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (kurikulum, jenjang, unit, nilai_huruf),
    FOREIGN KEY (unit) REFERENCES unit(kode_unit)
);

-- Tabel Perwalian
CREATE TABLE perwalian (
    periode VARCHAR(50) NOT NULL,
    prodi VARCHAR(100) NOT NULL,
    nim VARCHAR(20) NOT NULL,
    nip_dosen VARCHAR(20) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (periode, prodi, nim),
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (nip_dosen) REFERENCES pegawai(nip)
);

-- Tabel Skripsi
CREATE TABLE skripsi (
    nim VARCHAR(20) NOT NULL PRIMARY KEY,
    nama VARCHAR(100),
    judul TEXT,
    status VARCHAR(10),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim)
);

-- Tabel Lulusan
CREATE TABLE lulusan (
    periode_yudisium_ VARCHAR(50) NOT NULL,
    program_studi VARCHAR(100) NOT NULL,
    nim VARCHAR(20) NOT NULL PRIMARY KEY,
    no__sk_yudisium VARCHAR(100),
    tgl_sk_yudisium DATE,
    no__ijazah VARCHAR(100),
    tgl_ijazah DATE,
    no__transkrip VARCHAR(50),
    tgl_transkrip DATE,
    judul_skripsi TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (program_studi) REFERENCES unit(kode_unit)
);

-- Tabel Yudisium
CREATE TABLE yudisium (
    periode_yudisium VARCHAR(50) NOT NULL,
    nim VARCHAR(20) NOT NULL PRIMARY KEY,
    nama VARCHAR(100),
    prodi VARCHAR(100),
    periode_masuk VARCHAR(50),
    sks_lulus INT,
    ipk_lulus DECIMAL(10,2),
    tgl_sk_yudisium DATE,
    nomer_sk_yudisium VARCHAR(100),
    pin VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (prodi) REFERENCES unit(kode_unit)
);

-- Tabel Dosen
CREATE TABLE dosen (
    id_dosen VARCHAR(36) NOT NULL PRIMARY KEY,
    nm_dosen VARCHAR(100) NOT NULL,
    nidn VARCHAR(10),
    nip VARCHAR(18),
    jk VARCHAR(1),
    tmpt_lahir VARCHAR(32),
    tgl_lahir DATE,
    nik VARCHAR(16),
    id_agama VARCHAR(2),
    id_kk VARCHAR(3),
    jln VARCHAR(80),
    rt VARCHAR(5),
    rw VARCHAR(5),
    nm_dsn VARCHAR(60),
    ds_kel VARCHAR(60),
    kode_pos VARCHAR(5),
    id_wil VARCHAR(10),
    telepon VARCHAR(20),
    handphone VARCHAR(20),
    email VARCHAR(60),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_agama) REFERENCES ref.agama(id_agama),
    FOREIGN KEY (id_kk) REFERENCES ref.kebutuhan_khusus(id_kk),
    FOREIGN KEY (id_wil) REFERENCES wilayah(id_wil)
);

-- Tabel Dosen PT
CREATE TABLE dosen_pt (
    id_reg_ptk VARCHAR(36) NOT NULL PRIMARY KEY,
    id_dosen VARCHAR(36) NOT NULL,
    id_sp VARCHAR(36) NOT NULL,
    id_sms VARCHAR(36),
    id_status_aktif VARCHAR(2),
    id_status_kepegawaian VARCHAR(2),
    id_pangkat_gol VARCHAR(5),
    no_sert_pendidik VARCHAR(30),
    id_jabfung VARCHAR(2),
    id_ikatan_kerja VARCHAR(2),
    tgl_masuk_sp DATE,
    tgl_keluar_sp DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_dosen) REFERENCES dosen(id_dosen),
    FOREIGN KEY (id_sp) REFERENCES satuan_pendidikan(id_sp),
    FOREIGN KEY (id_sms) REFERENCES sms(id_sms),
    FOREIGN KEY (id_status_aktif) REFERENCES ref.status_keaktifan_pegawai(id_status_aktif),
    FOREIGN KEY (id_status_kepegawaian) REFERENCES ref.status_kepegawaian(id_status_kepegawaian),
    FOREIGN KEY (id_pangkat_gol) REFERENCES ref.pangkat_golongan(id_pangkat),
    FOREIGN KEY (id_jabfung) REFERENCES ref.jabfung(id_jabfung),
    FOREIGN KEY (id_ikatan_kerja) REFERENCES ref.ikatan_kerja_dosen(id_ikatan_kerja)
);

-- Tabel Ajar Dosen
CREATE TABLE ajar_dosen (
    id_ajar VARCHAR(36) NOT NULL PRIMARY KEY,
    id_reg_ptk VARCHAR(36) NOT NULL,
    id_kls VARCHAR(36) NOT NULL,
    id_jns_eval VARCHAR(2),
    sks_subst_tot NUMERIC(3,0),
    sks_tm NUMERIC(3,0),
    sks_prak NUMERIC(3,0),
    sks_prak_lap NUMERIC(3,0),
    sks_sim NUMERIC(3,0),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_reg_ptk) REFERENCES dosen_pt(id_reg_ptk),
    FOREIGN KEY (id_kls) REFERENCES kelas_kuliah(id_kls),
    FOREIGN KEY (id_jns_eval) REFERENCES ref.jenis_evaluasi(id_jns_eval)
);

-- Tabel Dosen Pembimbing
CREATE TABLE dosen_pembimbing (
    id_pemb VARCHAR(36) NOT NULL PRIMARY KEY,
    id_reg_ptk VARCHAR(36) NOT NULL,
    id_reg_pd VARCHAR(36) NOT NULL,
    id_jns_bimb VARCHAR(2) NOT NULL,
    judul_bimb TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_reg_ptk) REFERENCES dosen_pt(id_reg_ptk),
    FOREIGN KEY (id_reg_pd) REFERENCES mahasiswa_pt(id_reg_pd)
);

-- Tabel Bobot Nilai
CREATE TABLE bobot_nilai (
    id_bobot_nilai VARCHAR(36) NOT NULL PRIMARY KEY,
    id_sms VARCHAR(36) NOT NULL,
    nilai_huruf VARCHAR(3) NOT NULL,
    nilai_indeks NUMERIC(4,2) NOT NULL,
    bobot_min NUMERIC(5,2) NOT NULL,
    bobot_max NUMERIC(5,2) NOT NULL,
    tgl_mulai_efektif DATE,
    tgl_akhir_efektif DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_sms) REFERENCES sms(id_sms)
);

-- Tabel Daya Tampung
CREATE TABLE daya_tampung (
    id_daya_tampung VARCHAR(36) NOT NULL PRIMARY KEY,
    id_sms VARCHAR(36) NOT NULL,
    id_smt VARCHAR(5) NOT NULL,
    target_mhs_baru INTEGER NOT NULL,
    calon_ikut_seleksi INTEGER,
    calon_lulus_seleksi INTEGER,
    reg_baru INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_sms) REFERENCES sms(id_sms),
    FOREIGN KEY (id_smt) REFERENCES ref.semester(id_smt)
);

-- Tabel Substansi Kuliah
CREATE TABLE substansi_kuliah (
    id_subst VARCHAR(36) NOT NULL PRIMARY KEY,
    id_jns_subst CHAR(5) NOT NULL,
    id_mk VARCHAR(36) NOT NULL,
    id_kls VARCHAR(36) NOT NULL,
    nm_subst VARCHAR(200) NOT NULL,
    sks_subst NUMERIC(3,0) NOT NULL,
    jml_tm_subst NUMERIC(3,0),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    expired_at TIMESTAMP,
    last_update TIMESTAMP,
    last_sync TIMESTAMP,
    FOREIGN KEY (id_jns_subst) REFERENCES ref.jenis_subst(id_jns_subst),
    FOREIGN KEY (id_mk) REFERENCES mata_kuliah(id_mk),
    FOREIGN KEY (id_kls) REFERENCES kelas_kuliah(id_kls)
);

-- =====================================================
-- TABEL SISTEM PENDAFTARAN
-- =====================================================

-- Tabel Jalur Pendaftaran
CREATE TABLE admission_paths (
    id BIGINT NOT NULL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    academic_year VARCHAR(10) NOT NULL,
    semester VARCHAR(10) NOT NULL,
    registration_start_date DATE NOT NULL,
    registration_end_date DATE NOT NULL,
    announcement_date DATE NOT NULL,
    study_system VARCHAR(50) NOT NULL,
    wave VARCHAR(10),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Tabel Program Studi Jalur Pendaftaran
CREATE TABLE admission_path_programs (
    id BIGINT NOT NULL PRIMARY KEY,
    admission_path_id BIGINT NOT NULL,
    study_program_id BIGINT NOT NULL,
    quota INT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (admission_path_id) REFERENCES admission_paths(id)
);

-- Tabel Persyaratan Pendaftaran
CREATE TABLE admission_requirements (
    id BIGINT NOT NULL PRIMARY KEY,
    admission_path_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    file_type VARCHAR(255),
    max_size INT,
    is_required BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (admission_path_id) REFERENCES admission_paths(id)
);

-- Tabel Pendaftaran
CREATE TABLE registrations (
    id BIGINT NOT NULL PRIMARY KEY,
    registration_number VARCHAR(50) NOT NULL UNIQUE,
    admission_path_id BIGINT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    gender CHAR(1) NOT NULL,
    place_of_birth VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    religion VARCHAR(50),
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    nik VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    province_id VARCHAR(10) NOT NULL,
    city_id VARCHAR(10) NOT NULL,
    district VARCHAR(100),
    village VARCHAR(100),
    postal_code VARCHAR(10),
    school_id BIGINT NOT NULL,
    graduation_year VARCHAR(4) NOT NULL,
    major VARCHAR(100),
    first_choice_program_id BIGINT NOT NULL,
    second_choice_program_id BIGINT,
    father_name VARCHAR(255),
    father_occupation VARCHAR(100),
    father_income VARCHAR(50),
    mother_name VARCHAR(255),
    mother_occupation VARCHAR(100),
    mother_income VARCHAR(50),
    guardian_name VARCHAR(255),
    guardian_occupation VARCHAR(100),
    guardian_income VARCHAR(50),
    registration_status ENUM('DRAFT','SUBMITTED','VERIFIED','ACCEPTED','REJECTED') NOT NULL DEFAULT 'DRAFT',
    payment_status ENUM('UNPAID','PAID','REFUNDED') NOT NULL DEFAULT 'UNPAID',
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (admission_path_id) REFERENCES admission_paths(id),
    FOREIGN KEY (province_id) REFERENCES wilayah(id_wil),
    FOREIGN KEY (city_id) REFERENCES wilayah(id_wil),
    FOREIGN KEY (school_id) REFERENCES schools(id),
    FOREIGN KEY (first_choice_program_id) REFERENCES sms(id_sms)
);

-- Tabel Dokumen Pendaftaran
CREATE TABLE registration_documents (
    id BIGINT NOT NULL PRIMARY KEY,
    registration_id BIGINT NOT NULL,
    requirement_id BIGINT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    verification_status ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
    verification_notes TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (registration_id) REFERENCES registrations(id),
    FOREIGN KEY (requirement_id) REFERENCES admission_requirements(id)
);

-- Tabel Pembayaran
CREATE TABLE payments (
    id BIGINT NOT NULL PRIMARY KEY,
    registration_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_date TIMESTAMP,
    payment_proof VARCHAR(255),
    transaction_id VARCHAR(100),
    status ENUM('PENDING','PAID','FAILED','EXPIRED','REFUNDED') NOT NULL DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (registration_id) REFERENCES registrations(id)
);

-- Tabel Pengumuman
CREATE TABLE announcements (
    id BIGINT NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Tabel Tagihan
CREATE TABLE tagihan (
    kode_tagihan VARCHAR(50) NOT NULL PRIMARY KEY,
    nim VARCHAR(20) NOT NULL,
    nama VARCHAR(100),
    jenis_cicilan VARCHAR(10),
    bulan VARCHAR(10),
    potongan DECIMAL(10,2),
    denda DECIMAL(10,2),
    nominal DECIMAL(10,2) NOT NULL,
    nominal_bayar DECIMAL(10,2),
    status_lunas VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim)
);

-- Tabel Tarif
CREATE TABLE tarif (
    periode_masuk VARCHAR(50) NOT NULL,
    gelombang VARCHAR(50) NOT NULL,
    jalur_pendaftaran VARCHAR(50) NOT NULL,
    sistem_kuliah VARCHAR(50) NOT NULL,
    jenis_akun VARCHAR(50) NOT NULL,
    nominal DECIMAL(10,2) NOT NULL,
    cicilan INT,
    denda DECIMAL(10,2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (periode_masuk, gelombang, jalur_pendaftaran, sistem_kuliah, jenis_akun)
);

-- =====================================================
-- TABEL PENGGUNA
-- =====================================================

-- Tabel Pengguna
CREATE TABLE users (
    id BIGINT NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    registration_id BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMP,
    remember_token VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (registration_id) REFERENCES registrations(id)
);

-- =====================================================
-- TABEL LOG UNTUK AUDIT TRAIL
-- =====================================================

CREATE TABLE registration_status_log (
    id BIGINT NOT NULL PRIMARY KEY,
    registration_id BIGINT NOT NULL,
    old_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (registration_id) REFERENCES registrations(id)
);

CREATE TABLE document_verification_log (
    id BIGINT NOT NULL PRIMARY KEY,
    document_id BIGINT NOT NULL,
    old_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    verifier_id BIGINT,
    verification_notes TEXT,
    verified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES registration_documents(id),
    FOREIGN KEY (verifier_id) REFERENCES users(id)
);

-- =====================================================
-- VIEWS UNTUK KEMUDAHAN QUERY
-- =====================================================

-- View untuk data lengkap pendaftaran
CREATE VIEW v_registration_details AS
SELECT 
    r.id,
    r.registration_number,
    r.full_name,
    r.gender,
    r.mobile_number,
    r.email,
    r.date_of_birth,
    r.place_of_birth,
    r.nik,
    r.registration_status,
    r.payment_status,
    ap.name as admission_path_name,
    ap.code as admission_path_code,
    s1.nm_lemb as first_choice_program,
    s2.nm_lemb as second_choice_program,
    sc.name as school_name,
    sc.type as school_type,
    w1.nm_wil as province_name,
    w2.nm_wil as city_name,
    r.created_at,
    r.updated_at
FROM registrations r
JOIN admission_paths ap ON r.admission_path_id = ap.id
JOIN sms s1 ON r.first_choice_program_id = s1.id_sms
LEFT JOIN sms s2 ON r.second_choice_program_id = s2.id_sms
JOIN schools sc ON r.school_id = sc.id
JOIN wilayah w1 ON r.province_id = w1.id_wil
JOIN wilayah w2 ON r.city_id = w2.id_wil;

-- View untuk statistik pendaftaran per jalur
CREATE VIEW v_admission_statistics AS
SELECT 
    ap.id,
    ap.code,
    ap.name,
    ap.academic_year,
    ap.semester,
    COUNT(r.id) as total_registrations,
    COUNT(CASE WHEN r.registration_status = 'SUBMITTED' THEN 1 END) as submitted_count,
    COUNT(CASE WHEN r.registration_status = 'VERIFIED' THEN 1 END) as verified_count,
    COUNT(CASE WHEN r.registration_status = 'ACCEPTED' THEN 1 END) as accepted_count,
    COUNT(CASE WHEN r.registration_status = 'REJECTED' THEN 1 END) as rejected_count,
    COUNT(CASE WHEN r.payment_status = 'PAID' THEN 1 END) as paid_count
FROM admission_paths ap
LEFT JOIN registrations r ON ap.id = r.admission_path_id
GROUP BY ap.id, ap.code, ap.name, ap.academic_year, ap.semester;

-- View untuk integrasi mahasiswa dengan pendaftaran
CREATE VIEW v_mahasiswa_registration AS
SELECT 
    m.nim,
    m.nama,
    m.program_studi,
    m.periode_masuk,
    m.jalur_penerimaan,
    m.status_mahasiswa,
    m.email,
    m.hp,
    r.registration_number,
    r.full_name as registration_name,
    r.registration_status,
    ap.name as admission_path_name,
    s.nm_lemb as study_program_name
FROM mahasiswa m
LEFT JOIN registrations r ON m.registration_id = r.id
LEFT JOIN admission_paths ap ON r.admission_path_id = ap.id
LEFT JOIN sms s ON r.first_choice_program_id = s.id_sms;

-- View untuk data mahasiswa PDDIKTI
CREATE VIEW v_pddikti_mahasiswa AS
SELECT 
    m.id_pd,
    m.nm_pd,
    m.jk,
    m.tmpt_lahir,
    m.tgl_lahir,
    m.id_agama,
    m.nik,
    m.kewarganegaraan,
    m.jln,
    m.rt,
    m.rw,
    m.nm_dsn,
    m.ds_kel,
    m.id_wil,
    m.kode_pos,
    m.id_jns_tinggal,
    m.id_alat_transport,
    m.telepon,
    m.handphone,
    m.email,
    m.a_terima_kps,
    m.no_kps,
    m.nm_ayah,
    m.id_pekerjaan_ayah,
    m.id_penghasilan_ayah,
    m.nm_ibu_kandung,
    m.id_pekerjaan_ibu,
    m.id_penghasilan_ibu
FROM mahasiswa m;

-- View untuk data mahasiswa per PT PDDIKTI
CREATE VIEW v_pddikti_mahasiswa_pt AS
SELECT 
    mp.id_reg_pd,
    mp.id_pd,
    mp.id_sms,
    mp.id_sp,
    mp.nipd,
    mp.tgl_masuk_sp,
    mp.id_jns_daftar,
    mp.id_jns_keluar,
    mp.tgl_keluar,
    mp.ket_keluar,
    mp.id_jalur_masuk,
    mp.mulai_smt,
    mp.sks_total,
    mp.ipk,
    mp.judul_skripsi,
    mp.bln_lulus,
    mp.sk_yudisium,
    mp.tgl_sk_yudisium,
    mp.no_ijazah,
    m.nm_pd,
    s.nm_lemb AS nm_prodi
FROM mahasiswa_pt mp
JOIN mahasiswa m ON mp.id_pd = m.id_pd
JOIN sms s ON mp.id_sms = s.id_sms;

-- View untuk data program studi PDDIKTI
CREATE VIEW v_pddikti_prodi AS
SELECT 
    s.id_sms,
    s.id_sp,
    s.id_jenj_didik,
    s.kode_prodi,
    s.nm_lemb,
    s.sks_lulus,
    s.stat_prodi,
    s.sks_total,
    s.tgl_berdiri,
    s.sk_selenggara,
    s.tgl_sk_penyelenggaraan,
    s.tgl_akhir_sk_akred,
    sp.nm_lemb AS nm_pt
FROM sms s
JOIN satuan_pendidikan sp ON s.id_sp = sp.id_sp;

-- View untuk data mata kuliah PDDIKTI
CREATE VIEW v_pddikti_mata_kuliah AS
SELECT 
    mk.id_mk,
    mk.id_sms,
    mk.kode_mk,
    mk.nm_mk,
    mk.jns_mk,
    mk.sks_mk,
    mk.sks_tm,
    mk.sks_prak,
    mk.sks_prak_lap,
    mk.sks_sim,
    s.nm_lemb AS nm_prodi,
    s.kode_prodi
FROM mata_kuliah mk
JOIN sms s ON mk.id_sms = s.id_sms;

-- View untuk data kelas kuliah PDDIKTI
CREATE VIEW v_pddikti_kelas_kuliah AS
SELECT 
    kk.id_kls,
    kk.id_sms,
    kk.id_smt,
    kk.id_mk,
    kk.nm_kls,
    kk.sks_mk,
    mk.kode_mk,
    mk.nm_mk,
    s.nm_lemb AS nm_prodi,
    sm.nm_smt
FROM kelas_kuliah kk
JOIN mata_kuliah mk ON kk.id_mk = mk.id_mk
JOIN sms s ON kk.id_sms = s.id_sms
JOIN ref.semester sm ON kk.id_smt = sm.id_smt;

-- View untuk data nilai PDDIKTI
CREATE VIEW v_pddikti_nilai AS
SELECT 
    n.id_kls,
    n.id_reg_pd,
    n.nilai_angka,
    n.nilai_huruf,
    n.nilai_indeks,
    kk.id_smt,
    kk.id_mk,
    mk.kode_mk,
    mk.nm_mk,
    mp.nipd,
    m.nm_pd
FROM nilai n
JOIN kelas_kuliah kk ON n.id_kls = kk.id_kls
JOIN mata_kuliah mk ON kk.id_mk = mk.id_mk
JOIN mahasiswa_pt mp ON n.id_reg_pd = mp.id_reg_pd
JOIN mahasiswa m ON mp.id_pd = m.id_pd;

-- =====================================================
-- STORED PROCEDURES UNTUK PROSES BISNIS
-- =====================================================

-- Fungsi untuk generate UUID
CREATE OR REPLACE FUNCTION generate_uuid() RETURNS VARCHAR(36) AS $$
BEGIN
    RETURN LOWER(CONCAT(
        LPAD(HEX(FLOOR(RANDOM() * 4294967295)), 8, '0'),
        '-',
        LPAD(HEX(FLOOR(RANDOM() * 65535)), 4, '0'),
        '-',
        LPAD(HEX(FLOOR(RANDOM() * 65535)), 4, '0'),
        '-',
        LPAD(HEX(FLOOR(RANDOM() * 65535)), 4, '0'),
        '-',
        LPAD(HEX(FLOOR(RANDOM() * 4294967295)), 8, '0'),
        LPAD(HEX(FLOOR(RANDOM() * 65535)), 4, '0')
    ));
END;
$$ LANGUAGE plpgsql;

-- Prosedur untuk generate nomor pendaftaran
CREATE OR REPLACE PROCEDURE generate_registration_number(
    IN admission_path_code VARCHAR(50),
    IN academic_year VARCHAR(10),
    OUT registration_number VARCHAR(50)
) AS $$
DECLARE
    counter INT DEFAULT 0;
    formatted_counter VARCHAR(10);
BEGIN
    -- Hitung jumlah pendaftaran untuk jalur dan tahun akademik tertentu
    SELECT COUNT(*) + 1 INTO counter
    FROM registrations r
    JOIN admission_paths ap ON r.admission_path_id = ap.id
    WHERE ap.code = admission_path_code 
    AND ap.academic_year = academic_year;
    
    -- Format counter dengan leading zeros
    formatted_counter := LPAD(counter::TEXT, 4, '0');
    
    -- Generate nomor pendaftaran: KODE_JALUR-TAHUN-COUNTER
    registration_number := CONCAT(admission_path_code, '-', academic_year, '-', formatted_counter);
END;
$$ LANGUAGE plpgsql;

-- Prosedur untuk konversi calon mahasiswa menjadi mahasiswa
CREATE OR REPLACE PROCEDURE convert_registration_to_student(
    IN registration_id BIGINT,
    IN nim VARCHAR(20),
    IN kurikulum VARCHAR(10)
) AS $$
DECLARE
    v_id_pd VARCHAR(36);
    v_id_reg_pd VARCHAR(36);
    v_id_sms VARCHAR(36);
    v_id_sp VARCHAR(36);
    v_nama VARCHAR(100);
    v_jenis_kelamin CHAR(1);
    v_hp VARCHAR(50);
    v_email VARCHAR(255);
    v_tgl_lahir DATE;
    v_tempat_lahir VARCHAR(100);
    v_nik VARCHAR(50);
    v_periode_masuk VARCHAR(50);
    v_program_studi VARCHAR(100);
    v_sistem_kuliah VARCHAR(50);
    v_jalur_penerimaan VARCHAR(50);
    v_gelombang VARCHAR(50);
    v_propinsi VARCHAR(100);
    v_kota VARCHAR(100);
BEGIN
    -- Generate UUID untuk id_pd
    SELECT generate_uuid() INTO v_id_pd;
    
    -- Generate UUID untuk id_reg_pd
    SELECT generate_uuid() INTO v_id_reg_pd;
    
    -- Ambil data pendaftaran
    SELECT 
        r.full_name,
        r.gender,
        r.mobile_number,
        r.email,
        r.date_of_birth,
        r.place_of_birth,
        r.nik,
        ap.academic_year,
        s.kode_prodi,
        ap.study_system,
        ap.name,
        ap.wave,
        w1.nm_wil,
        w2.nm_wil,
        s.id_sms,
        sp.id_sp
    INTO 
        v_nama,
        v_jenis_kelamin,
        v_hp,
        v_email,
        v_tgl_lahir,
        v_tempat_lahir,
        v_nik,
        v_periode_masuk,
        v_program_studi,
        v_sistem_kuliah,
        v_jalur_penerimaan,
        v_gelombang,
        v_propinsi,
        v_kota,
        v_id_sms,
        v_id_sp
    FROM registrations r
    JOIN admission_paths ap ON r.admission_path_id = ap.id
    JOIN sms s ON r.first_choice_program_id = s.id_sms
    JOIN satuan_pendidikan sp ON s.id_sp = sp.id_sp
    JOIN wilayah w1 ON r.province_id = w1.id_wil
    JOIN wilayah w2 ON r.city_id = w2.id_wil
    WHERE r.id = registration_id;
    
    -- Insert data mahasiswa baru
    INSERT INTO mahasiswa (
        nim, id_pd, registration_id, periode_masuk, program_studi, nama, nm_pd,
        jk, sistem_kuliah, jalur_penerimaan, gelombang_daftar, kurikulum,
        kewarganegaraan, status_mahasiswa, hp, handphone, tempat_lahir, tmpt_lahir,
        tgl__lahir, tgl_lahir, jenis_kelamin, email, no__ktpnik, nik, propinsi, kota,
        tgl__daftar, created_at, updated_at
    ) VALUES (
        nim, v_id_pd, registration_id, v_periode_masuk, v_program_studi, v_nama, v_nama,
        v_jenis_kelamin, v_sistem_kuliah, v_jalur_penerimaan, v_gelombang, kurikulum,
        'Indonesia', 'AKTIF', v_hp, v_hp, v_tempat_lahir, v_tempat_lahir,
        v_tgl_lahir, v_tgl_lahir, v_jenis_kelamin, v_email, v_nik, v_nik, v_propinsi, v_kota,
        CURRENT_DATE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    );
    
    -- Insert ke mahasiswa_pt
    INSERT INTO mahasiswa_pt (
        id_reg_pd, id_pd, id_sms, id_sp, nipd, tgl_masuk_sp, id_jns_daftar,
        mulai_smt, created_at, updated_at, last_update
    ) VALUES (
        v_id_reg_pd, v_id_pd, v_id_sms, v_id_sp, nim, 
        CURRENT_DATE,
        (CASE 
            WHEN v_jalur_penerimaan LIKE '%TRANSFER%' THEN '2' -- Pindahan
            ELSE '1' -- Peserta didik baru
         END),
        v_periode_masuk, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    );
    
    -- Update status pendaftaran
    UPDATE registrations 
    SET registration_status = 'ACCEPTED'
    WHERE id = registration_id;
    
    -- Buat user untuk mahasiswa
    INSERT INTO users (
        id, username, email, password, role, registration_id, is_active, created_at, updated_at
    ) VALUES (
        nextval('users_id_seq'), nim, v_email, 
        -- Password default: NIM (akan di-hash oleh aplikasi)
        MD5(nim), 
        'MAHASISWA', registration_id, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    );
    
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk otomatisasi sinkronisasi data mahasiswa ke PDDIKTI
CREATE OR REPLACE FUNCTION tr_mahasiswa_after_insert_update()
RETURNS TRIGGER AS $$
DECLARE
    v_id_reg_pd VARCHAR(36);
    v_id_sms VARCHAR(36);
    v_id_sp VARCHAR(36);
    v_jns_daftar VARCHAR(2);
BEGIN
    -- Jika id_pd belum ada, generate UUID baru
    IF NEW.id_pd IS NULL THEN
        NEW.id_pd := generate_uuid();
    END IF;
    
    -- Ambil data program studi
    SELECT s.id_sms, s.id_sp INTO v_id_sms, v_id_sp
    FROM sms s
    WHERE s.kode_prodi = NEW.program_studi;
    
    -- Tentukan jenis pendaftaran
    IF NEW.jalur_penerimaan LIKE '%TRANSFER%' OR NEW.transfer__tidak = 'YA' THEN
        v_jns_daftar := '2'; -- Pindahan
    ELSE
        v_jns_daftar := '1'; -- Peserta didik baru
    END IF;
    
    -- Cek apakah data sudah ada di mahasiswa_pt
    IF NOT EXISTS (SELECT 1 FROM mahasiswa_pt WHERE id_pd = NEW.id_pd AND nipd = NEW.nim) THEN
        -- Generate UUID untuk id_reg_pd
        SELECT generate_uuid() INTO v_id_reg_pd;
        
        -- Insert ke mahasiswa_pt
        INSERT INTO mahasiswa_pt (
            id_reg_pd, id_pd, id_sms, id_sp, nipd, tgl_masuk_sp, id_jns_daftar,
            mulai_smt, created_at, updated_at, last_update
        ) VALUES (
            v_id_reg_pd, NEW.id_pd, v_id_sms, v_id_sp, NEW.nim, 
            COALESCE(NEW.tgl__daftar, CURRENT_DATE),
            v_jns_daftar,
            NEW.periode_masuk, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        );
    ELSE
        -- Update data mahasiswa_pt
        UPDATE mahasiswa_pt
        SET 
            id_sms = v_id_sms,
            id_sp = v_id_sp,
            id_jns_daftar = v_jns_daftar,
            mulai_smt = NEW.periode_masuk,
            updated_at = CURRENT_TIMESTAMP,
            last_update = CURRENT_TIMESTAMP
        WHERE id_pd = NEW.id_pd AND nipd = NEW.nim;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_mahasiswa_after_insert
    BEFORE INSERT ON mahasiswa
    FOR EACH ROW
    EXECUTE FUNCTION tr_mahasiswa_after_insert_update();

CREATE TRIGGER tr_mahasiswa_after_update
    BEFORE UPDATE ON mahasiswa
    FOR EACH ROW
    EXECUTE FUNCTION tr_mahasiswa_after_insert_update();

-- Trigger untuk otomatisasi sinkronisasi data nilai ke PDDIKTI
CREATE OR REPLACE FUNCTION tr_nilai_after_insert_update()
RETURNS TRIGGER AS $$
DECLARE
    v_id_kls VARCHAR(36);
    v_id_reg_pd VARCHAR(36);
    v_nilai_huruf VARCHAR(5);
    v_nilai_indeks NUMERIC(4,2);
BEGIN
    -- Ambil id_kls dari kelas_kuliah berdasarkan kode kelas
    SELECT kk.id_kls INTO v_id_kls
    FROM kelas_kuliah kk
    JOIN kelas k ON kk.kode_kelas = k.kode_kelas
    WHERE k.id = NEW.id_kelas;
    
    -- Ambil id_reg_pd dari mahasiswa_pt berdasarkan nim
    SELECT mp.id_reg_pd INTO v_id_reg_pd
    FROM mahasiswa_pt mp
    JOIN mahasiswa m ON mp.nipd = m.nim
    WHERE m.nim = NEW.nim;
    
    -- Konversi nilai angka ke huruf dan indeks berdasarkan skala nilai
    SELECT sn.nilai_huruf, sn.bobot INTO v_nilai_huruf, v_nilai_indeks
    FROM skalanilai sn
    WHERE NEW.nilai_angka BETWEEN sn.nilai_min AND sn.nilai_max;
    
    -- Cek apakah data sudah ada di nilai PDDIKTI
    IF NOT EXISTS (SELECT 1 FROM nilai WHERE id_kls = v_id_kls AND id_reg_pd = v_id_reg_pd) THEN
        -- Insert ke nilai PDDIKTI
        INSERT INTO nilai (
            id_kls, id_reg_pd, nilai_angka, nilai_huruf, nilai_indeks,
            created_at, updated_at
        ) VALUES (
            v_id_kls, v_id_reg_pd, NEW.nilai_angka, v_nilai_huruf, v_nilai_indeks,
            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        );
    ELSE
        -- Update data nilai PDDIKTI
        UPDATE nilai
        SET 
            nilai_angka = NEW.nilai_angka,
            nilai_huruf = v_nilai_huruf,
            nilai_indeks = v_nilai_indeks,
            updated_at = CURRENT_TIMESTAMP
        WHERE id_kls = v_id_kls AND id_reg_pd = v_id_reg_pd;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_nilai_after_insert
    AFTER INSERT ON krskm
    FOR EACH ROW
    EXECUTE FUNCTION tr_nilai_after_insert_update();

CREATE TRIGGER tr_nilai_after_update
    AFTER UPDATE ON krskm
    FOR EACH ROW
    WHEN (OLD.nilai_angka IS DISTINCT FROM NEW.nilai_angka)
    EXECUTE FUNCTION tr_nilai_after_insert_update();

-- Trigger untuk memantau kuota program studi
CREATE OR REPLACE FUNCTION tr_check_program_quota()
RETURNS TRIGGER AS $$
DECLARE
    current_quota INT;
    max_quota INT;
    program_name VARCHAR(255);
BEGIN
    -- Ambil kuota maksimum dan nama program studi
    SELECT ap.quota, s.nm_lemb INTO max_quota, program_name
    FROM admission_path_programs ap
    JOIN sms s ON ap.program_id = s.id_sms
    WHERE ap.admission_path_id = NEW.admission_path_id
    AND ap.program_id = NEW.first_choice_program_id;
    
    -- Hitung jumlah pendaftaran saat ini untuk jalur dan program studi tersebut
    SELECT COUNT(*) INTO current_quota
    FROM registrations r
    WHERE r.admission_path_id = NEW.admission_path_id
    AND r.first_choice_program_id = NEW.first_choice_program_id
    AND r.registration_status NOT IN ('CANCELLED', 'REJECTED');
    
    -- Jika melebihi kuota, tolak pendaftaran
    IF current_quota > max_quota THEN
        RAISE EXCEPTION 'Kuota program studi % telah penuh (% dari % pendaftar)', 
            program_name, current_quota, max_quota;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_check_program_quota
    BEFORE INSERT OR UPDATE ON registrations
    FOR EACH ROW
    EXECUTE FUNCTION tr_check_program_quota();

-- Trigger untuk mencatat log perubahan status pendaftaran
CREATE OR REPLACE FUNCTION tr_registration_status_log()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.registration_status IS DISTINCT FROM NEW.registration_status THEN
        INSERT INTO registration_status_log (
            registration_id, old_status, new_status, changed_at, changed_by
        ) VALUES (
            NEW.id, OLD.registration_status, NEW.registration_status, 
            CURRENT_TIMESTAMP, current_user
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_registration_status_log
    AFTER UPDATE ON registrations
    FOR EACH ROW
    EXECUTE FUNCTION tr_registration_status_log();

-- Trigger untuk mencatat log verifikasi dokumen
CREATE OR REPLACE FUNCTION tr_document_verification_log()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.verification_status IS DISTINCT FROM NEW.verification_status THEN
        INSERT INTO document_verification_log (
            document_id, registration_id, old_status, new_status, 
            verified_at, verified_by, verification_notes
        ) VALUES (
            NEW.id, NEW.registration_id, OLD.verification_status, NEW.verification_status, 
            CURRENT_TIMESTAMP, current_user, NEW.verification_notes
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_document_verification_log
    AFTER UPDATE ON registration_documents
    FOR EACH ROW
    EXECUTE FUNCTION tr_document_verification_log();

-- Prosedur untuk sinkronisasi data mahasiswa ke PDDIKTI
CREATE OR REPLACE PROCEDURE sync_mahasiswa_to_pddikti(
    IN p_periode_masuk VARCHAR(10)
) AS $$
DECLARE
    v_id_pd VARCHAR(36);
    v_id_reg_pd VARCHAR(36);
    v_id_sms VARCHAR(36);
    v_id_sp VARCHAR(36);
    v_jns_daftar VARCHAR(2);
    v_rec RECORD;
BEGIN
    -- Loop untuk setiap mahasiswa yang belum tersinkronisasi
    FOR v_rec IN 
        SELECT m.nim, m.nama, m.jenis_kelamin, m.tempat_lahir, m.tgl_lahir, 
               m.nik, m.program_studi, m.jalur_penerimaan, m.transfer__tidak, 
               m.periode_masuk, m.tgl__daftar
        FROM mahasiswa m
        LEFT JOIN mahasiswa_pt mp ON m.nim = mp.nipd
        WHERE mp.id_reg_pd IS NULL
        AND m.periode_masuk = p_periode_masuk
    LOOP
        -- Generate UUID untuk id_pd jika belum ada
        SELECT generate_uuid() INTO v_id_pd;
        
        -- Generate UUID untuk id_reg_pd
        SELECT generate_uuid() INTO v_id_reg_pd;
        
        -- Ambil data program studi
        SELECT s.id_sms, s.id_sp INTO v_id_sms, v_id_sp
        FROM sms s
        WHERE s.kode_prodi = v_rec.program_studi;
        
        -- Tentukan jenis pendaftaran
        IF v_rec.jalur_penerimaan LIKE '%TRANSFER%' OR v_rec.transfer__tidak = 'YA' THEN
            v_jns_daftar := '2'; -- Pindahan
        ELSE
            v_jns_daftar := '1'; -- Peserta didik baru
        END IF;
        
        -- Update id_pd di mahasiswa
        UPDATE mahasiswa
        SET id_pd = v_id_pd
        WHERE nim = v_rec.nim;
        
        -- Insert ke mahasiswa_pt
        INSERT INTO mahasiswa_pt (
            id_reg_pd, id_pd, id_sms, id_sp, nipd, tgl_masuk_sp, id_jns_daftar,
            mulai_smt, created_at, updated_at, last_update
        ) VALUES (
            v_id_reg_pd, v_id_pd, v_id_sms, v_id_sp, v_rec.nim, 
            COALESCE(v_rec.tgl__daftar, CURRENT_DATE),
            v_jns_daftar,
            v_rec.periode_masuk, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        );
        
        RAISE NOTICE 'Mahasiswa % berhasil disinkronisasi ke PDDIKTI', v_rec.nim;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Prosedur untuk sinkronisasi data mata kuliah ke PDDIKTI
CREATE OR REPLACE PROCEDURE sync_matakuliah_to_pddikti(
    IN p_kode_prodi VARCHAR(10)
) AS $$
DECLARE
    v_id_mk VARCHAR(36);
    v_id_sms VARCHAR(36);
    v_rec RECORD;
BEGIN
    -- Ambil id_sms dari program studi
    SELECT id_sms INTO v_id_sms
    FROM sms
    WHERE kode_prodi = p_kode_prodi;
    
    -- Loop untuk setiap mata kuliah yang belum tersinkronisasi
    FOR v_rec IN 
        SELECT km.kode_mk, km.nama_mk, km.sks, km.semester, km.jenis_mk
        FROM kurikulummk km
        LEFT JOIN mata_kuliah mk ON km.kode_mk = mk.kode_mk AND mk.id_sms = v_id_sms
        WHERE mk.id_mk IS NULL
        AND km.kode_prodi = p_kode_prodi
    LOOP
        -- Generate UUID untuk id_mk
        SELECT generate_uuid() INTO v_id_mk;
        
        -- Insert ke mata_kuliah
        INSERT INTO mata_kuliah (
            id_mk, id_sms, kode_mk, nm_mk, jns_mk, sks_mk, 
            created_at, updated_at
        ) VALUES (
            v_id_mk, v_id_sms, v_rec.kode_mk, v_rec.nama_mk, 
            v_rec.jenis_mk, v_rec.sks,
            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        );
        
        RAISE NOTICE 'Mata kuliah % berhasil disinkronisasi ke PDDIKTI', v_rec.kode_mk;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Prosedur untuk sinkronisasi data kelas kuliah ke PDDIKTI
CREATE OR REPLACE PROCEDURE sync_kelas_to_pddikti(
    IN p_semester VARCHAR(10)
) AS $$
DECLARE
    v_id_kls VARCHAR(36);
    v_id_mk VARCHAR(36);
    v_id_sms VARCHAR(36);
    v_rec RECORD;
BEGIN
    -- Loop untuk setiap kelas yang belum tersinkronisasi
    FOR v_rec IN 
        SELECT k.kode_kelas, k.nama_kelas, k.kode_mk, k.semester, k.kode_prodi, k.dosen_pengampu
        FROM kelas k
        LEFT JOIN kelas_kuliah kk ON k.kode_kelas = kk.kode_kelas
        WHERE kk.id_kls IS NULL
        AND k.semester = p_semester
    LOOP
        -- Generate UUID untuk id_kls
        SELECT generate_uuid() INTO v_id_kls;
        
        -- Ambil id_mk dari mata kuliah
        SELECT mk.id_mk, mk.id_sms INTO v_id_mk, v_id_sms
        FROM mata_kuliah mk
        JOIN sms s ON mk.id_sms = s.id_sms
        WHERE mk.kode_mk = v_rec.kode_mk
        AND s.kode_prodi = v_rec.kode_prodi;
        
        -- Insert ke kelas_kuliah
        INSERT INTO kelas_kuliah (
            id_kls, id_sms, id_mk, nm_kls, kode_kelas, smt, tgl_mulai_kelas, tgl_selesai_kelas,
            created_at, updated_at
        ) VALUES (
            v_id_kls, v_id_sms, v_id_mk, v_rec.nama_kelas, v_rec.kode_kelas, v_rec.semester,
            (SELECT tgl_mulai FROM ref.semester WHERE id_smt = v_rec.semester),
            (SELECT tgl_selesai FROM ref.semester WHERE id_smt = v_rec.semester),
            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        );
        
        RAISE NOTICE 'Kelas % berhasil disinkronisasi ke PDDIKTI', v_rec.kode_kelas;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Prosedur untuk sinkronisasi data nilai ke PDDIKTI
CREATE OR REPLACE PROCEDURE sync_nilai_to_pddikti(
    IN p_semester VARCHAR(10)
) AS $$
DECLARE
    v_id_kls VARCHAR(36);
    v_id_reg_pd VARCHAR(36);
    v_nilai_huruf VARCHAR(5);
    v_nilai_indeks NUMERIC(4,2);
    v_rec RECORD;
BEGIN
    -- Loop untuk setiap nilai yang belum tersinkronisasi
    FOR v_rec IN 
        SELECT km.nim, km.id_kelas, km.nilai_angka, k.kode_kelas, k.semester
        FROM krskm km
        JOIN kelas k ON km.id_kelas = k.id
        WHERE km.nilai_angka IS NOT NULL
        AND k.semester = p_semester
    LOOP
        -- Ambil id_kls dari kelas_kuliah
        SELECT kk.id_kls INTO v_id_kls
        FROM kelas_kuliah kk
        WHERE kk.kode_kelas = v_rec.kode_kelas;
        
        -- Ambil id_reg_pd dari mahasiswa_pt
        SELECT mp.id_reg_pd INTO v_id_reg_pd
        FROM mahasiswa_pt mp
        WHERE mp.nipd = v_rec.nim;
        
        -- Konversi nilai angka ke huruf dan indeks
        SELECT sn.nilai_huruf, sn.bobot INTO v_nilai_huruf, v_nilai_indeks
        FROM skalanilai sn
        WHERE v_rec.nilai_angka BETWEEN sn.nilai_min AND sn.nilai_max;
        
        -- Cek apakah data sudah ada di nilai PDDIKTI
        IF NOT EXISTS (SELECT 1 FROM nilai WHERE id_kls = v_id_kls AND id_reg_pd = v_id_reg_pd) THEN
            -- Insert ke nilai PDDIKTI
            INSERT INTO nilai (
                id_kls, id_reg_pd, nilai_angka, nilai_huruf, nilai_indeks,
                created_at, updated_at
            ) VALUES (
                v_id_kls, v_id_reg_pd, v_rec.nilai_angka, v_nilai_huruf, v_nilai_indeks,
                CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
            );
        ELSE
            -- Update data nilai PDDIKTI
            UPDATE nilai
            SET 
                nilai_angka = v_rec.nilai_angka,
                nilai_huruf = v_nilai_huruf,
                nilai_indeks = v_nilai_indeks,
                updated_at = CURRENT_TIMESTAMP
            WHERE id_kls = v_id_kls AND id_reg_pd = v_id_reg_pd;
        END IF;
        
        RAISE NOTICE 'Nilai mahasiswa % untuk kelas % berhasil disinkronisasi ke PDDIKTI', 
            v_rec.nim, v_rec.kode_kelas;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Komentar penutup
COMMENT ON DATABASE postgres IS 'Database terintegrasi untuk sistem akademik, pendaftaran mahasiswa baru, dan PDDIKTI';

/*
Catatan Implementasi:

1. Struktur database ini dirancang untuk mengintegrasikan sistem akademik, sistem pendaftaran mahasiswa baru,
   dan pelaporan PDDIKTI dalam satu database PostgreSQL.

2. Skema 'ref' berisi tabel-tabel referensi yang digunakan oleh PDDIKTI.

3. Skema 'public' berisi tabel-tabel utama untuk sistem akademik dan pendaftaran.

4. Trigger dan prosedur tersimpan digunakan untuk otomatisasi sinkronisasi data antara sistem akademik dan PDDIKTI.

5. View digunakan untuk memudahkan pelaporan dan ekspor data ke format PDDIKTI.

6. Untuk implementasi di Laravel 12, gunakan struktur ini sebagai dasar untuk membuat migrasi database.
   Pastikan untuk menyesuaikan tipe data dan fitur khusus PostgreSQL jika diperlukan.

7. Untuk keamanan, pastikan untuk mengimplementasikan enkripsi password yang tepat di aplikasi Laravel,
   bukan menggunakan MD5 seperti yang ditunjukkan dalam prosedur contoh.

8. Untuk pengembangan lebih lanjut, pertimbangkan untuk menambahkan indeks tambahan untuk meningkatkan performa query.
*/