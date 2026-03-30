import React, { useState, useRef, useEffect } from "react";
import Header from "../layout/Header";
import { PiUsers, PiArrowUpRight, PiArrowDownRight, PiPulse, PiCaretDown, PiHandHeart, PiWallet, PiChartLineUp } from "react-icons/pi";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip
} from "recharts";
import { useNavigate } from "react-router-dom";

const chartData = [
  { name: "Jan", total: 125 },
  { name: "Feb", total: 180 },
  { name: "Mar", total: 140 },
  { name: "Apr", total: 290 },
  { name: "Mei", total: 310 },
  { name: "Jun", total: 420 },
];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
}

const StatCard = ({ title, value, change, trend, icon: Icon }: StatCardProps) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 transition-all hover:border-emerald-200 group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
        trend === "up" ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"
      }`}>
        {trend === "up" ? <PiArrowUpRight size={14} /> : <PiArrowDownRight size={14} />}
        <span className="ml-0.5">{change}</span>
      </div>
    </div>
    <div>
      <h3 className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
    </div>
  </div>
);

const Home = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("6 Bulan Terakhir");
  const filterRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = ["6 Bulan Terakhir", "Tahun Ini", "Tahun Lalu"];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />

      <div className="flex-1 p-8 space-y-8 max-w-[1600px] mx-auto w-full mb-10">
        
        {/* Banner Section */}
        <div className="relative bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-emerald-900/30 flex flex-col justify-center">
          <div className="relative z-10 max-w-2xl">
            <span className="text-orange-400 font-bold text-xs tracking-widest uppercase mb-3 block">Dashboard Supervisor</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Tinjauan Penggalangan <span className="text-orange-400">Dana & Penyaluran</span>
            </h2>
            <p className="text-emerald-50/80 text-sm sm:text-base leading-relaxed max-w-xl">
              Selamat datang kembali. Pantau metrik donasi masuk, kelola program bantuan aktif, dan pastikan setiap rupiah tercatat secara transparan untuk publik.
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-orange-500 rounded-full blur-[100px] opacity-30 translate-y-1/2 pointer-events-none"></div>
        </div>

        {/* Fundamental KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Dana Terkumpul" 
            value="Rp 1.460 Juta" 
            change="+24% vs Bln lalu" 
            trend="up" 
            icon={PiWallet} 
          />
          <StatCard 
            title="Telah Disalurkan" 
            value="Rp 1.120 Juta" 
            change="76% Tersalur" 
            trend="up" 
            icon={PiHandHeart} 
          />
          <StatCard 
            title="Campaign Berjalan" 
            value="18 Aktif" 
            change="2 Hampir Timeout" 
            trend="down" 
            icon={PiChartLineUp} 
          />
          <StatCard 
            title="Basis Donatur" 
            value="12.450" 
            change="+142 Minggu ini" 
            trend="up" 
            icon={PiUsers} 
          />
        </div>

        {/* Charts & Feed Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Financial Growth Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-200/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Tren Pemasukan Donasi</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Akumulasi donasi masuk bersih (setelah admin bank/gateway) per bulan.</p>
              </div>
              <div className="relative" ref={filterRef}>
                <button 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-600 outline-none hover:bg-slate-100 transition-colors"
                >
                  {selectedFilter}
                  <PiCaretDown size={14} className={`transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`} />
                </button>
                
                {filterOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden z-20 py-1 origin-top-right animate-in fade-in zoom-in-95 duration-100">
                    {filterOptions.map((opt, index) => (
                      <button
                        key={opt}
                        onClick={() => { setSelectedFilter(opt); setFilterOpen(false); }}
                        className={`w-full text-left px-5 py-3 text-xs font-bold transition-all ${
                          selectedFilter === opt 
                            ? "bg-emerald-50 text-emerald-700" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 700 }}
                    tickFormatter={(value) => `${value}Jt`}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '16px' }}
                    labelStyle={{ fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}
                    itemStyle={{ color: '#10b981', fontWeight: 800 }}
                    formatter={(value: number) => [`Rp ${value} Juta`, 'Donasi Bersih']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#10b981" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                    activeDot={{ r: 8, fill: "#fff", stroke: "#10b981", strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Incoming Feed & Live Activity */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-200/40 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                 <PiPulse size={20} className="text-emerald-500 animate-pulse" />
                 Radar Aktivitas
               </h3>
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
               </span>
            </div>
            
            <div className="space-y-6 flex-1">
              {[
                { event: "Donasi Masuk (Rp 500k)", detail: "Dari Hamba Allah - Campaign Yatim", time: "Baru saja", type: "in" },
                { event: "Donasi Masuk (Rp 2 Juta)", detail: "Dari PT Samudra - Sumur Bor NTT", time: "15 mnt lalu", type: "in" },
                { event: "Penyaluran (Rp 15 Juta)", detail: "Untuk Bantuan Banjir Demak", time: "1 jam lalu", type: "out" },
                { event: "Campaign Dibuat", detail: "Program: Beasiswa Pelosok Negeri", time: "3 jam lalu", type: "sys" },
                { event: "Donatur Baru Mendaftar", detail: "Bapak Budi Santoso (VIP)", time: "5 jam lalu", type: "sys" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                     <div className={`w-3 h-3 rounded-full shrink-0 border-2 border-white ring-4 ring-slate-50 ${
                       item.type === "in" ? "bg-emerald-500" : 
                       item.type === "out" ? "bg-amber-500" : "bg-blue-500"
                     }`} />
                     {i !== 4 && <div className="w-0.5 h-full bg-slate-100 mt-2"></div>}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-bold text-slate-800 leading-tight mb-1 group-hover:text-emerald-600 transition-colors">{item.event}</p>
                    <p className="text-xs font-medium text-slate-500 mb-2">{item.detail}</p>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate('/keuangantransparansi')}
              className="w-full mt-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors shadow-sm"
            >
              Lihat Laporan Lengkap
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
