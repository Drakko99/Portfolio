import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import WebGLBackground from './components/WebGLBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsGallery from './components/ProjectsGallery';
import ExperienceTimeline from './components/ExperienceTimeline';
import TechStack from './components/TechStack';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Efecto de transición suave entre secciones
    gsap.utils.toArray('section').forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0.7 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top center-=100',
            end: 'center center',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* WebGL Background */}
      <WebGLBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content - Cada sección es como una "página" separada */}
      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <ProjectsGallery />
        <ExperienceTimeline />
        <TechStack />
      </main>

      {/* Footer minimalista */}
      <Footer />
    </div>
  );
}

export default App;
