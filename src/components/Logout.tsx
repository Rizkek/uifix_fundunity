import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { PiSignOut, PiDoorOpen } from "react-icons/pi";

const Logout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50 font-sans">
      
      {/* Visual Placeholder */}
      <div className="text-center mb-8">
         <div className="w-20 h-20 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <PiSignOut size={32} className="text-slate-400 ml-1" />
         </div>
         <h1 className="text-xl font-bold text-slate-800 tracking-tight">System Exit</h1>
         <p className="text-sm text-slate-400 font-medium">Klik tombol di bawah untuk mengakhiri sesi.</p>
      </div>

      <button
        className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all outline-none"
        onClick={() => setIsModalOpen(true)}
      >
        KELUAR DARI PANEL
      </button>

      {/* Confirmation modal design standardized */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex justify-center items-center z-[200] p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in">
             <div className="p-8 text-center">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                   <PiDoorOpen size={32} />
                </div>
                <h2 className="text-xl font-black text-slate-900 leading-tight">
                  Konfirmasi Logout
                </h2>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  Apakah Anda yakin ingin mengakhiri sesi administrasi ini?
                </p>
             </div>
             
             <div className="px-8 pb-8 flex flex-col gap-3">
               <button
                 onClick={handleConfirmLogout}
                 className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95"
               >
                 YA, KELUAR SEKARANG
               </button>
               <button
                 onClick={() => setIsModalOpen(false)}
                 className="w-full py-3.5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all outline-none"
               >
                 BATALKAN
               </button>
             </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Logout;