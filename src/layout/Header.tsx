import React, { useState } from 'react';
import { Bell, User, CheckCircle2, Clock, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Judul otomatis sesuai halaman
const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  '/home':          { title: 'Dashboard',             subtitle: 'Statistik performa dan ringkasan pergerakan organisasi.' },
  '/campaign':      { title: 'Manajemen Campaign',    subtitle: 'Kelola program galang dana dan pantau progres pencapaian.' },
  '/keuangantransparansi':{ title: 'Keuangan & Audit',    subtitle: 'Kelola dana masuk dan realisasi transparansi penyaluran.' },
  '/databasestakeholder': { title: 'Data Relasi',         subtitle: 'Basis data komprehensif donatur, relawan, dan penerima.' },
  '/messages':      { title: 'Kotak Masuk',           subtitle: 'Tinjau pesan kolaborasi dan laporan dari pendukung.' },
  '/aboutus':       { title: 'Profil Lembaga',        subtitle: 'Kelola visi, misi, dan struktur organisasi.' },
  '/focusareas':    { title: 'Fokus Area',            subtitle: 'Kelola pilar pengabdian dan bidang program.' },
  '/imageslider':   { title: 'Banner Slider',         subtitle: 'Kelola gambar promo di halaman depan.' },
  '/partners':      { title: 'Mitra Kami',            subtitle: 'Kelola daftar partner dan kolaborator.' },
  '/faqs':          { title: 'Tanya Jawab',           subtitle: 'Kelola daftar FAQ untuk pengunjung.' },
  '/landing-manager': { title: 'Manajemen Landing',     subtitle: 'Kelola konten visual, pilar program, dan FAQ pada halaman utama.' },
  '/settings':      { title: 'Pengaturan & Akun',     subtitle: 'Kelola identitas, SEO, perbankan, dan keamanan portal.' },
  '/notifications': { title: 'Log Aktivitas',         subtitle: 'Riwayat komprehensif audit sistem dan manipulasi data.' },
};

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const meta = PAGE_META[location.pathname] ?? { title: 'Admin Panel', subtitle: '' };

  const notifications = [
    { id: 1, title: 'Donasi Baru Terdeteksi', time: '2 menit lalu', icon: Clock, color: 'text-amber-500' },
    { id: 2, title: 'Laporan Bulanan Siap', time: '1 jam lalu', icon: CheckCircle2, color: 'text-emerald-500' },
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30 w-full">
      {/* Judul Halaman */}
      <div>
        <h1 className="text-base font-bold text-slate-900 leading-tight tracking-tight">{meta.title}</h1>
        <p className="text-xs text-slate-400 mt-0.5">{meta.subtitle}</p>
      </div>

      {/* Kanan: Notif + Avatar */}
      <div className="flex items-center gap-3">
        
        {/* Avatar → Settings */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate('/settings')}
          title="Pengaturan"
        >
          <p className="text-xs font-bold text-slate-700 hidden sm:block group-hover:text-emerald-700 transition-colors">Admin</p>
          <div className="relative">
            <div className="w-8 h-8 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-all">
              <User size={16} />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full border border-slate-200 flex items-center justify-center">
              <Settings size={8} className="text-slate-400 group-hover:text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.18s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Header;
