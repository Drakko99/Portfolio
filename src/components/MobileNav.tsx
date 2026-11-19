import { motion } from 'framer-motion';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { FiBriefcase, FiGrid, FiHome, FiLayers } from 'react-icons/fi';
import { usePreferences } from '../context/preferences';
import { useMediaQuery } from '../hooks/useMediaQuery';

const pages = [
    { label: 'Home', href: '/', Icon: FiHome },
    { label: 'Projects', href: '/projects', Icon: FiGrid },
    { label: 'Experience', href: '/experience', Icon: FiBriefcase },
    { label: 'Stack', href: '/stack', Icon: FiLayers },
];

/** Mantiene la navegación móvil visible y desplaza el cristal hacia la ruta activa. */
export default function MobileNav() {
    const { pathname } = useLocation();
    const { reduceMotion } = usePreferences();
    const isMobile = useMediaQuery('(max-width: 700px)');
    const activeIndex = pages.findIndex(({ href }) =>
        matchPath({ path: href, end: href === '/' }, pathname)
    );

    if (!isMobile) return null;

    return (
        <nav className="mobile-nav" aria-label="Mobile navigation">
            <div className="mobile-nav-track">
                {/* El indicador permanece montado para animar también al usar Atrás o Adelante. */}
                <motion.span
                    className="mobile-nav-indicator"
                    aria-hidden="true"
                    initial={false}
                    animate={{
                        x: `${Math.max(0, activeIndex) * 100}%`,
                        opacity: activeIndex < 0 ? 0 : 1,
                    }}
                    transition={
                        reduceMotion
                            ? { duration: 0 }
                            : {
                                x: { type: 'spring', stiffness: 380, damping: 28, mass: 0.85 },
                                opacity: { duration: 0.16 },
                            }
                    }
                >
                    <span className="mobile-nav-lens" />
                </motion.span>
                {pages.map(({ label, href, Icon }) => (
                    <NavLink
                        key={href}
                        to={href}
                        end={href === '/'}
                        className={({ isActive }) =>
                            `mobile-nav-link${isActive ? ' is-active' : ''}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <motion.span
                                    className="mobile-nav-icon"
                                    aria-hidden="true"
                                    initial={false}
                                    animate={{
                                        y: isActive && !reduceMotion ? -2 : 0,
                                        scale: isActive && !reduceMotion ? 1.1 : 1,
                                    }}
                                    transition={
                                        reduceMotion
                                            ? { duration: 0 }
                                            : { type: 'spring', stiffness: 420, damping: 26 }
                                    }
                                >
                                    <Icon />
                                </motion.span>
                                <span className="mobile-nav-label">{label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}