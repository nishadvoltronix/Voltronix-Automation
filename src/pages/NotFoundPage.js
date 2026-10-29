import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main id="main-content" className="not-found-page">
      <p className="section-badge">404 · Page not found</p>
      <h1>This page could not be found.</h1>
      <p>Explore our control panel services or contact Voltronix Automation about your project.</p>
      <Link className="btn-primary" to="/#services">Explore our services</Link>
    </main>
  );
}
