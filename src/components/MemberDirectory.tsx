import React, { useState } from 'react';
import { PiMagnifyingGlass, PiPlus, PiPencilSimple, PiTrash, PiX, PiUserCircle, PiPhone, PiEnvelopeSimple } from 'react-icons/pi';
import Header from '../layout/Header';

interface Member {
  id: number;
  name: string;
  divisi: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'aktif' | 'nonaktif' | 'alumni';
  role: string;
}

const MOCK: Member[] = [
  { id: 1, name: 'Rina Sari Dewi', divisi: 'Divisi Kreatif', email: 'rina.sd@email.com', phone: '08123456701', joinDate: '2024-09-01', status: 'aktif', role: 'Ketua Divisi' },
  { id: 2, name: 'Fajar Nugroho', divisi: 'Divisi Acara', email: 'fajar.n@email.com', phone: '08123456702', joinDate: '2024-09-01', status: 'aktif', role: 'Anggota' },
  { id: 3, name: 'Maya Puspita', divisi: 'Divisi Humas', email: 'maya.p@email.com', phone: '08123456703', joinDate: '2023-09-01', status: 'alumni', role: 'Mantan Sekretaris' },
  { id: 4, name: 'Bima Saputra', divisi: 'Divisi Logistik', email: 'bima.s@email.com', phone: '08123456704', joinDate: '2024-09-01', status: 'aktif', role: 'Wakil Ketua Divisi' },
  { id: 5, name: 'Nadia Aulia', divisi: 'Divisi Keuangan', email: 'nadia.a@email.com', phone: '08123456705', joinDate: '2024-09-01', status: 'nonaktif', role: 'Bendahara' },
];

const statusMap = {
  aktif:    { label: 'Aktif', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  nonaktif: { label: 'Non-aktif', cls: 'bg-slate-100 text-slate-500 border-slate-200' },
  alumni:   { label: 'Alumni', cls: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
};

const MemberDirectory = () => {
  const [members, setMembers] = useState<Member[]>(MOCK);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'semua' | 'aktif' | 'nonaktif' | 'alumni'>('semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', divisi: '', email: '', phone: '', joinDate: '', role: '', status: 'aktif' as Member['status'] });

  const filtered = members.filter(m => {
    const s = m.name.toLowerCase().includes(search.toLowerCase()) || m.divisi.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const t = filterStatus === 'semua' || m.status === filterStatus;
    return s && t;
  });

  const openAdd = () => { setEditingId(null); setForm({ name: '', divisi: '', email: '', phone: '', joinDate: new Date().toISOString().slice(0,10), role: 'Anggota', status: 'aktif' }); setIsModalOpen(true); };
  const openEdit = (m: Member) => { setEditingId(m.id); setForm({ name: m.name, divisi: m.divisi, email: m.email, phone: m.phone, joinDate: m.joinDate, role: m.role, status: m.status }); setIsModalOpen(true); };
  const handleDelete = (id: number) => { if (window.confirm('Hapus data anggota ini?')) setMembers(p => p.filter(m => m.id !== id)); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) setMembers(p => p.map(m => m.id === editingId ? { ...m, ...form } : m));
    else setMembers(p => [{ id: Date.now(), ...form }, ...p]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />
      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: 'Total Anggota', value: `${members.length} Orang` },
            { label: 'Anggota Aktif', value: `${members.filter(m=>m.status==='aktif').length} Orang` },
            { label: 'Alumni', value: `${members.filter(m=>m.status==='alumni').length} Orang` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 flex items-center gap-4 hover:border-emerald-200 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <PiUserCircle size={24}/>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative w-full md:w-72">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><PiMagnifyingGlass size={18} className="text-emerald-500"/></div>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, divisi, atau email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-500 text-emerald-900 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-emerald-500/50 shadow-sm"/>
              </div>
              <div className="flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-xl border border-slate-200/50">
                {(['semua','aktif','nonaktif','alumni'] as const).map(t => (
                  <button key={t} onClick={() => setFilterStatus(t)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus===t ? 'bg-white text-emerald-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}>
                    {t === 'nonaktif' ? 'Non-aktif' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap">
              <PiPlus size={14}/> Tambah Anggota
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-600">
                  {['Anggota', 'Divisi & Jabatan', 'Kontak', 'Bergabung', 'Status', 'Aksi'].map(h => (
                    <th key={h} className="py-4 px-6 text-left text-[11px] font-bold text-white uppercase tracking-widest border-b border-emerald-100/50">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ? filtered.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                          {m.name.charAt(0)}
                        </div>
                        <p className="text-sm font-bold text-slate-900">{m.name}</p>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <p className="text-sm font-bold text-slate-700">{m.divisi}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{m.role}</p>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1"><PiEnvelopeSimple size={12}/>{m.email}</div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400"><PiPhone size={12}/>{m.phone}</div>
                    </td>
                    <td className="py-5 px-6"><p className="text-sm text-slate-500">{m.joinDate}</p></td>
                    <td className="py-5 px-6"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusMap[m.status].cls}`}>{statusMap[m.status].label}</span></td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-center gap-4">
                        <button onClick={() => openEdit(m)} title="Edit"><PiPencilSimple size={18} className="text-emerald-600"/></button>
                        <button onClick={() => handleDelete(m.id)} title="Hapus"><PiTrash size={18} className="text-rose-500"/></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="py-12 text-center text-sm text-slate-400">Tidak ada anggota ditemukan.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium">Menampilkan {filtered.length} anggota</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-scale-in">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">{editingId ? 'Edit Data Anggota' : 'Tambah Anggota Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><PiX size={20}/></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Nama Lengkap</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"/></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Divisi</label>
                    <input required value={form.divisi} onChange={e => setForm({...form, divisi: e.target.value})} placeholder="Divisi Acara, Kreatif..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"/></div>
                  <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Jabatan</label>
                    <input required value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Ketua, Anggota..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"/></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"/></div>
                  <div><label className="block text-xs font-bold text-slate-500 mb-1.5">No. HP</label>
                    <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"/></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Tanggal Bergabung</label>
                    <input required type="date" value={form.joinDate} onChange={e => setForm({...form, joinDate: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"/></div>
                  <div><label className="block text-xs font-bold text-slate-500 mb-1.5">Status</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value as Member['status']})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20">
                      <option value="aktif">Aktif</option><option value="nonaktif">Non-aktif</option><option value="alumni">Alumni</option>
                    </select></div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm font-bold text-slate-500">Batal</button>
                <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-sm transition-all">{editingId ? 'Simpan' : 'Tambahkan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <style>{`@keyframes scale-in{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}.animate-scale-in{animation:scale-in 0.2s ease-out forwards}`}</style>
    </div>
  );
};

export default MemberDirectory;
