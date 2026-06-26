# Requirements Elicitation: Campus Service Request and Maintenance System

## 1. Metodologi Elisitasi
Untuk menggali kebutuhan sistem secara terperinci, dilakukan simulasi wawancara dan kuisioner terhadap perwakilan calon pemangku kepentingan (*stakeholders*) di kampus, yaitu:
1.  **Pelapor (Dosen & Mahasiswa)**: Berfokus pada kemudahan pengisian form kerusakan dan kebutuhan melacak progres perbaikan.
2.  **Administrator (Staf Sarpras)**: Berfokus pada kemudahan manajemen tugas, penugasan teknisi, dan pengaturan skala prioritas.
3.  **Teknisi**: Berfokus pada daftar pekerjaan harian, komunikasi kendala di lapangan, dan pembaruan progres kerja.
4.  **Manajer Fasilitas (Kabag Sarpras)**: Berfokus pada metrik rekapitulasi data dan durasi pengerjaan perbaikan.

---

## 2. Hasil Pengumpulan Kebutuhan (Identified Needs)

### A. Sudut Pandang Pelapor (Mahasiswa & Dosen)
*   *Masalah*: Pelapor sering tidak tahu apakah laporan mereka sudah dibaca oleh bagian sarana prasarana (sarpras) atau belum.
*   *Kebutuhan*: 
    *   Sistem harus langsung menampilkan konfirmasi tanda terima beserta **Nomor Laporan** yang unik saat form dikirimkan.
    *   Tampilan daftar laporan milik pribadi yang mudah diakses dengan indikator status yang jelas (*Submitted, Under Review, Assigned, In Progress, Resolved, Closed*).
    *   Kemampuan untuk menulis catatan tambahan (misal: *"Listrik mati juga merembet ke ruangan sebelah"*).
    *   Opsi untuk menyatakan bahwa laporan *"Belum Tuntas"* jika teknisi mengklaim sudah beres namun aslinya belum.

### B. Sudut Pandang Administrator
*   *Masalah*: Laporan yang masuk menumpuk tanpa filter, dan sulit membagi tugas ke teknisi secara merata.
*   *Kebutuhan*:
    *   Tampilan dashboard admin yang memuat seluruh laporan masuk dengan opsi penyaringan (filter) berdasarkan status dan prioritas.
    *   Kemampuan mengubah prioritas (*LOW/MEDIUM/HIGH*) agar teknisi mendahulukan laporan mendesak.
    *   Menu dropdown untuk memilih dan menugaskan teknisi tertentu pada satu laporan.
    *   Kemampuan menutup laporan setelah pelapor puas, atau membuka kembali jika ditolak pelapor.

### C. Sudut Pandang Teknisi
*   *Masalah*: Sering terjadi salah paham lokasi atau detail kerusakan, dan teknisi tidak punya catatan tugas digital yang rapi.
*   *Kebutuhan*:
    *   Panel daftar tugas personal (hanya menampilkan tugas yang diberikan kepada dirinya sendiri).
    *   Fitur tombol untuk mengubah status tugas ke *"In Progress"* saat mulai dikerjakan, dan *"Resolved"* saat selesai.
    *   Kolom catatan internal/komentar untuk berdiskusi dengan pelapor/admin tanpa perlu bertemu fisik (misal: *"Saya butuh kunci ruangan dari lab-assistant"*).

### D. Sudut Pandang Manajer Fasilitas
*   *Masalah*: Sulit mengetahui teknisi mana yang lambat bekerja dan kategori fasilitas apa yang paling boros anggaran/sering rusak.
*   *Kebutuhan*:
    *   Dashboard analitik berisi angka total laporan selesai, laporan pending, dan laporan prioritas tinggi.
    *   Grafik pie/bar untuk melihat persentase kerusakan berdasarkan kategori.
    *   Informasi waktu respon rata-rata teknisi untuk mengevaluasi efisiensi tim sarpras.

---

## 3. Kesimpulan Elisitasi & Kesepakatan Desain
Dari hasil pengumpulan kebutuhan di atas, disepakati bahwa sistem akan fokus pada:
1.  **Traceability**: Status laporan yang transparan dari awal hingga akhir, didukung dengan pencatatan log otomatis.
2.  **Kolaborasi Terbuka**: Fitur komentar sebagai jembatan komunikasi utama antar aktor.
3.  **Prioritisation**: Pengurutan laporan berdasarkan tingkat kepentingan untuk menjamin perbaikan fasilitas vital tidak tertunda.
