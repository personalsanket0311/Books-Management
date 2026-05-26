import React, { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { useDebounce } from "../hooks/useDebounce";
import BookCard from "../components/BookCard";
import SkeletonCard from "../components/SkeletonCard";
import BookModal from "../components/BookModal";
import DeleteModal from "../components/DeleteModal";
import Toast from "../components/Toast";

const GENRES = ["All", "Fiction", "Science", "History", "Biography", "Philosophy", "Art"];
const SORT_OPTIONS = [
  { value: "recent", label: "Recently Added" },
  { value: "title", label: "Title (A–Z)" },
  { value: "author", label: "Author" },
  { value: "year", label: "Year" },
];

export default function Dashboard({ search, onSearchChange, addTrigger }) {
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("recent");


  const [addOpen, setAddOpen] = useState(false);


  React.useEffect(() => {
    if (addTrigger > 0) setAddOpen(true);
  }, [addTrigger]);
  const [editBook, setEditBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const debouncedSearch = useDebounce(search, 400);
  const { books, loading, error, addBook, updateBook, deleteBook: removeBook } = useBooks({
    search: debouncedSearch,
    genre,
    sortBy,
  });

  const showToast = (message, type = "success") => setToast({ message, type });


  const handleAdd = async (data) => {
    setActionLoading(true);
    try {
      await addBook(data);
      setAddOpen(false);
      showToast("Book added successfully!");
    } catch {
      showToast("Failed to add book. Please try again.", "error");
    } finally {
      setActionLoading(false);
    }
  };


  const handleEdit = async (data) => {
    setActionLoading(true);
    try {
      await updateBook(editBook.id, data);
      setEditBook(null);
      showToast("Book updated successfully!");
    } catch {
      showToast("Failed to update book.", "error");
    } finally {
      setActionLoading(false);
    }
  };


  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await removeBook(deleteBook.id);
      setDeleteBook(null);
      showToast("Book deleted.", "info");
    } catch {
      showToast("Failed to delete book.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#F8FAFC] px-6 md:px-12 py-8">
      <div className="max-w-[1280px] mx-auto">
     
        <div className="flex lg:hidden items-center bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant gap-3 mb-6 focus-within:ring-2 ring-primary ring-offset-2 transition-all">
          <span className="material-symbols-outlined text-on-surface-variant">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search books…"
            className="bg-transparent border-none outline-none text-body-sm w-full placeholder:text-on-surface-variant"
          />
          {search && (
            <button onClick={() => onSearchChange("")} className="text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-headline-xl text-on-background mb-2">Book Library</h1>
            <p className="text-body-md text-on-surface-variant">
              Curate and manage your collection with scholarly precision.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-label-sm text-on-surface-variant">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-outline-variant rounded-lg text-label-md px-3 py-2 outline-none focus:border-primary cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-5 py-2 rounded-full text-label-md font-medium transition-all
                ${genre === g
                  ? "bg-primary text-white shadow-md"
                  : "bg-[#F1F5F9] text-secondary hover:bg-surface-container-high"
                }`}
            >
              {g}
            </button>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-error-container text-error rounded-xl p-4 mb-6">
            <span className="material-symbols-outlined">error</span>
            <div>
              <p className="font-semibold text-body-sm">Could not load books</p>
              <p className="text-body-sm opacity-80">{error}</p>
            </div>
          </div>
        )}

    
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-outline-variant text-6xl mb-4">search_off</span>
            <h3 className="text-headline-md text-on-background mb-2">No books found</h3>
            <p className="text-body-md text-on-surface-variant max-w-sm">
              Try adjusting your filters or{" "}
              <button onClick={() => setAddOpen(true)} className="text-primary underline">add a new book</button>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={(b) => setEditBook(b)}
                onDelete={(b) => setDeleteBook(b)}
              />
            ))}
          </div>
        )}

  
        {!loading && books.length > 0 && (
          <p className="text-center text-label-sm text-on-surface-variant mt-10">
            Showing {books.length} {books.length === 1 ? "book" : "books"}
            {genre !== "All" ? ` in ${genre}` : ""}
            {debouncedSearch ? ` matching "${debouncedSearch}"` : ""}
          </p>
        )}
      </div>

      <BookModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
        loading={actionLoading}
      />
      <BookModal
        open={!!editBook}
        onClose={() => setEditBook(null)}
        onSubmit={handleEdit}
        initial={editBook}
        loading={actionLoading}
      />
      <DeleteModal
        open={!!deleteBook}
        book={deleteBook}
        onClose={() => setDeleteBook(null)}
        onConfirm={handleDelete}
        loading={actionLoading}
      />
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </main>
  );
}


export { Dashboard };
