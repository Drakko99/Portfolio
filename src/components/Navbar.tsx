import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

// Orden que coincide con el flujo de la página: Projects → Experience → Stack → Contact (Hero)
const navItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Stack', href: '#stack' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('projects');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Actualizar sección activa según scroll
            const sections = ['projects', 'experience', 'stack'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }

            // Si estamos arriba del todo, marcar como hero/contact
            if (window.scrollY < 300) {
                setActiveSection('hero');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        setMobileMenuOpen(false);
        if (href === '#top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl rounded-full border backdrop-blur-xl z-50 transition-all duration-300 ${scrolled
                        ? 'bg-surface-container-high/80 border-primary/30 shadow-[0_0_30px_rgba(176,45,41,0.2)]'
                        : 'bg-surface-container-high/60 border-primary/20 shadow-[0_0_20px_rgba(176,45,41,0.1)]'
                    }`}
            >
                <div className="flex justify-between items-center px-6 py-3 md:px-8">
                    {/* Logo - Solo "Adrián" */}
                    <motion.div
                        className="font-display text-lg md:text-xl font-bold burning-text tracking-tight cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => scrollToSection('#top')}
                    >
                        Adrián
                    </motion.div>

                    {/* Desktop Navigation - Orden corregido */}
                    <ul className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <button
                                    onClick={() => scrollToSection(item.href)}
                                    className={`relative transition-all duration-300 hover:scale-105 ${activeSection === item.href.split('#')[1]
                                            ? 'text-secondary'
                                            : 'text-on-surface-variant hover:text-secondary'
                                        }`}
                                >
                                    {item.label}
                                    {activeSection === item.href.split('#')[1] && (
                                        <motion.span
                                            layoutId="nav-active"
                                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary rounded-full shadow-[0_0_8px_rgba(236,106,6,0.5)]"
                                        />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Connect Button - Lleva al terminal en el hero */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block font-mono text-xs tracking-widest text-on-surface bg-surface-container hover:bg-secondary-container border border-primary/50 hover:border-secondary px-6 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,106,6,0.3)]"
                        onClick={() => scrollToSection('#top')}
                    >
                        CONNECT
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-on-surface hover:text-secondary transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 left-4 right-4 glass-panel rounded-xl p-6 z-40 md:hidden"
                    >
                        <ul className="flex flex-col gap-4 font-mono text-sm tracking-widest">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <button
                                        onClick={() => scrollToSection(item.href)}
                                        className={`w-full text-left py-2 transition-colors ${activeSection === item.href.split('#')[1]
                                                ? 'text-secondary'
                                                : 'text-on-surface-variant hover:text-secondary'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                            <li className="pt-2 border-t border-primary/20">
                                <button
                                    onClick={() => scrollToSection('#top')}
                                    className="w-full text-center font-mono text-xs tracking-widest bg-secondary-container hover:bg-primary-container border border-secondary/50 px-6 py-3 rounded-full transition-all"
                                >
                                    CONNECT
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
