-- =================================================================================
-- SKEMA DATABASE GABUNGAN: SISTEM AKADEMIK & SISTEM PENDAFTARAN MAHASISWA BARU
-- Versi: 1.0
-- Dibuat pada: 2024-06-28
--
-- Deskripsi:
-- Skrip ini menggabungkan skema database dari sistem akademik yang sudah ada
-- dengan skema baru untuk sistem pendaftaran mahasiswa.
-- Perubahan utama meliputi penambahan foreign key untuk mengintegrasikan
-- data pendaftar, mahasiswa, program studi, dan pengguna.
-- =================================================================================

-- --------------------------------------------------------
-- BAGIAN 1: STRUKTUR DASAR DARI SISTEM AKADEMIK (YANG SUDAH ADA)
-- --------------------------------------------------------

CREATE TABLE `unit` (
    `kode_unit` VARCHAR(10) NOT NULL PRIMARY KEY,
    `parent_unit` VARCHAR(100),
    `nama_unit` VARCHAR(100) NOT NULL,
    `nama_singkat` VARCHAR(50),
    `jenjang_pendidikan` VARCHAR(50),
    `level` INT,
    `alamat` VARCHAR(255),
    `telepon` VARCHAR(50),
    `akreditasi` VARCHAR(10),
    `sk_akreditasi` VARCHAR(100),
    `kode_nim` VARCHAR(50),
    `gelar` VARCHAR(50),
    `ketua` VARCHAR(100)
);

CREATE TABLE `pegawai` (
    `nip` VARCHAR(50) NOT NULL PRIMARY KEY,
    `nama` VARCHAR(100) NOT NULL,
    `hombase` VARCHAR(100),
    `jenis_kelamin` CHAR(1) NOT NULL,
    `tempat_lahir` VARCHAR(50),
    `tanggal_lahir` DATE,
    `agama` VARCHAR(50),
    `nidn` CHAR(10) UNIQUE,
    `gelar_depan` VARCHAR(10),
    `gelar_belakang` VARCHAR(100),
    `golonganpangkat` VARCHAR(50),
    `jabatan_fungsional` VARCHAR(100),
    `jabatan_struktural` VARCHAR(100),
    `alamat_rumah` VARCHAR(255),
    `no__telepon` VARCHAR(50),
    `email_pribadi` VARCHAR(100),
    `email_kampus` VARCHAR(255) UNIQUE
);

CREATE TABLE `mahasiswa` (
    `nim` VARCHAR(10) NOT NULL PRIMARY KEY,
    `periode_masuk` VARCHAR(50) NOT NULL,
    `program_studi` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `sistem_kuliah` VARCHAR(50),
    `jalur_penerimaan` VARCHAR(50),
    `gelombang_daftar` VARCHAR(50),
    `transfer__tidak` VARCHAR(10),
    `universitas_asal` VARCHAR(100),
    `nim_asal` VARCHAR(50),
    `ipk_asal` DECIMAL(10,2),
    `kurikulum` VARCHAR(10),
    `agama` VARCHAR(50),
    `kewarganegaraan` VARCHAR(50),
    `status_mahasiswa` VARCHAR(50) NOT NULL,
    `alamat` TEXT,
    `telepon` VARCHAR(50),
    `hp` VARCHAR(50),
    `tempat_lahir` VARCHAR(100),
    `tgl__lahir` DATE,
    `kodepos` VARCHAR(10),
    `jenis_kelamin` CHAR(1) NOT NULL,
    `golongan_darah` VARCHAR(10),
    `status_nikah` VARCHAR(10),
    `email` VARCHAR(255) UNIQUE,
    `no__ktpnik` VARCHAR(50) UNIQUE,
    `no__kk` VARCHAR(50),
    `rt` VARCHAR(10),
    `rw` VARCHAR(10),
    `dusun` VARCHAR(50),
    `desakelurahan` VARCHAR(100),
    `kecamatan` VARCHAR(100),
    `kota_text` VARCHAR(100) COMMENT 'Kolom lama, disarankan migrasi ke city_id',
    `propinsi_text` VARCHAR(100) COMMENT 'Kolom lama, disarankan migrasi ke province_id',
    `tgl__daftar` DATE,
    `nama_ayah` VARCHAR(100),
    `alamat_ayah` VARCHAR(255),
    `telp__ayah` VARCHAR(50),
    `tgl__lahir_ayah` DATE,
    `pendidikan_ayah` VARCHAR(50),
    `pekerjaan_ayah` VARCHAR(50),
    `penghasilan_ayah` VARCHAR(10),
    `nama_ibu` VARCHAR(100),
    `alamat_ibu` VARCHAR(255),
    `telp__ibu` VARCHAR(50),
    `tgl__lahir_ibu` DATE,
    `pendidikan_ibu` VARCHAR(50),
    `pekerjaan_ibu` VARCHAR(50),
    `penghasilan_ibu` VARCHAR(10),
    `nama_wali` VARCHAR(100),
    `alamat_wali` VARCHAR(255),
    `telp__wali` VARCHAR(50),
    `tgl__wali` DATE,
    `pendidikan_wali` VARCHAR(50),
    `pekerjaan_wali` VARCHAR(100),
    `penghasilan_wali` VARCHAR(50)
);

