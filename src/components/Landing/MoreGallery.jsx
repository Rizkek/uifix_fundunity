import React, { useEffect, useState } from 'react';
import { PiImagesSquare, PiArrowLeft, PiPlayFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const MOCK_PHOTOS = [
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
  'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=800',
  'https://images.unsplash.com/photo-1454165833767-027508496739?q=80&w=800',
  'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800',
  'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800',
  'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
];

const MoreGallery = () => {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Hero Header */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
           <div className="flex animate-infinite-scroll">
              <div className="flex shrink-0 gap-4 p-4">
                 {MOCK_PHOTOS.map((src, i) => (
                   <img key={i} src={src} className="h-40 w-64 object-cover rounded-3xl" alt="" />
                 ))}
                 {MOCK_PHOTOS.map((src, i) => (
                   <img key={`dup-${i}`} src={src} className="h-40 w-64 object-cover rounded-3xl" alt="" />
                 ))}
              </div>
           </div>
           <div className="flex animate-infinite-scroll-reverse mt-4">
              <div className="flex shrink-0 gap-4 p-4">
                 {[...MOCK_PHOTOS].reverse().map((src, i) => (
                   <img key={i} src={src} className="h-40 w-64 object-cover rounded-3xl" alt="" />
                 ))}
                 {[...MOCK_PHOTOS].reverse().map((src, i) => (
                   <img key={`dup2-${i}`} src={src} className="h-40 w-64 object-cover rounded-3xl" alt="" />
                 ))}
              </div>
           </div>
        </div>
        
        <div className="relative z-10 text-center px-6">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-bold mb-6">
              <PiImagesSquare size={18} /> Galeri Aktivitas FundUnity
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Satu Gambar Beribu<br/><span className="text-emerald-500">Cerita Perubahan.</span></h1>
           <p className="text-slate-300 max-w-2xl mx-auto text-lg">Setiap rupiah yang Anda berikan menjadi bukti nyata kegembiraan bagi mereka yang membutuhkan. Dokumentasi ini adalah bentuk transparansi kami.</p>
        </div>
      </div>

      {/* Gallery Sections */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
         <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-slate-100">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 italic">Timeline Kegiatan</h2>
                  <p className="text-slate-500 font-bold mt-1">Kami terus bergerak menebar manfaat setiap harinya.</p>
               </div>
               <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                  <button className="px-6 py-2.5 bg-white shadow-md text-emerald-600 font-bold rounded-xl text-sm">Semua</button>
                  <button className="px-6 py-2.5 text-slate-500 font-bold rounded-xl text-sm hover:text-emerald-600 transition-colors">Pendidikan</button>
                  <button className="px-6 py-2.5 text-slate-500 font-bold rounded-xl text-sm hover:text-emerald-600 transition-colors">Kesehatan</button>
               </div>
            </div>

            {/* Masonry-like Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
               {MOCK_PHOTOS.map((src, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedImg(src)}
                    className={`group relative overflow-hidden rounded-[32px] cursor-pointer shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95
                      ${i === 0 ? 'row-span-2 col-span-2' : ''}
                      ${i === 5 ? 'row-span-2' : ''}
                      ${i === 6 ? 'col-span-2' : ''}
                    `}
                  >
                     <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <div className="text-white">
                           <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Penyaluran</p>
                           <p className="font-bold text-sm">Momen Kebersamaan Di Lapangan</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <div className="mt-16 text-center">
               <button className="px-10 py-4 bg-slate-900 text-white font-extrabold rounded-3xl hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/20 active:scale-95">Load More Story</button>
            </div>
         </div>
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
             <img src={selectedImg} className="w-full h-auto max-h-[85vh] object-contain rounded-[40px] shadow-2xl border-4 border-white/10" alt="" />
             <button onClick={() => setSelectedImg(null)} className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition-colors font-bold flex items-center gap-2">
                Tutup <PiArrowLeft className="rotate-90" />
             </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 10 - 1rem * 10)); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(calc(-250px * 10 - 1rem * 10)); }
          100% { transform: translateX(0); }
        }
        .animate-infinite-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-infinite-scroll-reverse {
          animation: scroll-reverse 45s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MoreGallery;
