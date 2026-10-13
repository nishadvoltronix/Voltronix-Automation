import React from 'react';
import { ArrowRight, Building2, CheckCircle2, Factory, HeartPulse, Home, Hotel, Landmark, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HomeSections.css';

const industries = [[Building2, 'Commercial buildings', 'commercial-buildings'], [Home, 'Residential & villas', 'residential-villas'], [Factory, 'Industrial facilities', 'industrial-facilities'], [Landmark, 'Oil & gas facilities', 'oil-gas'], [HeartPulse, 'Healthcare', 'healthcare'], [Hotel, 'Retail & hospitality', 'retail-hospitality']];
const steps = [['01', 'Consultation', 'Understand the site and control requirements.'], ['02', 'Design & engineering', 'Develop the panel and automation solution.'], ['03', 'Build & installation', 'Manufacture, wire and implement the system.'], ['04', 'Testing & commissioning', 'Verify operation and support handover.'], ['05', 'Ongoing support', 'Maintain, troubleshoot and improve.']];

export default function HomeSections() {
  return <>
    <section id="about" className="about-section"><div className="container about-layout">
      <div className="about-image"><img src="/Bms.jpeg" alt="Voltronix building automation control panel" loading="lazy"/><div><Settings/><span>Practical automation<br/>for real operations</span></div></div>
      <div className="about-copy"><span className="eyebrow">About Voltronix</span><h2 className="section-heading">Your Trusted Automation Partner <span>in the UAE</span></h2><p>Voltronix Automation specializes in industrial automation, BMS, control panels and more — delivering intelligent solutions for industries and buildings across the UAE.</p><div className="about-stats"><div><strong>10+</strong><span>Years of Experience</span></div><div><strong>200+</strong><span>Projects Completed</span></div><div><strong>100%</strong><span>Client Satisfaction</span></div></div><a className="btn-primary" href="#contact">Talk to our team <ArrowRight size={16}/></a></div>
    </div></section>

    <section id="industries" className="industries-section"><div className="container">
      <div className="section-heading-row"><div><span className="eyebrow">Industries we serve</span><h2 className="section-heading">Solutions for <span>every environment</span></h2><p className="section-copy">Flexible control and automation solutions for buildings, infrastructure and industrial operations across the UAE.</p></div></div>
      <div className="industry-grid">{industries.map(([Icon, label, slug]) => <Link className="industry-card" to={`/industries/${slug}`} key={label}><Icon/><span>{label}</span></Link>)}</div>
    </div></section>

    <section id="process" className="process-section"><div className="container">
      <div className="process-layout">
        <div className="process-intro"><span className="eyebrow">Our process</span><h2 className="process-title"><span>From consultation</span><span>to <em>commissioning</em></span></h2><p className="section-copy">A simple, transparent process to deliver the right solution for your needs.</p></div>
        <div className="process-track">{steps.map(([number, title, text]) => <div className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      </div>

      <div className="trust-layout">
        <div className="trust-copy"><span className="eyebrow">Built for UAE operations</span><h2 className="section-heading">Practical engineering. <span>Responsive support.</span></h2><div className="trust-card"><p>Voltronix brings control-panel engineering, automation know-how and local project coordination together under one team.</p><div className="trust-points"><span><CheckCircle2/>Clear communication</span><span><CheckCircle2/>Structured delivery</span><span><CheckCircle2/>Ongoing technical support</span></div></div></div>
        <div className="trust-image"><img src="/dubai-skyline.png" alt="Dubai skyline representing Voltronix support across the UAE" loading="lazy"/><div><span>Building smarter and more connected</span><strong>UAE</strong></div></div>
      </div>
    </div></section>
  </>;
}
