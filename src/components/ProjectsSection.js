import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Factory, TrendingUp, Shield, Database, ChevronRight, ChevronLeft } from 'lucide-react';
import './ProjectsSection.css';
const projects = [{
    id: 1,
    title: 'HVAC Motor Control',
    subtitle: 'Example MCC package for an HVAC plant',
    description: 'An illustrative motor control centre package for HVAC equipment, combining DOL, star-delta or VFD feeders with protection and interlocks selected for the application.',
    image: 'mcc-hvac-dubai',
    icon: Cpu,
    color: '#e50914',
    tags: ['MCC Panels', 'VFD Starters', 'Protection Relays', 'Project specification'],
    stats: [{
      label: 'Control',
      value: 'MCC'
    }, {
      label: 'Feeders',
      value: 'DOL / VFD'
    }, {
      label: 'Modes',
      value: 'Auto / Manual'
    }],
    features: ['Integrated motor protection & fault handling', 'VFD/Starter logic with safe interlocks', 'Tested wiring & labeling for site acceptance', 'Ready-to-operate commissioning documentation']
  }, {
    id: 2,
    title: 'Conveyor Automation',
    subtitle: 'Example PLC + VFD conveyor package',
    description: 'An illustrative PLC-based control package for conveyor sequences, speed references and fault diagnostics, with operator interfaces and maintainable wiring.',
    image: 'plc-vfd-jafza',
    icon: Factory,
    color: '#e50914',
    tags: ['PLC Panels', 'VFD Control', 'Siemens / Schneider', 'Industrial Ethernet'],
    stats: [{
      label: 'Control',
      value: 'PLC + HMI'
    }, {
      label: 'Drive',
      value: 'VFD'
    }, {
      label: 'Network',
      value: 'Ethernet'
    }],
    features: ['HMI-ready tag structure and communication mapping', 'Speed ramp profiles for reduced mechanical stress', 'Event/alarm handling for fast troubleshooting', 'On-site commissioning & tuning support']
  }, {
    id: 3,
    title: 'Chilled Water Control',
    subtitle: 'Example BMS package for chilled water',
    description: 'An illustrative BMS panel package for chilled-water equipment, coordinating pumps, valves and monitoring interfaces around an agreed building-services control sequence.',
    image: 'bms-abu-dhabi',
    icon: Shield,
    color: '#e50914',
    tags: ['BMS Panels', 'Pump Control', 'HVAC Integration', 'Building services'],
    stats: [{
      label: 'Equipment',
      value: 'Pumps'
    }, {
      label: 'Control',
      value: 'HVAC'
    }, {
      label: 'Status',
      value: 'Alarms'
    }],
    features: ['Structured control loops for stable temperature control', 'Pump scheduling & protection logic', 'Clear terminals and maintainable panel layout', 'Factory test & final site handover']
  }];
