import React, { useEffect } from "react";
import { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";
import useLocalStorage from "./hooks/useLocalStorage";
import { Book } from "./types/BookTypes";
import axios from "axios";
import "./App.scss";

const API_URL = "https://book-backend-xa9l.onrender.com/books";

function App() {
  // Declare the use of useLocalStorage with the Book array type
  const [books, setBooks] = useLocalStorage<Book[]>("books", []);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [editBook, setEditBook] = useState<Book | null>(null);

  useEffect(() => {
    try {
      axios.get(`${API_URL}`).then((response) => {
        setBooks(response.data);
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  const handleFormSubmit = (book: Book) => {
    const method = book.id ? "put" : "post";
    const url = book.id ? `${API_URL}/${book.id}` : API_URL;

    try {
      axios[method](url, book).then((response) => {
        if (method === "post") {
          setBooks([...books, response.data]);
        } else {
          setBooks(books.map((b) => (b.id === book.id ? response.data : b)));
        }
      });
    } catch (error) {
      console.error("Saving Book Failed", error);
    }

    if (editBook && books.some((b) => b.id === book.id)) {
      setBooks(books.map((b) => (b.id === book.id ? book : b)));
    } else {
      const newBook = { ...book, id: Math.random() }; // Ensure unique ID for new books
      setBooks([...books, newBook]);
    }
    setEditBook(null); // Reset edit book after submitting
  };

  const handleDelete = (bookId: number) => {
    axios.delete(`${API_URL}/${bookId}`).then(() => {
      try {
        setBooks(books.filter((book) => book.id !== bookId));
      } catch (error) {
        console.error("Deleting book failed:", error);
      }
    });
    // setBooks(books.filter((book) => book.id !== bookId));
  };

  const handleEdit = (book: Book) => {
    setEditBook(book);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <BookForm onSubmit={handleFormSubmit} initialData={editBook} />
      <BookList
        books={filteredBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
