import React, { useState, useRef } from "react";
import { PiGlobe, PiCamera, PiFloppyDisk, PiCheckCircle, PiBuilding, PiHash, PiPhone, PiEnvelope, PiInstagramLogo, PiMapPin } from "react-icons/pi";
import Header from "../layout/Header";

const WebsiteIdentity = () => {
  const [saved, setSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [orgName, setOrgName] = useState("Himpunan Mahasiswa Teknik");
  const [shortName, setShortName] = useState("HMT-Unpad");
  const [tagline, setTagline] = useState("Sinergi dalam Keberagaman, Unggul dalam Karya.");
  const [contactEmail, setContactEmail] = useState("hmt@unpad.ac.id");
  const [contactPhone, setContactPhone] = useState("08123456789");
  const [instagram, setInstagram] = useState("@hmt_unpad");
  const [address, setAddress] = useState("Gedung Kemahasiswaan Lt. 2, Jatinangor");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setLogoPreview(url);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />

      <div className="flex-1 p-8 max-w-[1200px] mx-auto w-full space-y-8">
        {/* Toast */}
        {saved && (
          <div className="flex items-center gap-3 px-5 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-bold animate-fade-in fixed top-24 right-8 z-[100] shadow-lg">
            <PiCheckCircle size={16} /> Identitas website berhasil diperbarui.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Logo & Brand Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-8 flex flex-col items-center text-center">
              <div 
                className="relative group cursor-pointer mb-6" 
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-32 h-32 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center p-4 transition-all group-hover:border-emerald-300 group-hover:bg-emerald-50 overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain" />
                  ) : (
                    <PiGlobe size={48} className="text-slate-300 transition-colors group-hover:text-emerald-500" />
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-2 rounded-xl shadow-lg transform transition-transform group-hover:scale-110">
                  <PiCamera size={16} />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleLogoChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              
              <h2 className="text-lg font-bold text-slate-900 leading-tight">{orgName}</h2>
              <p className="text-sm text-slate-400 mt-1 font-medium">{shortName}</p>
              
              <div className="mt-8 pt-8 border-t border-slate-50 w-full">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-4">Preview Sidebar</p>
                <div className="bg-emerald-600 rounded-xl p-4 flex items-center gap-3 text-left">
                   <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
                      <PiGlobe size={16} className="text-white" />
                   </div>
                   <span className="text-xs font-bold text-white truncate">{shortName}</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-emerald-800 mb-2">Tips Identitas</h4>
              <p className="text-xs text-emerald-700/80 leading-relaxed">
                Gunakan nama resmi organisasi untuk <b>Nama Lengkap</b>. <b>Nama Pendek</b> akan muncul di Sidebar dan area yang terbatas ruangnya. Pastikan logo yang diunggah berlatar belakang transparan (PNG) untuk hasil terbaik.
              </p>
            </div>
          </div>

          {/* Right Side: Main Forms */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30">
                <h3 className="text-sm font-bold text-slate-900">Informasi Dasar Organisasi</h3>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <PiBuilding size={14} className="text-emerald-500" />
                      Nama Lengkap Organisasi
                    </label>
                    <input 
                      type="text" 
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all"
                      placeholder="Masukkan nama lengkap..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <PiHash size={14} className="text-emerald-500" />
                      Nama Pendek (Alias)
                    </label>
                    <input 
                      type="text" 
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all"
                      placeholder="HIMA-XYZ"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Tagline Utama</label>
                  <input 
                    type="text" 
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all"
                    placeholder="Slogan inspiratif organisasi..."
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-b border-t border-slate-100 bg-slate-50/30">
                <h3 className="text-sm font-bold text-slate-900">Kontak & Media Sosial</h3>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <PiEnvelope size={14} className="text-emerald-500" />
                      Email Publik
                    </label>
                    <input 
                      type="email" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <PiPhone size={14} className="text-emerald-500" />
                      WhatsApp/Telepon
                    </label>
                    <input 
                      type="text" 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <PiInstagramLogo size={14} className="text-emerald-500" />
                      Instagram Username
                    </label>
                    <input 
                      type="text" 
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <PiMapPin size={14} className="text-emerald-500" />
                      Alamat / Sekretariat
                    </label>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-400 transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <PiFloppyDisk size={18} /> Simpan Perubahan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WebsiteIdentity;
