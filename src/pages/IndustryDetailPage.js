import React, { useEffect } from 'react';
import { ArrowRight, Check, ChevronRight, Gauge, Settings, ShieldCheck } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { services } from '../components/ServicesSection';
import './IndustryDetailPage.css';

const industryData = {
  'commercial-buildings': {
    title: 'Commercial Buildings', eyebrow: 'Commercial building automation', image: '/Bms.jpeg',
    seoTitle: 'Commercial Building Automation Dubai, UAE | Voltronix',
    description: 'BMS, HVAC controls and control-panel solutions for offices, malls, warehouses and commercial buildings in Dubai and across the UAE.',
    heading: 'Building automation for efficient commercial properties in Dubai and the UAE.',
    intro: 'Voltronix Automation delivers BMS and control-panel solutions that help commercial property teams monitor and control HVAC equipment, pumps, fans and essential building services.',
    applications: ['Office buildings', 'Shopping centres', 'Warehouses', 'Business parks', 'Mixed-use properties', 'Educational facilities'],
    priorities: ['Clear plant-room monitoring', 'HVAC and pump control', 'Alarm and equipment-status visibility'],
    related: ['bms-control-panels', 'vfd-control-panels', 'other-control-panels']
  },
  'residential-villas': {
    title: 'Residential & Villas', eyebrow: 'Residential automation', image: '/Others.jpeg',
    seoTitle: 'Villa & Residential Automation Dubai, UAE | Voltronix',
    description: 'Control panels, pump automation and building-control solutions for villas and residential properties in Dubai and the UAE.',
    heading: 'Dependable automation for villas and residential developments.',
    intro: 'We develop practical control solutions for residential HVAC, water systems, pumps, ventilation and other building services, with straightforward operation and maintainable panel layouts.',
    applications: ['Private villas', 'Residential buildings', 'Residential communities', 'Apartment developments', 'Clubhouses', 'Utility rooms'],
    priorities: ['Reliable pump operation', 'Simple local controls', 'Maintainable electrical panels'],
    related: ['bms-control-panels', 'vfd-control-panels', 'other-control-panels']
  },
  'industrial-facilities': {
    title: 'Industrial Facilities', eyebrow: 'Industrial automation', image: '/automation-control-room.png',
    seoTitle: 'Industrial Automation Company Dubai, UAE | Voltronix',
    description: 'PLC, VFD, MCC and industrial control-panel engineering for factories, process facilities and industrial operations across Dubai and the UAE.',
    heading: 'Industrial automation engineered for visibility, control and uptime.',
    intro: 'Voltronix supports industrial operations with PLC panels, motor-control systems, VFD panels and tailored automation developed around the process, equipment and site requirements.',
    applications: ['Manufacturing plants', 'Process facilities', 'Production lines', 'Water systems', 'Material handling', 'Industrial utilities'],
    priorities: ['Process and machine control', 'Motor coordination and protection', 'Fault monitoring and operator visibility'],
    related: ['plc-panels', 'mcc-assemblies', 'vfd-control-panels']
  },
  'oil-gas': {
    title: 'Oil & Gas', eyebrow: 'Process control applications', image: '/Safety.jpeg',
    seoTitle: 'Oil & Gas Control Panels Dubai, UAE | Voltronix',
    description: 'Custom control panels, safety and ESD panels, PLC systems and motor controls for oil and gas support applications in the UAE.',
    heading: 'Control-panel solutions for demanding oil and gas applications.',
    intro: 'We engineer control, motor and shutdown panels for documented oil and gas project requirements, with an emphasis on clear logic, dependable components and structured verification.',
    applications: ['Process skids', 'Pump packages', 'Utility systems', 'Motor-driven equipment', 'Remote equipment panels', 'Shutdown applications'],
    priorities: ['Defined shutdown logic', 'Clear fault indication', 'Project-specific control integration'],
    related: ['safety-esd-panel', 'plc-panels', 'mcc-assemblies']
  },
  healthcare: {
    title: 'Healthcare', eyebrow: 'Healthcare building controls', image: '/Plc.jpeg',
    seoTitle: 'Healthcare BMS & Control Panels Dubai, UAE | Voltronix',
    description: 'BMS, HVAC, pump and equipment control-panel solutions for hospitals, clinics and healthcare buildings in Dubai and the UAE.',
    heading: 'Clear, dependable building controls for healthcare environments.',
    intro: 'Voltronix provides BMS and control-panel engineering for healthcare building services, supporting HVAC equipment, pumps, ventilation and equipment-status monitoring.',
    applications: ['Hospitals', 'Medical centres', 'Clinics', 'Laboratories', 'Pharmacies', 'Healthcare support buildings'],
    priorities: ['Equipment-status visibility', 'HVAC and ventilation control', 'Clear alarms and maintainable panels'],
    related: ['bms-control-panels', 'vfd-control-panels', 'plc-panels']
  },
  'retail-hospitality': {
    title: 'Retail & Hospitality', eyebrow: 'Guest and retail environments', image: '/Vfd.jpeg',
    seoTitle: 'Hotel & Retail Building Automation Dubai | Voltronix',
    description: 'BMS, HVAC controls and custom control panels for hotels, restaurants, retail stores and hospitality properties across the UAE.',
    heading: 'Efficient building controls for retail and hospitality properties.',
    intro: 'We deliver automation and control panels for HVAC, pumps, ventilation and building services in customer-facing properties where comfort, visibility and maintainability matter.',
    applications: ['Hotels', 'Restaurants', 'Retail stores', 'Shopping destinations', 'Leisure venues', 'Hospitality facilities'],
    priorities: ['Comfort-system control', 'Plant and equipment monitoring', 'Responsive maintenance support'],
    related: ['bms-control-panels', 'vfd-control-panels', 'other-control-panels']
  }
};