CREATE TABLE `mahasiswakm` (
    `nim` VARCHAR(50) NOT NULL PRIMARY KEY,
    `periode_masuk` VARCHAR(10) NOT NULL,
    `perguruan_tinggi_asal` VARCHAR(100),
    `program_studi_asal` VARCHAR(100),
    `nama` VARCHAR(100) NOT NULL,
    `jenis_kelamin` CHAR(1) NOT NULL,
    `tempat_lahir` VARCHAR(100),
    `tanggal_lahir` DATE,
    `no__hp` VARCHAR(50),
    `email` VARCHAR(255) UNIQUE,
    `alamat` TEXT
);

CREATE TABLE `kurikulummk` (
    `program_studi` VARCHAR(100) NOT NULL,
    `kurikulum_` VARCHAR(10) NOT NULL,
    `kode_matakuliah` VARCHAR(10) NOT NULL,
    `nama_matakuliah` VARCHAR(100) NOT NULL,
    `semester_matakuliah` INT,
    `sks_matakuliah` INT NOT NULL,
    `sks_tatap_muka` INT,
    `sks_praktikum` INT,
    `sks_simulasi` INT,
    `sks_praktikum_lapangan` INT,
    `nilai_lulus_minimal` DECIMAL(10,2),
    `kelompok_matakuliah` VARCHAR(50),
    `jenis_matakuliah` VARCHAR(50),
    PRIMARY KEY (`program_studi`, `kurikulum_`, `kode_matakuliah`)
);

CREATE TABLE `kelas` (
    `program_studi` VARCHAR(100) NOT NULL,
    `tahun_kurikulum` INT NOT NULL,
    `kode_mata_kuliah` VARCHAR(10) NOT NULL,
    `periode` VARCHAR(50) NOT NULL,
    `nama_kelas` VARCHAR(10) NOT NULL,
    `hari_1` INT,
    `jam_mulai_1` TIME,
    `jam_selesai_1` TIME,
    `hari_2` VARCHAR(10),
    `jam_mulai_2` TIME,
    `jam_selesai_2` TIME,
    `hari_3` VARCHAR(10),
    `jam_mulai_3` TIME,
    `jam_selesai_3` TIME,
    `hari_4` VARCHAR(10),
    `jam_mulai_4` TIME,
    `jam_selesai_4` TIME,
    `daya_tampung` INT,
    `nip_dosen_1` VARCHAR(10),
    `nama_dosen_1` VARCHAR(100),
    `nip_dosen_2` CHAR(10),
    `nama_dosen_2` VARCHAR(100),
    PRIMARY KEY (`program_studi`, `tahun_kurikulum`, `kode_mata_kuliah`, `periode`, `nama_kelas`)
);

CREATE TABLE `krs` (
    `periode` VARCHAR(50) NOT NULL,
    `program_studi_pengampu` VARCHAR(100) NOT NULL,
    `kurikulum` VARCHAR(10) NOT NULL,
    `kode_matakuliah` VARCHAR(10) NOT NULL,
    `nama_matakuliah` VARCHAR(100),
    `nama_kelas` VARCHAR(10) NOT NULL,
    `nim` VARCHAR(10) NOT NULL,
    `nilai_akhir` DECIMAL(10,2),
    `nilai_mutu` DECIMAL(10,2),
    `nilai_huruf` CHAR(1),
    PRIMARY KEY (`periode`, `program_studi_pengampu`, `kurikulum`, `kode_matakuliah`, `nama_kelas`, `nim`)
);

