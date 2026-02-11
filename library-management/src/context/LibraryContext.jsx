import { createContext, useState, useEffect } from "react";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const defaultBooks = [
    { id: 1, title: "Atomic Habits", author: "James Clear", category: "Self Help", status: "issued",issueDate: "2026-01-20", image: "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX329_BO1,204,203,200_.jpg" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", status: "available", image: "https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX320_BO1,204,203,200_.jpg" },
    { id: 3, title: "Clean Code", author: "Robert C. Martin", category: "Programming", status: "issued", issueDate: "2026-01-01", image: "https://images-na.ssl-images-amazon.com/images/I/41-sN-mzwKL._SX374_BO1,204,203,200_.jpg" },
    { id: 4, title: "Deep Work", author: "Cal Newport", category: "Productivity", status: "available", image: "https://m.media-amazon.com/images/I/61zt25yYrCL._AC_UF1000,1000_QL80_.jpg" },
    { id: 5, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", status: "available", image: "https://e7.pngegg.com/pngimages/58/976/png-clipart-robert-kiyosaki-rich-dad-poor-dad-what-the-rich-teach-their-kids-about-money-that-the-poor-and-the-middle-class-do-not-mass-market-paperback-others-text-poster.png" },
    { id: 6, title: "You Don't Know JS", author: "Kyle Simpson", category: "Programming", status: "available", image: "https://image.yes24.com/goods/124396125/XL" },
    { id: 7, title: "Think and Grow Rich", author: "Napoleon Hill", category: "Self Help", status: "available", image: "https://i.pinimg.com/736x/f6/38/44/f638445e06629ef988231be6eda30aab.jpg" },
    { id: 8, title: "Zero to One", author: "Peter Thiel", category: "Business", status: "available", image: "https://images-na.ssl-images-amazon.com/images/I/41uPjEenkFL._SX329_BO1,204,203,200_.jpg" },
    { id: 9, title: "The Psychology of Money", author: "Morgan Housel", category: "Finance", status: "available", image: "https://images-na.ssl-images-amazon.com/images/I/41-sN-mzwKL._SX326_BO1,204,203,200_.jpg" },
    { id: 10, title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "Programming", status: "issued", issueDate: "2026-01-15", image: "https://eloquentjavascript.net/2nd_edition/img/cover.png" },
    { id: 11, title: "The 5 AM Club", author: "Robin Sharma", category: "Self Help", status: "issued", issueDate: "2026-01-10", image: "https://www.crossword.in/cdn/shop/products/crosswordonline-books-default-title-the-5-am-club-own-your-morning-elevate-your-life-paperback-19-december-2018-paperback-sharma-robin-40421969887449.jpg?v=1745699379" },
    { id: 12, title: "Sapiens", author: "Yuval Noah Harari", category: "History", status: "issued", issueDate: "2026-01-05", image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1594616346i/54110137.jpg" },
    { id: 13, title: "The Alchemist 2", author: "Paulo Coelho", category: "Fiction", status: "issued", issueDate: "2026-01-02", image: "https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX320_BO1,204,203,200_.jpg" },
    { id: 14, title: "Clean Architecture", author: "Robert C. Martin", category: "Programming", status: "available",  image: "https://images-na.ssl-images-amazon.com/images/I/41-sN-mzwKL._SX374_BO1,204,203,200_.jpg" },
  ];

  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("books");
      if (!saved) return defaultBooks;
      const parsed = JSON.parse(saved);
      return parsed.length === 0 ? defaultBooks : parsed.map(b => ({ ...b, image: b.image || "https://via.placeholder.com/150" }));
    } catch {
      return defaultBooks;
    }
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks(prev => [
      ...prev,
      { ...book, id: Date.now(), image: book.image || "https://via.placeholder.com/150" },
    ]);
  };

  const deleteBook = (id) => setBooks(prev => prev.filter(b => b.id !== id));

  const toggleIssue = (id) =>
    setBooks(prev =>
      prev.map(b =>
        b.id === id
          ? { ...b, status: b.status === "available" ? "issued" : "available", issueDate: b.status === "available" ? new Date().toLocaleDateString() : null }
          : b
      )
    );

  return (
    <LibraryContext.Provider value={{ books, addBook, deleteBook, toggleIssue }}>
      {children}
    </LibraryContext.Provider>
  );
};
