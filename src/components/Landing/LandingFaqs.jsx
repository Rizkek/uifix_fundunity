import React, { useState } from 'react';
import { PiPlus, PiMinus } from 'react-icons/pi';

const LandingFaqs = () => {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: "Apakah organisasi ini sah dan memiliki legalitas resmi?",
      a: "Ya, kami terdaftar resmi dan diakui secara institusional sesuai bentuk organisasi kami, serta memiliki pedoman transparansi yang jelas dan rutin diaudit."
    },
    {
      q: "Apakah saya bisa berdonasi tanpa mencantumkan nama (Anonim)?",
      a: "Tentu. Saat mengisi formulir donasi, Anda bisa menyembunyikan identitas Anda. Laporan transaksi publik hanya akan menampilkan status Hamba Allah atau Inisial."
    },
    {
      q: "Bagaimana saya memastikan dana disalurkan ke tempat yang tepat?",
      a: "Setiap kampanye memiliki pembaruan (Update) secara berkala yang memuat laporan foto, kuitansi, dan rincian penyaluran yang dapat diverifikasi semua orang di menu Transparansi."
    },
    {
      q: "Berapa persen potongan administrasi dari donasi saya?",
      a: "Sistem mengenakan potongan platform/payment gateway (maksimal 5%) untuk menjaga kelangsungan infrastruktur server. Selebihnya disalurkan penuh ke penerima manfaat."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Pertanyaan yang Sering <span className="text-emerald-500">Diajukan</span>
          </h2>
          <p className="text-slate-500 text-lg">Kami merangkum jawaban jujur dari pertanyaan-pertanyaan donatur untuk menghapus keraguan Anda.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border-b border-slate-200 transition-all ${open === i ? 'bg-white rounded-2xl border-none shadow-xl shadow-slate-200/50 p-2 md:p-6 mb-4 -mx-2 md:-mx-6' : 'py-4'}`}
            >
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex items-center justify-between w-full text-left font-bold text-slate-900 hover:text-emerald-600 transition-colors"
              >
                <span className={`${open === i ? 'text-xl' : 'text-lg'}`}>{faq.q}</span>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${open === i ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  {open === i ? <PiMinus /> : <PiPlus />}
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-500 leading-relaxed pr-8">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFaqs;
