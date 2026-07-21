import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Code2, 
  Wifi, 
  ArrowRight,
  Settings,
  Globe,
  Shield
} from 'lucide-react';
import './ServicesSection.css';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const navigate = useNavigate();

  const services = [
    {
      slug: 'plc-panels',
      icon: Cpu,
      title: 'PLC Panels',
      description:
        'Custom-built PLC control panels for machine control and process automation.\n'
        + 'Siemens / Allen-Bradley / Schneider programming with HMI integration.',
      features: ['PLC Programming', 'HMI Integration', 'Comms & IO', 'Testing'],
      color: '#00d4ff',
      gradient: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)'
    },
    {
      slug: 'vfd-control-panels',
      icon: Code2,
      title: 'VFD Control Panels',
      description:
        'VFD panels designed to control motor speed and improve energy efficiency.\n'
        + 'Reliable acceleration, protection and tuned process performance.',
      features: ['VFD Configuration', 'Motor Protection', 'Ramp & Control', 'Commissioning'],
      color: '#ff6b35',
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #cc5500 100%)'
    },
    {
      slug: 'mcc-assemblies',
      icon: Settings,
      title: 'MCC Assemblies',
      description:
        'Motor Control Centre (MCC) panels for safe control of multiple motors.\n'
        + 'DOL / Star-Delta / Soft Starter / VFD solutions for plants and HVAC.',
      features: ['Safe Motor Control', 'Starter Options', 'Protection Relays', 'Build Quality'],
      color: '#ff4d6d',
      gradient: 'linear-gradient(135deg, #ff4d6d 0%, #c93452 100%)'
    },
    {
      slug: 'bms-control-panels',
      icon: Shield,
      title: 'BMS Control Panels',
      description:
        'Building Management System (BMS) panels for monitoring and automation.\n'
        + 'HVAC, pumps, fans, lighting and building services integration.',
      features: ['Building Services', 'Monitoring & Control', 'Integration', 'DEWA Readiness'],
      color: '#ffaa00',
      gradient: 'linear-gradient(135deg, #ffaa00 0%, #cc8400 100%)'
    },
    {
      slug: 'safety-esd-panel',
      icon: Cpu,
      title: 'Safety & ESD Panel',
      description:
        'Safety and ESD control panels engineered for dependable protection.\n'
        + 'Clear wiring practices, robust components and thorough commissioning.',
      features: ['Safety Interlocks', 'ESD Logic', 'Wiring & Terminations', 'Verification'],
      color: '#ff4d6d',
      gradient: 'linear-gradient(135deg, #ff4d6d 0%, #c93452 100%)'
    },
    {
      slug: 'other-control-panels',
      icon: Code2,
      title: 'Other Control Panels',
      description:
        'Tailored control panel engineering for special requirements and custom builds.\n'
        + 'From concept to commissioning — designed to your IEC-ready process.',
      features: ['Custom Design', 'Panel Build', 'Testing', 'Site Support'],
      color: '#7c5cff',
      gradient: 'linear-gradient(135deg, #7c5cff 0%, #5536d9 100%)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const goToService = (slug) => {
    navigate(`/services/${slug}`);
  };

  return (
    <section id="services" className="services-section">
      <div className="services-bg">
        <div className="services-grid"></div>
        <div className="glow-orb services-orb-1"></div>
        <div className="glow-orb services-orb-2"></div>
      </div>

      <div className="services-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <Settings className="badge-icon" />
            <span>Voltronix Solutions</span>
          </div>
          <h2 className="section-title">
            Control Panel <span className="gradient-text">Solutions</span>
          </h2>
          <p className="section-subtitle">
            From concept to commissioning — engineered to IEC standards, DEWA-compliant, and ready for your process.
          </p>
        </motion.div>

        <motion.div 
          className="services-grid-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${service.title} page`}
              onClick={() => goToService(service.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') goToService(service.slug);
              }}
            >
              <div className="service-glow" style={{ background: service.gradient }}></div>
              
              <div className="service-content">
                <div className="service-icon-wrapper" style={{ 
                  background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                  borderColor: `${service.color}40`
                }}>
                  <service.icon className="service-icon" style={{ color: service.color }} />
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-features">
                  {service.features.map((feature, idx) => (
                    <span 
                      key={idx} 
                      className="feature-tag"
                      style={{ 
                        background: `${service.color}15`,
                        color: service.color,
                        borderColor: `${service.color}30`
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <button
                  className="service-cta"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToService(service.slug);
                  }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="cta-icon" />
                </button>
              </div>

              <div className="service-decoration">
                <div className="decoration-line" style={{ background: service.gradient }}></div>
                <div className="decoration-dots">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="dot" style={{ background: service.color }}></span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Cards */}
        <motion.div 
          className="info-cards"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="info-card">
            <Globe className="info-icon" />
            <div className="info-content">
              <h4>Global Reach</h4>
              <p>Projects delivered across multiple continents, adapting to diverse industrial standards and regulations.</p>
            </div>
          </div>
          <div className="info-card">
            <Shield className="info-icon" />
            <div className="info-content">
              <h4>Industry Standards</h4>
              <p>Compliance with IEC 61131-3, ISA-95, OPC UA, and other industrial automation standards.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
