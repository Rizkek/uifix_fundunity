import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PiHouse, PiUsersFour, PiHandshake, PiCaretLeft, PiCaretRight, PiTarget, PiDoorOpen, PiWallet, PiSlideshow, PiGear, PiCrosshair, PiChatsCircle, PiEnvelopeOpen, PiUsersThree, PiMegaphone, PiCalendarBlank, PiHeartbeat, PiUsers, PiChartLine, PiNotebook, PiBell } from "react-icons/pi";
import { useAuth } from "../contexts/AuthContext";
import logoImg from "../assets/images/Logo.png";
import { TbSettings, TbWallet, TbSlideshow } from "react-icons/tb";

interface SidebarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isLoggedIn: boolean;
}

const menuItems = [
  { id: "home",        icon: PiHouse,       label: "Dashboard",       path: "/home" },
  { id: "campaign",    icon: PiMegaphone,    label: "Campaign",       path: "/campaign" },
  { id: "keuangantransparansi",    icon: PiChartLine,    label: "Keuangan",       path: "/keuangantransparansi" },
  { id: "databasestakeholder", icon: PiUsers,        label: "Relasi",         path: "/databasestakeholder" },
  { id: "messages",    icon: PiEnvelopeOpen,label: "Kotak Masuk",     path: "/messages" },
  // Split Landing Management back as requested
  { id: "aboutus",     icon: PiUsersFour,   label: "Profil Lembaga",      path: "/aboutus" },
  { id: "focusareas",  icon: PiCrosshair,    label: "Fokus Area",     path: "/focusareas" },
  { id: "imageslider", icon: TbSlideshow,   label: "Banner Slider",   path: "/imageslider" },
  { id: "partners",    icon: PiHandshake,   label: "Mitra Kami",      path: "/partners" },
  { id: "faqs",        icon: PiChatsCircle, label: "Tanya Jawab",     path: "/faqs" },
  { id: "settings",    icon: TbSettings,    label: "Akun & Sistem",   path: "/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, onToggleSidebar, isLoggedIn }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  if (!isLoggedIn) return null;

  const handleConfirmLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 bottom-0 flex flex-col transition-all duration-300 ease-in-out
          bg-emerald-600 text-white rounded-r-3xl
          ${isSidebarOpen ? "w-56" : "w-[72px]"}
        `}
        style={{ zIndex: 40 }}
      >
        {/* Logo Area */}
        <div className={`flex items-center shrink-0 mt-6 mb-8 ${isSidebarOpen ? "px-5 gap-3" : "justify-center"}`}>
          <img
            src={logoImg}
            alt="FundUnity"
            className={`object-contain transition-all duration-300 ${isSidebarOpen ? "h-9 w-auto" : "h-9 w-9 rounded-xl"}`}
          />
          {isSidebarOpen && (
            <span className="text-sm font-bold text-white tracking-tight opacity-90 whitespace-nowrap">
              FundUnity
            </span>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-1 px-3 overflow-y-auto overflow-x-hidden">
          {menuItems.map(({ id, icon: Icon, label, path }) => (
            <NavLink
              key={id}
              to={path}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className={({ isActive }) =>
                `relative group flex items-center gap-3 py-2.5 transition-all duration-150 cursor-pointer
                ${isActive
                  ? `bg-slate-50 text-emerald-600 rounded-l-full rounded-r-none -mr-3 ${isSidebarOpen ? "pl-4 pr-7" : "justify-center pl-0 pr-3"}`
                  : `text-slate-300 hover:bg-emerald-700 hover:text-white rounded-2xl ${isSidebarOpen ? "px-4" : "justify-center px-0"}`
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <>
                      {/* Top Inverted Curve */}
                      <div 
                        className="absolute right-0 -top-5 w-5 h-5 bg-transparent pointer-events-none"
                        style={{ background: 'radial-gradient(circle at top left, transparent 20px, #f8fafc 0)' }}
                      />
                      {/* Bottom Inverted Curve */}
                      <div 
                        className="absolute right-0 -bottom-5 w-5 h-5 bg-transparent pointer-events-none"
                        style={{ background: 'radial-gradient(circle at bottom left, transparent 20px, #f8fafc 0)' }}
                      />
                    </>
                  )}
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="shrink-0"
                  />
                  {isSidebarOpen && (
                    <span className={`text-[13px] font-semibold tracking-wide whitespace-nowrap ${isActive ? "text-emerald-600" : ""}`}>
                      {label}
                    </span>
                  )}

                  {!isSidebarOpen && hoveredId === id && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-700 text-white text-xs font-semibold rounded-lg shadow-lg z-50 whitespace-nowrap pointer-events-none">
                      {label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6 pt-3 mt-auto ">
          <button
            onClick={() => setShowLogoutModal(true)}
            onMouseEnter={() => setHoveredId("logout")}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative group w-full flex items-center gap-3 py-2.5 rounded-xl text-slate-200 hover:bg-rose-600/10 hover:text-rose-400 transition-all
              ${isSidebarOpen ? "px-4" : "justify-center px-0"}`}
          >
            <PiDoorOpen size={19} className="shrink-0" />
            {isSidebarOpen && (
              <span className="text-[13px] font-semibold tracking-wide">Keluar</span>
            )}
            {!isSidebarOpen && hoveredId === "logout" && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-700 text-white text-xs font-semibold rounded-lg shadow-lg z-50 whitespace-nowrap pointer-events-none">
                Keluar
              </div>
            )}
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="absolute -right-3 top-8 w-6 h-6 bg-white text-slate-600 hover:text-emerald-600 rounded-full flex items-center justify-center transition-all "
        >
          {isSidebarOpen ? <PiCaretLeft size={13} /> : <PiCaretRight size={13} />}
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center p-4" style={{ zIndex: 60 }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100">
            <div className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center shrink-0">
                <PiDoorOpen size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800">Akhiri Sesi?</h2>
                <p className="text-sm text-slate-500 mt-0.5">Anda akan keluar dari panel admin.</p>
              </div>
            </div>
            <div className="px-6 pb-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-5 py-2 bg-rose-600 text-white text-sm font-semibold rounded-xl hover:bg-rose-700 transition-colors shadow-sm"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
