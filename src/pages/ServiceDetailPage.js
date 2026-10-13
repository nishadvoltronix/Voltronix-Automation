import React, { useEffect } from 'react';
import { ArrowRight, Check, ChevronRight, ClipboardCheck, DraftingCompass, Factory } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { services as serviceList } from '../components/ServicesSection';
import './ServiceDetailPage.css';

const serviceData = {
  'plc-panels': { title: 'PLC Panels', eyebrow: 'Programmable control systems', heading: 'Reliable PLC control panels, engineered around your process.', image: '/Plc.jpeg', intro: 'Voltronix Automation designs and assembles PLC panels for machine control, HVAC systems, pumps and industrial processes. Each solution is structured for clear operation, practical maintenance and dependable site integration.', bullets: ['PLC programming', 'HMI integration', 'Communications and I/O', 'Alarm, fault and equipment-status monitoring', 'Automatic and manual operating modes', 'On-site testing support'] },
  'vfd-control-panels': { title: 'VFD Control Panels', eyebrow: 'Motor speed and energy control', heading: 'Purpose-built VFD panels for controlled, efficient motor operation.', image: '/Vfd.jpeg', intro: 'Our VFD control panels support smooth motor acceleration, controlled speed and dependable protection for pumps, fans, compressors, conveyors and HVAC applications.', bullets: ['VFD configuration', 'Motor protection and fault indication', 'Ramp and process control', 'Safety interlocks', 'Manual and automatic modes', 'Testing and commissioning'] },
  'mcc-assemblies': { title: 'MCC Assemblies', eyebrow: 'Structured motor control', heading: 'Safe, scalable motor-control assemblies for demanding applications.', image: '/Mcc.jpeg', intro: 'Voltronix MCC assemblies provide structured control and protection for multiple motors, with layouts developed for clear operation, maintainability and site requirements.', bullets: ['DOL and star-delta starters', 'Soft starter and VFD feeders', 'Motor protection', 'Clear labeling and termination', 'Functional verification', 'Site-support options'] },
  'bms-control-panels': { title: 'BMS Control Panels', eyebrow: 'Building automation', heading: 'BMS panels that bring essential building systems under control.', image: '/Bms.jpeg', intro: 'We deliver BMS control panels for monitoring and automating HVAC, pumps, fans, chillers, ventilation and other building services.', bullets: ['HVAC equipment control', 'Alarm and fault monitoring', 'Temperature and pressure-based logic', 'Pump and fan control', 'Energy-monitoring functions', 'System integration support'] },
  'safety-esd-panel': { title: 'Safety & ESD Panels', eyebrow: 'Critical process protection', heading: 'Dependable shutdown control for critical equipment and processes.', image: '/Safety.jpeg', intro: 'Safety and emergency shutdown panels are developed for clear, immediate process isolation and controlled restart after fault clearance.', bullets: ['Safety interlocks', 'Emergency shutdown logic', 'Motor, pump and valve shutdown', 'Manual reset control', 'Fault indication', 'Functional testing'] },
  'other-control-panels': { title: 'Custom Control Panels', eyebrow: 'Tailored panel engineering', heading: 'Custom control panels for requirements that do not fit a standard template.', image: '/Others.jpeg', intro: 'For specialist applications, Voltronix develops tailored control-panel solutions from concept and layout through assembly, verification and site support.', bullets: ['Custom panel design', 'Component selection', 'Panel fabrication', 'Wiring and labeling', 'Functional testing', 'Installation and site support'] }
};

