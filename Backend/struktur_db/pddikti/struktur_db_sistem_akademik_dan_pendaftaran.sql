-- =====================================================
-- STRUKTUR DATABASE GABUNGAN
-- Sistem Akademik + Sistem Pendaftaran Mahasiswa Baru
-- Generated: 2025-06-28
-- =====================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- =====================================================
-- TABEL SISTEM AKADEMIK (EXISTING)
-- =====================================================


-- bikin master dari masing-data, seperti negara, agama, prodi, jenjang, sistem kuliah dll (semua kolom yang membutuhkan )
-- ADMIN PANEL, CRUD DATA MASTER, LAPORAN PENDAFTAR DI SUATU JALUR PER PRODI NYA, UBAH STATUS MAHASISWA SETELAH MENDAFTAR 
-- TAMBAHKAN CHATBOT BUKAN DARI WA 

-- Tabel Unit (Program Studi, Fakultas, dll)
CREATE TABLE unit (
    kode_unit VARCHAR(10) NOT NULL PRIMARY KEY,
    parent_unit VARCHAR(100),
    nama_unit VARCHAR(100) NOT NULL,
    nama_singkat VARCHAR(50),
    jenjang_pendidikan VARCHAR(50),
    level INT,
    alamat VARCHAR(255),
    telepon VARCHAR(50),
    akreditasi VARCHAR(10),
    sk_akreditasi VARCHAR(100),
    kode_nim VARCHAR(50),
    gelar VARCHAR(50),
    ketua VARCHAR(100)
);

-- Tabel Pegawai/Dosen
CREATE TABLE pegawai (
    nip VARCHAR(50) NOT NULL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    hombase VARCHAR(100) REFERENCES unit(kode_unit),
    jenis_kelamin CHAR(1) NOT NULL,
    tempat_lahir VARCHAR(50),
    tanggal_lahir DATE,
    agama VARCHAR(50),
    nidn CHAR(10) UNIQUE,
    gelar_depan VARCHAR(10),
    gelar_belakang VARCHAR(100),
    golonganpangkat VARCHAR(50),
    jabatan_fungsional VARCHAR(100),
    jabatan_struktural VARCHAR(100),
    alamat_rumah VARCHAR(255),
    no__telepon VARCHAR(50),
    email_pribadi VARCHAR(100),
    email_kampus VARCHAR(255) UNIQUE
);

-- =====================================================
-- TABEL SISTEM PENDAFTARAN (NEW)
-- =====================================================

