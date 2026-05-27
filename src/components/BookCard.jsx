import React from "react";


// Fallback gradient covers when no coverUrl is provided
const GENRE_GRADIENTS = {
  Fiction:    "from-indigo-400 to-blue-600",
  Science:    "from-emerald-400 to-teal-600",
  History:    "from-amber-400 to-orange-600",
  Biography:  "from-sky-400 to-cyan-600",
  Philosophy: "from-violet-400 to-purple-600",
  Art:        "from-rose-400 to-pink-600",
  default:    "from-slate-400 to-gray-600",
};

export default function BookCard({ book, onEdit, onDelete }) {
  const gradient = GENRE_GRADIENTS[book.genre] || GENRE_GRADIENTS.default;

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-[#E2E8F0] book-card"
         style={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.05)" }}>
      {/* Cover */}
      <div className="relative h-56 bg-surface-container overflow-hidden">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          />
        ) : null}
        {/* Gradient fallback */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}
          style={{ display: book.coverUrl ? "none" : "flex" }}
        >
          <span className="material-symbols-outlined text-white text-6xl opacity-60">menu_book</span>
        </div>
        {/* Genre badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
            {book.genre || "—"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-headline-sm text-on-background mb-1 truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-body-sm text-on-surface-variant font-medium mb-1 truncate">{book.author}</p>

        <div className="flex items-center justify-between mt-4 border-t border-outline-variant pt-4">
          <span className="text-label-sm text-on-surface-variant">
            {book.year ? `Pub. ${book.year}` : "Year unknown"}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(book)}
              className="p-2 text-primary hover:bg-primary-fixed rounded transition-colors"
              title="Edit"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button
              onClick={() => onDelete(book)}
              className="p-2 text-error hover:bg-error-container rounded transition-colors"
              title="Delete"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}