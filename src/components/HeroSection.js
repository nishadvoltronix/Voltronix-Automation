import React from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Activity,
  Cloud,
  Server,
  Code2,
  Shield,
  Wifi
} from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {

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
          {/* PLC Control Panel (image only) */}
          <div
            className="plc-panel"
            style={{ backgroundImage: "url('/plcpanel.png')" }}
          />

          {/* Program MainControl (image only) */}
          <div
            className="code-panel"
            style={{ backgroundImage: "url('/vfdpanel.png')" }}
          />

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
            <span className="hero-brand-image-wrap">
              <img src="/logo.png" alt="Voltronix Automation" className="hero-brand-image" />
              <span className="hero-brand-text">Automation</span>
            </span>
          </div>

          <h1 className="hero-title">
            Smart Control
            <span className="title-highlight">. Reliable Performance.</span>
          </h1>

          <p className="hero-subtitle">
            Engineered Control. Built for UAE Industry. From concept to commissioning — engineered to IEC standards,
            DEWA-compliant, and ready for your process.
          </p>

          <p className="hero-description">
            We design and fabricate industrial control panels across the UAE: PLC panels (Siemens, Allen-Bradley, Schneider),
            VFD panels, MCC assemblies, and BMS control panels — engineered for real-world uptime.
          </p>

          <div className="hero-cta">
            <button
              className="btn-primary"
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              type="button"
            >
              <Activity className="btn-icon" />
              View Our Work
            </button>
            <button
              className="btn-secondary"
              type="button"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <Code2 className="btn-icon" />
              Get a Quote
            </button>
          </div>

        </motion.div>

        {/* Right Panel - Cloud & Dashboards */}
        <motion.div 
          className="hero-right-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Cloud Analytics (image only) */}
          <div
            className="cloud-panel"
            style={{ backgroundImage: "url('/vfdpanel.png')" }}
          />

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
