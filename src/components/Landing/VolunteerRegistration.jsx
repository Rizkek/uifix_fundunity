import React, { useState } from "react";
import { PiCheckCircleFill, PiHandshake, PiNewspaper, PiUser, PiEnvelope, PiPhone } from "react-icons/pi";

export default function VolunteerRegistration() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", category: "Acara Sosial" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending data to Admin (Messages.tsx or new Relawan Database)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 text-center shadow-2xl relative z-10 border border-slate-100 animate-slide-up">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <PiCheckCircleFill size={40} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Terima Kasih, Relawan Baru!</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Pendaftaran Anda berhasil kami terima dan akan masuk ke sistem Admin kami. Koordinator relawan kami akan segera menghubungi Anda melalui Email atau WhatsApp untuk proses _onboarding_ lebih lanjut.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
        >
          Kirim Pendaftaran Lain
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-slate-100 flex flex-col md:flex-row">
      
      <div className="md:w-5/12 bg-emerald-600 p-10 text-white flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-12 -translate-y-12"></div>
         <PiHandshake size={48} className="mb-6 opacity-90" />
         <h3 className="text-2xl font-extrabold mb-4">Mari Bergabung & Terlibat</h3>
         <p className="text-sm text-emerald-100 italic mb-6">
           "Kami tidak bisa jalan sendirian."
         </p>
         <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
            <p className="text-xs font-bold text-white mb-2 uppercase tracking-widest">Informasi Sistem:</p>
            <p className="text-sm text-white leading-relaxed">
              Pendaftaran yang Anda lengkapi di sini akan masuk langsung ke antrean <b>Database Relawan</b> kami di Dashboard Admin.
            </p>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="md:w-7/12 p-10 flex flex-col gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Nama Lengkap</label>
          <div className="relative">
             <PiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
             <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all text-slate-800" placeholder="Cth: Budi Santoso" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Email</label>
            <div className="relative">
               <PiEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
               <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all text-slate-800" placeholder="budi@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Nomor WhatsApp</label>
            <div className="relative">
               <PiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
               <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all text-slate-800" placeholder="+62 8..." />
            </div>
          </div>
        </div>

        <div>
           <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Bidang Kolaborasi</label>
           <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all text-slate-800 appearance-none">
             <option value="Acara Sosial">Panitia Acara Sosial</option>
             <option value="Relawan Lapangan">Relawan Terjun Lapangan</option>
             <option value="Digital Media">Desain & Media Publikasi</option>
             <option value="Kemitraan">Fundraiser / Kemitraan</option>
           </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Pesan Tambahan (Opsional)</label>
          <div className="relative">
             <PiNewspaper className="absolute left-3.5 top-4 text-slate-400" />
             <textarea rows="3" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all text-slate-800 resize-none" placeholder="Ceritakan motivasi atau keahlian spesifik Anda..."></textarea>
          </div>
        </div>

        <button disabled={loading} type="submit" className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2">
          {loading ? (
             <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
          ) : (
             "Kirim Pendaftaran"
          )}
        </button>
      </form>
    </div>
  );
}
