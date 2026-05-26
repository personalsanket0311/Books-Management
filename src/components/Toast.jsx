import React, { useEffect } from "react";

const ICONS = { success: "check_circle", error: "error", info: "info" };
const COLORS = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  error: "bg-error-container border-red-200 text-error",
  info: "bg-secondary-container border-blue-200 text-on-secondary-container",
};

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-modal max-w-sm modal-panel ${COLORS[toast.type] || COLORS.info}`}>
      <span className="material-symbols-outlined">{ICONS[toast.type] || "info"}</span>
      <p className="text-body-sm font-medium">{toast.message}</p>
      <button onClick={onDismiss} className="ml-2 opacity-60 hover:opacity-100">
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}
