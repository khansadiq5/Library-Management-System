import { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";

const Books = () => {
  const { books, deleteBook, toggleIssue } = useContext(LibraryContext);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((book) =>
      selectedCategory ? book.category === selectedCategory : true
    );

  const categories = [...new Set(books.map((book) => book.category))];

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        All Books
      </h2>

      {/* Books Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={book.image || "https://via.placeholder.com/300x200"}
                  alt={book.title}
                  className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* ===== Content Section ===== */}
              <div className="p-5 flex flex-col flex-grow">

                {/* Category Badge */}
                <span className="text-[11px] font-semibold tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">
                  {book.category}
                </span>

                {/* Title */}
                <h3 className="mt-4 text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                  {book.title}
                </h3>

                {/* Author */}
                <p className="mt-3 mb-3 text-sm text-gray-500">
                  Written by{" "}
                  <span className="text-gray-700 font-medium">
                    {book.author}
                  </span>
                </p>

                {/* Status + Date */}
                <div className="flex items-center justify-between">

                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full ${
                      book.status === "available"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        book.status === "available"
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                      }`}
                    ></span>
                    {book.status === "available" ? "Available" : "Issued"}
                  </span>

                  {book.issueDate && (
                    <span className="text-xs text-gray-400">
                      {book.issueDate}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-3.5 flex gap-3">
                  <button
                    onClick={() => toggleIssue(book.id)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                      book.status === "available"
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {book.status === "available" ? "Issue" : "Return"}
                  </button>

                  <button
                    onClick={() => deleteBook(book.id)}
                    className="flex-1 py-2 rounded-lg text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">
            No books found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Books;
