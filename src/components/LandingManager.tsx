import React, { useState } from 'react';
import Header from '../layout/Header';
import ImageSlider from './ImageSlider';
import FocusAreas from './FocusAreas';
import AboutUs from './AboutUs';
import Faqs from './Faqs';
import Partners from './Partners';
import { PiSlideshow, PiCrosshair, PiUsersFour, PiChatsCircle, PiHandshake } from 'react-icons/pi';

type ManagerTab = 'slider' | 'focus' | 'about' | 'faqs' | 'partners';

const LandingManager = () => {
  const [activeTab, setActiveTab] = useState<ManagerTab>('slider');

  const tabs = [
    { key: 'slider', label: 'Banner Slider', icon: PiSlideshow },
    { key: 'focus',  label: 'Fokus Area',   icon: PiCrosshair },
    { key: 'about',  label: 'Profil Lembaga', icon: PiUsersFour },
    { key: 'faqs',   label: 'Tanya Jawab',   icon: PiChatsCircle },
    { key: 'partners', label: 'Mitra',        icon: PiHandshake },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'slider':   return <ImageSlider />;
      case 'focus':    return <FocusAreas />;
      case 'about':    return <AboutUs />;
      case 'faqs':     return <Faqs />;
      case 'partners': return <Partners />;
      default:         return <ImageSlider />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* 
        Note: The sub-components (ImageSlider, etc) also render a <Header /> internally.
        To avoid double headers, we can either:
        1. Modify the sub-components to have an optional 'noHeader' prop.
        2. Just let them render since they are absolute/sticky.
        
        However, for the cleanest look, let's keep it simple: 
        We won't render Header here if the sub-components do.
      */}

      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full space-y-6">
        
        {/* Sub-navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as ManagerTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Box - We delegate to existing components */}
        <div className="relative">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default LandingManager;
