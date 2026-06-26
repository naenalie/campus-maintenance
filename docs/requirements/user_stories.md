# User Stories & Acceptance Criteria: Campus Service Request and Maintenance System

Dokumen ini mendokumentasikan 10 User Stories beserta minimal 2 Acceptance Criteria (AC) untuk masing-masing story.

---

## 1. Peran: Pelapor (Dosen & Mahasiswa)

### [US-01] Melaporkan Kerusakan Fasilitas
> *Sebagai seorang Pelapor, saya ingin dapat membuat laporan kerusakan fasilitas secara online agar staf sarpras segera mengetahui dan memperbaiki masalah tersebut.*
*   **AC-01**: Form pembuatan laporan menyediakan input wajib: Judul, Deskripsi (min. 20 karakter), Lokasi, dan Kategori.
*   **AC-02**: Saat berhasil disimpan, sistem menampilkan pesan sukses dan menghasilkan nomor unik laporan dengan format `CSR-YYYYMMDD-XXXX`.

### [US-02] Memantau Progres Laporan Pribadi
> *Sebagai seorang Pelapor, saya ingin melihat daftar laporan yang pernah saya buat dan status pengerjaannya agar saya mengetahui kapan masalah tersebut akan selesai diperbaiki.*
*   **AC-01**: Terdapat halaman daftar laporan yang hanya menampilkan laporan yang dikirim oleh pengguna bersangkutan (pelapor saat ini).
*   **AC-02**: Setiap laporan di daftar menampilkan Nomor Laporan, Judul, Kategori, Status (misal: *In Progress*), dan Tanggal Pembuatan.

### [US-03] Memberikan Informasi Tambahan via Komentar
> *Sebagai seorang Pelapor, saya ingin dapat menambahkan komentar pada laporan saya agar saya bisa memberikan koordinasi atau update detail kepada Admin dan Teknisi.*
*   **AC-01**: Halaman detail laporan menyediakan kolom input untuk mengirim teks komentar baru.
*   **AC-02**: Komentar yang sukses dikirim langsung muncul di area percakapan detail laporan dengan menampilkan nama pengirim, peran, dan waktu pengiriman.

### [US-04] Mengonfirmasi Keberhasilan Perbaikan
> *Sebagai seorang Pelapor, saya ingin memberikan konfirmasi setelah fasilitas selesai diperbaiki agar laporan dapat ditutup secara resmi jika saya puas, atau diperbaiki ulang jika belum tuntas.*
*   **AC-01**: Saat laporan berstatus `RESOLVED`, Pelapor melihat tombol **"Konfirmasi Selesai"** (mengubah status ke `CLOSED`) dan tombol **"Laporkan Belum Tuntas"** (mengubah status kembali ke `Assigned`).
*   **AC-02**: Aksi konfirmasi berhasil mencatat riwayat perubahan status di sistem.

---

## 2. Peran: Administrator

### [US-05] Meninjau Semua Laporan Masuk
> *Sebagai seorang Administrator, saya ingin melihat semua laporan kerusakan dari seluruh kampus agar saya bisa memilah laporan mana yang harus ditindaklanjuti.*
*   **AC-01**: Admin memiliki akses ke halaman panel kontrol yang menampilkan seluruh laporan di sistem.
*   **AC-02**: Halaman menyediakan fitur pencarian berdasarkan judul/lokasi dan penyaringan berdasarkan status untuk mempermudah peninjauan.

### [US-06] Menetapkan Kategori & Prioritas
> *Sebagai seorang Administrator, saya ingin menentukan kategori kerusakan dan tingkat prioritas laporan agar teknisi tahu seberapa penting dan mendesak perbaikan tersebut.*
*   **AC-01**: Admin dapat mengedit kategori laporan (jika pelapor salah memilih) dan memilih prioritas dari dropdown (`LOW`, `MEDIUM`, `HIGH`).
*   **AC-02**: Laporan dengan prioritas `HIGH` otomatis bergeser ke urutan teratas pada daftar laporan.

### [US-07] Menugaskan Teknisi
> *Sebagai seorang Administrator, saya ingin mengalokasikan teknisi yang sesuai untuk menangani perbaikan agar pekerjaan dapat segera dieksekusi.*
*   **AC-01**: Admin dapat memilih nama teknisi dari daftar dropdown teknisi yang tersedia di sistem pada detail laporan yang berstatus `Under Review`.
*   **AC-02**: Setelah teknisi ditugaskan, status laporan otomatis berubah menjadi `ASSIGNED`.

### [US-08] Menutup Laporan Selesai
> *Sebagai seorang Administrator, saya ingin menutup laporan secara resmi agar laporan tersebut dinyatakan selesai sepenuhnya dan diarsipkan.*
*   **AC-01**: Admin dapat mengklik tombol **"Tutup Laporan"** pada laporan yang telah dikonfirmasi selesai oleh Pelapor.
*   **AC-02**: Status laporan berubah menjadi `CLOSED` dan tidak dapat diubah statusnya lagi kecuali dibuka kembali oleh Admin.

---

## 3. Peran: Teknisi

### [US-09] Melihat Daftar Tugas Pribadi
> *Sebagai seorang Teknisi, saya ingin melihat daftar tugas perbaikan yang dialokasikan kepada saya agar saya dapat merencanakan pekerjaan harian saya.*
*   **AC-01**: Terdapat halaman daftar tugas khusus yang hanya menampilkan laporan kerusakan di mana Teknisi saat ini ditugaskan.
*   **AC-02**: Daftar tugas diurutkan berdasarkan tingkat prioritas (`HIGH` di paling atas) dan menampilkan detail lokasi perbaikan.

### [US-10] Memperbarui Progres Pengerjaan
> *Sebagai seorang Teknisi, saya ingin mengubah status tugas saya menjadi "In Progress" saat mulai dikerjakan dan "Resolved" saat selesai agar Admin dan Pelapor tahu perkembangannya.*
*   **AC-01**: Teknisi dapat mengklik tombol **"Mulai Mengerjakan"** (mengubah status dari `Assigned` ke `In Progress`).
*   **AC-02**: Teknisi dapat mengklik tombol **"Tandai Selesai"** (mengubah status dari `In Progress` ke `Resolved`) dan sistem memvalidasi bahwa status berubah dengan benar.

---

## 4. Peran: Manajer Fasilitas

### [US-11] Memantau Kinerja dan Statistik Fasilitas (Dashboard)
> *Sebagai seorang Manajer Fasilitas, saya ingin melihat statistik agregat laporan kerusakan agar saya bisa mengevaluasi kinerja perbaikan sarpras dan mengambil kebijakan perawatan.*
*   **AC-01**: Manajer memiliki akses ke dashboard visual yang menampilkan jumlah total laporan, laporan selesai, laporan tertunda, dan waktu respon rata-rata.
*   **AC-02**: Dashboard menampilkan grafik distribusi persentase kerusakan berdasarkan kategori (misalnya AC vs Kebersihan).
