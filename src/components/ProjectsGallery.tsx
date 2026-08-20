import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '../data/portfolioData';
import { FiExternalLink, FiGithub, FiChevronRight } from 'react-icons/fi';

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="glass-panel rounded-xl min-w-[320px] md:min-w-[480px] aspect-[4/3] snap-center flex flex-col justify-end p-6 group transition-all duration-500 overflow-hidden relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="w-full h-full bg-gradient-to-br from-primary-container via-surface to-background"
                    animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.7 }}
                />

                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                        <pattern id={`grid-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ec6a06" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                    </svg>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-transparent" />

                {/* Red Tint Overlay */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col gap-3 border-l-2 border-secondary pl-4 py-1"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
            >
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className={`font-mono text-[10px] tracking-wider px-2 py-1 rounded-sm border ${index % 2 === 0
                                    ? 'text-secondary bg-secondary/10 border-secondary/30 shadow-[0_0_8px_rgba(236,106,6,0.1)]'
                                    : 'text-primary bg-primary/10 border-primary/30'
                                }`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-on-surface group-hover:text-secondary transition-colors drop-shadow-md">
                    {project.name}
                </h3>

                {/* Subtitle */}
                <p className="font-mono text-xs text-primary tracking-wider">
          // {project.subtitle}
                </p>

                {/* Description */}
                <motion.p
                    className={`font-body text-sm text-on-surface-variant transition-all duration-300 ${isHovered ? 'line-clamp-none' : 'line-clamp-2'
                        }`}
                >
                    {project.description}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    className="flex gap-3 pt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-mono text-xs text-primary hover:text-secondary transition-colors"
                    >
                        <FiGithub size={14} /> SOURCE
                    </a>
                </motion.div>
            </motion.div>

            {/* Glow Effect on Hover */}
            {isHovered && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}
        </motion.div>
    );
}

export default function ProjectsGallery() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" className="py-32 px-6 md:px-16 relative">
            {/* Neon Strip */}
            <motion.div
                className="neon-strip top-[15%] h-[70%]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.5 } : {}}
                transition={{ duration: 1 }}
            />

            {/* Section Header */}
            <motion.div
                ref={ref}
                className="flex items-center justify-between border-b border-primary/20 pb-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h2 className="font-display text-4xl md:text-5xl burning-text">
                    CORE_PROJECTS
                </h2>
                <motion.div
                    className="font-mono text-secondary flex items-center gap-2 animate-pulse"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <FiChevronRight /> SCROLL
                </motion.div>
            </motion.div>

            {/* Horizontal Scroll Gallery */}
            <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:-mx-16 md:px-16 pt-4">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
