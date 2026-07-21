import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Wrench, RefreshCw, Building2 } from 'lucide-react';
import './WhyUsSection.css';

const WhyUsSection = () => {
  const pillars = [
    {
      icon: CheckCircle2,
      title: 'Customized Engineering',
      description: 'Every panel is designed according to the exact operational and technical requirements of your project.'
    },
    {
      icon: Wrench,
      title: 'Quality Components',
      description: 'We use reliable components from trusted international brands based on your technical needs and budget.'
    },
    {
      icon: RefreshCw,
      title: 'Complete Solutions',
      description: 'From design and programming to manufacturing, installation, testing, and commissioning—handled end-to-end.'
    },
    {
      icon: Building2,
      title: 'Reliable Support',
      description: 'Technical support, troubleshooting, maintenance, and system upgrades whenever required.'
    }
  ];

  return (
    <section id="why-us" className="whyus-section">
      <div className="whyus-bg">
        <div className="whyus-grid" />
        <div className="whyus-orb orb-1" />
        <div className="whyus-orb orb-2" />
      </div>

      <div className="whyus-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <span className="badge-dot" />
            <span>Why Voltronix</span>
          </div>
          <h2 className="section-title">
            Why Choose <span className="gradient-text">Voltronix Automation</span>
          </h2>
          <p className="section-subtitle">
            Engineered Control. Built for UAE Industry. From concept to commissioning — designed for safety, performance, and fast delivery.
          </p>
        </motion.div>

        <div className="whyus-pills">
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              className="whyus-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <div className="whyus-icon-wrap">
                <p.icon className="whyus-icon" />
              </div>
              <h3 className="whyus-title">{p.title}</h3>
              <p className="whyus-desc">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
