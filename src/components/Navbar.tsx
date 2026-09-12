
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
    FiMenu,
    FiX,
    FiChevronDown,
    FiGithub,
    FiLinkedin,
    FiMail,
    FiArrowUpRight,
} from 'react-icons/fi';
import { useLocation, Link } from 'react-router-dom';
import { socialLinks } from '../data/portfolioData';

const navItems = [
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Stack', href: '/stack' },
];

const menuVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -12,
        scale: 0.94,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.06,
        },
    },
    exit: {
        opacity: 0,
        y: -8,
        scale: 0.97,
        filter: 'blur(5px)',
        transition: {
            duration: 0.18,
            ease: 'easeIn',
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        x: 14,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.25,
            ease: 'easeOut',
        },
    },
};

export default function Navbar() {
    const location = useLocation();
    return <NavbarContent key={location.key} />;
}

function NavbarContent() {
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

    const contactRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Cerrar Contact al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                contactRef.current &&
                !contactRef.current.contains(event.target as Node)
            ) {
                setContactDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Cerrar Contact con Escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setContactDropdownOpen(false);
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const isActive = (href: string) => location.pathname === href;

    const toggleContact = () => {
        setContactDropdownOpen((previous) => !previous);
    };

    const closeMenus = () => {
        setMobileMenuOpen(false);
        setContactDropdownOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[760px] rounded-full border backdrop-blur-xl z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-surface-container-high/80 border-primary/30 shadow-[0_0_30px_rgba(176,45,41,0.2)]'
                        : 'bg-surface-container-high/60 border-primary/20 shadow-[0_0_20px_rgba(176,45,41,0.1)]'
                }`}
            >
                {/* Navbar principal */}
                <div className="flex items-center px-4 sm:px-5 py-1.5 min-w-0">
                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={closeMenus}
                        className="font-display text-xl font-bold burning-text tracking-tight cursor-pointer hover:scale-105 transition-transform flex-shrink-0"
                    >
                        Adrián
                    </Link>

                    {/* Navegación desktop */}
                    <ul className="hidden md:flex items-center gap-1 flex-1 justify-center min-w-0">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.href}
                                    className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 rounded-full border transition-all duration-300 font-mono text-sm tracking-wide ${
                                        isActive(item.href)
                                            ? 'text-secondary bg-secondary/10 border-secondary/30'
                                            : 'text-on-surface-variant border-transparent hover:text-secondary hover:bg-primary/10'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Contact desktop */}
                    <div
                        ref={contactRef}
                        className="relative hidden md:block flex-shrink-0 ml-3"
                    >
                        <motion.button
                            type="button"
                            onClick={toggleContact}
                            aria-expanded={contactDropdownOpen}
                            aria-haspopup="true"
                            className={`relative flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors duration-300 font-mono text-sm tracking-wide ${
                                contactDropdownOpen
                                    ? 'text-secondary bg-secondary/10 border-secondary/30'
                                    : 'text-on-surface-variant border-transparent hover:text-secondary hover:bg-primary/10'
                            }`}
                            whileTap={{ scale: 0.96 }}
                        >
                            CONTACT

                            <FiChevronDown
                                size={12}
                                className={`transition-transform duration-300 ${
                                    contactDropdownOpen ? 'rotate-180' : ''
                                }`}
                            />

                            {/* Punto de estado */}
                            <span
                                className={`absolute top-1.5 right-2 w-1 h-1 rounded-full bg-secondary transition-opacity ${
                                    contactDropdownOpen
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                }`}
                            />
                        </motion.button>

                        {/* Dropdown flotante */}
                        <AnimatePresence>
                            {contactDropdownOpen && (
                                <motion.div
                                    variants={menuVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    role="menu"
                                    className="absolute top-full right-0 mt-4 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-primary/30 bg-surface-container-high/95 backdrop-blur-2xl shadow-[0_15px_60px_rgba(0,0,0,0.65)]"
                                >
                                    {/* Decoración superior */}
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />

                                    <div className="absolute top-0 right-5 w-16 h-16 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

                                    <div className="relative p-4">
                                        {/* Cabecera */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="flex items-center justify-between mb-4 px-1"
                                        >
                                            <div>
                                                <p className="font-mono text-[9px] tracking-[0.25em] text-secondary mb-1">
                                                    // CONNECT
                                                </p>

                                                <p className="font-display text-sm text-on-surface">
                                                    Find me online
                                                </p>
                                            </div>

                                            <span className="font-mono text-[9px] text-on-surface-variant/50">
                                                03 LINKS
                                            </span>
                                        </motion.div>

                                        <div className="flex flex-col gap-2">
                                            {/* GitHub */}
                                            <motion.a
                                                variants={itemVariants}
                                                href={socialLinks.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                role="menuitem"
                                                className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container border border-primary/20 hover:border-secondary/50 hover:bg-primary/20 transition-all duration-300 overflow-hidden"
                                            >
                                                <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-secondary/5 transition-all duration-300 pointer-events-none" />

                                                <FiGithub
                                                    size={19}
                                                    className="relative z-10 text-primary group-hover:text-secondary transition-colors duration-300"
                                                />

                                                <div className="relative z-10 flex-1 min-w-0">
                                                    <div className="font-mono text-xs text-on-surface group-hover:text-secondary transition-colors">
                                                        GitHub
                                                    </div>

                                                    <div className="font-mono text-[10px] text-on-surface-variant/60 truncate">
                                                        @Drakko99
                                                    </div>
                                                </div>

                                                <FiArrowUpRight
                                                    size={14}
                                                    className="relative z-10 text-on-surface-variant/40 group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                                                />
                                            </motion.a>

                                            {/* LinkedIn */}
                                            <motion.a
                                                variants={itemVariants}
                                                href={socialLinks.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                role="menuitem"
                                                className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container border border-primary/20 hover:border-secondary/50 hover:bg-primary/20 transition-all duration-300 overflow-hidden"
                                            >
                                                <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-secondary/5 transition-all duration-300 pointer-events-none" />

                                                <FiLinkedin
                                                    size={19}
                                                    className="relative z-10 text-primary group-hover:text-secondary transition-colors duration-300"
                                                />

                                                <div className="relative z-10 flex-1 min-w-0">
                                                    <div className="font-mono text-xs text-on-surface group-hover:text-secondary transition-colors">
                                                        LinkedIn
                                                    </div>

                                                    <div className="font-mono text-[10px] text-on-surface-variant/60 truncate">
                                                        Adrián Rodríguez del Río
                                                    </div>
                                                </div>

                                                <FiArrowUpRight
                                                    size={14}
                                                    className="relative z-10 text-on-surface-variant/40 group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                                                />
                                            </motion.a>

                                            {/* Email */}
                                            <motion.a
                                                variants={itemVariants}
                                                href={`mailto:${socialLinks.email}`}
                                                role="menuitem"
                                                className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container border border-primary/20 hover:border-secondary/50 hover:bg-primary/20 transition-all duration-300 overflow-hidden"
                                            >
                                                <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-secondary/5 transition-all duration-300 pointer-events-none" />

                                                <FiMail
                                                    size={19}
                                                    className="relative z-10 text-primary group-hover:text-secondary transition-colors duration-300"
                                                />

                                                <div className="relative z-10 flex-1 min-w-0">
                                                    <div className="font-mono text-xs text-on-surface group-hover:text-secondary transition-colors">
                                                        Email
                                                    </div>

                                                    <div className="font-mono text-[10px] text-on-surface-variant/60 truncate">
                                                        {socialLinks.email}
                                                    </div>
                                                </div>

                                                <FiArrowUpRight
                                                    size={14}
                                                    className="relative z-10 text-on-surface-variant/40 group-hover:text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                                                />
                                            </motion.a>
                                        </div>

                                        {/* Pie */}
                                        <motion.div
                                            variants={itemVariants}
                                            className="flex items-center gap-2 mt-4 px-1"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(236,106,6,0.7)]" />

                                            <span className="font-mono text-[9px] text-on-surface-variant/50 tracking-wider">
                                                AVAILABLE FOR OPPORTUNITIES
                                            </span>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Botón móvil */}
                    <button
                        type="button"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                        className="md:hidden ml-auto text-on-surface hover:text-secondary transition-colors p-2"
                        onClick={() => setMobileMenuOpen((previous) => !previous)}
                    >
                        {mobileMenuOpen ? (
                            <FiX size={24} />
                        ) : (
                            <FiMenu size={24} />
                        )}
                    </button>
                </div>
            </motion.nav>

            {/* Menú móvil */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="fixed top-20 left-4 right-4 glass-panel rounded-2xl p-6 z-40 md:hidden border border-primary/30"
                    >
                        <ul className="flex flex-col gap-3">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.href}
                                        onClick={closeMenus}
                                        className={`block w-full text-center py-3 rounded-lg border transition-colors font-mono text-sm tracking-wider ${
                                            isActive(item.href)
                                                ? 'text-secondary bg-secondary/10 border-secondary/30'
                                                : 'text-on-surface-variant border-transparent hover:text-secondary hover:bg-primary/10'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}

                            <li>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setContactDropdownOpen(true);
                                    }}
                                    className="w-full text-center py-3 rounded-lg border border-transparent text-on-surface-variant hover:text-secondary hover:bg-primary/10 transition-colors font-mono text-sm tracking-wider"
                                >
                                    CONTACT
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}