export default function IndustryDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const industry = industryData[slug] || industryData['industrial-facilities'];

  useEffect(() => {
    document.title = industry.seoTitle;
    const setMeta = (selector, attributes, content) => {
      let element = document.querySelector(selector);
      if (!element) { element = document.createElement('meta'); Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value)); document.head.appendChild(element); }
      element.setAttribute('content', content);
    };
    const pageUrl = `https://voltronixautomation.ae/industries/${slug}`;
    setMeta('meta[name="description"]', { name: 'description' }, industry.description);
    setMeta('meta[property="og:title"]', { property: 'og:title' }, industry.seoTitle);
    setMeta('meta[property="og:description"]', { property: 'og:description' }, industry.description);
    setMeta('meta[property="og:url"]', { property: 'og:url' }, pageUrl);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl);

    const schema = document.createElement('script');
    schema.id = 'industry-structured-data'; schema.type = 'application/ld+json';
    schema.text = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Service', name: `${industry.title} Automation Solutions`, serviceType: industry.title, provider: { '@type': 'Organization', name: 'Voltronix Automation', url: 'https://voltronixautomation.ae/' }, areaServed: { '@type': 'Country', name: 'United Arab Emirates' }, description: industry.description, url: pageUrl },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://voltronixautomation.ae/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://voltronixautomation.ae/#industries' }, { '@type': 'ListItem', position: 3, name: industry.title, item: pageUrl }] }
    ] });
    document.getElementById(schema.id)?.remove(); document.head.appendChild(schema);
    return () => schema.remove();
  }, [industry, slug]);

  const goContact = () => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 80); };
  const relatedServices = services.filter(service => industry.related.includes(service.slug));

  return <main className="industry-page">
    <section className="industry-hero"><div className="industry-hero-image"><img src={industry.image} alt={`${industry.title} automation and control-panel solutions in the UAE`}/></div><div className="container industry-hero-content"><div className="industry-breadcrumbs"><Link to="/">Home</Link><ChevronRight/><Link to="/#industries">Industries</Link><ChevronRight/><span>{industry.title}</span></div><span className="eyebrow">{industry.eyebrow}</span><h1>{industry.heading}</h1><p>{industry.intro}</p><button className="btn-primary" onClick={goContact}>Discuss your project <ArrowRight size={17}/></button></div></section>
    <section className="industry-overview"><div className="container industry-overview-grid"><div><span className="eyebrow">Automation for {industry.title}</span><h2>Control solutions shaped around the facility and its operation.</h2><p>{industry.intro}</p></div><div className="industry-priorities">{industry.priorities.map((priority, index) => <div key={priority}>{index === 0 ? <Settings/> : index === 1 ? <Gauge/> : <ShieldCheck/>}<span>{priority}</span></div>)}</div></div></section>
    <section className="industry-applications"><div className="container"><span className="eyebrow">Typical applications</span><h2 className="section-heading">Where our solutions <span>fit</span></h2><div className="application-grid">{industry.applications.map(item => <div key={item}><Check/><span>{item}</span></div>)}</div></div></section>
    <section className="industry-related"><div className="container"><span className="eyebrow">Relevant services</span><h2 className="section-heading">Automation capabilities for <span>{industry.title}</span></h2><div className="industry-service-grid">{relatedServices.map(({ slug: serviceSlug, icon: Icon, title, description }) => <Link to={`/services/${serviceSlug}`} key={serviceSlug}><Icon/><div><h3>{title}</h3><p>{description}</p></div><ArrowRight/></Link>)}</div></div></section>
    <section className="industry-cta"><div className="container"><div><span>Planning a project in the UAE?</span><h2>Talk to Voltronix about your {industry.title.toLowerCase()} automation requirements.</h2></div><button className="btn-primary" onClick={goContact}>Request a consultation <ArrowRight/></button></div></section>
  </main>;
}
