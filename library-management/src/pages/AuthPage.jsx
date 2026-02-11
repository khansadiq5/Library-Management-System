import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, UserPlus, BarChart2, ArrowLeft, CheckCircle2, X } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const { login, signup } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Name agar Login mein khali hai toh Email se utha lega
    const finalName = formData.name || formData.email.split('@')[0];
    const userData = { name: finalName, email: formData.email, password: formData.password };

    if (isLogin) login(userData);
    else signup(userData);

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4 relative">
      
      {showToast && (
        <div className="fixed top-8 right-8 z-[200] animate-[slideIn_0.4s_ease-out]">
          <div className="flex items-center gap-3 bg-[#f0fdf4] border border-[#bbf7d0] px-6 py-4 rounded-2xl shadow-lg">
            <CheckCircle2 className="text-[#16a34a]" size={22} />
            <span className="text-[#15803d] font-bold">
                {isLogin ? `Welcome back, ${formData.name || 'User'}!` : "Account Created!"}
            </span>
            <button onClick={() => setShowToast(false)} className="ml-4 text-[#16a34a]/50 hover:text-[#16a34a]">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-10 w-full max-w-[440px] shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ab Login aur Signup dono mein Name field dikhegi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50/50"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50/50"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full border border-gray-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50/50"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg mt-4 shadow-lg shadow-blue-200">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 font-bold hover:underline">
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default AuthPage;