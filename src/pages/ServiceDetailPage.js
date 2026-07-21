import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceDetailPage.css';

const SERVICE_BY_SLUG = {
  'plc-panels': {
    title: 'PLC Panels',
    heading: 'Custom-built PLC control panels for reliable industrial automation.',
    bullets: ['PLC Programming', 'HMI Integration', 'Comms & IO','Alarm, fault and equipment-status monitoring','VFD and soft-starter communication and control','Suitable for pumps, HVAC, machinery and process systems','Automatic and manual operating modes', 'On-site Testing Support'],
    accent: '#00d4ff',
  },
  'vfd-control-panels': {
    title: 'VFD Control Panels',
    heading: 'VFD panels designed for motor speed control and energy efficiency.',
    bullets: ['VFD Configuration', 'Motor Protection', 'Ramp & Control','Motor protection, fault indication and safety interlocks','Energy-efficient operation with smooth acceleration and deceleration','Suitable for pumps, fans, compressors, conveyors and HVAC systems', 'Commissioning'],
    accent: '#ff6b35',
  },
  'mcc-assemblies': {
    title: 'MCC Assemblies',
    heading: 'Motor Control Centre (MCC) assemblies for safe and scalable motor management.',
    bullets: ['Safe Motor Control','Starter Options', 'Protection Relays', 'Build Quality Assurance','Supports DOL, star-delta, soft starter and VFD motor feeders','Suitable for pumps, fans, compressors, conveyors and industrial machinery'],
    accent: '#ff4d6d',
  },
  'bms-control-panels': {
    title: 'BMS Control Panels',
    heading: 'Building Management System (BMS) panels for monitoring and automation.',
    bullets: ['Building Services', 'Monitoring & Control', 'Integration', 'Automatic control based on temperature, pressure and equipment status','Alarm, fault, operating-status and energy-monitoring functions','Suitable for AHUs, FCUs, pumps, fans, chillers and ventilation systems'],
    accent: '#ffaa00',
  },
  'safety-esd-panel': {
    title: 'Safety & ESD Panel',
    heading: 'Safety and ESD control panels engineered for dependable protection.',
    bullets: ['Safety Interlocks', 'ESD Logic', 'Emergency Shutdown panels for safe and immediate process isolation', 'Designed to stop critical equipment during emergency conditions','Manual reset and controlled restart after fault clearance','Control of motors, valves, pumps and process equipment shutdown'],
    accent: '#ff4d6d',
  },
  'other-control-panels': {
    title: 'Other Control Panels',
    heading: 'Tailored control panel engineering for special requirements and custom builds.',
    bullets: ['Custom Design', 'Panel Build', 'Testing', 'Site Support'],
    accent: '#7c5cff',
  },
};

const SERVICE_IMAGE_BY_SLUG = {
  'plc-panels': '/Plc.jpeg',
  'vfd-control-panels': '/Vfd.jpeg',
  'mcc-assemblies': '/Mcc.jpeg',
  'bms-control-panels': '/Bms.jpeg',
  'safety-esd-panel': '/Safety.jpeg',
  'other-control-panels': '/Others.jpeg',
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = SERVICE_BY_SLUG[slug] || {
    title: 'Service',
    heading: 'Industrial control panel engineering.',
    bullets: ['Custom design', 'Panel build', 'Testing', 'Site support'],
    accent: '#00d4ff',
  };

  useEffect(() => {
    const suffix = ' suppliers in dubai';

    const nextTitle = `${service.title}${suffix}`;

    document.title = nextTitle;

    const description =
      service.heading ||
      `Voltronix Automation delivers industrial control panel engineering in Dubai.`;

    // description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // OG title/description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', nextTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);
  }, [service.title, service.heading]);

  return (
    <div className="service-detail-page">
      <div className="service-detail-hero" style={{ ['--service-accent']: service.accent }}>
        <div className="service-detail-container">

          <h1 className="service-detail-title">{service.title}</h1>
          <p className="service-detail-subtitle">{service.heading}</p>

          <div className="service-detail-hero-actions">
            <button
              type="button"
              className="service-primary-btn"
              onClick={() => {
                navigate('/');
                const scrollToId = (id, attempts = 12) => {
                  const el = document.getElementById(id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                  }
                  if (attempts <= 0) return;
                  setTimeout(() => scrollToId(id, attempts - 1), 50);
                };

                scrollToId('contact');
              }}
            >
              Start a Project
            </button>

            <button
              type="button"
              className="service-secondary-btn"
              onClick={() => {
                navigate('/');
                const scrollToId = (id, attempts = 12) => {
                  const el = document.getElementById(id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                  }
                  if (attempts <= 0) return;
                  setTimeout(() => scrollToId(id, attempts - 1), 50);
                };

                scrollToId('services');
              }}
            >
              Explore More
            </button>
          </div>
        </div>
      </div>

      <div className="service-detail-section">
        <div className="service-detail-container service-detail-grid">
          <div className="service-detail-image-card">
            <div className="service-detail-image-placeholder">
              <img
                className="service-detail-image"
                src={SERVICE_IMAGE_BY_SLUG[slug]}
                alt={`${service.title} image`}
              />
            </div>
          </div>

          <div className="service-detail-content-card">
            <h2 className="service-detail-content-title">Overview</h2>
            <p className="service-detail-paragraph">
              Voltronix Automation delivers industrial control panels designed for dependable uptime, clean wiring practices,
              and commission-ready documentation.
            </p>

            <h3 className="service-detail-list-title">What you get</h3>
            <ul className="service-detail-bullets">
              {service.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            
          </div>
        </div>
      </div>

      <div className="service-detail-section service-detail-bottom">
        <div className="service-detail-container">
          <div className="service-detail-bottom-cards">
            <div className="service-small-card">
              <h4>Design &amp; Engineering</h4>
              <p> IEC-aligned drawings, BOM review, and panel layout optimization.</p>
            </div>
            <div className="service-small-card">
              <h4>Manufacturing</h4>
              <p> fabrication, cable routing, labeling, and final assembly quality checks.</p>
            </div>
            <div className="service-small-card">
              <h4>Testing &amp; Commissioning</h4>
              <p> functional tests, FAT-style verification, and site commissioning support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
