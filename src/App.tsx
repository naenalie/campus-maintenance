import { useEffect, useState } from "react";

type ServiceRequest = {
  id: string;
  request_number: string;
  title: string;
  location: string;
  category: string;
  priority: string;
  status: string;
  assigned_technician: string | null;
  reporter_name: string;
  created_at: string;
};

type StatusHistory = {
  old_status: string | null;
  new_status: string;
  changed_by: string;
  notes: string | null;
  created_at: string;
};

type CommentItem = {
  author_name: string;
  author_role: string;
  comment_text: string;
  created_at: string;
};

type DetailRequest = ServiceRequest & {
  description: string;
  updated_at: string;
};

export default function App() {
  // Global Roles & User Simulator
  const [activeRole, setActiveRole] = useState<string>("Reporter");
  const [activeUserName, setActiveUserName] = useState<string>("Ellen");

  // Requests Data
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<DetailRequest | null>(null);
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [comments, setComments] = useState<CommentItem[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterPriority, setFilterPriority] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  // Form Inputs: Create Request
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formLocation, setFormLocation] = useState<string>("");
  const [formCategory, setFormCategory] = useState<string>("Internet & Jaringan");

  // Form Inputs: Comment & Admin Triage
  const [commentText, setCommentText] = useState<string>("");
  const [triagePriority, setTriagePriority] = useState<string>("MEDIUM");
  const [triageCategory, setTriageCategory] = useState<string>("Internet & Jaringan");
  const [triageTechnician, setTriageTechnician] = useState<string>("");
  const [actionNotes, setActionNotes] = useState<string>("");

  // Notification Banner
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Auto Role-Switcher mapping defaults
  const handleRoleChange = (role: string) => {
    setActiveRole(role);
    setSelectedRequestId(null);
    setSelectedRequest(null);
    if (role === "Reporter") setActiveUserName("Ellen");
    else if (role === "Admin") setActiveUserName("Alex");
    else if (role === "Technician") setActiveUserName("Budi");
    else if (role === "Manager") setActiveUserName("Mira");
  };

  // Common request headers
  const getHeaders = () => {
    return {
      "X-User-Role": activeRole,
      "X-User-Name": activeUserName,
    };
  };

  // 1. Fetch requests list
  const loadRequests = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("q", searchQuery);
      if (filterStatus) params.append("status", filterStatus);
      if (filterPriority) params.append("priority", filterPriority);
      if (filterCategory) params.append("category", filterCategory);

      const response = await fetch(`/api/requests?${params.toString()}`, {
        headers: getHeaders(),
      });
      const result = await response.json();
      if (response.ok) {
        setRequests(result.data || []);
      } else {
        showNotification("error", result.error || "Gagal memuat daftar laporan.");
      }
    } catch (err) {
      showNotification("error", "Koneksi ke backend API terputus.");
    }
  };

  // 2. Fetch single request detail
  const loadRequestDetail = async (id: string) => {
    try {
      const response = await fetch(`/api/requests/${id}`, {
        headers: getHeaders(),
      });
      const result = await response.json();
      if (response.ok) {
        setSelectedRequest(result.data);
        setHistory(result.history || []);
        setComments(result.comments || []);
        
        // Populate triage form defaults
        setTriagePriority(result.data.priority);
        setTriageCategory(result.data.category);
        setTriageTechnician(result.data.assigned_technician || "");
      } else {
        showNotification("error", result.error || "Gagal memuat detail laporan.");
        setSelectedRequestId(null);
      }
    } catch (err) {
      showNotification("error", "Koneksi ke backend API terputus.");
    }
  };

  // Reload lists on filters/roles changes
  useEffect(() => {
    loadRequests();
  }, [activeRole, activeUserName, searchQuery, filterStatus, filterPriority, filterCategory]);

  // Load detail if selectedRequestId changes
  useEffect(() => {
    if (selectedRequestId) {
      loadRequestDetail(selectedRequestId);
    } else {
      setSelectedRequest(null);
    }
  }, [selectedRequestId, activeRole, activeUserName]);

  // Show notification for 5 seconds
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // 3. POST /api/requests: Submit new request
  const submitNewRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          ...getHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
          location: formLocation,
          category: formCategory,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        showNotification(
          "success",
          `Laporan berhasil dibuat dengan nomor: ${result.request_number}`
        );
        // Clear form
        setFormTitle("");
        setFormDescription("");
        setFormLocation("");
        setFormCategory("Internet & Jaringan");
        loadRequests();
      } else {
        showNotification("error", result.error || "Gagal membuat laporan.");
      }
    } catch (err) {
      showNotification("error", "Koneksi ke API bermasalah.");
    }
  };

  // 4. POST /api/requests/:id/comments: Submit new comment
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedRequestId) return;

    try {
      const response = await fetch(`/api/requests/${selectedRequestId}/comments`, {
        method: "POST",
        headers: {
          ...getHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment_text: commentText,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setCommentText("");
        loadRequestDetail(selectedRequestId);
      } else {
        showNotification("error", result.error || "Gagal mengirim komentar.");
      }
    } catch (err) {
      showNotification("error", "Koneksi ke API bermasalah.");
    }
  };

  // 5. PATCH /api/requests/:id: Update status, priority, category, technician (Triage)
  const submitTriageOrAction = async (patchData: {
    status?: string;
    priority?: string;
    category?: string;
    assigned_technician?: string;
    notes?: string;
  }) => {
    if (!selectedRequestId) return;
    try {
      const response = await fetch(`/api/requests/${selectedRequestId}`, {
        method: "PATCH",
        headers: {
          ...getHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchData),
      });
      const result = await response.json();
      if (response.ok) {
        showNotification("success", result.message || "Laporan berhasil diperbarui.");
        setActionNotes("");
        loadRequestDetail(selectedRequestId);
        loadRequests();
      } else {
        showNotification("error", result.error || "Gagal memperbarui laporan.");
      }
    } catch (err) {
      showNotification("error", "Koneksi ke API bermasalah.");
    }
  };

  // Calculate manager KPI values from the loaded requests
  const activeCount = requests.filter((r) => r.status !== "CLOSED" && r.status !== "CANCELLED").length;
  const resolvedCount = requests.filter((r) => r.status === "RESOLVED" || r.status === "CLOSED").length;
  const highPriorityCount = requests.filter(
    (r) => r.priority === "HIGH" && r.status !== "CLOSED" && r.status !== "CANCELLED"
  ).length;

  // Category chart simulation data
  const categoryCounts = requests.reduce((acc: Record<string, number>, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="app-container">
      {/* Global Navigation Header */}
      <header className="navbar">
        <div className="logo-section">
          <div className="logo-icon">🛠️</div>
          <div>
            <h1 className="logo-title">Campus Maintenance</h1>
            <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
              Service Request and Maintenance System
            </span>
          </div>
        </div>

        <div className="role-switcher">
          <span className="role-label">Simulasikan Sebagai:</span>
          <select
            className="role-select"
            value={activeRole}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="Reporter">Pelapor (Mahasiswa/Dosen)</option>
            <option value="Admin">Administrator (Sarpras)</option>
            <option value="Technician">Teknisi Lapangan</option>
            <option value="Manager">Manajer Fasilitas</option>
          </select>

          <input
            type="text"
            className="form-input"
            style={{ width: "120px", display: "inline-block", padding: "0.35rem 0.5rem" }}
            value={activeUserName}
            onChange={(e) => setActiveUserName(e.target.value)}
            placeholder="Nama User"
            title="Ubah nama untuk simulasi user yang berbeda"
          />
        </div>
      </header>

      {/* Global Notifications Banner */}
      {notification && (
        <div
          className={`notification-banner ${
            notification.type === "success" ? "notification-success" : "notification-error"
          }`}
        >
          {notification.type === "success" ? "✅" : "⚠️"} {notification.message}
        </div>
      )}

      {/* 1. DETAIL REQUEST VIEW */}
      {selectedRequest ? (
        <div>
          <button className="btn btn-outline" onClick={() => setSelectedRequestId(null)}>
            ⬅️ Kembali ke Daftar Laporan
          </button>

          <div className="detail-layout">
            {/* Left Column: Details & Actions */}
            <div className="panel">
              <div className="detail-header">
                <div className="detail-title-section">
                  <h3>{selectedRequest.title}</h3>
                  <span className="badge badge-status-submitted" style={{ marginRight: "0.5rem" }}>
                    {selectedRequest.request_number}
                  </span>
                  <span
                    className={`badge badge-priority-${selectedRequest.priority.toLowerCase()}`}
                  >
                    Prioritas {selectedRequest.priority}
                  </span>
                </div>
                <span
                  className={`badge badge-status-${selectedRequest.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  style={{ fontSize: "0.85rem", padding: "0.4rem 0.8rem" }}
                >
                  {selectedRequest.status}
                </span>
              </div>

              <div className="meta-info-grid">
                <div className="meta-item">
                  <span className="meta-label">Lokasi Ruangan</span>
                  <span className="meta-value">📍 {selectedRequest.location}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Kategori Masalah</span>
                  <span className="meta-value">🏷️ {selectedRequest.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Pelapor (Sivitas)</span>
                  <span className="meta-value">👤 {selectedRequest.reporter_name}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Teknisi Ditugaskan</span>
                  <span className="meta-value">
                    🔧 {selectedRequest.assigned_technician || "Belum Ditugaskan"}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Tanggal Masuk</span>
                  <span className="meta-value">📅 {formatDateTime(selectedRequest.created_at)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Terakhir Diperbarui</span>
                  <span className="meta-value">🕒 {formatDateTime(selectedRequest.updated_at)}</span>
                </div>
              </div>

              <div className="meta-label" style={{ marginBottom: "0.35rem" }}>
                Deskripsi Detail Masalah
              </div>
              <div className="description-box">{selectedRequest.description}</div>

              {/* ACTION PANELS FOR ROLES */}
              {/* ADMIN ACTION PANEL */}
              {activeRole === "Admin" && selectedRequest.status !== "CLOSED" && selectedRequest.status !== "CANCELLED" && (
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", marginTop: "1rem" }}>
                  <h4 style={{ margin: "0 0 1rem 0", color: "var(--text-h)" }}>Panel Tindakan Administrator</h4>
                  
                  <div className="form-group">
                    <label className="form-label">Tugaskan Teknisi</label>
                    <select
                      className="form-select"
                      value={triageTechnician}
                      onChange={(e) => setTriageTechnician(e.target.value)}
                    >
                      <option value="">-- Pilih Teknisi --</option>
                      <option value="Budi">Budi (Teknisi AC & Listrik)</option>
                      <option value="Roni">Roni (Teknisi Jaringan & Lab)</option>
                      <option value="Siti">Siti (Staf Kebersihan)</option>
                    </select>
                  </div>

                  <div className="controls-row">
                    <div style={{ flex: 1 }}>
                      <label className="form-label">Set Prioritas</label>
                      <select
                        className="form-select"
                        value={triagePriority}
                        onChange={(e) => setTriagePriority(e.target.value)}
                      >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                      </select>
                    </div>

                    <div style={{ flex: 1 }}>
                      <label className="form-label">Sesuaikan Kategori</label>
                      <select
                        className="form-select"
                        value={triageCategory}
                        onChange={(e) => setTriageCategory(e.target.value)}
                      >
                        <option value="Internet & Jaringan">Internet & Jaringan</option>
                        <option value="Pendingin Ruangan (AC)">Pendingin Ruangan (AC)</option>
                        <option value="Peralatan Kelas">Peralatan Kelas</option>
                        <option value="Alat Laboratorium">Alat Laboratorium</option>
                        <option value="Kebersihan & Sanitasi">Kebersihan & Sanitasi</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Catatan Tindakan</label>
                    <input
                      type="text"
                      className="form-input"
                      value={actionNotes}
                      onChange={(e) => setActionNotes(e.target.value)}
                      placeholder="Contoh: Ditugaskan ke Teknisi AC Budi untuk cek kompresor..."
                    />
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                    {selectedRequest.status === "SUBMITTED" && (
                      <button
                        className="btn btn-outline"
                        style={{ flex: 1 }}
                        onClick={() =>
                          submitTriageOrAction({
                            status: "UNDER REVIEW",
                            notes: actionNotes || "Admin mulai mereview laporan.",
                          })
                        }
                      >
                        🔎 Review Laporan
                      </button>
                    )}

                    <button
                      className="btn btn-primary"
                      style={{ flex: 2 }}
                      onClick={() =>
                        submitTriageOrAction({
                          status: triageTechnician ? "ASSIGNED" : selectedRequest.status,
                          priority: triagePriority,
                          category: triageCategory,
                          assigned_technician: triageTechnician || undefined,
                          notes: actionNotes || `Admin memperbarui triage laporan.${triageTechnician ? ' Menugaskan ke ' + triageTechnician : ''}`,
                        })
                      }
                    >
                      💾 Terapkan Penugasan & Triage
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        submitTriageOrAction({
                          status: "CANCELLED",
                          notes: actionNotes || "Admin membatalkan/menolak laporan ini.",
                        })
                      }
                    >
                      ❌ Batalkan Laporan
                    </button>
                  </div>

                  {selectedRequest.status === "RESOLVED" && (
                    <button
                      className="btn btn-primary btn-block"
                      style={{ marginTop: "0.5rem" }}
                      onClick={() =>
                        submitTriageOrAction({
                          status: "CLOSED",
                          notes: "Admin menutup laporan setelah konfirmasi selesai.",
                        })
                      }
                    >
                      🔒 Tutup Laporan (Closed)
                    </button>
                  )}
                </div>
              )}

              {/* TECHNICIAN ACTION PANEL */}
              {activeRole === "Technician" && selectedRequest.assigned_technician === activeUserName && (
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", marginTop: "1rem" }}>
                  <h4 style={{ margin: "0 0 1rem 0", color: "var(--text-h)" }}>Panel Tindakan Teknisi</h4>
                  
                  <div className="form-group">
                    <label className="form-label">Catatan Kerja</label>
                    <input
                      type="text"
                      className="form-input"
                      value={actionNotes}
                      onChange={(e) => setActionNotes(e.target.value)}
                      placeholder="Contoh: Sparepart kompresor diganti, freon diisi ulang..."
                    />
                  </div>

                  {selectedRequest.status === "ASSIGNED" && (
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() =>
                        submitTriageOrAction({
                          status: "IN PROGRESS",
                          notes: actionNotes || "Teknisi mulai melakukan pekerjaan perbaikan.",
                        })
                      }
                    >
                      ⚡ Mulai Mengerjakan (Set In Progress)
                    </button>
                  )}

                  {selectedRequest.status === "IN PROGRESS" && (
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() =>
                        submitTriageOrAction({
                          status: "RESOLVED",
                          notes: actionNotes || "Teknisi menandai pekerjaan telah selesai diperbaiki.",
                        })
                      }
                    >
                      ✅ Tandai Selesai Diperbaiki (Set Resolved)
                    </button>
                  )}
                </div>
              )}

              {/* REPORTER ACTION PANEL */}
              {activeRole === "Reporter" && selectedRequest.reporter_name === activeUserName && (
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", marginTop: "1rem" }}>
                  <h4 style={{ margin: "0 0 1rem 0", color: "var(--text-h)" }}>Konfirmasi Hasil Perbaikan</h4>
                  
                  {selectedRequest.status === "RESOLVED" && (
                    <div>
                      <p style={{ fontSize: "0.85rem", marginBottom: "1rem" }}>
                        Fasilitas telah ditandai selesai oleh Teknisi. Mohon konfirmasi apakah
                        kerusakan sudah diperbaiki dengan tuntas.
                      </p>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          className="btn btn-primary"
                          style={{ flex: 1 }}
                          onClick={() =>
                            submitTriageOrAction({
                              status: "CLOSED",
                              notes: "Pelapor mengonfirmasi perbaikan sukses.",
                            })
                          }
                        >
                          👍 Ya, Sudah Selesai (Tutup Laporan)
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ flex: 1 }}
                          onClick={() =>
                            submitTriageOrAction({
                              status: "ASSIGNED",
                              notes: "Pelapor menolak hasil perbaikan. Kerusakan belum selesai diperbaiki.",
                            })
                          }
                        >
                          👎 Belum Selesai (Perbaiki Ulang)
                        </button>
                      </div>
                    </div>
                  )}

                  {(selectedRequest.status === "SUBMITTED" || selectedRequest.status === "UNDER REVIEW") && (
                    <button
                      className="btn btn-danger btn-block"
                      onClick={() =>
                        submitTriageOrAction({
                          status: "CANCELLED",
                          notes: "Pelapor membatalkan laporan kerusakan.",
                        })
                      }
                    >
                      ❌ Batalkan Laporan Saya
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Timeline History & Comments */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Timeline Log Panel */}
              <div className="panel">
                <h4 className="panel-title">Riwayat Status Laporan (Timeline)</h4>
                
                <div className="timeline">
                  {history.map((item, idx) => (
                    <div className="timeline-item" key={idx}>
                      <div className="timeline-dot"></div>
                      <div className="timeline-header">
                        {item.new_status}
                        <span className="timeline-time">{formatDateTime(item.created_at)}</span>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-light)", marginBottom: "0.15rem" }}>
                        Oleh: {item.changed_by}
                      </div>
                      {item.notes && <div className="timeline-content">{item.notes}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments Panel */}
              <div className="panel">
                <h4 className="panel-title">Kolom Diskusi & Catatan</h4>
                
                <div className="comments-section">
                  {comments.length === 0 ? (
                    <p style={{ fontSize: "0.85rem", color: "var(--text-light)", textAlign: "center" }}>
                      Belum ada diskusi. Tulis komentar di bawah untuk memulai.
                    </p>
                  ) : (
                    comments.map((item, idx) => (
                      <div
                        className={`comment-bubble ${item.author_name === activeUserName ? "self" : ""}`}
                        key={idx}
                      >
                        <div className="comment-meta">
                          <span>
                            {item.author_name} ({item.author_role})
                          </span>
                          <span>{formatDateTime(item.created_at)}</span>
                        </div>
                        <div className="comment-text">{item.comment_text}</div>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Input Form */}
                <form onSubmit={submitComment} style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    className="form-input"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Tulis pesan atau catatan koordinasi..."
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Kirim
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. DASHBOARD / LIST VIEW */
        <div>
          {/* Manager KPI Counters */}
          <div className="metrics-grid">
            <div className="metric-card">
              <span className="metric-title">Total Laporan Aktif</span>
              <span className="metric-value" style={{ color: "var(--primary)" }}>{activeCount}</span>
            </div>
            <div className="metric-card">
              <span className="metric-title">Laporan Urgent (HIGH)</span>
              <span className="metric-value" style={{ color: "#ef4444" }}>{highPriorityCount}</span>
            </div>
            <div className="metric-card">
              <span className="metric-title">Total Perbaikan Selesai</span>
              <span className="metric-value" style={{ color: "#22c55e" }}>{resolvedCount}</span>
            </div>
            <div className="metric-card">
              <span className="metric-title">Total Laporan Terdata</span>
              <span className="metric-value">{requests.length}</span>
            </div>
          </div>

          <div className="main-layout">
            {/* Left Column: Form (Reporter) / Chart (Manager/Admin) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Form Laporan Baru (Only for Reporter) */}
              {activeRole === "Reporter" && (
                <div className="panel">
                  <h3 className="panel-title">Laporkan Masalah Baru</h3>
                  <form onSubmit={submitNewRequest}>
                    <div className="form-group">
                      <label className="form-label">Judul Masalah</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Contoh: AC Kelas R.302 Tidak Dingin"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Lokasi / Ruangan</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        placeholder="Contoh: Gedung B Lt.3 Ruang 302"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Kategori Fasilitas</label>
                      <select
                        className="form-select"
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                      >
                        <option value="Internet & Jaringan">Internet & Jaringan</option>
                        <option value="Pendingin Ruangan (AC)">Pendingin Ruangan (AC)</option>
                        <option value="Peralatan Kelas">Peralatan Kelas</option>
                        <option value="Alat Laboratorium">Alat Laboratorium</option>
                        <option value="Kebersihan & Sanitasi">Kebersihan & Sanitasi</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Deskripsi Masalah (Minimal 20 Karakter)</label>
                      <textarea
                        className="form-textarea"
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Jelaskan kondisi kerusakan secara detail agar teknisi dapat menganalisis..."
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">
                      ✉️ Kirim Laporan Kerusakan
                    </button>
                  </form>
                </div>
              )}

              {/* Chart Panel (For Managers & Admins) */}
              {(activeRole === "Manager" || activeRole === "Admin") && (
                <div className="panel">
                  <h3 className="panel-title">Distribusi Masalah per Kategori</h3>
                  
                  <div className="chart-container">
                    {Object.keys(categoryCounts).length === 0 ? (
                      <p style={{ fontSize: "0.85rem", color: "var(--text-light)", textAlign: "center" }}>
                        Belum ada data visualisasi kerusakan.
                      </p>
                    ) : (
                      Object.entries(categoryCounts).map(([cat, count]) => {
                        const pct = Math.round((count / requests.length) * 100);
                        return (
                          <div className="chart-bar-row" key={cat}>
                            <span className="chart-label" title={cat}>
                              {cat}
                            </span>
                            <div className="chart-bar-bg">
                              <div
                                className="chart-bar-fill"
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                            <span className="chart-percentage">{pct}%</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Search & List Table */}
            <div className="panel">
              <h3 className="panel-title">Daftar Laporan Fasilitas</h3>

              {/* Control Rows (Search & Filter dropdowns) */}
              <div className="controls-row">
                <div className="search-wrapper">
                  <input
                    type="text"
                    className="form-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="🔍 Cari judul atau lokasi..."
                  />
                </div>

                <div className="filter-wrapper">
                  <select
                    className="form-select"
                    style={{ width: "120px" }}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">-- Status --</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="UNDER REVIEW">UNDER REVIEW</option>
                    <option value="ASSIGNED">ASSIGNED</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>

                  <select
                    className="form-select"
                    style={{ width: "120px" }}
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                  >
                    <option value="">-- Prioritas --</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>

                  <select
                    className="form-select"
                    style={{ width: "130px" }}
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">-- Kategori --</option>
                    <option value="Internet & Jaringan">Internet & Jaringan</option>
                    <option value="Pendingin Ruangan (AC)">Pendingin Ruangan (AC)</option>
                    <option value="Peralatan Kelas">Peralatan Kelas</option>
                    <option value="Alat Laboratorium">Alat Laboratorium</option>
                    <option value="Kebersihan & Sanitasi">Kebersihan & Sanitasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Table List */}
              <div className="table-container">
                {requests.length === 0 ? (
                  <p style={{ textAlign: "center", padding: "2rem", color: "var(--text-light)" }}>
                    Tidak ada laporan kerusakan yang cocok.
                  </p>
                ) : (
                  <table className="app-table">
                    <thead>
                      <tr>
                        <th>Nomor</th>
                        <th>Judul Masalah</th>
                        <th>Lokasi</th>
                        <th>Kategori</th>
                        <th>Prioritas</th>
                        <th>Status</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((item) => (
                        <tr key={item.id} onClick={() => setSelectedRequestId(item.id)}>
                          <td style={{ fontWeight: 600 }}>{item.request_number}</td>
                          <td>{item.title}</td>
                          <td>📍 {item.location}</td>
                          <td>{item.category}</td>
                          <td>
                            <span
                              className={`badge badge-priority-${item.priority.toLowerCase()}`}
                            >
                              {item.priority}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge badge-status-${item.status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td style={{ color: "var(--primary)", fontWeight: 600 }}>Lihat ➔</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
