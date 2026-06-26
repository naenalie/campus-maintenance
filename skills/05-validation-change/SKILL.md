# Requirements Validation and Change Management

## Purpose
Melakukan validasi terhadap spesifikasi kebutuhan berdasarkan kriteria kualitas (Clarity, Completeness, Consistency, Feasibility, Testability, Traceability) serta melakukan analisis dampak (Impact Analysis) terhadap permintaan perubahan kebutuhan (Change Request).

## When to Use
Gunakan pada tahap akhir analisis kebutuhan untuk menyepakati baseline, atau ketika ada permintaan perubahan kebutuhan baru selama siklus hidup proyek.

## Inputs
- Berkas spesifikasi kebutuhan (`outputs/reviewed/03-requirements.md`)
- Berkas prioritisasi (`outputs/reviewed/05-prioritization.md`)

## Required Context
AI harus membaca `outputs/reviewed/03-requirements.md` dan `outputs/reviewed/05-prioritization.md`.

## Workflow
1. Pilih minimal 5 Kebutuhan Fungsional (FR) dari berkas spesifikasi untuk divalidasi.
2. Periksa setiap kebutuhan tersebut berdasarkan 6 kriteria berikut:
   - **Clarity**: Apakah kebutuhan ditulis dengan jelas dan bebas dari ambiguitas?
   - **Completeness**: Apakah informasi pendukung sudah lengkap?
   - **Consistency**: Apakah kebutuhan tidak bertentangan dengan kebutuhan lain?
   - **Feasibility**: Apakah kebutuhan realistis untuk diimplementasikan secara teknis?
   - **Testability**: Apakah kebutuhan dapat diuji dan diverifikasi keberhasilannya?
   - **Traceability**: Apakah kebutuhan memiliki pelacakan ke stakeholder/sumber?
3. Dokumentasikan hasil validasi dalam bentuk tabel evaluasi beserta rekomendasi perbaikannya.
4. Simulasikan minimal 1 permintaan perubahan kebutuhan (Change Request) baru (misalnya fitur deteksi plagiarisme berkas tugas).
5. Lakukan analisis dampak (Impact Analysis) dari perubahan tersebut terhadap kebutuhan lain, prioritas MoSCoW, serta kompleksitas sistem.
6. Berikan keputusan akhir (Disetujui, Ditolak, atau Ditunda) beserta alasannya.
7. Jalankan quality checks.

## Output Format
Skill ini menghasilkan dua berkas output utama:

### Berkas 1: `outputs/reviewed/07-validation.md`
```markdown
# Requirements Validation Report: Student Task Management System

## 1. Hasil Evaluasi Kebutuhan (Minimal 5 FR)
| ID FR | Deskripsi Kebutuhan | Clarity | Completeness | Consistency | Feasibility | Testability | Traceability | Evaluasi / Tindakan Korektif |
|---|---|---|---|---|---|---|---|---|
| FR-01 | [Deskripsi] | [Ya/Tidak] | [Ya/Tidak] | [Ya/Tidak] | [Ya/Tidak] | [Ya/Tidak] | [Ya/Tidak] | [Catatan evaluasi & usulan revisi jika ada] |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

## 2. Kesimpulan Baseline Kebutuhan
[Ringkasan apakah spesifikasi kebutuhan siap dijadikan baseline atau memerlukan revisi besar]
```

### Berkas 2: `outputs/reviewed/08-change-request.md`
```markdown
# Change Request: [Judul Perubahan, Contoh: Integrasi Plagiarism Detection]

## 1. Deskripsi Perubahan
[Penjelasan fitur baru atau modifikasi yang diusulkan]

## 2. Alasan Perubahan (Rationale)
[Mengapa perubahan ini diperlukan]

## 3. Kebutuhan yang Terdampak (Affected Requirements)
- **[FR-XX]**: [Dampak langsung/tidak langsung]
- **[NFR-YY]**: [Dampak terhadap kualitas non-fungsional, misal performa penyimpanan]

## 4. Analisis Dampak (Impact Analysis)
- **Dampak Fungsional**: [Bagaimana alur kerja sistem berubah]
- **Dampak Kualitas (Non-Fungsional)**: [Dampak ke performa, keamanan, dll.]
- **Dampak Prioritas**: [Apakah fitur baru ini masuk Must/Should/Could Have]

## 5. Keputusan dan Justifikasi
- **Keputusan**: [Disetujui / Ditolak / Ditangguhkan]
- **Justifikasi**: [Alasan rasional di balik keputusan tersebut]
```

## Rules
- Evaluasi validasi harus dilakukan secara kritis. Jika ada kekurangan (misal parameter pengujian kurang jelas), tuliskan secara jujur di bagian rekomendasi perbaikan.
- Analisis dampak pada Change Request harus menganalisis tidak hanya dampak fungsional, tetapi juga dampak terhadap aspek kualitas non-fungsional (seperti beban server atau waktu respons).
- Tandai setiap asumsi secara eksplisit dengan awalan `[ASSUMPTION]`.
- Tandai informasi yang belum lengkap dengan awalan `[OPEN QUESTION]`.

## Quality Checks
- Apakah tabel validasi diisi lengkap untuk 5 kebutuhan dengan penilaian yang logis?
- Apakah analisis dampak menilai pengaruh perubahan terhadap kebutuhan non-fungsional (NFR) yang sudah ada?
- Apakah keputusan perubahan memiliki dasar pertimbangan teknis atau bisnis yang masuk akal?

## Failure Conditions
- Menghentikan proses jika berkas `03-requirements.md` tidak ditemukan.
- Menghentikan proses jika jumlah kebutuhan yang divalidasi kurang dari 5, atau tidak ada analisis Change Request.

## Example Invocation
```text
Read outputs/reviewed/03-requirements.md and skills/05-validation-change/SKILL.md.
Execute the skill exactly as written.
Save the result using the output structure defined in the skill.
Do not invent missing facts. Mark assumptions and open questions explicitly.
```

## Expected Output Example
```markdown
# Requirements Validation Report: Student Task Management System

## 1. Hasil Evaluasi Kebutuhan (Minimal 5 FR)
| ID FR | Deskripsi Kebutuhan | Clarity | Completeness | Consistency | Feasibility | Testability | Traceability | Evaluasi / Tindakan Korektif |
|---|---|---|---|---|---|---|---|---|
| FR-01 | Dosen dapat mengunggah lembar tugas... | Ya | Ya | Ya | Ya | Ya | Ya | Kebutuhan sudah jelas dan siap diimplementasikan. |
...
```
