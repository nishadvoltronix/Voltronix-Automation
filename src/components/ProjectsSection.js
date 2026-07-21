import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink,
  Github,
  Activity,
  Cpu,
  Factory,
  Zap,
  TrendingUp,
  Shield,
  Wifi,
  Database,
  ChevronRight,
  ChevronLeft,
  Maximize2
} from 'lucide-react';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'Dubai Industrial City',
      subtitle: '12-Panel MCC for HVAC Plant',
      description:
        'Fabricated and commissioned a motor control centre (MCC) package for HVAC distribution — DOL, star-delta, and VFD starters with protection and interlocks tuned for stable airflow control.',
      image: 'mcc-hvac-dubai',
      icon: Cpu,
      color: '#00d4ff',
      tags: ['MCC Panels', 'VFD Starters', 'Protection Relays', 'UAE IEC/DEWA'],
      stats: [
        { label: 'Panels', value: '12' },
        { label: 'Commissioning', value: '10 days' },
        { label: 'Stability', value: '99.5%' }
      ],
      features: [
        'Integrated motor protection & fault handling',
        'VFD/Starter logic with safe interlocks',
        'Tested wiring & labeling for site acceptance',
        'Ready-to-operate commissioning documentation'
      ]
    },
    {
      id: 2,
      title: 'Jebel Ali Free Zone',
      subtitle: 'PLC + VFD Package for Conveyors',
      description:
        'Delivered a PLC-based control package to coordinate conveyor motor sequences, speed ramps, and fault diagnostics — supporting efficient production flow and simplified maintenance.',
      image: 'plc-vfd-jafza',
      icon: Factory,
      color: '#ff6b35',
      tags: ['PLC Panels', 'VFD Control', 'Siemens / Schneider', 'Industrial Ethernet'],
      stats: [
        { label: 'Lines', value: '4' },
        { label: 'I/O', value: '280' },
        { label: 'Uptime', value: '99.7%' }
      ],
      features: [
        'HMI-ready tag structure and communication mapping',
        'Speed ramp profiles for reduced mechanical stress',
        'Event/alarm handling for fast troubleshooting',
        'On-site commissioning & tuning support'
      ]
    },
    {
      id: 3,
      title: 'Abu Dhabi Industrial Zone',
      subtitle: 'BMS Control Panels for Chilled Water',
      description:
        'Designed and assembled BMS control panels for chilled-water infrastructure — enabling monitoring and control of pumps, valves, and HVAC equipment with DEWA-aligned engineering practices.',
      image: 'bms-abu-dhabi',
      icon: Shield,
      color: '#00ff88',
      tags: ['BMS Panels', 'Pump Control', 'HVAC Integration', 'DEWA-ready'],
      stats: [
        { label: 'Systems', value: '6' },
        { label: 'Devices', value: '180+' },
        { label: 'Response', value: '<2s' }
      ],
      features: [
        'Structured control loops for stable temperature control',
        'Pump scheduling & protection logic',
        'Clear terminals and maintainable panel layout',
        'Factory test & final site handover'
      ]
    }
  ];

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[activeProject];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-bg">
        <div className="projects-grid"></div>
        <div className="projects-orb orb-1"></div>
        <div className="projects-orb orb-2"></div>
      </div>

      <div className="projects-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <Database className="badge-icon" />
            <span>Portfolio</span>
          </div>
          <h2 className="section-title">
            Real UAE <span className="gradient-text">Project Delivery</span>
          </h2>
          <p className="section-subtitle">
            Fabricated but believable control panel packages — engineered to IEC standards and ready for commissioning.
          </p>
        </motion.div>

        {/* Project Showcase */}
        <div className="project-showcase">
          {/* Project Navigation */}
          <div className="project-nav">
            <button className="nav-btn prev" onClick={prevProject}>
              <ChevronLeft />
            </button>
            <div className="project-indicators">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${idx === activeProject ? 'active' : ''}`}
                  onClick={() => setActiveProject(idx)}
                />
              ))}
            </div>
            <button className="nav-btn next" onClick={nextProject}>
              <ChevronRight />
            </button>
          </div>

          {/* Project Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              className="project-content"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Project Visual */}
              <div className="project-visual">
                <div 
                  className="visual-frame"
                  style={{ borderColor: `${currentProject.color}40` }}
                >
                  <div 
                    className="visual-glow"
                    style={{ background: currentProject.color }}
                  ></div>
                  
                  {/* Dashboard Preview */}
                  <div className="dashboard-preview">
                    <div className="preview-header">
                      <div className="preview-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span className="preview-title">{currentProject.title}</span>
                    </div>
                    
                    <div className="preview-content">
                      {/* Chart */}
                      <div className="preview-chart">
                        <svg viewBox="0 0 200 60" className="chart-svg">
                          <defs>
                            <linearGradient id={`gradient-${currentProject.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor={currentProject.color} stopOpacity="0.3"/>
                              <stop offset="100%" stopColor={currentProject.color} stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                          <path 
                            d="M 0 40 Q 25 20 50 35 T 100 25 T 150 40 T 200 20" 
                            stroke={currentProject.color} 
                            strokeWidth="2" 
                            fill="none"
                          />
                          <path 
                            d="M 0 40 Q 25 20 50 35 T 100 25 T 150 40 T 200 20 L 200 60 L 0 60 Z" 
                            fill={`url(#gradient-${currentProject.id})`}
                          />
                        </svg>
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="preview-stats">
                        {currentProject.stats.map((stat, idx) => (
                          <div key={idx} className="preview-stat">
                            <span 
                              className="stat-value"
                              style={{ color: currentProject.color }}
                            >
                              {stat.value}
                            </span>
                            <span className="stat-label">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="floating-elements">
                    <div 
                      className="float-card status-card"
                      style={{ borderColor: `${currentProject.color}30` }}
                    >
                      <div 
                        className="status-dot"
                        style={{ background: currentProject.color }}
                      ></div>
                      <span>Live</span>
                    </div>
                    <div 
                      className="float-card metric-card"
                      style={{ borderColor: `${currentProject.color}30` }}
                    >
                      <TrendingUp size={16} style={{ color: currentProject.color }} />
                      <span>+12.5%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="project-info">
                <div className="project-header">
                  <div 
                    className="project-icon-wrapper"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentProject.color}20, ${currentProject.color}10)`,
                      borderColor: `${currentProject.color}40`
                    }}
                  >
                    <currentProject.icon 
                      className="project-icon" 
                      style={{ color: currentProject.color }}
                    />
                  </div>
                  <div className="project-titles">
                    <h3 className="project-title">{currentProject.title}</h3>
                    <span className="project-subtitle">{currentProject.subtitle}</span>
                  </div>
                </div>

                <p className="project-description">{currentProject.description}</p>

                <div className="project-tags">
                  {currentProject.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="project-tag"
                      style={{ 
                        background: `${currentProject.color}15`,
                        color: currentProject.color,
                        borderColor: `${currentProject.color}30`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-features">
                  <h4>Key Features</h4>
                  <ul>
                    {currentProject.features.map((feature, idx) => (
                      <li key={idx}>
                        <Shield size={14} style={{ color: currentProject.color }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project Thumbnails */}
        <motion.div 
          className="project-thumbnails"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {projects.map((project, idx) => (
            <button
              key={project.id}
              className={`thumbnail ${idx === activeProject ? 'active' : ''}`}
              onClick={() => setActiveProject(idx)}
            >
              <div 
                className="thumb-icon"
                style={{ 
                  background: idx === activeProject ? `${project.color}30` : 'transparent',
                  borderColor: idx === activeProject ? project.color : 'transparent'
                }}
              >
                <project.icon 
                  size={24} 
                  style={{ color: idx === activeProject ? project.color : 'var(--text-muted)' }}
                />
              </div>
              <span className="thumb-title">{project.title}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
