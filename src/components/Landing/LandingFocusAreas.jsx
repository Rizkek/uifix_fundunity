import React from 'react';
import { Link } from 'react-router-dom';
import { PiBooks, PiHeartbeat, PiDrop, PiTree, PiUsers, PiArrowRight } from 'react-icons/pi';

const LandingFocusAreas = () => {
  const pillars = [
    {
      id: 1,
      name: "Pendidikan",
      desc: "Memberikan pendidikan berkualitas untuk anak-anak agar dapat mengembangkan potensinya secara optimal.",
      icon: <PiBooks size={32} />,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      path: "/landing/allprograms?category=Pendidikan"
    },
    {
      id: 2,
      name: "Kesehatan",
      desc: "Menyelenggarakan bantuan kesadaran kesehatan & akses layanan kesehatan dasar bagi masyarakat.",
      icon: <PiHeartbeat size={32} />,
      color: "bg-rose-50 text-rose-600 border-rose-200",
      path: "/landing/allprograms?category=Kesehatan"
    },
    {
      id: 3,
      name: "Lingkungan",
      desc: "Mendorong inisiatif untuk perlindungan lingkungan hidup dan keberlanjutan alam.",
      icon: <PiTree size={32} />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      path: "/landing/allprograms?category=Lingkungan"
    },
    {
      id: 4,
      name: "Komunitas",
      desc: "Memberdayakan masyarakat melalui pengembangan keterampilan, kolaborasi, dan penguatan kelompok.",
      icon: <PiUsers size={32} />,
      color: "bg-amber-50 text-amber-600 border-amber-200",
      path: "/landing/allprograms?category=Komunitas"
    }
  ];

  return (
    <section id="pilar" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:flex justify-between items-end gap-10">
          <div className="max-w-2xl">
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-3 block">Pilar Program</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              Fokus Area <span className="text-emerald-500">Kebaikan.</span>
            </h2>
            <p className="text-slate-500 text-lg">Setiap kontribusi Anda disalurkan secara spesifik sesuai dengan 4 pilar pergerakan utama kami untuk menciptakan dampak terukur.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(p => (
            <div key={p.id} className={`rounded-[2rem] p-8 border ${p.color} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group`}>
              <div className="mb-6">{p.icon}</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{p.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFocusAreas;
