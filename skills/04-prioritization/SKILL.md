# Negotiation and Prioritization

## Purpose
Mengidentifikasi konflik antar-stakeholder, memetakan ketergantungan (dependencies) antar-kebutuhan, memprioritaskan kebutuhan fungsional menggunakan metode MoSCoW, serta mendokumentasikan alasan keputusan dan analisis trade-off.

## When to Use
Gunakan setelah spesifikasi kebutuhan selesai (setelah Skill 3), sebelum masuk ke tahap pengujian atau implementasi.

## Inputs
- Dokumen spesifikasi kebutuhan (`outputs/reviewed/03-requirements.md`)

## Required Context
AI harus membaca `outputs/reviewed/03-requirements.md`.

## Workflow
1. Identifikasi minimal satu konflik kepentingan potensial antar-stakeholder (misalnya antara Dosen, Mahasiswa, atau Administrator) dan usulkan solusinya.
2. Analisis ketergantungan (dependency) antar kebutuhan fungsional (FR) yang telah didefinisikan sebelumnya.
3. Petakan semua Kebutuhan Fungsional (FR-01, FR-02, dst.) ke dalam empat kategori MoSCoW:
   - **Must Have** (Wajib ada)
   - **Should Have** (Seharusnya ada jika memungkinkan)
   - **Could Have** (Bagus jika ada tetapi tidak krusial)
   - **Won't Have** (Tidak akan diimplementasikan pada rilis ini)
4. Tuliskan penjelasan/justifikasi logis untuk setiap penempatan prioritas kebutuhan.
5. Analisis trade-off yang terjadi dalam sistem (misal keamanan vs performa).
6. Jalankan quality checks untuk memastikan konsistensi pemetaan.

## Output Format
Output harus berupa file Markdown (`05-prioritization.md`) dengan struktur berikut:
```markdown
# Negotiation and Prioritization: Student Task Management System

## 1. Analisis Konflik Stakeholder dan Resolusi
- **Konflik**: [Deskripsi konflik, contoh: Dosen vs Admin terkait ukuran berkas]
- **Resolusi**: [Solusi atau kompromi yang diputuskan]

## 2. Ketergantungan Kebutuhan (Requirement Dependencies)
- **[Kebutuhan A]** bergantung pada **[Kebutuhan B]** karena [Alasan teknis/alur proses]

## 3. Prioritisasi MoSCoW
### A. Must Have
- **[FR-XX]**: [Justifikasi singkat pemilihan prioritas ini]
- **[FR-YY]**: [Justifikasi singkat]

### B. Should Have
- **[FR-ZZ]**: [Justifikasi singkat]

### C. Could Have
- **[FR-AA]**: [Justifikasi singkat]

### D. Won't Have (for this release)
- **[FR-BB]**: [Justifikasi singkat]

## 4. Analisis Trade-off dan Justifikasi Keputusan
- **Trade-off**: [Deskripsi trade-off, contoh: Keamanan otentikasi ketat vs Usability login cepat]
- **Keputusan**: [Justifikasi keputusan yang diambil]
```

## Rules
- Seluruh kebutuhan fungsional (FR) yang tertera di `03-requirements.md` wajib dipetakan tanpa terkecuali.
- Kategori **Must Have** hanya boleh diisi oleh fungsionalitas inti yang jika tidak ada, sistem tidak dapat berjalan (core business).
- Tandai setiap asumsi secara eksplisit dengan awalan `[ASSUMPTION]`.
- Tandai informasi yang belum lengkap dengan awalan `[OPEN QUESTION]`.

## Quality Checks
- Apakah setiap penempatan prioritas MoSCoW memiliki alasan bisnis atau teknis yang rasional?
- Apakah analisis konflik membedakan masalah bisnis dari solusi teknis?
- Apakah analisis ketergantungan (dependencies) logis dan bebas dari circular dependency?

## Failure Conditions
- Menghentikan proses jika berkas `03-requirements.md` tidak ditemukan.
- Menghentikan proses jika ada kebutuhan fungsional (FR) yang terlewat atau tidak dipetakan dalam daftar MoSCoW.

## Example Invocation
```text
Read outputs/reviewed/03-requirements.md and skills/04-prioritization/SKILL.md.
Execute the skill exactly as written.
Save the result using the output structure defined in the skill.
Do not invent missing facts. Mark assumptions and open questions explicitly.
```

## Expected Output Example
```markdown
# Negotiation and Prioritization: Student Task Management System

## 1. Analisis Konflik Stakeholder dan Resolusi
- **Konflik**: Dosen menginginkan kapasitas penyimpanan file tugas tidak dibatasi untuk dokumen berukuran besar, sedangkan Administrator memiliki keterbatasan ruang penyimpanan server.
- **Resolusi**: Membatasi unggahan file mahasiswa maksimal 20 MB per file, yang dinilai cukup untuk dokumen PDF/Word akademik umum.
...
```
