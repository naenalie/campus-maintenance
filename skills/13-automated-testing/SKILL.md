# Skill 13: Automated Testing

## Tujuan
Tujuan dari skill ini adalah untuk memandu AI dalam menulis kode pengujian otomatis (*automated tests*) berupa unit test dan integration test menggunakan **Vitest** untuk memverifikasi kebenaran fungsi internal, validasi bisnis, dan fungsionalitas REST API backend yang terhubung dengan database D1.

## Kapan Digunakan
Digunakan selama tahap implementasi fitur dan penulisan pengujian (Milestone 5), setiap kali menulis atau mengubah kode program untuk memastikan tidak ada regresi (kerusakan fungsi yang sudah ada).

## Input
*   [test_plan.md](file:///C:/Users/User/campus-maintenance/docs/testing/test_plan.md) — Daftar kasus uji yang harus dibuatkan kode tesnya.
*   File kode program yang akan diuji (seperti `src/App.tsx`, `worker/index.ts`, utilitas validasi).

## Langkah Kerja
1.  **Baca Input**: Pahami skenario uji, input data uji, dan ekspektasi hasil dari dokumen rencana pengujian.
2.  **Siapkan Lingkungan Test**: Pastikan dependensi pengujian (seperti `vitest`) sudah terinstal dalam proyek.
3.  **Tulis Unit Test**:
    *   Fokus pada fungsi-fungsi murni (*pure functions*), helper, dan validasi input secara terisolasi tanpa efek samping.
    *   Gunakan asersi standar seperti `expect(result).toBe(true)` atau `expect(result).toEqual(expected)`.
4.  **Tulis Integration Test**:
    *   Fokus pada pengujian alur interaksi API dengan database.
    *   Simulasikan HTTP Request (seperti `POST /api/requests` dengan payload) dan verifikasi status response (seperti `201 Created` atau `422 Unprocessable Entity`) serta konten database (apakah data berhasil disimpan ke tabel D1).
5.  **Jalankan Pengujian Otomatis**: Jalankan perintah `npm run test` di terminal lokal untuk mengecek status eksekusi tes.
6.  **Perbaiki Kode yang Gagal**: Jika ada tes yang gagal, analisis penyebab kegagalannya, perbaiki kodenya, dan jalankan tes kembali hingga semua berstatus lulus (*PASS*).
7.  **Sajikan Output**: Simpan file kode tes di bawah direktori `tests/unit/` dan `tests/integration/`.

## Output
File kode tes di:
*   [request-validation.test.ts](file:///C:/Users/User/campus-maintenance/tests/unit/request-validation.test.ts) — Berisi unit test untuk validasi.
*   [api.test.ts](file:///C:/Users/User/campus-maintenance/tests/integration/api.test.ts) — Berisi integration test untuk API backend.

## Aturan
*   Buat minimal 20 asersi atau kasus uji otomatis secara keseluruhan.
*   Semua tes harus dapat dijalankan secara lokal tanpa membutuhkan koneksi internet atau layanan database eksternal (gunakan database D1 lokal `--local` atau mock database).
*   Gunakan struktur pengujian yang rapi dengan pengelompokan `describe()` dan kasus uji individu `it()` atau `test()`.

## Quality Check
*   Apakah semua kode tes otomatis lulus saat dijalankan dengan perintah `npm run test`?
*   Apakah kasus uji negatif (seperti input data tidak valid) juga diuji dan menghasilkan respon error yang sesuai?
*   Apakah file-file pengujian disimpan di lokasi direktori yang benar sesuai struktur repositori?

## Kondisi Gagal
AI harus berhenti jika:
*   Kode pengujian mengalami error sintaksis atau error kompilasi TypeScript yang menghalangi eksekusi tes.
*   Tes otomatis bergantung pada data eksternal yang dinamis sehingga rentan gagal jika dijalankan di lingkungan CI yang berbeda (*flaky tests*).

## Human Review
Bagian yang harus diperiksa manusia:
*   Cakupan skenario kasus batas (*edge case coverage*) yang diuji oleh kode tes otomatis.
*   Logika asersi (apakah asersi yang dibuat benar-benar menguji kebenaran program atau hanya sekadar pelengkap).
