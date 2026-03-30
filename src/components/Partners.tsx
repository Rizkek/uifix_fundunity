import React, { useState, useEffect } from 'react';
import { PiMagnifyingGlass, PiPencilSimple, PiTrash, PiPlus, PiUsers, PiImage, PiX } from "react-icons/pi";
import Header from '../layout/Header';

interface PartnersProps { noHeader?: boolean; }

const Partners = ({ noHeader = false }: PartnersProps) => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<number | null>(null);

  const mockPartners = [
    {
      id: 1,
      name: "Bank Syariah Indonesia",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bank_Syariah_Indonesia.svg/2560px-Bank_Syariah_Indonesia.svg.png",
    },
    {
      id: 2,
      name: "Kitabisa",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Kitabisa_Logo.png",
    }
  ];

  useEffect(() => {
    setTableData(mockPartners);
  }, []);

  const filteredData = tableData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (item: any) => {
    setCurrentItem({ ...item, imageFile: null });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setPartnerToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (partnerToDelete !== null) {
      setTableData(prev => prev.filter(item => item.id !== partnerToDelete));
    }
    setIsDeleteModalOpen(false);
    setPartnerToDelete(null);
  };

  return (
    <div className={`flex flex-col ${!noHeader ? 'min-h-screen' : ''} bg-slate-50 font-sans`}>
      {!noHeader && <Header />}

      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full space-y-6">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between group hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <PiUsers size={26} />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-semibold mb-1">Total Kemitraan Aktif</p>
              <h3 className="text-2xl font-bold text-slate-900">{tableData.length} <span className="text-sm font-medium text-slate-400">Organisasi</span></h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <PiMagnifyingGlass size={18} className="text-emerald-500" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-500 text-emerald-900 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-emerald-500/50 shadow-sm"
                placeholder="Cari nama partner..."
              />
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <PiPlus size={14} />
              Tambah Mitra
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-600">
                  <th className="py-4 px-6 text-left text-[11px] font-semibold text-white uppercase tracking-widest border-b border-emerald-100/50 w-24">ID</th>
                  <th className="py-4 px-6 text-left text-[11px] font-semibold text-white uppercase tracking-widest border-b border-emerald-100/50">Logo Mitra</th>
                  <th className="py-4 px-6 text-left text-[11px] font-semibold text-white uppercase tracking-widest border-b border-emerald-100/50">Nama Instansi</th>
                  <th className="py-4 px-6 text-center text-[11px] font-semibold text-white uppercase tracking-widest border-b border-emerald-100/50">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 text-sm font-semibold text-slate-400">#{item.id}</td>
                    <td className="py-5 px-6">
                       <div className="w-24 h-12 bg-white border border-slate-100 rounded-lg overflow-hidden flex items-center justify-center p-2 shadow-sm">
                          {item.imageUrl ? (
                             <img src={item.imageUrl} className="max-w-full max-h-full object-contain" alt="" />
                          ) : (
                             <PiImage size={18} className="text-slate-200" />
                          )}
                       </div>
                    </td>
                    <td className="py-5 px-6">
                       <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEditClick(item)} 
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[11px] hover:bg-emerald-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(item.id)}
                          className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-[11px] hover:bg-rose-700 transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100">
            <span className="text-xs text-slate-400">Menampilkan {filteredData.length} mitra</span>
          </div>
        </div>
      </div>

      {(isModalOpen || isAddModalOpen) && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
             <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">{isModalOpen ? "Ubah Data Mitra" : "Tambah Mitra"}</h3>
                <button onClick={() => { setIsModalOpen(false); setIsAddModalOpen(false); }} className="text-slate-400 hover:text-slate-600"><PiX size={20}/></button>
             </div>
             <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs text-slate-500 mb-2">Nama Instansi / Mitra</label>
                  <input type="text" placeholder="Masukkan nama resmi..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-2">Logo Partner</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                     <PiImage size={40} className="text-slate-300 mb-2 group-hover:text-emerald-400 transition-colors" />
                     <p className="text-xs font-semibold text-slate-400 text-center">Pilih File PNG / SVG</p>
                  </div>
                </div>
             </div>
             <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={() => { setIsModalOpen(false); setIsAddModalOpen(false); }} className="px-5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">Batal</button>
                <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-sm transition-all hover:scale-105 active:scale-95">Konfirmasi Simpan</button>
             </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-scale-in border border-slate-100 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-4">
              <PiTrash size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Hapus Mitra?</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Data mitra akan dihapus secara permanen dari sistem.
            </p>
            <div className="flex w-full gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 px-4 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-100 hover:text-slate-800 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 bg-rose-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-rose-600/20 hover:bg-rose-700 transition-colors transform hover:-translate-y-0.5"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Partners;