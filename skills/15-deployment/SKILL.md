# Skill 15: Deployment

## Tujuan
Tujuan dari skill ini adalah untuk memandu AI dalam melakukan publikasi (deployment) database produksi D1 dan kode program (Frontend & Backend) ke platform **Cloudflare** tanpa biaya tambahan (Free Tier), serta melakukan pengujian akhir pasca-deploy.

## Kapan Digunakan
Digunakan pada akhir siklus pengembangan (Milestone 6), setelah seluruh pengujian otomatis dan pengujian penerimaan lokal dinyatakan lulus.

## Input
*   [wrangler.jsonc](file:///C:/Users/User/campus-maintenance/wrangler.jsonc) — Konfigurasi wrangler untuk database D1 dan binding worker.
*   [0001_initial.sql](file:///C:/Users/User/campus-maintenance/database/migrations/0001_initial.sql) — Skrip migrasi database D1 produksi.
*   Repository kode program ter-push di GitHub.

## Langkah Kerja
1.  **Baca Input**: Verifikasi konfigurasi wrangler dan kecocokan skema migrasi database.
2.  **Siapkan Database Produksi**:
    *   Jalankan migrasi database di Cloudflare produksi dengan perintah:
        ```bash
        npx wrangler d1 execute campus-maintenance-db --remote --file=database/migrations/0001_initial.sql
        ```
3.  **Build Aplikasi**: Jalankan proses kompilasi lokal `npm run build` untuk memastikan tidak ada error kompilasi sebelum deploy.
4.  **Deploy ke Cloudflare**:
    *   Jalankan perintah deployment menggunakan wrangler:
        ```bash
        npm run deploy
        ```
5.  **Verifikasi Hasil Deployment**:
    *   Buka URL publik yang diberikan oleh Cloudflare (misal: `https://campus-maintenance.username.workers.dev`).
    *   Lakukan uji coba dasar: buka halaman utama, kirim satu laporan baru, periksa apakah data tersimpan di tabel D1 remote, dan akses endpoint `/api/health`.
6.  **Hubungkan CI/CD Otomatis (Opsional/Direkomendasikan)**: Hubungkan repositori GitHub dengan Cloudflare dashboard (Workers & Pages) agar setiap ada push ke branch `main`, aplikasi otomatis terupdate.
7.  **Sajikan Output**: Dokumentasikan URL publik yang aktif, bukti pengujian, serta catatan rilis (*Release Notes*).

## Output
File markdown di:
*   [release_note.md](file:///C:/Users/User/campus-maintenance/docs/deployment/release_note.md) — Dokumen catatan rilis dan panduan akses URL publik.

## Aturan
*   Gunakan command line argument `--remote` secara hati-hati karena ini mengubah database produksi. Pastikan migrasi lokal telah berhasil 100% sebelum memigrasikan database produksi.
*   Jangan pernah menyimpan kredensial atau token Cloudflare di repositori publik.
*   README.md proyek wajib diperbarui untuk menyertakan tautan URL publik yang aktif.

## Quality Check
*   Apakah aplikasi terbuka tanpa error saat diakses menggunakan URL publik Cloudflare?
*   Apakah form laporan dapat menyimpan data ke database D1 produksi yang terhubung?
*   Apakah endpoint `/api/health` mengembalikan status `ok`?

## Kondisi Gagal
AI harus berhenti jika:
*   Proses deploy gagal karena kesalahan konfigurasi `wrangler.jsonc` (seperti binding database_id salah).
*   Aplikasi yang di-deploy mengalami error 500 saat diakses karena database D1 belum dimigrasikan secara remote.

## Human Review
Bagian yang harus diperiksa manusia:
*   Konfirmasi bahwa URL publik Cloudflare dapat diakses oleh pihak luar (misalnya oleh dosen/penilai).
*   Verifikasi performa kecepatan muat halaman (*page load time*) pasca-deploy.
