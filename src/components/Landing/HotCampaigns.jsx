import { PiHeartbeat, PiUsers, PiMoney, PiArrowRight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const HotCampaigns = () => {
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
      category: "Infrastruktur",
      image: "https://plus.unsplash.com/premium_photo-1664302152996-03fcb2220d9e?auto=format&fit=crop&q=80&w=800",
      raised: 8200000,
      goal: 50000000,
      donors: 85,
      daysLeft: 60,
      urgent: false
    }
  ];

  const rp = (n) => 'Rp ' + n.toLocaleString('id-ID');
  const pct = (a, b) => Math.min(100, Math.round((a / b) * 100));

  return (
    <section id="program" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-100 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-3 block">Donasi Mendesak</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              Salurkan Kebaikan Anda <span className="text-emerald-500">Hari Ini</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Pilih program galang dana yang sedang berjalan. Bantuan sekecil apapun dari Anda sangat berarti bagi mereka yang membutuhkan.
            </p>
          </div>
          <Link to="/landing/allprograms" className="flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors whitespace-nowrap">
            Lihat Semua Program <PiArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((camp) => (
            <div key={camp.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 group flex flex-col h-full">
              
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden">
                <img src={camp.image} alt={camp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                  {camp.category}
                </div>
                {camp.urgent && (
                  <div className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm animate-pulse">
                    Mendesak
                  </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 leading-snug mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {camp.title}
                </h3>
                
                {/* Money Stats */}
                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-slate-500 text-xs font-medium mb-1">Terkumpul</p>
                      <p className="text-emerald-600 font-bold text-lg leading-none">{rp(camp.raised)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-[10px] font-medium mb-1 uppercase tracking-wider">Target</p>
                      <p className="text-slate-600 font-bold text-sm leading-none">{rp(camp.goal)}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4 relative">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style={{ width: `${pct(camp.raised, camp.goal)}%` }}></div>
                  </div>

                  {/* Meta */}
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <PiUsers size={16} className="text-slate-400" /> {camp.donors.toLocaleString()} Donatur
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-600">
                      <PiHeartbeat size={16} /> Sisa {camp.daysLeft} Hari
                    </div>
                  </div>
                </div>

                <Link to={`/landing/donate/${camp.id}`} className="block w-full text-center mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-500/30">
                  Donasi Sekarang
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCampaigns;
