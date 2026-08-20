import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiCode } from 'react-icons/fi';
import { socialLinks } from '../data/portfolioData';

export default function Footer() {
    return (
        <footer className="w-full py-8 px-6 md:px-16 border-t border-primary/30 bg-surface-container-lowest/80 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 shadow-[0_-10px_30px_rgba(176,45,41,0.1)]">
            {/* Copyright */}
            <motion.div
                className="font-mono text-secondary text-xs tracking-wider opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                © {new Date().getFullYear()} ADRIÁN RODRÍGUEZ DEL RÍO // SYSTEM_ACTIVE
            </motion.div>

            {/* Links */}
            <div className="flex items-center gap-6">
                {[
                    { icon: FiGithub, href: socialLinks.github, label: 'GITHUB' },
                    { icon: FiLinkedin, href: socialLinks.linkedin, label: 'LINKEDIN' },
                    { icon: FiCode, href: '#', label: 'SOURCE' },
                ].map((link, index) => (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs tracking-wider text-primary hover:text-secondary transition-all px-3 py-1 rounded-sm border border-transparent hover:border-secondary/30 flex items-center gap-1 group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                            boxShadow: '0 0 10px rgba(236, 106, 6, 0.5)',
                            scale: 1.05
                        }}
                    >
                        <link.icon size={14} className="group-hover:text-secondary transition-colors" />
                        {link.label}
                    </motion.a>
                ))}
            </div>
        </footer>
    );
}
