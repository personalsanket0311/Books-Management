import axios from "axios";
 
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
 
const api = axios.create({ baseURL: BASE_URL });
 
export const bookService = {

  getBooks: async ({ search = "", genre = "" } = {}) => {
    const params = {};
    if (genre && genre !== "All") params.genre = genre;
    if (search) params.q = search; 
    const res = await api.get("/books", { params });
    return res.data;
  },
 

  getBook: async (id) => {
    const res = await api.get(`/books/${id}`);
    return res.data;
  },
 

  createBook: async (book) => {
    const res = await api.post("/books", book);
    return res.data;
  },
 
  updateBook: async (id, book) => {
    const res = await api.put(`/books/${id}`, book);
    return res.data;
  },
 
  deleteBook: async (id) => {
    const res = await api.delete(`/books/${id}`);
    return res.data;
  },
};