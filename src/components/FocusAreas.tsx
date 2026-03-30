import React, { useState } from "react";
import { 
  PiMagnifyingGlass, 
  PiPlus, 
  PiPencilSimple, 
  PiTrash, 
  PiTarget,
  PiGraduationCap,
  PiHeartbeat,
  PiTree,
  PiUsers,
  PiX
} from "react-icons/pi";
import Header from "../layout/Header";

interface FocusAreasProps { noHeader?: boolean; }

const MOCK_FOCUS_AREAS = [
  {
    id: 1,
    title: "Pendidikan",
    description: "Memberikan pendidikan berkualitas untuk anak-anak kurang mampu agar mereka dapat mengembangkan potensinya secara optimal.",
    iconName: "PiGraduationCap",
  },
  {
    id: 2,
    title: "Kesehatan",
    description: "Menyelenggarakan kampanye kesadaran kesehatan dan memberikan akses layanan kesehatan dasar bagi masyarakat yang membutuhkan.",
    iconName: "PiHeartbeat",
  },
  {
    id: 3,
    title: "Lingkungan",
    description: "Mendorong inisiatif untuk perlindungan lingkungan hidup dan keberlanjutan alam untuk generasi yang akan datang.",
    iconName: "PiTree",
  },
  {
    id: 4,
    title: "Komunitas",
    description: "Memberdayakan masyarakat melalui pengembangan keterampilan, kolaborasi, dan penguatan kapasitas kelompok.",
    iconName: "PiUsers",
  },
];

const FocusAreas = ({ noHeader = false }: FocusAreasProps) => {
  const [areas, setAreas] = useState(MOCK_FOCUS_AREAS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const filteredAreas = areas.filter(area => 
    area.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (area: any = null) => {
    if (area) {
      setEditingId(area.id);
      setFormData({
        title: area.title,
        description: area.description,
      });
    } else {
      setEditingId(null);
      setFormData({ title: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", description: "" });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAreas(areas.map(a => a.id === editingId ? { ...a, ...formData } : a));
    } else {
      const newArea = {
        id: Date.now(),
        ...formData,
        iconName: "PiTarget"
      };
      setAreas([...areas, newArea]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if(window.confirm("Apakah Anda yakin ingin menghapus fokus area ini?")) {
      setAreas(areas.filter(a => a.id !== id));
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "PiGraduationCap": return <PiGraduationCap size={32} />;
      case "PiHeartbeat": return <PiHeartbeat size={32} />;
      case "PiTree": return <PiTree size={32} />;
      case "PiUsers": return <PiUsers size={32} />;
      default: return <PiTarget size={32} />;
    }
  };

  return (
    <div className={`flex-1 flex flex-col ${!noHeader ? 'min-h-screen' : ''} bg-slate-50 font-sans`}>
      {!noHeader && <Header />}
      
      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full space-y-6">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <PiMagnifyingGlass size={18} className="text-emerald-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-500 text-emerald-900 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-emerald-500/50 shadow-sm"
                placeholder="Cari pilar area pengabdian..."
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleOpenModal()}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <PiPlus size={14} />
                <span className="hidden sm:inline">Tambah Area</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-600">
                  <th className="py-4 px-6 text-left text-[11px] font-semibold text-white uppercase tracking-widest border-b border-emerald-100/50">Fokus Pilar Pengabdian</th>
                  <th className="py-4 px-6 text-left text-[11px] font-semibold text-white uppercase tracking-widest border-b border-emerald-100/50">Deskripsi Utama</th>
                  <th className="py-4 px-6 text-center text-[11px] font-semibold text-white uppercase tracking-widest border-b border-emerald-100/50">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((area) => (
                    <tr key={area.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                             {renderIcon(area.iconName)}
                          </div>
                          <div className="flex flex-col">
                             <span className="text-sm font-semibold text-slate-900">{area.title}</span>
                             <span className="text-[10px] text-emerald-500 font-semibold mt-1">Aktif Berjalan</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                         <p className="text-sm text-slate-500 line-clamp-2 max-w-lg">{area.description}</p>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleOpenModal(area)} 
                            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[11px] hover:bg-emerald-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(area.id)}
                            className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-[11px] hover:bg-rose-700 transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-slate-500 font-medium text-sm">
                      Fokus Area tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100">
             <span className="text-xs text-slate-400">Menampilkan {filteredAreas.length} area</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
             <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">{editingId ? "Edit Fokus Area" : "Tambah Fokus Area Baru"}</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><PiX size={20}/></button>
             </div>
             <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-5">
                   <div>
                     <label className="block text-xs text-slate-500 mb-2">Judul Area</label>
                     <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="Contoh: Pendidikan Desa"
                     />
                   </div>
                   <div>
                     <label className="block text-xs text-slate-500 mb-2">Deskripsi Kegiatan</label>
                     <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none leading-relaxed"
                        placeholder="Jelaskan fokus pengabdian..."
                     />
                   </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                   <button type="button" onClick={closeModal} className="px-5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">Batal</button>
                   <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-sm transition-all">
                     {editingId ? 'Konfirmasi Update' : 'Tambahkan'}
                   </button>
                </div>
             </form>
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

export default FocusAreas;
