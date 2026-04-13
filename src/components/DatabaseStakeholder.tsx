import React, { useState } from 'react';
import Header from '../layout/Header';
import { PiUsers, PiHeartbeat, PiMagnifyingGlass, PiPlus, PiEnvelopeSimple, PiMapPin, PiHandshake, PiX, PiCheckCircle } from 'react-icons/pi';

interface Donatur { id: number; nama: string; email: string; totalDonasi: number; lastDonasi: string; }
interface Penerima { id: number; nama: string; program: string; nilai: number; lokasi: string; }
interface Relawan { id: number; nama: string; email: string; phone: string; kategori: string; date: string; }

const MOCK_DONATUR: Donatur[] = [
  { id: 1, nama: 'Budi Santoso', email: 'budi@mail.com', totalDonasi: 12500000, lastDonasi: '2025-03-01' },
  { id: 2, nama: 'PT Maju Bersama', email: 'csr@majubersama.co.id', totalDonasi: 50000000, lastDonasi: '2025-02-15' },
  { id: 3, nama: 'Siti Aminah', email: 'siti.a@mail.com', totalDonasi: 500000, lastDonasi: '2025-03-02' },
];

const MOCK_PENERIMA: Penerima[] = [
  { id: 1, nama: 'SDN 01 Atap', program: 'Renovasi Sekolah', nilai: 15000000, lokasi: 'Kupang, NTT' },
  { id: 2, nama: 'Panti Asuhan Al-Kautsar', program: 'Beasiswa Anak Yatim', nilai: 5000000, lokasi: 'Bandung, Jabar' },
  { id: 3, nama: 'Desa Sukamakmur', program: 'Pembangunan Sumur Bor', nilai: 8000000, lokasi: 'Gunungkidul, DIY' },
];

const MOCK_RELAWAN: Relawan[] = [
  { id: 1, nama: 'Rina Kusumawati', email: 'rina.k@mail.com', phone: '081234567890', kategori: 'Relawan Lapangan', date: '2026-03-29' },
  { id: 2, nama: 'Andi Pratama', email: 'andi.p@mail.com', phone: '085678901234', kategori: 'Digital Media', date: '2026-03-28' },
];

const rp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');

