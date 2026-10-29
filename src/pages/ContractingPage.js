import React from 'react';
import { Link } from 'react-router-dom';
import contracting from '../data/contracting.json';
import applications from '../data/applications.json';
import './ServiceDetailPage.css';
import '../components/ContentExpansion.css';

export default function ContractingPage() {
  return (
    <main id="main-content" className="service-detail-page expansion-detail-page" style={{ '--service-accent': contracting.color }}>
      <header className="service-detail-hero"><div className="service-detail-container">
        <nav className="service-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Site Contracting</span></nav>
        <h1 className="service-detail-title">Automation & Control Contracting in Dubai, UAE</h1><p className="service-detail-subtitle">{contracting.heading}</p>
        <div className="service-detail-hero-actions"><Link className="service-primary-btn" to="/#contact">Request a Contracting Quotation</Link><Link className="service-secondary-btn" to="/#services">Explore Control Panel Services</Link></div>
      </div></header>
      <section className="service-detail-section" aria-labelledby="contracting-scope"><div className="service-detail-container">
        <h2 id="contracting-scope" className="service-detail-content-title">Site Installation & Automation Support</h2><p className="expansion-intro">{contracting.overview}</p><p className="expansion-intro">{contracting.context}</p>
        <div className="expansion-scope-grid">{contracting.scope.map((item) => <article className="service-detail-content-card" key={item.title}><h3 className="service-detail-content-title">{item.title}</h3><p className="service-detail-paragraph">{item.description}</p><ul className="service-detail-bullets">{item.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div>
      </div></section>
      <section className="service-detail-section service-detail-bottom" aria-labelledby="contracting-process"><div className="service-detail-container"><h2 id="contracting-process" className="service-detail-content-title">How the Work is Coordinated</h2><div className="expansion-flow-grid">{contracting.process.map((step, index) => <article className="service-small-card" key={step.title}><span className="expansion-flow-step">Step 0{index + 1}</span><h3 className="service-detail-list-title">{step.title}</h3><p>{step.description}</p></article>)}</div></div></section>
      <section className="service-detail-section service-detail-bottom" aria-labelledby="contracting-quotation"><div className="service-detail-container"><div className="expansion-quote-card"><h2 id="contracting-quotation">Information for a Site Work Quotation</h2><ul>{contracting.quotationInputs.map((point) => <li key={point}>{point}</li>)}</ul><Link className="btn-primary" to="/#contact">Share Your Drawings & Site Scope</Link></div></div></section>
      <section className="service-detail-section service-detail-bottom" aria-labelledby="contracting-faq"><div className="service-detail-container service-questions"><h2 id="contracting-faq">Contracting Questions</h2>{contracting.faq.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      <section className="service-detail-section service-related" aria-labelledby="contracting-applications"><div className="service-detail-container"><h2 id="contracting-applications">Automation Applications We Support</h2><div className="service-related-links">{applications.map((application) => <Link key={application.slug} to={`/applications/${application.slug}/`}>{application.title}<span aria-hidden="true">↗</span></Link>)}</div></div></section>
    </main>
  );
}
