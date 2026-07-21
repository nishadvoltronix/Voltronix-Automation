import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Keep navigation in "scrolled" style by default (user requested always visible)
      setIsScrolled(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const scrollNow = () => {
      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // If we're not on the home route, go home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollNow, 50);
      setTimeout(scrollNow, 200);
      setIsMobileMenuOpen(false);
      return;
    }

    scrollNow();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/logo.png" alt="Voltronix" className="nav-logo-image" />
          <span className="nav-logo-text">Automation</span>
        </div>

        <div className="nav-links desktop">
          {navLinks.map((link) => (
            <span
              key={link.name}
              className="nav-link"
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection(link.href)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') scrollToSection(link.href);
              }}
            >
              {link.name}
            </span>
          ))}
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <span
            key={link.name}
            className="mobile-nav-link"
            role="button"
            tabIndex={0}
            onClick={() => scrollToSection(link.href)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') scrollToSection(link.href);
            }}
          >
            {link.name}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
