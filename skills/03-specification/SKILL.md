# Requirements Elaboration and Specification

## Purpose
Tujuan dari skill ini adalah untuk memandu AI dalam merumuskan dokumen spesifikasi kebutuhan perangkat lunak formal (SRS) secara detail dan terstruktur. Skill ini memandu penyusunan Kebutuhan Fungsional (Functional Requirements) dengan pengenal unik, Kebutuhan Non-Fungsional (Non-Functional Requirements) yang terukur, Aturan Bisnis (Business Rules), serta User Stories beserta Kriteria Penerimaannya (Acceptance Criteria).

## When to Use
Digunakan setelah tahap elisitasi kebutuhan selesai (setelah Skill 2) dan sebelum tahap negosiasi, prioritisasi, atau implementasi program dimulai.

## Inputs
- Berkas keluaran dari Skill 2 (`outputs/reviewed/02-elicitation.md`).
- Catatan stakeholder tambahan (jika ada).

## Required Context
Berkas elisitasi kebutuhan (`outputs/reviewed/02-elicitation.md`).

## Workflow
1. **Analisis Kebutuhan dari Elisitasi**: Bacalah berkas `02-elicitation.md` secara mendalam untuk memetakan semua kebutuhan eksplisit dan implisit ke bentuk formal.
2. **Definisikan Kebutuhan Fungsional (FR)**: Rumuskan minimal 8 Kebutuhan Fungsional sistem yang spesifik. Berikan pengenal unik secara berurutan mulai dari `FR-01` hingga minimal `FR-08`.
3. **Definisikan Kebutuhan Non-Fungsional (NFR)**: Rumuskan minimal 4 Kebutuhan Non-Fungsional yang mencakup aspek kualitas (seperti performa, keamanan, keandalan, integritas data, atau kegunaan). Berikan pengenal unik mulai dari `NFR-01` s.d. `NFR-04`.
4. **Kuantifikasi Kebutuhan Non-Fungsional**: Pastikan seluruh NFR tidak menggunakan kata-kata ambigu dan memiliki metrik pengukuran yang jelas (misalnya: waktu respons, persentase ketersediaan, kapasitas penyimpanan).
5. **Definisikan Aturan Bisnis (BR)**: Rumuskan minimal 2 Aturan Bisnis (Business Rules) dengan pengenal unik `BR-01` dan `BR-02` yang mendikte batasan operasional atau logika proses bisnis sistem.
6. **Penyusunan User Stories**: Buatlah minimal 6 User Stories menggunakan format standar: "As a [role], I want to [action], so that [benefit]". Berikan pengenal unik mulai dari `US-01` s.d. `US-06`.
7. **Penyusunan Kriteria Penerimaan (AC)**: Definisikan minimal 2 Kriteria Penerimaan (Acceptance Criteria) untuk setiap User Story dengan pengenal unik (seperti `AC-01.1`, `AC-01.2`). Gunakan format skenario atau checklist pengujian yang jelas.
8. **Pemisahan Dokumen**: Pisahkan spesifikasi formal (FR, NFR, BR) ke dalam berkas `03-requirements.md` dan representasi lincah (User Stories & AC) ke dalam berkas `04-user-stories.md`.
9. **Jalankan Quality Checks**: Lakukan verifikasi terhadap kejelasan, keunikan ID, dan ketiadaan kata ambigu sebelum menyimpan hasil.

## Output Format
Skill ini wajib menghasilkan dua berkas output:

### Berkas 1: `outputs/reviewed/03-requirements.md`
```markdown
# Requirements Specification: [Nama Proyek]

## 1. Functional Requirements (FR)
- **FR-01**: [Deskripsi kebutuhan fungsional detail]
- **FR-02**: [Deskripsi kebutuhan fungsional detail]
... (minimal FR-01 sampai FR-08)

## 2. Non-Functional Requirements (NFR)
- **NFR-01**: [Deskripsi kebutuhan non-fungsional terukur]
- **NFR-02**: [Deskripsi kebutuhan non-fungsional terukur]
... (minimal NFR-01 sampai NFR-04)

## 3. Business Rules (BR)
- **BR-01**: [Deskripsi aturan/kebijakan bisnis]
- **BR-02**: [Deskripsi aturan/kebijakan bisnis]
... (minimal BR-01 sampai BR-02)
```

### Berkas 2: `outputs/reviewed/04-user-stories.md`
```markdown
# User Stories and Acceptance Criteria: [Nama Proyek]

## 1. User Story 1 (US-01)
- **Format**: As a [role], I want to [action], so that [benefit].
- **Acceptance Criteria**:
  - **AC-01.1**: [Kriteria penerimaan 1]
  - **AC-01.2**: [Kriteria penerimaan 2]

## 2. User Story 2 (US-02)
... (minimal US-01 sampai US-06, masing-masing memiliki minimal 2 AC)
```

