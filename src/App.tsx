import React, { useState } from 'react';
import { 
  Routes, 
  Route, 
  Navigate, 
  useNavigate, 
  useLocation 
} from 'react-router-dom';

// Components
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Settings from './components/Settings';
import ImageSlider from './components/ImageSlider';
import Partners from './components/Partners';
import Notifications from './components/Notifications';
import Sidebar from './layout/Sidebar';
import Login from './components/Login';
import Logout from './components/Logout';
import WebsiteIdentity from './components/WebsiteIdentity';
import FocusAreas from './components/FocusAreas';
import Faqs from './components/Faqs';
import Messages from './components/Messages';
import LandingLayout from './components/LandingLayout';
import LandingManager from './components/LandingManager';
import Campaign from './components/Campaign';
import KeuanganTransparansi from './components/KeuanganTransparansi';
import DatabaseStakeholder from './components/DatabaseStakeholder';
import GalleryManagement from './components/GalleryManagement';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Protected Route Component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };
  
  const shouldShowSidebar = !location.pathname.startsWith("/landing") && !["/login", "/logout"].includes(location.pathname);
  
  return (
    <div className="app-container flex">
      {shouldShowSidebar && (
        <Sidebar 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          isLoggedIn={true}
        />
      )}
      
      <div
        className="main-content transition-all duration-300 ease-in-out"
        style={{
          marginLeft: shouldShowSidebar ? (isSidebarOpen ? "224px" : "72px") : "0px",
          width: shouldShowSidebar
            ? `calc(100% - ${isSidebarOpen ? "224px" : "72px"})`
            : "100%",
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/landing/*" element={<LandingLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
         
          {/* Protected Routes */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/aboutus" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
          <Route path="/focusareas" element={<PrivateRoute><FocusAreas /></PrivateRoute>} />
          <Route path="/faqs" element={<PrivateRoute><Faqs /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/gallery" element={<PrivateRoute><GalleryManagement /></PrivateRoute>} />

          {/* Individual Landing Content Management */}
          <Route path="/imageslider" element={<PrivateRoute><ImageSlider /></PrivateRoute>} />
          <Route path="/partners" element={<PrivateRoute><Partners /></PrivateRoute>} />
          <Route path="/identity" element={<PrivateRoute><WebsiteIdentity /></PrivateRoute>} />
          <Route path="/landing-manager" element={<PrivateRoute><LandingManager /></PrivateRoute>} />
          
          <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/campaign" element={<PrivateRoute><Campaign /></PrivateRoute>} />
          <Route path="/keuangantransparansi" element={<PrivateRoute><KeuanganTransparansi /></PrivateRoute>} />
          <Route path="/databasestakeholder" element={<PrivateRoute><DatabaseStakeholder /></PrivateRoute>} />
          
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
