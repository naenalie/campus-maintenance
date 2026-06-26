# Studi Kasus: Campus Service Request and Maintenance System

## 1. Deskripsi Umum
Aplikasi **Campus Service Request and Maintenance System** digunakan oleh sivitas akademika (mahasiswa atau dosen) untuk melaporkan masalah fasilitas yang terjadi di lingkungan kampus. Masalah fasilitas tersebut meliputi proyektor rusak, koneksi internet bermasalah, pendingin ruangan (AC) tidak dingin, kursi kelas rusak, alat laboratorium bermasalah, atau ruangan kelas/fasilitas umum kotor.

Laporan yang masuk akan diperiksa terlebih dahulu oleh Administrator untuk ditentukan kategori, tingkat prioritas, dan ditugaskan kepada Teknisi yang sesuai. Teknisi yang ditunjuk kemudian akan melakukan perbaikan dan memperbarui progres pengerjaan hingga selesai. Pelapor dapat memantau perkembangan status laporan mereka, memberikan komentar/umpan balik tambahan, dan melakukan konfirmasi jika pekerjaan selesai. Setelah dikonfirmasi, Administrator akan menutup laporan tersebut.

---

## 2. Aktor Sistem dan Wewenang

| Aktor | Peran & Wewenang |
| :--- | :--- |
| **Pelapor** (Mahasiswa/Dosen) | 1. Membuat laporan kerusakan baru.<br>2. Melihat status dan riwayat laporan miliknya.<br>3. Menambahkan komentar atau catatan pada laporan.<br>4. Memberikan konfirmasi hasil perbaikan. |
| **Administrator** | 1. Memeriksa semua laporan masuk.<br>2. Menentukan kategori kerusakan dan tingkat prioritas laporan.<br>3. Menugaskan teknisi untuk melakukan perbaikan.<br>4. Menutup laporan setelah dikonfirmasi atau dibatalkan. |
| **Teknisi** | 1. Melihat daftar tugas perbaikan yang diberikan.<br>2. Menerima tugas perbaikan.<br>3. Memperbarui progres pekerjaan perbaikan.<br>4. Menandai pekerjaan sebagai selesai (*Resolved*). |
| **Manajer Fasilitas** | 1. Melihat dashboard ringkasan performa dan laporan fasilitas.<br>2. Memantau statistik laporan masuk, tertunda, dan selesai. |

---

## 3. Fitur Wajib (Must-Have Features)
1.  **Membuat Laporan Baru**: Formulir laporan dengan field judul, deskripsi rinci, lokasi/ruangan, dan kategori masalah.
2.  **Melihat Daftar Laporan**: Halaman yang menampilkan daftar laporan untuk pelapor (hanya miliknya), admin (semua laporan), teknisi (tugas miliknya), dan manajer.
3.  **Mencari dan Menyaring Laporan**: Pencarian berdasarkan teks judul/lokasi dan penyaringan berdasarkan status, prioritas, kategori, atau teknisi.
4.  **Melihat Detail Laporan**: Halaman detail yang menampilkan data laporan, riwayat status, dan komentar.
5.  **Memeriksa Laporan**: Fungsionalitas bagi administrator untuk mereview laporan baru.
6.  **Menentukan Kategori dan Prioritas**: Penentuan kategori masalah dan prioritas (*LOW*, *MEDIUM*, *HIGH*) oleh administrator.
7.  **Menugaskan Teknisi**: Alokasi teknisi tertentu untuk menangani laporan perbaikan.
8.  **Mengubah Status Pekerjaan**: Perubahan status oleh teknisi selama proses perbaikan berlangsung.
9.  **Menambahkan Komentar atau Catatan**: Kolom obrolan/komentar interaktif di dalam detail laporan untuk komunikasi pelapor, admin, dan teknisi.
10. **Menyimpan Riwayat Status**: Sistem menyimpan log otomatis setiap ada perubahan status (siapa yang mengubah, kapan, dan status barunya).
11. **Menutup atau Membuka Kembali Laporan**: Admin berhak menutup (*Closed*) laporan yang selesai atau membuka kembali (*Reopened*) jika pelapor merasa perbaikan belum tuntas.
12. **Menampilkan Dashboard Sederhana**: Statistik dan grafik visual ringkas untuk Manajer Fasilitas mengenai laporan aktif, selesai, dan durasi penanganan.

---

## 4. Fitur yang Tidak Wajib (Out of Scope / Optional)
*   Fitur unggah foto (*Object Storage*).
*   Notifikasi email otomatis (*Email Integration*).
*   Sistem login terintegrasi dengan Google OAuth.
*   Pemindaian QR code ruangan.
*   Penentuan kategori otomatis menggunakan AI.
*   Manajemen inventaris suku cadang (*Inventory Spare Part*).
*   Manajemen pihak ketiga (*Vendor Management*).

---

## 5. Alur Status Laporan (System Workflow)
Sistem memiliki alur status laporan yang terstruktur sebagai berikut:

```
[Submitted] (Laporan dikirim oleh Pelapor)
      ↓
[Under Review] (Diperiksa oleh Admin, ditentukan Kategori & Prioritas)
      ↓
[Assigned] (Ditugaskan oleh Admin kepada Teknisi)
      ↓
[In Progress] (Teknisi mulai melakukan pengerjaan perbaikan)
      ↓
[Resolved] (Teknisi menandai pekerjaan selesai)
      ↓
[Closed] (Admin menutup laporan setelah konfirmasi Pelapor)
```

*Catatan: Alur status dapat bertambah atau berubah (misalnya status `Reopened` jika perbaikan ditolak pelapor) dengan ketentuan didokumentasikan dalam dokumen requirement dan aturan bisnis.*
