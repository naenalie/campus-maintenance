# Skill 11: Code Review

## Tujuan
Tujuan dari skill ini adalah untuk memandu AI dalam melakukan peninjauan kode (*Code Review*) secara kritis terhadap perubahan kode (Pull Request) sebelum digabungkan (*merge*) ke branch utama. Langkah ini memastikan kode memenuhi standar kualitas, aturan penulisan kode (*coding standards*), performa, keamanan, dan cakupan pengujian (*test coverage*).

## Kapan Digunakan
Digunakan setiap kali implementasi suatu issue selesai dikerjakan pada branch fitur, sebelum Pull Request disetujui untuk di-merge ke branch `main`.

## Input
*   File kode program yang baru ditulis atau dimodifikasi (Frontend, Backend, Database).
*   File pengujian otomatis yang disertakan dalam perubahan.
*   [issues_plan.md](file:///C:/Users/User/campus-maintenance/docs/planning/issues_plan.md) — Kriteria penerimaan issue terkait.

## Langkah Kerja
1.  **Baca Perubahan Kode (Diff)**: Periksa baris kode yang ditambah, diubah, atau dihapus secara saksama.
2.  **Verifikasi Standar Kode**:
    *   Periksa kepatuhan terhadap aturan TypeScript (tipe data yang ketat, pencegahan `any`).
    *   Periksa kelayakan penamaan variabel, fungsi, kelas, dan komponen.
    *   Periksa adanya kode mati (*dead code*) atau komentar yang tidak diperlukan.
3.  **Evaluasi Kualitas Desain Kode**:
    *   Apakah logika program terlalu kompleks atau sulit dipahami?
    *   Apakah penanganan error (*error handling*) sudah memadai di sisi API Worker?
4.  **Tinjau Aspek Keamanan & Performa**:
    *   Pastikan tidak ada kerentanan keamanan seperti SQL Injection (gunakan binding parameter pada query D1).
    *   Pastikan tidak ada token, kunci API, atau password yang bocor dalam repositori (*secrets leak*).
5.  **Verifikasi Kecukupan Test**:
    *   Apakah kode baru sudah dicakup oleh unit test atau integration test yang relevan?
    *   Apakah test yang ditulis menguji kasus batas (*edge cases*) dan skenario error?
6.  **Sajikan Hasil Review**: Buat laporan peninjauan yang objektif, menunjukkan baris kode yang perlu diperbaiki beserta solusinya, serta berikan keputusan persetujuan.

## Output
File markdown di:
*   [human_review_log.md](file:///C:/Users/User/campus-maintenance/evidence/human_review_log.md) atau dicatat langsung dalam log Pull Request.

## Aturan
*   Gunakan bahasa yang konstruktif dan solutif dalam memberikan catatan review.
*   Jangan pernah menyetujui Pull Request jika ada pengujian otomatis yang gagal atau tidak lulus build.
*   Setiap bug atau celah keamanan yang ditemukan wajib diklasifikasikan berdasarkan tingkat keparahan (*LOW*, *MEDIUM*, *HIGH*).

## Quality Check
*   Apakah semua catatan peninjauan merujuk ke baris kode yang spesifik?
*   Apakah review mencakup evaluasi terhadap kode implementasi sekaligus kode pengujian?
*   Apakah rekomendasi perbaikan yang diberikan disertai contoh kode yang benar?

## Kondisi Gagal
AI harus merekomendasikan penolakan (*Request Changes*) jika:
*   Ditemukan celah keamanan kritis (seperti SQL injection atau hardcoded credentials).
*   Jumlah test otomatis yang ditambahkan tidak memenuhi kriteria minimum yang disepakati untuk issue tersebut.

## Human Review
Bagian yang harus diperiksa manusia:
*   Pemeriksaan akhir persetujuan merger (*Merge Approval*).
*   Verifikasi manual fungsionalitas UI pasca-review.
