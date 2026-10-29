import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, Droplets, Wind, Factory, Flame, Gauge, Settings, ArrowRight } from 'lucide-react';
import applications from '../data/applications.json';
import './ContentExpansion.css';

const icons = { Waves, Droplets, Wind, Factory, Flame, Gauge };

export default function AutomationApplicationsSection() {
  return (
    <section id="applications" className="expansion-section" aria-labelledby="applications-title">
      <div className="services-container">
        <div className="section-header">
          <div className="section-badge"><Settings className="badge-icon" aria-hidden="true" /><span>Automation Across Industries</span></div>
          <h2 id="applications-title" className="section-title">Automation for <span className="gradient-text">Your Application</span></h2>
          <p className="section-subtitle">From swimming pools and fountains to building services and industrial processes, we develop the control arrangement around the equipment and how it needs to operate.</p>
        </div>
        <div className="expansion-application-grid">
          {applications.map((application, index) => {
            const Icon = icons[application.icon];
            return (
              <Link key={application.slug} to={`/applications/${application.slug}/`} className="service-card expansion-application-card" style={{ '--service-color': application.color }}>
                <span className="service-card-number" aria-hidden="true">0{index + 1}</span>
                <div className="service-icon-wrapper"><Icon className="service-icon" aria-hidden="true" /></div>
                <h3 className="service-title">{application.title}</h3>
                <p className="service-description">{application.description}</p>
                <div className="service-features">{application.features.map((feature) => <span className="feature-tag" key={feature}>{feature}</span>)}</div>
                <span className="service-cta">Explore the application<ArrowRight className="cta-icon" aria-hidden="true" /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
