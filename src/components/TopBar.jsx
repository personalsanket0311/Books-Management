import React from "react";

export default function TopBar({ search, onSearchChange, onAddBook }) {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-6 md:px-12 bg-surface h-16 border-b border-outline-variant shadow-sm">
      {/* Logo + Search */}
      <div className="flex items-center gap-6">
        <span className="text-headline-sm font-bold text-primary whitespace-nowrap">Books Management</span>
        <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant w-96 gap-3 focus-within:ring-2 ring-primary ring-offset-2 transition-all">
          <span className="material-symbols-outlined text-on-surface-variant">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent border-none outline-none text-body-sm w-full placeholder:text-on-surface-variant"
            placeholder="Search by title, author or ISBN..."
          />
          {search && (
            <button onClick={() => onSearchChange("")} className="text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={onAddBook}
          className="bg-primary text-on-primary px-4 py-2 rounded font-medium text-label-md flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="hidden sm:inline">Add Book</span>
        </button>
        <div className="h-8 w-px bg-outline-variant mx-1" />
        <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </header>
  );
}
