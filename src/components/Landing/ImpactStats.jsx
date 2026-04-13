import React, { useEffect, useState } from "react";

const stats = [
  {
    label: "Donatur",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    suffix: "+",
    key: "donors",
  },
  {
    label: "Total Terkumpul",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    prefix: "Rp",
    key: "amount",
    isAmount: true,
  },
  {
    label: "Program Aktif",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    suffix: "+",
    key: "programs",
  },
  {
    label: "Mitra Kolaborasi",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    suffix: "+",
    key: "partners",
  },
];

function formatAmount(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + " M";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + " Jt";
  if (num >= 1_000) return (num / 1_000).toFixed(0) + " Rb";
  return num.toString();
}

export default function ImpactStats() {
  const data = {
    donors: 1240,
    amount: 1450000000,
    programs: 48,
    partners: 12
  };

  return (
    <section className="py-16 px-6 bg-blue-700">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Dampak Nyata Bersama Kita
          </h2>
          <p className="text-blue-200 mt-2 text-sm">Data akumulasi dampak perubahan sosial di seluruh Nusantara.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ label, icon, suffix, prefix, key, isAmount }) => (
            <div
              key={key}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center text-white"
            >
              <div className="flex justify-center mb-3 opacity-80">{icon}</div>
              <div className="text-3xl font-extrabold mb-1">
                {prefix && <span className="text-lg font-semibold mr-1 opacity-80">{prefix}</span>}
                {isAmount ? formatAmount(data[key]) : data[key]}
                {suffix && <span className="text-lg font-semibold opacity-80">{suffix}</span>}
              </div>
              <p className="text-blue-100 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