## Rules
1. **Pemberian ID Unik**: Setiap kebutuhan fungsional (FR), non-fungsional (NFR), aturan bisnis (BR), user story (US), dan kriteria penerimaan (AC) wajib memiliki pengenal unik yang konsisten.
2. **Ketiadaan Kata Ambigu**: Dilarang menggunakan kata-kata subjektif seperti "cepat", "mudah", "aman", "ramah pengguna", "bagus" tanpa menyertakan kriteria metrik terukur (misalnya: "waktu respons < 2 detik").
3. **Pemisahan Jenis Kebutuhan**: Kebutuhan Fungsional (apa yang dilakukan sistem) dan Kebutuhan Non-Fungsional (bagaimana kualitas sistem bekerja) harus dipisahkan secara tegas dan tidak boleh dicampur.
4. **Struktur Minimum**: Output wajib memenuhi batas kuantitas minimum: 8 FR, 4 NFR, 2 BR, 6 User Stories, dan 2 AC per User Story.
5. **Kemandirian Proyek**: Skill ini harus ditulis secara generik tanpa menyebutkan nama proyek spesifik (seperti "Student Task Management System") di dalam instruksi, workflow, dan aturan umum agar dapat digunakan kembali untuk proyek perangkat lunak apa pun.

## Quality Checks
1. **Kelengkapan Kuantitatif**: Apakah jumlah FR (min. 8), NFR (min. 4), BR (min. 2), US (min. 6), dan AC per US (min. 2) telah terpenuhi seluruhnya?
2. **Keunikan Identifikasi**: Apakah seluruh kebutuhan dan cerita pengguna telah diasosiasikan dengan ID unik yang konsisten dan tidak ada duplikasi ID?
3. **Keterukuran Non-Fungsional (Feasibility/Testability)**: Apakah semua kebutuhan non-fungsional memiliki batas ukuran kuantitatif yang dapat diuji secara objektif?
4. **Pemisahan Kategori**: Apakah tidak ada kebutuhan fungsional yang dimasukkan secara keliru ke dalam kategori non-fungsional atau aturan bisnis, dan sebaliknya?
5. **Ketiadaan Kata Ambigu**: Apakah dokumen terbebas dari kata-kata tidak terukur seperti "fast", "easy", "good", atau sejenisnya di seluruh deskripsi kebutuhan?

## Failure Conditions
1. **Ketiadaan Input Elisitasi (Insufficient Input)**: Menghentikan proses dan meminta klarifikasi jika berkas `02-elicitation.md` tidak dapat ditemukan atau kosong.
2. **Kebutuhan Tidak Terukur**: Menghentikan proses jika terdapat Kebutuhan Non-Fungsional yang didefinisikan secara subjektif tanpa kriteria metrik, dan menolak melanjutkan sebelum kriteria tersebut diberikan atau diasumsikan secara jelas.
3. **Kekurangan Jumlah Minimum**: Menghentikan proses jika deskripsi masukan tidak mencukupi untuk menghasilkan jumlah minimum kebutuhan (8 FR, 4 NFR, 2 BR, 6 US, 2 AC per US) yang realistis untuk proyek.

## Example Invocation
```text
Read outputs/reviewed/02-elicitation.md and skills/03-specification/SKILL.md.
Execute the skill exactly as written.
Save the result using the output structure defined in the skill.
Do not invent missing facts. Mark assumptions and open questions explicitly.
```

## Expected Output Example
```markdown
# Requirements Specification: Sistem Parkir Digital Kampus

## 1. Functional Requirements (FR)
- **FR-01**: Sistem harus dapat mendeteksi nomor pelat kendaraan lewat kamera gerbang masuk.
- **FR-02**: Sistem harus dapat menampilkan sisa slot parkir kosong pada layar gerbang utama.
- **FR-03**: Sistem harus dapat mencatat waktu masuk kendaraan secara otomatis.
- **FR-04**: Sistem harus dapat mencatat waktu keluar kendaraan secara otomatis.
- **FR-05**: Sistem harus dapat mengeluarkan sinyal untuk membuka palang otomatis setelah kartu divalidasi.
- **FR-06**: Administrator harus dapat memblokir kartu identitas yang dilaporkan hilang.
- **FR-07**: Petugas keamanan harus dapat membuka palang pintu secara manual lewat konsol admin.
- **FR-08**: Sistem harus dapat membuat laporan mingguan jumlah kendaraan masuk dan keluar.

## 2. Non-Functional Requirements (NFR)
- **NFR-01**: Waktu pembacaan kartu RFID dan pembukaan palang pintu otomatis tidak boleh melebihi 1,5 detik.
- **NFR-02**: Sistem harus memiliki ketersediaan (uptime) minimal 99,9% dalam setahun.
- **NFR-03**: Seluruh transmisi data kartu RFID ke database kampus wajib dienkripsi menggunakan protokol HTTPS dengan TLS 1.3.
- **NFR-04**: Penyimpanan database harus mampu menyimpan data log transaksi parkir hingga minimal 100.000 entri sebelum memerlukan pengarsipan.

## 3. Business Rules (BR)
- **BR-01**: Kartu identitas yang dapat digunakan hanya kartu aktif yang terdaftar dalam sistem akademik kampus.
- **BR-02**: Kendaraan yang berada di area parkir lebih dari 24 jam tanpa izin khusus akan ditandai oleh sistem sebagai pelanggaran keamanan.
```
