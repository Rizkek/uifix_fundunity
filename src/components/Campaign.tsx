import React, { useState } from 'react';
import { PiMagnifyingGlass, PiPlus, PiPencilSimple, PiTrash, PiX, PiTarget, PiCalendarBlank, PiUsersThree, PiArrowUpRight, PiCheckCircle } from 'react-icons/pi';
import Header from '../layout/Header';

interface Campaign {
  id: number;
  title: string;
  description: string;
  target: number;
  collected: number;
  deadline: string;
  status: 'aktif' | 'selesai' | 'draft';
  category: string;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: 'Bantuan Bencana Banjir NTT',
    description: 'Menggalang dana untuk korban banjir bandang di Nusa Tenggara Timur yang membutuhkan bantuan segera.',
    target: 50000000,
    collected: 32500000,
    deadline: '2025-04-30',
    status: 'aktif',
    category: 'Kebencanaan',
  },
  {
    id: 2,
    title: 'Beasiswa Anak Yatim 2025',
    description: 'Program beasiswa untuk 20 anak yatim piatu berprestasi agar dapat melanjutkan pendidikan.',
    target: 30000000,
    collected: 30000000,
    deadline: '2025-03-01',
    status: 'selesai',
    category: 'Pendidikan',
  },
  {
    id: 3,
    title: 'Pembangunan Sumur Warga Pelosok',
    description: 'Pengadaan sumur bor untuk masyarakat desa yang kesulitan akses air bersih.',
    target: 20000000,
    collected: 4800000,
    deadline: '2025-06-15',
    status: 'aktif',
    category: 'Kesehatan & Air Bersih',
  },
];

const statusBadge = (status: Campaign['status']) => {
  const map = {
    aktif:   'bg-emerald-600 text-white',
    selesai: 'bg-slate-500 text-white',
    draft:   'bg-amber-500 text-white',
  };
  const label = { aktif: 'Aktif', selesai: 'Selesai', draft: 'Draft' };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${map[status]}`}>
      {label[status]}
    </span>
  );
};

const formatRp = (n: number) =>
  'Rp ' + n.toLocaleString('id-ID');

const Campaign = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', description: '', target: '', deadline: '', category: '', status: 'aktif' as Campaign['status'] });

  const filtered = campaigns.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({ title: '', description: '', target: '', deadline: '', category: '', status: 'aktif' });
    setIsModalOpen(true);
  };

  const openEdit = (c: Campaign) => {
    setEditingId(c.id);
    setForm({ title: c.title, description: c.description, target: String(c.target), deadline: c.deadline, category: c.category, status: c.status });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Hapus campaign ini secara permanen?')) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCampaigns(prev => prev.map(c => c.id === editingId
        ? { ...c, ...form, target: Number(form.target) }
        : c
      ));
    } else {
      setCampaigns(prev => [{
        id: Date.now(),
        collected: 0,
        ...form,
        target: Number(form.target),
      }, ...prev]);
    }
    setIsModalOpen(false);
  };

  const totalTarget    = campaigns.filter(c => c.status === 'aktif').reduce((a, b) => a + b.target, 0);
  const totalCollected = campaigns.filter(c => c.status === 'aktif').reduce((a, b) => a + b.collected, 0);
  const totalActive    = campaigns.filter(c => c.status === 'aktif').length;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />

      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full space-y-6">

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: 'Campaign Aktif', value: `${totalActive} Campaign`, icon: PiTarget, color: 'emerald' },
            { label: 'Total Target (Aktif)', value: formatRp(totalTarget), icon: PiArrowUpRight, color: 'indigo' },
            { label: 'Total Terkumpul (Aktif)', value: formatRp(totalCollected), icon: PiUsersThree, color: 'amber' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className={`bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 flex items-center gap-4 group hover:border-${color}-200 transition-colors`}>
              <div className={`w-12 h-12 rounded-xl bg-${color}-50 border border-${color}-100 text-${color}-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">

          {/* Toolbar */}
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <PiMagnifyingGlass size={18} className="text-emerald-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Cari campaign atau kategori..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-500 text-emerald-900 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-emerald-500/50 shadow-sm"
              />
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap"
            >
              <PiPlus size={14} /> Buat Campaign Baru
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-600">
                  {['Campaign', 'Kategori', 'Progress Donasi', 'Deadline', 'Status', 'Aksi'].map(h => (
                    <th key={h} className="py-4 px-6 text-left text-[11px] font-semibold text-white uppercase tracking-widest border-b border-emerald-100/50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ? filtered.map(c => {
                  const pct = Math.min(100, Math.round((c.collected / c.target) * 100));
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-6 max-w-[220px]">
                        <p className="text-sm font-semibold text-slate-900 line-clamp-1">{c.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{c.description}</p>
                      </td>
                      <td className="py-5 px-6">
                        <span className="px-2.5 py-1 bg-slate-800 text-white rounded-full text-[10px] font-semibold">{c.category}</span>
                      </td>
                      <td className="py-5 px-6 min-w-[200px]">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-emerald-600">{formatRp(c.collected)}</span>
                          <span className="text-[10px] font-bold text-slate-400">{pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${pct >= 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">Target: {formatRp(c.target)}</p>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                          <PiCalendarBlank size={14} className="text-slate-400" />
                          {c.deadline}
                        </div>
                      </td>
                      <td className="py-5 px-6">{statusBadge(c.status)}</td>
                      <td className="py-5 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => openEdit(c)} className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-[11px] hover:bg-emerald-700 transition-colors">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(c.id)} className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-lg text-[11px] hover:bg-rose-700 transition-colors">
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-slate-400 font-medium">
                      Belum ada campaign ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium">Menampilkan {filtered.length} campaign</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">

            {/* Modal Header */}
            <div className="bg-emerald-600 px-6 py-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{editingId ? 'Edit Campaign' : 'Buat Campaign Baru'}</h3>
                <p className="text-xs text-emerald-100/80">{editingId ? 'Perbarui detail campaign yang dipilih' : 'Isi detail campaign yang akan dipublikasikan'}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all">
                <PiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">

                {/* Judul */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Judul Campaign</label>
                  <input
                    required
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="Contoh: Bantuan Bencana NTT"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                  />
                </div>

                {/* Kategori + Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Kategori</label>
                    <input
                      required
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      placeholder="Kebencanaan / Pendidikan..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                    />
                  </div>

                  {/* Custom Status Toggle (ganti native select) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Status</label>
                    <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1">
                      {(['draft', 'aktif', 'selesai'] as Campaign['status'][]).map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm({ ...form, status: s })}
                          className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all capitalize ${
                            form.status === s
                              ? s === 'aktif'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : s === 'draft'
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'bg-slate-500 text-white shadow-sm'
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Target + Deadline */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Target Nominal (Rp)</label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={form.target}
                      onChange={e => setForm({ ...form, target: e.target.value })}
                      placeholder="50000000"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Deadline</label>
                    <input
                      required
                      type="date"
                      value={form.deadline}
                      onChange={e => setForm({ ...form, deadline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
                    />
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Deskripsi Campaign</label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Jelaskan tujuan dan detail campaign ini..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-xl hover:bg-white transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  {editingId ? 'Simpan Perubahan' : <><PiPlus size={16} /> Buat Campaign</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Campaign;
