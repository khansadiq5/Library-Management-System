import { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BookOpen, Menu, X, User, LogIn, UserPlus, LogOut, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  
  const [openMenu, setOpenMenu] = useState(false);
  const [showProtectedAlert, setShowProtectedAlert] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Add Book", path: "/add" },
  ];

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    
    if (location.pathname === "/books" || location.pathname === "/add") {
      setShowLogoutToast(true);
      setTimeout(() => {
        setShowLogoutToast(false);
        navigate("/");
      }, 1500);
    }
  };

  const handleNavClick = (path, e) => {
    if (!user && (path === "/books" || path === "/add")) {
      e.preventDefault(); 
      setOpenMenu(false); 
      setShowProtectedAlert(true);
      setTimeout(() => setShowProtectedAlert(false), 3000);
      return false;
    }
    setOpenMenu(false);
    return true;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm">
      
      {/* ===== PROFESSIONAL TOASTER (Dashboard Style) ===== */}
      {showProtectedAlert && (
        <div className="fixed top-24 right-4 md:right-8 z-[200] animate-[slideIn_0.4s_ease-out]">
          <div className="flex items-center gap-4 bg-[#fef2f2] border border-[#fee2e2] px-6 py-4 rounded-[20px] shadow-xl min-w-[300px] md:min-w-[320px]">
            <div className="bg-[#fee2e2] p-2 rounded-full flex items-center justify-center">
              <AlertCircle className="text-[#dc2626]" size={20} />
            </div>
            <div className="flex-grow">
              <p className="text-[#991b1b] font-bold text-sm leading-none">Access Denied!</p>
              <p className="text-[#dc2626] text-xs mt-1 underline decoration-[#fca5a5]">
                Please Login / Sign Up first
              </p>
            </div>
            <button onClick={() => setShowProtectedAlert(false)} className="text-[#fca5a5]">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Logout Redirect Toast */}
      {showLogoutToast && (
        <div className="fixed top-20 right-8 z-[200] animate-[slideIn_0.4s_ease-out]">
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-6 py-4 rounded-2xl shadow-lg">
            <CheckCircle2 className="text-black" size={22} />
            <span className="text-black font-bold text-sm">Logged out! Redirecting to home...</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="bg-black text-white p-2 rounded-xl">
            <BookOpen size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800">LibraVault</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleNavClick(item.path, e)}
              className={`relative text-sm font-medium transition duration-300 ${
                location.pathname === item.path ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              {item.name}
              <span className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300 ${
                location.pathname === item.path ? "w-full" : "w-0"
              }`} />
            </Link>
          ))}
        </div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full transition-all"
            >
              <div className="bg-gray-100 p-2 rounded-full text-black shadow-sm">
                <User size={22} />
              </div>
              
              {user && (
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-700">{user.name}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </div>
              )}
              {!user && <ChevronDown size={16} className="text-gray-400" />}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 shadow-xl rounded-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                {!user ? (
                  <>
                    <button
                      onClick={() => { navigate("/auth"); setShowDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogIn size={18} /> Login
                    </button>
                    <button
                      onClick={() => { navigate("/auth"); setShowDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserPlus size={18} /> Sign Up
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                )}
              </div>
            )}
          </div>

          <button onClick={() => setOpenMenu(!openMenu)} className="md:hidden text-gray-700">
            {openMenu ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${openMenu ? "max-h-60 py-4" : "max-h-0"} bg-white border-t border-gray-100`}>
        <div className="flex flex-col items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleNavClick(item.path, e)}
              className={`text-base font-medium ${location.pathname === item.path ? "text-black" : "text-gray-600"}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;