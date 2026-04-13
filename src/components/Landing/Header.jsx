import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiListBold, PiXBold, PiCaretDownBold } from "react-icons/pi";
import logoImg from "../../assets/images/Logo.png";

const navMenus = [
  {
    title: 'Siapa Kami',
    links: [
      { name: 'Tentang Kami', path: '/landing/about' },
      { name: 'Mitra & Donatur', path: '/landing#mitra' }
    ]
  },
  {
    title: 'Apa Yang Kami Lakukan',
    links: [
      { name: 'Pilar Fokus Program', path: '/landing#pilar' },
      { name: 'Program Galang Dana', path: '/landing/allprograms' },
      { name: 'Galeri Dokumentasi', path: '/landing/gallery' }
    ]
  },
  {
    title: 'Bergerak Bersama',
    links: [
      { name: 'FAQ (Tanya Jawab)', path: '/landing/faqs' },
      { name: 'Pendaftaran Relawan', path: '/landing/getinvolved' }
    ]
  }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const location = useLocation();
  const isHome = location.pathname === '/landing' || location.pathname === '/landing/';
  const shouldBeSolid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-[100] transition-all duration-300 ${shouldBeSolid ? "bg-white/90 backdrop-blur-md py-3 shadow-lg border-b border-emerald-100" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/landing" className="flex items-center gap-3">
          <img src={logoImg} alt="Logo" className="w-10 h-10 rounded-xl shadow-sm" />
          <span className={`font-black tracking-tight text-xl ${shouldBeSolid ? 'text-slate-900' : 'text-white'}`}>HMT<span className="text-emerald-500">-Unpad.</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link to="/landing" className={`font-bold text-sm transition-colors ${shouldBeSolid ? 'text-slate-600 hover:text-emerald-600' : 'text-white/80 hover:text-white'}`}>
             Beranda
          </Link>
          
          {navMenus.map((menu, idx) => (
            <div 
              key={menu.title} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1.5 font-bold text-sm transition-colors ${shouldBeSolid ? 'text-slate-600 group-hover:text-emerald-600' : 'text-white/80 group-hover:text-white'}`}>
                {menu.title} <PiCaretDownBold size={12} className={`transition-transform duration-200 ${activeDropdown === idx ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Box */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-5 transition-all duration-200 w-56 ${activeDropdown === idx ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 overflow-hidden flex flex-col gap-1">
                  {menu.links.map(link => (
                    <Link 
                      key={link.path} 
                      to={link.path} 
                      className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">

           <Link to="/landing/donate" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-full transition-colors shadow-lg shadow-emerald-500/20">
              Donasi Sekarang
           </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
           {mobileMenuOpen ? 
             <PiXBold size={24} className={shouldBeSolid ? 'text-slate-900' : 'text-white'} /> : 
             <PiListBold size={24} className={shouldBeSolid ? 'text-slate-900' : 'text-white'} />
           }
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
          <div className="p-6 flex flex-col gap-6">
            <Link to="/landing" onClick={() => setMobileMenuOpen(false)} className="font-extrabold text-slate-900 text-lg">Beranda</Link>
            
            {navMenus.map((menu) => (
              <div key={menu.title} className="flex flex-col gap-3">
                <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">{menu.title}</h4>
                <div className="flex flex-col gap-3 pl-3 border-l-2 border-slate-100">
                  {menu.links.map(link => (
                    <Link 
                      key={link.path} 
                      to={link.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-bold text-slate-700 hover:text-emerald-600"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">

               <Link to="/landing/donate" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-center font-bold text-white bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20">Donasi Sekarang</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
