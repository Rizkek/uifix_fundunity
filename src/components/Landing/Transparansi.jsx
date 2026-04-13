import React from 'react';
import { PiFilePdf, PiChartLineUp, PiArrowRight, PiCheckCircleFill, PiArrowDownBold } from 'react-icons/pi';

const Transparansi = () => {
  const reports = [
    { year: '2023', month: 'Desember', title: 'Laporan Dampak Akhir Tahun 2023', type: 'Tahunan' },
    { year: '2023', month: 'November', title: 'Penyaluran Program Pendidikan Fase 2', type: 'Bulanan' },
    { year: '2023', month: 'Oktober', title: 'Operasional & Donasi Masuk Oktober', type: 'Bulanan' },
    { year: '2023', month: 'September', title: 'Laporan Audit Independen Q3 2023', type: 'Audit' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header Section */}
      <div className="bg-slate-900 pt-32 pb-32 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="grid grid-cols-10 h-full">
                {Array.from({length: 100}).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-emerald-500"></div>
                ))}
            </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20 mb-8 inline-block">Transparansi Publik</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8">Setiap Rupiah Adalah<br/><span className="text-emerald-500">Amanah Yang Suci.</span></h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">Kami mengedepankan keterbukaan informasi sebagai pondasi kepercayaan. Akses laporan keuangan dan penyaluran dana kami secara bebas dan terbuka.</p>
        </div>
      </div>

      {/* Impact Stats Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
         <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                <PiChartLineUp size={28} />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">98.2%</h3>
            <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Efisiensi Penyaluran</p>
         </div>
         <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <PiCheckCircleFill size={28} />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">320+</h3>
            <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Audit Terverifikasi</p>
         </div>
         <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6">
                <PiUsers size={28} />
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-2">45K</h3>
            <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Basis Donatur</p>
         </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Download Reports List */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-black text-slate-900">Arsip Laporan Publik</h2>
                    <span className="text-slate-400 font-bold text-sm">Sort: Terbaru</span>
                </div>
                
                {reports.map((report, i) => (
                    <div key={i} className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all flex items-center justify-between gap-6 cursor-pointer">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-50 transition-colors">
                                <PiFilePdf size={32} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${report.type === 'Tahunan' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {report.type}
                                    </span>
                                    <span className="text-slate-400 text-xs font-bold">{report.month} {report.year}</span>
                                </div>
                                <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{report.title}</h4>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 text-slate-400 group-hover:text-emerald-600 font-bold text-sm transition-colors">
                            Unduh <PiArrowDownBold />
                        </button>
                    </div>
                ))}

                <button className="w-full py-6 text-slate-500 font-bold text-sm hover:text-emerald-600 transition-colors">Lihat Semua Arsip Laporan</button>
            </div>

            {/* Side Call to Action */}
            <div className="space-y-8">
                <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="text-2xl font-bold mb-6 leading-tight">Pertanyaan Terkait Transparansi?</h3>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">Tim audit dan keuangan kami siap membantu menjelaskan penggunaan dana atau memberikan data pendukung lainnya.</p>
                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3">
                        Tanya Tim Keuangan <PiArrowRight weight="bold" />
                    </button>
                </div>

                <div className="bg-emerald-600 rounded-[40px] p-10 text-white shadow-xl shadow-emerald-600/20">
                    <h3 className="text-2xl font-bold mb-4">Donasi Sekarang</h3>
                    <p className="text-emerald-100 text-sm mb-8">Pilih kampanye yang ingin Anda dukung dan lihat dana Anda bekerja.</p>
                    <button className="w-full bg-white text-emerald-600 font-black py-4 rounded-2xl transition-all shadow-lg">
                        Mulai Berdonasi
                    </button>
                </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default Transparansi;
