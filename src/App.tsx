import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
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

  const reduceMotion = useReducedMotion();

  const pageVariants: Variants = {
    initial: { y: 12, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: reduceMotion ? 0 : 0.24 } },
    exit: { opacity: 0, transition: { duration: reduceMotion ? 0 : 0.12 } },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial={reduceMotion ? false : 'initial'}
        animate="animate"
        exit={reduceMotion ? undefined : "exit"}
        className="relative z-10 w-full flex-1 min-h-0"
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
      <div className="relative w-full min-h-svh flex flex-col overflow-x-clip">
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
