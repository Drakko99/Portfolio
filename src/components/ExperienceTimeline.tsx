import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { experience } from '../data/portfolioData';
import { FiBriefcase, FiClock, FiMapPin, FiChevronDown, FiChevronUp } from 'react-icons/fi';

function TimelineNode({ exp, index, isLast }: { exp: typeof experience[0]; index: number; isLast: boolean }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            ref={ref}
            className="relative flex gap-6 md:gap-8 group"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            {/* Timeline Line */}
            {!isLast && (
                <motion.div
                    className="absolute left-[19px] md:left-[23px] top-12 bottom-[-24px] w-[2px] bg-gradient-to-b from-secondary via-primary to-transparent"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: '100%' } : {}}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                />
            )}

            {/* Timeline Node */}
            <motion.div
                className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full glass-panel border-2 border-secondary/50 flex items-center justify-center group-hover:border-secondary transition-all duration-300"
                whileHover={{ scale: 1.1 }}
            >
                <motion.div
                    className="w-3 h-3 rounded-full bg-secondary"
                    animate={{
                        boxShadow: [
                            '0 0 5px rgba(236, 106, 6, 0.5)',
                            '0 0 15px rgba(236, 106, 6, 0.8)',
                            '0 0 5px rgba(236, 106, 6, 0.5)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            {/* Content Card */}
            <motion.div
                className="flex-1 glass-panel rounded-xl p-4 md:p-6 cursor-pointer group/card hover:border-secondary/50 transition-all duration-300"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ y: -2 }}
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-2">
                    <div>
                        <h3 className="font-display text-lg md:text-xl font-semibold text-primary group-hover/card:text-secondary transition-colors">
                            {exp.title}
                        </h3>
                        <p className="font-mono text-sm text-on-surface-variant mt-0.5">
                            @ {exp.company}
                        </p>
                    </div>

                    {/* Period Badge */}
                    <motion.span
                        className="font-mono text-secondary text-[10px] tracking-wider flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-full border border-secondary/20 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                    >
                        <FiClock size={10} /> {exp.period}
                    </motion.span>
                </div>

                {/* Location & Type */}
                <div className="flex flex-wrap items-center gap-3 mb-2 text-[10px] md:text-xs font-mono text-on-surface-variant/70">
                    <span className="flex items-center gap-1">
                        <FiMapPin size={10} /> {exp.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    <span>{exp.type}</span>
                </div>

                {/* Description */}
                <motion.p
                    className={`font-body text-sm text-on-surface-variant transition-all duration-300 ${isExpanded ? 'line-clamp-none' : 'line-clamp-2'
                        }`}
                >
                    {exp.description}
                </motion.p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.tech.map((tech) => (
                        <span
                            key={tech}
                            className="font-mono text-[9px] tracking-wider px-2 py-0.5 rounded-sm bg-surface-container border border-primary/20 text-on-surface-variant group-hover/card:border-secondary/30 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Expand/Collapse Indicator */}
                <motion.div
                    className="flex items-center justify-end gap-1 mt-2 text-[10px] font-mono text-secondary/50 group-hover/card:text-secondary transition-colors"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <span>{isExpanded ? 'SHOW LESS' : 'READ MORE'}</span>
                    {isExpanded ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function ExperienceTimeline() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-150px' });

    return (
        <section id="experience" className="py-24 md:py-32 px-6 md:px-16 relative">
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
                className="border-b border-primary/20 pb-4 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <FiBriefcase className="text-secondary" size={24} />
                    <h2 className="font-display text-3xl md:text-5xl burning-text">
                        PROFESSIONAL_OPS
                    </h2>
                </div>
                <p className="font-mono text-xs text-on-surface-variant/60 tracking-wider mt-1">
                    CAREER TIMELINE // {experience.length} POSITIONS
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="flex flex-col gap-4 md:gap-6 max-w-4xl pl-2">
                {experience.map((exp, index) => (
                    <TimelineNode
                        key={exp.id}
                        exp={exp}
                        index={index}
                        isLast={index === experience.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
