import React, { useState } from 'react';
import { PiCheckCircleFill, PiMagnifyingGlass, PiArrowRight, PiDownloadSimple, PiSpinnerGap } from 'react-icons/pi';

const TransparansiLanding = () => {
  const [activeTab, setActiveTab] = useState('penyaluran');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Actual download logic would go here
      const link = document.createElement('a');
      link.href = '#'; // Mock link
      link.download = 'Laporan_Tahunan_2024.pdf';
      alert("Laporan Tahunan 2024 (Audited) berhasil diunduh ke perangkat Anda.");
    }, 2000);
  };

  // Mock data of recent disbursements and incoming donations
  const penyaluran = [
    { id: 1, program: "Bantuan Pangan Korban Banjir", nominal: 15000000, tgl: "19 Mar 2025", status: "Tersalurkan" },
    { id: 2, program: "Penyaluran Beasiswa SDIT Al-Falah", nominal: 8000000, tgl: "15 Mar 2025", status: "Tersalurkan" },
    { id: 3, program: "Biaya Operasional Bantuan Medis", nominal: 4500000, tgl: "12 Mar 2025", status: "Tersalurkan" },
    { id: 4, program: "Pembelian Material Sumur Bor", nominal: 12000000, tgl: "10 Mar 2025", status: "Tersalurkan" },
  ];

  const donatur = [
    { id: 1, nama: "Hamba Allah", program: "Bantuan Banjir Demak", nominal: 500000, tgl: "20 Mar 2025", waktu: "Baru Saja" },
    { id: 2, nama: "Budi Santoso", program: "Beasiswa Yatim", nominal: 1000000, tgl: "20 Mar 2025", waktu: "2 Jam Lalu" },
    { id: 3, nama: "PT Rahmat Abadi", program: "Infrastruktur Pelosok", nominal: 25000000, tgl: "19 Mar 2025", waktu: "1 Hari Lalu" },
    { id: 4, nama: "Anonim", program: "Dana Kemanusiaan", nominal: 50000, tgl: "19 Mar 2025", waktu: "1 Hari Lalu" },
  ];

  const rp = (n) => 'Rp ' + n.toLocaleString('id-ID');

  return (
    <section id="transparansi" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-3 block">Transparansi & Akuntabilitas</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Laporan Real-time. <br/>Tanda Bukti Kepercayaan <span className="text-emerald-500">Publik.</span>
          </h2>
          <p className="text-slate-500 text-lg">Setiap rupiah yang dititipkan melalui yayasan kami dilaporkan secara terbuka. Anda dapat memantau setiap donasi yang masuk maupun bantuan yang telah disalurkan hari ini.</p>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-2 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Neon Glow bg */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            {/* Sidebar Tabs */}
            <div className="md:w-1/3 flex flex-col gap-4 p-4 md:p-0">
              <button 
                onClick={() => setActiveTab('penyaluran')} 
                className={`p-6 rounded-2xl text-left transition-all ${activeTab === 'penyaluran' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-xl">Laporan Penyaluran</h3>
                  {activeTab === 'penyaluran' && <PiArrowRight size={24} />}
                </div>
                <p className={`text-sm ${activeTab === 'penyaluran' ? 'text-emerald-100' : 'text-slate-500'}`}>Lihat rincian pengeluaran dana untuk pelaksanaan program.</p>
              </button>
              
              <button 
                onClick={() => setActiveTab('donatur')} 
                className={`p-6 rounded-2xl text-left transition-all ${activeTab === 'donatur' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-xl">Feed Donasi Masuk</h3>
                  {activeTab === 'donatur' && <PiArrowRight size={24} />}
                </div>
                <p className={`text-sm ${activeTab === 'donatur' ? 'text-emerald-100' : 'text-slate-500'}`}>Tinjau update aliran dana dari #OrangBaik secara live.</p>
              </button>

              <div className="mt-auto pt-6 text-center md:text-left">
                <button 
                  onClick={handleDownload} 
                  disabled={isDownloading}
                  className="text-emerald-400 font-bold text-sm hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start w-full disabled:opacity-50"
                >
                  {isDownloading ? (
                    <><PiSpinnerGap size={18} className="animate-spin" /> Sedang Menyiapkan Dokumen...</>
                  ) : (
                    <><PiDownloadSimple size={18} /> Unduh Laporan Tahunan (Audited)</>
                  )}
                </button>
              </div>
            </div>

            {/* Content Table */}
            <div className="md:w-2/3 bg-slate-800 rounded-3xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-white font-bold text-lg">
                  {activeTab === 'penyaluran' ? 'Riwayat Penyaluran Terbaru' : 'Aktivitas Donatur'}
                </h4>
                <div className="relative">
                  <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Cari data..." className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-xl py-2 pl-9 pr-4 outline-none focus:border-emerald-500 transition-colors w-full md:w-48" />
                </div>
              </div>

              <div className="space-y-4">
                {activeTab === 'penyaluran' && penyaluran.map(p => (
                  <div key={p.id} className="bg-slate-700/30 border border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-700/60 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <PiCheckCircleFill size={20} />
                      </div>
                      <div>
                        <h5 className="text-slate-200 font-semibold mb-1">{p.program}</h5>
                        <p className="text-slate-500 text-xs font-semibold">{p.tgl}</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-emerald-400 font-bold text-lg">{rp(p.nominal)}</p>
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20">{p.status}</span>
                    </div>
                  </div>
                ))}

                {activeTab === 'donatur' && donatur.map(d => (
                  <div key={d.id} className="bg-slate-700/30 border border-slate-700 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-700/60 transition-colors">
                    <div className="flex flex-col">
                      <h5 className="text-slate-200 font-semibold mb-1">{d.nama}</h5>
                      <p className="text-slate-500 text-xs font-semibold">Tersalur untuk: <span className="text-slate-400">{d.program}</span></p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-white font-bold">{rp(d.nominal)}</p>
                      <p className="text-emerald-400 text-[10px] font-semibold mt-1">{d.waktu}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparansiLanding;
