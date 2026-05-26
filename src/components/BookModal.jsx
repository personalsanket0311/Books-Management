import React, { useState, useEffect } from "react";

const GENRES = ["Fiction", "Science", "History", "Biography", "Philosophy", "Art", "Other"];

const EMPTY = { title: "", author: "", genre: "", year: "", coverUrl: "" };

export default function BookModal({ open, onClose, onSubmit, initial, loading }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...EMPTY, ...initial } : EMPTY);
      setErrors({});
    }
  }, [open, initial]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (!form.genre) e.genre = "Please select a genre";
    if (form.year && (isNaN(form.year) || form.year < 0 || form.year > new Date().getFullYear() + 5))
      e.year = "Enter a valid year";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...form, year: form.year ? Number(form.year) : null });
  };

  if (!open) return null;

  const isEdit = !!initial?.id;

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-panel bg-white rounded-xl w-full max-w-lg shadow-modal overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant">
          <h2 className="text-headline-md text-on-background">
            {isEdit ? "Edit Book" : "Add New Book"}
          </h2>
          <button onClick={onClose} className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Title */}
          <Field label="Title *" error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. The Great Gatsby"
              className={inputCls(errors.title)}
            />
          </Field>

          {/* Author */}
          <Field label="Author *" error={errors.author}>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              placeholder="e.g. F. Scott Fitzgerald"
              className={inputCls(errors.author)}
            />
          </Field>

          {/* Genre */}
          <Field label="Genre *" error={errors.genre}>
            <select
              value={form.genre}
              onChange={(e) => setForm((f) => ({ ...f, genre: e.target.value }))}
              className={inputCls(errors.genre)}
            >
              <option value="">Select genre…</option>
              {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>

          {/* Year */}
          <Field label="Publication Year" error={errors.year}>
            <input
              type="number"
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
              placeholder="e.g. 1925"
              min="0"
              max={new Date().getFullYear() + 5}
              className={inputCls(errors.year)}
            />
          </Field>

          {/* Cover URL */}
          <Field label="Cover Image URL (optional)">
            <input
              type="url"
              value={form.coverUrl}
              onChange={(e) => setForm((f) => ({ ...f, coverUrl: e.target.value }))}
              placeholder="https://…"
              className={inputCls()}
            />
          </Field>

          {/* Preview */}
          {form.coverUrl && (
            <div className="flex justify-center">
              <img src={form.coverUrl} alt="Cover preview" className="h-32 rounded-lg object-cover border border-outline-variant" />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-outline-variant text-on-surface-variant py-2.5 rounded-lg text-label-md hover:bg-surface-container transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-primary text-on-primary py-2.5 rounded-lg text-label-md font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {loading && <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>}
              {isEdit ? "Save Changes" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-label-sm text-on-surface font-semibold mb-1.5">{label}</label>
      {children}
      {error && <p className="text-error text-[12px] mt-1 flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">error</span>{error}
      </p>}
    </div>
  );
}

function inputCls(error) {
  return `w-full bg-white border ${error ? "border-error" : "border-outline-variant"} rounded-lg px-3 py-2.5 text-body-sm text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`;
}
