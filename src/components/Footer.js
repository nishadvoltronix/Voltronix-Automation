import React from 'react';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Footer.css';

const groupLinks = [
  ['Contracting', 'https://voltronix.ae/'],
  ['DEWA Approvals', 'https://dewaapprovals.ae/'],
  ['AC Experts', 'https://acexperts.ae/'],
  ['Switchgear', 'https://switchgear.ae/']
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const go = (id) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (location.pathname !== '/') { navigate('/'); setTimeout(scroll, 80); } else scroll();
  };

  return <footer className="footer">
    <div className="container">
      <div className="footer-main">
        <div className="footer-brand"><div className="footer-logo"><img src="/logo.png" alt="Voltronix Automation" width="2160" height="648" loading="lazy"/><span>Automation</span></div><p>Industrial control-panel and automation solutions, engineered in Dubai for operations across the UAE.</p></div>
        <div className="footer-nav"><h3>Navigate</h3>{['home','services','about','industries','projects','contact'].map(id => <button key={id} onClick={() => go(id)}>{id[0].toUpperCase()+id.slice(1)}</button>)}</div>
        <div className="footer-nav"><h3>Services</h3><button onClick={() => navigate('/services/plc-panels')}>PLC Panels</button><button onClick={() => navigate('/services/vfd-control-panels')}>VFD Panels</button><button onClick={() => navigate('/services/mcc-assemblies')}>MCC Assemblies</button><button onClick={() => navigate('/services/bms-control-panels')}>BMS Panels</button></div>
        <div className="footer-contact"><h3>Contact</h3><a href="tel:+971504327804"><Phone/>+971 50 432 7804</a><a href="mailto:info@voltronix.ae"><Mail/>info@voltronix.ae</a><p><MapPin/>DIP 02, Dubai, UAE</p></div>
      </div>
    </div>

    <div className="footer-group-bar">
      <div className="container footer-group-links">
        <strong>VOLTRONIX GROUP</strong>
        {groupLinks.map(([label, href], index) => <a key={label} className={index === 0 ? 'active' : ''} href={href} target="_blank" rel="noreferrer">{label}</a>)}
      </div>
    </div>

    <div className="container">
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Voltronix Automation. All rights reserved.</span><span>Engineering a smarter future.</span><button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} aria-label="Back to top"><ArrowUp/></button></div>
    </div>
  </footer>;
}
