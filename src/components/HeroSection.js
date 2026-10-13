import React, { useEffect } from 'react';
import { ArrowRight, Building2, CircuitBoard, Gauge, Wrench } from 'lucide-react';
import './HeroSection.css';

const capabilities = [[CircuitBoard, 'PLC & SCADA'], [Building2, 'BMS Automation'], [Gauge, 'Control Panels'], [Wrench, 'Commissioning']];
export default function HeroSection() {
  useEffect(() => {
    const title = 'Control Panel Manufacturer in Dubai, UAE | Voltronix Automation';
    const description = 'Voltronix Automation designs and manufactures PLC, VFD, MCC, BMS, safety and custom control panels in Dubai and across the UAE.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', 'https://voltronixautomation.ae/');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://voltronixautomation.ae/');
  }, []);
  return (
    <section id="home" className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">Industrial automation solutions</span>
        <h1>Smarter Systems.<br/><span>Greater Efficiency.</span></h1>
        <p>We design, integrate and maintain industrial automation, BMS and control-panel solutions for dependable operations across the UAE.</p>
        <div className="hero-actions"><a className="btn-primary" href="#services">Explore Our Services <ArrowRight size={17}/></a><a className="btn-secondary" href="#contact">Contact Us</a></div>
        <div className="hero-capabilities">{capabilities.map(([Icon, label]) => <div key={label}><Icon/><span>{label}</span></div>)}</div>
      </div>
      <div className="hero-image-wrap"><img src="/automation-control-room.png" alt="Industrial automation control room with electrical cabinets and engineering workstations" /><div className="hero-image-label"><strong>Engineering clarity.</strong><span>From panel build to site commissioning.</span></div></div>
    </section>
  );
}
