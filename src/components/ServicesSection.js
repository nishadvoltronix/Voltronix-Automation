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

const ServicesSection = () => {
  const services = [
    {
      icon: Cpu,
      title: 'Industrial Automation',
      description: 'Design and implementation of complete automation systems including PLC programming, HMI development, SCADA integration, and control system architecture for manufacturing and process industries.',
      features: ['PLC Programming', 'HMI/SCADA Design', 'Control Systems', 'Process Automation'],
      color: '#00d4ff',
      gradient: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)'
    },
    {
      icon: Code2,
      title: 'Industrial Software Development',
      description: 'Custom software solutions for industrial environments including manufacturing execution systems (MES), data historians, reporting tools, and enterprise integration platforms.',
      features: ['MES Systems', 'Data Historians', 'Custom Applications', 'Database Design'],
      color: '#ff6b35',
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #cc5500 100%)'
    },
    {
      icon: Wifi,
      title: 'Industrial IoT Systems',
      description: 'End-to-end Industrial IoT solutions connecting machines to the cloud. Real-time monitoring, predictive maintenance, and digital twin implementations for smart factories.',
      features: ['IoT Gateways', 'Cloud Integration', 'Predictive Analytics', 'Digital Twins'],
      color: '#00ff88',
      gradient: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)'
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
            <span>What I Do</span>
          </div>
          <h2 className="section-title">
            Professional <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive industrial automation solutions tailored to your specific needs
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

                <button className="service-cta">
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
