# Skill 07: Database dan API Design

## Tujuan
Tujuan dari skill ini adalah untuk memandu AI dalam merancang skema database relasional (tabel, kolom, tipe data, primary key, foreign key, indeks, dan relasi) serta merancang spesifikasi antarmuka API (*endpoints*, metode HTTP, format request body, dan format response body) yang dibutuhkan oleh aplikasi.

## Kapan Digunakan
Digunakan setelah dokumen arsitektur disetujui (Milestone 2), sebelum memulai proses pengodean backend API dan sebelum membuat migrasi SQL database.

## Input
*   [requirements.md](file:///C:/Users/User/campus-maintenance/docs/requirements/requirements.md) — Dokumen kebutuhan fungsional.
*   [architecture.md](file:///C:/Users/User/campus-maintenance/docs/design/architecture.md) — Desain komponen sistem.

## Langkah Kerja
1.  **Baca Input**: Pahami kebutuhan fungsional dan model data dari dokumen arsitektur.
2.  **Rancang Skema Database**:
    *   Tentukan entitas utama (seperti `service_requests`, `comments`, `status_history`).
    *   Tentukan tipe data yang kompatibel dengan Cloudflare D1 (SQLite) seperti `TEXT`, `INTEGER`, `REAL`, `BLOB`.
    *   Tentukan primary key, foreign key, constraints (`NOT NULL`, `UNIQUE`), dan default values.
3.  **Rancang Endpoint API**:
    *   Tentukan path URI yang RESTful (misalnya `/api/requests`).
    *   Tentukan HTTP Method (`GET`, `POST`, `PATCH`, `DELETE`).
    *   Definisikan payload input JSON untuk request (termasuk validasi wajib).
    *   Definisikan format response JSON sukses (status 200/201) dan response error (status 400/404/422).
4.  **Lakukan Quality Check**: Validasi skema database dan rancangan API terhadap 12+ kebutuhan fungsional (FR) untuk memastikan semua data tersimpan dan dapat diakses.
5.  **Sajikan Output**: Hasilkan file skema database dan spesifikasi endpoint API.

## Output
File markdown di:
*   [database.md](file:///C:/Users/User/campus-maintenance/docs/design/database.md) — Desain skema tabel.
*   [api.md](file:///C:/Users/User/campus-maintenance/docs/design/api.md) — Dokumentasi spesifikasi API.

## Aturan
*   Gunakan tipe data yang didukung oleh SQLite / Cloudflare D1. Ingat bahwa SQLite tidak memiliki tipe data `BOOLEAN` atau `DATETIME` bawaan (gunakan `INTEGER` 0/1 atau `TEXT` ISO8601).
*   Gunakan HTTP status code yang tepat untuk respon API (misal: 201 Created untuk sukses membuat laporan, 422 Unprocessable Entity untuk validasi gagal).
*   Semua perubahan data wajib mencatat siapa pelakunya dan kapan terjadinya.

## Quality Check
*   Apakah semua entitas data yang diperlukan oleh 12+ FR sudah diakomodasi oleh tabel database?
*   Apakah format respon API konsisten (menggunakan objek JSON terstruktur)?
*   Apakah relasi foreign key didefinisikan dengan benar untuk menghindari inkonsistensi referensial?

## Kondisi Gagal
AI harus berhenti jika:
*   Ada kebutuhan fungsional yang datanya tidak dapat disimpan dalam rancangan database.
*   Skema database tidak memiliki cara untuk membedakan hak akses antar aktor (misal tidak ada cara mengidentifikasi apakah user adalah pelapor atau teknisi).

## Human Review
Bagian yang harus diperiksa manusia:
*   Normalisasi tabel database (minimal 3NF).
*   Keamanan endpoint API (apakah endpoint tertentu harus dibatasi untuk peran tertentu).
