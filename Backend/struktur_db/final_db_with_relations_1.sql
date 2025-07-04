-- ========================================
-- STRUKTUR DATABASE DENGAN RELASI
-- Sistem Akademik Universitas
-- ========================================

-- Tabel Unit (Master data untuk program studi/fakultas)
CREATE TABLE unit (
    kode_unit VARCHAR(10) PRIMARY KEY,
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

-- Tabel Pegawai (Master data dosen dan staff)
CREATE TABLE pegawai (
    nip VARCHAR(50) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    hombase VARCHAR(100),
    jenis_kelamin CHAR(1),
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
    email_kampus VARCHAR(255)
);

-- Tabel Mahasiswa (Master data mahasiswa)
CREATE TABLE mahasiswa (
    nim VARCHAR(10) PRIMARY KEY,
    periode_masuk VARCHAR(50) NOT NULL,
    program_studi VARCHAR(100) NOT NULL,
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
    status_mahasiswa VARCHAR(50),
    alamat TEXT,
    telepon VARCHAR(50),
    hp VARCHAR(50),
    tempat_lahir VARCHAR(100),
    tgl__lahir DATE,
    kodepos VARCHAR(10),
    jenis_kelamin CHAR(1),
    golongan_darah VARCHAR(10),
    status_nikah VARCHAR(10),
    email VARCHAR(255),
    no__ktpnik VARCHAR(50),
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
    
    -- Foreign Key
    FOREIGN KEY (program_studi) REFERENCES unit(nama_unit)
);

-- Tabel Mahasiswa KM (Khusus untuk mahasiswa Kampus Merdeka)
CREATE TABLE mahasiswakm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    periode_masuk VARCHAR(10),
    perguruan_tinggi_asal VARCHAR(100),
    program_studi_asal VARCHAR(100),
    nim VARCHAR(50) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    jenis_kelamin CHAR(1),
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    no__hp VARCHAR(50),
    email VARCHAR(255),
    alamat TEXT,
    
    -- Foreign Key
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim)
);

-- Tabel Kurikulum Mata Kuliah
CREATE TABLE kurikulummk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kurikulum_ VARCHAR(10) NOT NULL,
    program_studi VARCHAR(100) NOT NULL,
    kode_matakuliah VARCHAR(10) NOT NULL,
    nama_matakuliah VARCHAR(100) NOT NULL,
    semester_matakuliah INT,
    sks_matakuliah INT,
    sks_tatap_muka INT,
    sks_praktikum INT,
    sks_simulasi INT,
    sks_praktikum_lapangan INT,
    nilai_lulus_minimal DECIMAL(10,2),
    kelompok_matakuliah VARCHAR(50),
    jenis_matakuliah VARCHAR(50),
    
    -- Foreign Key
    FOREIGN KEY (program_studi) REFERENCES unit(nama_unit),
    
    -- Unique constraint untuk kombinasi kurikulum + prodi + kode mk
    UNIQUE KEY unique_kurikulum_mk (kurikulum_, program_studi, kode_matakuliah)
);

-- Tabel Kelas
CREATE TABLE kelas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_studi VARCHAR(100) NOT NULL,
    tahun_kurikulum INT,
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
    nip_dosen_1 VARCHAR(10),
    nama_dosen_1 VARCHAR(100),
    nip_dosen_2 CHAR(10),
    nama_dosen_2 VARCHAR(100),
    
    -- Foreign Keys
    FOREIGN KEY (program_studi) REFERENCES unit(nama_unit),
    FOREIGN KEY (nip_dosen_1) REFERENCES pegawai(nip),
    FOREIGN KEY (nip_dosen_2) REFERENCES pegawai(nip),
    
    -- Unique constraint
    UNIQUE KEY unique_kelas (program_studi, kode_mata_kuliah, periode, nama_kelas)
);

-- Tabel Kelas KM (Kampus Merdeka)
CREATE TABLE kelaskm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_studi_pengampu VARCHAR(100) NOT NULL,
    tahun_kurikulum VARCHAR(10),
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
    nip_dosen_1 VARCHAR(50),
    nama_dosen_1 VARCHAR(100),
    nip_dosen_2 VARCHAR(50),
    nama_dosen_2 VARCHAR(100),
    
    -- Foreign Keys
    FOREIGN KEY (program_studi_pengampu) REFERENCES unit(nama_unit),
    FOREIGN KEY (nip_dosen_1) REFERENCES pegawai(nip),
    FOREIGN KEY (nip_dosen_2) REFERENCES pegawai(nip)
);

