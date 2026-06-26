# Requirements Specification: Campus Service Request and Maintenance System

Dokumen ini mendefinisikan persyaratan fungsional, non-fungsional, dan aturan bisnis untuk aplikasi **Campus Service Request and Maintenance System**.

---

## 1. Functional Requirements (Persyaratan Fungsional)
Sistem wajib memenuhi minimal 12 persyaratan fungsional (FR) berikut:

*   **[FR-01] Pembuatan Laporan**: Pelapor harus dapat membuat laporan kerusakan baru dengan mengisi judul, deskripsi rinci, lokasi/ruangan, dan memilih kategori masalah melalui form input.
*   **[FR-02] Validasi Deskripsi**: Sistem wajib memvalidasi input deskripsi laporan minimal 20 karakter sebelum laporan dapat disimpan ke database.
*   **[FR-03] Penomoran Otomatis**: Sistem harus otomatis menghasilkan nomor unik laporan dengan format `CSR-YYYYMMDD-XXXX` (di mana `YYYYMMDD` adalah tanggal pembuatan dan `XXXX` adalah 4 digit angka acak) saat laporan sukses dibuat.
*   **[FR-04] Daftar Laporan Pelapor**: Pelapor harus dapat melihat daftar laporan kerusakan yang dikirimkan oleh dirinya sendiri beserta status terkininya.
*   **[FR-05] Panel Kontrol Administrator**: Administrator harus dapat melihat daftar seluruh laporan kerusakan yang masuk ke dalam sistem dari semua pelapor.
*   **[FR-06] Penentuan Kategori & Prioritas**: Administrator harus dapat mengubah kategori dan menetapkan tingkat prioritas laporan (`LOW`, `MEDIUM`, `HIGH`).
*   **[FR-07] Penugasan Teknisi**: Administrator harus dapat memilih dan menugaskan seorang Teknisi untuk menangani laporan kerusakan tertentu.
*   **[FR-08] Daftar Tugas Teknisi**: Teknisi harus dapat melihat daftar laporan kerusakan khusus yang ditugaskan kepada dirinya sendiri.
*   **[FR-09] Pembaruan Progres oleh Teknisi**: Teknisi harus dapat mengubah status laporan yang ditugaskan kepadanya menjadi `IN PROGRESS` (sedang dikerjakan) atau `RESOLVED` (selesai diperbaiki).
*   **[FR-10] Kolom Komentar**: Pelapor, Admin, dan Teknisi yang ditugaskan harus dapat saling menambahkan komentar atau catatan pada detail laporan terkait.
*   **[FR-11] Pencatatan Riwayat Status**: Sistem harus mencatat secara otomatis log riwayat status setiap kali ada perubahan status laporan (menyimpan status lama, status baru, pengubah, timestamp, dan catatan opsional).
*   **[FR-12] Konfirmasi & Penutupan Laporan**: Pelapor dapat mengonfirmasi apakah perbaikan selesai (status menjadi `CLOSED`) atau melaporkan perbaikan belum tuntas (status kembali ke `ASSIGNED`). Admin juga memiliki hak akses untuk menutup laporan secara langsung.
*   **[FR-13] Pencarian & Filter**: Pengguna harus dapat mencari laporan berdasarkan kata kunci judul/lokasi serta memfilter daftar berdasarkan status, tingkat prioritas, atau kategori.
*   **[FR-14] Dashboard Manajer**: Manajer Fasilitas harus dapat melihat dashboard statistik sederhana yang menampilkan total laporan aktif, laporan selesai, waktu penyelesaian rata-rata, dan grafik persentase kerusakan per kategori.

---

## 2. Non-functional Requirements (Persyaratan Non-fungsional)
Sistem wajib memenuhi minimal 6 persyaratan non-fungsional (NFR) berikut:

*   **[NFR-01] Usability (Kemudahan Penggunaan)**: Antarmuka pengguna harus responsif dan dapat diakses dengan baik melalui perangkat desktop maupun mobile (smartphone).
*   **[NFR-02] Performance (Kecepatan Respon)**: Waktu respon API backend Cloudflare Worker untuk operasi `GET` dan `POST` harus kurang dari 500 milidetik dalam kondisi jaringan normal.
*   **[NFR-03] Reliability (Keandalan)**: Aplikasi harus memanfaatkan infrastruktur serverless Cloudflare Workers yang menjamin ketersediaan tinggi (*high availability*) dengan target uptime 99.9%.
*   **[NFR-04] Security (Keamanan Data)**: Kueri ke database D1 wajib menggunakan binding parameter untuk mencegah celah keamanan SQL Injection.
*   **[NFR-05] Data Integrity (Integritas Data)**: Transisi status laporan harus dijaga konsistensinya di tingkat database melalui relasi foreign key dan constraint tabel yang tepat.
*   **[NFR-06] Simplicity & Accessibility (Kemudahan Demo)**: Sistem menggunakan mekanisme login simulasi (header X-User-Role) untuk memudahkan demonstrasi fitur multi-aktor tanpa memerlukan koneksi Google OAuth eksternal.

---

## 3. Business Rules (Aturan Bisnis)
Sistem diatur oleh minimal 5 aturan bisnis (BR) berikut:

*   **[BR-01] Kategori Kerusakan**: Kategori laporan kerusakan yang valid dibatasi hanya pada: `Internet & Jaringan`, `Pendingin Ruangan (AC)`, `Peralatan Kelas`, `Alat Laboratorium`, `Kebersihan & Sanitasi`, dan `Lainnya`.
*   **[BR-02] Siklus Hidup Status Laporan**: Status laporan hanya boleh mengalir sesuai dengan alur: `Submitted` ➔ `Under Review` ➔ `Assigned` ➔ `In Progress` ➔ `Resolved` ➔ `Closed`.
*   **[BR-03] Hak Perubahan Status**:
    *   Hanya **Admin** yang dapat mengubah status dari `Submitted` ke `Under Review` atau `Assigned`, serta menutup laporan menjadi `Closed`.
    *   Hanya **Teknisi** yang ditugaskan yang dapat mengubah status laporan menjadi `In Progress` atau `Resolved`.
*   **[BR-04] Alur Balik Penolakan Perbaikan**: Jika Pelapor menolak konfirmasi penyelesaian laporan (menyatakan perbaikan belum tuntas), status laporan akan otomatis kembali menjadi **`Assigned`** agar Teknisi melakukan perbaikan ulang.
*   **[BR-05] Prioritas Utama (High Priority)**: Laporan dengan status prioritas `HIGH` wajib diurutkan di bagian paling atas pada daftar tugas Admin dan Teknisi untuk penanganan segera.
