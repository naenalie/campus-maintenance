# Requirements Traceability Matrix: Campus Service Request and Maintenance System

Matriks Keterlacakan (*Traceability Matrix*) ini menghubungkan dokumen persyaratan (*Requirements*), kisah pengguna (*User Stories*), spesifikasi desain (*Design*), file kode sumber (*Code*), dan kasus pengujian (*Tests*) untuk memastikan seluruh kebutuhan terimplementasi dan teruji dengan lengkap.

---

## Tabel Matriks Keterlacakan (Traceability Matrix Table)

| ID Req | User Story | Design Spec | Kode Sumber (Src Code) | Kasus Uji (Test Cases) | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **FR-01** | US-01 | `docs/design/ui_flow.md` | `src/App.tsx` | `tests/unit/request-validation.test.ts` | Belum |
| **FR-02** | US-01 | `docs/design/api.md` | `worker/index.ts` | `tests/unit/request-validation.test.ts` | Belum |
| **FR-03** | US-01 | `docs/design/api.md` | `worker/index.ts` | `tests/unit/request-validation.test.ts` | Belum |
| **FR-04** | US-02 | `docs/design/ui_flow.md` | `src/App.tsx` | `tests/integration/api.test.ts` | Belum |
| **FR-05** | US-05 | `docs/design/ui_flow.md` | `src/App.tsx` | `tests/integration/api.test.ts` | Belum |
| **FR-06** | US-06 | `docs/design/api.md` | `worker/index.ts` | `tests/integration/api.test.ts` | Belum |
| **FR-07** | US-07 | `docs/design/api.md` | `worker/index.ts` | `tests/integration/api.test.ts` | Belum |
| **FR-08** | US-09 | `docs/design/ui_flow.md` | `src/App.tsx` | `tests/integration/api.test.ts` | Belum |
| **FR-09** | US-10 | `docs/design/api.md` | `worker/index.ts` | `tests/integration/api.test.ts` | Belum |
| **FR-10** | US-03 | `docs/design/database.md` | `worker/index.ts`, `src/App.tsx` | `tests/integration/api.test.ts` | Belum |
| **FR-11** | US-01 s.d. US-10 | `docs/design/database.md` | `worker/index.ts` | `tests/integration/api.test.ts` | Belum |
| **FR-12** | US-04, US-08 | `docs/design/ui_flow.md` | `worker/index.ts`, `src/App.tsx` | `tests/integration/api.test.ts` | Belum |
| **FR-13** | US-05, US-09 | `docs/design/api.md` | `worker/index.ts`, `src/App.tsx` | `tests/integration/api.test.ts` | Belum |
| **FR-14** | US-11 | `docs/design/ui_flow.md` | `src/App.tsx` | `tests/integration/api.test.ts` | Belum |
| **FR-15** (CR-01) | US-01, US-05 | `docs/design/api.md` | `worker/index.ts`, `src/App.tsx` | `tests/integration/api.test.ts` | Belum |
| **NFR-01** | - | `docs/design/wireframe.md` | `src/index.css` | Verifikasi Manual Browser | Belum |
| **NFR-02** | - | `docs/design/architecture.md`| `worker/index.ts` | GitHub Actions Build Time | Belum |
| **NFR-03** | - | `docs/design/architecture.md`| `wrangler.jsonc` | Verifikasi Manual Cloudflare URL | Belum |
| **NFR-04** | - | `docs/design/database.md` | `worker/index.ts` | `tests/integration/api.test.ts` | Belum |
| **NFR-05** | - | `docs/design/database.md` | `database/migrations/0001_initial.sql` | `tests/integration/api.test.ts` | Belum |
| **NFR-06** | - | `docs/design/ui_flow.md` | `src/App.tsx` | Verifikasi Manual Browser | Belum |
| **BR-01** | - | `docs/design/database.md` | `worker/index.ts` | `tests/unit/request-validation.test.ts` | Belum |
| **BR-02** | - | `docs/design/ui_flow.md` | `worker/index.ts` | `tests/integration/api.test.ts` | Belum |
| **BR-03** | - | `docs/design/api.md` | `worker/index.ts` | `tests/integration/api.test.ts` | Belum |
| **BR-04** | - | `docs/design/ui_flow.md` | `worker/index.ts`, `src/App.tsx` | `tests/integration/api.test.ts` | Belum |
| **BR-05** | - | `docs/design/ui_flow.md` | `src/App.tsx` | Verifikasi Manual Browser | Belum |

*Keterangan Status: `Belum` / `Pengerjaan` / `Selesai`*
*Catatan: Kolom Status akan diperbarui seiring berjalannya milestone implementasi.*
