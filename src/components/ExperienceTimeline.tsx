import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { experience } from '../data/portfolioData';
import { FiBriefcase, FiClock } from 'react-icons/fi';

function ExperienceCard({ exp, index }: { exp: typeof experience[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            className="glass-panel p-6 md:p-8 rounded-xl group hover:border-secondary transition-all duration-500 relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
        >
            {/* Hover Glow */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2 relative z-10">
                <div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-primary group-hover:text-secondary transition-colors">
                        {exp.title}
                    </h3>
                    <p className="font-mono text-sm text-on-surface-variant mt-1">
                        @ {exp.company}
                    </p>
                </div>
                <motion.span
                    className="font-mono text-secondary text-xs tracking-wider flex items-center gap-1 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20"
                    whileHover={{ scale: 1.05 }}
                >
                    <FiClock size={12} /> {exp.period}
                </motion.span>
            </div>

            {/* Description */}
            <p className="font-body text-sm md:text-base text-on-surface-variant mb-4 relative z-10">
                {exp.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 relative z-10">
                {exp.tech.map((tech) => (
                    <span
                        key={tech}
                        className="font-mono text-[10px] tracking-wider px-2 py-1 rounded-sm bg-surface-container border border-primary/30 text-on-surface-variant group-hover:border-secondary/50 transition-colors"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* Timeline Connector */}
            <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-secondary to-primary rounded-full opacity-50"
                animate={{ height: [32, 48, 32] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>
    );
}

export default function ExperienceTimeline() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="experience" className="min-h-screen flex items-center py-24 px-6 md:px-16 relative">
            {/* Neon Strip */}
            <motion.div
                className="neon-strip top-[10%] h-[80%]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.5 } : {}}
                transition={{ duration: 1 }}
            />

            {/* Section Header */}
            <motion.div
                ref={ref}
                className="border-b border-primary/20 pb-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <FiBriefcase className="text-secondary" size={24} />
                    <h2 className="font-display text-4xl md:text-5xl burning-text">
                        PROFESSIONAL_OPS
                    </h2>
                </div>
            </motion.div>

            {/* Timeline */}
            <div className="flex flex-col gap-6 pl-8 border-l border-primary/20 ml-4 max-w-3xl">
                {experience.map((exp, index) => (
                    <ExperienceCard key={exp.id} exp={exp} index={index} />
                ))}
            </div>
        </section>
    );
}
