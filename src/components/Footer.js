import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  ArrowUp,
  Code2,
  Heart
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: 'Industrial Automation', href: '#services' },
      { name: 'Software Development', href: '#services' },
      { name: 'IoT Systems', href: '#services' },
      { name: 'System Integration', href: '#services' }
    ],
    technologies: [
      { name: 'PLC Programming', href: '#technologies' },
      { name: 'SCADA Systems', href: '#technologies' },
      { name: 'Cloud Platforms', href: '#technologies' },
      { name: 'Industrial Networks', href: '#technologies' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Case Studies', href: '#projects' },
      { name: 'Blog', href: '#' },
      { name: 'Support', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' }
  ];

  return (
    <footer className="footer">
      <div className="footer-bg">
        <div className="footer-grid"></div>
        <div className="footer-orb"></div>
      </div>

      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="brand-logo">
              <Cpu className="logo-icon" />
              <span className="logo-text">Auto<span className="logo-highlight">Mate</span></span>
            </div>
            <p className="brand-description">
              Professional Industrial Automation Engineer specializing in building 
              cutting-edge industrial applications and smart factory systems.
            </p>
            
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>prosaeed359@gmail.com</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+977 504327804</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>Dip2 , Dubai , UAE </span>
              </div>
            </div>

            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="links-column">
              <h4>Services</h4>
              <ul>
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="links-column">
              <h4>Technologies</h4>
              <ul>
                {footerLinks.technologies.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="links-column">
              <h4>Resources</h4>
              <ul>
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>
                      {link.name}
                      {link.href === '#' && <ExternalLink size={12} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="footer-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Let's Work Together</h3>
            <p>Have a project in mind? Let's discuss how I can help automate your industrial processes.</p>
            <button className="cta-button">
              <Code2 size={18} />
              Start a Project
            </button>
            
            <div className="availability-badge">
              <span className="pulse-dot"></span>
              <span>Available for new projects</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="bottom-content">
            <p className="copyright">
              © {currentYear} Industrial Automation Engineer. All rights reserved.
            </p>
            <p className="made-with">
              Made with <Heart className="heart-icon" size={14} /> using React & Industrial IoT
            </p>
          </div>
          
          <button className="scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
