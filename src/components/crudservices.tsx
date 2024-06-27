import axios from "axios";
import { Book } from "../types/BookTypes";

const API_URL = "https://book-backend-xa9l.onrender.com/books";

export const getBooks = async (): Promise<Book[] | undefined> => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

export const saveBook = async (book: Book): Promise<Book> => {
  const response = await axios.put<Book>(`${API_URL}/${book.id}`, book);
  return response.data;
};

export const createBook = async (book: Book): Promise<Book> => {
  const response = await axios.post<Book>(`${API_URL}`, book);
  return response.data;
};

export const deleteBook = async (bookId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${bookId}`);
};