-- (Tabel-tabel lain dari sistem akademik seperti kelaskm, krskm, nilaipindahan, dll., tetap sama)
-- ... (sisa tabel akademik)


-- --------------------------------------------------------
-- BAGIAN 2: STRUKTUR BARU DARI SISTEM PENDAFTARAN
-- --------------------------------------------------------

CREATE TABLE `provinces` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL
);

CREATE TABLE `cities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `province_id` INT(11) NOT NULL,
  `name` VARCHAR(100) NOT NULL
);

CREATE TABLE `schools` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `npsn` VARCHAR(20) DEFAULT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `type` ENUM('SMA','SMK','MA','LAINNYA') NOT NULL,
  `province_id` INT(11) NOT NULL,
  `city_id` INT(11) NOT NULL,
  `is_verified` TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE `study_programs` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `level` ENUM('D3','S1','PROFESI') NOT NULL,
  `accreditation` VARCHAR(50) DEFAULT NULL,
  `website` VARCHAR(255) DEFAULT NULL,
  `quota` INT(11) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE `admission_paths` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `registration_fee` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  `study_system` VARCHAR(50) DEFAULT NULL,
  `academic_year` VARCHAR(10) NOT NULL,
  `semester` ENUM('GANJIL','GENAP') NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE `admission_path_programs` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `admission_path_id` BIGINT(20) UNSIGNED NOT NULL,
  `study_program_id` BIGINT(20) UNSIGNED NOT NULL,
  `quota` INT(11) NOT NULL DEFAULT 0
);

CREATE TABLE `admission_requirements` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `admission_path_id` BIGINT(20) UNSIGNED NOT NULL,
  `requirement_name` VARCHAR(255) NOT NULL,
  `is_mandatory` TINYINT(1) NOT NULL DEFAULT 1,
  `file_type` VARCHAR(50) DEFAULT NULL
);

CREATE TABLE `registrations` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `registration_number` VARCHAR(50) NOT NULL UNIQUE,
  `admission_path_id` BIGINT(20) UNSIGNED NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `gender` ENUM('MALE','FEMALE') NOT NULL,
  `mobile_number` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `place_of_birth` VARCHAR(100) NOT NULL,
  `nik` VARCHAR(20) NOT NULL UNIQUE,
  `province_id` INT(11) NOT NULL,
  `city_id` INT(11) NOT NULL,
  `school_id` BIGINT(20) UNSIGNED NOT NULL,
  `school_specialization` VARCHAR(100) NOT NULL,
  `graduation_year` YEAR(4) NOT NULL,
  `first_choice_program_id` BIGINT(20) UNSIGNED NOT NULL,
  `second_choice_program_id` BIGINT(20) UNSIGNED DEFAULT NULL,
  `registration_status` ENUM('DRAFT','SUBMITTED','VERIFIED','ACCEPTED','REJECTED') NOT NULL DEFAULT 'DRAFT',
  `payment_status` ENUM('PENDING','PAID','FAILED') NOT NULL DEFAULT 'PENDING'
);

CREATE TABLE `payments` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `registration_id` BIGINT(20) UNSIGNED NOT NULL,
  `payment_code` VARCHAR(50) NOT NULL UNIQUE,
  `amount` DECIMAL(10,2) NOT NULL,
  `payment_status` ENUM('PENDING','SUCCESS','FAILED','EXPIRED') NOT NULL DEFAULT 'PENDING',
  `payment_proof` VARCHAR(500) DEFAULT NULL
);

CREATE TABLE `registration_documents` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `registration_id` BIGINT(20) UNSIGNED NOT NULL,
  `requirement_id` BIGINT(20) UNSIGNED NOT NULL,
  `file_path` VARCHAR(500) NOT NULL
);

CREATE TABLE `users` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('SUPER_ADMIN','ADMIN','OPERATOR','VERIFIER','STUDENT') NOT NULL,
  `registration_id` BIGINT(20) UNSIGNED DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1
);


-- ----------------------------------------------------------------
-- BAGIAN 3: MODIFIKASI TABEL & INTEGRASI
-- ----------------------------------------------------------------

-- Menambahkan kolom foreign key pada tabel `mahasiswa` untuk melacak asal pendaftaran
ALTER TABLE `mahasiswa`
  ADD COLUMN `registration_id` BIGINT(20) UNSIGNED NULL UNIQUE AFTER `nim`,
  COMMENT='Tautan ke ID pendaftaran asli di tabel registrations';

-- Menambahkan kolom foreign key pada tabel `mahasiswa` untuk data wilayah yang terstruktur
ALTER TABLE `mahasiswa`
  ADD COLUMN `province_id` INT(11) NULL AFTER `propinsi_text`,
  ADD COLUMN `city_id` INT(11) NULL AFTER `province_id`;

-- Menambahkan kolom foreign key pada tabel `users` untuk menautkan ke data pegawai
ALTER TABLE `users`
  ADD COLUMN `pegawai_nip` VARCHAR(50) NULL UNIQUE AFTER `registration_id`,
  COMMENT='Tautan ke NIP pegawai jika user adalah admin/operator';

-- Menambahkan kolom foreign key pada tabel `study_programs` untuk menautkan ke tabel master `unit`
ALTER TABLE `study_programs`
  ADD COLUMN `kode_unit` VARCHAR(10) NULL UNIQUE AFTER `code`,
  COMMENT='Tautan ke kode_unit di sistem akademik sebagai master data';


-- ----------------------------------------------------------------
-- BAGIAN 4: DEFINISI FOREIGN KEY & CONSTRAINTS GABUNGAN
-- ----------------------------------------------------------------

-- Constraints untuk Sistem Akademik
ALTER TABLE `pegawai` ADD CONSTRAINT `fk_pegawai_hombase` FOREIGN KEY (`hombase`) REFERENCES `unit`(`kode_unit`);
ALTER TABLE `mahasiswa` ADD CONSTRAINT `fk_mahasiswa_programstudi` FOREIGN KEY (`program_studi`) REFERENCES `unit`(`kode_unit`);
ALTER TABLE `kurikulummk` ADD CONSTRAINT `fk_kurikulummk_programstudi` FOREIGN KEY (`program_studi`) REFERENCES `unit`(`kode_unit`);
ALTER TABLE `kelas` ADD CONSTRAINT `fk_kelas_kurikulum` FOREIGN KEY (`program_studi`, `tahun_kurikulum`, `kode_mata_kuliah`) REFERENCES `kurikulummk`(`program_studi`, `kurikulum_`, `kode_matakuliah`);
ALTER TABLE `kelas` ADD CONSTRAINT `fk_kelas_dosen1` FOREIGN KEY (`nip_dosen_1`) REFERENCES `pegawai`(`nip`);
ALTER TABLE `kelas` ADD CONSTRAINT `fk_kelas_dosen2` FOREIGN KEY (`nip_dosen_2`) REFERENCES `pegawai`(`nip`);
ALTER TABLE `krs` ADD CONSTRAINT `fk_krs_mahasiswa` FOREIGN KEY (`nim`) REFERENCES `mahasiswa`(`nim`);
ALTER TABLE `krs` ADD CONSTRAINT `fk_krs_kelas` FOREIGN KEY (`program_studi_pengampu`, `kurikulum`, `kode_matakuliah`) REFERENCES `kurikulummk`(`program_studi`, `kurikulum_`, `kode_matakuliah`);

-- Constraints untuk Sistem Pendaftaran (Baru)
ALTER TABLE `cities` ADD CONSTRAINT `fk_cities_province` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE CASCADE;
ALTER TABLE `schools` ADD CONSTRAINT `fk_schools_province` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`);
ALTER TABLE `schools` ADD CONSTRAINT `fk_schools_city` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`);
ALTER TABLE `admission_path_programs` ADD CONSTRAINT `fk_admpthprg_path` FOREIGN KEY (`admission_path_id`) REFERENCES `admission_paths`(`id`) ON DELETE CASCADE;
ALTER TABLE `admission_path_programs` ADD CONSTRAINT `fk_admpthprg_program` FOREIGN KEY (`study_program_id`) REFERENCES `study_programs`(`id`) ON DELETE CASCADE;
ALTER TABLE `admission_requirements` ADD CONSTRAINT `fk_admreq_path` FOREIGN KEY (`admission_path_id`) REFERENCES `admission_paths`(`id`) ON DELETE CASCADE;
ALTER TABLE `registrations` ADD CONSTRAINT `fk_reg_path` FOREIGN KEY (`admission_path_id`) REFERENCES `admission_paths`(`id`);
ALTER TABLE `registrations` ADD CONSTRAINT `fk_reg_province` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`);
ALTER TABLE `registrations` ADD CONSTRAINT `fk_reg_city` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`);
ALTER TABLE `registrations` ADD CONSTRAINT `fk_reg_school` FOREIGN KEY (`school_id`) REFERENCES `schools`(`id`);
ALTER TABLE `registrations` ADD CONSTRAINT `fk_reg_program1` FOREIGN KEY (`first_choice_program_id`) REFERENCES `study_programs`(`id`);
ALTER TABLE `registrations` ADD CONSTRAINT `fk_reg_program2` FOREIGN KEY (`second_choice_program_id`) REFERENCES `study_programs`(`id`);
ALTER TABLE `payments` ADD CONSTRAINT `fk_pay_registration` FOREIGN KEY (`registration_id`) REFERENCES `registrations`(`id`) ON DELETE CASCADE;
ALTER TABLE `registration_documents` ADD CONSTRAINT `fk_regdoc_registration` FOREIGN KEY (`registration_id`) REFERENCES `registrations`(`id`) ON DELETE CASCADE;
ALTER TABLE `registration_documents` ADD CONSTRAINT `fk_regdoc_requirement` FOREIGN KEY (`requirement_id`) REFERENCES `admission_requirements`(`id`) ON DELETE CASCADE;

-- Constraints untuk Integrasi Antar Sistem
ALTER TABLE `mahasiswa` ADD CONSTRAINT `fk_mahasiswa_registration` FOREIGN KEY (`registration_id`) REFERENCES `registrations`(`id`) ON DELETE SET NULL;
ALTER TABLE `mahasiswa` ADD CONSTRAINT `fk_mahasiswa_province` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`);
ALTER TABLE `mahasiswa` ADD CONSTRAINT `fk_mahasiswa_city` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`);
ALTER TABLE `users` ADD CONSTRAINT `fk_users_registration` FOREIGN KEY (`registration_id`) REFERENCES `registrations`(`id`) ON DELETE SET NULL;
ALTER TABLE `users` ADD CONSTRAINT `fk_users_pegawai` FOREIGN KEY (`pegawai_nip`) REFERENCES `pegawai`(`nip`) ON DELETE SET NULL;
ALTER TABLE `study_programs` ADD CONSTRAINT `fk_studyprograms_unit` FOREIGN KEY (`kode_unit`) REFERENCES `unit`(`kode_unit`) ON DELETE SET NULL;


-- ----------------------------------------------------------------
-- BAGIAN 5: REKOMENDASI INDEX
-- ----------------------------------------------------------------

-- Index dari sistem akademik
CREATE INDEX `idx_kelas_dosen1` ON `kelas`(`nip_dosen_1`);
CREATE INDEX `idx_kelas_dosen2` ON `kelas`(`nip_dosen_2`);
CREATE INDEX `idx_krs_matakuliah` ON `krs`(`program_studi_pengampu`, `kurikulum`, `kode_matakuliah`);

-- Index dari sistem pendaftaran
CREATE INDEX `idx_reg_status` ON `registrations`(`registration_status`);
CREATE INDEX `idx_reg_payment` ON `registrations`(`payment_status`);
CREATE INDEX `idx_reg_email` ON `registrations`(`email`);

-- Index untuk kolom integrasi
CREATE INDEX `idx_mahasiswa_regid` ON `mahasiswa`(`registration_id`);
CREATE INDEX `idx_users_pegawai` ON `users`(`pegawai_nip`);
