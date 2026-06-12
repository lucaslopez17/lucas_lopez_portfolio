"use client";

import { useEffect, useState } from "react";

type KnowledgeRow = {
  id: string;
  title: string;
  category: string;
  content: string;
  language: string;
  is_active: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
};

const CATEGORIES = [
  "About Lucas",
  "Industrial Engineering",
  "Mechanical Fitting",
  "Polywelding",
  "Mining/Dewatering",
  "Software Skills",
  "Education",
  "Languages",
  "Work Experience",
  "Projects",
  "Certifications",
  "Contact Rules",
  "Response Rules",
];

const EMPTY_FORM = {
  title: "",
  category: "Work Experience",
  language: "en",
  content: "",
  tags: "",
  is_active: true,
};

export default function AdminPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [rows, setRows] = useState<KnowledgeRow[]>([]);
  const [loadingRows, setLoadingRows] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadRows = async () => {
    setLoadingRows(true);
    const res = await fetch("/api/admin/knowledge");
    if (res.status === 401) {
      setIsAuthed(false);
      setLoadingRows(false);
      return;
    }
    const data = await res.json();
    setRows(data.rows ?? []);
    setLoadingRows(false);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/knowledge");
      if (res.ok) {
        const data = await res.json();
        setRows(data.rows ?? []);
        setIsAuthed(true);
      }
      setAuthChecked(true);
    })();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error ?? "Login failed");
      return;
    }
    setIsAuthed(true);
    setPassword("");
    loadRows();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setIsAuthed(false);
    setRows([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!form.title.trim() || !form.content.trim()) {
      setFormError("Title and content are required.");
      return;
    }

    const tags = form.tags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    setSubmitting(true);
    const res = editingId
      ? await fetch(`/api/admin/knowledge/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, tags }),
        })
      : await fetch("/api/admin/knowledge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, tags }),
        });
    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFormError(data.error ?? "Failed to save entry");
      return;
    }

    setForm(EMPTY_FORM);
    setEditingId(null);
    loadRows();
  };

  const startEdit = (row: KnowledgeRow) => {
    setEditingId(row.id);
    setFormError("");
    setForm({
      title: row.title,
      category: row.category,
      language: row.language,
      content: row.content,
      tags: row.tags?.join(", ") ?? "",
      is_active: row.is_active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormError("");
    setForm(EMPTY_FORM);
  };

  const toggleActive = async (row: KnowledgeRow) => {
    await fetch(`/api/admin/knowledge/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !row.is_active }),
    });
    loadRows();
  };

  const deleteRow = async (row: KnowledgeRow) => {
    if (!confirm(`Delete "${row.title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/knowledge/${row.id}`, { method: "DELETE" });
    loadRows();
  };

  if (!authChecked) {
    return <div className="admin-page" />;
  }

  if (!isAuthed) {
    return (
      <div className="admin-page">
        <form className="admin-login" onSubmit={handleLogin}>
          <h1>Lucas Bot Admin</h1>
          <p>Enter the admin password to manage Lucas Bot&apos;s knowledge base.</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {loginError && <p className="admin-error">{loginError}</p>}
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Lucas Bot Admin</h1>
        <button className="admin-logout" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <section className="admin-card">
        <h2>{editingId ? "Edit entry" : "Add new entry"}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <label>
              Title
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Field Technician at Acme Mining (2025)"
              />
            </label>
            <label>
              Category
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Language
              <select
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </label>
          </div>

          <label>
            Tags (comma-separated, e.g. polywelding, iso, machinery)
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="polywelding, iso, machinery"
            />
          </label>

          <label>
            Content (description, dates, skills used, responsibilities, etc.)
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={6}
              placeholder="Describe the role, dates, location, tools and skills used, and key achievements."
            />
          </label>

          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            />
            Active (visible to Lucas Bot)
          </label>

          {formError && <p className="admin-error">{formError}</p>}

          <div className="admin-form-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : editingId ? "Save changes" : "Add entry"}
            </button>
            {editingId && (
              <button type="button" className="admin-cancel" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="admin-card">
        <h2>Existing entries {loadingRows && "(refreshing...)"}</h2>
        <div className="admin-list">
          {rows.map((row) => (
            <div key={row.id} className={`admin-row ${row.is_active ? "" : "is-inactive"}`}>
              <div className="admin-row-main">
                <div className="admin-row-meta">
                  <span className="admin-tag">{row.category}</span>
                  <span className="admin-tag admin-tag-lang">{row.language}</span>
                  {!row.is_active && <span className="admin-tag admin-tag-inactive">inactive</span>}
                </div>
                <h3>{row.title}</h3>
                <p>{row.content}</p>
                {row.tags?.length > 0 && (
                  <div className="admin-row-tags">
                    {row.tags.map((tag) => (
                      <span key={tag} className="admin-tag admin-tag-label">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="admin-row-actions">
                <button onClick={() => startEdit(row)}>Edit</button>
                <button onClick={() => toggleActive(row)}>
                  {row.is_active ? "Deactivate" : "Activate"}
                </button>
                <button className="admin-delete" onClick={() => deleteRow(row)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {rows.length === 0 && !loadingRows && <p>No entries yet.</p>}
        </div>
      </section>
    </div>
  );
}
