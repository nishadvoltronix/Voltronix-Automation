import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu,
  ArrowRight,
  Cloud,
  Server,
  Monitor,
  Smartphone,
  Database,
  Shield,
  Wifi,
  Activity,
  Settings,
  Layers
} from 'lucide-react';
import './ArchitectureSection.css';

const ArchitectureSection = () => {
  const architectureSteps = [
    {
      icon: Cpu,
      title: 'PLC Layer',
      subtitle: 'Industrial Controllers',
      description: 'Siemens S7, Allen-Bradley ControlLogix, Schneider M580',
      details: ['Real-time Control', 'I/O Management', 'Safety Systems'],
      color: '#00d4ff'
    },
    {
      icon: Wifi,
      title: 'IoT Gateway',
      subtitle: 'Edge Computing',
      description: 'Protocol conversion, data preprocessing, edge analytics',
      details: ['Modbus/OPC UA', 'Local Storage', 'Edge Logic'],
      color: '#ff6b35'
    },
    {
      icon: Cloud,
      title: 'Cloud Backend',
      subtitle: 'Scalable Infrastructure',
      description: 'AWS/Azure IoT platforms with microservices architecture',
      details: ['Data Processing', 'Analytics Engine', 'API Gateway'],
      color: '#00ff88'
    },
    {
      icon: Monitor,
      title: 'Web Dashboard',
      subtitle: 'SCADA Interface',
      description: 'Real-time monitoring with React-based visualization',
      details: ['Live Trends', 'Alarms & Events', 'Reports'],
      color: '#ffaa00'
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      subtitle: 'Field Access',
      description: 'React Native apps for iOS and Android platforms',
      details: ['Push Notifications', 'Remote Control', 'Offline Mode'],
      color: '#00d4ff'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="architecture" className="architecture-section">
      <div className="arch-bg">
        <div className="arch-grid"></div>
        <div className="arch-orb orb-1"></div>
        <div className="arch-orb orb-2"></div>
        <div className="connection-lines">
          <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="50%" stopColor="#ff6b35" />
                <stop offset="100%" stopColor="#00ff88" />
              </linearGradient>
            </defs>
            <path 
              d="M 0 50 Q 300 20 600 50 T 1200 50" 
              stroke="url(#lineGradient)" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray="10,5"
              className="data-flow-line"
            />
          </svg>
        </div>
      </div>

      <div className="arch-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <Layers className="badge-icon" />
            <span>System Design</span>
          </div>
          <h2 className="section-title">
            Architecture <span className="gradient-text">Overview</span>
          </h2>
          <p className="section-subtitle">
            End-to-end industrial automation architecture from field devices to cloud analytics
          </p>
        </motion.div>

        {/* Architecture Flow */}
        <motion.div 
          className="architecture-flow"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {architectureSteps.map((step, index) => (
            <React.Fragment key={step.title}>
              <motion.div
                className="arch-step"
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div 
                  className="step-card"
                  style={{ borderColor: `${step.color}40` }}
                >
                  <div 
                    className="step-glow"
                    style={{ background: step.color }}
                  ></div>
                  
                  <div className="step-header">
                    <div 
                      className="step-icon-wrapper"
                      style={{ 
                        background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                        borderColor: `${step.color}40`
                      }}
                    >
                      <step.icon className="step-icon" style={{ color: step.color }} />
                    </div>
                    <div className="step-number" style={{ color: step.color }}>
                      0{index + 1}
                    </div>
                  </div>

                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <span className="step-subtitle">{step.subtitle}</span>
                    <p className="step-description">{step.description}</p>
                    
                    <div className="step-details">
                      {step.details.map((detail, idx) => (
                        <span 
                          key={idx} 
                          className="detail-tag"
                          style={{ 
                            background: `${step.color}15`,
                            color: step.color,
                            borderColor: `${step.color}30`
                          }}
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="step-decoration">
                    <div className="decoration-pulse" style={{ background: step.color }}></div>
                  </div>
                </div>
              </motion.div>

              {index < architectureSteps.length - 1 && (
                <motion.div 
                  className="arch-connector"
                  variants={itemVariants}
                >
                  <div className="connector-line"></div>
                  <ArrowRight className="connector-arrow" />
                  <div className="connector-data">
                    <span className="data-packet"></span>
                  </div>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Data Flow Visualization */}
        <motion.div 
          className="data-flow-viz"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="viz-header">
            <Activity className="viz-icon" />
            <h4>Real-time Data Flow</h4>
          </div>
          
          <div className="viz-content">
            <div className="data-stream">
              <div className="stream-label">Field Data</div>
              <div className="stream-bar">
                <div className="stream-fill field-stream"></div>
              </div>
              <div className="stream-value">10ms</div>
            </div>
            
            <div className="data-stream">
              <div className="stream-label">Edge Processing</div>
              <div className="stream-bar">
                <div className="stream-fill edge-stream"></div>
              </div>
              <div className="stream-value">50ms</div>
            </div>
            
            <div className="data-stream">
              <div className="stream-label">Cloud Upload</div>
              <div className="stream-bar">
                <div className="stream-fill cloud-stream"></div>
              </div>
              <div className="stream-value">200ms</div>
            </div>
            
            <div className="data-stream">
              <div className="stream-label">Dashboard Update</div>
              <div className="stream-bar">
                <div className="stream-fill dashboard-stream"></div>
              </div>
              <div className="stream-value">500ms</div>
            </div>
          </div>

          <div className="viz-stats">
            <div className="viz-stat">
              <Database className="stat-icon" />
              <span className="stat-value">10K+</span>
              <span className="stat-label">Tags/Sec</span>
            </div>
            <div className="viz-stat">
              <Shield className="stat-icon" />
              <span className="stat-value">99.99%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="viz-stat">
              <Settings className="stat-icon" />
              <span className="stat-value">{'<1s'}</span>
              <span className="stat-label">Latency</span>
            </div>
          </div>
        </motion.div>

        {/* Security & Compliance */}
        <motion.div 
          className="security-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="security-content">
            <Shield className="security-icon" />
            <div className="security-text">
              <h4>Enterprise-Grade Security</h4>
              <p>IEC 62443 compliant with end-to-end encryption, role-based access control, and audit logging</p>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