-- Tabel Provinsi
CREATE TABLE provinces (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Kota/Kabupaten
CREATE TABLE cities (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    province_id int(11) NOT NULL,
    name varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Universitas
CREATE TABLE universities (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    address text COLLATE utf8mb4_unicode_ci,
    phone varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    email varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    website varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    logo_url varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Program Studi (Untuk Pendaftaran)
CREATE TABLE study_programs (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    code varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    level enum('D3','S1','PROFESI') COLLATE utf8mb4_unicode_ci NOT NULL,
    accreditation varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    website varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    quota int(11) NOT NULL DEFAULT '0',
    is_active tinyint(1) NOT NULL DEFAULT '1',
    unit_kode VARCHAR(10), -- Link ke tabel unit
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    FOREIGN KEY (unit_kode) REFERENCES unit(kode_unit)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Sekolah Asal
CREATE TABLE schools (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    npsn varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL UNIQUE,
    name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    type enum('SMA','SMK','MA','LAINNYA') COLLATE utf8mb4_unicode_ci NOT NULL,
    province_id int(11) NOT NULL,
    city_id int(11) NOT NULL,
    is_verified tinyint(1) NOT NULL DEFAULT '0',
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Jalur Penerimaan
CREATE TABLE admission_paths (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    code varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    description text COLLATE utf8mb4_unicode_ci,
    registration_fee decimal(10,2) NOT NULL DEFAULT '0.00',
    study_system varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    target_students text COLLATE utf8mb4_unicode_ci,
    schedule varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    wave varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    academic_year varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
    semester enum('GANJIL','GENAP') COLLATE utf8mb4_unicode_ci NOT NULL,
    is_active tinyint(1) NOT NULL DEFAULT '1',
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Program Studi per Jalur Penerimaan
CREATE TABLE admission_path_programs (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    admission_path_id bigint(20) UNSIGNED NOT NULL,
    study_program_id bigint(20) UNSIGNED NOT NULL,
    quota int(11) NOT NULL DEFAULT '0',
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY adm_path_prog_unique (admission_path_id,study_program_id),
    FOREIGN KEY (admission_path_id) REFERENCES admission_paths(id) ON DELETE CASCADE,
    FOREIGN KEY (study_program_id) REFERENCES study_programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Persyaratan Pendaftaran
CREATE TABLE admission_requirements (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    admission_path_id bigint(20) UNSIGNED NOT NULL,
    requirement_name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    description text COLLATE utf8mb4_unicode_ci,
    is_mandatory tinyint(1) NOT NULL DEFAULT '1',
    file_type varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    max_file_size int(11) NOT NULL DEFAULT '2048' COMMENT 'dalam KB',
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admission_path_id) REFERENCES admission_paths(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Pendaftaran
CREATE TABLE registrations (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    registration_number varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    admission_path_id bigint(20) UNSIGNED NOT NULL,
    full_name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    gender enum('MALE','FEMALE') COLLATE utf8mb4_unicode_ci NOT NULL,
    mobile_number varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
    email varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    date_of_birth date NOT NULL,
    place_of_birth varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    nationality varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Indonesia',
    nik varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    province_id int(11) NOT NULL,
    city_id int(11) NOT NULL,
    school_id bigint(20) UNSIGNED NOT NULL,
    school_specialization varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    graduation_year year(4) NOT NULL,
    first_choice_program_id bigint(20) UNSIGNED NOT NULL,
    second_choice_program_id bigint(20) UNSIGNED DEFAULT NULL,
    registration_status enum('DRAFT','SUBMITTED','VERIFIED','ACCEPTED','REJECTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
    payment_status enum('PENDING','PAID','FAILED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    INDEX idx_mobile_number (mobile_number),
    INDEX idx_email (email),
    INDEX idx_registration_status (registration_status),
    INDEX idx_payment_status (payment_status),
    FOREIGN KEY (admission_path_id) REFERENCES admission_paths(id),
    FOREIGN KEY (school_id) REFERENCES schools(id),
    FOREIGN KEY (first_choice_program_id) REFERENCES study_programs(id),
    FOREIGN KEY (second_choice_program_id) REFERENCES study_programs(id),
    FOREIGN KEY (province_id) REFERENCES provinces(id),
    FOREIGN KEY (city_id) REFERENCES cities(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Dokumen Pendaftaran
CREATE TABLE registration_documents (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    registration_id bigint(20) UNSIGNED NOT NULL,
    requirement_id bigint(20) UNSIGNED NOT NULL,
    file_name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    file_path varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
    file_size int(11) NOT NULL COMMENT 'dalam bytes',
    upload_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verification_status enum('PENDING','APPROVED','REJECTED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
    verification_notes text COLLATE utf8mb4_unicode_ci,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE,
    FOREIGN KEY (requirement_id) REFERENCES admission_requirements(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Pembayaran
CREATE TABLE payments (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    registration_id bigint(20) UNSIGNED NOT NULL,
    payment_code varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    amount decimal(10,2) NOT NULL,
    payment_method varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    payment_date timestamp NULL DEFAULT NULL,
    payment_status enum('PENDING','SUCCESS','FAILED','EXPIRED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
    payment_proof varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    verification_date timestamp NULL DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Pengumuman
CREATE TABLE announcements (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    content text COLLATE utf8mb4_unicode_ci NOT NULL,
    type enum('INFORMASI','PENGUMUMAN','BEASISWA') COLLATE utf8mb4_unicode_ci NOT NULL,
    banner_image varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    is_published tinyint(1) NOT NULL DEFAULT '0',
    publish_date timestamp NULL DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Users/Pengguna
CREATE TABLE users (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    email varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    password varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    two_factor_secret text COLLATE utf8mb4_unicode_ci,
    two_factor_recovery_codes text COLLATE utf8mb4_unicode_ci,
    two_factor_confirmed_at timestamp NULL DEFAULT NULL,
    role enum('SUPER_ADMIN','ADMIN','OPERATOR','VERIFIER','STUDENT') COLLATE utf8mb4_unicode_ci NOT NULL,
    registration_id bigint(20) UNSIGNED DEFAULT NULL,
    is_active tinyint(1) NOT NULL DEFAULT '1',
    last_login timestamp NULL DEFAULT NULL,
    remember_token varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABEL MAHASISWA (MODIFIED) - Integrasi dengan Pendaftaran
-- =====================================================

-- Tabel Mahasiswa (Modified untuk integrasi)
CREATE TABLE mahasiswa (
    nim VARCHAR(10) NOT NULL PRIMARY KEY,
    registration_id bigint(20) UNSIGNED DEFAULT NULL, -- Link ke pendaftaran
    periode_masuk VARCHAR(50) NOT NULL,
    program_studi VARCHAR(100) NOT NULL REFERENCES unit(kode_unit),
    nama VARCHAR(100) NOT NULL,
    sistem_kuliah VARCHAR(50),
    jalur_penerimaan VARCHAR(50),
    gelombang_daftar VARCHAR(50),
    transfer__tidak VARCHAR(10),
    universitas_asal VARCHAR(100),
    nim_asal VARCHAR(50),
    ipk_asal DECIMAL(10,2),
    kurikulum VARCHAR(10),
    agama VARCHAR(50),
    kewarganegaraan VARCHAR(50),
    status_mahasiswa VARCHAR(50) NOT NULL,
    alamat TEXT,
    telepon VARCHAR(50),
    hp VARCHAR(50),
    tempat_lahir VARCHAR(100),
    tgl__lahir DATE,
    kodepos VARCHAR(10),
    jenis_kelamin CHAR(1) NOT NULL,
    golongan_darah VARCHAR(10),
    status_nikah VARCHAR(10),
    email VARCHAR(255) UNIQUE,
    no__ktpnik VARCHAR(50) UNIQUE,
    no__kk VARCHAR(50),
    rt VARCHAR(10),
    rw VARCHAR(10),
    dusun VARCHAR(50),
    desakelurahan VARCHAR(100),
    kecamatan VARCHAR(100),
    kota VARCHAR(100),
    propinsi VARCHAR(100),
    tgl__daftar DATE,
    nama_ayah VARCHAR(100),
    alamat_ayah VARCHAR(255),
    telp__ayah VARCHAR(50),
    tgl__lahir_ayah DATE,
    pendidikan_ayah VARCHAR(50),
    pekerjaan_ayah VARCHAR(50),
    penghasilan_ayah VARCHAR(10),
    nama_ibu VARCHAR(100),
    alamat_ibu VARCHAR(255),
    telp__ibu VARCHAR(50),
    tgl__lahir_ibu DATE,
    pendidikan_ibu VARCHAR(50),
    pekerjaan_ibu VARCHAR(50),
    penghasilan_ibu VARCHAR(10),
    nama_wali VARCHAR(100),
    alamat_wali VARCHAR(255),
    telp__wali VARCHAR(50),
    tgl__wali DATE,
    pendidikan_wali VARCHAR(50),
    pekerjaan_wali VARCHAR(100),
    penghasilan_wali VARCHAR(50),
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE SET NULL
);

-- =====================================================
-- TABEL SISTEM AKADEMIK LAINNYA (EXISTING)
-- =====================================================

-- Tabel Mahasiswa KM
CREATE TABLE mahasiswakm (
    nim VARCHAR(50) NOT NULL PRIMARY KEY,
    periode_masuk VARCHAR(10) NOT NULL,
    perguruan_tinggi_asal VARCHAR(100),
    program_studi_asal VARCHAR(100),
    nama VARCHAR(100) NOT NULL,
    jenis_kelamin CHAR(1) NOT NULL,
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    no__hp VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    alamat TEXT
);

-- Tabel Kurikulum Mata Kuliah
CREATE TABLE kurikulummk (
    program_studi VARCHAR(100) NOT NULL REFERENCES unit(kode_unit),
    kurikulum_ VARCHAR(10) NOT NULL,
    kode_matakuliah VARCHAR(10) NOT NULL,
    nama_matakuliah VARCHAR(100) NOT NULL,
    semester_matakuliah INT,
    sks_matakuliah INT NOT NULL,
    sks_tatap_muka INT,
    sks_praktikum INT,
    sks_simulasi INT,
    sks_praktikum_lapangan INT,
    nilai_lulus_minimal DECIMAL(10,2),
    kelompok_matakuliah VARCHAR(50),
    jenis_matakuliah VARCHAR(50),
    PRIMARY KEY (program_studi, kurikulum_, kode_matakuliah)
);

-- Tabel Kelas
CREATE TABLE kelas (
    program_studi VARCHAR(100) NOT NULL,
    tahun_kurikulum INT NOT NULL,
    kode_mata_kuliah VARCHAR(10) NOT NULL,
    periode VARCHAR(50) NOT NULL,
    nama_kelas VARCHAR(10) NOT NULL,
    hari_1 INT,
    jam_mulai_1 TIME,
    jam_selesai_1 TIME,
    hari_2 VARCHAR(10),
    jam_mulai_2 TIME,
    jam_selesai_2 TIME,
    hari_3 VARCHAR(10),
    jam_mulai_3 TIME,
    jam_selesai_3 TIME,
    hari_4 VARCHAR(10),
    jam_mulai_4 TIME,
    jam_selesai_4 TIME,
    daya_tampung INT,
    nip_dosen_1 VARCHAR(10) REFERENCES pegawai(nip),
    nama_dosen_1 VARCHAR(100),
    nip_dosen_2 CHAR(10) REFERENCES pegawai(nip),
    nama_dosen_2 VARCHAR(100),
    PRIMARY KEY (program_studi, tahun_kurikulum, kode_mata_kuliah, periode, nama_kelas),
    FOREIGN KEY (program_studi, tahun_kurikulum, kode_mata_kuliah) 
        REFERENCES kurikulummk(program_studi, kurikulum_, kode_matakuliah)
);

-- Tabel Kelas KM
CREATE TABLE kelaskm (
    program_studi_pengampu VARCHAR(100) NOT NULL REFERENCES unit(kode_unit),
    tahun_kurikulum VARCHAR(10) NOT NULL,
    kode_mata_kuliah VARCHAR(10) NOT NULL,
    periode VARCHAR(10) NOT NULL,
    nama_kelas VARCHAR(50) NOT NULL,
    hari_1 VARCHAR(10),
    jam_mulai_1 TIME,
    jam_selesai_1 TIME,
    hari_2 VARCHAR(10),
    jam_mulai_2 TIME,
    jam_selesai_2 TIME,
    hari_3 VARCHAR(10),
    jam_mulai_3 TIME,
    jam_selesai_3 TIME,
    hari_4 VARCHAR(10),
    jam_mulai_4 TIME,
    jam_selesai_4 TIME,
    daya_tampung INT,
    nip_dosen_1 VARCHAR(50) REFERENCES pegawai(nip),
    nama_dosen_1 VARCHAR(100),
    nip_dosen_2 VARCHAR(50) REFERENCES pegawai(nip),
    nama_dosen_2 VARCHAR(100),
    PRIMARY KEY (program_studi_pengampu, tahun_kurikulum, kode_mata_kuliah, periode, nama_kelas)
);

-- Tabel KRS
CREATE TABLE krs (
    periode VARCHAR(50) NOT NULL,
    program_studi_pengampu VARCHAR(100) NOT NULL REFERENCES unit(kode_unit),
    kurikulum VARCHAR(10) NOT NULL,
    kode_matakuliah VARCHAR(10) NOT NULL,
    nama_matakuliah VARCHAR(100),
    nama_kelas VARCHAR(10) NOT NULL,
    nim VARCHAR(10) NOT NULL REFERENCES mahasiswa(nim),
    nilai_akhir DECIMAL(10,2),
    nilai_mutu DECIMAL(10,2),
    nilai_huruf CHAR(1),
    PRIMARY KEY (periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas, nim),
    FOREIGN KEY (program_studi_pengampu, kurikulum, kode_matakuliah) 
        REFERENCES kurikulummk(program_studi, kurikulum_, kode_matakuliah)
);

-- Tabel KRS KM
CREATE TABLE krskm (
    periode VARCHAR(10) NOT NULL,
    program_studi_pengampu VARCHAR(100) NOT NULL REFERENCES unit(kode_unit),
    kurikulum VARCHAR(50) NOT NULL,
    kode_matakuliah VARCHAR(50) NOT NULL,
    nama_matakuliah VARCHAR(100),
    nama_kelas VARCHAR(50) NOT NULL,
    perguruan_tinggi_asal VARCHAR(100),
    program_studi_asal VARCHAR(100),
    nim VARCHAR(50) NOT NULL REFERENCES mahasiswakm(nim),
    nilai_akhir DECIMAL(10,2),
    nilai_mutu DECIMAL(10,2),
    nilai_huruf VARCHAR(10),
    PRIMARY KEY (periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas, nim)
);

-- Tabel Nilai Pindahan
CREATE TABLE nilaipindahan (
    program_studi VARCHAR(100) NOT NULL REFERENCES unit(kode_unit),
    nim VARCHAR(10) NOT NULL REFERENCES mahasiswa(nim),
    kode_matakuliah_asal VARCHAR(50) NOT NULL,
    nama_matakuliah_asal VARCHAR(100),
    sks_matakuliah_asal DECIMAL(10,2),
    nilai_huruf_matakuliah_asal VARCHAR(10),
    program_studi_pengampu_matakuliah_diakui VARCHAR(100) REFERENCES unit(kode_unit),
    kurikulum_matakuliah_diakui VARCHAR(10),
    kode_matakuliah_diakui VARCHAR(10),
    nama_matakuliah_diakui VARCHAR(100),
    sks_matakuliah_diakui INT,
    nilai_huruf_matakuliah_diakui CHAR(1),
    nilai_angka_matakuliah_diakui DECIMAL(10,2),
    PRIMARY KEY (program_studi, nim, kode_matakuliah_asal)
);

-- Tabel Perwalian
CREATE TABLE perwalian (
    periode VARCHAR(50) NOT NULL,
    nim VARCHAR(10) NOT NULL REFERENCES mahasiswa(nim),
    nama VARCHAR(100),
    prodi VARCHAR(100) REFERENCES unit(kode_unit),
    periode_masuk VARCHAR(50),
    dosen_pembimbing_akademik VARCHAR(100),
    sks_lulus INT,
    ips DECIMAL(10,2),
    ipk DECIMAL(10,2),
    ipk_lulus DECIMAL(10,2),
    PRIMARY KEY (periode, nim)
);

-- Tabel Proporsi Nilai
CREATE TABLE proporsinilai (
    periode VARCHAR(50) NOT NULL,
    program_studi VARCHAR(100) NOT NULL REFERENCES unit(kode_unit),
    kurikulum VARCHAR(10) NOT NULL,
    kode_matakuliah VARCHAR(10) NOT NULL,
    nama_matakuliah VARCHAR(100),
    nama_kelas VARCHAR(10) NOT NULL,
    nim VARCHAR(10) NOT NULL REFERENCES mahasiswa(nim),
    komposisi_nilai VARCHAR(50) NOT NULL,
    nilai DECIMAL(10,2),
    PRIMARY KEY (periode, program_studi, kurikulum, kode_matakuliah, nama_kelas, nim, komposisi_nilai),
    FOREIGN KEY (periode, program_studi, kurikulum, kode_matakuliah, nama_kelas, nim)
        REFERENCES krs(periode, program_studi_pengampu, kurikulum, kode_matakuliah, nama_kelas, nim)
);

-- Tabel Skala Nilai
CREATE TABLE skalanilai (
    kurikulum VARCHAR(10) NOT NULL,
    jenjang VARCHAR(50) NOT NULL,
    unit VARCHAR(100) NOT NULL REFERENCES unit(kode_unit),
    nilai_angka DECIMAL(10,2) NOT NULL,
    nilai_huruf CHAR(1) NOT NULL,
    batas_bawah DECIMAL(10,2) NOT NULL,
    batas_atas DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (kurikulum, jenjang, unit, nilai_huruf)
);

-- Tabel Skripsi
CREATE TABLE skripsi (
    nim VARCHAR(10) NOT NULL PRIMARY KEY REFERENCES mahasiswa(nim),
    nama VARCHAR(100),
    judul TEXT,
    status VARCHAR(10)
);

-- Tabel Tagihan
CREATE TABLE tagihan (
    kode_tagihan VARCHAR(50) NOT NULL PRIMARY KEY,
    nim VARCHAR(10) NOT NULL REFERENCES mahasiswa(nim),
    nama VARCHAR(100),
    jenis_cicilan VARCHAR(10),
    bulan VARCHAR(10),
    potongan DECIMAL(10,2),
    denda DECIMAL(10,2),
    nominal DECIMAL(10,2) NOT NULL,
    nominal_bayar DECIMAL(10,2),
    status_lunas VARCHAR(50)
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
    PRIMARY KEY (periode_masuk, gelombang, jalur_pendaftaran, sistem_kuliah, jenis_akun)
);

-- Tabel Lulusan
CREATE TABLE lulusan (
    periode_yudisium_ VARCHAR(50) NOT NULL,
    program_studi VARCHAR(100) NOT NULL REFERENCES unit(kode_unit),
    nim VARCHAR(10) NOT NULL PRIMARY KEY REFERENCES mahasiswa(nim),
    no__sk_yudisium VARCHAR(100),
    tgl_sk_yudisium DATE,
    no__ijazah VARCHAR(100),
    tgl_ijazah DATE,
    no__transkrip VARCHAR(50),
    tgl_transkrip DATE,
    judul_skripsi TEXT
);

-- Tabel Yudisium
CREATE TABLE yudisium (
    periode_yudisium VARCHAR(50) NOT NULL,
    nim VARCHAR(10) NOT NULL PRIMARY KEY REFERENCES mahasiswa(nim),
    nama VARCHAR(100),
    prodi VARCHAR(100) REFERENCES unit(kode_unit),
    periode_masuk VARCHAR(50),
    sks_lulus INT,
    ipk_lulus DECIMAL(10,2),
    tgl_sk_yudisium DATE,
    nomer_sk_yudisium VARCHAR(100),
    pin VARCHAR(100)
);

-- =====================================================
-- TABEL LARAVEL FRAMEWORK (EXISTING)
-- =====================================================

CREATE TABLE cache (
    `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY,
    value mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
    expiration int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE cache_locks (
    `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY,
    owner varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    expiration int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE failed_jobs (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    uuid varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    connection text COLLATE utf8mb4_unicode_ci NOT NULL,
    queue text COLLATE utf8mb4_unicode_ci NOT NULL,
    payload longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    exception longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    failed_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE jobs (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    queue varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    payload longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    attempts tinyint(3) UNSIGNED NOT NULL,
    reserved_at int(10) UNSIGNED DEFAULT NULL,
    available_at int(10) UNSIGNED NOT NULL,
    created_at int(10) UNSIGNED NOT NULL,
    INDEX jobs_queue_index (queue)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE job_batches (
    id varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY,
    name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    total_jobs int(11) NOT NULL,
    pending_jobs int(11) NOT NULL,
    failed_jobs int(11) NOT NULL,
    failed_job_ids longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    options mediumtext COLLATE utf8mb4_unicode_ci,
    cancelled_at int(11) DEFAULT NULL,
    created_at int(11) NOT NULL,
    finished_at int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE migrations (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    migration varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    batch int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE password_reset_tokens (
    email varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    token varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    created_at timestamp NULL DEFAULT NULL,
    INDEX password_reset_tokens_email_index (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE personal_access_tokens (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tokenable_type varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    tokenable_id bigint(20) UNSIGNED NOT NULL,
    name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    token varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    abilities text COLLATE utf8mb4_unicode_ci,
    last_used_at timestamp NULL DEFAULT NULL,
    expires_at timestamp NULL DEFAULT NULL,
    created_at timestamp NULL DEFAULT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    INDEX personal_access_tokens_tokenable_type_tokenable_id_index (tokenable_type,tokenable_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sessions (
    id varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL PRIMARY KEY,
    user_id bigint(20) UNSIGNED DEFAULT NULL,
    ip_address varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    user_agent text COLLATE utf8mb4_unicode_ci,
    payload longtext COLLATE utf8mb4_unicode_ci NOT NULL,
    last_activity int(11) NOT NULL,
    INDEX sessions_user_id_index (user_id),
    INDEX sessions_last_activity_index (last_activity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INDEXES UNTUK OPTIMASI PERFORMA
-- =====================================================

-- Indexes untuk tabel sistem akademik
CREATE INDEX idx_kelas_dosen1 ON kelas(nip_dosen_1);
CREATE INDEX idx_kelas_dosen2 ON kelas(nip_dosen_2);
CREATE INDEX idx_kelaskm_dosen1 ON kelaskm(nip_dosen_1);
CREATE INDEX idx_kelaskm_dosen2 ON kelaskm(nip_dosen_2);
CREATE INDEX idx_krs_matakuliah ON krs(program_studi_pengampu, kurikulum, kode_matakuliah);
CREATE INDEX idx_krskm_matakuliah ON krskm(program_studi_pengampu, kurikulum, kode_matakuliah);
CREATE INDEX idx_nilaipindahan_nim ON nilaipindahan(nim);
CREATE INDEX idx_perwalian_prodi ON perwalian(prodi);
CREATE INDEX idx_proporsinilai_nim ON proporsinilai(nim);
CREATE INDEX idx_tagihan_nim ON tagihan(nim);

-- Indexes untuk tabel sistem pendaftaran
CREATE INDEX idx_registrations_admission_path ON registrations(admission_path_id);
CREATE INDEX idx_registrations_school ON registrations(school_id);
CREATE INDEX idx_registrations_first_choice ON registrations(first_choice_program_id);
CREATE INDEX idx_registrations_second_choice ON registrations(second_choice_program_id);
CREATE INDEX idx_registration_documents_registration ON registration_documents(registration_id);
CREATE INDEX idx_registration_documents_requirement ON registration_documents(requirement_id);
CREATE INDEX idx_payments_registration ON payments(registration_id);
CREATE INDEX idx_schools_province ON schools(province_id);
CREATE INDEX idx_schools_city ON schools(city_id);

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
    sp1.name as first_choice_program,
    sp2.name as second_choice_program,
    s.name as school_name,
    s.type as school_type,
    p.name as province_name,
    c.name as city_name,
    r.created_at,
    r.updated_at
FROM registrations r
JOIN admission_paths ap ON r.admission_path_id = ap.id
JOIN study_programs sp1 ON r.first_choice_program_id = sp1.id
LEFT JOIN study_programs sp2 ON r.second_choice_program_id = sp2.id
JOIN schools s ON r.school_id = s.id
JOIN provinces p ON r.province_id = p.id
JOIN cities c ON r.city_id = c.id;

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
    sp.name as study_program_name
FROM mahasiswa m
LEFT JOIN registrations r ON m.registration_id = r.id
LEFT JOIN admission_paths ap ON r.admission_path_id = ap.id
LEFT JOIN study_programs sp ON r.first_choice_program_id = sp.id;

-- =====================================================
-- STORED PROCEDURES UNTUK PROSES BISNIS
-- =====================================================

DELIMITER //

-- Procedure untuk generate nomor pendaftaran
CREATE PROCEDURE GenerateRegistrationNumber(
    IN admission_path_code VARCHAR(50),
    IN academic_year VARCHAR(10),
    OUT registration_number VARCHAR(50)
)
BEGIN
    DECLARE counter INT DEFAULT 0;
    DECLARE formatted_counter VARCHAR(10);
    
    -- Hitung jumlah pendaftaran untuk jalur dan tahun akademik tertentu
    SELECT COUNT(*) + 1 INTO counter
    FROM registrations r
    JOIN admission_paths ap ON r.admission_path_id = ap.id
    WHERE ap.code = admission_path_code 
    AND ap.academic_year = academic_year;
    
    -- Format counter dengan leading zeros
    SET formatted_counter = LPAD(counter, 4, '0');
    
    -- Generate nomor pendaftaran: KODE_JALUR-TAHUN-COUNTER
    SET registration_number = CONCAT(admission_path_code, '-', academic_year, '-', formatted_counter);
END //

-- Procedure untuk konversi calon mahasiswa menjadi mahasiswa
CREATE PROCEDURE ConvertRegistrationToStudent(
    IN registration_id BIGINT,
    IN nim VARCHAR(10),
    IN kurikulum VARCHAR(10)
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE reg_data CURSOR FOR
        SELECT 
            r.full_name,
            r.gender,
            r.mobile_number,
            r.email,
            r.date_of_birth,
            r.place_of_birth,
            r.nik,
            ap.academic_year,
            sp.unit_kode,
            ap.study_system,
            ap.name as jalur_penerimaan,
            ap.wave as gelombang_daftar,
            p.name as province_name,
            c.name as city_name
        FROM registrations r
        JOIN admission_paths ap ON r.admission_path_id = ap.id
        JOIN study_programs sp ON r.first_choice_program_id = sp.id
        JOIN provinces p ON r.province_id = p.id
        JOIN cities c ON r.city_id = c.id
        WHERE r.id = registration_id;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    DECLARE v_nama VARCHAR(100);
    DECLARE v_jenis_kelamin CHAR(1);
    DECLARE v_hp VARCHAR(50);
    DECLARE v_email VARCHAR(255);
    DECLARE v_tgl_lahir DATE;
    DECLARE v_tempat_lahir VARCHAR(100);
    DECLARE v_nik VARCHAR(50);
    DECLARE v_periode_masuk VARCHAR(50);
    DECLARE v_program_studi VARCHAR(100);
    DECLARE v_sistem_kuliah VARCHAR(50);
    DECLARE v_jalur_penerimaan VARCHAR(50);
    DECLARE v_gelombang VARCHAR(50);
    DECLARE v_propinsi VARCHAR(100);
    DECLARE v_kota VARCHAR(100);
    
    OPEN reg_data;
    read_loop: LOOP
        FETCH reg_data INTO v_nama, v_jenis_kelamin, v_hp, v_email, v_tgl_lahir, 
                           v_tempat_lahir, v_nik, v_periode_masuk, v_program_studi,
                           v_sistem_kuliah, v_jalur_penerimaan, v_gelombang,
                           v_propinsi, v_kota;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Insert data mahasiswa baru
        INSERT INTO mahasiswa (
            nim, registration_id, periode_masuk, program_studi, nama,
            sistem_kuliah, jalur_penerimaan, gelombang_daftar, kurikulum,
            kewarganegaraan, status_mahasiswa, hp, tempat_lahir, tgl__lahir,
            jenis_kelamin, email, no__ktpnik, propinsi, kota, tgl__daftar
        ) VALUES (
            nim, registration_id, v_periode_masuk, v_program_studi, v_nama,
            v_sistem_kuliah, v_jalur_penerimaan, v_gelombang, kurikulum,
            'Indonesia', 'AKTIF', v_hp, v_tempat_lahir, v_tgl_lahir,
            v_jenis_kelamin, v_email, v_nik, v_propinsi, v_kota, CURDATE()
        );
        
        -- Update status pendaftaran
        UPDATE registrations 
        SET registration_status = 'ACCEPTED'
        WHERE id = registration_id;
        
    END LOOP;
    CLOSE reg_data;
END //

DELIMITER ;

-- =====================================================
-- TRIGGERS UNTUK AUDIT DAN VALIDASI
-- =====================================================

DELIMITER //

-- Trigger untuk log perubahan status pendaftaran
CREATE TRIGGER tr_registration_status_log
AFTER UPDATE ON registrations
FOR EACH ROW
BEGIN
    IF OLD.registration_status != NEW.registration_status THEN
        INSERT INTO registration_status_log (
            registration_id, 
            old_status, 
            new_status, 
            changed_at, 
            changed_by
        ) VALUES (
            NEW.id, 
            OLD.registration_status, 
            NEW.registration_status, 
            NOW(), 
            USER()
        );
    END IF;
END //

-- Trigger untuk validasi kuota program studi
CREATE TRIGGER tr_check_program_quota
BEFORE INSERT ON registrations
FOR EACH ROW
BEGIN
    DECLARE current_count INT DEFAULT 0;
    DECLARE max_quota INT DEFAULT 0;
    
    -- Hitung pendaftar yang sudah diterima untuk program studi pilihan pertama
    SELECT COUNT(*) INTO current_count
    FROM registrations r
    JOIN admission_path_programs app ON r.admission_path_id = app.admission_path_id
    WHERE r.first_choice_program_id = NEW.first_choice_program_id
    AND r.registration_status = 'ACCEPTED'
    AND app.study_program_id = NEW.first_choice_program_id;
    
    -- Ambil kuota maksimal
    SELECT app.quota INTO max_quota
    FROM admission_path_programs app
    WHERE app.admission_path_id = NEW.admission_path_id
    AND app.study_program_id = NEW.first_choice_program_id;
    
    -- Validasi kuota (warning, tidak error agar bisa dioverride manual)
    IF current_count >= max_quota THEN
        SIGNAL SQLSTATE '01000' 
        SET MESSAGE_TEXT = 'Warning: Kuota program studi sudah penuh';
    END IF;
END //

DELIMITER ;

-- =====================================================
-- TABEL LOG UNTUK AUDIT TRAIL
-- =====================================================

CREATE TABLE registration_status_log (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    registration_id bigint(20) UNSIGNED NOT NULL,
    old_status enum('DRAFT','SUBMITTED','VERIFIED','ACCEPTED','REJECTED') COLLATE utf8mb4_unicode_ci,
    new_status enum('DRAFT','SUBMITTED','VERIFIED','ACCEPTED','REJECTED') COLLATE utf8mb4_unicode_ci NOT NULL,
    changed_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    changed_by varchar(100) COLLATE utf8mb4_unicode_ci,
    notes text COLLATE utf8mb4_unicode_ci,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE document_verification_log (
    id bigint(20) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    document_id bigint(20) UNSIGNED NOT NULL,
    old_status enum('PENDING','APPROVED','REJECTED') COLLATE utf8mb4_unicode_ci,
    new_status enum('PENDING','APPROVED','REJECTED') COLLATE utf8mb4_unicode_ci NOT NULL,
    verifier_id bigint(20) UNSIGNED,
    verification_notes text COLLATE utf8mb4_unicode_ci,
    verified_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES registration_documents(id) ON DELETE CASCADE,
    FOREIGN KEY (verifier_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- COMMIT TRANSAKSI
-- =====================================================

COMMIT;

-- =====================================================
-- CATATAN IMPLEMENTASI
-- =====================================================

/*
CATATAN PENTING UNTUK IMPLEMENTASI:

1. INTEGRASI DATA:
   - Tabel 'study_programs' terhubung dengan 'unit' melalui field 'unit_kode'
   - Tabel 'mahasiswa' memiliki field 'registration_id' untuk link ke pendaftaran
   - Data calon mahasiswa dapat dikonversi ke mahasiswa menggunakan stored procedure

2. MIGRASI DATA:
   - Jalankan script ini pada database baru atau backup database existing terlebih dahulu
   - Pastikan data master (provinces, cities, units) sudah terisi sebelum input data pendaftaran
   - Gunakan procedure ConvertRegistrationToStudent() untuk konversi calon mahasiswa

3. KEAMANAN:
   - Implementasikan proper authentication dan authorization
   - Gunakan prepared statements untuk mencegah SQL injection
   - Encrypt sensitive data seperti NIK dan nomor telepon

4. PERFORMA:
   - Index sudah ditambahkan untuk query yang sering digunakan
   - Gunakan pagination untuk list data yang besar
   - Consider partitioning untuk tabel dengan data historis banyak

5. BACKUP & RECOVERY:
   - Setup regular backup schedule
   - Test restore procedure secara berkala
   - Implement point-in-time recovery jika diperlukan

6. MONITORING:
   - Monitor slow queries dan optimize jika diperlukan
   - Setup alerting untuk disk space dan performance metrics
   - Log semua aktivitas penting untuk audit trail
*/
