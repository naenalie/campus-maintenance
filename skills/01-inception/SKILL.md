# Project Inception and Stakeholder Discovery

## Purpose
Tujuan dari skill ini adalah untuk memandu AI dalam melakukan inisiasi proyek (inception) perangkat lunak secara terstruktur. Skill ini membantu mengidentifikasi masalah bisnis utama, memisahkan masalah dari solusi, menentukan tujuan bisnis, mengidentifikasi pemangku kepentingan (stakeholder) primer dan sekunder beserta kebutuhan mereka, mendefinisikan ruang lingkup awal (in-scope & out-of-scope), serta mendokumentasikan asumsi, batasan, dan pertanyaan terbuka yang memerlukan klarifikasi lebih lanjut.

## When to Use
Digunakan pada awal siklus hidup rekayasa kebutuhan (requirements engineering), sebelum melakukan elisitasi kebutuhan detail, pembuatan spesifikasi fungsional, pembuatan user stories, atau penulisan kode program.

## Inputs
- Deskripsi atau ringkasan awal proyek (project brief / case study).
- Catatan pemangku kepentingan awal (jika tersedia).
- Daftar asumsi dan batasan awal proyek (jika tersedia).

## Required Context
Dokumen deskripsi kasus proyek utama (seperti `CASE.md` atau dokumen deskripsi serupa) dan berkas masukan tambahan dari pemangku kepentingan (seperti `inputs/stakeholder-notes.md` dan `inputs/assumptions.md`).

## Workflow
1. **Analisis Deskripsi Masalah**: Bacalah seluruh dokumen masukan awal proyek secara saksama untuk memahami konteks umum dan domain bisnis proyek.
2. **Identifikasi Masalah Bisnis**: Ringkaslah masalah bisnis utama yang ingin diselesaikan oleh perangkat lunak dalam maksimal dua paragraf tanpa menyebutkan solusi teknologi terlebih dahulu.
3. **Pemisahan Masalah dan Solusi**: Buatlah pemisahan yang jelas antara masalah bisnis (apa yang salah atau tidak efisien saat ini) dan solusi yang diusulkan (bagaimana perangkat lunak akan membantu menyelesaikannya).
4. **Definisikan Tujuan Bisnis (Business Goals)**: Rumuskan minimal tiga tujuan bisnis utama yang ingin dicapai melalui proyek ini (misalnya efisiensi waktu, pemusatan data, minimalisasi kesalahan manual).
5. **Identifikasi Pemangku Kepentingan (Stakeholders)**: Klasifikasikan pemangku kepentingan menjadi dua kategori:
   - *Stakeholder Primer*: Pengguna langsung yang berinteraksi dengan sistem atau pemilik proses bisnis utama.
   - *Stakeholder Sekunder*: Pihak yang tidak menggunakan sistem secara langsung tetapi berkepentingan dengan output atau regulasi sistem.
6. **Pemetaan Kebutuhan Stakeholder**: Tuliskan kebutuhan utama dan ekspektasi dari masing-masing peran pemangku kepentingan yang telah diidentifikasi.
7. **Definisikan Batasan Ruang Lingkup (Scope Boundaries)**: Tentukan batas ruang lingkup secara tegas dengan membaginya menjadi:
   - *In-Scope*: Fitur, proses bisnis, atau modul yang wajib dikerjakan pada proyek ini.
   - *Out-of-Scope*: Fitur, integrasi, atau modul yang secara eksplisit tidak akan dikerjakan pada proyek ini.
8. **Identifikasi Asumsi dan Batasan (Assumptions & Constraints)**:
   - Kumpulkan semua asumsi (hal-hal yang dianggap benar tanpa bukti tertulis saat ini) dan tandai masing-masing dengan label `[ASSUMPTION]`.
   - Identifikasi semua batasan teknis atau bisnis yang mengikat proyek (seperti regulasi, anggaran, waktu, atau platform wajib).
