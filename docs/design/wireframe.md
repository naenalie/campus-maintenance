# Wireframe UI Design: Campus Service Request and Maintenance System

Dokumen ini mendokumentasikan sketsa tata letak komponen (*wireframe*) halaman aplikasi menggunakan tata letak ASCII text-based mockups.

---

## 1. Tata Letak Header Global (Global Header Navbar)
Header ini akan selalu tampil di bagian atas aplikasi untuk navigasi peran simulasi dan identitas aplikasi.

```
+------------------------------------------------------------------------------------------+
|  [Logo] Campus Maintenance System                           Peran Aktif: [Admin (Alex) v]|
+------------------------------------------------------------------------------------------+
```

---

## 2. Wireframe Halaman Pelapor (Reporter Page Layout)
Halaman ini dibagi menjadi dua kolom utama pada layar lebar (desktop) atau bertumpuk vertikal pada layar sempit (mobile).

```
+------------------------------------------------------------------------------------------+
| HALAMAN PELAPOR (MAHASISWA / DOSEN)                                                      |
|                                                                                          |
| +-----------------------------------------+  +-----------------------------------------+ |
| | FORM LAPORAN BARU                       |  | DAFTAR LAPORAN SAYA                     | |
| |                                         |  |                                         | |
| | Judul Laporan:                          |  | Cari: [Input Teks...]    Filter: [Semua v] |
| | [Input Judul Kerusakan...]              |  +-----------------------------------------+ |
| |                                         |  | No Laporan   | Judul      | Status      | |
| | Deskripsi Kerusakan:                    |  |--------------|------------|-------------| |
| | [Textarea detail kerusakan (min 20 ch)] |  | CSR-0626-01  | AC Panas   | RESOLVED    | |
| |                                         |  | CSR-0626-02  | Wifi Putus | SUBMITTED   | |
| | Lokasi / Ruangan:                       |  +-----------------------------------------+ |
| | [Input nama ruangan/kelas...]           |  | * Klik baris laporan untuk melihat detail | |
| |                                         |  +-----------------------------------------+ |
| | Kategori:                               |                                              |
| | [Pilih Kategori (AC/Internet/dll.)    v]|                                              |
| |                                         |                                              |
| | [ Kirim Laporan ]                       |                                              |
| +-----------------------------------------+                                              |
+------------------------------------------------------------------------------------------+
```

---

## 3. Wireframe Panel Kontrol Administrator (Admin Control Panel)
Halaman ini menampilkan seluruh laporan masuk di kampus beserta kolom pemfilteran cepat.

```
+------------------------------------------------------------------------------------------+
| PANEL KONTROL ADMINISTRATOR                                                              |
|                                                                                          |
| Cari: [Ketik kata kunci...]  Filter Status: [Semua v]  Filter Prioritas: [HIGH v]        |
|                                                                                          |
| +--------------------------------------------------------------------------------------+ |
| | No Laporan   | Judul             | Lokasi  | Prioritas | Status      | Teknisi       | |
| |--------------|-------------------|---------|-----------|-------------|---------------| |
| | CSR-0626-01  | AC Bocor          | R.302   | HIGH      | In Progress | Budi          | |
| | CSR-0626-02  | Lampu Mati        | Selasar | MEDIUM    | Submitted   | -             | |
| | CSR-0626-03  | Kursi Kelas Patah | R.401   | LOW       | Closed      | Roni          | |
| +--------------------------------------------------------------------------------------+ |
| * Klik baris laporan untuk membuka lembar detail, Triage, dan Penugasan Teknisi.        |
+------------------------------------------------------------------------------------------+
```

---

## 4. Wireframe Panel Tugas Teknisi (Technician Board)
Halaman ini hanya menampilkan daftar tugas spesifik milik teknisi yang masuk log.

```
+------------------------------------------------------------------------------------------+
| PANEL TUGAS TEKNISI: [Budi]                                                              |
|                                                                                          |
| DAFTAR PERBAIKAN AKTIF (Urutan Prioritas Teratas)                                        |
| +--------------------------------------------------------------------------------------+ |
| | No Laporan   | Judul             | Lokasi  | Kategori     | Prioritas | Status       | |
| |--------------|-------------------|---------|--------------|-----------|--------------| |
| | CSR-0626-01  | AC Bocor          | R.302   | Pendingin AC | HIGH      | Assigned     | |
| | CSR-0626-05  | Colokan Longgar   | R.101   | Alat Kelas   | MEDIUM    | In Progress  | |
| +--------------------------------------------------------------------------------------+ |
| * Klik baris tugas untuk mengubah status progres kerja atau menulis komentar.            |
+------------------------------------------------------------------------------------------+
```

