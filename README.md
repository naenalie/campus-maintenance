# Campus Service Request and Maintenance System

Tugas Proyek Rekayasa Perangkat Lunak (Software Engineering) berbantuan AI.

## Informasi Mahasiswa
*   **Nama**: Wirajaya, Gwendeline Ellen
*   **NIM**: 105022410074
*   **Mata Kuliah**: Software Engineering
*   **Dosen**: Andrew Tanny Liem
*   **Repositori GitHub**: [https://github.com/naenalie/campus-maintenance](https://github.com/naenalie/campus-maintenance)
*   **URL Publik Cloudflare**: [https://campus-maintenance.pages.dev](https://campus-maintenance.pages.dev) (atau URL kustom yang dikonfigurasikan di Cloudflare Pages)

---

## 1. Deskripsi Proyek
Aplikasi **Campus Service Request and Maintenance System** dirancang untuk memudahkan dosen dan mahasiswa dalam melaporkan masalah/kerusakan fasilitas kampus (seperti AC bocor, internet putus, proyektor mati, dll.). 

Laporan akan diproses secara transparan melalui alur terintegrasi:
```
[Submitted] ➔ [Under Review] ➔ [Assigned] ➔ [In Progress] ➔ [Resolved] ➔ [Closed]
```
Sistem memfasilitasi komunikasi antar-aktor menggunakan kolom komentar dan menjamin akuntabilitas data melalui pencatatan riwayat status otomatis.

---

## 2. Struktur Repositori & Folder
```
campus-maintenance/
├── .github/workflows/      # CI/CD: Automated Tests & Build
├── database/migrations/    # Migrasi Skema Tabel D1 SQLite
├── docs/                   # Dokumentasi Persyaratan & Desain
│   ├── requirements/       # Inception, Elicitation, FR/NFR, Stories, dll.
│   └── design/             # Architecture, Database schema, API spec, UI flow
├── skills/                 # 15 File AI SKILL.md
├── src/                    # Frontend React + Vite
│   ├── utils/              # Modul Validasi
│   ├── App.tsx             # State & Tampilan Utama SPA
│   └── index.css           # Sistem Desain Visual Premium
├── worker/                 # Backend Cloudflare Worker REST API
│   └── index.ts            # API Router & query database D1
└── tests/                  # Pengujian Otomatis (Vitest)
    ├── unit/               # 14 Kasus Uji Validasi Form & Generator
    └── integration/        # 6 Kasus Uji Endpoint API & Mock DB
```

---

## 3. Cara Menjalankan Proyek Secara Lokal

### Persiapan
Pastikan Anda sudah menginstal Node.js v22 dan Git.

### 1. Kloning Repositori
```bash
git clone https://github.com/naenalie/campus-maintenance.git
cd campus-maintenance
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Migrasi Database D1 Lokal
```bash
npx wrangler d1 execute campus-maintenance-db --local --file=database/migrations/0001_initial.sql
```

### 4. Jalankan Aplikasi di Server Lokal
```bash
npm run dev
```
Buka browser dan buka `http://localhost:5173`. Anda dapat mengubah peran di pojok kanan atas untuk mensimulasikan peran Pelapor, Admin, Teknisi, atau Manajer.

---

## 4. Cara Menjalankan Pengujian Otomatis
Kami menggunakan **Vitest** untuk pengujian. Proyek ini dilengkapi dengan **20 pengujian otomatis** yang mencakup unit test dan integration test.

Jalankan perintah berikut:
```bash
npm run test
```

---

## 5. Fitur Kunci & Ketentuan Minimum yang Dipenuhi
1.  **15 AI Skills**: Tersimpan lengkap di folder [skills/](skills/) sesuai format standar.
2.  **12+ Functional Requirements**: Terpenuhi 14 FR terdokumentasi lengkap di [requirements.md](docs/requirements/requirements.md).
3.  **6+ Non-Functional Requirements**: Terpenuhi 6 NFR di [requirements.md](docs/requirements/requirements.md).
4.  **5+ Business Rules**: Terpenuhi 5 BR untuk mengatur transisi status dan otorisasi.
5.  **10+ User Stories**: Terpenuhi 11 User Stories dengan minimal 2 Acceptance Criteria per story di [user_stories.md](docs/requirements/user_stories.md).
6.  **20 Automated Tests**: Lolos 20 tests (14 unit test + 6 integration test).
7.  **1 Change Request**: Analisis dampak status `CANCELLED` terdokumentasi di [change_request.md](docs/requirements/change_request.md).

---

## 6. Keterbatasan Sistem (Limitations)
*   **Autentikasi Simulasi**: Sistem login menggunakan switch dropdown visual untuk keperluan demo dan tidak terhubung ke autentikasi riil (OAuth/SSO).
*   **Media Gambar**: Tidak ada fitur unggah gambar kerusakan fasilitas karena keterbatasan penyimpanan objek gratis.
*   **Notifikasi Real-time**: Perubahan status hanya ter-update saat halaman direfresh atau dimuat ulang (tidak menggunakan WebSockets/Push Notification).
