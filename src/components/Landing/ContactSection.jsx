import React, { useState } from "react";
import { PiEnvelopeOpen, PiPaperPlaneTilt, PiChatText, PiCheckCircleFill, PiUser } from "react-icons/pi";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending message to Admin (Messages.tsx)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Text Area */}
        <div className="max-w-lg">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4 block flex items-center gap-2">
            <PiChatText size={20} /> Hubungi Kami
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Punya Pertanyaan atau <span className="text-emerald-500">Inisiasi Kolaborasi?</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            Pesan yang dikirim melalui formulir ini akan langsung diterima oleh Kotak Masuk admin organisasi. Kami sangat terbuka untuk diskusi program, pelaporan, hingga <i>partnership</i>.
          </p>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
               <PiEnvelopeOpen size={24} />
            </div>
            <div>
               <p className="font-bold text-slate-800 text-lg">Respon Cepat 1x24 Jam</p>
               <p className="text-slate-500 text-sm">Tim humas kami terpantau aktif di hari kerja.</p>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative">
          
          {submitted ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <PiCheckCircleFill size={40} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Pesan Terkirim!</h3>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                Terima kasih telah menjangkau kami. Pesan Anda telah masuk ke sistem dan akan segera kami tindaklanjuti.
              </p>
              <button onClick={() => setSubmitted(false)} className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors border-b-2 border-emerald-600/30 pb-1">
                Kirim Pesan Lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Nama Pengirim</label>
                <div className="relative">
                  <PiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all" placeholder="Nama Anda atau Organisasi" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Email Balasan</label>
                <div className="relative">
                  <PiEnvelopeOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all" placeholder="alamat@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Isi Pesan</label>
                <textarea required rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm transition-all resize-none" placeholder="Tuliskan tujuan / masalah yang ingin didiskusikan..."></textarea>
              </div>
              <button disabled={loading} type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3">
                {loading ? (
                   <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                ) : (
                   <>Kirim Pesan <PiPaperPlaneTilt size={20} /></>
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
