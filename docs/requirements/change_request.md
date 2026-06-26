# Change Request: Campus Service Request and Maintenance System

Dokumen ini mendokumentasikan simulasi permintaan perubahan kebutuhan (**Change Request**) pertama untuk memenuhi ketentuan minimum proyek.

---

## 1. Lembar Permintaan Perubahan (Change Request Sheet)

*   **ID Permintaan Perubahan**: `CR-01`
*   **Nama Permintaan**: Penambahan Status `CANCELLED` (Dibatalkan) untuk Laporan
*   **Pemohon**: Perwakilan Mahasiswa & Staf Administrasi (Sarpras)
*   **Tanggal**: 2026-06-26
*   **Status**: **APPROVED (Disetujui)**

---

## 2. Deskripsi Perubahan
Pemohon meminta opsi untuk dapat membatalkan laporan yang sudah dikirimkan dengan alasan:
1.  **Pelapor** menyadari terjadi kesalahan input lokasi atau deskripsi sesaat setelah mengirim laporan, atau fasilitas ternyata sudah diperbaiki sebelum teknisi datang.
2.  **Administrator** menemukan adanya laporan duplikat (laporan yang sama dilaporkan oleh beberapa orang sekaligus) atau laporan palsu/tidak relevan.

Status baru yang diusulkan adalah **`CANCELLED`** (Dibatalkan).

---

## 3. Analisis Dampak (Impact Analysis)

### A. Dampak pada Persyaratan (Requirements Impact)
*   **Fungsional (FR)**: Menambahkan `[FR-15] Pembatalan Laporan` di mana Pelapor dapat membatalkan laporannya sendiri jika status masih `Submitted` atau `Under Review`, dan Admin dapat membatalkan laporan kapan saja sebelum status menjadi `Resolved`.
*   **Aturan Bisnis (BR)**: Memperbarui `[BR-02] Siklus Hidup Status Laporan` untuk menyertakan transisi status baru:
    *   `Submitted` ➔ `Cancelled` (oleh Pelapor & Admin)
    *   `Under Review` ➔ `Cancelled` (oleh Pelapor & Admin)
    *   `Assigned` ➔ `Cancelled` (oleh Admin)
    *   `In Progress` ➔ `Cancelled` (oleh Admin)

### B. Dampak pada Kode Program (Code Impact)
*   **Database**: Tidak ada perubahan struktur kolom tabel, hanya penambahan nilai enum baru (`CANCELLED`) pada integritas data status.
*   **Backend (`worker/index.ts`)**: Modifikasi logika validasi transisi status pada endpoint `PATCH /api/requests/:id` untuk menerima transisi status ke `CANCELLED` berdasarkan peran aktor pengubah.
*   **Frontend (`src/App.tsx`)**: 
    *   Menambahkan tombol **"Batalkan Laporan"** pada halaman detail laporan Pelapor (jika status masih `Submitted` atau `Under Review`).
    *   Menambahkan tombol **"Batalkan/Tolak Laporan"** pada panel Administrator.

### C. Dampak pada Pengujian (Testing Impact)
*   Menambahkan minimal 2 asersi test baru di Vitest untuk memverifikasi kesuksesan pembatalan laporan dan kegagalan jika Pelapor mencoba membatalkan laporan yang sudah berada dalam status `In Progress`.

---

## 4. Persetujuan & Implementasi
Perubahan ini disetujui karena memberikan fleksibilitas operasional yang signifikan dan mencegah penumpukan data laporan sampah di dashboard Teknisi. Perubahan akan diimplementasikan bersamaan dengan Milestone 3 (Backend) dan Milestone 4 (Frontend).
