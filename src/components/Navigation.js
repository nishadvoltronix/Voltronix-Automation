import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Projects', href: '#projects' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <Cpu className="logo-icon" />
          <span className="logo-text">Auto<span className="logo-highlight">Mate</span></span>
        </div>

        <div className="nav-links desktop">
          {navLinks.map((link) => (
            <button
              key={link.name}
              className="nav-link"
              onClick={() => scrollToSection(link.href)}
            >
              {link.name}
            </button>
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
          <button
            key={link.name}
            className="mobile-nav-link"
            onClick={() => scrollToSection(link.href)}
          >
            {link.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
