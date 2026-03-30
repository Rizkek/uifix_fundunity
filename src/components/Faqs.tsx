import React, { useState } from "react";
import { 
  PiMagnifyingGlass, 
  PiPlus, 
  PiPencilSimple, 
  PiTrash, 
  PiX,
  PiChatsCircle
} from "react-icons/pi";
import Header from "../layout/Header";

// Mock Data Awal — disesuaikan dengan deskripsi produk FundUnity
const MOCK_FAQS = [
  {
    id: 1,
    question: "Apakah organisasi ini sah dan memiliki legalitas resmi?",
    answer: "Ya, kami terdaftar resmi dan diakui secara institusional sesuai bentuk organisasi kami, serta memiliki pedoman transparansi yang jelas dan rutin diaudit.",
  },
  {
    id: 2,
    question: "Apakah saya bisa berdonasi tanpa mencantumkan nama (Anonim)?",
    answer: "Tentu. Saat mengisi formulir donasi, Anda bisa menyembunyikan identitas Anda. Laporan transaksi publik hanya akan menampilkan status Hamba Allah atau Inisial.",
  },
  {
    id: 3,
    question: "Bagaimana saya memastikan dana disalurkan ke tempat yang tepat?",
    answer: "Setiap kampanye memiliki pembaruan (Update) secara berkala yang memuat laporan foto, kuitansi, dan rincian penyaluran yang dapat diverifikasi semua orang di menu Transparansi.",
  },
  {
    id: 4,
    question: "Berapa persen potongan administrasi dari donasi saya?",
    answer: "Sistem mengenakan potongan platform/payment gateway (maksimal 5%) untuk menjaga kelangsungan infrastruktur server. Selebihnya disalurkan penuh ke penerima manfaat.",
  }
];

interface FaqsProps { noHeader?: boolean; }

const Faqs = ({ noHeader = false }: FaqsProps) => {
  const [faqs, setFaqs] = useState(MOCK_FAQS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // State Form
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  // Filter Search
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (faq: any = null) => {
    if (faq) {
      setEditingId(faq.id);
      setFormData({
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      setEditingId(null);
      setFormData({ question: "", answer: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ question: "", answer: "" });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update
      setFaqs(faqs.map(f => f.id === editingId ? { ...f, ...formData } : f));
    } else {
      // Create
      const newFaq = {
        id: Date.now(),
        ...formData,
      };
      setFaqs([newFaq, ...faqs]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if(window.confirm("Apakah Anda yakin ingin menghapus pertanyaan ini dari daftar FAQ?")) {
      setFaqs(faqs.filter(f => f.id !== id));
    }
  };

  return (
    <div className={`flex-1 flex flex-col ${!noHeader ? 'min-h-screen' : ''} bg-slate-50 font-sans`}>
      {!noHeader && <Header />}
      
      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full space-y-6">
          
        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <PiMagnifyingGlass size={18} className="text-emerald-500" />
              </div>
              <input
                type="text"
                placeholder="Cari FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-500 text-emerald-900 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-emerald-500/50 shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleOpenModal()}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <PiPlus size={14} />
                <span className="hidden sm:inline">Tambah FAQ</span>
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-600">
                  <th className="py-4 px-6 text-center text-[11px] font-medium text-white uppercase tracking-widest border-b border-emerald-100/50 w-16">No</th>
                  <th className="py-4 px-6 text-left text-[11px] font-medium text-white uppercase tracking-widest border-b border-emerald-100/50">Pertanyaan (Q)</th>
                  <th className="py-4 px-6 text-left text-[11px] font-medium text-white uppercase tracking-widest border-b border-emerald-100/50">Jawaban (A)</th>
                  <th className="py-4 px-6 text-center text-[11px] font-medium text-white uppercase tracking-widest border-b border-emerald-100/50">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <tr key={faq.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-5 px-6 text-center">
                        <span className="text-sm text-slate-400">{(index + 1).toString().padStart(2, '0')}</span>
                      </td>
                      <td className="py-5 px-6">
                        <h3 className="text-sm text-slate-900 line-clamp-2">{faq.question}</h3>
                      </td>
                      <td className="py-5 px-6">
                        <p className="text-sm text-slate-500 line-clamp-2 max-w-md">{faq.answer}</p>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => handleOpenModal(faq)} 
                            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[11px] hover:bg-emerald-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(faq.id)}
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
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500 text-sm">
                      FAQ Tidak Ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100">
             <span className="text-xs text-slate-400">Menampilkan {filteredFaqs.length} baris data</span>
          </div>
        </div>
      </div>

      {/* Modal Reusable Design matching UI standards */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
             <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-medium text-slate-900">{editingId ? "Edit FAQ" : "Tambah FAQ Baru"}</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><PiX size={20}/></button>
             </div>
             <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-5">
                   <div>
                     <label className="block text-xs text-slate-500 mb-2">Pertanyaan (Tanya)</label>
                     <textarea
                        required
                        rows={2}
                        value={formData.question}
                        onChange={(e) => setFormData({...formData, question: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none leading-relaxed"
                        placeholder="Ketik pertanyaan umum..."
                     />
                   </div>
                   <div>
                     <label className="block text-xs text-slate-500 mb-2">Jawaban (Jawab)</label>
                     <textarea
                        required
                        rows={4}
                        value={formData.answer}
                        onChange={(e) => setFormData({...formData, answer: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none leading-relaxed"
                        placeholder="Jelaskan rincian jawabannya di sini..."
                     />
                   </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                   <button type="button" onClick={closeModal} className="px-5 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Batal</button>
                   <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-sm transition-all hover:scale-105 active:scale-95">
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

export default Faqs;
