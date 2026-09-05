import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect } from 'react';

import WebGLBackground from './components/WebGLBackground';
import Navbar from './components/Navbar';
import FloatingSocialBar from './components/FloatingSocialBar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import TechStackPage from './pages/TechStackPage';

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const routeOrder = ['/', '/projects', '/experience', '/stack'];

  const pageVariants: Variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15,
      scale: 0.95,
    }),
    animate: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      rotateY: direction > 0 ? -15 : 15,
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.55, 0.06, 0.68, 0.19] as const },
    }),
  };

  const getDirection = (): number => {
    const fromIndex = routeOrder.indexOf((location.state as any)?.from || '/');
    const toIndex = routeOrder.indexOf(location.pathname);
    if (fromIndex === -1 || toIndex === -1) return 1;
    return toIndex > fromIndex ? 1 : -1;
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        custom={getDirection()}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 w-full h-screen overflow-hidden"
        style={{ perspective: '1500px' }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/stack" element={<TechStackPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative w-full h-screen flex flex-col overflow-hidden">
        <WebGLBackground />
        <Navbar />
        <FloatingSocialBar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
