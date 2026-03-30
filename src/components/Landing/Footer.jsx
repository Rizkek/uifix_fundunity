import React, { useState } from 'react';
import { PiPhone, PiEnvelope, PiMapPin, PiPaperPlaneTilt, PiUsers, PiHandshake, PiTarget, PiInstagramLogo, PiWhatsappLogo } from 'react-icons/pi';
import logoImg from "../../assets/images/Logo.png";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call for newsletter subscription
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 1000);
  };
  
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="md:col-span-4">
             <div className="flex items-center gap-3 mb-6">
                <img src={logoImg} alt="Logo" className="w-10 h-10 rounded-xl shadow-sm bg-white" />
                <span className="font-black tracking-tight text-2xl text-white">HMT<span className="text-emerald-500">-Unpad.</span></span>
             </div>
             <p className="mb-6 leading-relaxed">
              Platform konektivitas, galang dana, dan transparansi organisasi terpercaya. Bersama memberdayakan masyarakat dan mencetak dampak positif setiap harinya.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"><PiInstagramLogo size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"><PiWhatsappLogo size={20} /></a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Organisasi</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Visi & Misi</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Laporan Tahunan</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Karir & Relawan</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <PiMapPin size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>Sekretariat Utama<br />Gedung Kemahasiswaan Lt. 2, Jatinangor</span>
              </li>
              <li className="flex items-center gap-3">
                <PiPhone size={20} className="text-emerald-500 shrink-0" />
                <span>+62 811 2233 4455</span>
              </li>
              <li className="flex items-center gap-3">
                <PiEnvelope size={20} className="text-emerald-500 shrink-0" />
                <span>hmt@unpad.ac.id</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-sm">Newsletter</h4>
            <p className="mb-4 text-sm">Dapatkan laporan bulanan dan kabar baik penyaluran dana langsung ke email Anda.</p>
            {subscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-bold animate-fade-in flex items-center gap-3">
                 Terima kasih! Email Anda telah terdaftar.
              </div>
            ) : (
              <form className="relative" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat email Anda..." 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-white outline-none focus:border-emerald-500 transition-colors"
                  disabled={loading}
                />
                <button type="submit" disabled={loading} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white hover:bg-emerald-400 transition-colors disabled:opacity-50">
                  {loading ? <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div> : <PiPaperPlaneTilt size={20} />}
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} HMT-Unpad. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;