import React, { useState } from 'react';
import Header from '../layout/Header';
import { PiBell, PiClock, PiCheckCircle, PiMagnifyingGlass, PiFunnel, PiWarningCircle, PiFileText, PiGear, PiXCircle } from "react-icons/pi";

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  const activityLogs = [
    { id: 1, title: 'Data Transaksi Diekspor', desc: 'Admin mengekspor data transaksi bulan ini dalam format CSV.', time: '10 menit lalu', type: 'Sistem', icon: PiFileText, color: 'text-orange-600   ', bg: 'bg-orange-50' },
    { id: 2, title: 'Verifikasi Program Bencana Alam', desc: 'Program donasi untuk korban banjir telah diverifikasi.', time: '1 jam lalu', type: 'Program', icon: PiCheckCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 3, title: 'Update Profil Organisasi', desc: 'Admin mengubah informasi kontak pada profil organisasi.', time: '2 jam lalu', type: 'Sistem', icon: PiGear, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 4, title: 'Menambahkan Mitra Baru', desc: 'PT Telkom Indonesia ditambahkan sebagai mitra korporat baru.', time: 'Kemarin, 14:30', type: 'Mitra', icon: PiCheckCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 5, title: 'Perubahan Slider Banner', desc: 'Banner utama diubah untuk kampanye Ramadhan.', time: 'Kemarin, 09:00', type: 'Sistem', icon: PiGear, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 6, title: 'Login Terdeteksi', desc: 'Admin login dari perangkat baru (Chrome, Windows 11).', time: '2 hari lalu', type: 'Keamanan', icon: PiWarningCircle, color: 'text-orange-600', bg: 'bg-orange-50' },

  ];

  const filters = ['Semua', 'Sistem', 'Program', 'Mitra', 'Keamanan'];

  const filteredData = activityLogs.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = activeFilter === 'Semua' || item.type === activeFilter;
    
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />

      <div className="flex-1 p-8 max-w-[1200px] mx-auto w-full space-y-6">

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <PiMagnifyingGlass size={18} className="text-emerald-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-500 text-emerald-900 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-emerald-500/50 shadow-sm"
              placeholder="Cari log aktivitas..."
            />
          </div>
        </div>

        {/* Activity Log List Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          
          <div className="p-5 border-b border-slate-100  bg-emerald-600 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Histori & Aktivitas</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredData.length > 0 ? (
              filteredData.map((log) => (
                <div 
                  key={log.id} 
                  className="p-6 flex gap-5"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${log.bg}`}>
                    <log.icon size={22} className={log.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="text-base font-bold text-slate-700">
                        {log.title}
                      </h4>
                      <span className="text-xs font-bold text-slate-400 whitespace-nowrap">{log.time}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                      {log.desc}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-emerald-600 ">
                        {log.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center flex flex-col items-center">
                 <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                    <PiClock size={28} />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-1">Tidak ada log aktivitas</h3>
                 <p className="text-sm text-slate-500">Pencarian atau filter Anda tidak menemukan hasil apapun.</p>
              </div>
            )}
          </div>
          


        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Notifications;
