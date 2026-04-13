import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Landing/Header';
import Footer from './Landing/Footer';
import ErrorBoundary from './Landing/ErrorBoundary';

// Landing Components
import Hero from './Landing/Hero';
import LandingAboutUs from './Landing/LandingAboutUs';
import LandingFocusAreas from './Landing/LandingFocusAreas';
import HotCampaigns from './Landing/HotCampaigns';
import TransparansiLanding from './Landing/TransparansiLanding';
import Partners from './Landing/Partners';
import LandingFaqs from './Landing/LandingFaqs';
import DonationPage from './Landing/DonationPage';
import VolunteerRegistration from './Landing/VolunteerRegistration';
import ContactSection from './Landing/ContactSection';
import VolunteerCTA from './Landing/VolunteerCTA';
import MoreGallery from './Landing/MoreGallery';

// Anchor Scroll Handler - navigates to #hash on landing page
const AnchorScrollHandler = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [hash]);
  return null;
};

// Homepage: composed of all key sections with proper IDs (assigned in each component)
const LandingHome = () => (
  <>
    <AnchorScrollHandler />
    <Hero />
    <LandingFocusAreas />
    <HotCampaigns />
    <TransparansiLanding />
    <Partners />
    <VolunteerCTA />
    <ContactSection />
  </>
);

// Page Wrapper for dedicated pages (dark top banner, consistent layout)
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="pt-24 min-h-[70vh] bg-slate-50 relative pb-12">
    <div className="absolute top-0 left-0 w-full h-64 bg-slate-900 -z-10"></div>
    {children}
  </div>
);

// ✅ Dedicated pages (add value beyond homepage)
const PageAbout       = () => <PageWrapper><LandingAboutUs /></PageWrapper>;
const PageAllPrograms = () => <PageWrapper><HotCampaigns /></PageWrapper>;
const PageFaqs        = () => <PageWrapper><LandingFaqs /></PageWrapper>;
const PageGetInvolved = () => (
  <PageWrapper>
    <div className="max-w-4xl mx-auto text-center mb-10 pt-8 animate-fade-in relative z-20">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Mari Bergabung &amp; Terlibat</h1>
      <p className="text-slate-600 text-lg max-w-2xl mx-auto">Sinergi kita akan berdampak besar. Pendaftaran Anda akan ditinjau langsung oleh tim pengurus organisasi kami guna menyelaraskan keahlian Anda dengan program yang berjalan.</p>
    </div>
    <VolunteerRegistration />
  </PageWrapper>
);

const LandingLayout = () => {
  return (
    <ErrorBoundary>
      <div className="bg-white text-slate-900 font-sans min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route index element={<LandingHome />} />

            {/* Tentang & Profil */}
            <Route path="about" element={<PageAbout />} />

            {/* Program & Donasi */}
            <Route path="allprograms" element={<PageAllPrograms />} />
            <Route path="donate" element={<PageWrapper><DonationPage /></PageWrapper>} />
            <Route path="donate/:id" element={<PageWrapper><DonationPage /></PageWrapper>} />

            {/* Bergerak Bersama */}
            <Route path="faqs" element={<PageFaqs />} />
            <Route path="getinvolved" element={<PageGetInvolved />} />
            <Route path="gallery" element={<PageWrapper><MoreGallery /></PageWrapper>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default LandingLayout;