-- Tabel KRS (Kartu Rencana Studi)
CREATE TABLE krs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    periode VARCHAR(50) NOT NULL,
    program_studi_pengampu VARCHAR(100) NOT NULL,
    kurikulum VARCHAR(10),
    kode_matakuliah VARCHAR(10) NOT NULL,
    nama_matakuliah VARCHAR(100),
    nama_kelas VARCHAR(10),
    nim VARCHAR(10) NOT NULL,
    nilai_akhir DECIMAL(10,2),
    nilai_mutu DECIMAL(10,2),
    nilai_huruf CHAR(1),
    
    -- Foreign Keys
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (program_studi_pengampu) REFERENCES unit(nama_unit),
    
    -- Unique constraint untuk mencegah duplikasi KRS
    UNIQUE KEY unique_krs (periode, nim, kode_matakuliah, nama_kelas)
);

-- Tabel KRS KM (Kampus Merdeka)
CREATE TABLE krskm (
    id INT AUTO_INCREMENT PRIMARY KEY,
    periode VARCHAR(10) NOT NULL,
    program_studi_pengampu VARCHAR(100) NOT NULL,
    kurikulum VARCHAR(50),
    kode_matakuliah VARCHAR(50) NOT NULL,
    nama_matakuliah VARCHAR(100),
    nama_kelas VARCHAR(50),
    perguruan_tinggi_asal VARCHAR(100),
    program_studi_asal VARCHAR(100),
    nim VARCHAR(50) NOT NULL,
    nilai_akhir DECIMAL(10,2),
    nilai_mutu DECIMAL(10,2),
    nilai_huruf VARCHAR(10),
    
    -- Foreign Keys
    FOREIGN KEY (nim) REFERENCES mahasiswakm(nim),
    FOREIGN KEY (program_studi_pengampu) REFERENCES unit(nama_unit)
);

-- Tabel Proporsi Nilai
CREATE TABLE proporsinilai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    periode VARCHAR(50) NOT NULL,
    program_studi VARCHAR(100) NOT NULL,
    kurikulum VARCHAR(10),
    kode_matakuliah VARCHAR(10) NOT NULL,
    nama_matakuliah VARCHAR(100),
    nama_kelas VARCHAR(10),
    nim VARCHAR(10) NOT NULL,
    komposisi_nilai VARCHAR(50),
    nilai DECIMAL(10,2),
    
    -- Foreign Keys
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (program_studi) REFERENCES unit(nama_unit)
);

-- Tabel Skala Nilai
CREATE TABLE skalanilai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kurikulum VARCHAR(10) NOT NULL,
    jenjang VARCHAR(50),
    unit VARCHAR(100),
    nilai_angka DECIMAL(10,2) NOT NULL,
    nilai_huruf CHAR(1) NOT NULL,
    batas_bawah DECIMAL(10,2),
    batas_atas DECIMAL(10,2),
    
    -- Foreign Key
    FOREIGN KEY (unit) REFERENCES unit(nama_unit),
    
    -- Unique constraint
    UNIQUE KEY unique_skala (kurikulum, unit, nilai_huruf)
);

-- Tabel Nilai Pindahan
CREATE TABLE nilaipindahan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    program_studi VARCHAR(100) NOT NULL,
    nim VARCHAR(10) NOT NULL,
    kode_matakuliah_asal VARCHAR(50),
    nama_matakuliah_asal VARCHAR(100),
    sks_matakuliah_asal DECIMAL(10,2),
    nilai_huruf_matakuliah_asal VARCHAR(10),
    program_studi_pengampu_matakuliah_diakui VARCHAR(100),
    kurikulum_matakuliah_diakui VARCHAR(10),
    kode_matakuliah_diakui VARCHAR(10),
    nama_matakuliah_diakui VARCHAR(100),
    sks_matakuliah_diakui INT,
    nilai_huruf_matakuliah_diakui CHAR(1),
    nilai_angka_matakuliah_diakui DECIMAL(10,2),
    
    -- Foreign Keys
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (program_studi) REFERENCES unit(nama_unit),
    FOREIGN KEY (program_studi_pengampu_matakuliah_diakui) REFERENCES unit(nama_unit)
);

-- Tabel Perwalian
CREATE TABLE perwalian (
    id INT AUTO_INCREMENT PRIMARY KEY,
    periode VARCHAR(50) NOT NULL,
    nim VARCHAR(10) NOT NULL,
    nama VARCHAR(100),
    prodi VARCHAR(100),
    periode_masuk VARCHAR(50),
    dosen_pembimbing_akademik VARCHAR(100),
    sks_lulus INT,
    ips DECIMAL(10,2),
    ipk DECIMAL(10,2),
    ipk_lulus DECIMAL(10,2),
    
    -- Foreign Keys
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (prodi) REFERENCES unit(nama_unit),
    
    -- Unique constraint
    UNIQUE KEY unique_perwalian (periode, nim)
);

