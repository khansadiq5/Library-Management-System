import { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";

const BookList = () => {
  const { books, toggleIssue, deleteBook } = useContext(LibraryContext);

  if (!books || books.length === 0) return <p className="p-6 text-center text-gray-500">No books added yet.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {books.map((book) => (
        <div key={book.id} className="border p-4 rounded shadow">
          <img src={book.image || "https://via.placeholder.com/150"} alt={book.title} className="w-full h-48 object-cover mb-4 rounded" />
          <h2 className="font-bold text-lg">{book.title}</h2>
          <p className="text-gray-600">{book.author}</p>
          <p className="mt-2">
            Status: <span className={book.status === "available" ? "text-green-600" : "text-red-600"}>{book.status}</span>
          </p>
          {book.issueDate && <p>Issued on: {book.issueDate}</p>}
          <div className="mt-4 flex gap-2">
            <button onClick={() => toggleIssue(book.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              {book.status === "available" ? "Issue" : "Return"}
            </button>
            <button onClick={() => deleteBook(book.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
