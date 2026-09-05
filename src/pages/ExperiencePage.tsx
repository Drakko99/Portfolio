import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { experience } from '../data/portfolioData';
import { FiClock, FiMapPin, FiBriefcase } from 'react-icons/fi';

function TimelineItem({ exp, index }: { exp: typeof experience[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [isHovered, setIsHovered] = useState(false);

    // Alternar posición arriba/abajo de la línea
    const isTop = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            className="relative flex-1 min-w-[300px]"
            initial={{ opacity: 0, y: isTop ? -40 : 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            {/* Timeline Node on the line */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary z-20"
                animate={{
                    boxShadow: [
                        '0 0 5px rgba(236, 106, 6, 0.5)',
                        '0 0 15px rgba(236, 106, 6, 0.8)',
                        '0 0 5px rgba(236, 106, 6, 0.5)'
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Connector line from node to card */}
            <motion.div
                className={`absolute left-1/2 w-[2px] bg-secondary/30 z-10 ${isTop ? 'bottom-1/2 h-8' : 'top-1/2 h-8'
                    }`}
            />

            {/* Card */}
            <motion.div
                className={`glass-panel rounded-xl p-4 md:p-5 cursor-pointer group relative mx-4 ${isTop ? 'mb-16' : 'mt-16'
                    }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.03, y: -4 }}
            >
                {/* Always visible */}
                <h3 className="font-display text-base md:text-lg font-semibold text-primary group-hover:text-secondary transition-colors mb-1">
                    {exp.title}
                </h3>
                <p className="font-mono text-xs text-on-surface-variant flex items-center gap-1 mb-2">
                    <FiBriefcase size={10} /> {exp.company}
                </p>

                <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wider bg-secondary/10 px-2 py-1 rounded-full border border-secondary/20 text-secondary mb-3">
                    <FiClock size={9} /> {exp.period}
                </span>

                {/* Expandable on hover */}
                <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={isHovered ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="pt-3 border-t border-primary/20">
                        <div className="flex flex-wrap items-center gap-2 mb-2 text-[10px] font-mono text-on-surface-variant/70">
                            <span className="flex items-center gap-1">
                                <FiMapPin size={9} /> {exp.location}
                            </span>
                        </div>

                        <p className="font-body text-xs text-on-surface-variant mb-3 line-clamp-3">
                            {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {exp.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="font-mono text-[9px] tracking-wider px-2 py-0.5 rounded-sm bg-surface-container border border-primary/20 text-on-surface-variant"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                />
            </motion.div>
        </motion.div>
    );
}

export default function ExperiencePage() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-150px' });

    return (
        <section className="h-screen flex flex-col relative px-6 md:px-16 pt-28 pb-8 overflow-y-auto">
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
                className="border-b border-primary/20 pb-6 mb-12 text-center flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="font-mono text-secondary text-xs tracking-[0.3em] mb-2">
          // CAREER PATH
                </div>
                <h2 className="font-display text-4xl md:text-5xl burning-text mb-1">
                    PROFESSIONAL_OPS
                </h2>
            </motion.div>

            {/* Timeline Container - scrollable */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent pr-4">
                <div className="relative min-h-[600px] py-16">
                    {/* Horizontal Timeline Line */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.5, delay: 0.3 }}
                    />

                    {/* Timeline Items */}
                    <div className="flex justify-between items-center relative z-10 px-4">
                        {experience.map((exp, index) => (
                            <TimelineItem key={exp.id} exp={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
