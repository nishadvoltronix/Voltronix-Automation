import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import WhyUsSection from '../components/WhyUsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import AutomationApplicationsSection from '../components/AutomationApplicationsSection';
import ContractingSection from '../components/ContractingSection';
import AutomationFaqSection from '../components/AutomationFaqSection';

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ProjectsSection />
      <AutomationApplicationsSection />
      <ContractingSection />
      <AutomationFaqSection />
      <ContactSection />
    </main>
  );
}
