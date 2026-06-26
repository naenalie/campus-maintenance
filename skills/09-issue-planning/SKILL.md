# Skill 09: Issue Planning

## Tujuan
Tujuan dari skill ini adalah untuk memandu AI dalam memetakan dokumen persyaratan (*requirements*) dan desain menjadi rencana kerja terperinci berupa daftar pekerjaan (*work items* / *GitHub Issues*). Hal ini menjamin keterlacakan (*traceability*) dari kebutuhan bisnis hingga ke baris kode yang ditulis.

## Kapan Digunakan
Digunakan setelah semua dokumen desain disetujui (Milestone 2), sebelum memulai proses pengodean.

## Input
*   [requirements.md](file:///C:/Users/User/campus-maintenance/docs/requirements/requirements.md) — Dokumen kebutuhan fungsional (FR) dan aturan bisnis (BR).
*   [user_stories.md](file:///C:/Users/User/campus-maintenance/docs/requirements/user_stories.md) — Daftar User Stories dan Acceptance Criteria (AC).
*   [database.md](file:///C:/Users/User/campus-maintenance/docs/design/database.md) — Desain skema tabel database.
*   [api.md](file:///C:/Users/User/campus-maintenance/docs/design/api.md) — Spesifikasi API.

## Langkah Kerja
1.  **Baca Input**: Pahami seluruh kebutuhan fungsional dan kriteria penerimaan (Acceptance Criteria).
2.  **Pecah Pekerjaan (Dekomposisi)**: Bagi pengerjaan sistem menjadi unit-unit pekerjaan kecil yang independen dan bertahap (misal: inisialisasi D1, endpoint backend, UI pelapor, UI admin, dst.).
3.  **Tulis Issue Berdasarkan Template**: Setiap pekerjaan wajib didokumentasikan dalam format GitHub Issue yang mencakup:
    *   ID/Nama Fitur (misal: `[FR-01] Membuat Laporan Baru`).
    *   Persyaratan yang dirujuk.
    *   User Story yang sesuai.
    *   Acceptance Criteria (kriteria penerimaan) yang harus terpenuhi.
    *   Daftar tugas pengerjaan (tampilan, backend API, pengujian otomatis, traceability).
    *   Kondisi selesai (*Definition of Done*).
4.  **Tentukan Urutan Pengerjaan**: Susun rencana pengerjaan berdasarkan dependensi (misal database migration dikerjakan sebelum backend API, backend API dikerjakan sebelum frontend UI).
5.  **Lakukan Quality Check**: Pastikan jumlah issue minimum terpenuhi dan tidak ada requirement yang terlewatkan.
6.  **Sajikan Output**: Hasilkan daftar issue terperinci dalam format dokumen rencana kerja.

## Output
File markdown di:
*   [issues_plan.md](file:///C:/Users/User/campus-maintenance/docs/planning/issues_plan.md) — Daftar rancangan GitHub Issues dan rencana rilis pengerjaan.

## Aturan
*   Buat minimal 10 GitHub Issues terpisah yang mewakili seluruh cakupan fungsionalitas sistem.
*   Setiap issue wajib merujuk secara jelas ke ID Requirement (FR-XX) dan ID User Story (US-XX).
*   Tugas pengerjaan dalam issue harus mencakup pembuatan kode program dan penulisan test otomatis yang relevan.

## Quality Check
*   Apakah seluruh 12+ FR dan 10+ User Stories telah terwakili dalam minimal 10 Issues?
*   Apakah kriteria penerimaan (AC) di setiap issue ditulis secara jelas dan dapat diuji?
*   Apakah urutan pengerjaan logis dan meminimalkan konflik dependensi?

## Kondisi Gagal
AI harus berhenti jika:
*   Terdapat fungsionalitas wajib (FR) yang tidak memiliki issue pengerjaan.
*   Kriteria selesai (*Definition of Done*) dari suatu issue tidak menyertakan pengujian otomatis (*automated testing*).

## Human Review
Bagian yang harus diperiksa manusia:
*   Realistis atau tidaknya estimasi pembagian tugas di dalam setiap issue.
*   Prioritas urutan pengerjaan issue.
