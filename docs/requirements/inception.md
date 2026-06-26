# Project Inception: Campus Service Request and Maintenance System

## 1. Ringkasan Masalah Bisnis
Di lingkungan kampus, kenyamanan dan kelancaran fasilitas akademik serta operasional (seperti AC, proyektor kelas, koneksi internet, alat laboratorium, dan kebersihan ruangan) sangat krusial bagi produktivitas dosen dan mahasiswa. Saat ini, pelaporan masalah fasilitas sering kali dilakukan secara manual, tidak tercatat, atau melalui saluran komunikasi informal yang tidak terorganisir. Akibatnya, pelacakan status penanganan masalah menjadi sulit, teknisi lambat merespon karena kurangnya prioritas yang jelas, dan manajemen tidak memiliki visibilitas atas kinerja perbaikan maupun kondisi riil fasilitas di lapangan.

## 2. Pemisahan Masalah dan Solusi
*   **Masalah Bisnis**: 
    *   Tidak adanya pencatatan formal laporan kerusakan fasilitas, mengakibatkan penanganan terlambat atau terlupa.
    *   Teknisi kesulitan menentukan prioritas kerja karena tidak ada alur penugasan terpusat.
    *   Pelapor tidak mengetahui status progres laporan mereka.
    *   Manajer fasilitas kesulitan mengevaluasi kualitas dan kecepatan perbaikan fasilitas kampus secara keseluruhan.
*   **Solusi yang Diusulkan**:
    *   Membangun aplikasi berbasis web yang menghubungkan Pelapor (dosen/mahasiswa), Administrator, Teknisi, dan Manajer Fasilitas dalam satu platform terintegrasi.
    *   Sistem secara otomatis mengelola siklus status laporan (dari *Submitted* hingga *Closed*), menyediakan kolom komentar untuk koordinasi, serta mencatat log perubahan status secara transparan.
    *   Menampilkan dashboard analitik sederhana bagi Manajer Fasilitas untuk melihat performa perbaikan.

## 3. Tujuan Bisnis (Business Goals)
1.  **Pemusatan Data**: Mengganti sistem pelaporan informal menjadi satu database terpusat yang mencatat 100% laporan kerusakan fasilitas kampus.
2.  **Transparansi Pelacakan**: Menjamin pelapor dapat mengetahui status penanganan laporan mereka secara real-time.
3.  **Efisiensi Penugasan**: Mempermudah administrator dalam menetapkan prioritas dan menugaskan teknisi dalam waktu kurang dari 24 jam sejak laporan masuk.
4.  **Optimasi Manajemen**: Menyediakan dashboard statistik bagi Manajer Fasilitas untuk memantau waktu rata-rata penyelesaian perbaikan.

## 4. Analisis Stakeholder dan Kebutuhannya
### Stakeholder Primer
*   **Pelapor (Mahasiswa & Dosen)**:
    *   Kebutuhan: Form pengisian laporan yang mudah diakses dari perangkat mobile/desktop, melihat status penanganan laporan, memberikan komentar koordinasi, serta memberikan konfirmasi keberhasilan perbaikan.
*   **Administrator**:
    *   Kebutuhan: Melihat semua laporan masuk, menentukan tingkat urgensi/prioritas, menugaskan teknisi yang kompeten, dan menutup laporan yang telah selesai dikonfirmasi.
*   **Teknisi**:
    *   Kebutuhan: Panel tugas pribadi, mengubah status progres pengerjaan (*In Progress* ke *Resolved*), dan berkirim komentar untuk koordinasi lokasi atau teknis perbaikan.

### Stakeholder Sekunder
*   **Manajer Fasilitas**:
    *   Kebutuhan: Dashboard visual untuk memantau ringkasan performa teknisi, distribusi kerusakan per kategori, dan mengevaluasi fasilitas mana yang paling sering rusak guna keputusan perawatan jangka panjang.

## 5. Batasan Ruang Lingkup (Scope Boundaries)
*   **In-Scope**:
    *   Pencatatan laporan dengan nomor unik `CSR-YYYYMMDD-XXXX`.
    *   Manajemen 4 peran pengguna (Pelapor, Admin, Teknisi, Manajer) dengan sistem login simulasi.
    *   Siklus status laporan lengkap dan alur balik status jika perbaikan ditolak.
    *   Sistem komentar interaktif pada detail laporan.
    *   Pencatatan riwayat perubahan status laporan secara otomatis.
    *   Dashboard statistik untuk Manajer Fasilitas.
    *   Pencarian teks judul/lokasi dan penyaringan berdasarkan status/prioritas/kategori.
*   **Out-of-Scope**:
    *   Autentikasi menggunakan Google OAuth.
    *   Unggah foto/bukti gambar kerusakan (object storage).
    *   Pengiriman notifikasi email otomatis.
    *   Manajemen inventaris suku cadang dan pihak ketiga (vendor).
    *   Pemindaian QR Code ruangan.

## 6. Asumsi dan Batasan (Assumptions & Constraints)
*   `[ASSUMPTION]` Seluruh sivitas akademika memiliki akses ke browser web dan internet di area kampus untuk membuka aplikasi.
*   `[ASSUMPTION]` Admin dan Teknisi memiliki pemahaman dasar tentang penggunaan aplikasi web.
*   `[CONSTRAINT]` Aplikasi harus berjalan menggunakan arsitektur serverless Cloudflare Workers dan database D1 dalam batas paket gratis (Free Tier).
*   `[CONSTRAINT]` Pengujian otomatis harus mencakup minimal 20 asersi/test cases tanpa bergantung pada database eksternal aktif (menggunakan mock/lokal).

## 7. Daftar Pertanyaan Terbuka (Open Questions)
*   `[OPEN QUESTION]` Apakah diperlukan sistem notifikasi internal di dalam web (in-app notification) ketika laporan berubah status? *(Untuk fase awal disepakati belum wajib, hanya tampilan status di dashboard).*
*   `[OPEN QUESTION]` Apakah satu laporan bisa ditugaskan ke lebih dari satu teknisi? *(Disepakati satu laporan hanya ditugaskan ke satu teknisi penanggung jawab).*
