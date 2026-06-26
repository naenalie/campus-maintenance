# Requirements Validation: Campus Service Request and Maintenance System

Dokumen ini mendokumentasikan proses validasi untuk memastikan persyaratan yang telah dikumpulkan (14 FR, 6 NFR, 5 BR) bersifat lengkap, konsisten, realistis, dan dapat diuji (*testable*) sebelum dilanjutkan ke tahap desain arsitektur dan database.

---

## 1. Kriteria Validasi Persyaratan
Setiap persyaratan dievaluasi berdasarkan kriteria berikut:
1.  **Correctness**: Apakah persyaratan merefleksikan kebutuhan asli studi kasus?
2.  **Completeness**: Apakah seluruh fitur wajib di PDF sudah tercakup?
3.  **Clarity (Unambiguity)**: Apakah deskripsi persyaratan jelas dan tidak menimbulkan multitafsir?
4.  **Consistency**: Apakah ada persyaratan yang saling bertentangan?
5.  **Testability (Verifiability)**: Apakah persyaratan ini dapat diuji secara objektif melalui pengujian otomatis atau manual?
6.  **Feasibility**: Apakah persyaratan realistis untuk diimplementasikan menggunakan Cloudflare Workers & D1 dalam batas paket gratis?

---

## 2. Checklist Pemeriksaan Validasi

| ID Persyaratan | Deskripsi Singkat | Kriteria Pemeriksaan | Status Validasi | Catatan |
| :--- | :--- | :--- | :---: | :--- |
| **FR-01** | Pembuatan Laporan | Lengkap & Jelas | **PASSED** | Field input didefinisikan dengan jelas. |
| **FR-02** | Validasi Deskripsi | Dapat diuji (Testable) | **PASSED** | Batasan minimal 20 karakter dapat diuji via Vitest. |
| **FR-03** | Penomoran Otomatis | Unik & Terstruktur | **PASSED** | Format `CSR-YYYYMMDD-XXXX` dijamin unik. |
| **FR-04** s.d. **FR-08** | Tampilan Aktor | Konsisten | **PASSED** | Pembagian data terisolasi berdasarkan peran. |
| **FR-09** | Pembaruan Progres | Konsisten dengan alur | **PASSED** | Transisi status terikat erat dengan peran Teknisi. |
| **FR-10** | Komentar | Kolaboratif | **PASSED** | Catatan percakapan disimpan per laporan. |
| **FR-11** | Riwayat Status | Traceability | **PASSED** | Menyimpan audit log perubahan status secara otomatis. |
| **FR-12** | Konfirmasi/Penutupan | Alur balik terdokumentasi | **PASSED** | Menyediakan opsi "Belum Tuntas" sebagai jaminan kualitas. |
| **FR-13** | Pencarian & Filter | Pengurutan | **PASSED** | Memudahkan penanganan data jumlah besar. |
| **FR-14** | Dashboard Manajer | Statistik agregat | **PASSED** | Menghasilkan ringkasan grafik kategori dan KPI. |
| **NFR-01** s.d. **NFR-06** | Kualitas Sistem | Realistis & Layak | **PASSED** | Kompatibel dengan platform Cloudflare Workers & D1. |
| **BR-01** s.d. **BR-05** | Aturan Bisnis | Tegas & Konsisten | **PASSED** | Membatasi transisi status dan urutan prioritas. |

---

## 3. Hasil Akhir Validasi (Baseline)
Seluruh dokumen persyaratan dinyatakan **VALID** dan disetujui untuk menjadi dasar rancangan teknis (baseline). Persyaratan ini memiliki keterlacakan yang baik dan dapat diuji secara manual maupun otomatis dengan total minimal 20 test asersi.
