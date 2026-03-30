import React, { useState, useEffect } from 'react';
import { PiDownload, PiArrowUpRight, PiArrowDownRight, PiChartBar, PiMagnifyingGlass, PiPlus, PiPencilSimple, PiTrash, PiCheckCircle, PiX, PiTrendUp, PiTrendDown } from 'react-icons/pi';
import Header from '../layout/Header';

// Types
interface IncomeRecord { id: number; nama: string; category: string; notes: string; amount: number; status: string; date: string; }
interface LaporanItem { program: string; kategori: string; pemasukan: number; disalurkan: number; sisa: number; penerima: number; periode: string; status: 'selesai' | 'berjalan'; }

// Mock Data - Pemasukan
const MOCK_INCOMES: IncomeRecord[] = [
  { id: 101, nama: "Budi Santoso", category: "Bantuan Banjir NTT", notes: "Semoga berkah", amount: 500000, status: "berhasil", date: "2025-03-01" },
  { id: 102, nama: "PT Maju Bersama", category: "Pembangunan Sumur Bor", notes: "Donasi CSR Perusahaan", amount: 5000000, status: "pending", date: "2025-03-02" },
  { id: 103, nama: "Siti Aminah", category: "Beasiswa Anak Yatim 2025", notes: "Titip untuk yatim piatu", amount: 250000, status: "berhasil", date: "2025-03-02" },
  { id: 104, nama: "Hamba Allah", category: "Bantuan Banjir NTT", notes: "", amount: 100000, status: "gagal", date: "2025-03-03" },
  { id: 105, nama: "Anonim", category: "Beasiswa Anak Yatim 2025", notes: "Semoga bermanfaat", amount: 1500000, status: "berhasil", date: "2025-03-04" },
];

// Mock Data - Pengeluaran/Transparansi
const MOCK_LAPORAN: LaporanItem[] = [
  { program: 'Bantuan Banjir NTT', kategori: 'Kebencanaan', pemasukan: 32500000, disalurkan: 30000000, sisa: 2500000, penerima: 47, periode: 'Mar 2025', status: 'selesai' },
  { program: 'Beasiswa Anak Yatim 2025', kategori: 'Pendidikan', pemasukan: 30000000, disalurkan: 20000000, sisa: 10000000, penerima: 20, periode: 'Jan-Des 2025', status: 'berjalan' },
  { program: 'Pembangunan Sumur Bor', kategori: 'Kesehatan', pemasukan: 4800000, disalurkan: 0, sisa: 4800000, penerima: 0, periode: 'Apr-Jun 2025', status: 'berjalan' },
];

const rp = (n: number) => 'Rp ' + n.toLocaleString('id-ID');
const pct = (a: number, b: number) => b === 0 ? 0 : Math.round((a / b) * 100);

