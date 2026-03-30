import React, { useState, useEffect } from 'react';
import { PiMagnifyingGlass, PiPencilSimple, PiTrash, PiPlus, PiInfo, PiX, PiImage, PiUsers, PiIdentificationBadge } from "react-icons/pi";
import Header from '../layout/Header';

interface AboutUsProps { noHeader?: boolean; }

const AboutUs = ({ noHeader = false }: AboutUsProps) => {
  const [activeTab, setActiveTab] = useState<'umum' | 'struktur'>('umum');
  const [tableData, setTableData] = useState<any[]>([]);
  const [strukturData, setStrukturData] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState<any>({ nama: '', description: '', imageFile: null });

  const mockAboutUsData = [
    {
      id: 1,
      nama: "Visi Kami",
      description: "Menjadi platform donasi terpercaya yang menghubungkan kebaikan dengan yang membutuhkan.",
      imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80"
    },
    {
      id: 2,
      nama: "Misi Kami",
      description: "Memberdayakan komunitas melalui transparansi dan akuntabilitas dalam pengelolaan dana sosial.",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-24d4c16419d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
    }
  ];

  const mockStrukturData = [
    { id: 101, jabatan: "Ketua Umum", nama: "Rio Pangestu", description: "Informatika - 2021", imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
    { id: 102, jabatan: "Wakil Ketua", nama: "Siti Aminah", description: "Matematika - 2021", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" },
    { id: 103, jabatan: "Sekretaris Jenderal", nama: "Ahmad Dahlan", description: "Geofisika - 2022", imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" },
    { id: 104, jabatan: "Bendahara Umum", nama: "Diana Putri", description: "Statistika - 2022", imageUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop" }
  ];

  useEffect(() => {
    setTableData(mockAboutUsData);
    setStrukturData(mockStrukturData);
  }, []);

  const dataToRender = activeTab === 'umum' ? tableData : strukturData;
  const filteredData = dataToRender.filter(item => {
    const nama = item.nama?.toLowerCase() || '';
    const desc = item.description?.toLowerCase() || '';
    const jab = item.jabatan?.toLowerCase() || '';
    return nama.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase()) || jab.includes(searchTerm.toLowerCase());
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleEditClick = (item: any) => {
    setCurrentItem({ ...item, imageFile: null });
    setIsModalOpen(true);
  };

  const confirmDelete = (id: number) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = () => {
    if (itemToDelete !== null) {
      if(activeTab === 'umum') setTableData(prev => prev.filter(item => item.id !== itemToDelete));
      else setStrukturData(prev => prev.filter(item => item.id !== itemToDelete));
      
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className={`flex-1 flex flex-col ${!noHeader ? 'min-h-screen' : ''} bg-slate-50 font-sans`}>
      {!noHeader && <Header />}

      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full space-y-6">

        {/* Wrapper untuk bypass space-y-6 agar tab nempel dengan konten */}
        <div className="flex flex-col relative">
          {/* Interactive Master Tabs - flush left, no padding */}
          <div className="flex items-end gap-1.5 relative z-20 -mb-[1px]">
             <button onClick={() => setActiveTab('umum')} className={`px-8 pt-3.5 pb-3 rounded-t-2xl text-sm font-semibold transition-all border ${activeTab === 'umum' ? 'bg-emerald-600 text-white border-slate-200 border-b-transparent z-30' : 'bg-gray-50 border-transparent text-slate-400 hover:text-emerald-600 hover:bg-white z-10 border-b-slate-200'}`}>
                Profil Umum
             </button>
             <button onClick={() => setActiveTab('struktur')} className={`px-8 pt-3.5 pb-3 rounded-t-2xl text-sm font-semibold transition-all border ${activeTab === 'struktur' ? 'bg-emerald-600 text-white border-slate-200 border-b-transparent z-30' : 'bg-gray-50 border-transparent text-slate-400 hover:text-emerald-600 hover:bg-white z-10 border-b-slate-200'}`}>
                Struktur Lembaga
             </button>
          </div>

          {/* Main Content Box */}
          <div className="bg-white rounded-b-2xl rounded-tr-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden relative z-10 flex flex-col min-h-[400px]">
            {/* Table Toolbar */}
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                   {activeTab === 'umum' ? 'Data Profil Umum' : 'Daftar Susunan Pengurus'}
                   <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">{filteredData.length} Data</span>
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
                  <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                  <input
                    type="text"
                    placeholder={`Cari detail...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-emerald-500 text-emerald-900 rounded-xl text-sm bg-white focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-emerald-500/50 shadow-sm"
                  />
                </div>

                {/* Add New Button */}
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap"
                >
                  <PiPlus size={14} /> <span className="hidden sm:inline">Tambah Data</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto min-h-[500px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-emerald-600">
                    {activeTab === 'struktur' && <th className="py-4 px-6 text-left text-[11px] font-bold text-white uppercase tracking-widest border-b border-emerald-100/50">Jabatan</th>}
                    <th className="py-4 px-6 text-left text-[11px] font-bold text-white uppercase tracking-widest border-b border-emerald-100/50">{activeTab === 'umum' ? 'Judul' : 'Nama'}</th>
                    <th className="py-4 px-6 text-left text-[11px] font-bold text-white uppercase tracking-widest border-b border-emerald-100/50">Keterangan</th>
                    <th className="py-4 px-6 text-center text-[11px] font-bold text-white uppercase tracking-widest border-b border-emerald-100/50 w-24">Gambar</th>
                    <th className="py-4 px-6 text-center text-[11px] font-bold text-white uppercase tracking-widest border-b border-emerald-100/50 w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <PiInfo size={32} className="text-slate-300" />
                          <p>Tidak ada data ditemukan.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        {activeTab === 'struktur' && (
                          <td className="px-6 py-5 align-top">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                              <PiIdentificationBadge /> {item.jabatan}
                            </span>
                          </td>
                        )}
                        <td className="px-6 py-5 align-top">
                          <p className="text-sm font-semibold text-slate-800">{item.nama}</p>
                        </td>
                        <td className="px-6 py-5 align-top max-w-md">
                          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{item.description}</p>
                        </td>
                        <td className="px-6 py-5 align-top text-center">
                          {item.imageUrl ? (
                            <div className="w-12 h-12 rounded-lg border border-slate-200 overflow-hidden mx-auto bg-slate-50">
                              <img src={item.imageUrl} alt={item.nama} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-lg border border-slate-200 border-dashed mx-auto flex items-center justify-center bg-slate-50 text-slate-400">
                              <PiImage size={20} />
                            </div>
                          )}
                        </td>
                        <td className="p-5">
                          <div className="flex items-center justify-center gap-2">
                             <button onClick={() => handleEditClick(item)} className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-[11px] hover:bg-emerald-700 transition-colors">Edit</button>
                             <button onClick={() => confirmDelete(item.id)} className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-lg text-[11px] hover:bg-rose-700 transition-colors">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {filteredData.length > 0 && (
              <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 mt-auto">
                <span className="text-xs text-slate-400 font-medium">Menampilkan {filteredData.length} data</span>
              </div>
            )}

          </div>
        </div>

        {/* Modal Delete Confirmation */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-slide-up">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PiTrash size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Hapus Data?</h3>
                <p className="text-sm text-slate-500">Anda yakin ingin menghapus data ini secara permanen? Data yang dihapus tidak dapat dikembalikan.</p>
              </div>
              <div className="p-4 bg-slate-50 flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 bg-white text-slate-600 font-bold border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">Batal</button>
                <button onClick={executeDelete} className="flex-1 py-2.5 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20">Ya, Hapus</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Edit */}
        {isModalOpen && currentItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-slide-up">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800">Edit {activeTab === 'umum' ? 'Profil' : 'Pengurus'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"><PiX size={18} /></button>
              </div>
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {activeTab === 'struktur' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Jabatan</label>
                    <input type="text" value={currentItem.jabatan || ''} onChange={(e) => setCurrentItem({ ...currentItem, jabatan: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2 bg-slate-50 text-sm focus:border-emerald-500 outline-none" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Nama</label>
                  <input type="text" value={currentItem.nama} onChange={(e) => setCurrentItem({ ...currentItem, nama: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2 bg-slate-50 text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Keterangan / Deskripsi</label>
                  <textarea rows={3} value={currentItem.description} onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2 bg-slate-50 text-sm focus:border-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Upload Gambar / Foto</label>
                  <div className="flex items-center gap-3">
                    {currentItem.imageUrl ? (
                      <img src={currentItem.imageUrl} alt="preview" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                    ) : (
                      <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                        <PiImage size={20} />
                      </div>
                    )}
                    <input type="file" onChange={(e) => { 
                      if(e.target.files && e.target.files[0]) {
                         const file = e.target.files[0];
                         setCurrentItem({...currentItem, imageUrl: URL.createObjectURL(file)});
                      }
                    }} className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                  </div>
                </div>
              </div>
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-3xl">
                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Batal</button>
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-emerald-700">Simpan Perubahan</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Add */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-slide-up">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800">Tambah {activeTab === 'umum' ? 'Profil' : 'Pengurus'}</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"><PiX size={18} /></button>
              </div>
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {activeTab === 'struktur' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Jabatan</label>
                    <input type="text" value={newItem.jabatan || ''} onChange={(e) => setNewItem({ ...newItem, jabatan: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2 bg-slate-50 text-sm focus:border-emerald-500 outline-none" placeholder="Contoh: Manajer Operasional" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Nama {activeTab === 'umum' ? 'Atribut' : 'Orang'}</label>
                  <input type="text" value={newItem.nama} onChange={(e) => setNewItem({ ...newItem, nama: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2 bg-slate-50 text-sm focus:border-emerald-500 outline-none" placeholder={activeTab === 'umum' ? "Contoh: Sejarah Singkat" : "Contoh: Budi Santoso"} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Keterangan / Deskripsi</label>
                  <textarea rows={3} value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className="w-full border border-slate-200 rounded-xl px-4 py-2 bg-slate-50 text-sm focus:border-emerald-500 outline-none" placeholder="Tuliskan keterangan detail..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Upload Gambar / Foto (Opsional)</label>
                  <input type="file" onChange={(e) => { 
                    if(e.target.files && e.target.files[0]) {
                       const file = e.target.files[0];
                       setNewItem({...newItem, imageUrl: URL.createObjectURL(file)});
                    }
                  }} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                </div>
              </div>
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-3xl">
                <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Batal</button>
                <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl text-sm shadow-md hover:bg-slate-800">Simpan Data Baru</button>
              </div>
            </div>
          </div>
        )}

      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};


export default AboutUs;