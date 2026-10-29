import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers,
  Database,
  Cloud,
  Server,
  Cpu,
  Wifi,
  Shield,
  Code,
  GitBranch,
  Terminal,
  Box,
  Zap
} from 'lucide-react';
import './TechStackSection.css';

const TechStackSection = () => {
  const technologies = [
    {
      category: 'Industrial Protocols',
      items: [
        { name: 'Modbus', icon: Server, color: '#00d4ff', description: 'TCP/RTU' },
        { name: 'OPC UA', icon: Shield, color: '#ff6b35', description: 'Unified Architecture' },
        { name: 'EtherNet/IP', icon: Wifi, color: '#00ff88', description: 'Industrial Ethernet' },
        { name: 'Profinet', icon: Zap, color: '#ffaa00', description: 'Real-time Comm' },
      ]
    },
    {
      category: 'PLC & Control',
      items: [
        { name: 'Siemens TIA', icon: Cpu, color: '#00d4ff', description: 'Portal V17' },
        { name: 'Allen-Bradley', icon: Box, color: '#ff6b35', description: 'Studio 5000' },
        { name: 'Schneider', icon: Zap, color: '#00ff88', description: 'EcoStruxure' },
        { name: 'Mitsubishi', icon: Terminal, color: '#ffaa00', description: 'GX Works' },
      ]
    },
    {
      category: 'Software Development',
      items: [
        { name: 'Node.js', icon: Server, color: '#00d4ff', description: 'Backend Runtime' },
        { name: 'React', icon: Code, color: '#ff6b35', description: 'Frontend UI' },
        { name: 'MongoDB', icon: Database, color: '#00ff88', description: 'Database' },
        { name: 'Docker', icon: Box, color: '#ffaa00', description: 'Containerization' },
      ]
    },
    {
      category: 'Cloud & DevOps',
      items: [
        { name: 'AWS IoT', icon: Cloud, color: '#00d4ff', description: 'Cloud Platform' },
        { name: 'Azure IoT', icon: Cloud, color: '#ff6b35', description: 'Microsoft Cloud' },
        { name: 'Git', icon: GitBranch, color: '#00ff88', description: 'Version Control' },
        { name: 'Kubernetes', icon: Layers, color: '#ffaa00', description: 'Orchestration' },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="technologies" className="tech-section">
      <div className="tech-bg">
        <div className="tech-grid"></div>
        <div className="tech-orb orb-left"></div>
        <div className="tech-orb orb-right"></div>
      </div>

      <div className="tech-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <Layers className="badge-icon" />
            <span>Technology Stack</span>
          </div>
          <h2 className="section-title">
            Tools & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Modern industrial automation powered by cutting-edge technologies
          </p>
        </motion.div>

        <div className="tech-categories">
          {technologies.map((category, catIndex) => (
            <motion.div
              key={category.category}
              className="tech-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <h3 className="category-title">{category.category}</h3>
              <motion.div 
                className="tech-items"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.items.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="tech-item"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div 
                      className="tech-icon-wrapper"
                      style={{ 
                        background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}10)`,
                        borderColor: `${tech.color}40`,
                        boxShadow: `0 0 20px ${tech.color}20`
                      }}
                    >
                      <tech.icon 
                        className="tech-icon" 
                        style={{ color: tech.color }}
                      />
                    </div>
                    <div className="tech-info">
                      <span className="tech-name">{tech.name}</span>
                      <span className="tech-desc">{tech.description}</span>
                    </div>
                    <div className="tech-glow" style={{ background: tech.color }}></div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Integration Banner */}
        <motion.div 
          className="integration-banner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="integration-content">
            <div className="integration-icon">
              <Wifi className="icon-pulse" />
            </div>
            <div className="integration-text">
              <h4>Seamless Integration</h4>
              <p>Connecting legacy systems with modern cloud infrastructure using industry-standard protocols</p>
            </div>
          </div>
          <div className="integration-stats">
            <div className="int-stat">
              <span className="int-number">15+</span>
              <span className="int-label">Protocols</span>
            </div>
            <div className="int-stat">
              <span className="int-number">50+</span>
              <span className="int-label">Platforms</span>
            </div>
            <div className="int-stat">
              <span className="int-number">100%</span>
              <span className="int-label">Compatible</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