9. **Daftar Pertanyaan Terbuka (Open Questions)**: Kumpulkan semua informasi penting yang tidak disediakan dalam dokumen masukan awal dan beri label `[OPEN QUESTION]` untuk diajukan kembali ke pemangku kepentingan guna klarifikasi lebih lanjut.
10. **Jalankan Quality Checks**: Verifikasi hasil kerja terhadap daftar kriteria kualitas sebelum mengeluarkan output final.

## Output Format
Output harus berupa file Markdown dengan struktur berikut:
```markdown
# Project Inception: [Nama Proyek]

## 1. Ringkasan Masalah Bisnis
[Tuliskan 1-2 paragraf ringkasan masalah bisnis tanpa solusi teknologi]

## 2. Pemisahan Masalah dan Solusi
- **Masalah Bisnis**: [Deskripsi masalah bisnis]
- **Solusi yang Diusulkan**: [Deskripsi solusi perangkat lunak]

## 3. Tujuan Bisnis (Business Goals)
1. [Goal 1]
2. [Goal 2]
3. [Goal 3]

## 4. Analisis Stakeholder dan Kebutuhannya
### Stakeholder Primer
- **[Nama Peran/Aktor]**: [Deskripsi kebutuhan utama peran tersebut]
### Stakeholder Sekunder
- **[Nama Peran/Instansi]**: [Deskripsi ekspektasi/kebutuhan]

## 5. Ruang Lingkup (Scope Boundaries)
- **In-Scope**:
  - [Item ruang lingkup masuk 1]
  - [Item ruang lingkup masuk 2]
- **Out-of-Scope**:
  - [Item ruang lingkup keluar 1]
  - [Item ruang lingkup keluar 2]

## 6. Asumsi dan Batasan
- **Asumsi**:
  - [ASSUMPTION] [Deskripsi asumsi]
- **Batasan (Constraints)**:
  - [Deskripsi batasan teknis/bisnis]

## 7. Pertanyaan Terbuka (Open Questions)
- [OPEN QUESTION] [Deskripsi informasi penting yang belum disediakan]
```

## Rules
1. **Dilarang Keras Mengarang Fakta**: AI tidak boleh membuat fakta, fitur, atau data spesifik yang tidak tertera pada dokumen masukan asal, kecuali ditandai secara eksplisit sebagai asumsi.
2. **Pemberian Label Asumsi**: Setiap asumsi yang dibuat wajib ditandai di depannya dengan tag `[ASSUMPTION]`.
3. **Pemberian Label Informasi Hilang**: Setiap informasi penting yang tidak disediakan pada dokumen masukan wajib dicantumkan pada bagian Pertanyaan Terbuka dengan diawali tag `[OPEN QUESTION]`.
4. **Pemisahan Masalah dari Solusi**: Jangan mencampuradukkan deskripsi masalah bisnis dengan fitur-fitur teknis solusi di bagian ringkasan masalah.
5. **Kemandirian Proyek**: Skill ini harus ditulis secara generik tanpa merujuk ke nama proyek tertentu (misalnya dilarang keras menuliskan istilah spesifik seperti "Student Task Management System", "dosen", "mahasiswa", atau "tugas perkuliahan" di dalam aturan umum, workflow, maupun judul bagian skill ini).

## Quality Checks
1. **Kelengkapan (Completeness)**: Apakah output memuat seluruh bagian yang ditentukan pada bagian Output Format secara lengkap?
2. **Kejelasan (Clarity)**: Apakah masalah bisnis dijelaskan dengan bahasa yang jelas, tanpa jargon teknis yang tidak perlu, dan memisahkan masalah dari solusi dengan tegas?
3. **Validitas Fakta (No Assumptions Presented as Facts)**: Apakah seluruh pernyataan yang tidak ada di dokumen masukan telah ditandai dengan label `[ASSUMPTION]` secara konsisten?
4. **Batas Ruang Lingkup (Scope Boundaries Exist)**: Apakah terdapat batas yang jelas dan logis antara apa yang masuk (In-Scope) dan apa yang keluar (Out-of-Scope) dari pengembangan proyek?
5. **Kesesuaian Tujuan Bisnis**: Apakah minimal tiga tujuan bisnis utama telah dirumuskan secara logis dan mendukung penyelesaian masalah bisnis yang diidentifikasi?

