# Skill 12: Test Planning

## Tujuan
Tujuan dari skill ini adalah untuk memandu AI dalam merancang dokumen rencana pengujian (*Test Plan*) yang komprehensif. Dokumen ini mendefinisikan strategi pengujian, cakupan pengujian (unit, integrasi, penerimaan), alat yang digunakan, skenario pengujian rinci untuk setiap fungsionalitas, kasus uji batas (*edge cases*), serta cara mengukur kesuksesan pengujian.

## Kapan Digunakan
Digunakan sebelum menulis kode pengujian otomatis atau menjalankan pengujian manual (akhir Milestone 2 atau awal Milestone 5).

## Input
*   [requirements.md](file:///C:/Users/User/campus-maintenance/docs/requirements/requirements.md) — Dokumen kebutuhan fungsional (FR) dan non-fungsional (NFR).
*   [user_stories.md](file:///C:/Users/User/campus-maintenance/docs/requirements/user_stories.md) — Daftar User Stories dan kriteria penerimaan (AC).

## Langkah Kerja
1.  **Baca Input**: Pahami seluruh kebutuhan sistem dan alur pengguna yang perlu diverifikasi.
2.  **Tentukan Strategi Pengujian**:
    *   Tentukan lingkup pengujian otomatis (Unit testing untuk fungsi utilitas dan validasi input, Integration testing untuk endpoint API backend).
    *   Tentukan lingkup pengujian manual (Acceptance testing untuk verifikasi UI end-to-end).
3.  **Tulis Skenario Pengujian**:
    *   Susun daftar kasus uji positif (skenario normal/sukses).
    *   Susun daftar kasus uji negatif dan kasus batas (misal: deskripsi kurang dari 20 karakter, lokasi kosong, token tidak valid, dll.).
4.  **Tentukan Kriteria Kelulusan**: Definisikan kondisi di mana sistem dinyatakan lulus pengujian (misal: 100% test otomatis lulus, seluruh 12+ FR terverifikasi).
5.  **Lakukan Quality Check**: Pastikan rencana pengujian mencakup semua fungsionalitas wajib dan memenuhi syarat minimum tugas (minimal 20 automated tests).
6.  **Sajikan Output**: Tulis rencana pengujian ke dalam file Markdown.

## Output
File markdown di:
*   [test_plan.md](file:///C:/Users/User/campus-maintenance/docs/testing/test_plan.md) — Dokumen rencana pengujian komprehensif.

## Aturan
*   Setiap skenario pengujian wajib memiliki langkah-langkah pengujian yang jelas, input data uji yang disimulasikan, dan hasil yang diharapkan (*expected results*).
*   Hubungkan setiap skenario uji dengan ID Requirement (FR-XX) atau ID User Story (US-XX) untuk menjaga keterlacakan.
*   Cakupan test otomatis minimal harus mencapai 20 kasus uji yang terbagi ke dalam unit test dan integration test.

## Quality Check
*   Apakah seluruh 12+ FR memiliki minimal satu skenario pengujian yang memverifikasinya?
*   Apakah rencana pengujian menyertakan skenario pengujian negatif dan kasus batas?
*   Apakah alat pengujian yang dipilih (seperti Vitest) terdokumentasi dengan jelas cara instalasi dan menjalankannya?

## Kondisi Gagal
AI harus berhenti jika:
*   Total target pengujian otomatis yang direncanakan kurang dari 20 kasus uji.
*   Skenario pengujian tidak mencakup pengujian terhadap aturan bisnis (seperti validasi deskripsi minimal 20 karakter).

## Human Review
Bagian yang harus diperiksa manusia:
*   Kelayakan skenario pengujian manual yang direncanakan.
*   Konfirmasi kesesuaian antara ekspektasi hasil pengujian dengan kebutuhan pengguna riil.
