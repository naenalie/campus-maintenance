# Skill 10: Implementation

## Tujuan
Tujuan dari skill ini adalah untuk memandu AI dalam menulis kode program yang bersih (*clean code*), aman, dan teruji untuk menyelesaikan satu per satu item pekerjaan (*GitHub Issue*) yang telah direncanakan sebelumnya, baik di sisi backend API maupun frontend UI.

## Kapan Digunakan
Digunakan selama tahap konstruksi/pengembangan aplikasi (Milestone 3 dan Milestone 4), setiap kali ada issue baru yang akan diimplementasikan kodenya.

## Input
*   [issues_plan.md](file:///C:/Users/User/campus-maintenance/docs/planning/issues_plan.md) — Detail spesifikasi issue yang akan dikerjakan.
*   [database.md](file:///C:/Users/User/campus-maintenance/docs/design/database.md) & [api.md](file:///C:/Users/User/campus-maintenance/docs/design/api.md) — Skema database dan spesifikasi endpoint.
*   [ui_flow.md](file:///C:/Users/User/campus-maintenance/docs/design/ui_flow.md) & [wireframe.md](file:///C:/Users/User/campus-maintenance/docs/design/wireframe.md) — Rancangan UI/UX.

## Langkah Kerja
1.  **Baca Input**: Pahami dengan jelas ruang lingkup issue, kriteria penerimaan (Acceptance Criteria), dan tugas spesifik yang harus diselesaikan.
2.  **Buat Git Branch Baru**: Sebelum menulis kode, pastikan pengerjaan dilakukan di branch git terisolasi (misal: `feature/FR-01-create-request`).
3.  **Terapkan Prinsip TDD (Opsional/Direkomendasikan)**: Tulis pengujian otomatis terlebih dahulu sebelum menulis kode implementasi, atau minimal tulis kode implementasi bersamaan dengan pengujiannya.
4.  **Tulis Kode Implementasi**:
    *   *Backend*: Buat rute API, validasi input (seperti panjang deskripsi minimal 20 karakter), eksekusi query D1 SQL, dan penanganan error.
    *   *Frontend*: Buat komponen UI React, state handling, integrasi dengan API backend, styling CSS kustom premium, dan efek interaktif.
5.  **Jalankan Linting & Type Checking**: Pastikan tidak ada error kompilasi TypeScript atau pelanggaran aturan ESLint.
6.  **Lakukan Pengujian Lokal**: Jalankan server lokal (`npm run dev`) dan verifikasi fungsionalitas secara manual di browser.
7.  **Sajikan Output**: Simpan kode program pada file-file yang sesuai dan commit perubahan ke Git.

## Output
*   Kode program yang diimplementasikan di folder `src/`, `worker/`, atau `database/`.
*   File pengujian otomatis baru di folder `tests/`.

## Aturan
*   Gunakan TypeScript dengan tipe data yang ketat (`strict: true`). Hindari penggunaan tipe data `any` secara sembarangan.
*   Patuhi *Single Responsibility Principle* (satu fungsi/komponen hanya menangani satu tugas spesifik).
*   Gunakan kustom CSS yang bersih dan terstruktur untuk frontend. Jangan biarkan elemen visual terlihat polos atau tidak rapi.
*   Jangan memodifikasi file di luar ruang lingkup issue yang sedang dikerjakan.

## Quality Check
*   Apakah kode yang ditulis menyelesaikan seluruh kriteria penerimaan (AC) pada issue bersangkutan?
*   Apakah semua unit test yang dibuat lulus tanpa error?
*   Apakah kode bebas dari kredensial sensitif yang ditulis keras (*hardcoded secrets*)?

## Kondisi Gagal
AI harus berhenti jika:
*   Terjadi error kompilasi TypeScript atau kegagalan build yang tidak bisa diatasi.
*   Kode implementasi melanggar batasan arsitektur (misal: memanggil database langsung dari frontend tanpa melalui backend API).

## Human Review
Bagian yang harus diperiksa manusia:
*   Keterbacaan kode (*code readability*) dan penggunaan penamaan variabel yang deskriptif.
*   Struktur logika penanganan kondisi error (*error handling*) pada API.
