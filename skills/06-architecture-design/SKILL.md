# Skill 06: Architecture Design

## Tujuan
Tujuan dari skill ini adalah untuk memandu AI dalam merancang arsitektur perangkat lunak yang sesuai dengan kebutuhan fungsional dan non-fungsional proyek. Skill ini membantu mendefinisikan komponen utama sistem (Frontend, Backend, Database), interaksi antar komponen, struktur folder kode, aliran data (*data flow*), serta teknologi yang digunakan.

## Kapan Digunakan
Digunakan setelah dokumen kebutuhan (*requirements specification*) selesai diverifikasi dan dibaseline-kan, serta sebelum mendesain database relasional secara detail atau mulai melakukan pengodean.

## Input
*   [requirements.md](file:///C:/Users/User/campus-maintenance/docs/requirements/requirements.md) — Dokumen kebutuhan fungsional dan non-fungsional.
*   [CASE.md](file:///C:/Users/User/campus-maintenance/CASE.md) — Studi kasus dan batasan sistem.

## Langkah Kerja
1.  **Baca Input**: Pelajari dokumen kebutuhan dan batasan studi kasus.
2.  **Petakan Komponen**: Identifikasi komponen utama sistem yang dibutuhkan (misalnya Single Page Application React untuk Frontend, Cloudflare Worker untuk REST API Backend, dan Cloudflare D1 untuk Database).
3.  **Rancang Aliran Data (Data Flow)**: Petakan bagaimana data mengalir dari antarmuka pengguna (UI) ke database dan kembali lagi, terutama untuk aksi pembuatan laporan, pembaruan status oleh teknisi, dan komentar.
4.  **Tentukan Struktur Proyek**: Susun struktur direktori proyek yang disarankan untuk menjaga kebersihan kode (clean code) dan kemudahan navigasi.
5.  **Dokumentasikan Keputusan Arsitektur**: Tuliskan keputusan pemilihan teknologi beserta argumen teknis/trade-offnya.
6.  **Lakukan Quality Check**: Verifikasi desain arsitektur terhadap kebutuhan non-fungsional (misal: skalabilitas, performa, keamanan).
7.  **Sajikan Output**: Hasilkan dokumen arsitektur dalam format Markdown.

## Output
File markdown di:
*   [architecture.md](file:///C:/Users/User/campus-maintenance/docs/design/architecture.md)

## Aturan
*   Gunakan gaya arsitektur yang ringan dan sesuai (misalnya Serverless Architecture karena menggunakan Cloudflare Workers).
*   Jangan menambahkan modul/sistem eksternal yang di luar ruang lingkup (seperti Server autentikasi mandiri atau Object Storage eksternal) kecuali diminta dalam studi kasus.
*   Tandai setiap keputusan arsitektur penting sebagai Keputusan Teknis.

## Quality Check
*   Apakah dokumen menjelaskan peranan Frontend, Backend, dan Database secara jelas?
*   Apakah diagram aliran data menggambarkan alur proses dari Pelapor hingga Teknisi?
*   Apakah arsitektur yang diusulkan mendukung batasan platform (Cloudflare Workers dan D1)?

## Kondisi Gagal
AI harus berhenti jika:
*   Dokumen requirements tidak lengkap (kurang dari 12 fungsional requirement).
*   Terdapat konflik kebutuhan non-fungsional yang membuat serverless architecture tidak layak digunakan.

## Human Review
Bagian yang harus diperiksa manusia:
*   Kelayakan struktur folder proyek yang direncanakan.
*   Trade-off pemilihan teknologi backend/database serverless.
