/*
 Navicat Premium Data Transfer

 Source Server         : NeoF
 Source Server Type    : PostgreSQL
 Source Server Version : 100018 (100018)
 Source Host           : localhost:54333
 Source Catalog        : pddikti
 Source Schema         : ref

 Target Server Type    : PostgreSQL
 Target Server Version : 100018 (100018)
 File Encoding         : 65001

 Date: 03/07/2025 10:24:09
*/


-- ----------------------------
-- Table structure for jenjang_pendidikan
-- ----------------------------
DROP TABLE IF EXISTS "ref"."jenjang_pendidikan";
CREATE TABLE "ref"."jenjang_pendidikan" (
  "id_jenj_didik" numeric(2,0) NOT NULL,
  "nm_jenj_didik" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "u_jenj_lemb" numeric(1,0) NOT NULL,
  "u_jenj_org" numeric(1,0) NOT NULL,
  "create_date" timestamp(6) NOT NULL DEFAULT now(),
  "last_update" timestamp(6) NOT NULL DEFAULT now(),
  "expired_date" timestamp(6),
  "last_sync" timestamp(6) NOT NULL DEFAULT '1901-01-01 00:00:00'::timestamp without time zone,
  "csf" int8 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of jenjang_pendidikan
-- ----------------------------
INSERT INTO "ref"."jenjang_pendidikan" VALUES (9, 'Paket C', 1, 0, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.526', -1971068912);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (30, 'S1', 1, 1, '2013-05-14 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.529', -1887112485);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (0, 'Tidak sekolah', 0, 1, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.529', -1803171119);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (5, 'SMP / sederajat', 1, 1, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.529', -1796821225);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (3, 'Putus SD', 0, 1, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.53', -1636291921);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (35, 'S2', 1, 1, '2013-05-14 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.53', -1536869114);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (32, 'Sp-1', 1, 1, '2014-06-04 13:11:32', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.531', -1308873187);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (1, 'PAUD', 1, 0, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.531', -1222639115);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (20, 'D1', 1, 1, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.532', -1195091004);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (4, 'SD / sederajat', 1, 1, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.532', -737598752);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (91, 'Informal', 1, 0, '2013-05-14 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.533', -612283397);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (98, '(tidak diisi)', 0, 0, '2013-05-25 00:00:00', '2018-02-24 11:51:39.917', '2013-05-25 00:00:00', '2024-04-23 23:45:47.533', -212086831);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (25, 'Profesi', 1, 1, '2014-06-04 13:13:13', '2018-02-24 11:51:39.917', '2017-03-22 18:11:01.057', '2024-04-23 23:45:47.533', -180413758);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (31, 'Profesi', 1, 1, '2017-03-07 09:50:58.04', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.534', 0);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (36, 'S2 Terapan', 1, 1, '2017-05-04 09:20:18.4', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.534', 0);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (41, 'S3 Terapan', 1, 1, '2017-05-04 09:20:26.733', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.535', 0);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (6, 'SMA / sederajat', 1, 1, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.535', 167616572);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (40, 'S3', 1, 1, '2013-05-14 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.535', 282850179);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (2, 'TK / sederajat', 1, 0, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.536', 405001876);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (90, 'Non formal', 1, 0, '2013-05-14 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.536', 515190134);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (7, 'Paket A', 1, 0, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.537', 991406243);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (23, 'D4', 1, 1, '2013-05-14 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.537', 1005401532);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (22, 'D3', 1, 1, '2013-05-14 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.537', 1360347052);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (21, 'D2', 1, 1, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.538', 1548096567);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (99, 'Lainnya', 1, 0, '2013-05-14 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.538', 1570610327);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (8, 'Paket B', 1, 0, '2013-05-13 00:00:00', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.539', 1622816958);
INSERT INTO "ref"."jenjang_pendidikan" VALUES (37, 'Sp-2', 1, 1, '2014-06-04 13:12:23', '2018-02-24 11:51:39.917', NULL, '2024-04-23 23:45:47.539', 1936085664);

-- ----------------------------
-- Primary Key structure for table jenjang_pendidikan
-- ----------------------------
ALTER TABLE "ref"."jenjang_pendidikan" ADD CONSTRAINT "pk_jenjang_pendidikan" PRIMARY KEY ("id_jenj_didik");
