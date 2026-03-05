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
      title: 'Smart Factory SCADA System',
      subtitle: 'Manufacturing Execution System',
      description: 'Complete SCADA solution for automotive parts manufacturing with real-time monitoring, predictive maintenance, and quality control integration.',
      image: 'scada-dashboard',
      icon: Factory,
      color: '#00d4ff',
      tags: ['SCADA', 'Siemens S7', 'WinCC', 'SQL Server'],
      stats: [
        { label: 'Data Points', value: '50K+' },
        { label: 'Throughput', value: '99.9%' },
        { label: 'ROI', value: '300%' }
      ],
      features: [
        'Real-time production monitoring',
        'OEE calculation and reporting',
        'Automated quality control',
        'Energy management dashboard'
      ]
    },
    {
      id: 2,
      title: 'Industrial IoT Platform',
      subtitle: 'Cloud-Based Monitoring',
      description: 'End-to-end IoT platform connecting 200+ devices across multiple facilities with AWS IoT Core, real-time analytics, and mobile applications.',
      image: 'iot-platform',
      icon: Wifi,
      color: '#ff6b35',
      tags: ['AWS IoT', 'Node.js', 'React', 'MongoDB'],
      stats: [
        { label: 'Devices', value: '200+' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Latency', value: '<100ms' }
      ],
      features: [
        'Multi-tenant architecture',
        'Real-time alerting system',
        'Predictive maintenance ML',
        'Mobile app for technicians'
      ]
    },
    {
      id: 3,
      title: 'Process Control System',
      subtitle: 'Chemical Plant Automation',
      description: 'DCS implementation for chemical processing with advanced process control, safety instrumented systems, and batch management.',
      image: 'process-control',
      icon: Activity,
      color: '#00ff88',
      tags: ['DCS', 'Honeywell', 'Batch Control', 'Safety'],
      stats: [
        { label: 'Control Loops', value: '500+' },
        { label: 'Safety Rating', value: 'SIL 3' },
        { label: 'Efficiency', value: '+25%' }
      ],
      features: [
        'Advanced process control',
        'Safety instrumented systems',
        'Batch recipe management',
        'Regulatory compliance reporting'
      ]
    },
    {
      id: 4,
      title: 'Energy Management System',
      subtitle: 'Smart Grid Integration',
      description: 'Comprehensive energy monitoring and optimization system for industrial facilities with demand response and renewable integration.',
      image: 'energy-system',
      icon: Zap,
      color: '#ffaa00',
      tags: ['Energy', 'Modbus', 'Cloud', 'Analytics'],
      stats: [
        { label: 'Power Saved', value: '30%' },
        { label: 'Meters', value: '150+' },
        { label: 'Cost Reduction', value: '$2M/yr' }
      ],
      features: [
        'Real-time power monitoring',
        'Demand forecasting',
        'Peak shaving optimization',
        'Carbon footprint tracking'
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world industrial automation solutions delivering measurable results
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

                <div className="project-actions">
                  <button 
                    className="btn-primary"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentProject.color}, ${currentProject.color}dd)`,
                      borderColor: currentProject.color
                    }}
                  >
                    <Maximize2 size={18} />
                    View Details
                  </button>
                  <button className="btn-secondary">
                    <Github size={18} />
                    Source Code
                  </button>
                  <button className="btn-icon-only">
                    <ExternalLink size={20} />
                  </button>
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
