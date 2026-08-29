import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTerminal } from 'react-icons/fi';
import { socialLinks } from '../data/portfolioData';

export default function FloatingSocialBar() {
    return (
        <>
            {/* SVG Filter for Gooey/Liquid Effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 20 -8"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Floating Social Bar - Fixed Right Side */}
            <motion.div
                className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
            >
                {/* Container with gooey filter */}
                <div className="relative glass-panel rounded-2xl p-2 flex flex-col gap-3" style={{ filter: 'url(#goo)' }}>

                    {/* GitHub */}
                    <motion.a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary hover:text-secondary transition-colors relative group"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiGithub size={18} />
                        {/* Tooltip */}
                        <span className="absolute right-full mr-3 px-2 py-1 bg-surface-container-high border border-primary/30 rounded-lg text-[10px] font-mono text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            GitHub
                        </span>
                    </motion.a>

                    {/* LinkedIn */}
                    <motion.a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary hover:text-secondary transition-colors relative group"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiLinkedin size={18} />
                        {/* Tooltip */}
                        <span className="absolute right-full mr-3 px-2 py-1 bg-surface-container-high border border-primary/30 rounded-lg text-[10px] font-mono text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            LinkedIn
                        </span>
                    </motion.a>

                    {/* Email */}
                    <motion.a
                        href={`mailto:${socialLinks.email}`}
                        className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary hover:text-secondary transition-colors relative group"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiMail size={18} />
                        {/* Tooltip */}
                        <span className="absolute right-full mr-3 px-2 py-1 bg-surface-container-high border border-primary/30 rounded-lg text-[10px] font-mono text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Email
                        </span>
                    </motion.a>

                    {/* Terminal Quick Access */}
                    <motion.button
                        onClick={() => {
                            const terminal = document.getElementById('terminal-input');
                            terminal?.focus();
                        }}
                        className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/30 flex items-center justify-center text-secondary hover:text-tertiary transition-colors relative group"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiTerminal size={18} />
                        {/* Tooltip */}
                        <span className="absolute right-full mr-3 px-2 py-1 bg-surface-container-high border border-secondary/30 rounded-lg text-[10px] font-mono text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Terminal
                        </span>
                    </motion.button>

                </div>

                {/* Scroll indicator dot */}
                <motion.div
                    className="w-1 h-8 rounded-full bg-gradient-to-b from-secondary to-primary opacity-50"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>
        </>
    );
}
