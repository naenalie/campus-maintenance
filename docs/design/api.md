# REST API Endpoints Specification: Campus Service Request and Maintenance System

Dokumen ini mendokumentasikan spesifikasi antarmuka API RESTful yang disediakan oleh backend Cloudflare Workers untuk berinteraksi dengan frontend React.

---

## 1. Konfigurasi Umum (General Configurations)
*   **Base URL**: `/api`
*   **Header Wajib (Request)**:
    *   `Content-Type: application/json`
    *   `X-User-Role`: Peran pengguna saat ini (`Reporter`, `Admin`, `Technician`, `Manager`) untuk keperluan simulasi otorisasi.
    *   `X-User-Name`: Nama pengguna saat ini (untuk pencatatan log otomatis).

---

## 2. Ringkasan Endpoint (Endpoint Summary)

| Method | Path URI | Deskripsi | Otorisasi Akses |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Pemeriksaan kesehatan API. | Semua Aktor |
| **GET** | `/api/requests` | Mengambil daftar laporan (mendukung search & filter). | Semua Aktor (Data difilter sesuai peran) |
| **POST** | `/api/requests` | Membuat laporan fasilitas baru. | Pelapor (Reporter) |
| **GET** | `/api/requests/:id` | Mengambil detail satu laporan beserta log riwayat & komentar. | Semua Aktor |
| **PATCH** | `/api/requests/:id` | Mengubah status, prioritas, kategori, atau menugaskan teknisi. | Admin & Teknisi (Sesuai BR) |
| **POST** | `/api/requests/:id/comments` | Menambahkan komentar baru pada laporan. | Pelapor, Admin, Teknisi |

---

## 3. Spesifikasi Detail Endpoint (Detailed Endpoint Specifications)

### A. `GET /api/health`
Mengembalikan status operasional sistem.
*   **Response (200 OK)**:
    ```json
    {
      "status": "ok"
    }
    ```

### B. `GET /api/requests`
Mengambil daftar laporan. Mendukung pencarian teks kata kunci `q` (mencari judul & lokasi) serta filter parameter query.
*   **Query Params (Optional)**:
    *   `status`: Filter status (e.g., `/api/requests?status=In Progress`)
    *   `priority`: Filter prioritas (e.g., `/api/requests?priority=HIGH`)
    *   `category`: Filter kategori (e.g., `/api/requests?category=AC`)
*   **Response (200 OK)**:
    ```json
    {
      "data": [
        {
          "id": "8f8df8d8-7d88-4f8a-9a99-b1d8e12f3456",
          "request_number": "CSR-20260626-0042",
          "title": "AC Kelas Panas",
          "location": "R.302",
          "category": "Pendingin Ruangan (AC)",
          "priority": "HIGH",
          "status": "In Progress",
          "assigned_technician": "Budi",
          "reporter_name": "Ellen",
          "created_at": "2026-06-26T11:00:00Z"
        }
      ]
    }
    ```

### C. `POST /api/requests`
Membuat laporan fasilitas baru.
*   **Request Body**:
    ```json
    {
      "title": "Proyektor Kelas Rusak",
      "description": "Proyektor di R.401 tidak bisa menyala sejak jam perkuliahan pertama pagi ini.",
      "location": "R.401",
      "category": "Peralatan Kelas"
    }
    ```
*   **Response (201 Created)**:
    ```json
    {
      "id": "a9f8e123-d890-4a8b-bb8c-2f9876543210",
      "request_number": "CSR-20260626-0984",
      "status": "SUBMITTED"
    }
    ```
*   **Response Error (422 Unprocessable Entity)**:
    *   *Penyebab*: Deskripsi kurang dari 20 karakter atau field wajib kosong.
    ```json
    {
      "error": "Deskripsi minimal 20 karakter."
    }
    ```

### D. `GET /api/requests/:id`
Mengambil satu detail laporan, log riwayat status, dan semua komentar.
*   **Response (200 OK)**:
    ```json
    {
      "data": {
        "id": "8f8df8d8-7d88-4f8a-9a99-b1d8e12f3456",
        "request_number": "CSR-20260626-0042",
        "title": "AC Kelas Panas",
        "description": "AC bocor dan mengeluarkan suara bising di kelas R.302.",
        "location": "R.302",
        "category": "Pendingin Ruangan (AC)",
        "priority": "HIGH",
        "status": "In Progress",
        "assigned_technician": "Budi",
        "reporter_name": "Ellen",
        "created_at": "2026-06-26T11:00:00Z",
        "updated_at": "2026-06-26T11:05:00Z"
      },
      "history": [
        {
          "old_status": "Under Review",
          "new_status": "Assigned",
          "changed_by": "Alex (Admin)",
          "notes": "Ditugaskan ke teknisi Budi.",
          "created_at": "2026-06-26T11:03:00Z"
        }
      ],
      "comments": [
        {
          "author_name": "Budi",
          "author_role": "Technician",
          "comment_text": "Saya sedang menuju ke lokasi R.302.",
          "created_at": "2026-06-26T11:05:00Z"
        }
      ]
    }
    ```

### E. `PATCH /api/requests/:id`
Mengubah status, menetapkan kategori/prioritas, menugaskan teknisi, atau membatalkan laporan.
*   **Request Body (Ubah Status/Penugasan)**:
    ```json
    {
      "status": "In Progress",
      "priority": "HIGH",
      "assigned_technician": "Budi",
      "notes": "Teknisi Budi mulai mengerjakan perbaikan."
    }
    ```
*   **Response (200 OK)**:
    ```json
    {
      "message": "Update berhasil.",
      "status": "In Progress"
    }
    ```
*   **Response Error (403 Forbidden)**:
    *   *Penyebab*: Pengguna tidak berwenang mengubah status laporan ke nilai tersebut sesuai aturan bisnis.
    ```json
    {
      "error": "Aksi tidak diizinkan untuk peran Anda."
    }
    ```

### F. `POST /api/requests/:id/comments`
Menambahkan komentar baru.
*   **Request Body**:
    ```json
    {
      "comment_text": "Kabel HDMI proyektor sepertinya terputus di bagian ujung."
    }
    ```
*   **Response (201 Created)**:
    ```json
    {
      "message": "Komentar berhasil ditambahkan.",
      "comment": {
        "author_name": "Ellen",
        "author_role": "Reporter",
        "comment_text": "Kabel HDMI proyektor sepertinya terputus di bagian ujung.",
        "created_at": "2026-06-26T11:10:00Z"
      }
    }
    ```
