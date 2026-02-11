import { useState, useContext, useRef } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const { addBook } = useContext(LibraryContext);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      title,
      author,
      category,
      image, // image optional, placeholder auto-set in context
      status: "available",
      issueDate: null,
    });
    setTitle(""); setAuthor(""); setCategory(""); setImage(null); setPreview(null);
    navigate("/books");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Book Title" value={title} onChange={(e)=>setTitle(e.target.value)} required className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" />
          <input type="text" placeholder="Author Name" value={author} onChange={(e)=>setAuthor(e.target.value)} required className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" />
          <input type="text" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)} required className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" />

          <div onClick={()=>fileInputRef.current.click()} className="cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition">
            {!preview ? (
              <div>
                <p className="text-gray-500">Click to upload book cover</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG supported</p>
              </div>
            ) : (
              <img src={preview} alt="Preview" className="h-40 w-full object-cover rounded-xl shadow" />
            )}
          </div>

          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />

          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition font-semibold">Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
