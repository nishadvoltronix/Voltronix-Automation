import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              <img src="/logo.png" alt="Voltronix Automation" className="footer-logo-image" />
              <span className="footer-brand-text">Automation</span>
            </div>
            <p className="brand-description">
              From concept to commissioning — engineered to IEC standards, DEWA-compliant, and ready for your process.
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>info@voltronix.ae</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+971504327804</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span> Shed 06, Aber Warehouse DIP 02,
                   PO Box: 414345 , Dubai.
                                       United Arab Emirates.
                    </span>
              </div>
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
              <h4>Navigation</h4>
              <ul>
                <li>
                  <span>Home</span>
                </li>
                <li>
                  <span>Services</span>
                </li>
                <li>
                  <span>Why Us</span>
                </li>
                <li>
                  <span>Projects</span>
                </li>
                <li>
                  <span>Contact</span>
                </li>
              </ul>
            </div>

            <div className="links-column">
              <h4>Focus</h4>
              <ul>
                <li>
                  <span>Panel Types</span>
                </li>
                <li>
                  <span>IEC • DEWA</span>
                </li>
                <li>
                  <span>UAE Delivery</span>
                </li>
              </ul>
            </div>

            <div className="links-column">
              <h4>Resources</h4>
              <ul>
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <span>{link.name}</span>
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
            <button
              className="cta-button"
              type="button"
              onClick={() => {
                // On service detail routes, ContactSection isn't mounted, so navigate home first.
                if (location.pathname !== '/') {
                  navigate('/');
                  setTimeout(() => scrollToContact(), 60);
                  setTimeout(() => scrollToContact(), 180);
                  return;
                }
                scrollToContact();
              }}
            >
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
              © {currentYear} Voltronix Automation. All rights reserved.
            </p>
            <p className="made-with">
              Engineered for UAE industry • IEC-ready
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
