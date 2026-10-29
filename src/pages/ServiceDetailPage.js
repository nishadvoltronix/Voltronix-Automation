import React from 'react';
import { useParams, Link } from 'react-router-dom';
import services from '../data/services.json';
import ResponsiveImage from '../components/ResponsiveImage';
import NotFoundPage from './NotFoundPage';
import './ServiceDetailPage.css';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFoundPage />;

  return (
    <main id="main-content" className="service-detail-page" style={{ '--service-accent': service.color }}>
      <header className="service-detail-hero">
        <div className="service-detail-container">
          <nav className="service-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/#services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span></nav>
          <h1 className="service-detail-title">{service.title} in Dubai, UAE</h1>
          <p className="service-detail-subtitle">{service.heading}</p>
          <div className="service-detail-hero-actions">
            <Link className="service-primary-btn" to="/#contact">Request a Quote</Link>
            <Link className="service-secondary-btn" to="/#services">Explore All Services</Link>
          </div>
        </div>
      </header>
      <section className="service-detail-section" aria-labelledby="service-overview">
        <div className="service-detail-container service-detail-grid">
          <figure className="service-detail-image-card">
            <ResponsiveImage name={slug} className="service-detail-image" alt={`${service.title} control panel assembly`} sizes="(max-width: 899px) 92vw, 520px" priority />
          </figure>
          <div className="service-detail-content-card">
            <h2 id="service-overview" className="service-detail-content-title">Overview</h2>
            <p className="service-detail-paragraph">{service.overview}</p>
            <h3 className="service-detail-list-title">What we provide</h3>
            <ul className="service-detail-bullets">{service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            <h3 className="service-detail-list-title">Typical applications</h3>
            <p className="service-detail-paragraph">{service.applications}</p>
          </div>
        </div>
      </section>
      <section className="service-detail-section service-detail-bottom" aria-label="Project delivery">
        <div className="service-detail-container service-detail-bottom-cards">
          <article className="service-small-card"><h2>Design & Engineering</h2><p>Project drawings, component review and panel layout developed around your approved requirements.</p></article>
          <article className="service-small-card"><h2>Manufacturing</h2><p>Panel fabrication, cable routing, labelling and assembly quality checks.</p></article>
          <article className="service-small-card"><h2>Testing & Commissioning</h2><p>Agreed functional checks, documentation and site commissioning support.</p></article>
        </div>
      </section>
      <section className="service-detail-section service-detail-bottom" aria-labelledby="service-questions">
        <div className="service-detail-container service-questions">
          <h2 id="service-questions">Planning your control panel project</h2>
          <details><summary>What information is needed for a quotation?</summary><p>Share the load schedule or bill of quantities, drawings, supply voltage, operating sequence, preferred components and enclosure requirements. Include delivery and site-support requirements where applicable.</p></details>
          <details><summary>Can the panel integrate with an existing system?</summary><p>Integration is reviewed against the existing PLC, BMS or control system. Provide the communication protocol, I/O list and control interface so we can confirm a suitable scope.</p></details>
          <details><summary>Do you support projects outside Dubai?</summary><p>We support control panel projects across the UAE. Delivery, installation and commissioning scope are confirmed in the project quotation.</p></details>
        </div>
      </section>
      <section className="service-detail-section service-related" aria-labelledby="related-services">
        <div className="service-detail-container"><h2 id="related-services">Related control panel services</h2>
          <div className="service-related-links">{services.filter((item) => item.slug !== slug).map((item) => <Link key={item.slug} to={`/services/${item.slug}/`}>{item.title}<span aria-hidden="true">↗</span></Link>)}</div>
          <Link className="btn-primary" to="/#contact">Discuss Your Project</Link>
        </div>
      </section>
    </main>
  );
}
