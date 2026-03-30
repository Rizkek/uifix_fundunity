import React, { useState } from "react";
import Sidebar from "./Sidebar";

// Update LayoutProps untuk memasukkan onToggleSidebar
interface LayoutProps {
  children: React.ReactNode;
  onToggleSidebar: () => void; // Tambahkan onToggleSidebar ke props
}

const Layout = ({ children, onToggleSidebar }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close state
    onToggleSidebar(); // Notify parent to update sidebar visibility status
  };

  const sidebarWidth = isSidebarOpen ? "224px" : "72px";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar dengan status isSidebarOpen */}
      <Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={handleSidebarToggle} isLoggedIn={true} />

      {/* Main Content — mengisi sisa layar setelah sidebar */}
      <div
        className="p-8"
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100% - ${sidebarWidth})`,
          transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
