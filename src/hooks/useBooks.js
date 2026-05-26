import { useState, useEffect, useCallback } from "react";
import { bookService } from "../services/api";

export function useBooks({ search, genre, sortBy }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data = await bookService.getBooks({ search, genre });

   
      if (sortBy === "title") {
        data = [...data].sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === "author") {
        data = [...data].sort((a, b) => a.author.localeCompare(b.author));
      } else if (sortBy === "year") {
        data = [...data].sort((a, b) => Number(b.year) - Number(a.year));
      }
 
      else {
        data = [...data].reverse();
      }

      setBooks(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load books.");
    } finally {
      setLoading(false);
    }
  }, [search, genre, sortBy]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async (bookData) => {
    const created = await bookService.createBook(bookData);
    setBooks((prev) => [created, ...prev]);
    return created;
  };

  const updateBook = async (id, bookData) => {
    const updated = await bookService.updateBook(id, bookData);
    setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
    return updated;
  };

  const deleteBook = async (id) => {
    await bookService.deleteBook(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return { books, loading, error, refetch: fetchBooks, addBook, updateBook, deleteBook };
}