const KeuanganTransparansi = () => {
  const [activeMasterTab, setActiveMasterTab] = useState<'pemasukan' | 'penyaluran'>('pemasukan');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // States for Pemasukan
  const [incomes, setIncomes] = useState<IncomeRecord[]>(MOCK_INCOMES);
  const [incomeSearch, setIncomeSearch] = useState('');
  const [incomeFilterTab, setIncomeFilterTab] = useState<'semua' | 'berhasil' | 'pending'>('semua');
  
  const totalPemasukanGlobal = MOCK_LAPORAN.reduce((a, b) => a + b.pemasukan, 0); // Mock global stats
  const totalDisalurkanGlobal = MOCK_LAPORAN.reduce((a, b) => a + b.disalurkan, 0);
  const totalSisaGlobal = MOCK_LAPORAN.reduce((a, b) => a + b.sisa, 0);

  const filteredIncomes = incomes.filter(t => {
    const matchTab = incomeFilterTab === 'semua' || t.status === incomeFilterTab;
    const matchSearch = t.nama.toLowerCase().includes(incomeSearch.toLowerCase()) || t.category.toLowerCase().includes(incomeSearch.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />
      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full space-y-6">

        {/* Master Financial Dashboard - Innovation Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-6 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <p className="text-emerald-100/80 text-xs font-bold uppercase tracking-wider mb-1">Total Saldo Terkumpul</p>
                <h3 className="text-3xl font-bold">{rp(totalPemasukanGlobal)}</h3>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-emerald-50 bg-white/10 px-3 py-1.5 rounded-lg w-fit backdrop-blur-sm">
                 <PiTrendUp /> +12% dari bulan lalu
              </div>
            </div>
            <PiChartBar size={120} className="absolute -right-6 -bottom-6 text-white opacity-5 group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col h-full justify-between group hover:border-blue-200 transition-colors">
            <div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <PiArrowDownRight size={20} />
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Telah Disalurkan</p>
              <h3 className="text-2xl font-bold text-slate-900">{rp(totalDisalurkanGlobal)}</h3>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-bold">
                 <span>Tingkat Penyaluran</span>
                 <span className="text-blue-600">{pct(totalDisalurkanGlobal, totalPemasukanGlobal)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                 <div className="bg-blue-500 h-full rounded-full" style={{width: `${pct(totalDisalurkanGlobal, totalPemasukanGlobal)}%`}}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col h-full justify-between group hover:border-amber-200 transition-colors">
            <div>
               <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                 <PiArrowUpRight size={20} />
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Sisa Kas Beredar</p>
              <h3 className="text-2xl font-bold text-slate-900">{rp(totalSisaGlobal)}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-3 font-medium">Dana siap pakai untuk program yang sedang berjalan atau darurat operasional.</p>
          </div>
        </div>

        {/* Wrapper untuk bypass space-y-6 agar tab nempel dengan konten */}
        <div className="flex flex-col relative">
          {/* Interactive Master Tabs */}
          <div className="flex items-end gap-1.5 relative z-20 -mb-[1px]">
             <button onClick={() => setActiveMasterTab('pemasukan')} className={`px-8 pt-3.5 pb-3 rounded-t-2xl text-sm font-extrabold transition-all border ${activeMasterTab === 'pemasukan' ? 'bg-emerald-600 text-white border-slate-200 border-b-transparent z-30' : 'bg-gray-50 border-transparent text-slate-400 hover:text-emerald-600 hover:bg-white z-10 border-b-slate-200'}`}>
                Data Donasi Masuk
             </button>
             <button onClick={() => setActiveMasterTab('penyaluran')} className={`px-8 pt-3.5 pb-3 rounded-t-2xl text-sm font-extrabold transition-all border ${activeMasterTab === 'penyaluran' ? 'bg-emerald-600 text-white border-slate-200 border-b-transparent z-30' : 'bg-gray-50 border-transparent text-slate-400 hover:text-emerald-600 hover:bg-white z-10 border-b-slate-200'}`}>
                Laporan Penyaluran (Transparansi)
             </button>
          </div>

          {/* Content Box */}
          <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/40 rounded-b-2xl rounded-tr-2xl overflow-hidden relative z-10 flex flex-col min-h-[400px]">
          
          {activeMasterTab === 'pemasukan' && (
            <div className="animate-fade-in flex-1 flex flex-col">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
                    <button onClick={() => setIncomeFilterTab('semua')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${incomeFilterTab === 'semua' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Semua</button>
                    <button onClick={() => setIncomeFilterTab('berhasil')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${incomeFilterTab === 'berhasil' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}>Berhasil</button>
                    <button onClick={() => setIncomeFilterTab('pending')} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${incomeFilterTab === 'pending' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}>Pending / Cek Manual</button>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                       <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                       <input type="text" value={incomeSearch} onChange={(e) => setIncomeSearch(e.target.value)} placeholder="Cari nama donatur..." className="pl-9 pr-4 py-2 border border-emerald-500 text-emerald-900 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none w-64 transition-all placeholder:text-emerald-500/50"/>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 transition-colors"><PiPlus size={14}/> Input Manual</button>
                </div>
              </div>
              <div className="overflow-x-auto flex-1 bg-slate-50/30">
                <table className="w-full">
                  <thead className="bg-emerald-600 border-b border-slate-100 sticky top-0">
                    <tr>{['ID', 'Donatur', 'Campaign Tujuan', 'Pesan', 'Nominal', 'Status', 'Aksi'].map(h => <th key={h} className="py-3 px-5 text-left text-[11px] font-bold text-white uppercase tracking-wider">{h}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {filteredIncomes.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50 transition-colors bg-white">
                           <td className="p-5 text-sm font-bold text-slate-600">#{t.id}</td>
                           <td className="p-5">
                             <div className="font-bold text-sm text-slate-900">{t.nama}</div>
                             <div className="text-xs text-slate-400 mt-0.5">{t.date}</div>
                           </td>
                           <td className="p-5"><span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">{t.category}</span></td>
                           <td className="p-5 text-xs text-slate-500 max-w-[150px] truncate italic">{t.notes || '-'}</td>
                           <td className="p-5 text-sm font-bold text-emerald-600">{rp(t.amount)}</td>
                           <td className="p-5">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${t.status === 'berhasil' ? 'bg-emerald-600 text-white' : t.status === 'pending' ? 'bg-amber-500 text-white' : 'bg-rose-600 text-white'}`}>{t.status.toUpperCase()}</span>
                           </td>
                           <td className="p-5">
                              <div className="flex items-center gap-2">
                                 <button className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-md text-[11px] hover:bg-emerald-700 transition-colors">Edit</button>
                                 <button className="px-3 py-1 bg-rose-600 text-white font-bold rounded-md text-[11px] hover:bg-rose-700 transition-colors">Hapus</button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeMasterTab === 'penyaluran' && (
             <div className="animate-fade-in flex-1 flex flex-col p-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <div>
                      <h3 className="font-bold text-slate-800">Laporan Program Berjalan & Selesai</h3>
                      <p className="text-xs text-slate-500 mt-1">Data distribusi ini dapat diakses oleh donatur secara real-time via website publik.</p>
                   </div>
                   <button onClick={() => alert("Mengunduh laporan... File CSV Transparansi Audit akan otomatis ter-download ke perangkat Anda.")} className="flex items-center gap-2 px-4 py-2 mt-3 md:mt-0 bg-white border border-slate-200 shadow-sm text-slate-700 font-bold text-xs rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"><PiDownload size={14}/> Unduh Laporan Audit (.csv)</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                   {MOCK_LAPORAN.map((l, i) => (
                      <div key={i} className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow bg-white flex flex-col">
                         <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{l.kategori}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${l.status === 'selesai' ? 'bg-slate-500 text-white' : 'bg-emerald-600 text-white'}`}>
                               {l.status === 'selesai' ? 'SELESAI' : 'AKTIF'}
                            </span>
                         </div>
                         <h4 className="font-bold text-slate-900 leading-tight mb-1">{l.program}</h4>
                         <p className="text-xs text-slate-400 mb-5">{l.periode} • {l.penerima} Penerima Manfaat</p>
                         
                         <div className="mt-auto space-y-3">
                            <div className="flex justify-between text-xs">
                               <span className="text-slate-500">Terkumpul: <span className="font-bold text-slate-800">{rp(l.pemasukan)}</span></span>
                               <span className="font-bold text-emerald-600">{pct(l.disalurkan, l.pemasukan)}% Tersalur</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                               <div className="bg-emerald-500 h-full rounded-full" style={{width: `${pct(l.disalurkan, l.pemasukan)}%`}}></div>
                            </div>
                            <div className="flex justify-between text-xs pt-2 border-t border-slate-100">
                               <span className="text-slate-500 font-medium">Sisa Dana: <span className="font-bold text-amber-600">{rp(l.sisa)}</span></span>
                               <span className="text-slate-400 hover:text-emerald-600 cursor-pointer font-bold">Detail →</span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}
        </div>
        {/* End Wrapper Tab & Content */}
        </div>

      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } } 
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
      `}</style>
      
      {/* Modal Input Manual */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Input Manual Donasi</h3>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-colors">
                <PiX size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-xl border border-emerald-100 mb-4 font-medium">
                 Gunakan form ini hanya untuk mencatat donasi yang masuk di luar sistem (misal: Transfer langsung ke rekening yayasan atau setoran tunai).
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Nama Donatur</label>
                  <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="Hamba Allah..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Target Campaign</label>
                  <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors">
                    <option>Bantuan Banjir Demak</option>
                    <option>Beasiswa Yatim</option>
                    <option>Infaq Umum (Kas)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">Nominal (Rp)</label>
                <input type="number" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">Pesan Bukti/Catatan (Opsional)</label>
                <textarea rows={3} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:bg-white outline-none focus:border-emerald-500 transition-colors" placeholder="Bukti transfer via BCA an..."></textarea>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-3xl">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">Batal</button>
              <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">Simpan Transaksi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeuanganTransparansi;