---

## 5. Wireframe Dashboard Manajer Fasilitas (Manager Dashboard)
Halaman visual ringkasan analitik.

```
+------------------------------------------------------------------------------------------+
| DASHBOARD MANAJER FASILITAS                                                              |
|                                                                                          |
| +-------------------+  +-------------------+  +-------------------+  +-----------------+ |
| | TOTAL LAPORAN     |  | SEDANG DIPERBAIKI |  | TOTAL SELESAI     |  | RATA-RATA WAKTU | |
| |        42         |  |         8         |  |        34         |  |    1.2 Hari     | |
| +-------------------+  +-------------------+  +-------------------+  +-----------------+ |
|                                                                                          |
| +-----------------------------------------+  +-----------------------------------------+ |
| | GRAFIK KERUSAKAN PER KATEGORI           |  | REKAPITULASI FASILITAS AKTIF            | |
| |                                         |  |                                         | |
| |  [## AC (40%)]                          |  | CSR-0626-01 (HIGH) - R.302 [In Progress]| |
| |  [#### Internet (30%)]                  |  | CSR-0626-02 (MED)  - R.101 [Submitted]  | |
| |  [# Peralatan Kelas (15%)]              |  | CSR-0626-04 (LOW)  - R.504 [Assigned]   | |
| |  [# Lainnya (15%)]                      |  |                                         | |
| +-----------------------------------------+  +-----------------------------------------+ |
+------------------------------------------------------------------------------------------+
```

---

## 6. Wireframe Halaman Detail Laporan (Request Detail View)
Tampilan terperinci untuk membaca data, riwayat status, dan menulis komentar (kolaboratif).

```
+------------------------------------------------------------------------------------------+
| DETAIL LAPORAN: CSR-20260626-0042                                                        |
|                                                                                          |
| Judul Laporan : AC Kelas R.302 Bocor & Panas         Status    : [ IN PROGRESS ]         |
| Dilaporkan Oleh: Ellen (Mahasiswa)                   Prioritas : [ HIGH        ]         |
| Lokasi Ruangan: R.302                                Kategori  : [ Pendingin AC]         |
| Deskripsi     : AC menyala tetapi sama sekali tidak dingin. Air menetes terus menerus.  |
| Teknisi Aktif : Budi                                 Tanggal   : 2026-06-26 11:00        |
|                                                                                          |
| +--------------------------------------------------------------------------------------+ |
| | PANEL TINDAKAN (Dinamis Sesuai Peran Aktif Pengguna)                                 | |
| | [ Tunjuk Teknisi: Budi v ]   [ Set Prioritas: HIGH v ]   [ Kirim Penugasan ]          | |
| +--------------------------------------------------------------------------------------+ |
|                                                                                          |
| +-----------------------------------------+  +-----------------------------------------+ |
| | RIWAYAT STATUS (TIMELINE LOG)           |  | KOLOM KOMENTAR & DISKUSI                | |
| |                                         |  |                                         | |
| | - [11:15] Status -> In Progress (Budi)  |  | [Budi (Teknisi) - 11:17]:               | |
| |   Catatan: "Mulai ganti freon baru."    |  | "Bocor di bagian pipa pembuangan air."  | |
| | - [11:05] Status -> Assigned (Admin)    |  |                                         | |
| |   Catatan: "Ditugaskan ke Budi."        |  | [Ellen (Pelapor) - 11:20]:              | |
| | - [11:00] Status -> Submitted (Ellen)   |  | "Tolong ember penampungnya digeser."    | |
| |                                         |  |-----------------------------------------| |
| |                                         |  | Kirim Komentar Baru:                    | |
| |                                         |  | [Input teks komentar...]                | |
| |                                         |  | [ Kirim Komentar ]                      | |
| +-----------------------------------------+  +-----------------------------------------+ |
|                                                                                          |
| [ <= Kembali ke Daftar Laporan ]                                                         |
+------------------------------------------------------------------------------------------+
```
