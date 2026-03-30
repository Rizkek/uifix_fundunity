import { PiEnvelope, PiLock, PiFloppyDisk, PiUser, PiShieldCheck, PiCaretRight, PiEye, PiEyeSlash, PiPencilSimple, PiCamera, PiSignOut, PiCheckCircle, PiImage, PiFlag, PiTag, PiBuilding, PiHash, PiPhone, PiInstagramLogo, PiMapPin, PiBrowser } from "react-icons/pi";
import Header from "../layout/Header";
import { useRef, useState } from "react";

// Tipe menu sidebar settings
type SettingTab = "profil" | "identitas" | "pembayaran" | "seo" | "keamanan";

const Settings = () => {
  const [savedMessage, setSavedMessage] = useState("");
  
  // --- State: Profile ---
  const [displayName, setDisplayName] = useState("Administrator Utama");
  const [email, setEmail] = useState("admin@fundunity.org");
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- State: Password ---
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState("");

  // --- State: Identitas Website ---
  const [orgName, setOrgName] = useState("Himpunan Mahasiswa Teknik");
  const [shortName, setShortName] = useState("HMT-Unpad");
  const [tagline, setTagline] = useState("Sinergi dalam Keberagaman, Unggul dalam Karya.");
  const [contactEmail, setContactEmail] = useState("hmt@unpad.ac.id");
  const [contactPhone, setContactPhone] = useState("08123456789");
  const [instagram, setInstagram] = useState("@hmt_unpad");
  const [address, setAddress] = useState("Gedung Kemahasiswaan Lt. 2, Jatinangor");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // --- State: Pembayaran ---
  const [bankName, setBankName] = useState("Bank BCA");
  const [accountNo, setAccountNo] = useState("8984 1234 5678");
  const [accountHolder, setAccountHolder] = useState("HMT-Unpad");
  const [qrisReady, setQrisReady] = useState(true);

  // --- State: SEO & Pemeliharaan ---
  const [metaDesc, setMetaDesc] = useState("Platform donasi dan transparansi keuangan Himpunan Mahasiswa Teknik.");
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [copyright, setCopyright] = useState("2024 HMT-Unpad. All rights reserved.");

  // --- State: Active Tab ---
  const [activeTab, setActiveTab] = useState<SettingTab>("profil");

  // --- Handlers ---
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfilePhoto(imageUrl);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setLogoPreview(url);
    }
  };

  const triggerSaveToast = (msg: string) => {
    setSavedMessage(msg);
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleSaveEmail = () => {
    if (newEmail && newEmail.includes("@")) {
      setEmail(newEmail);
      setEditingEmail(false);
      setNewEmail("");
      triggerSaveToast("Email berhasil diperbarui.");
    }
  };

  const handleSavePassword = () => {
    setPassError("");
    if (!currentPass) { setPassError("Masukkan kata sandi saat ini."); return; }
    if (newPass.length < 8) { setPassError("Kata sandi baru minimal 8 karakter."); return; }
    if (newPass !== confirmPass) { setPassError("Konfirmasi kata sandi tidak cocok."); return; }
    triggerSaveToast("Kata sandi berhasil diperbarui.");
    setCurrentPass(""); setNewPass(""); setConfirmPass("");
  };

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSaveToast("Identitas website berhasil disimpan.");
  };

  const tabs = [
    { key: "profil" as SettingTab, icon: PiUser, label: "Informasi Profil" },
    { key: "identitas" as SettingTab, icon: PiBrowser, label: "Identitas Website" },
    { key: "pembayaran" as SettingTab, icon: PiBuilding, label: "Rekening Donasi" },
    { key: "seo" as SettingTab, icon: PiFlag, label: "SEO & Pemeliharaan" },
    { key: "keamanan" as SettingTab, icon: PiShieldCheck, label: "Keamanan Akun" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />

      <div className="flex-1 p-8 max-w-[1200px] mx-auto w-full space-y-6">

        {/* Global Toast */}
        {savedMessage && (
          <div className="flex items-center gap-3 px-5 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-bold animate-fade-in fixed top-24 right-8 z-[100] shadow-lg">
            <PiCheckCircle size={16} /> {savedMessage}
          </div>
        )}

        {/* Body Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-1 bg-white rounded-2xl p-3 border border-slate-100 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-bold border ${
                  activeTab === tab.key
                    ? "bg-emerald-600 border-emerald-100 text-white shadow-sm"
                    : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={18} className={activeTab === tab.key ? "text-white" : "text-slate-400"} />
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.key && <PiCaretRight size={15} />}
              </button>
            ))}
          </div>

          {/* Main Panel Content container */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/30 border border-slate-100 p-8">

              {/* === TAB: PROFIL AKUN === */}
              {activeTab === "profil" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                     <h3 className="text-base font-bold text-slate-900 mb-1">Informasi Profil Admin</h3>
                     <p className="text-xs text-slate-400">Pengaturan foto profil dan data kontak utama administrator dashboard.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handlePhotoUpload} />
                      <div className="w-24 h-24 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shadow-sm transition-transform group-hover:scale-105">
                        {profilePhoto ? (
                          <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <PiUser size={36} className="text-emerald-600" />
                        )}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-2 rounded-xl shadow-md transition-all group-hover:scale-110">
                        <PiCamera size={14} />
                      </div>
                    </div>
                    <div className="text-center sm:text-left flex-1 space-y-2">
                       <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1.5">Nama Pengguna</label>
                          <div className="flex items-center gap-2 max-w-sm">
                             <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20" />
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-5 pt-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-emerald-600">
                          <PiEnvelope size={18} />
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 font-bold mb-0.5">Email Autentikasi</p>
                          <p className="text-sm font-bold text-slate-800">{email}</p>
                        </div>
                      </div>
                      <button onClick={() => setEditingEmail(!editingEmail)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all">
                        {editingEmail ? "Batal" : "Ubah Email"}
                      </button>
                    </div>

                    {editingEmail && (
                      <div className="p-4 border border-emerald-100 bg-emerald-50/20 rounded-xl animate-fade-in flex flex-col sm:flex-row items-end gap-4">
                        <div className="flex-1 w-full">
                          <label className="block text-xs font-bold text-slate-500 mb-2">Masukkan Email Baru</label>
                          <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="adminbaru@domain.com" />
                        </div>
                        <button onClick={handleSaveEmail} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5">
                          <PiFloppyDisk size={14} /> Simpan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

               {/* === TAB: IDENTITAS WEBSITE === */}
              {activeTab === "identitas" && (
                <form onSubmit={handleSaveIdentity} className="space-y-8 animate-fade-in">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">Identitas & Organisasi</h3>
                    <p className="text-xs text-slate-400">Kelola nama resmi, logo, dan kontak utama organisasi pada platform.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="md:col-span-1">
                        <label className="block text-xs font-bold text-slate-400 mb-1.5">Logo Utama</label>
                        <div className="relative group cursor-pointer" onClick={() => logoInputRef.current?.click()}>
                           <input type="file" accept="image/*" ref={logoInputRef} className="hidden" onChange={handleLogoChange} />
                           <div className="w-full aspect-video sm:aspect-square md:w-40 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-4 transition-all group-hover:bg-emerald-50 group-hover:border-emerald-200 overflow-hidden shadow-sm">
                             {logoPreview ? (
                               <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                             ) : (
                               <PiImage size={40} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                             )}
                           </div>
                           <div className="absolute  bg-emerald-600 text-white p-1.5 rounded-xl shadow-md transform transition-transform group-hover:scale-110">
                             <PiCamera size={14} />
                           </div>
                        </div>
                     </div>

                     <div className="md:col-span-2 space-y-4 justify-center flex flex-col">
                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1.5">
                             <PiFlag size={14} className="text-emerald-500" /> Nama Organisasi
                           </label>
                           <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                        </div>
                        <div className="space-y-1.5">
                           <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1.5">
                             <PiTag size={14} className="text-emerald-500" /> Singkatan / Alias
                           </label>
                           <input type="text" value={shortName} onChange={(e) => setShortName(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-50">
                     <label className="block text-xs font-bold text-slate-500 mb-1.5">Tagline Utama</label>
                     <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500">
                           <PiEnvelope size={14} className="text-emerald-500" /> Email Korespondensi
                        </label>
                        <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                     </div>
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500">
                           <PiPhone size={14} className="text-emerald-500" /> WhatsApp / Kontak
                        </label>
                        <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500">
                           <PiInstagramLogo size={14} className="text-emerald-500" /> Akun Instagram
                        </label>
                        <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500">
                           <PiMapPin size={14} className="text-emerald-500" /> Alamat Sekretariat
                        </label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                     </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-50">
                     <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 flex items-center gap-1.5 transition-all shadow-sm">
                        <PiFloppyDisk size={16} /> Simpan Identitas
                     </button>
                  </div>
                </form>
              )}

              {/* === TAB: PEMBAYARAN === */}
              {activeTab === "pembayaran" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">Pengaturan Pembayaran</h3>
                    <p className="text-xs text-slate-400">Konfigurasi rekening bank dan QRIS yang akan tampil di halaman donasi.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Nama Bank</label>
                      <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Nomor Rekening</label>
                      <input type="text" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Nama Pemilik Rekening</label>
                      <input type="text" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                       <input type="checkbox" checked={qrisReady} onChange={(e) => setQrisReady(e.target.checked)} className="w-5 h-5 rounded-md text-emerald-600 focus:ring-emerald-500" />
                       <div>
                          <p className="text-xs font-bold text-emerald-800">Aktifkan Pembayaran QRIS</p>
                          <p className="text-[10px] text-emerald-600">Munculkan opsi scan kode QR di landing page.</p>
                       </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-50">
                    <button onClick={() => triggerSaveToast("Konfigurasi pembayaran disimpan.")} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 flex items-center gap-1.5">
                      <PiFloppyDisk size={16} /> Simpan Pembayaran
                    </button>
                  </div>
                </div>
              )}

              {/* === TAB: SEO & PEMELIHARAAN === */}
              {activeTab === "seo" && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">SEO & Pengaturan Global</h3>
                    <p className="text-xs text-slate-400">Optimasi pencarian Google dan status operasional website.</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Meta Description (SEO)</label>
                      <textarea rows={2} value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Copyright Text Footer</label>
                      <input type="text" value={copyright} onChange={(e) => setCopyright(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                    </div>
                    
                    <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex items-center justify-between">
                       <div>
                          <p className="text-sm font-bold text-rose-900">Mode Pemeliharaan (Maintenance)</p>
                          <p className="text-xs text-rose-600">Pengunjung tidak dapat mengakses landing page saat aktif.</p>
                       </div>
                       <button 
                        onClick={() => setIsMaintenance(!isMaintenance)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${isMaintenance ? 'bg-rose-600 text-white' : 'bg-white border border-rose-200 text-rose-500 hover:bg-rose-50'}`}
                       >
                         {isMaintenance ? 'Aktif' : 'Nonaktif'}
                       </button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-50">
                    <button onClick={() => triggerSaveToast("Pengaturan SEO & Global disimpan.")} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 flex items-center gap-1.5">
                      <PiFloppyDisk size={16} /> Simpan Pengaturan
                    </button>
                  </div>
                </div>
              )}

              {/* === TAB: KEAMANAN === */}
              {activeTab === "keamanan" && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">Keamanan & Kredensial</h3>
                    <p className="text-xs text-slate-400">Pengaturan kata sandi akun untuk akses manajemen admin.</p>
                  </div>

                  {passError && (
                    <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-4 py-2 rounded-xl">
                      {passError}
                    </div>
                  )}

                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2">Kata Sandi Saat Ini</label>
                      <div className="relative max-w-md">
                        <input type={showCurrentPass ? "text" : "password"} value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-emerald-200 rounded-xl text-sm outline-none" />
                        <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute right-3 top-2 text-slate-400 hover:text-slate-600">
                          {showCurrentPass ? <PiEyeSlash size={16} /> : <PiEye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Kata Sandi Baru</label>
                        <div className="relative">
                          <input type={showNewPass ? "text" : "password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-emerald-200 rounded-xl text-sm outline-none" />
                          <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-2 text-slate-400 hover:text-slate-600">
                            {showNewPass ? <PiEyeSlash size={16} /> : <PiEye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Konfirmasi Sandi Baru</label>
                        <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-emerald-200 rounded-xl text-sm outline-none" />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-50">
                      <button onClick={handleSavePassword} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 flex items-center gap-1.5 transition-all shadow-sm">
                        <PiFloppyDisk size={16} /> Perbarui Password
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Settings;
