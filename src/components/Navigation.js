import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import services from '../data/services.json';
import applications from '../data/applications.json';
import ResponsiveImage from './ResponsiveImage';
import { MotionControl } from './AutomationMotion';
import './Navigation.css';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#why-us' },
  { name: 'Industries', href: '/#applications' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' }
];

const dropdowns = {
  Services: {
    id: 'service-navigation',
    label: 'Show services',
    items: [
      ...services.map((service) => ({ title: service.title, href: `/services/${service.slug}/` })),
      { title: 'From the Panel to the Field', href: '/#contracting', className: 'nav-contracting-link' }
    ]
  },
  Industries: {
    id: 'industry-navigation',
    label: 'Show industries',
    heading: 'Automation for Your Application',
    items: applications.map((application) => ({ title: application.title, href: `/applications/${application.slug}/` }))
  }
};

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();
  const isActive = (link) => {
    if (link.name === 'Services' && (location.pathname.startsWith('/services/') || location.pathname.startsWith('/contracting'))) return true;
    if (link.name === 'Industries' && location.pathname.startsWith('/applications/')) return true;
    if (location.pathname !== '/') return false;
    if (link.name === 'Services' && location.hash === '#contracting') return true;
    return link.href === `/${location.hash || '#home'}`;
  };

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const closeOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        const trigger = navRef.current?.querySelector('.mobile-menu')
          ? navRef.current.querySelector('.mobile-menu-btn') : toggleRef.current;
        setOpenDropdown(null);
        setMobileOpen(false);
        trigger?.focus();
      }
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 900) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };
  const toggleDropdown = (name, trigger) => {
    toggleRef.current = trigger;
    setOpenDropdown((open) => open === name ? null : name);
  };
  const dropdownLinks = (name, className) => (
    <div id={dropdowns[name].id} className={className}>
      {dropdowns[name].heading && <p className="nav-dropdown-heading">{dropdowns[name].heading}</p>}
      {dropdowns[name].items.map((item) => (
        <Link key={item.href} to={item.href} className={item.className} onClick={closeMenus}>
          <span>{item.title}</span><ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );

  return (
    <nav ref={navRef} className="navigation scrolled" aria-label="Main navigation">
      <div className="nav-container">
        <Link className="nav-logo" to="/" aria-label="Voltronix Automation home" onClick={closeMenus}>
          <ResponsiveImage name="logo" alt="Voltronix" sizes="(max-width: 360px) 164px, (max-width: 420px) 175px, (max-width: 900px) 202px, (max-width: 1100px) 229px, 284px" priority className="nav-logo-image" />
          <span className="nav-logo-text">Automation</span>
        </Link>
        <div className="nav-links desktop">
          {navLinks.map((link) => dropdowns[link.name] ? (
            <div className={`nav-services${link.name === 'Industries' ? ' nav-industries' : ''}`} key={link.name}>
              <Link className="nav-link" to={link.href} aria-current={isActive(link) ? 'location' : undefined} onClick={closeMenus}>{link.name}</Link>
              <button type="button" className="services-menu-toggle" aria-label={dropdowns[link.name].label}
                aria-expanded={openDropdown === link.name} aria-controls={dropdowns[link.name].id}
                onClick={(event) => toggleDropdown(link.name, event.currentTarget)}>
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              {openDropdown === link.name && !mobileOpen && dropdownLinks(link.name, 'services-dropdown')}
            </div>
          ) : (
            <Link key={link.name} className="nav-link" to={link.href} aria-current={isActive(link) ? 'location' : undefined} onClick={closeMenus}>{link.name}</Link>
          ))}
        </div>
        <Link className="nav-quote" to="/#contact" onClick={closeMenus}>Get a Quote <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button type="button" className="mobile-menu-btn" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen} aria-controls="mobile-navigation"
          onClick={(event) => { toggleRef.current = event.currentTarget; setMobileOpen((open) => !open); setOpenDropdown(null); }}>
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {mobileOpen && (
        <div id="mobile-navigation" className="mobile-menu open">
          {navLinks.map((link) => (
            <div key={link.name} className="mobile-nav-row">
              <Link className="mobile-nav-link" to={link.href} aria-current={isActive(link) ? 'location' : undefined} onClick={closeMenus}>{link.name}</Link>
              {dropdowns[link.name] && (
                <button type="button" className="services-menu-toggle" aria-label={dropdowns[link.name].label}
                  aria-expanded={openDropdown === link.name} aria-controls={dropdowns[link.name].id}
                  onClick={(event) => toggleDropdown(link.name, event.currentTarget)}>
                  <ChevronDown size={20} aria-hidden="true" />
                </button>
              )}
              {openDropdown === link.name && dropdownLinks(link.name, 'mobile-service-links')}
            </div>
          ))}
          <div className="mobile-motion-control"><MotionControl /></div>
        </div>
      )}
    </nav>
  );
}
