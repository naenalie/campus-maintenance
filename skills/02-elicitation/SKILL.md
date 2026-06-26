# Requirements Elicitation

## Purpose
Tujuan dari skill ini adalah untuk memandu AI dalam melakukan proses elisitasi kebutuhan (elicitation) secara terstruktur. Skill ini membantu memilih teknik elisitasi yang sesuai, menyusun panduan pertanyaan wawancara untuk pemangku kepentingan (stakeholder), menganalisis masukan untuk mengidentifikasi kebutuhan eksplisit dan implisit, serta mengelompokkan kebutuhan tersebut berdasarkan peran stakeholder.

## When to Use
Digunakan setelah tahap inisiasi proyek (Project Inception) selesai dan didokumentasikan, serta sebelum menyusun dokumen spesifikasi kebutuhan formal (specification) atau perancangan sistem.

## Inputs
- Berkas keluaran dari Skill 1 (`outputs/reviewed/01-inception.md`).
- Catatan pertemuan atau dokumen tambahan dari stakeholder (jika ada).
- Jawaban wawancara atau tanggapan kuesioner dari stakeholder (jika ada).

## Required Context
Berkas inisiasi proyek (`outputs/reviewed/01-inception.md`), catatan wawancara (`inputs/stakeholder-notes.md`), dan tanggapan wawancara (`inputs/interview-answers.md`).

## Workflow
1. **Analisis Output Inception**: Baca berkas `01-inception.md` secara saksama untuk memahami ruang lingkup proyek, daftar pemangku kepentingan yang teridentifikasi, dan tujuan bisnis.
2. **Pemilihan Teknik Elisitasi**: Tentukan dan jelaskan minimal dua teknik elisitasi kebutuhan (misalnya: wawancara terstruktur, kuesioner, lokakarya, atau analisis dokumen) yang paling cocok untuk proyek ini berdasarkan karakteristik stakeholder.
3. **Penyusunan Pertanyaan Wawancara**: Buat panduan pertanyaan wawancara terbuka untuk setiap kelompok stakeholder utama yang teridentifikasi pada tahap inception.
4. **Analisis Dokumen Masukan**: Tinjau catatan masukan stakeholder (`inputs/stakeholder-notes.md`) dan tanggapan wawancara (`inputs/interview-answers.md`). Jika tanggapan riil tidak ada, simulasikan jawaban stakeholder dengan menandainya secara jelas sebagai `[SIMULATED]`.
5. **Identifikasi Kebutuhan Eksplisit**: Ekstrak kebutuhan eksplisit (explicit needs) yang dinyatakan secara langsung oleh stakeholder dalam dokumen masukan atau jawaban wawancara.
6. **Analisis Kebutuhan Implisit**: Temukan dan analisis kebutuhan implisit (implicit/derived needs) yang tidak dinyatakan secara langsung oleh stakeholder tetapi secara teknis atau operasional diperlukan agar sistem dapat berjalan dengan baik.
7. **Kategorisasi Kebutuhan Berdasarkan Stakeholder**: Kelompokkan seluruh kebutuhan eksplisit dan implisit yang ditemukan ke dalam tabel atau daftar terstruktur berdasarkan peran stakeholder terkait.
8. **Identifikasi Kebutuhan yang Belum Jelas**: Buat daftar pertanyaan tindak lanjut atau kebutuhan yang masih memerlukan elisitasi tambahan.
9. **Jalankan Quality Checks**: Lakukan verifikasi kualitas terhadap draf dokumen elisitasi yang dihasilkan sebelum menyimpannya.

## Output Format
Output harus berupa file Markdown dengan struktur berikut:
```markdown
# Requirements Elicitation: [Nama Proyek]

## 1. Teknik Elisitasi yang Digunakan
- **[Teknik 1]**: [Alasan pemilihan dan cara pelaksanaan]
- **[Teknik 2]**: [Alasan pemilihan dan cara pelaksanaan]

## 2. Panduan Pertanyaan Wawancara
### A. Untuk [Peran Stakeholder 1]
1. [Pertanyaan 1]
2. [Pertanyaan 2]
### B. Untuk [Peran Stakeholder 2]
1. [Pertanyaan 1]

## 3. Catatan Temuan Wawancara (Disimulasikan)
### A. Jawaban [Peran Stakeholder 1]
- **[Pertanyaan 1]**: [SIMULATED] [Tanggapan simulasi]
- **[Pertanyaan 2]**: [SIMULATED] [Tanggapan simulasi]

## 4. Kebutuhan Eksplisit dan Implisit per Stakeholder
### A. Kebutuhan [Peran Stakeholder 1]
- **Eksplisit**:
  - [Deskripsi kebutuhan eksplisit 1]
- **Implisit**:
  - [Deskripsi kebutuhan implisit 1]

### B. Kebutuhan [Peran Stakeholder 2]
...

## 5. Pertanyaan Lanjutan (Open Questions)
- [OPEN QUESTION] [Rincian informasi tambahan yang perlu dikonfirmasi]
```

