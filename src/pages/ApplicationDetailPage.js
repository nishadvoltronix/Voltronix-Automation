import React from 'react';
import { Link, useParams } from 'react-router-dom';
import applications from '../data/applications.json';
import services from '../data/services.json';
import ResponsiveImage from '../components/ResponsiveImage';
import NotFoundPage from './NotFoundPage';
import './ServiceDetailPage.css';
import '../components/ContentExpansion.css';

export default function ApplicationDetailPage() {
  const { slug } = useParams();
  const application = applications.find((item) => item.slug === slug);
  if (!application) return <NotFoundPage />;
  const related = services.filter((service) => application.relatedServices.includes(service.slug));
  return (
    <main id="main-content" className="service-detail-page expansion-detail-page" style={{ '--service-accent': application.color }}>
      <header className="service-detail-hero">
        <div className="service-detail-container">
          <nav className="service-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/#applications">Applications</Link><span aria-hidden="true">/</span><span aria-current="page">{application.title}</span></nav>
          <h1 className="service-detail-title">{application.title} in Dubai, UAE</h1>
          <p className="service-detail-subtitle">{application.heading}</p>
          <div className="service-detail-hero-actions"><Link className="service-primary-btn" to="/#contact">Discuss Your Application</Link><Link className="service-secondary-btn" to="/#applications">Explore All Applications</Link></div>
        </div>
      </header>
      <section className="service-detail-section" aria-labelledby="application-overview">
        <div className="service-detail-container service-detail-grid">
          <figure className="service-detail-image-card"><ResponsiveImage name={application.image} className="service-detail-image" alt={application.imageAlt} sizes="(max-width: 899px) 92vw, 520px" priority /><figcaption className="expansion-image-caption">Illustrative control panel hardware. The project assembly follows the agreed equipment and operating requirements.</figcaption></figure>
          <article className="service-detail-content-card">
            <h2 id="application-overview" className="service-detail-content-title">Application Overview</h2>
            <p className="service-detail-paragraph">{application.overview}</p><p className="service-detail-paragraph">{application.context}</p>
            <h3 className="service-detail-list-title">Typical control scope</h3><ul className="service-detail-bullets">{application.capabilities.map((point) => <li key={point}>{point}</li>)}</ul>
          </article>
        </div>
      </section>
      <section className="service-detail-section service-detail-bottom" aria-labelledby="application-value">
        <div className="service-detail-container"><h2 id="application-value" className="service-detail-content-title">Designed for Operation & Maintenance</h2><div className="expansion-benefits">{application.benefits.map((benefit) => <article className="service-small-card" key={benefit}><p>{benefit}</p></article>)}</div></div>
      </section>
      <section className="service-detail-section service-detail-bottom" aria-labelledby="application-site-work">
        <div className="service-detail-container"><div className="expansion-quote-card"><h2 id="application-site-work">Control Panels & Site Connections</h2><p className="service-detail-paragraph">The installation scope can also include control cable pulling, cable tray or containment work, glanding, terminations and functional checks. Panel engineering and site work are coordinated against the approved drawings and agreed responsibilities.</p><Link className="btn-secondary" to="/contracting/">Explore Automation Contracting</Link></div></div>
      </section>
      <section className="service-detail-section service-detail-bottom" aria-labelledby="application-quotation">
        <div className="service-detail-container"><div className="expansion-quote-card"><h2 id="application-quotation">What to Share for a Quotation</h2><ul>{application.quotationInputs.map((point) => <li key={point}>{point}</li>)}</ul><Link className="btn-primary" to="/#contact">Send Your Project Requirements</Link></div></div>
      </section>
      <section className="service-detail-section service-related" aria-labelledby="application-related-services">
        <div className="service-detail-container"><h2 id="application-related-services">Related Control Panel Services</h2><div className="service-related-links">{related.map((service) => <Link key={service.slug} to={`/services/${service.slug}/`}>{service.title}<span aria-hidden="true">↗</span></Link>)}</div><Link className="btn-secondary" to="/#applications">Browse Other Automation Applications</Link></div>
      </section>
    </main>
  );
}