## Failure Conditions
1. **Kekurangan Input Utama (Insufficient Input)**: Menghentikan proses dan meminta klarifikasi jika dokumen deskripsi proyek awal kosong, tidak terbaca, atau tidak ditemukan.
2. **Informasi Kontradiktif (Contradictory Information)**: Menghentikan proses jika terdapat informasi dalam input yang saling bertentangan secara ekstrem (misal satu bagian menyatakan sistem harus berbasis offline lokal, bagian lain menyatakan sistem wajib berbasis web cloud terdistribusi) tanpa adanya penjelasan kompromi yang disepakati.
3. **Ruang Lingkup Terlalu Samar (Scope Too Vague)**: Menghentikan proses jika deskripsi masukan tidak memberikan detail minimum yang cukup untuk menentukan batas sistem dasar, sehingga batas In-Scope dan Out-of-Scope tidak dapat diidentifikasi secara rasional.

## Example Invocation
```text
Read CASE.md and skills/01-inception/SKILL.md.
Execute the skill exactly as written.
Save the result using the output structure defined in the skill.
Do not invent missing facts. Mark assumptions and open questions explicitly.
```

## Expected Output Example
```markdown
# Project Inception: Sistem Parkir Digital Kampus

## 1. Ringkasan Masalah Bisnis
Proses pencatatan kendaraan masuk dan keluar kampus saat ini masih dilakukan secara manual menggunakan kertas karcis. Hal ini menyebabkan antrean panjang di pintu gerbang pada jam sibuk serta rawan terjadi kehilangan data kendaraan.

## 2. Pemisahan Masalah dan Solusi
- Masalah Bisnis: Antrean kendaraan panjang dan ketidakakuratan data parkir manual.
- Solusi yang Diusulkan: Sistem palang parkir otomatis berbasis pembaca kartu mahasiswa.

## 3. Tujuan Bisnis (Business Goals)
1. Mengurangi waktu tunggu antrean kendaraan di gerbang kampus.
2. Meningkatkan akurasi pencatatan data kendaraan masuk dan keluar.
3. Meminimalkan risiko kehilangan kertas karcis parkir fisik.

## 4. Analisis Stakeholder dan Kebutuhannya
### Stakeholder Primer
- Pengendara (Mahasiswa/Dosen): Butuh akses masuk gerbang yang cepat dan praktis menggunakan kartu identitas kampus.
- Petugas Keamanan: Butuh pemantauan status palang parkir secara real-time dan pencatatan riwayat jika terjadi kendala.
### Stakeholder Sekunder
- Admin Keuangan: Ekspektasi laporan statistik penggunaan lahan parkir harian untuk alokasi anggaran perawatan area.

## 5. Ruang Lingkup (Scope Boundaries)
- In-Scope:
  - Pembacaan kartu identitas kampus untuk membuka palang otomatis.
  - Penyimpanan data log kendaraan masuk dan keluar secara terpusat.
- Out-of-Scope:
  - Fitur pembayaran tarif parkir (karena parkir kampus gratis).

## 6. Asumsi dan Batasan
- Asumsi:
  - [ASSUMPTION] Semua kartu mahasiswa/dosen sudah memiliki cip RFID aktif yang kompatibel dengan pembaca sistem.
- Batasan (Constraints):
  - Sistem harus terintegrasi dengan database kartu identitas utama milik kampus.

## 7. Pertanyaan Terbuka (Open Questions)
- [OPEN QUESTION] Berapa kapasitas maksimal kendaraan yang ditampung oleh server untuk log riwayat parkir?
```