-- Tabel Skripsi
CREATE TABLE skripsi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(10) NOT NULL,
    nama VARCHAR(100),
    judul TEXT,
    status VARCHAR(10),
    
    -- Foreign Key
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    
    -- Unique constraint (satu mahasiswa satu skripsi)
    UNIQUE KEY unique_skripsi (nim)
);

-- Tabel Yudisium
CREATE TABLE yudisium (
    id INT AUTO_INCREMENT PRIMARY KEY,
    periode_yudisium VARCHAR(50) NOT NULL,
    nim VARCHAR(10) NOT NULL,
    nama VARCHAR(100),
    prodi VARCHAR(100),
    periode_masuk VARCHAR(50),
    sks_lulus INT,
    ipk_lulus DECIMAL(10,2),
    tgl_sk_yudisium DATE,
    nomer_sk_yudisium VARCHAR(100),
    pin VARCHAR(100),
    
    -- Foreign Keys
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (prodi) REFERENCES unit(nama_unit),
    
    -- Unique constraint
    UNIQUE KEY unique_yudisium (periode_yudisium, nim)
);

-- Tabel Lulusan
CREATE TABLE lulusan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    periode_yudisium_ VARCHAR(50),
    program_studi VARCHAR(100),
    nim VARCHAR(10) NOT NULL,
    no__sk_yudisium VARCHAR(100),
    tgl_sk_yudisium DATE,
    no__ijazah VARCHAR(100),
    tgl_ijazah DATE,
    no__transkrip VARCHAR(50),
    tgl_transkrip DATE,
    judul_skripsi TEXT,
    
    -- Foreign Keys
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (program_studi) REFERENCES unit(nama_unit),
    
    -- Unique constraint
    UNIQUE KEY unique_lulusan (nim)
);

-- Tabel Tarif
CREATE TABLE tarif (
    id INT AUTO_INCREMENT PRIMARY KEY,
    periode_masuk VARCHAR(50) NOT NULL,
    gelombang VARCHAR(50),
    jalur_pendaftaran VARCHAR(50),
    sistem_kuliah VARCHAR(50),
    jenis_akun VARCHAR(50),
    nominal DECIMAL(10,2),
    cicilan INT,
    denda DECIMAL(10,2),
    
    -- Unique constraint
    UNIQUE KEY unique_tarif (periode_masuk, gelombang, jalur_pendaftaran, sistem_kuliah, jenis_akun)
);

-- Tabel Tagihan
CREATE TABLE tagihan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kode_tagihan VARCHAR(50) UNIQUE NOT NULL,
    nim VARCHAR(10) NOT NULL,
    nama VARCHAR(100),
    jenis_cicilan VARCHAR(10),
    bulan VARCHAR(10),
    potongan DECIMAL(10,2),
    denda DECIMAL(10,2),
    nominal DECIMAL(10,2),
    nominal_bayar DECIMAL(10,2),
    status_lunas VARCHAR(50),
    
    -- Foreign Key
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim)
);

-- ========================================
-- INDEXES UNTUK PERFORMA
-- ========================================

-- Index pada kolom yang sering digunakan untuk pencarian
CREATE INDEX idx_mahasiswa_prodi ON mahasiswa(program_studi);
CREATE INDEX idx_mahasiswa_periode ON mahasiswa(periode_masuk);
CREATE INDEX idx_mahasiswa_status ON mahasiswa(status_mahasiswa);

CREATE INDEX idx_krs_periode ON krs(periode);
CREATE INDEX idx_krs_nim ON krs(nim);
CREATE INDEX idx_krs_matakuliah ON krs(kode_matakuliah);

CREATE INDEX idx_pegawai_nidn ON pegawai(nidn);
CREATE INDEX idx_pegawai_hombase ON pegawai(hombase);

CREATE INDEX idx_tagihan_nim ON tagihan(nim);
CREATE INDEX idx_tagihan_status ON tagihan(status_lunas);

-- ========================================
-- COMMENTS UNTUK DOKUMENTASI
-- ========================================

-- Menambahkan komentar pada tabel utama
ALTER TABLE mahasiswa COMMENT = 'Tabel master data mahasiswa';
ALTER TABLE pegawai COMMENT = 'Tabel master data pegawai (dosen dan staff)';
ALTER TABLE unit COMMENT = 'Tabel master data unit (fakultas/program studi)';
ALTER TABLE krs COMMENT = 'Tabel Kartu Rencana Studi mahasiswa';
ALTER TABLE kurikulummk COMMENT = 'Tabel mata kuliah dalam kurikulum';
ALTER TABLE tagihan COMMENT = 'Tabel tagihan pembayaran mahasiswa';