const ProjectsSection = () => {
  const trackRef = useRef(null);
  const activeProjectRef = useRef(0);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    let frame;
    let previousWidth = track.clientWidth;
    const measure = () => {
      const step = track.children[1].offsetLeft - track.children[0].offsetLeft;
      if (step <= 0 || !track.clientWidth) return;
      // Keep the selected project in view when a phone rotates or the viewport changes.
      if (track.clientWidth !== previousWidth) {
        track.scrollLeft = activeProjectRef.current * step;
        previousWidth = track.clientWidth;
      }
      const index = Math.max(0, Math.min(projects.length - 1, Math.round(track.scrollLeft / step)));
      activeProjectRef.current = index;
      setActiveProject(index);
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

  const showProject = (index) => {
    const target = Math.max(0, Math.min(projects.length - 1, index));
    const track = trackRef.current;
    const left = track.children[target].offsetLeft - track.children[0].offsetLeft;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (typeof track.scrollTo === 'function') track.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
    else track.scrollLeft = left;
    activeProjectRef.current = target;
    setActiveProject(target);
  };

  return <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="projects-bg" aria-hidden="true">
        <div className="projects-grid"></div>
        <div className="projects-orb orb-1"></div>
        <div className="projects-orb orb-2"></div>
      </div>

      <div className="projects-container">
        <div className="section-header">
          <div className="section-badge">
            <Database className="badge-icon" />
            <span>Application Examples</span>
          </div>
          <h2 id="projects-title" className="section-title">
            Control Panel <span className="gradient-text">Application Examples</span>
          </h2>
          <p className="section-subtitle">
            Illustrative panel applications. Final equipment, ratings, delivery scope and performance are agreed for each project.
          </p>
        </div>

        {/* Project Showcase */}
        <div className="project-showcase">
          {/* Project Navigation */}
          <div className="projects-carousel-toolbar">
            <p>Browse our application examples <span className="projects-swipe-hint">· Swipe to explore</span></p>
            <div className="project-nav">
              <button type="button" className="nav-btn prev" onClick={() => showProject(activeProject - 1)} aria-label="Previous application example" aria-controls="projects-track" disabled={activeProject === 0}>
                <ChevronLeft aria-hidden="true" />
              </button>
              <button type="button" className="nav-btn next" onClick={() => showProject(activeProject + 1)} aria-label="Next application example" aria-controls="projects-track" disabled={activeProject === projects.length - 1}>
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Project Content */}
          <div ref={trackRef} id="projects-track" className="projects-carousel-track" role="region" aria-label="Control panel application examples" aria-roledescription="carousel" tabIndex={0}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return;
              if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
                event.preventDefault();
                if (event.key === 'Home') showProject(0);
                else if (event.key === 'End') showProject(projects.length - 1);
                else showProject(activeProject + (event.key === 'ArrowRight' ? 1 : -1));
              }
            }}>
            {projects.map((currentProject, index) => <div key={currentProject.id} className="project-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${currentProject.title}`} aria-hidden={index !== activeProject}>
            <div className="project-content">
              {/* Project Visual */}
              <div className="project-visual">
                <div className="visual-frame" style={{
                borderColor: `${currentProject.color}40`
              }}>
                  <div className="visual-glow" style={{
                  background: currentProject.color
                }}></div>
                  
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
                              <stop offset="0%" stopColor={currentProject.color} stopOpacity="0.3" />
                              <stop offset="100%" stopColor={currentProject.color} stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d="M 0 40 Q 25 20 50 35 T 100 25 T 150 40 T 200 20" stroke={currentProject.color} strokeWidth="2" fill="none" />
                          <path d="M 0 40 Q 25 20 50 35 T 100 25 T 150 40 T 200 20 L 200 60 L 0 60 Z" fill={`url(#gradient-${currentProject.id})`} />
                        </svg>
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="preview-stats">
                        {currentProject.stats.map((stat, idx) => <div key={idx} className="preview-stat">
                            <span className="stat-value" style={{
                          color: currentProject.color
                        }}>
                              {stat.value}
                            </span>
                            <span className="stat-label">{stat.label}</span>
                          </div>)}
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="floating-elements">
                    <div className="float-card status-card" style={{
                    borderColor: `${currentProject.color}30`
                  }}>
                      <div className="status-dot" style={{
                      background: currentProject.color
                    }}></div>
                      <span>Example</span>
                    </div>
                    <div className="float-card metric-card" style={{
                    borderColor: `${currentProject.color}30`
                  }}>
                      <TrendingUp size={16} style={{
                      color: currentProject.color
                    }} />
                      <span>UAE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="project-info">
                <div className="project-header">
                  <div className="project-icon-wrapper" style={{
                  background: `linear-gradient(135deg, ${currentProject.color}20, ${currentProject.color}10)`,
                  borderColor: `${currentProject.color}40`
                }}>
                    <currentProject.icon className="project-icon" style={{
                    color: currentProject.color
                  }} />
                  </div>
                  <div className="project-titles">
                    <h3 className="project-title">{currentProject.title}</h3>
                    <span className="project-subtitle">{currentProject.subtitle}</span>
                  </div>
                </div>

                <p className="project-description">{currentProject.description}</p>

                <div className="project-tags">
                  {currentProject.tags.map((tag, idx) => <span key={idx} className="project-tag" style={{
                  background: `${currentProject.color}15`,
                  color: 'var(--brand-red-dark)',
                  borderColor: `${currentProject.color}30`
                }}>
                      {tag}
                    </span>)}
                </div>

                <div className="project-features">
                  <h4>Key Features</h4>
                  <ul>
                    {currentProject.features.map((feature, idx) => <li key={idx}>
                        <Shield size={14} style={{
                      color: currentProject.color
                    }} />
                        {feature}
                      </li>)}
                  </ul>
                </div>

              </div>
            </div>
            </div>)}
          </div>
          <div className="projects-carousel-footer">
            <p className="projects-status" aria-live="polite" aria-atomic="true">Example {activeProject + 1} of {projects.length}</p>
            <div className="project-indicators" aria-label="Application example pages">
              {projects.map((project, idx) => <button type="button" aria-label={`Show ${project.title}`} aria-controls="projects-track" aria-pressed={idx === activeProject} aria-current={idx === activeProject ? 'true' : undefined} key={project.id} className={`indicator ${idx === activeProject ? 'active' : ''}`} onClick={() => showProject(idx)} />)}
            </div>
          </div>
        </div>

        {/* Project Thumbnails */}
        <div className="project-thumbnails">
          {projects.map((project, idx) => <button type="button" aria-label={`Show ${project.title}`} aria-controls="projects-track" aria-pressed={idx === activeProject} key={project.id} className={`thumbnail ${idx === activeProject ? 'active' : ''}`} onClick={() => showProject(idx)}>
              <div className="thumb-icon" style={{
            background: idx === activeProject ? `${project.color}30` : 'transparent',
            borderColor: idx === activeProject ? project.color : 'transparent'
          }}>
                <project.icon size={24} style={{
              color: idx === activeProject ? project.color : 'var(--text-muted)'
            }} />
              </div>
              <span className="thumb-title">{project.title}</span>
            </button>)}
        </div>
      </div>
    </section>;
};
export default ProjectsSection;
