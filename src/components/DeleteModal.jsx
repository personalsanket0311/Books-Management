import React from "react";

export default function DeleteModal({ open, book, onClose, onConfirm, loading }) {
  if (!open || !book) return null;
  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-panel bg-white rounded-xl w-full max-w-sm shadow-modal p-6 text-center">
        <div className="w-14 h-14 bg-error-container rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-error text-3xl">delete_forever</span>
        </div>
        <h2 className="text-headline-sm text-on-background mb-2">Delete Book</h2>
        <p className="text-body-sm text-on-surface-variant mb-6">
          Are you sure you want to delete <span className="font-semibold text-on-background">"{book.title}"</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 border border-outline-variant text-on-surface-variant py-2.5 rounded-lg text-label-md hover:bg-surface-container transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 bg-error text-on-error py-2.5 rounded-lg text-label-md font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {loading && <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
