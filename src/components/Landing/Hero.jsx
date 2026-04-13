import { PiPlayCircle, PiHeartFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-24 pb-20 md:pb-32 overflow-hidden bg-slate-900">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop" 
          alt="Children smiling" 
          className="w-full h-full object-cover opacity-40 object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold px-4 py-2 rounded-full text-xs uppercase tracking-widest mb-6 backdrop-blur-md">
           Official Organization Platform
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8 max-w-4xl tracking-tight">
          Wujudkan Dampak Nyata, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Sinergi Membangun Negeri.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
          Lebih dari sekadar platform donasi. Bersama kita menggalang solidaritas, transparansi, dan gerakan nyata untuk perubahan sosial yang berkelanjutan.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link to="/landing/allprograms" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold rounded-2xl transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3">
            Pilih Program Bantuan <PiHeartFill size={20} className="text-rose-500 animate-pulse" />
          </Link>
          <Link to="/landing/about" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md border border-white/10 transition-all flex items-center justify-center gap-3">
            <PiPlayCircle size={22} /> Lihat Profil Kami
          </Link>
        </div>

        {/* Quick Trust Meta */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16">
           <div className="text-left">
              <p className="text-4xl font-extrabold text-white">45K+</p>
              <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mt-1">Donatur Aktif</p>
           </div>
           <div className="text-left">
              <p className="text-4xl font-extrabold text-white">Rp 12M</p>
              <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mt-1">Telah Disalurkan</p>
           </div>
           <div className="text-left">
              <p className="text-4xl font-extrabold text-white">128</p>
              <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mt-1">Program Selesai</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
