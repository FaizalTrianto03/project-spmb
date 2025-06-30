-- FINAL DATABASE STRUCTURE WITH RELATIONSHIPS
-- Generated and validated on: 2025-06-27 15:02:10
-- =====================================================
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

CREATE TABLE mahasiswa (
    nim VARCHAR(10) NOT NULL PRIMARY KEY,
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
    penghasilan_wali VARCHAR(50)
);

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

CREATE TABLE skripsi (
    nim VARCHAR(10) NOT NULL PRIMARY KEY REFERENCES mahasiswa(nim),
    nama VARCHAR(100),
    judul TEXT,
    status VARCHAR(10)
);

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

-- Recommended Indexes
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