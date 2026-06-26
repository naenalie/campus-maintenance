interface Env {
  DB: D1Database;
}

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-User-Role, X-User-Name",
    },
  });
}

function getRequestNumber(dateStr: string, randSuffix: number): string {
  const pad = (num: number, size: number) => {
    let s = num.toString();
    while (s.length < size) s = "0" + s;
    return s;
  };
  return `CSR-${dateStr}-${pad(randSuffix, 4)}`;
}

function isValidTransition(role: string, oldStatus: string, newStatus: string): boolean {
  const uOld = oldStatus.toUpperCase();
  const uNew = newStatus.toUpperCase();

  if (role === "Admin") {
    return (
      (uOld === "SUBMITTED" && uNew === "UNDER REVIEW") ||
      (uOld === "UNDER REVIEW" && uNew === "ASSIGNED") ||
      (uOld === "SUBMITTED" && uNew === "CANCELLED") ||
      (uOld === "UNDER REVIEW" && uNew === "CANCELLED") ||
      (uOld === "ASSIGNED" && uNew === "CANCELLED") ||
      (uOld === "IN PROGRESS" && uNew === "CANCELLED") ||
      (uOld === "RESOLVED" && uNew === "CLOSED") ||
      (uOld === "CLOSED" && uNew === "UNDER REVIEW")
    );
  } else if (role === "Technician") {
    return (
      (uOld === "ASSIGNED" && uNew === "IN PROGRESS") ||
      (uOld === "IN PROGRESS" && uNew === "RESOLVED")
    );
  } else if (role === "Reporter") {
    return (
      (uOld === "SUBMITTED" && uNew === "CANCELLED") ||
      (uOld === "UNDER REVIEW" && uNew === "CANCELLED") ||
      (uOld === "RESOLVED" && uNew === "CLOSED") ||
      (uOld === "RESOLVED" && uNew === "ASSIGNED")
    );
  }
  return false;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight options
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-User-Role, X-User-Name",
        },
      });
    }

    const userRole = request.headers.get("X-User-Role") || "Reporter";
    const userName = request.headers.get("X-User-Name") || "Anonymous";

    // 1. GET /api/health
    if (url.pathname === "/api/health" && request.method === "GET") {
      return json({ status: "ok" });
    }

    // 2. GET /api/requests
    if (url.pathname === "/api/requests" && request.method === "GET") {
      try {
        let query = `
          SELECT id, request_number, title, description, location, category, priority, status, assigned_technician, reporter_name, created_at, updated_at
          FROM service_requests
        `;
        const conditions: string[] = [];
        const params: unknown[] = [];

        // Role-based visibility filtering
        if (userRole === "Reporter") {
          conditions.push("reporter_name = ?");
          params.push(userName);
        } else if (userRole === "Technician") {
          conditions.push("assigned_technician = ?");
          params.push(userName);
        }

        // URL Query Filters
        const filterStatus = url.searchParams.get("status");
        if (filterStatus) {
          conditions.push("status = ?");
          params.push(filterStatus);
        }

        const filterPriority = url.searchParams.get("priority");
        if (filterPriority) {
          conditions.push("priority = ?");
          params.push(filterPriority);
        }

        const filterCategory = url.searchParams.get("category");
        if (filterCategory) {
          conditions.push("category = ?");
          params.push(filterCategory);
        }

        // Search text parameter (searches title or location)
        const searchQuery = url.searchParams.get("q");
        if (searchQuery) {
          conditions.push("(title LIKE ? OR location LIKE ?)");
          params.push(`%${searchQuery}%`, `%${searchQuery}%`);
        }

        if (conditions.length > 0) {
          query += " WHERE " + conditions.join(" AND ");
        }

        // Priority sorting (HIGH first, then created_at DESC)
        query += `
          ORDER BY 
            CASE priority 
              WHEN 'HIGH' THEN 1 
              WHEN 'MEDIUM' THEN 2 
              WHEN 'LOW' THEN 3 
              ELSE 4 
            END ASC, 
            created_at DESC
        `;

        const result = await env.DB.prepare(query).bind(...params).all();
        return json({ data: result.results });
      } catch (err: any) {
        return json({ error: err.message }, 500);
      }
    }

    // 3. POST /api/requests
    if (url.pathname === "/api/requests" && request.method === "POST") {
      try {
        if (userRole !== "Reporter") {
          return json({ error: "Hanya pelapor yang dapat membuat laporan baru." }, 403);
        }

        const input = (await request.json()) as {
          title?: string;
          description?: string;
          location?: string;
          category?: string;
        };

        // Form validations
        if (!input.title?.trim() || !input.description?.trim() || !input.location?.trim() || !input.category?.trim()) {
          return json({ error: "Semua field wajib diisi." }, 422);
        }

        if (input.title.trim().length < 5 || input.title.trim().length > 100) {
          return json({ error: "Judul minimal 5 karakter dan maksimal 100 karakter." }, 422);
        }

        if (input.description.trim().length < 20 || input.description.trim().length > 1000) {
          return json({ error: "Deskripsi minimal 20 karakter dan maksimal 1000 karakter." }, 422);
        }

        if (input.location.trim().length < 3 || input.location.trim().length > 100) {
          return json({ error: "Lokasi minimal 3 karakter dan maksimal 100 karakter." }, 422);
        }

        const validCategories = [
          "Internet & Jaringan",
          "Pendingin Ruangan (AC)",
          "Peralatan Kelas",
          "Alat Laboratorium",
          "Kebersihan & Sanitasi",
          "Lainnya",
        ];
        if (!validCategories.includes(input.category)) {
          return json({ error: "Kategori tidak valid." }, 422);
        }

        const id = crypto.randomUUID();
        
        // Generate CSR-YYYYMMDD-XXXX
        const now = new Date();
        const dateStr = now.toISOString().split("T")[0].replace(/-/g, "");
        const randSuffix = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
        const requestNumber = getRequestNumber(dateStr, randSuffix);
        const isoNowStr = now.toISOString();

        // Save new request to DB
        await env.DB.prepare(`
          INSERT INTO service_requests (id, request_number, title, description, location, category, priority, status, reporter_name, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, 'MEDIUM', 'SUBMITTED', ?, ?, ?)
        `).bind(
          id,
          requestNumber,
          input.title.trim(),
          input.description.trim(),
          input.location.trim(),
          input.category,
          userName,
          isoNowStr,
          isoNowStr
        ).run();

        // Record initial status history log
        const historyId = crypto.randomUUID();
        await env.DB.prepare(`
          INSERT INTO status_history (id, request_id, old_status, new_status, changed_by, notes, created_at)
          VALUES (?, ?, NULL, 'SUBMITTED', ?, 'Laporan berhasil dibuat.', ?)
        `).bind(historyId, id, `${userName} (Reporter)`, isoNowStr).run();

        return json({ id, request_number: requestNumber, status: "SUBMITTED" }, 201);
      } catch (err: any) {
        return json({ error: err.message }, 500);
      }
    }

    // 4. GET /api/requests/:id
    const requestMatch = url.pathname.match(/^\/api\/requests\/([a-f0-9-]+)$/);
    if (requestMatch && request.method === "GET") {
      try {
        const id = requestMatch[1];

        // Fetch request details
        const requestData = await env.DB.prepare(`
          SELECT * FROM service_requests WHERE id = ?
        `).bind(id).first();

        if (!requestData) {
          return json({ error: "Laporan tidak ditemukan." }, 404);
        }

        // Fetch status history log
        const historyResult = await env.DB.prepare(`
          SELECT old_status, new_status, changed_by, notes, created_at
          FROM status_history
          WHERE request_id = ?
          ORDER BY created_at DESC
        `).bind(id).all();

        // Fetch comments list
        const commentsResult = await env.DB.prepare(`
          SELECT author_name, author_role, comment_text, created_at
          FROM comments
          WHERE request_id = ?
          ORDER BY created_at ASC
        `).bind(id).all();

        return json({
          data: requestData,
          history: historyResult.results,
          comments: commentsResult.results,
        });
      } catch (err: any) {
        return json({ error: err.message }, 500);
      }
    }

    // 5. PATCH /api/requests/:id
    if (requestMatch && request.method === "PATCH") {
      try {
        const id = requestMatch[1];
        const input = (await request.json()) as {
          status?: string;
          priority?: string;
          category?: string;
          assigned_technician?: string;
          notes?: string;
        };

        // Fetch current request status
        const currentData = (await env.DB.prepare(`
          SELECT status, assigned_technician, reporter_name, priority, category FROM service_requests WHERE id = ?
        `).bind(id).first()) as {
          status: string;
          assigned_technician: string | null;
          reporter_name: string;
          priority: string;
          category: string;
        } | null;

        if (!currentData) {
          return json({ error: "Laporan tidak ditemukan." }, 404);
        }

        const updates: string[] = [];
        const params: unknown[] = [];
        const now = new Date();
        const isoNowStr = now.toISOString();

        // Admin-only parameter updates
        if (input.priority && userRole === "Admin") {
          updates.push("priority = ?");
          params.push(input.priority);
        }
        if (input.category && userRole === "Admin") {
          updates.push("category = ?");
          params.push(input.category);
        }
        if (input.assigned_technician && userRole === "Admin") {
          updates.push("assigned_technician = ?");
          params.push(input.assigned_technician);
        }

        // Status update logic with transition rules
        let statusChanged = false;
        let oldStatus = currentData.status;
        let newStatus = oldStatus;

        if (input.status) {
          newStatus = input.status.toUpperCase();
          if (newStatus !== oldStatus) {
            // Check authorization rules
            if (userRole === "Technician" && currentData.assigned_technician !== userName) {
              return json({ error: "Anda tidak ditugaskan pada laporan ini." }, 403);
            }
            if (userRole === "Reporter" && currentData.reporter_name !== userName) {
              return json({ error: "Anda tidak membuat laporan ini." }, 403);
            }

            if (!isValidTransition(userRole, oldStatus, newStatus)) {
              return json({ error: "Transisi status tidak valid untuk peran Anda." }, 403);
            }

            updates.push("status = ?");
            params.push(newStatus);
            statusChanged = true;
          }
        }

        if (updates.length === 0) {
          return json({ message: "Tidak ada data yang diperbarui." });
        }

        updates.push("updated_at = ?");
        params.push(isoNowStr);

        // Run updates query
        params.push(id);
        await env.DB.prepare(`
          UPDATE service_requests
          SET ${updates.join(", ")}
          WHERE id = ?
        `).bind(...params).run();

        // Record history log if status has changed
        if (statusChanged) {
          const historyId = crypto.randomUUID();
          await env.DB.prepare(`
            INSERT INTO status_history (id, request_id, old_status, new_status, changed_by, notes, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `).bind(
            historyId,
            id,
            oldStatus,
            newStatus,
            `${userName} (${userRole})`,
            input.notes?.trim() || `Status diperbarui menjadi ${newStatus}.`,
            isoNowStr
          ).run();
        }

        return json({ message: "Update berhasil.", status: newStatus });
      } catch (err: any) {
        return json({ error: err.message }, 500);
      }
    }

    // 6. POST /api/requests/:id/comments
    const commentMatch = url.pathname.match(/^\/api\/requests\/([a-f0-9-]+)\/comments$/);
    if (commentMatch && request.method === "POST") {
      try {
        const id = commentMatch[1];
        const input = (await request.json()) as {
          comment_text?: string;
        };

        if (!input.comment_text?.trim()) {
          return json({ error: "Isi komentar wajib ditulis." }, 422);
        }

        // Fetch request validity
        const exists = await env.DB.prepare(`
          SELECT id FROM service_requests WHERE id = ?
        `).bind(id).first();

        if (!exists) {
          return json({ error: "Laporan tidak ditemukan." }, 404);
        }

        const commentId = crypto.randomUUID();
        const now = new Date();
        const isoNowStr = now.toISOString();

        // Save comment
        await env.DB.prepare(`
          INSERT INTO comments (id, request_id, author_name, author_role, comment_text, created_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(commentId, id, userName, userRole, input.comment_text.trim(), isoNowStr).run();

        return json(
          {
            message: "Komentar berhasil ditambahkan.",
            comment: {
              author_name: userName,
              author_role: userRole,
              comment_text: input.comment_text.trim(),
              created_at: isoNowStr,
            },
          },
          201
        );
      } catch (err: any) {
        return json({ error: err.message }, 500);
      }
    }

    return json({ error: "Alamat API tidak ditemukan." }, 404);
  },
} satisfies ExportedHandler<Env>;
