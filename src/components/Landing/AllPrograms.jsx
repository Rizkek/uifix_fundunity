import React, { useState } from 'react';
import { PiHeartbeat, PiUsers, PiArrowRight, PiMagnifyingGlass, PiFunnel } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const AllPrograms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Semua');

  const campaigns = [
    {
      id: 1,
      title: "Bantuan Mendesak Korban Banjir Demak & Sekitarnya",
      category: "Bencana Alam",
      image: "https://images.unsplash.com/photo-1547683905-f30e6113824f?auto=format&fit=crop&q=80&w=800",
      raised: 125000000,
      goal: 200000000,
      donors: 1420,
      daysLeft: 5,
      urgent: true
    },
    {
      id: 2,
      title: "Beasiswa Pendidikan Untuk 100 Anak Yatim Berprestasi",
      category: "Pendidikan",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
      raised: 45000000,
      goal: 100000000,
      donors: 320,
      daysLeft: 24,
      urgent: false
    },
    {
      id: 3,
      title: "Pembangunan Sumur Air Bersih Pelosok NTT",
      category: "Kesehatan",
      image: "https://plus.unsplash.com/premium_photo-1664302152996-03fcb2220d9e?auto=format&fit=crop&q=80&w=800",
      raised: 8200000,
      goal: 50000000,
      donors: 85,
      daysLeft: 60,
      urgent: false
    },
    {
        id: 4,
        title: "Penanaman 10.000 Mangrove di Pesisir Utara Jawa",
        category: "Lingkungan",
        image: "https://images.unsplash.com/photo-1542601906960-dafb91f4b023?auto=format&fit=crop&q=80&w=800",
        raised: 15400000,
        goal: 30000000,
        donors: 112,
        daysLeft: 45,
        urgent: false
      },
      {
        id: 5,
        title: "Pemberdayaan UMKM Perempuan Desa Berdaya",
        category: "Ekonomi",
        image: "https://images.unsplash.com/photo-1489953254922-836798485209?auto=format&fit=crop&q=80&w=800",
        raised: 28000000,
        goal: 60000000,
        donors: 198,
        daysLeft: 12,
        urgent: false
      },
      {
        id: 6,
        title: "Klinik Keliling Pelayanan Kesehatan Gratis Se-Indonesia",
        category: "Kesehatan",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
        raised: 185000000,
        goal: 500000000,
        donors: 2540,
        daysLeft: 90,
        urgent: true
      }
  ];

  const categories = ['Semua', 'Pendidikan', 'Kesehatan', 'Bencana Alam', 'Lingkungan', 'Ekonomi'];

  const rp = (n) => 'Rp ' + n.toLocaleString('id-ID');
  const pct = (a, b) => Math.min(100, Math.round((a / b) * 100));

  const filteredCampaigns = campaigns.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === 'Semua' || c.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Page Header */}
      <div className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20 mb-6 inline-block">Pusat Kebaikan</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Wujudkan Perubahan<br/><span className="text-emerald-500">Mulai Dari Sini.</span></h1>
            <p className="text-slate-400 text-lg max-w-2xl">Jelajahi berbagai program bantuan sosial kami. Setiap rupiah yang Anda sumbangkan sepenuhnya disalurkan untuk menciptakan dampak nyata bagi mereka yang membutuhkan.</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 p-6 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 group w-full">
                <PiMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={24} />
                <input 
                    type="text" 
                    placeholder="Cari nama program bantuan..." 
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`whitespace-nowrap px-6 py-4 rounded-2xl font-bold text-sm transition-all ${filter === cat ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        {filteredCampaigns.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredCampaigns.map((camp) => (
             <div key={camp.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 group flex flex-col h-full">
               
               <div className="relative h-64 overflow-hidden">
                 <img src={camp.image} alt={camp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
                   {camp.category}
                 </div>
                 {camp.urgent && (
                   <div className="absolute top-6 right-6 bg-rose-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm animate-pulse">
                     Mendesak
                   </div>
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
               </div>
 
               <div className="p-8 flex flex-col flex-1">
                 <h3 className="text-xl font-bold text-slate-900 leading-snug mb-6 group-hover:text-emerald-600 transition-colors line-clamp-2">
                   {camp.title}
                 </h3>
                 
                 <div className="mt-auto">
                   <div className="flex justify-between items-end mb-3">
                     <div>
                       <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Terkumpul</p>
                       <p className="text-emerald-600 font-extrabold text-xl leading-none">{rp(camp.raised)}</p>
                     </div>
                     <div className="text-right">
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Target</p>
                       <p className="text-slate-600 font-bold text-sm leading-none">{rp(camp.goal)}</p>
                     </div>
                   </div>
 
                   <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-6 relative">
                     <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style={{ width: `${pct(camp.raised, camp.goal)}%` }}></div>
                   </div>
 
                   <div className="flex justify-between items-center text-xs font-bold text-slate-500 bg-slate-50 p-4 rounded-2xl">
                     <div className="flex items-center gap-2">
                       <PiUsers size={18} className="text-slate-400" /> {camp.donors.toLocaleString()} Donatur
                     </div>
                     <div className="flex items-center gap-2 text-rose-500">
                       <PiHeartbeat size={18} /> Sisa {camp.daysLeft} Hari
                     </div>
                   </div>
                 </div>
 
                 <Link to={`/landing/donate/${camp.id}`} className="block w-full text-center mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/30 active:scale-95">
                   Donasi Sekarang
                 </Link>
               </div>
             </div>
           ))}
         </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[40px] shadow-sm border border-slate-100">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <PiMagnifyingGlass size={40} className="text-slate-400" />
             </div>
             <p className="text-xl font-bold text-slate-900">Program tidak ditemukan</p>
             <p className="text-slate-500 mt-2">Coba gunakan kata kunci lain atau pilih kategori yang berbeda.</p>
             <button onClick={() => {setSearchTerm(''); setFilter('Semua')}} className="mt-8 text-emerald-600 font-bold underline">Resest Filter</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPrograms;