const serviceSeo = {
  'plc-panels': {
    title: 'PLC Panel Manufacturer Dubai, UAE | Voltronix Automation',
    description: 'Custom PLC control-panel design, programming, HMI integration, assembly and commissioning support for industrial projects in Dubai and across the UAE.',
    heading: 'PLC panel engineering for industrial automation in Dubai and the UAE',
    body: 'Our PLC panel work brings controller hardware, field I/O, communications, HMI interfaces and operating logic into one maintainable control solution. Panels are developed around the equipment, sequence and site-integration requirements.',
    applications: ['Machine automation', 'Pump control', 'HVAC equipment', 'Process systems', 'Conveyor control', 'Remote monitoring']
  },
  'vfd-control-panels': {
    title: 'VFD Control Panel Manufacturer Dubai, UAE | Voltronix',
    description: 'VFD control panels for pumps, fans, compressors, conveyors and HVAC systems, designed and assembled by Voltronix Automation in Dubai, UAE.',
    heading: 'VFD control panels for efficient motor operation across the UAE',
    body: 'Voltronix VFD panels combine motor-speed control, protection, interlocks and clear local operation. Each panel is configured around the motor load and application so commissioning and ongoing maintenance remain straightforward.',
    applications: ['Pumps', 'Supply and extract fans', 'Air-handling units', 'Compressors', 'Conveyors', 'Process motors']
  },
  'mcc-assemblies': {
    title: 'MCC Panel Manufacturer Dubai, UAE | Voltronix Automation',
    description: 'Motor Control Centre and MCC panel assemblies with DOL, star-delta, soft-starter and VFD feeders for industrial and building projects in the UAE.',
    heading: 'MCC panel assemblies for structured motor control in Dubai and the UAE',
    body: 'Our MCC assemblies organise multiple motor feeders into a clear, serviceable system with the required starters, protection and control interfaces. Layouts support practical operation, identification and site maintenance.',
    applications: ['HVAC plants', 'Pump rooms', 'Factories', 'Water systems', 'Material handling', 'Industrial utilities']
  },
  'bms-control-panels': {
    title: 'BMS Control Panel Company Dubai, UAE | Voltronix',
    description: 'BMS and HVAC control panels for commercial buildings, villas, hotels, healthcare and industrial facilities in Dubai and across the UAE.',
    heading: 'BMS control panels for connected building services across the UAE',
    body: 'Voltronix BMS panels support the monitoring and control of HVAC equipment, pumps, fans, chillers and ventilation systems. Solutions are structured around the building-services sequence and integration requirements.',
    applications: ['Commercial buildings', 'Residential properties', 'Hotels', 'Healthcare buildings', 'Warehouses', 'Industrial facilities']
  },
  'safety-esd-panel': {
    title: 'Safety & ESD Panel Manufacturer Dubai, UAE | Voltronix',
    description: 'Custom safety and emergency shutdown panels for defined industrial process, pump, valve and equipment-isolation requirements in the UAE.',
    heading: 'Safety and ESD control panels for defined shutdown applications',
    body: 'Safety and ESD panels are engineered against the documented project logic to support equipment isolation, fault indication, manual reset and controlled restart. Verification is planned around the agreed functional requirements.',
    applications: ['Emergency shutdown', 'Pump isolation', 'Valve shutdown', 'Motor shutdown', 'Process skids', 'Equipment interlocks']
  },
  'other-control-panels': {
    title: 'Custom Control Panel Manufacturer Dubai, UAE | Voltronix',
    description: 'Custom electrical and automation control panels designed, assembled, wired and tested for specialist applications in Dubai and across the UAE.',
    heading: 'Custom control-panel engineering for specialist UAE projects',
    body: 'When a standard panel does not suit the application, Voltronix develops a tailored solution covering layout, component selection, wiring, labeling, functional checks and site-support requirements.',
    applications: ['Pump panels', 'Equipment panels', 'Automation skids', 'Local control stations', 'Retrofit panels', 'Special-purpose controls']
  }
};

