import React from 'react';
import Header from './Landing/Header';
import Hero from './Landing/Hero';
import LandingAboutUs from './Landing/LandingAboutUs';
import LandingFocusAreas from './Landing/LandingFocusAreas';
import HotCampaigns from './Landing/HotCampaigns';
import TransparansiLanding from './Landing/TransparansiLanding';
import Partners from './Landing/Partners';
import LandingFaqs from './Landing/LandingFaqs';
import Footer from './Landing/Footer';
import ErrorBoundary from './Landing/ErrorBoundary';

const LandingPage = () => {
  return (
    <ErrorBoundary>
      <div className="bg-white text-slate-900 font-sans min-h-screen">
        <Header />
        <main className="pt-0">
          <Hero />
          <LandingAboutUs />
          <LandingFocusAreas />
          <HotCampaigns />
          <TransparansiLanding />
          <Partners />
          <LandingFaqs />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default LandingPage;
