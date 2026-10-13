import React, { useEffect } from 'react';
import { ArrowRight, Building2, CircuitBoard, Gauge, Wrench } from 'lucide-react';
import './HeroSection.css';

const capabilities = [
  [CircuitBoard, 'PLC & SCADA', 'Control & monitoring'],
  [Building2, 'BMS Automation', 'Building management'],
  [Gauge, 'Control Panels', 'Design & assembly'],
  [Wrench, 'Commissioning', 'Testing & support']
];
export default function HeroSection() {
  useEffect(() => {
    const title = 'Control Panel Manufacturer in Dubai, UAE | Voltronix Automation';
    const description = 'Voltronix Automation designs and manufactures PLC, VFD, MCC, BMS, safety and custom control panels in Dubai and across the UAE.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', 'https://voltronixautomation.ae/');
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', 'https://voltronixautomation.ae/automation-control-room.jpg');
    document.querySelector('meta[property="og:image:alt"]')?.setAttribute('content', 'Voltronix Automation industrial control room');
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', 'https://voltronixautomation.ae/automation-control-room.jpg');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://voltronixautomation.ae/');
  }, []);
  return (
    <section id="home" className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">Control panels & automation · Dubai, UAE</span>
        <h1>Smarter Systems.<br/><span>Greater Efficiency.</span></h1>
        <p>We design, integrate and maintain industrial automation, BMS and control-panel solutions for dependable operations across the UAE.</p>
        <div className="hero-actions"><a className="btn-primary" href="#services">Explore Our Services <ArrowRight size={17}/></a><a className="btn-secondary" href="#contact">Contact Us</a></div>
      </div>
      <div className="hero-image-wrap"><img src="/automation-control-room.jpg" srcSet="/automation-control-room-mobile.jpg 900w, /automation-control-room.jpg 1672w" sizes="(max-width: 980px) 100vw, 56vw" alt="Industrial automation control room with electrical cabinets and engineering workstations" width="1672" height="941" fetchpriority="high" /><div className="hero-image-label"><strong>Engineering clarity.</strong><span>From panel build to site commissioning.</span></div></div>
      <div className="hero-capabilities" aria-label="Core automation capabilities">
        {capabilities.map(([Icon, label, detail]) => <div key={label}><Icon aria-hidden="true"/><span><strong>{label}</strong><small>{detail}</small></span></div>)}
      </div>
    </section>
  );
}
