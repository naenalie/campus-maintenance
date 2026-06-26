import { describe, expect, it, vi } from "vitest";
import worker from "../../worker/index";

// Mocking Cloudflare D1 Database Statements
const createMockStatement = (results: any = [], firstResult: any = null) => {
  const stmt = {
    bind: vi.fn().mockImplementation(() => stmt),
    all: vi.fn().mockResolvedValue({ results, success: true }),
    run: vi.fn().mockResolvedValue({ success: true, meta: { duration: 1 } }),
    first: vi.fn().mockResolvedValue(firstResult),
  };
  return stmt;
};

const mockD1 = {
  prepare: vi.fn(),
};

const mockEnv = {
  DB: mockD1 as any,
};

describe("API Integration Tests", () => {
  describe("GET /api/health", () => {
    it("should return ok health status", async () => {
      const request = new Request("http://localhost/api/health", {
        method: "GET",
      });

      const response = await worker.fetch(request, mockEnv);
      expect(response.status).toBe(200);

      const body = await response.json() as { status: string };
      expect(body.status).toBe("ok");
    });
  });

  describe("GET /api/requests", () => {
    it("should return a list of requests", async () => {
      const mockList = [
        {
          id: "request-uuid-1",
          request_number: "CSR-20260626-0001",
          title: "AC R.302 Panas",
          location: "R.302",
          category: "Pendingin Ruangan (AC)",
          priority: "HIGH",
          status: "SUBMITTED",
          assigned_technician: null,
          reporter_name: "Ellen",
          created_at: "2026-06-26T12:00:00Z",
        },
      ];

      mockD1.prepare.mockReturnValue(createMockStatement(mockList));

      const request = new Request("http://localhost/api/requests", {
        method: "GET",
        headers: {
          "X-User-Role": "Admin",
          "X-User-Name": "Alex",
        },
      });

      const response = await worker.fetch(request, mockEnv);
      expect(response.status).toBe(200);

      const body = await response.json() as { data: any[] };
      expect(body.data).toBeInstanceOf(Array);
      expect(body.data.length).toBe(1);
      expect(body.data[0].request_number).toBe("CSR-20260626-0001");
    });
  });

  describe("POST /api/requests", () => {
    it("should successfully create a new request", async () => {
      mockD1.prepare.mockReturnValue(createMockStatement());

      const request = new Request("http://localhost/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Role": "Reporter",
          "X-User-Name": "Ellen",
        },
        body: JSON.stringify({
          title: "Proyektor R.401 Mati",
          description: "Proyektor di R.401 tidak bisa menyala sejak jam perkuliahan pertama pagi ini.",
          location: "R.401",
          category: "Peralatan Kelas",
        }),
      });

      const response = await worker.fetch(request, mockEnv);
      expect(response.status).toBe(201);

      const body = await response.json() as { id: string; request_number: string; status: string };
      expect(body.id).toBeDefined();
      expect(body.request_number).toMatch(/^CSR-\d{8}-\d{4}$/);
      expect(body.status).toBe("SUBMITTED");
    });

    it("should return 422 if description is too short", async () => {
      const request = new Request("http://localhost/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Role": "Reporter",
          "X-User-Name": "Ellen",
        },
        body: JSON.stringify({
          title: "AC Rusak",
          description: "panas",
          location: "R.302",
          category: "Pendingin Ruangan (AC)",
        }),
      });

      const response = await worker.fetch(request, mockEnv);
      expect(response.status).toBe(422);

      const body = await response.json() as { error: string };
      expect(body.error).toContain("Deskripsi minimal 20 karakter");
    });
  });

  describe("PATCH /api/requests/:id", () => {
    it("should successfully update request triage details", async () => {
      const currentRequest = {
        status: "SUBMITTED",
        assigned_technician: null,
        reporter_name: "Ellen",
        priority: "MEDIUM",
        category: "Pendingin Ruangan (AC)",
      };

      mockD1.prepare.mockReturnValue(createMockStatement([], currentRequest));

      const request = new Request("http://localhost/api/requests/8f8df8d8-7d88-4f8a-9a99-b1d8e12f3456", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-User-Role": "Admin",
          "X-User-Name": "Alex",
        },
        body: JSON.stringify({
          status: "UNDER REVIEW",
          priority: "HIGH",
          notes: "Mulai direview oleh Admin.",
        }),
      });

      const response = await worker.fetch(request, mockEnv);
      expect(response.status).toBe(200);

      const body = await response.json() as { message: string; status: string };
      expect(body.status).toBe("UNDER REVIEW");
    });
  });

  describe("POST /api/requests/:id/comments", () => {
    it("should successfully add a comment", async () => {
      const currentRequest = { id: "8f8df8d8-7d88-4f8a-9a99-b1d8e12f3456" };
      mockD1.prepare.mockReturnValue(createMockStatement([], currentRequest));

      const request = new Request("http://localhost/api/requests/8f8df8d8-7d88-4f8a-9a99-b1d8e12f3456/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Role": "Reporter",
          "X-User-Name": "Ellen",
        },
        body: JSON.stringify({
          comment_text: "Apakah sudah ada info kapan teknisi datang?",
        }),
      });

      const response = await worker.fetch(request, mockEnv);
      expect(response.status).toBe(201);

      const body = await response.json() as { message: string; comment: any };
      expect(body.comment.comment_text).toBe("Apakah sudah ada info kapan teknisi datang?");
    });
  });
});
