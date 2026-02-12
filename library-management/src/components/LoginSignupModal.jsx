import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { LogIn, UserPlus, BarChart2, X } from "lucide-react"; 

const LoginSignupModal = ({ close, initialIsLogin = true }) => {
  const { login, signup } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (isLogin) {
      if (!formData.email || !formData.password) return;
      login(formData.email); 
    } else {
      if (!formData.name || !formData.email || !formData.password) return;
      signup(formData.name);
    }
    close();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="relative bg-white rounded-2xl p-8 w-full max-w-[400px] shadow-2xl border border-gray-100">
        
        {/* Logo Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-50 p-3 rounded-full">
            <BarChart2 className="text-blue-500" size={24} style={{ transform: 'rotate(90deg)' }} />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3.5 rounded-xl hover:bg-blue-600 transition-colors font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
          >
            {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 font-bold hover:text-blue-600 ml-1"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>

        <button 
          type="button"
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default LoginSignupModal;