import React, { useState } from 'react';
import Header from '../layout/Header';
import { PiImagesSquare, PiPlus, PiTrash, PiMagnifyingGlass, PiX, PiTag, PiCalendarBlank, PiImageSquare } from 'react-icons/pi';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
}

const MOCK_GALLERY: GalleryItem[] = [
  { id: 1, title: 'Bantuan Sembako Cianjur', category: 'Tanggap Bencana', date: '2025-01-15', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600' },
  { id: 2, title: 'Beasiswa Anak Juara', category: 'Pendidikan', date: '2025-02-10', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600' },
  { id: 3, title: 'Renovasi Sumur Bor NTT', category: 'Infrastruktur', date: '2025-03-05', imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=600' },
];

const GalleryManagement = () => {
  const [items, setItems] = useState(MOCK_GALLERY);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />
      <div className="flex-1 p-8 max-w-[1400px] mx-auto w-full space-y-6">
        

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
           <div className="relative w-full sm:w-96">
              <PiMagnifyingGlass size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari dokumentasi..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-500 text-emerald-900 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-emerald-500/50 shadow-sm"
              />
           </div>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all whitespace-nowrap"
           >
              <PiPlus size={18} /> Tambah Foto Aktivitas
           </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredItems.map(item => (
              <div key={item.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                 <div className="aspect-video relative overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 bg-rose-600 text-white rounded-xl shadow-lg hover:bg-rose-700 transition-colors">
                          <PiTrash size={16} />
                       </button>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                       <span className="text-[10px] bg-white/90 backdrop-blur-md text-emerald-700 font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                          <PiTag size={12}/> {item.category}
                       </span>
                    </div>
                 </div>
                 <div className="p-5">
                    <h3 className="font-bold text-slate-800 text-base mb-2 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                    <div className="flex items-center justify-between">
                       <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                          <PiCalendarBlank size={14} className="text-emerald-400" /> {item.date}
                       </p>
                       <button className="text-[10px] font-bold text-emerald-600 hover:underline">Edit Detail</button>
                    </div>
                 </div>
              </div>
           ))}
        </div>

      </div>

      {/* Modal Tambah Bukti */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in shadow-2xl">
           <div className="bg-white rounded-[32px] w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 animate-slide-up">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-emerald-50/30">
                 <div>
                    <h3 className="text-xl font-bold text-slate-800">Dokumentasi Baru</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Unggah bukti kegiatan lapangan untuk transparansi publik.</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-emerald-600 transition-all">
                    <PiX size={20} />
                 </button>
              </div>
              
              <div className="p-8 space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Judul Aktivitas</label>
                    <input type="text" className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm bg-slate-50/50 outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner placeholder:text-slate-300" placeholder="Cth: Penyerahan Beasiswa Tahap II" />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-5">
                    <div>
                       <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Kategori</label>
                       <select className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm bg-slate-50/50 outline-none focus:border-emerald-500 transition-all font-semibold text-slate-700">
                          <option>Pendidikan</option>
                          <option>Kesehatan</option>
                          <option>Bencana Alam</option>
                          <option>Infrastruktur</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Tanggal Kegiatan</label>
                       <input type="date" className="w-full border border-slate-200 rounded-2xl px-5 py-3.5 text-sm bg-slate-50/50 outline-none focus:border-emerald-500 transition-all font-semibold" />
                    </div>
                 </div>

                 <div className="relative group">
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Unggah Foto Utama</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-[32px] p-10 flex flex-col items-center justify-center bg-slate-50/50 group-hover:bg-emerald-50 group-hover:border-emerald-300 transition-all cursor-pointer">
                       <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-500 shadow-xl border border-emerald-50 mb-4 group-hover:scale-110 transition-transform">
                          <PiImagesSquare size={32} />
                       </div>
                       <p className="text-sm font-bold text-slate-700 mb-1">Pilih Berkas Gambar</p>
                       <p className="text-xs text-slate-400 font-medium text-center">Seret foto ke sini atau telusuri folder.<br/>Format JPG, PNG (Max. 5MB)</p>
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3">
                 <button onClick={() => setIsModalOpen(false)} className="px-6- py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">Tutup</button>
                 <button onClick={() => setIsModalOpen(false)} className="px-10 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-bold shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]">Simpan Dokumentasi</button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default GalleryManagement;
