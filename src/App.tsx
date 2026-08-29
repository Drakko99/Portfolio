import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import WebGLBackground from './components/WebGLBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsGallery from './components/ProjectsGallery';
import ExperienceTimeline from './components/ExperienceTimeline';
import TechStack from './components/TechStack';
import FloatingSocialBar from './components/FloatingSocialBar';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo out easing like Linear
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Section transitions with GSAP + ScrollTrigger
    gsap.utils.toArray('section').forEach((section, index) => {
      // Fade in and slide up on scroll
      gsap.fromTo(section,
        {
          opacity: 0.3,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtle parallax for each section
      gsap.to(section, {
        yPercent: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* WebGL Background */}
      <WebGLBackground />

      {/* Navigation */}
      <Navbar />

      {/* Floating Social Bar - Always visible with liquid effect */}
      <FloatingSocialBar />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <ProjectsGallery />
        <ExperienceTimeline />
        <TechStack />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
