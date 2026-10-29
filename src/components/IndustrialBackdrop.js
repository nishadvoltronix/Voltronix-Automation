import React from 'react';
import { Cpu, Settings2, Cog } from 'lucide-react';
import './IndustrialBackdrop.css';

// Fixed, deterministic decoration keeps pre-rendering and hydration identical.
const nodes = [[8,18],[18,72],[31,32],[42,85],[55,15],[67,61],[79,27],[89,82]];
export default function IndustrialBackdrop() {
  return <div className="industrial-backdrop" aria-hidden="true" data-motion-scene="idle">
    <div className="industrial-grid" />
    <div className="industrial-aura aura-one" /><div className="industrial-aura aura-two" />
    <svg className="industrial-circuits" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false">
      <path d="M0 165H120L175 220H340V320H430M1400 150H1240L1190 200H1080V310H980M0 720H150L210 660H350V570H445M1400 740H1260L1205 685H1050V590H970" />
      <path d="M20 395H190L250 455H370M1380 420H1190L1130 480H1025" />
      <g><circle cx="120" cy="165" r="4" /><circle cx="340" cy="320" r="4" /><circle cx="1240" cy="150" r="4" /><circle cx="1080" cy="310" r="4" /><circle cx="150" cy="720" r="4" /><circle cx="1260" cy="740" r="4" /></g>
    </svg>
    <div className="industrial-symbol symbol-cog"><Cog strokeWidth={1} /></div>
    <div className="industrial-symbol symbol-chip"><Cpu strokeWidth={1} /></div>
    <div className="industrial-symbol symbol-control"><Settings2 strokeWidth={1} /></div>
    {nodes.map(([left, top], index) => <i className="industrial-node" key={left} style={{ left: `${left}%`, top: `${top}%`, '--node-delay': `${index * -1.4}s` }} />)}
    <div className="industrial-data data-one"><i /></div><div className="industrial-data data-two"><i /></div>
    <div className="industrial-scan" />
  </div>;
}
