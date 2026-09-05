import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useLocation, Link } from 'react-router-dom';
import { socialLinks } from '../data/portfolioData';

const navItems = [
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Stack', href: '/stack' },
];

export default function Navbar() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setContactDropdownOpen(false);
    }, [location]);

    const isActive = (href: string) => location.pathname === href;

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border backdrop-blur-xl z-50 transition-all duration-300 ${scrolled
                        ? 'bg-surface-container-high/80 border-primary/30 shadow-[0_0_30px_rgba(176,45,41,0.2)]'
                        : 'bg-surface-container-high/60 border-primary/20 shadow-[0_0_20px_rgba(176,45,41,0.1)]'
                    }`}
            >
                <div className="flex items-center px-8 py-3">
                    {/* 1. Logo - Left */}
                    <Link
                        to="/"
                        className="font-display text-xl font-bold burning-text tracking-tight cursor-pointer hover:scale-105 transition-transform flex-shrink-0"
                    >
                        Adrián
                    </Link>

                    {/* 2. Nav Items - Center (flex-1 + justify-center) */}
                    <ul className="flex items-center gap-3 flex-1 justify-center">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.href}
                                    className={`px-5 py-2 rounded-full transition-all duration-300 font-mono text-xs tracking-wider ${isActive(item.href)
                                            ? 'text-secondary bg-secondary/10 border border-secondary/30'
                                            : 'text-on-surface-variant hover:text-secondary hover:bg-primary/10'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* 3. CONTACT Dropdown - Right (relative wrapper for absolute dropdown) */}
                    <div className="relative flex-shrink-0">
                        <motion.button
                            onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
                            className={`flex items-center gap-1.5 px-5 py-2 rounded-full transition-all duration-300 font-mono text-xs tracking-wider ${contactDropdownOpen
                                    ? 'text-secondary bg-secondary/10 border border-secondary/30'
                                    : 'text-on-surface-variant hover:text-secondary hover:bg-primary/10'
                                }`}
                        >
                            CONTACT <FiChevronDown size={12} className={`transition-transform ${contactDropdownOpen ? 'rotate-180' : ''}`} />
                        </motion.button>

                        {/* Dropdown - absolutely positioned relative to wrapper, doesn't affect navbar layout */}
                        <AnimatePresence>
                            {contactDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full right-0 mt-3 w-72 glass-panel rounded-xl p-4 border border-primary/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50"
                                >
                                    <div className="flex flex-col gap-2">
                                        <a
                                            href={socialLinks.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-container hover:bg-primary/20 border border-primary/20 hover:border-secondary/40 transition-all duration-200 group"
                                        >
                                            <FiGithub size={18} className="text-primary group-hover:text-secondary transition-colors" />
                                            <div>
                                                <div className="font-mono text-xs text-on-surface">GitHub</div>
                                                <div className="font-mono text-[10px] text-on-surface-variant/60">@Drakko99</div>
                                            </div>
                                        </a>

                                        <a
                                            href={socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-container hover:bg-primary/20 border border-primary/20 hover:border-secondary/40 transition-all duration-200 group"
                                        >
                                            <FiLinkedin size={18} className="text-primary group-hover:text-secondary transition-colors" />
                                            <div>
                                                <div className="font-mono text-xs text-on-surface">LinkedIn</div>
                                                <div className="font-mono text-[10px] text-on-surface-variant/60">Adrián Rodríguez del Río</div>
                                            </div>
                                        </a>

                                        <a
                                            href={`mailto:${socialLinks.email}`}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-container hover:bg-primary/20 border border-primary/20 hover:border-secondary/40 transition-all duration-200 group"
                                        >
                                            <FiMail size={18} className="text-primary group-hover:text-secondary transition-colors" />
                                            <div>
                                                <div className="font-mono text-xs text-on-surface">Email</div>
                                                <div className="font-mono text-[10px] text-on-surface-variant/60">{socialLinks.email}</div>
                                            </div>
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden ml-4 text-on-surface hover:text-secondary transition-colors"
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
                        <ul className="flex flex-col gap-3">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.href}
                                        className={`w-full text-center py-3 rounded-lg transition-colors font-mono text-sm tracking-wider ${isActive(item.href)
                                                ? 'text-secondary bg-secondary/10 border border-secondary/30'
                                                : 'text-on-surface-variant hover:text-secondary hover:bg-primary/10'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
