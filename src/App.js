import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TechStackSection from './components/TechStackSection';
import ArchitectureSection from './components/ArchitectureSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import './App.css';

function App() {
  return (
    <div className="App">
      <AnimatedBackground />
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <TechStackSection />
        <ArchitectureSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
