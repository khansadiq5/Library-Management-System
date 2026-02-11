import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, X, AlertCircle } from "lucide-react";

const ProtectedAlertModal = ({ close }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // 3 second baad automatically close ho jaye
    const timer = setTimeout(() => {
      close();
    }, 3000);
    return () => clearTimeout(timer);
  }, [close]);

  return (
    <div className="fixed top-20 right-8 z-[100] animate-[slideIn_0.4s_ease-out]">
      <div className="flex items-center gap-3 bg-[#fdf2f2] border border-[#fecaca] px-6 py-4 rounded-2xl shadow-lg">
        <AlertCircle className="text-[#dc2626]" size={22} />
        <div className="flex flex-col">
          <span className="text-[#991b1b] font-bold text-sm">Access Denied!</span>
          <button 
            onClick={() => { close(); navigate("/auth"); }}
            className="text-[#dc2626] text-xs font-semibold underline text-left"
          >
            Please Login / Sign Up first
          </button>
        </div>
        <button onClick={close} className="ml-4 text-[#dc2626]/50 hover:text-[#dc2626]">
          <X size={18} />
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ProtectedAlertModal;