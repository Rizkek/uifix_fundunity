import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { PiLock, PiEnvelope, PiShieldCheck } from "react-icons/pi";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    login,
    error: authError,
    loading: authLoading,
    isAuthenticated,
    clearError,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || "/home";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    clearError();

    try {
      await login(email.trim(), password);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Autentikasi gagal. Silakan periksa kredensial Anda.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 font-sans px-4">
      <div className="w-full max-w-md">
        
        {/* Logo/Icon Header */}
        <div className="flex flex-col items-center mb-10">
           <div className="w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 flex items-center justify-center mb-4">
              <PiShieldCheck size={32} className="text-white" />
           </div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tight">FundUnity Admin</h1>
           <p className="text-slate-500 text-sm mt-1 font-medium">Panel Manajemen Organisasi Internal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 md:p-10">
          
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-800">Masuk ke Akun</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Gunakan akses resmi Anda</p>
          </div>

          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-xs font-bold animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <PiEnvelope size={16} className="text-slate-300" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fundunity.org"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <PiLock size={16} className="text-slate-300" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Lupa Kata Sandi?
              </button>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className={`w-full py-4 rounded-2xl text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-100 transition-all transform active:scale-[0.98] ${
                authLoading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {authLoading ? "MENGOTENTIKASI..." : "MASUK KE DASHBOARD"}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-12">
           &copy; 2024 FundUnity Foundation • Secure Access Only
        </p>

      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default Login;
