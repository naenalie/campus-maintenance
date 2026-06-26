# Requirements Prioritisation: Campus Service Request and Maintenance System

Dokumen ini mendokumentasikan prioritisasi kebutuhan sistem menggunakan metode **MoSCoW (Must Have, Should Have, Could Have, Won't Have)** untuk memastikan pengembangan berjalan secara bertahap dan terfokus pada fitur paling krusial terlebih dahulu.

---

## 1. Must Have (Wajib Ada)
Fitur-fitur yang wajib diimplementasikan agar sistem dasar dapat berfungsi dan memenuhi alur bisnis utama. Tanpa fitur ini, aplikasi dianggap gagal memenuhi tujuan.

*   **[FR-01] Pembuatan Laporan**: Form input bagi Pelapor untuk melaporkan masalah.
*   **[FR-02] Validasi Deskripsi**: Batasan minimal 20 karakter untuk deskripsi.
*   **[FR-03] Penomoran Otomatis**: Pembuat nomor unik `CSR-YYYYMMDD-XXXX`.
*   **[FR-04] & [FR-08] Daftar Laporan Aktor**: Tampilan daftar laporan untuk Pelapor dan Teknisi secara personal.
*   **[FR-05] Panel Kontrol Admin**: Halaman utama Admin untuk mengelola seluruh laporan.
*   **[FR-06] & [FR-07] Triage & Penugasan**: Admin menentukan kategori, prioritas, dan memilih teknisi.
*   **[FR-09] Pembaruan Status**: Teknisi mengubah status laporan ke `In Progress` dan `Resolved`.
*   **[FR-10] Kolom Komentar**: Media komunikasi antar aktor pada detail laporan.
*   **[FR-11] Pencatatan Riwayat**: Log otomatis untuk setiap perubahan status di database.
*   **[FR-12] Konfirmasi & Penutupan**: Pelapor melakukan konfirmasi selesai (atau menolak hasil), dan Admin menutup laporan (`Closed`).

---

## 2. Should Have (Seharusnya Ada)
Fitur-fitur penting yang memberikan nilai tambah yang tinggi dan seharusnya ada di rilis pertama, namun sistem masih bisa berjalan secara manual tanpanya jika waktu mendesak.

*   **[FR-13] Pencarian & Filter**: Kemampuan mencari kata kunci judul/lokasi dan memfilter daftar berdasarkan status, prioritas, atau kategori untuk mempermudah navigasi data ketika laporan bertambah banyak.
*   **[FR-14] Dashboard Manajer**: Statistik ringkasan performa dan grafik kategori kerusakan bagi Manajer Fasilitas.

---

## 3. Could Have (Bisa Ada)
Fitur tambahan yang bersifat pelengkap untuk meningkatkan kenyamanan visual pengguna (*aesthetic & UX improvements*).

*   **Aesthetic Styling & Micro-animations**: Tema visual premium yang menggunakan efek hover, gradien halus, glassmorphism, dan transisi mulus pada perubahan status.
*   **Simulasi Profil Pengguna**: Menampilkan foto profil dummy atau nama inisial aktor yang sedang aktif login simulasi.

---

## 4. Won't Have (Tidak Ada di Rilis Ini)
Fitur yang secara eksplisit berada di luar ruang lingkup proyek saat ini (*out of scope*) dan tidak akan dikembangkan pada rilis ini demi menjaga batasan waktu tugas.

*   Unggah gambar/foto bukti kerusakan (*Object Storage*).
*   Notifikasi email otomatis (*Email integration*).
*   Integrasi Google OAuth (menggunakan login simulasi sebagai gantinya).
*   Pemindaian QR code ruangan.
*   Pencatatan inventaris suku cadang (*Inventory Spare Part*).
*   Manajemen vendor pihak ketiga (*Vendor Management*).
