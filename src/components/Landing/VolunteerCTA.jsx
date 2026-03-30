import React from "react";
import { PiHandshake } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function VolunteerCTA() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
         {/* Shapes background */}
         <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-12 -translate-y-12"></div>
         <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-12 translate-y-12"></div>

         <div className="relative space-y-4 max-w-xl mx-auto flex flex-col items-center">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm text-white mb-2"><PiHandshake size={28}/></div>
            <h2 className="text-2xl md:text-3xl font-black leading-snug">Mari Menjadi Bagian Dari Gerakan Kami!</h2>
            <p className="text-white/80 text-sm leading-relaxed">
               Dukungan Anda dalam bentuk apapun (Tenaga, Ide, maupun Dana) sangat berarti untuk menciptakan senyum baru bagi mereka yang membutuhkan.
            </p>
             <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
               <Link to="/landing/getinvolved" className="px-6 py-3 bg-white text-emerald-800 font-bold rounded-xl shadow-md hover:bg-slate-50 transition text-sm text-center">Gabung Jadi Relawan</Link>
               <Link to="/landing/faqs" className="px-6 py-3 border border-white/40 hover:bg-white/10 text-white font-bold rounded-xl transition text-sm text-center">Tanya Jawab (FAQ)</Link>
             </div>
         </div>
      </div>
    </section>
  );
}