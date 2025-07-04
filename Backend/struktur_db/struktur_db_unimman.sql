CREATE TABLE yudisium (
    periode_yudisium VARCHAR(50),
    nim VARCHAR(10),
    nama VARCHAR(100),
    prodi VARCHAR(100),
    periode_masuk VARCHAR(50),
    sks_lulus INT,
    ipk_lulus DECIMAL(10,2),
    tgl_sk_yudisium DATE,
    nomer_sk_yudisium VARCHAR(100),
    pin VARCHAR(100)
);

CREATE TABLE unit (
    kode_unit VARCHAR(10),
    parent_unit VARCHAR(100),
    nama_unit VARCHAR(100),
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

CREATE TABLE tarif (
    periode_masuk VARCHAR(50),
    gelombang VARCHAR(50),
    jalur_pendaftaran VARCHAR(50),
    sistem_kuliah VARCHAR(50),
    jenis_akun VARCHAR(50),
    nominal DECIMAL(10,2),
    cicilan INT,
    denda DECIMAL(10,2)
);

CREATE TABLE tagihan (
    kode_tagihan VARCHAR(50),
    nim VARCHAR(10),
    nama VARCHAR(100),
    jenis_cicilan VARCHAR(10),
    bulan VARCHAR(10),
    potongan DECIMAL(10,2),
    denda DECIMAL(10,2),
    nominal DECIMAL(10,2),
    nominal_bayar DECIMAL(10,2),
    status_lunas VARCHAR(50)
);

CREATE TABLE skripsi (
    nim VARCHAR(10),
    nama VARCHAR(100),
    judul TEXT,
    status VARCHAR(10)
);

CREATE TABLE skalanilai (
    kurikulum VARCHAR(10),
    jenjang VARCHAR(50),
    unit VARCHAR(100),
    nilai_angka DECIMAL(10,2),
    nilai_huruf CHAR(1),
    batas_bawah DECIMAL(10,2),
    batas_atas DECIMAL(10,2)
);

CREATE TABLE proporsinilai (
    periode VARCHAR(50),
    program_studi VARCHAR(100),
    kurikulum VARCHAR(10),
    kode_matakuliah VARCHAR(10),
    nama_matakuliah VARCHAR(100),
    nama_kelas VARCHAR(10),
    nim VARCHAR(10),
    komposisi_nilai VARCHAR(50),
    nilai DECIMAL(10,2)
);

CREATE TABLE perwalian (
    periode VARCHAR(50),
    nim VARCHAR(10),
    nama VARCHAR(100),
    prodi VARCHAR(100),
    periode_masuk VARCHAR(50),
    dosen_pembimbing_akademik VARCHAR(100),
    sks_lulus INT,
    ips DECIMAL(10,2),
    ipk DECIMAL(10,2),
    ipk_lulus DECIMAL(10,2)
);

CREATE TABLE pegawai (
    nip VARCHAR(50),
    nama VARCHAR(100),
    hombase VARCHAR(100),
    jenis_kelamin CHAR(1),
    tempat_lahir VARCHAR(50),
    tanggal_lahir DATE,
    agama VARCHAR(50),
    nidn CHAR(10),
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

CREATE TABLE nilaipindahan (
    program_studi VARCHAR(100),
    nim VARCHAR(10),
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
    nilai_angka_matakuliah_diakui DECIMAL(10,2)
);

CREATE TABLE mahasiswakm (
    periode_masuk VARCHAR(10),
    perguruan_tinggi_asal VARCHAR(100),
    program_studi_asal VARCHAR(100),
    nim VARCHAR(50),
    nama VARCHAR(100),
    jenis_kelamin CHAR(1),
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    no__hp VARCHAR(50),
    email VARCHAR(255),
    alamat TEXT
);

CREATE TABLE mahasiswa (
    periode_masuk VARCHAR(50),
    program_studi VARCHAR(100),
    nim VARCHAR(10),
    nama VARCHAR(100),
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
    penghasilan_wali VARCHAR(50)
);

CREATE TABLE lulusan (
    periode_yudisium_ VARCHAR(50),
    program_studi VARCHAR(100),
    nim VARCHAR(10),
    no__sk_yudisium VARCHAR(100),
    tgl_sk_yudisium DATE,
    no__ijazah VARCHAR(100),
    tgl_ijazah DATE,
    no__transkrip VARCHAR(50),
    tgl_transkrip DATE,
    judul_skripsi TEXT
);

CREATE TABLE kurikulummk (
    kurikulum_ VARCHAR(10),
    program_studi VARCHAR(100),
    kode_matakuliah VARCHAR(10),
    nama_matakuliah VARCHAR(100),
    semester_matakuliah INT,
    sks_matakuliah INT,
    sks_tatap_muka INT,
    sks_praktikum INT,
    sks_simulasi INT,
    sks_praktikum_lapangan INT,
    nilai_lulus_minimal DECIMAL(10,2),
    kelompok_matakuliah VARCHAR(50),
    jenis_matakuliah VARCHAR(50)
);

CREATE TABLE krskm (
    periode VARCHAR(10),
    program_studi_pengampu VARCHAR(100),
    kurikulum VARCHAR(50),
    kode_matakuliah VARCHAR(50),
    nama_matakuliah VARCHAR(100),
    nama_kelas VARCHAR(50),
    perguruan_tinggi_asal VARCHAR(100),
    program_studi_asal VARCHAR(100),
    nim VARCHAR(50),
    nilai_akhir DECIMAL(10,2),
    nilai_mutu DECIMAL(10,2),
    nilai_huruf VARCHAR(10)
);

CREATE TABLE krs (
    periode VARCHAR(50),
    program_studi_pengampu VARCHAR(100),
    kurikulum VARCHAR(10),
    kode_matakuliah VARCHAR(10),
    nama_matakuliah VARCHAR(100),
    nama_kelas VARCHAR(10),
    nim VARCHAR(10),
    nilai_akhir DECIMAL(10,2),
    nilai_mutu DECIMAL(10,2),
    nilai_huruf CHAR(1)
);

CREATE TABLE kelaskm (
    program_studi_pengampu VARCHAR(100),
    tahun_kurikulum VARCHAR(10),
    kode_mata_kuliah VARCHAR(10),
    periode VARCHAR(10),
    nama_kelas VARCHAR(50),
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
    nama_dosen_2 VARCHAR(100)
);

CREATE TABLE kelas (
    program_studi VARCHAR(100),
    tahun_kurikulum INT,
    kode_mata_kuliah VARCHAR(10),
    periode VARCHAR(50),
    nama_kelas VARCHAR(10),
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
    nama_dosen_2 VARCHAR(100)
);