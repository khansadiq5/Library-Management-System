import { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle2, XCircle, Layers, AlertCircle, X } from "lucide-react";

const Dashboard = () => {
  const { books, user } = useContext(LibraryContext);
  const navigate = useNavigate();
  
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  const total = books.length;
  const issued = books.filter((b) => b.status === "issued").length;
  const available = total - issued;
  const categories = [...new Set(books.map((b) => b.category))].length;

  const allAvailable = books.filter((book) => book.status === "available");

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const previewBooks = isMobile ? allAvailable.slice(0, 6) : allAvailable;

  const handleViewAllClick = (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuthAlert(true);
      setTimeout(() => setShowAuthAlert(false), 3000);
    } else {
      navigate("/books");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 relative">
      
      {showAuthAlert && (
        <div className="fixed top-24 right-8 z-[200] animate-[slideIn_0.4s_ease-out]">
          <div className="flex items-center gap-4 bg-[#fef2f2] border border-[#fee2e2] px-6 py-4 rounded-[20px] shadow-xl min-w-[320px]">
            
            <div className="bg-[#fee2e2] p-2 rounded-full flex items-center justify-center">
              <AlertCircle className="text-[#dc2626]" size={20} />
            </div>

            <div className="flex-grow">
              <p className="text-[#991b1b] font-bold text-sm leading-none">Access Denied!</p>
              <p className="text-[#dc2626] text-xs mt-1 underline decoration-[#fca5a5]">
                Please Login / Sign Up first
              </p>
            </div>

            <button 
              onClick={() => setShowAuthAlert(false)} 
              className="text-[#fca5a5] hover:text-[#991b1b] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* ===== PAGE TITLE ===== */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Overview of your library system</p>
      </div>

      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Total Books</h3>
            <BookOpen size={20} className="text-gray-700" />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">{total}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Available</h3>
            <CheckCircle2 size={20} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">{available}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Issued</h3>
            <XCircle size={20} className="text-rose-600" />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">{issued}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500">Categories</h3>
            <Layers size={20} className="text-indigo-600" />
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-900">{categories}</p>
        </div>
      </div>

      {/* ===== RECENT BOOKS HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900">
          Available Books {isMobile && allAvailable.length > 6 && "(Top 6)"}
        </h3>
        <button
          onClick={handleViewAllClick}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
        >
          View All →
        </button>
      </div>

      {/* ===== BOOK PREVIEW GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {previewBooks.length > 0 ? (
          previewBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
              <div className="overflow-hidden bg-gray-100 aspect-[4/3]">
                <img
                  src={book.image || "https://via.placeholder.com/400x300"}
                  alt={book.title}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-[11px] font-semibold tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">
                  {book.category}
                </span>
                <h4 className="mt-3 text-base font-semibold text-gray-900 line-clamp-2">{book.title}</h4>
                <p className="mt-1.5 text-sm text-gray-500">by <span className="text-gray-700 font-medium">{book.author}</span></p>
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
          <p className="text-gray-500">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;