import React from 'react';
import { CheckCircle2, Headphones, MapPin, ShieldCheck, Users, Wrench } from 'lucide-react';
import './WhyUsSection.css';

const strengths = [
  [Users, 'Practical engineering', 'Solutions shaped around the operating and technical needs of each project.'],
  [ShieldCheck, 'Quality-led build', 'Clear wiring practices, dependable components and disciplined verification.'],
  [Wrench, 'End-to-end delivery', 'Design, programming, manufacturing, installation, testing and commissioning.'],
  [MapPin, 'Local UAE support', 'Dubai-based coordination and responsive support across the UAE.'],
  [CheckCircle2, 'Clear handover', 'Structured testing and documentation prepared for practical site use.'],
  [Headphones, 'Ongoing support', 'Troubleshooting, maintenance and system-upgrade support when required.']
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="whyus-section"><div className="container whyus-layout">
      <div className="whyus-copy"><span className="eyebrow">Why Voltronix</span><h2>Built on quality.<br/>Driven by <span>your operation.</span></h2><p>We combine control-panel expertise, automation know-how and local project support to deliver systems designed for dependable real-world performance.</p><a className="btn-primary" href="#contact">Get in touch</a></div>
      <div className="whyus-grid">{strengths.map(([Icon, title, text]) => <div className="whyus-item" key={title}><Icon/><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
    </div></section>
  );
}
