import { createContext, useState, useEffect } from "react";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("books");
      const parsed = saved ? JSON.parse(saved) : [];
      // Fallback image for saved books
      return parsed.map((b) => ({ ...b, image: b.image || "https://via.placeholder.com/150" }));
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks((prev) => [
      ...prev,
      {
        ...book,
        id: Date.now(),
        image: book.image || "https://via.placeholder.com/150", // fallback
      },
    ]);
  };

  const deleteBook = (id) => setBooks((prev) => prev.filter((book) => book.id !== id));

  const toggleIssue = (id) =>
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id
          ? {
              ...book,
              status: book.status === "available" ? "issued" : "available",
              issueDate: book.status === "available" ? new Date().toLocaleDateString() : null,
            }
          : book
      )
    );

  return (
    <LibraryContext.Provider value={{ books, addBook, deleteBook, toggleIssue }}>
      {children}
    </LibraryContext.Provider>
  );
};
