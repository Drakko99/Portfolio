import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { forwardRef, useEffect, useRef, type ReactNode } from 'react';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import TechStackPage from './pages/TechStackPage';
import PreferencesProvider from './context/PreferencesProvider';
import { usePreferences } from './context/preferences';
const titles: Record<string, string> = { '/': 'Full-stack development and systems', '/projects': 'Projects', '/experience': 'Experience', '/stack': 'Stack' };
function NotFound() { return <section className="page not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>There is no code here yet.</h1><Link to="/" className="neon-button">Back to home</Link></section>; }
const PageTransition = forwardRef<HTMLDivElement, { children: ReactNode }>(function PageTransition({ children }, ref) {
    const present = useIsPresent();
    const { reduceMotion } = usePreferences();
    return <motion.div ref={ref} inert={!present} aria-hidden={!present || undefined} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.22 }} className="route-content">{children}</motion.div>;
});
function AnimatedRoutes() {
    const location = useLocation();
    const main = useRef<HTMLElement>(null);
    const firstRender = useRef(true);
    useEffect(() => {
        document.title = `${titles[location.pathname] || 'Page not found'} · Adrián Rodríguez`;
        if (firstRender.current) { firstRender.current = false; return; }
        // The route is already committed; focus never falls back to an obsolete page.
        main.current?.focus({ preventScroll: true });
        if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname, location.hash]);
    useEffect(() => {
        if (!location.hash) return;
        let id = location.hash.slice(1);
        try { id = decodeURIComponent(id); } catch { /* Malformed external fragments must not crash navigation. */ }
        const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'center', behavior: 'instant' }));
        return () => cancelAnimationFrame(frame);
    }, [location.key, location.hash]);
    return <main ref={main} id="main-content" tabIndex={-1} className="app-main">
        <AnimatePresence initial={false} mode="popLayout">
            <PageTransition key={location.pathname}>
                <Routes location={location}><Route path="/" element={<HomePage />} /><Route path="/projects" element={<ProjectsPage />} /><Route path="/experience" element={<ExperiencePage />} /><Route path="/stack" element={<TechStackPage />} /><Route path="*" element={<NotFound />} /></Routes>
            </PageTransition>
        </AnimatePresence>
    </main>;
}
export default function App() {
    return <BrowserRouter><PreferencesProvider><div className="app-shell"><a href="#main-content" className="skip-link">Skip to content</a><AmbientBackground /><Navbar /><AnimatedRoutes /><Footer /></div></PreferencesProvider></BrowserRouter>;
}
