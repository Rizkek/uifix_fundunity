import React, { useState } from 'react';
import { PiCheckCircleFill, PiArrowRight, PiUsersThree, PiHeartStraight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const LandingAboutUs = () => {
  const [activeTab, setActiveTab] = useState('umum');

  return (
    <section id="tentang" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Photos/Images Collage */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50 rounded-full blur-3xl -z-10"></div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1593113565694-c6b12d5cd623?auto=format&fit=crop&q=80&w=800" alt="Relawan" className="rounded-3xl shadow-lg w-full h-64 object-cover object-center translate-y-8" />
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800" alt="Anak-anak" className="rounded-3xl shadow-lg w-full h-64 object-cover object-center" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <PiHeartStraight size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-bold mb-0.5">Berdiri Sejak</p>
                <p className="text-xl font-extrabold text-slate-900">2018</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-3 block">Profil Organisasi</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Bergerak Bersama <span className="text-emerald-500">Mewujudkan</span> Perubahan Nyata.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Kami adalah organisasi kemahasiswaan dan sosial kultural yang berfokus membangun gerakan solutif bernilai tinggi, transparan, serta berdampak nyata bagi masyarakat luas.
            </p>

            <div className="bg-slate-50 rounded-2xl p-2 flex border border-slate-100 mb-6 w-max max-w-full">
              <button 
                onClick={() => setActiveTab('umum')} 
                className={`flex-1 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'umum' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Visi & Misi
              </button>
              <button 
                onClick={() => setActiveTab('struktur')} 
                className={`flex-1 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'struktur' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Pengurus
              </button>
            </div>

            <div className="min-h-[150px]">
              {activeTab === 'umum' ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex gap-4">
                    <PiCheckCircleFill size={24} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Visi Kami</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Menjadi jembatan kebaikan digital nomor satu yang transparan dan dapat diandalkan oleh masyarakat luas.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <PiCheckCircleFill size={24} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Misi Utama</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Memberdayakan komunitas melalui pendistribusian dana sosial yang cepat tanggap, tepat sasaran, dan terpantau *real-time*.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                  {[
                    { nama: "Rio Pangestu", jabatan: "Ketua Umum", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" },
                    { nama: "Siti Aminah", jabatan: "Wakil / Koordinator", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
                    { nama: "Ahmad Dahlan", jabatan: "Bendahara Umum", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" },
                    { nama: "Diana Putri", jabatan: "Manajer Program", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" }
                  ].map(p => (
                    <div key={p.nama} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-emerald-100 bg-slate-50">
                        <img src={p.img} alt={p.nama} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 line-clamp-1">{p.nama}</p>
                        <p className="text-[10px] uppercase font-bold text-emerald-600 line-clamp-1">{p.jabatan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingAboutUs;