## Rules
1. **Referensi Output Inception**: Kebutuhan dan stakeholder yang dianalisis harus selaras dengan temuan yang tercantum dalam berkas `01-inception.md`.
2. **Penandaan Jawaban Simulasi**: Semua jawaban stakeholder yang dibuat atau disimulasikan oleh AI (bukan fakta tertulis dari input riil) wajib ditandai di depannya dengan tag `[SIMULATED]`.
3. **Pemisahan Kebutuhan Eksplisit dan Implisit**: Kebutuhan eksplisit (yang diucapkan langsung) dan kebutuhan implisit (yang disimpulkan secara logis) harus dipisahkan secara tegas dan diberi kategori yang jelas.
4. **Penandaan Informasi Kurang Lengkap**: Setiap pertanyaan lanjutan yang timbul karena kurangnya data elisitasi wajib ditandai dengan tag `[OPEN QUESTION]`.
5. **Kemandirian Proyek**: Skill ini harus ditulis secara generik tanpa menyebutkan nama proyek spesifik (seperti "Student Task Management System") di dalam instruksi, workflow, dan aturan umum agar dapat digunakan kembali untuk proyek perangkat lunak apa pun.

## Quality Checks
1. **Kelengkapan Temuan (Completeness)**: Apakah output menyajikan temuan elisitasi, draf pertanyaan wawancara, dan kebutuhan yang teridentifikasi secara lengkap sesuai dengan format yang ditentukan?
2. **Kesesuaian Sumber (Traceability)**: Apakah semua kebutuhan yang ditemukan dikelompokkan dengan jelas berdasarkan peran stakeholder sumbernya?
3. **Pemberian Label Simulasi**: Apakah seluruh jawaban stakeholder buatan AI telah ditandai secara konsisten dengan label `[SIMULATED]`?
4. **Logika Kebutuhan Implisit**: Apakah kebutuhan implisit yang diidentifikasi memiliki dasar logis yang kuat dan bukan sekadar asumsi fitur acak?
5. **Bebas Ambiguitas (Clarity)**: Apakah deskripsi kebutuhan ditulis secara jelas dan spesifik tanpa menggunakan kata-kata yang bermakna ganda?

## Failure Conditions
1. **Ketiadaan Input Inception (Insufficient Input)**: Menghentikan proses dan meminta klarifikasi jika berkas `01-inception.md` tidak dapat ditemukan atau kosong.
2. **Kontradiksi Kebutuhan Eksplisit**: Menghentikan proses jika terdapat kebutuhan eksplisit dari stakeholder yang saling bertentangan secara mendasar tanpa adanya resolusi yang diusulkan (misalnya stakeholder A meminta sistem gratis total sedangkan stakeholder B meminta pembayaran per transaksi wajib).
3. **Deskripsi Ruang Lingkup Tidak Jelas (Scope Too Vague)**: Menghentikan proses jika ruang lingkup dari berkas inception terlalu kabur sehingga tidak memungkinkan pembuatan pertanyaan wawancara yang terarah dan fokus.

## Example Invocation
```text
Read outputs/reviewed/01-inception.md and skills/02-elicitation/SKILL.md.
Execute the skill exactly as written.
Save the result using the output structure defined in the skill.
Do not invent missing facts. Mark assumptions and open questions explicitly.
```

## Expected Output Example
```markdown
# Requirements Elicitation: Sistem Parkir Digital Kampus

## 1. Teknik Elisitasi yang Digunakan
- **Wawancara Terstruktur**: Digunakan untuk mendapatkan kebutuhan mendalam dari perwakilan Pengelola Parkir dan Keamanan.
- **Observasi Langsung**: Digunakan untuk mengamati alur masuk kendaraan di pintu gerbang kampus.

## 2. Panduan Pertanyaan Wawancara
### A. Untuk Petugas Keamanan
1. Bagaimana alur penanganan pengendara yang kehilangan kartu identitas saat ingin keluar?
2. Apakah sistem perlu merekam nomor pelat kendaraan secara otomatis?

## 3. Catatan Temuan Wawancara (Disimulasikan)
### A. Jawaban Petugas Keamanan
- **Pertanyaan 1**: [SIMULATED] Jika kartu hilang, kami mencocokkan STNK dengan KTP pengendara secara manual sebelum memperbolehkan keluar.
- **Pertanyaan 2**: [SIMULATED] Ya, itu akan sangat membantu untuk mencegah pencurian kendaraan.

## 4. Kebutuhan Eksplisit dan Implisit per Stakeholder
### A. Kebutuhan Petugas Keamanan
- **Eksplisit**:
  - Sistem harus dapat mencatat nomor pelat kendaraan yang masuk.
- **Implisit**:
  - Sistem harus terintegrasi dengan kamera pemindai OCR (Optical Character Recognition) untuk membaca pelat nomor secara otomatis.

## 5. Pertanyaan Lanjutan (Open Questions)
- [OPEN QUESTION] Apakah kamera pemindai OCR sudah disediakan oleh kampus atau harus dibeli secara terpisah?
```
