import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import WebGLBackground from './components/WebGLBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsGallery from './components/ProjectsGallery';
import ExperienceTimeline from './components/ExperienceTimeline';
import TechStack from './components/TechStack';
import TerminalContact from './components/TerminalContact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Parallax effect for sections - más suave y con más espacio visual
    gsap.utils.toArray('section').forEach((section) => {
      gsap.to(section, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom+=100',
          end: 'bottom top-=100',
          scrub: true,
        },
      });
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

      {/* Main Content - cada sección con padding generoso */}
      <main className="relative z-10 flex flex-col gap-24">
        <HeroSection />
        <ProjectsGallery />
        <ExperienceTimeline />
        <TechStack />
        <TerminalContact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
