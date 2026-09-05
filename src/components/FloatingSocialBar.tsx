import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { socialLinks } from '../data/portfolioData';

export default function FloatingSocialBar() {
    return (
        <>
            {/* SVG Filter for Gooey/Liquid Effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 25 -10"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Floating Social Bar - Fixed Right Side */}
            <motion.div
                className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                {/* Container with gooey filter */}
                <div className="relative glass-panel rounded-2xl p-3 flex flex-col gap-4" style={{ filter: 'url(#goo)' }}>

                    {/* GitHub - Más grande y visible */}
                    <motion.a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-primary/30 border-2 border-primary/40 flex items-center justify-center text-primary hover:text-secondary transition-all duration-300 relative group shadow-lg shadow-primary/10"
                        whileHover={{ scale: 1.2, boxShadow: '0 0 25px rgba(236, 106, 6, 0.4)' }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiGithub size={22} />
                        {/* Tooltip */}
                        <span className="absolute right-full mr-4 px-3 py-1.5 bg-surface-container-high border border-primary/30 rounded-lg text-xs font-mono text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl">
                            GitHub
                        </span>
                    </motion.a>

                    {/* LinkedIn */}
                    <motion.a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-primary/30 border-2 border-primary/40 flex items-center justify-center text-primary hover:text-secondary transition-all duration-300 relative group shadow-lg shadow-primary/10"
                        whileHover={{ scale: 1.2, boxShadow: '0 0 25px rgba(236, 106, 6, 0.4)' }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiLinkedin size={22} />
                        {/* Tooltip */}
                        <span className="absolute right-full mr-4 px-3 py-1.5 bg-surface-container-high border border-primary/30 rounded-lg text-xs font-mono text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl">
                            LinkedIn
                        </span>
                    </motion.a>

                    {/* Email */}
                    <motion.a
                        href={`mailto:${socialLinks.email}`}
                        className="w-12 h-12 rounded-xl bg-primary/30 border-2 border-primary/40 flex items-center justify-center text-primary hover:text-secondary transition-all duration-300 relative group shadow-lg shadow-primary/10"
                        whileHover={{ scale: 1.2, boxShadow: '0 0 25px rgba(236, 106, 6, 0.4)' }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiMail size={22} />
                        {/* Tooltip */}
                        <span className="absolute right-full mr-4 px-3 py-1.5 bg-surface-container-high border border-primary/30 rounded-lg text-xs font-mono text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl">
                            Email
                        </span>
                    </motion.a>

                </div>
            </motion.div>
        </>
    );
}
