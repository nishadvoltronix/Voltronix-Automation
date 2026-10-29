import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Settings, Building2, Wrench, Shield, ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import services from '../data/services.json';
import './ServicesSection.css';

const icons = { Cpu, Zap, Settings, Building2, Wrench, Shield };

export default function ServicesSection() {
  const trackRef = useRef(null);
  const [firstIndex, setFirstIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const track = trackRef.current;
    let frame;
    const measure = () => {
      const cards = track.children;
      const cardWidth = cards[0]?.getBoundingClientRect().width;
      if (!cardWidth || !track.clientWidth) return;
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      if (step <= 0) return;
      const gap = step - cardWidth;
      const count = Math.max(1, Math.min(3, Math.round((track.clientWidth + gap) / step)));
      setVisibleCount(count);
      setFirstIndex(Math.max(0, Math.min(services.length - count, Math.round(track.scrollLeft / step))));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    track.addEventListener('scroll', schedule, { passive: true });
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    observer?.observe(track);
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer?.disconnect();
    };
  }, []);

  const lastIndex = services.length - visibleCount;
  const pages = Math.ceil(services.length / visibleCount);
  const show = (index) => {
    const target = Math.max(0, Math.min(lastIndex, index));
    const track = trackRef.current;
    const left = track.children[target].offsetLeft - track.children[0].offsetLeft;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (typeof track.scrollTo === 'function') track.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
    else track.scrollLeft = left;
    setFirstIndex(target);
  };

  return (
    <section id="services" className="services-section" aria-labelledby="services-title">
      <div className="services-bg" aria-hidden="true"><div className="services-grid" /></div>
      <div className="services-container">
        <div className="section-header">
          <div className="section-badge"><Settings className="badge-icon" aria-hidden="true" /><span>Voltronix Solutions</span></div>
          <h2 id="services-title" className="section-title">Control Panel <span className="gradient-text">Solutions</span></h2>
          <p className="section-subtitle">Explore six control panel services in Dubai and across the UAE, from design and assembly to programming and commissioning.</p>
        </div>
        <div className="services-carousel-toolbar">
          <p>Browse our six services <span className="swipe-hint">· Swipe to explore</span></p>
          <div className="services-carousel-arrows">
            <button type="button" className="services-arrow" aria-label="Previous services" aria-controls="services-track" disabled={firstIndex === 0} onClick={() => show(firstIndex - visibleCount)}><ChevronLeft aria-hidden="true" /></button>
            <button type="button" className="services-arrow" aria-label="Next services" aria-controls="services-track" disabled={firstIndex >= lastIndex} onClick={() => show(firstIndex + visibleCount)}><ChevronRight aria-hidden="true" /></button>
          </div>
        </div>
        <div ref={trackRef} id="services-track" className="services-grid-container" role="region" aria-label="Six control panel services" aria-roledescription="carousel" tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault();
              show(firstIndex + (event.key === 'ArrowRight' ? visibleCount : -visibleCount));
            }
          }}>
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Link key={service.slug} to={`/services/${service.slug}/`} className="service-card" style={{ '--service-color': service.color }}>
                <span className="service-card-number" aria-hidden="true">0{index + 1}</span>
                <div className="service-icon-wrapper"><Icon className="service-icon" aria-hidden="true" /></div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-features">{service.features.map((feature) => <span key={feature} className="feature-tag">{feature}</span>)}</div>
                <span className="service-cta">Explore {service.title}<ArrowRight className="cta-icon" aria-hidden="true" /></span>
              </Link>
            );
          })}
        </div>
        <div className="services-carousel-footer">
          <p className="services-status" aria-live="polite" aria-atomic="true">Services {firstIndex + 1}–{Math.min(firstIndex + visibleCount, services.length)} of {services.length}</p>
          <div className="services-pagination" aria-label="Service pages">
            {Array.from({ length: pages }, (_, page) => (
              <button type="button" key={page} aria-label={`Show services ${page * visibleCount + 1} to ${Math.min((page + 1) * visibleCount, services.length)}`}
                aria-current={Math.min(pages - 1, Math.round(firstIndex / visibleCount)) === page ? 'true' : undefined}
                onClick={() => show(page * visibleCount)}><span /></button>
            ))}
          </div>
        </div>
        <div className="info-cards">
          <div className="info-card"><MapPin className="info-icon" aria-hidden="true" /><div className="info-content"><h3>Dubai & UAE Projects</h3><p>Panel engineering and automation support tailored to industrial and building-services applications across the UAE.</p></div></div>
          <div className="info-card"><Shield className="info-icon" aria-hidden="true" /><div className="info-content"><h3>Documented Engineering</h3><p>Component selection, drawings and functional checks follow the agreed project scope and technical requirements.</p></div></div>
        </div>
      </div>
    </section>
  );
}