export default function ServiceDetailPage() {
  const { slug } = useParams(); const navigate = useNavigate();
  const canonicalSlug = serviceData[slug] ? slug : 'other-control-panels';
  const service = serviceData[canonicalSlug];
  const seo = serviceSeo[canonicalSlug];
  useEffect(() => {
    document.title = seo.title;
    const description = seo.description;
    const setMeta = (selector, attr, value) => { let el = document.querySelector(selector); if (!el) { el = document.createElement('meta'); Object.entries(attr).forEach(([key,val]) => el.setAttribute(key,val)); document.head.appendChild(el); } el.setAttribute('content', value); };
    setMeta('meta[name="description"]', { name: 'description' }, description);
    setMeta('meta[property="og:title"]', { property: 'og:title' }, document.title);
    setMeta('meta[property="og:description"]', { property: 'og:description' }, description);
    const pageUrl = `https://voltronixautomation.ae/services/${canonicalSlug}`;
    const imageUrl = `https://voltronixautomation.ae${service.image}`;
    setMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
    setMeta('meta[property="og:url"]', { property: 'og:url' }, pageUrl);
    setMeta('meta[property="og:image"]', { property: 'og:image' }, imageUrl);
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, `${service.title} by Voltronix Automation`);
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, seo.title);
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);
    const schema = document.createElement('script');
    schema.id = 'service-structured-data'; schema.type = 'application/ld+json';
    schema.text = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Service', name: service.title, serviceType: service.title, description, url: pageUrl, image: imageUrl, provider: { '@type': 'Organization', name: 'Voltronix Automation', url: 'https://voltronixautomation.ae/' }, areaServed: [{ '@type': 'City', name: 'Dubai' }, { '@type': 'Country', name: 'United Arab Emirates' }] },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voltronixautomation.ae/' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://voltronixautomation.ae/#services' }, { '@type': 'ListItem', position: 3, name: service.title, item: pageUrl }] }
    ] });
    document.getElementById(schema.id)?.remove(); document.head.appendChild(schema);
    return () => schema.remove();
  }, [canonicalSlug, service, seo]);
  const goContact = () => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 80); };
  if (slug !== canonicalSlug) return <Navigate to={`/services/${canonicalSlug}`} replace />;
  return <main className="service-detail-page">
    <section className="service-hero"><div className="service-hero-image"><img src={service.image} alt={`${service.title} by Voltronix Automation`} decoding="async"/></div><div className="container service-hero-content"><div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight/><Link to="/#services">Services</Link><ChevronRight/><span>{service.title}</span></div><span className="eyebrow">{service.eyebrow}</span><h1>{service.heading}</h1><p>{service.intro}</p><div className="service-actions"><button className="btn-primary" onClick={goContact}>Start a project <ArrowRight size={17}/></button><Link className="btn-secondary" to="/#services">Explore all services</Link></div></div></section>
    <section className="service-overview"><div className="container overview-grid"><div><span className="eyebrow">Service overview</span><h2>Engineered for clear operation and dependable handover.</h2><p>{service.intro}</p></div><div className="capability-card"><h3>Core capabilities</h3><ul>{service.bullets.map(item => <li key={item}><Check/>{item}</li>)}</ul></div></div></section>
    <section className="service-location-section"><div className="container service-location-grid"><div><span className="eyebrow">Dubai & UAE service</span><h2>{seo.heading}</h2><p>{seo.body}</p></div><div className="service-applications"><h3>Typical applications</h3><div>{seo.applications.map(item => <span key={item}><Check/>{item}</span>)}</div></div></div></section>
    <section className="delivery-section"><div className="container"><div className="section-heading-row"><div><span className="eyebrow">How we deliver</span><h2 className="section-heading">From design to <span>site support</span></h2></div></div><div className="delivery-grid"><div><DraftingCompass/><h3>Design & engineering</h3><p>Panel layouts, component selection and control design aligned to the project requirements.</p></div><div><Factory/><h3>Assembly & wiring</h3><p>Structured fabrication, cable routing, labeling and assembly quality checks.</p></div><div><ClipboardCheck/><h3>Testing & commissioning</h3><p>Functional verification, commissioning support and practical project handover.</p></div></div></div></section>
    <section className="related-services"><div className="container"><span className="eyebrow">Related services</span><h2>Explore more automation capabilities</h2><div className="related-grid">{serviceList.filter(item => item.slug !== slug).slice(0,3).map(item => <Link to={`/services/${item.slug}`} key={item.slug}><item.icon/><span>{item.title}</span><ArrowRight/></Link>)}</div></div></section>
    <section className="service-cta-band"><div className="container"><div><span>Have a control-panel requirement?</span><h2>Let’s discuss the right solution for your project.</h2></div><button className="btn-primary" onClick={goContact}>Request a quote <ArrowRight/></button></div></section>
  </main>;
}
