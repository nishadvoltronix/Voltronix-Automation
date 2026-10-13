import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './ProjectsSection.css';

const projects = [
  ['/Plc.jpeg', 'PLC control panel', 'PLC Panels'], ['/Vfd.jpeg', 'VFD control panel', 'VFD Panels'],
  ['/Mcc.jpeg', 'Motor control centre', 'MCC Assemblies'], ['/Bms.jpeg', 'Building management system panel', 'BMS Panels']
];
export default function ProjectsSection() {
  return (
    <section id="projects" className="projects-section"><div className="container">
      <div className="section-heading-row"><div><span className="eyebrow">Selected work</span><h2 className="section-heading">Engineering in <span>Action</span></h2><p className="section-copy">A selection of control panels designed and assembled for industrial and building-services applications.</p></div><a href="#contact" className="projects-link">Plan your project <ArrowUpRight size={16}/></a></div>
      <div className="projects-grid">{projects.map(([image, alt, title]) => <article className="project-card" key={title}><div className="project-image"><img src={image} alt={alt} loading="lazy"/></div><div className="project-meta"><span>Voltronix project work</span><h3>{title}</h3></div></article>)}</div>
    </div></section>
  );
}
