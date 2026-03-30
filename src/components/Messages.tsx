import React, { useState } from "react";
import { 
  PiMagnifyingGlass, 
  PiEnvelopeOpen, 
  PiEnvelope, 
  PiTrash, 
  PiEye,
  PiX,
  PiCalendarBlank,
  PiArrowUpRight
} from "react-icons/pi";
import Header from "../layout/Header";

// Mock Data Awal
const MOCK_MESSAGES = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi.santoso@gmail.com",
    message: "Halo, saya sangat tertarik dengan program pendidikan desa yang diadakan. Apakah saya bisa ikut menyumbang buku bacaan bekas layak pakai? Jika iya, ke mana saya harus mengirimkannya?",
    isRead: false,
    date: "12 Okt 2023 10:30",
  },
  {
    id: 2,
    name: "Siti Aminah",
    email: "siti.aminah@yahoo.com",
    message: "Saya ingin menanyakan detail kolaborasi untuk acara bakti sosial bulan depan. Apakah organisasi Anda terbuka untuk bermitra dengan BEM kampus kami?",
    isRead: false,
    date: "11 Okt 2023 14:15",
  },
  {
    id: 3,
    name: "Ahmad Dahlan",
    email: "ahmad.d@perusahaan.com",
    message: "Terima kasih atas bantuan yang disalurkan ke panti asuhan kami bulan lalu. Anak-anak sangat senang dengan bingkisan yang diberikan.",
    isRead: true,
    date: "09 Okt 2023 09:00",
  },
  {
    id: 4,
    name: "Rina Marlina",
    email: "rina.marlina88@gmail.com",
    message: "Apakah ada lowongan relawan untuk kegiatan peduli lingkungan akhir tahun ini? Saya memiliki pengalaman di bidang pengolahan sampah.",
    isRead: true,
    date: "05 Okt 2023 16:45",
  },
];

