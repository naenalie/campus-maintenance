# Skill 08: UI Design

## Tujuan
Tujuan dari skill ini adalah untuk memandu AI dalam merancang antarmuka pengguna (UI), tata letak halaman (layout), skema warna, tipografi, dan navigasi (UI Flow), serta membuat sketsa tata letak komponen (wireframe) untuk aplikasi web agar memenuhi kebutuhan kegunaan (*usability*) dan kenyamanan pengguna (*user experience*).

## Kapan Digunakan
Digunakan setelah rancangan API dan database disetujui (Milestone 2), sebelum memulai coding untuk halaman frontend React.

## Input
*   [requirements.md](file:///C:/Users/User/campus-maintenance/docs/requirements/requirements.md) — Dokumen kebutuhan fungsional (terutama kebutuhan halaman web dan interaksi).
*   [user_stories.md](file:///C:/Users/User/campus-maintenance/docs/requirements/user_stories.md) — Skenario interaksi pengguna.

## Langkah Kerja
1.  **Baca Input**: Pahami user stories dan alur kerja aplikasi dari sudut pandang 4 aktor (Pelapor, Admin, Teknisi, Manajer).
2.  **Rancang Alur Navigasi (UI Flow)**: Peta alur perpindahan halaman dari halaman login/landing page ke dashboard, detail laporan, dan form pengisian.
3.  **Tentukan Desain Sistem (Design System)**:
    *   Pilih palet warna premium (warna latar, warna primer, aksen, warna status).
    *   Tentukan tipografi (font heading dan body text).
    *   Tentukan aturan visual (padding, margin, border-radius, efek hover).
4.  **Buat Desain Wireframe**: Susun sketsa tata letak komponen untuk setiap halaman utama (Dashboard Pelapor, Detail Laporan, Panel Admin, Dashboard Manajer).
5.  **Lakukan Quality Check**: Pastikan desain visual intuitif, mudah digunakan (*usable*), responsif di layar handphone dan desktop, serta memiliki umpan balik visual yang jelas (*micro-animations* / hover states).
6.  **Sajikan Output**: Dokumentasikan dalam format Markdown atau diagram visual.

## Output
File markdown di:
*   [ui_flow.md](file:///C:/Users/User/campus-maintenance/docs/design/ui_flow.md) — Alur antarmuka pengguna.
*   [wireframe.md](file:///C:/Users/User/campus-maintenance/docs/design/wireframe.md) — Layout wireframe halaman.

## Aturan
*   Gunakan prinsip UI Modern: visual bersih (clean), spasi yang cukup (whitespace), kontras warna tinggi untuk keterbacaan, dan rounded corners yang konsisten (sleek glassmorphism atau premium dark/light mode).
*   Jangan gunakan skema warna bawaan browser yang polos (misalnya tombol abu-abu default). Gunakan styling CSS yang dikustomisasi penuh.
*   Setiap elemen interaktif (tombol, input) wajib memiliki efek visual ketika di-hover atau aktif.

## Quality Check
*   Apakah alur halaman mencakup semua 4 aktor secara spesifik?
*   Apakah rancangan wireframe menampilkan penempatan tombol aksi utama yang mudah diakses?
*   Apakah skema warna status (Submitted, Assigned, In Progress, Resolved, Closed) kontras dan mudah dikenali?

## Kondisi Gagal
AI harus berhenti jika:
*   Alur navigasi membingungkan atau memiliki jalan buntu (*dead end*) di mana user tidak bisa kembali ke menu sebelumnya.
*   Desain layout tidak mendukung responsivitas perangkat mobile.

## Human Review
Bagian yang harus diperiksa manusia:
*   Kesesuaian estetika warna dan kegunaan layout.
*   Kemudahan pemahaman alur kerja antarmuka bagi pengguna awam.
