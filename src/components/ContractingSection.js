import React from 'react';
import { Link } from 'react-router-dom';
import { Cable, Network, Wrench, ClipboardCheck, ArrowRight } from 'lucide-react';
import contracting from '../data/contracting.json';
import './ContentExpansion.css';

const icons = { Cable, Network, Wrench, ClipboardCheck };

export default function ContractingSection() {
  return (
    <section id="contracting" className="expansion-section" aria-labelledby="contracting-title">
      <div className="services-container">
        <div className="section-header">
          <div className="section-badge"><Wrench className="badge-icon" aria-hidden="true" /><span>Automation Site Contracting</span></div>
          <h2 id="contracting-title" className="section-title">From the Panel <span className="gradient-text">to the Field</span></h2>
          <p className="section-subtitle">We also carry out control and automation site work, connecting panels to field equipment through cable installation, containment, terminations and agreed commissioning support.</p>
        </div>
        <div className="info-cards">
          {contracting.homepageItems.map((item) => {
            const Icon = icons[item.icon];
            return <article className="info-card" key={item.title}><Icon className="info-icon" aria-hidden="true" /><div className="info-content"><h3>{item.title}</h3><p>{item.description}</p></div></article>;
          })}
        </div>
        <div className="expansion-actions">
          <Link className="btn-primary" to="/contracting/">Explore Contracting Services<ArrowRight size={18} aria-hidden="true" /></Link>
          <Link className="btn-secondary" to="/#contact">Request a Site Work Quotation</Link>
        </div>
      </div>
    </section>
  );
}