const Messages = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  // Filter Search + Tab
  const filteredMessages = messages.filter(msg => {
    const matchFilter = filter === "unread" ? !msg.isRead : true;
    const matchSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleOpenMessage = (msg: any) => {
    if (!msg.isRead) {
      setMessages(messages.map(m => m.id === msg.id ? { ...m, isRead: true } : m));
    }
    setSelectedMessage({ ...msg, isRead: true });
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
  };

  const toggleReadStatus = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: !m.isRead } : m));
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if(window.confirm("Apakah Anda yakin ingin menghapus pesan ini secara permanen?")) {
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        closeMessageModal();
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50/50">
      <Header />
      
      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full space-y-6">

        {/* Wrapper untuk bypass space-y-6 agar tab nempel dengan konten */}
        <div className="flex flex-col relative">
          {/* Folder Tabs - flush to left, no padding */}
          <div className="flex items-end gap-1.5 relative z-20 -mb-[1px]">
             <button onClick={() => setFilter('all')} className={`px-8 pt-3.5 pb-3 rounded-t-2xl text-sm font-semibold transition-all border ${filter === 'all' ? 'bg-emerald-600 text-white border-slate-200 border-b-transparent z-30' : 'bg-gray-50 border-transparent text-slate-400 hover:text-emerald-600 hover:bg-white z-10 border-b-slate-200'}`}>
                Semua Kotak
             </button>
             <button onClick={() => setFilter('unread')} className={`flex items-center gap-2 px-8 pt-3.5 pb-3 rounded-t-2xl text-sm font-semibold transition-all border ${filter === 'unread' ? 'bg-emerald-600 text-white border-slate-200 border-b-transparent z-30' : 'bg-gray-50 border-transparent text-slate-400 hover:text-emerald-600 hover:bg-white z-10 border-b-slate-200'}`}>
                Belum Dibaca
                {unreadCount > 0 && (
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${filter === 'unread' ? 'bg-white text-emerald-700' : 'bg-rose-500 text-white'}`}>{unreadCount}</span>
                )}
             </button>
          </div>
          
        {/* Table Container Box */}
        <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/40 rounded-b-2xl rounded-tr-2xl overflow-hidden relative z-10 flex flex-col min-h-[400px]">
          
          {/* Table Toolbar */}
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                 Daftar Kotak Masuk
                 <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">{filteredMessages.length} Pesan</span>
            </h2>
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <PiMagnifyingGlass size={18} className="text-emerald-500" />
              </div>
              <input
                type="text"
                placeholder="Cari pengirim atau pesan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-500 text-emerald-900 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-emerald-500/50 shadow-sm"
              />
            </div>
          </div>
            {filteredMessages.length === 0 ? (
              <div className="text-center py-40 px-4">
                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <PiEnvelope size={28} />
                </div>
                <h3 className="text-slate-800 font-bold text-lg mb-1">Tidak Ada Pesan</h3>
                <p className="text-slate-500 text-sm">Kotak masuk Anda sedang kosong.</p>
              </div>
            ) : (
              <div className="overflow-x-auto min-h-[500px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-emerald-600">
                      <th className="w-10 px-6 py-4 border-b border-emerald-100/50"></th>
                      <th className="px-6 py-4 text-[11px] font-semibold text-white uppercase tracking-widest border-b border-emerald-100/50">Pengirim</th>
                      <th className="px-6 py-4 text-[11px] font-semibold text-white uppercase tracking-widest border-b border-emerald-100/50">Cuplikan Pesan</th>
                      <th className="px-6 py-4 text-[11px] font-semibold text-white uppercase tracking-widest text-right border-b border-emerald-100/50">Tanggal Masuk</th>
                      <th className="px-6 py-4 text-[11px] font-semibold text-white uppercase tracking-widest text-center border-b border-emerald-100/50">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMessages.map((msg) => (
                      <tr 
                        key={msg.id} 
                        onClick={() => handleOpenMessage(msg)}
                        className={`group cursor-pointer transition-colors ${!msg.isRead ? 'bg-emerald-50/30 hover:bg-emerald-50/70' : 'hover:bg-slate-50/70'}`}
                      >
                        <td className="px-6 py-5 align-top">
                          <button 
                            onClick={(e) => toggleReadStatus(e, msg.id)}
                            className={`p-1.5 rounded-md transition-colors ${!msg.isRead ? 'text-emerald-500 hover:bg-emerald-100' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'}`}
                            title={msg.isRead ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
                          >
                            {!msg.isRead ? <PiEnvelope size={20} /> : <PiEnvelopeOpen size={20} />}
                          </button>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <p className={`text-sm ${!msg.isRead ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                            {msg.name}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">{msg.email}</p>
                        </td>
                        <td className="px-6 py-5 align-top max-w-sm">
                          <p className={`text-sm line-clamp-2 leading-relaxed ${!msg.isRead ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                            {msg.message}
                          </p>
                        </td>
                        <td className="px-6 py-5 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500">
                            <PiCalendarBlank />
                            {msg.date}
                          </div>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={(e) => { e.stopPropagation(); handleOpenMessage(msg); }} className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-[11px] hover:bg-emerald-700 transition-colors">Baca</button>
                             <button onClick={(e) => handleDelete(e, msg.id)} className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-lg text-[11px] hover:bg-rose-700 transition-colors">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {filteredMessages.length > 0 && (
              <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 mt-auto">
                <span className="text-xs text-slate-400 font-medium">Menampilkan {filteredMessages.length} pesan</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail Pesan */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeMessageModal}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                <PiEnvelopeOpen className="text-emerald-600" size={18}/> Detail Pesan Masuk
              </h2>
              <button onClick={closeMessageModal} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                <PiX size={18} />
              </button>
            </div>
            
            <div className="p-8 space-y-6 overflow-y-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 font-bold rounded-full flex items-center justify-center text-lg uppercase shrink-0">
                    {selectedMessage.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{selectedMessage.name}</h3>
                    <a href={`mailto:${selectedMessage.email}`} className="text-sm text-emerald-600 hover:underline">
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>
                <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 shrink-0 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100/60">
                  <PiCalendarBlank size={14} /> {selectedMessage.date}
                </div>
              </div>
              
              <div className="prose prose-sm prose-slate max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed text-slate-700">{selectedMessage.message}</p>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
              <button onClick={closeMessageModal} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                Tutup
              </button>
              <a href={`mailto:${selectedMessage.email}`} className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                Balas via Email <PiArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
