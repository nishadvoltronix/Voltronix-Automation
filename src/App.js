import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import WhyUsSection from './components/WhyUsSection';
import ContactSection from './components/ContactSection';
import HomeSections from './components/HomeSections';

import ServiceDetailPage from './pages/ServiceDetailPage';
import IndustryDetailPage from './pages/IndustryDetailPage';

import SalesIqWidget from './components/SalesIqWidget';
import MotionEffects from './components/MotionEffects';

import './App.css';

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  return null;
}

function App() {
  return (
      <div className="App">
        <Navigation />
        <ScrollToTopOnRouteChange />
        <MotionEffects />

        <Routes>
          <Route
            path="/"
            element={
              <main>
                <HeroSection />
                <ServicesSection />
                <HomeSections />
                <ProjectsSection />
                <WhyUsSection />
                <ContactSection />
              </main>
            }
          />

          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        </Routes>

        <Footer />

        {/* Zoho SalesIQ bot */}
        <SalesIqWidget />

        <a
          className="vx-wa-symbol"
          href="https://wa.me/971504327804"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <span className="vx-wa-inner" aria-hidden="true" />
          <span className="vx-wa-phone-bg" aria-hidden="true" />
          {/* WhatsApp logo */}
          <svg width="44" height="44" viewBox="0 0 24 24" role="img" aria-label="WhatsApp" focusable="false">
            <path
              fill="#25d366"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12c0 1.9.52 3.67 1.43 5.19L2 22l5-.4c1.55.85 3.32 1.3 5 1.3 5.52 0 10-4.48 10-10S17.52 2 12 2Zm5.53 14.1c-.24.68-1.4 1.3-1.93 1.4-.5.1-1.13.15-1.83-.05-.42-.13-.96-.33-1.61-.67-2.06-1.1-3.4-3.03-3.53-3.23-.13-.2-.84-1.28-.84-2.44 0-1.16.6-1.73.81-1.96.21-.23.46-.29.62-.29h.45c.13 0 .34 0 .51.43.18.42.6 1.46.66 1.56.06.1.1.23.02.42-.08.19-.12.31-.25.48-.13.16-.28.36-.39.48-.13.13-.26.27-.11.53.15.26.68 1.1 1.46 1.78 1 .86 1.83 1.11 2.1 1.22.26.1.43.08.59-.1.19-.22.7-.83.88-1.11.18-.27.36-.22.6-.13.24.1 1.52.73 1.78.86.26.13.43.2.49.31.06.11.06.64-.18 1.33Z"
            />
          </svg>
        </a>
      </div>
  );
}

export default App;
