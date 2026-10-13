import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

const links = [['Home', 'home'], ['Services', 'services'], ['About', 'about'], ['Industries', 'industries'], ['Projects', 'projects'], ['Contact', 'contact']];
const serviceLinks = [
  ['PLC Panels', 'plc-panels'],
  ['VFD Control Panels', 'vfd-control-panels'],
  ['MCC Assemblies', 'mcc-assemblies'],
  ['BMS Control Panels', 'bms-control-panels'],
  ['Safety & ESD Panels', 'safety-esd-panel'],
  ['Custom Control Panels', 'other-control-panels']
];
const industryLinks = [
  ['Commercial Buildings', 'commercial-buildings'],
  ['Residential & Villas', 'residential-villas'],
  ['Industrial Facilities', 'industrial-facilities'],
  ['Oil & Gas', 'oil-gas'],
  ['Healthcare', 'healthcare'],
  ['Retail & Hospitality', 'retail-hospitality']
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [active, setActive] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { setOpen(false); setMobileServicesOpen(false); setMobileIndustriesOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (location.pathname !== '/') return undefined;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-35% 0px -55%' });
    links.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [location.pathname]);
  const go = (id) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (location.pathname !== '/') { navigate('/'); setTimeout(scroll, 80); } else scroll();
    setOpen(false);
  };
  const goToService = (slug) => {
    navigate(`/services/${slug}`);
    setOpen(false);
    setMobileServicesOpen(false);
  };
  const goToIndustry = (slug) => {
    navigate(`/industries/${slug}`);
    setOpen(false);
    setMobileIndustriesOpen(false);
  };
  return (
    <header className="navigation">
      <div className="nav-container">
        <button className="nav-logo" onClick={() => go('home')} aria-label="Voltronix Automation home"><img src="/logo.png" alt="Voltronix Automation" width="2160" height="648" /><span>Automation</span></button>
        <nav className="nav-links" aria-label="Primary navigation">
          <button className={active === 'home' && location.pathname === '/' ? 'active' : ''} onClick={() => go('home')}>Home</button>
          <div className="nav-services">
            <button className={(active === 'services' && location.pathname === '/') || location.pathname.startsWith('/services/') ? 'active' : ''} onClick={() => go('services')} aria-haspopup="true">Services <ChevronDown size={14}/></button>
            <div className="services-dropdown">
              <span>Automation services</span>
              {serviceLinks.map(([label, slug]) => <button key={slug} className={location.pathname === `/services/${slug}` ? 'current' : ''} onClick={() => goToService(slug)}><span>{label}</span><ArrowRight size={15}/></button>)}
            </div>
          </div>
          <button className={active === 'about' && location.pathname === '/' ? 'active' : ''} onClick={() => go('about')}>About</button>
          <div className="nav-services">
            <button className={(active === 'industries' && location.pathname === '/') || location.pathname.startsWith('/industries/') ? 'active' : ''} onClick={() => go('industries')} aria-haspopup="true">Industries <ChevronDown size={14}/></button>
            <div className="services-dropdown">
              <span>Industries we support</span>
              {industryLinks.map(([label, slug]) => <button key={slug} className={location.pathname === `/industries/${slug}` ? 'current' : ''} onClick={() => goToIndustry(slug)}><span>{label}</span><ArrowRight size={15}/></button>)}
            </div>
          </div>
          {links.slice(4).map(([label, id]) => <button key={id} className={active === id && location.pathname === '/' ? 'active' : ''} onClick={() => go(id)}>{label}</button>)}
        </nav>
        <button className="nav-quote" onClick={() => go('contact')}>Get a Quote <ArrowUpRight size={15} /></button>
        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
      </div>
      <nav id="mobile-navigation" className={`mobile-menu ${open ? 'open' : ''}`} aria-label="Mobile navigation">
        <button onClick={() => go('home')}>Home</button>
        <button className="mobile-services-toggle" onClick={() => setMobileServicesOpen(!mobileServicesOpen)} aria-expanded={mobileServicesOpen}>Services <ChevronDown className={mobileServicesOpen ? 'rotated' : ''} size={17}/></button>
        <div className={`mobile-services ${mobileServicesOpen ? 'open' : ''}`}>{serviceLinks.map(([label, slug]) => <button key={slug} onClick={() => goToService(slug)}>{label}<ArrowRight size={15}/></button>)}</div>
        <button onClick={() => go('about')}>About</button>
        <button className="mobile-services-toggle" onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)} aria-expanded={mobileIndustriesOpen}>Industries <ChevronDown className={mobileIndustriesOpen ? 'rotated' : ''} size={17}/></button>
        <div className={`mobile-services ${mobileIndustriesOpen ? 'open' : ''}`}>{industryLinks.map(([label, slug]) => <button key={slug} onClick={() => goToIndustry(slug)}>{label}<ArrowRight size={15}/></button>)}</div>
        {links.slice(4).map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
        <button className="mobile-quote" onClick={() => go('contact')}>Get a Quote <ArrowUpRight size={16} /></button>
      </nav>
    </header>
  );
}
