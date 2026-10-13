import React from 'react';
import { ArrowRight, Building2, CircuitBoard, Gauge, ShieldCheck, SlidersHorizontal, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ServicesSection.css';

export const services = [
  { slug: 'plc-panels', icon: CircuitBoard, image: '/Plc.jpeg', imageAlt: 'PLC control panel assembled by Voltronix Automation', title: 'PLC Panels', description: 'Custom PLC panels for machine control, process automation and HMI integration.' },
  { slug: 'vfd-control-panels', icon: Gauge, image: '/Vfd.jpeg', imageAlt: 'VFD control panel for industrial motor-speed control', title: 'VFD Control Panels', description: 'Motor-speed control panels engineered for efficient and reliable operation.' },
  { slug: 'mcc-assemblies', icon: SlidersHorizontal, image: '/Mcc.jpeg', imageAlt: 'Industrial motor control centre assembly', title: 'MCC Assemblies', description: 'Motor control centres for safe, structured control of multiple motor loads.' },
  { slug: 'bms-control-panels', icon: Building2, image: '/Bms.jpeg', imageAlt: 'BMS control panel for building services', title: 'BMS Control Panels', description: 'Monitoring and control panels for HVAC and essential building services.' },
  { slug: 'safety-esd-panel', icon: ShieldCheck, image: '/Safety.jpeg', imageAlt: 'Safety and emergency shutdown control panel', title: 'Safety & ESD Panels', description: 'Purpose-built emergency shutdown and safety-control panel solutions.' },
  { slug: 'other-control-panels', icon: Wrench, image: '/Others.jpeg', imageAlt: 'Custom-built industrial control panel', title: 'Custom Control Panels', description: 'Tailored design, fabrication, testing and site support for special requirements.' }
];

export default function ServicesSection() {
  return (
    <section id="services" className="services-section">
      <div className="container services-layout">
        <div className="services-intro">
          <span className="eyebrow">Our services</span>
          <h2 className="section-heading">Integrated Automation <span>Solutions</span></h2>
          <p className="section-copy">From industrial facilities to commercial buildings, we deliver practical automation systems that improve visibility, safety and control.</p>
          <a href="#contact" className="services-enquire">Discuss your requirement <ArrowRight size={16}/></a>
        </div>
        <div className="services-grid">
          {services.map(({ slug, image, imageAlt, title, description }) => (
            <Link className="service-card" key={slug} to={`/services/${slug}`}>
              <div className="service-card-image">
                <img src={image} alt={imageAlt} loading="lazy" />
              </div>
              <div className="service-card-body">
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="service-arrow" aria-hidden="true"><ArrowRight /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
