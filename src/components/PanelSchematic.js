import React from 'react';

// Decorative equipment details. These graphics contain no live values or claims.
export default function PanelSchematic({ type }) {
  return <div className={`panel-schematic schematic-${type}`} aria-hidden="true">
    <svg viewBox="0 0 280 82" fill="none" focusable="false">
      {type === 'plc' ? <>
        <path className="schematic-rail" d="M16 28H264M42 48V68H236V48M140 48V68" />
        {[24, 112, 200].map((x) => <g key={x}>
          <rect className="schematic-module" x={x} y="8" width="56" height="44" rx="4" />
          <circle className="schematic-led" cx={x + 11} cy="19" r="2.5" />
          <path className="schematic-slot" d={`M${x + 22} 18h23M${x + 10} 31h35M${x + 10} 38h35`} />
        </g>)}
        <g className="schematic-packet"><circle cx="42" cy="68" r="3" /></g>
      </> : <>
        <path className="schematic-rail" d="M12 18H268M12 38H268M12 58H268M40 8V68M100 8V68M160 8V68M220 8V68" />
        <path className="schematic-wave" d="M12 53H40L56 34H87L102 43H129L147 19H180L197 33H222L239 24H268" />
        <path className="schematic-slot" d="M12 74H268" />
        <g className="schematic-packet"><circle cx="42" cy="74" r="3" /></g>
      </>}
    </svg>
  </div>;
}
