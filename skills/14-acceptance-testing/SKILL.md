# Skill 14: Acceptance Testing

## Tujuan
Tujuan dari skill ini adalah untuk memandu AI dalam melakukan Pengujian Penerimaan (*Acceptance Testing*) guna memastikan bahwa seluruh alur kerja pengguna (*user workflows*) dari ujung ke ujung (*end-to-end*) telah memenuhi kriteria penerimaan (Acceptance Criteria) yang ditetapkan oleh pemangku kepentingan.

## Kapan Digunakan
Digunakan setelah semua fitur diimplementasikan dan test otomatis lulus (akhir Milestone 5 atau sebelum deployment), serta digunakan untuk memverifikasi aplikasi pasca-deployment di Cloudflare.

## Input
*   [user_stories.md](file:///C:/Users/User/campus-maintenance/docs/requirements/user_stories.md) — Daftar kriteria penerimaan untuk setiap User Story.
*   Aplikasi yang sedang berjalan (di lingkungan lokal `http://localhost:5173` atau URL staging/produksi Cloudflare).

## Langkah Kerja
1.  **Baca Input**: Tinjau kembali skenario kriteria penerimaan (AC) untuk setiap peran aktor.
2.  **Jalankan Aplikasi**: Akses aplikasi di browser.
3.  **Simulasikan Alur Kerja End-to-End**:
    *   *Aksi 1*: Masuk sebagai Pelapor ➔ Buat laporan baru (misal: "AC tidak dingin di lab komputer") ➔ Verifikasi laporan tampil di daftar laporan pelapor dengan status `SUBMITTED`.
    *   *Aksi 2*: Pindah peran ke Administrator ➔ Buka detail laporan tersebut ➔ Ubah tingkat prioritas menjadi `HIGH` dan tugaskan ke Teknisi (misal: "Budi") ➔ Verifikasi status berubah menjadi `ASSIGNED`.
    *   *Aksi 3*: Pindah peran ke Teknisi ➔ Lihat daftar tugas ➔ Terima tugas dan ubah status pengerjaan menjadi `IN PROGRESS` ➔ Selesaikan perbaikan dan ubah status menjadi `RESOLVED`.
    *   *Aksi 4*: Pindah peran kembali ke Pelapor ➔ Verifikasi laporan berstatus `RESOLVED` ➔ Tambahkan komentar konfirmasi "Perbaikan selesai, AC sudah dingin".
    *   *Aksi 5*: Pindah peran ke Administrator ➔ Tutup laporan tersebut ➔ Verifikasi status akhir laporan adalah `CLOSED`.
4.  **Verifikasi Fitur Pencarian & Filter**: Uji apakah pencarian teks dan penyaringan laporan (berdasarkan status/prioritas) berfungsi dengan benar.
5.  **Dokumentasikan Hasil Pengujian**: Catat hasil pengujian penerimaan (apakah lulus/gagal) beserta bukti tangkapan layar (*screenshots*) atau log pengujian.
6.  **Sajikan Output**: Hasilkan laporan pengujian penerimaan.

## Output
File markdown di:
*   [acceptance_test_report.md](file:///C:/Users/User/campus-maintenance/docs/testing/acceptance_test_report.md) — Laporan hasil verifikasi Acceptance Criteria.

## Aturan
*   Semua skenario pengujian penerimaan wajib dijalankan secara manual melalui antarmuka pengguna (UI) browser.
*   Jika ada kriteria penerimaan yang gagal terpenuhi, tandai status pengujian sebagai `FAILED` dan buat tiket perbaikan. Jangan deploy aplikasi jika masih ada test penerimaan yang gagal.

## Quality Check
*   Apakah seluruh skenario pengujian mencakup 4 aktor sistem utama?
*   Apakah transisi status laporan dalam simulasi alur kerja sesuai dengan diagram status?
*   Apakah bukti pengujian (seperti screenshot atau deskripsi langkah verifikasi) ditulis secara jelas dan runtut?

## Kondisi Gagal
AI harus berhenti jika:
*   Terdapat fungsionalitas wajib (must-have) yang tidak dapat diakses atau memicu error 500/404 pada browser saat diuji.
*   Riwayat status atau komentar tidak tersimpan dengan benar saat halaman direfresh.

## Human Review
Bagian yang harus diperiksa manusia:
*   Verifikasi langsung fungsionalitas antarmuka di browser oleh mahasiswa atau dosen penilai.
*   Pemeriksaan kegunaan (*usability*) dan keindahan tampilan visual.
