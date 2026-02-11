import { useContext } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, XCircle, Layers } from "lucide-react";

const Dashboard = () => {
  const { books } = useContext(LibraryContext);

  const total = books.length;
  const issued = books.filter((b) => b.status === "issued").length;
  const available = total - issued;
  const categories = [...new Set(books.map((b) => b.category))].length;

  // ✅ Sirf Available Books
  const previewBooks = books
    .filter((book) => book.status === "available")
    .slice(0, 6);

  return (
    <div className="p-8 min-h-screen bg-gray-50">

      {/* ===== PAGE TITLE ===== */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your library system
        </p>
      </div>

      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Total Books</h3>
            <BookOpen size={20} className="text-gray-700" />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">
            {total}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Available</h3>
            <CheckCircle2 size={20} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">
            {available}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Issued</h3>
            <XCircle size={20} className="text-rose-600" />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">
            {issued}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Categories</h3>
            <Layers size={20} className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">
            {categories}
          </p>
        </div>

      </div>

      {/* ===== RECENT BOOKS HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900">
          Available Books
        </h3>

        <Link
          to="/books"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
        >
          View All →
        </Link>
      </div>

      {/* ===== BOOK PREVIEW GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {previewBooks.length > 0 ? (
          previewBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-lg hover:transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={book.image || "https://via.placeholder.com/400x300"}
                  alt={book.title}
                  className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Professional Content */}
              <div className="p-5 flex flex-col flex-grow">

                {/* Category Badge */}
                <span className="text-[11px] font-semibold tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">
                  {book.category}
                </span>

                {/* Title */}
                <h4 className="mt-3 text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                  {book.title}
                </h4>

                {/* Author */}
                <p className="mt-1.5 text-sm text-gray-500">
                  by <span className="text-gray-700 font-medium">{book.author}</span>
                </p>

                {/* Status Badge */}
                <div className="mt-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Available
                  </span>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No available books.
          </p>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
