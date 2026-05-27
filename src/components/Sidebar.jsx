import React from "react";

const navItems = [
  { icon: "dashboard", label: "Dashboard", active: true },
  { icon: "auto_stories", label: "All Books" },
  { icon: "star", label: "Favorites" },
  { icon: "history", label: "Recent" },
  { icon: "library_books", label: "Collections" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col h-full border-r border-outline-variant p-4 gap-2 bg-surface-container-lowest w-64 shrink-0 overflow-y-auto">
      <div className="mb-6 px-2">
        <h2 className="text-label-md font-bold text-primary tracking-wider uppercase">Library</h2>
        <p className="text-[10px] text-on-surface-variant font-medium">Management System</p>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-label-md w-full text-left
              ${item.active
                ? "bg-secondary-container text-on-secondary-container font-bold translate-x-1"
                : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 px-2">
        <button className="w-full border-2 border-primary border-dashed text-primary text-label-md py-3 rounded-xl hover:bg-surface-container-high transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">qr_code_scanner</span>
          Quick Scan
        </button>
      </div>

      <div className="mt-auto pt-4 border-t border-outline-variant">
        {[{ icon: "settings", label: "Settings" }, { icon: "help", label: "Support" }].map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant text-label-md hover:bg-surface-container-high rounded-lg transition-all w-full text-left"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}