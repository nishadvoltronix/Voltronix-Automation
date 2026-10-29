import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp, ArrowRight } from 'lucide-react';
import services from '../data/services.json';
import site from '../data/site.json';
import ResponsiveImage from './ResponsiveImage';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="brand-logo" to="/" aria-label="Voltronix Automation home">
              <ResponsiveImage name="logo" alt="Voltronix" sizes="(max-width: 1099px) 240px, 284px" className="footer-logo-image" />
              <span className="footer-brand-text">Automation</span>
            </Link>
            <p className="brand-description">Control panel engineering, manufacturing and industrial automation in Dubai and across the UAE.</p>
            <address className="contact-info">
              <a className="contact-item" href={`mailto:${site.email}`}><Mail size={18} aria-hidden="true" /><span>{site.email}</span></a>
              <a className="contact-item" href={`tel:${site.phone}`}><Phone size={18} aria-hidden="true" /><span>{site.phone}</span></a>
              <p className="contact-item"><MapPin size={18} aria-hidden="true" /><span>{site.address}</span></p>
            </address>
          </div>
          <div className="footer-links">
            <div className="links-column"><h2>Services</h2><ul>{services.map((service) => <li key={service.slug}><Link to={`/services/${service.slug}/`}>{service.title}</Link></li>)}</ul></div>
            <div className="links-column"><h2>Explore</h2><ul>
              <li><Link to="/">Home</Link></li><li><Link to="/#why-us">Why Voltronix</Link></li><li><Link to="/#projects">Application Examples</Link></li><li><Link to="/#contact">Contact & Quotations</Link></li>
              <li><Link to="/#applications">Automation Applications</Link></li><li><Link to="/contracting/">Site Contracting</Link></li>
            </ul></div>
          </div>
          <div className="footer-cta"><h2>Let's Work Together</h2><p>Have a project in mind? Share your requirements and discuss a suitable control panel solution.</p><Link className="cta-button" to="/#contact">Start a Project<ArrowRight size={18} aria-hidden="true" /></Link></div>
        </div>
        <div className="footer-bottom"><p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}. All rights reserved.</p><Link className="scroll-top" to="/#home" aria-label="Back to top"><ArrowUp size={20} aria-hidden="true" /></Link></div>
      </div>
    </footer>
  );
}
