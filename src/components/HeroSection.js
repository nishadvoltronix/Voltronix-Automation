import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage';
import PanelSchematic from './PanelSchematic';
import { MotionControl } from './AutomationMotion';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-bg-effects" aria-hidden="true"><div className="grid-overlay" /></div>
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-badge">Industrial control & automation · UAE</p>
          <h1 id="hero-title" className="hero-title">Control Panel Supplier <span>in Dubai</span></h1>
          <p className="hero-tagline gradient-text">Smart control. Reliable performance.</p>
          <p className="hero-subtitle">Panel engineering, manufacturing and automation for UAE industry.</p>
          <p className="hero-description">Voltronix Automation designs and builds PLC, VFD, MCC, BMS and custom control panels. From component selection and programming to testing and commissioning, we develop each solution around your project requirements.</p>
          <div className="hero-cta">
            <Link className="btn-primary" to="/#contact">Get a Quote<ArrowRight className="btn-icon" aria-hidden="true" /></Link>
            <Link className="btn-secondary" to="/#services">Explore Our Services</Link>
          </div>
          <ul className="hero-capabilities" aria-label="Engineering capabilities">
            {['Custom panel design', 'PLC & HMI programming', 'Testing & commissioning'].map((text) => <li key={text}><CheckCircle2 size={17} aria-hidden="true" />{text}</li>)}
          </ul>
          <div className="hero-motion-control"><MotionControl /></div>
        </div>
        <div className="hero-panels" aria-label="Control panel examples">
          <figure className="hero-panel">
            <figcaption><span className="panel-caption-icon" aria-hidden="true" />PLC control panels<span className="panel-caption-lights" aria-hidden="true"><i /><i /><i /></span></figcaption>
            <div className="panel-photo-stage"><ResponsiveImage name="plc-hero" alt="Industrial PLC control panel and internal components" sizes="(max-width: 599px) 43vw, (max-width: 1099px) 40vw, 340px" priority /><span className="panel-frame-corners" aria-hidden="true" /></div>
            <PanelSchematic type="plc" />
          </figure>
          <figure className="hero-panel">
            <figcaption><span className="panel-caption-icon" aria-hidden="true" />VFD control panels<span className="panel-caption-lights" aria-hidden="true"><i /><i /><i /></span></figcaption>
            <div className="panel-photo-stage"><ResponsiveImage name="vfd-hero" alt="Industrial VFD control panel and drive assembly" sizes="(max-width: 599px) 43vw, (max-width: 1099px) 40vw, 340px" /><span className="panel-frame-corners" aria-hidden="true" /></div>
            <PanelSchematic type="vfd" />
          </figure>
        </div>
      </div>
    </section>
  );
}
