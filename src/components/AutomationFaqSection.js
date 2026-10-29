import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck } from 'lucide-react';
import faqs from '../data/automation-faqs.json';
import './ContentExpansion.css';

export default function AutomationFaqSection() {
  return (
    <section id="automation-faqs" className="expansion-section" aria-labelledby="automation-faqs-title">
      <div className="services-container">
        <div className="section-header">
          <div className="section-badge"><ClipboardCheck className="badge-icon" aria-hidden="true" /><span>Planning Your Project</span></div>
          <h2 id="automation-faqs-title" className="section-title">Your Automation <span className="gradient-text">Questions</span></h2>
          <p className="section-subtitle">A clear scope starts with the equipment, the operating sequence and the site requirements.</p>
        </div>
        <div className="expansion-faqs">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        <div className="expansion-actions"><Link className="btn-secondary" to="/#contact">Share Your Drawings & Requirements</Link></div>
      </div>
    </section>
  );
}
