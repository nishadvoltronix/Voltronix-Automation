import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Activity, 
  Zap, 
  Cloud, 
  Server, 
  Code2, 
  Settings,
  TrendingUp,
  Shield,
  Wifi
} from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const metrics = [
    { label: 'System Efficiency', value: '98.5%', icon: Activity, color: '#00ff88' },
    { label: 'Power Usage', value: '2.4 kW', icon: Zap, color: '#ffaa00' },
    { label: 'Uptime', value: '99.9%', icon: TrendingUp, color: '#00d4ff' },
  ];

  const codeSnippet = `PROGRAM MainControl
VAR
  MotorSpeed : REAL := 0.0;
  TargetRPM  : REAL := 1750.0;
  Running    : BOOL := FALSE;
END_VAR

// Industrial Control Logic
IF StartButton THEN
  MotorSpeed := RampUp(TargetRPM);
  Running := TRUE;
END_IF;`;

  return (
    <section id="home" className="hero-section">
      {/* Background Effects */}
      <div className="hero-bg-effects">
        <div className="grid-overlay"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="circuit-lines"></div>
      </div>

      <div className="hero-container">
        {/* Left Panel - PLC & Code */}
        <motion.div 
          className="hero-left-panel"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* PLC Control Panel */}
          <div className="plc-panel">
            <div className="panel-header">
              <Cpu className="panel-icon" />
              <span className="panel-title">PLC Control System</span>
              <div className="status-indicator">
                <span className="status-dot online"></span>
                <span className="status-text">ONLINE</span>
              </div>
            </div>
            
            <div className="plc-modules">
              <div className="module-row">
                <div className="plc-module cpu-module">
                  <div className="module-leds">
                    <span className="led run-led"></span>
                    <span className="led err-led"></span>
                    <span className="led pwr-led"></span>
                  </div>
                  <span className="module-label">CPU-01</span>
                </div>
                <div className="plc-module io-module">
                  <div className="module-ports">
                    {[...Array(8)].map((_, i) => (
                      <span key={i} className={`port ${i < 5 ? 'active' : ''}`}></span>
                    ))}
                  </div>
                  <span className="module-label">DI-16</span>
                </div>
                <div className="plc-module io-module">
                  <div className="module-ports">
                    {[...Array(8)].map((_, i) => (
                      <span key={i} className={`port ${i < 3 ? 'active' : ''}`}></span>
                    ))}
                  </div>
                  <span className="module-label">DO-16</span>
                </div>
              </div>
              <div className="module-row">
                <div className="plc-module analog-module">
                  <div className="analog-channels">
                    <div className="channel">
                      <span className="channel-label">AI1</span>
                      <div className="channel-bar">
                        <div className="channel-fill" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    <div className="channel">
                      <span className="channel-label">AI2</span>
                      <div className="channel-bar">
                        <div className="channel-fill" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  </div>
                  <span className="module-label">AI-08</span>
                </div>
                <div className="plc-module comm-module">
                  <Wifi className="comm-icon" />
                  <span className="module-label">ETH-01</span>
                </div>
              </div>
            </div>

            {/* Wiring Visualization */}
            <div className="wiring-harness">
              <svg viewBox="0 0 300 100" className="wiring-svg">
                <path d="M 20 20 Q 100 20 150 50 T 280 30" stroke="#00d4ff" strokeWidth="2" fill="none" strokeDasharray="5,5" className="data-line"/>
                <path d="M 20 50 Q 100 50 150 60 T 280 50" stroke="#ff6b35" strokeWidth="2" fill="none" strokeDasharray="5,5" className="power-line"/>
                <path d="M 20 80 Q 100 80 150 70 T 280 80" stroke="#00ff88" strokeWidth="2" fill="none" strokeDasharray="5,5" className="signal-line"/>
              </svg>
            </div>
          </div>

          {/* Code Editor */}
          <div className="code-panel">
            <div className="code-header">
              <Code2 className="code-icon" />
              <span className="code-filename">MainControl.st</span>
              <div className="code-actions">
                <span className="action-btn"></span>
                <span className="action-btn"></span>
                <span className="action-btn"></span>
              </div>
            </div>
            <pre className="code-content">
              <code>{codeSnippet}</code>
            </pre>
          </div>

          {/* Metrics Panel */}
          <div className="metrics-panel">
            {metrics.map((metric, index) => (
              <motion.div 
                key={metric.label}
                className="metric-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <metric.icon className="metric-icon" style={{ color: metric.color }} />
                <div className="metric-info">
                  <span className="metric-value" style={{ color: metric.color }}>{metric.value}</span>
                  <span className="metric-label">{metric.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Center - Hero Content */}
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="hero-badge">
            <Settings className="badge-icon" />
            <span>Industrial Automation Expert</span>
          </div>
          
          <h1 className="hero-title">
            Industrial Automation
            <span className="title-highlight"> Engineer</span>
          </h1>
          
          <p className="hero-subtitle">
            Building Industrial Apps & Automation Systems
          </p>
          
          <p className="hero-description">
            Specialized in designing and implementing cutting-edge industrial automation solutions, 
            from PLC programming to cloud-based SCADA systems and Industrial IoT platforms.
          </p>

          <div className="hero-cta">
            <button className="btn-primary">
              <Activity className="btn-icon" />
              View Projects
            </button>
            <button className="btn-secondary">
              <Code2 className="btn-icon" />
              Get in Touch
            </button>
          </div>

          {/* Floating Stats */}
          <div className="floating-stats">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Success</span>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Cloud & Dashboards */}
        <motion.div 
          className="hero-right-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Cloud Dashboard */}
          <div className="cloud-panel">
            <div className="panel-header">
              <Cloud className="panel-icon cloud-icon" />
              <span className="panel-title">Cloud Analytics</span>
              <div className="live-indicator">
                <span className="pulse-dot"></span>
                <span>LIVE</span>
              </div>
            </div>
            
            <div className="dashboard-preview">
              <div className="chart-container">
                <div className="chart-title">Motor Performance</div>
                <div className="chart-area">
                  <svg viewBox="0 0 200 80" className="chart-svg">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#00d4ff" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path 
                      d="M 0 60 Q 25 40 50 50 T 100 30 T 150 45 T 200 25" 
                      stroke="#00d4ff" 
                      strokeWidth="2" 
                      fill="none"
                    />
                    <path 
                      d="M 0 60 Q 25 40 50 50 T 100 30 T 150 45 T 200 25 L 200 80 L 0 80 Z" 
                      fill="url(#chartGradient)"
                    />
                  </svg>
                </div>
                <div className="chart-legend">
                  <span className="legend-item">
                    <span className="legend-dot" style={{background: '#00d4ff'}}></span>
                    Current
                  </span>
                  <span className="legend-item">
                    <span className="legend-dot" style={{background: '#ff6b35'}}></span>
                    Target
                  </span>
                </div>
              </div>

              <div className="gauge-row">
                <div className="gauge-item">
                  <div className="gauge-circle">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#2a2a3a" strokeWidth="8"/>
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#00d4ff" strokeWidth="8" 
                        strokeDasharray="283" strokeDashoffset="70" strokeLinecap="round"/>
                    </svg>
                    <span className="gauge-value">75%</span>
                  </div>
                  <span className="gauge-label">Load</span>
                </div>
                <div className="gauge-item">
                  <div className="gauge-circle">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#2a2a3a" strokeWidth="8"/>
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#00ff88" strokeWidth="8" 
                        strokeDasharray="283" strokeDashoffset="20" strokeLinecap="round"/>
                    </svg>
                    <span className="gauge-value">93%</span>
                  </div>
                  <span className="gauge-label">Health</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="status-panel">
            <div className="panel-header">
              <Server className="panel-icon" />
              <span className="panel-title">System Status</span>
            </div>
            <div className="status-list">
              <div className="status-item">
                <Shield className="status-icon" />
                <span className="status-name">Security</span>
                <span className="status-badge secure">Secure</span>
              </div>
              <div className="status-item">
                <Wifi className="status-icon" />
                <span className="status-name">Network</span>
                <span className="status-badge online">Connected</span>
              </div>
              <div className="status-item">
                <Cloud className="status-icon" />
                <span className="status-name">Cloud Sync</span>
                <span className="status-badge syncing">Syncing</span>
              </div>
            </div>
          </div>

          {/* Portrait Photo */}
          <div className="portrait-frame">
            <div className="frame-glow"></div>
            <div className="portrait-photo-container">
              <img 
                src="/profile-photo.jpg" 
                alt="Industrial Automation Engineer" 
                className="portrait-photo"
              />
            </div>
            <div className="frame-corners">
              <span className="corner tl"></span>
              <span className="corner tr"></span>
              <span className="corner bl"></span>
              <span className="corner br"></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