const DatabaseStakeholder = () => {
  const [activeTab, setActiveTab] = useState<'donatur' | 'penerima' | 'relawan'>('donatur');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />
      <div className="flex-1 p-8 max-w-[1400px] mx-auto w-full space-y-6">

        {/* Master Navigation & Hero */}
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden shadow-emerald-900/20">
           <div className="relative z-10 max-w-xl">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-5 backdrop-blur-md border border-white/10">
                 <PiUsers size={24} className="text-orange-400" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Manajemen Stakeholder</h1>
              <p className="text-emerald-50/80 text-sm leading-relaxed">Kelola basis data pihak yang terlibat aktif dengan yayasan Anda: baik donatur penyokong dana maupun entitas/individu penerima bantuan dari program yang dijalankan.</p>
           </div>

           {/* Hero Tabs */}
            <div className="relative z-10 flex bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-md ">
              <button onClick={() => setActiveTab('donatur')} className={`flex shrink-0 items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'donatur' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-emerald-100 hover:text-white hover:bg-white/10'}`}>
                 <PiUsers size={18} /> Data Donatur
              </button>
              <button onClick={() => setActiveTab('penerima')} className={`flex shrink-0 items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'penerima' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-emerald-100 hover:text-white hover:bg-white/10'}`}>
                 <PiHeartbeat size={18} /> Penerima Manfaat
              </button>
              <button onClick={() => setActiveTab('relawan')} className={`flex shrink-0 items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'relawan' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-emerald-100 hover:text-white hover:bg-white/10'}`}>
                 <PiHandshake size={18} /> Pendaftar Relawan
              </button>
           </div>
           
           <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
           <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none"></div>
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
           <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                 {activeTab === 'donatur' ? 'Direktori Donatur' : activeTab === 'penerima' ? 'Penerima Bantuan' : 'Pendaftar Relawan'}
                 <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium">{activeTab === 'donatur' ? MOCK_DONATUR.length : activeTab === 'penerima' ? MOCK_PENERIMA.length : MOCK_RELAWAN.length} Data</span>
              </h2>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <PiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Cari ${activeTab}...`} className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-emerald-500 text-emerald-900 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-emerald-500/50 shadow-sm"/>
                 </div>
                 <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap">
                    <PiPlus size={14}/> Tambah
                 </button>
              </div>
           </div>

           {/* Tab Views */}
           <div className="flex-1 bg-slate-50/50 p-6">
              {activeTab === 'donatur' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
                    {MOCK_DONATUR.map(d => (
                       <div key={d.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all shadow-sm group">
                          <div className="flex justify-between items-start mb-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white flex items-center justify-center font-bold text-xl shadow-inner">{d.nama.charAt(0)}</div>
                          </div>
                          <h3 className="font-semibold text-slate-900 text-lg mb-1">{d.nama}</h3>
                          <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-5"><PiEnvelopeSimple size={14}/> {d.email}</p>
                          <div className="pt-4 border-t border-slate-100/80 flex justify-between items-end">
                             <div>
                                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Total Kontribusi</p>
                                <p className="font-bold text-emerald-600 text-lg">{rp(d.totalDonasi)}</p>
                             </div>
                             <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg text-[11px] hover:bg-emerald-700 transition-colors">Edit</button>
                                <button className="px-3 py-1.5 bg-rose-600 text-white font-semibold rounded-lg text-[11px] hover:bg-rose-700 transition-colors">Hapus</button>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              )}

              {activeTab === 'penerima' && (
                 <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
                    <table className="w-full">
                       <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>{['Entitas Penerima', 'Program Terkait', 'Lokasi', 'Nilai Bantuan', 'Aksi'].map(h => <th key={h} className="py-4 px-6 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">{h}</th>)}</tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {MOCK_PENERIMA.map(p => (
                             <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-6 font-semibold text-slate-800 text-sm flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><PiHeartbeat size={16}/></div>
                                   {p.nama}
                                </td>
                                <td className="py-4 px-6"><span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg">{p.program}</span></td>
                                <td className="py-4 px-6 text-xs font-medium text-slate-500"><div className="flex items-center gap-1.5"><PiMapPin size={14} className="text-emerald-500"/> {p.lokasi}</div></td>
                                <td className="py-4 px-6 text-sm font-semibold text-emerald-600">{rp(p.nilai)}</td>
                                <td className="py-4 px-6">
                                   <div className="flex items-center gap-2">
                                      <button className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg text-[11px] hover:bg-emerald-700 transition-colors">Edit</button>
                                      <button className="px-3 py-1.5 bg-rose-600 text-white font-semibold rounded-lg text-[11px] hover:bg-rose-700 transition-colors">Hapus</button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              )}

              {activeTab === 'relawan' && (
                 <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
                    <table className="w-full">
                       <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>{['Nama Relawan', 'Email / Kontak', 'Bidang Keahlian', 'Status Verif', 'Aksi'].map(h => <th key={h} className="py-4 px-6 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">{h}</th>)}</tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {MOCK_RELAWAN.map(r => (
                             <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-4 px-6 font-semibold text-slate-800 text-sm flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">{r.nama.charAt(0)}</div>
                                   {r.nama}
                                </td>
                                <td className="py-4 px-6 text-xs font-medium text-slate-500">{r.email}</td>
                                <td className="py-4 px-6">
                                   <span className="text-[10px] font-semibold bg-orange-100 text-orange-700 px-2.5 py-1 rounded-lg border border-orange-200">{r.kategori}</span>
                                </td>
                                <td className="py-4 px-6">
                                   <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 w-fit">
                                      <PiCheckCircle size={12}/> Terverifikasi
                                   </span>
                                </td>
                                <td className="py-4 px-6">
                                   <div className="flex items-center gap-2">
                                      <button className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg text-[11px] hover:bg-emerald-700 transition-colors">Lihat Profil</button>
                                      <button className="px-3 py-1.5 bg-rose-600 text-white font-semibold rounded-lg text-[11px] hover:bg-rose-700 transition-colors">Hapus</button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              )}
           </div>
        </div>

      </div>

      {/* Modal Tambah Data */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-slide-up">
             <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">
                Tambah {activeTab === 'donatur' ? 'Donatur' : activeTab === 'penerima' ? 'Penerima Bantuan' : 'Pendaftar Relawan'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-colors">
                <PiX size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {activeTab === 'donatur' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Nama Lengkap Donatur / Instansi</label>
                    <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="Masukkan nama..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Email / Kontak</label>
                    <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="Masukkan kontak..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Total Historis Donasi Masuk</label>
                    <input type="number" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="Rp 0" />
                  </div>
                </>
              ) : activeTab === 'penerima' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Nama Penerima / Individu / Kelompok</label>
                    <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="Cth: SDN 01 Kupang atau Ibu Siti" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Program Penyaluran Terkait</label>
                    <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="Cth: Renovasi Sekolah" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">Lokasi</label>
                      <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="Kab/Kota" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">Estimasi Nilai Bantuan (Rp)</label>
                      <input type="number" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="0" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Nama Lengkap Relawan</label>
                    <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="Cth: Rina Kusumawati" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">Email</label>
                      <input type="email" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="rina@mail.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">WhatsApp</label>
                      <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="08..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Kategori Bidang</label>
                    <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors appearance-none font-medium">
                       <option value="Relawan Lapangan">Relawan Lapangan</option>
                       <option value="Digital Media">Digital Media / Publikasi</option>
                       <option value="Acara Sosial">Panitia Acara Sosial</option>
                       <option value="Kemitraan">Fundraising / Kemitraan</option>
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Batal</button>
              <button onClick={() => setIsModalOpen(false)} className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all">Simpan Data</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default DatabaseStakeholder;
