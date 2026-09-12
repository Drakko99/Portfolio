import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '../data/portfolioData';
import { FiGithub, FiExternalLink, FiPlay, FiCode } from 'react-icons/fi';

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [isHovered, setIsHovered] = useState(false);

    const isLeft = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            className={`flex items-center gap-8 md:gap-16 mb-20 last:mb-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
        >
            {/* Project Card - takes full available width */}
            <motion.div
                className="w-full glass-panel rounded-2xl overflow-hidden cursor-pointer group relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(176, 45, 41, 0.3)' }}
            >
                {/* Visual Area */}
                <div className="h-52 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary-container via-surface to-background"
                        animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
                        transition={{ duration: 0.7 }}
                    />

                    <div className="absolute inset-0 opacity-40">
                        {index === 0 && (
                            <svg width="100%" height="100%">
                                <defs>
                                    <pattern id={`hex-${index}`} x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                                        <path d="M30 0L60 17v18L30 52 0 35V17z" fill="none" stroke="#ec6a06" strokeWidth="0.5" opacity="0.4" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill={`url(#hex-${index})`} />
                            </svg>
                        )}
                        {index === 1 && (
                            <svg width="100%" height="100%">
                                <defs>
                                    <pattern id={`wave-${index}`} x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M0 20 Q20 5, 40 20 T80 20" fill="none" stroke="#b02d29" strokeWidth="1" opacity="0.4" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill={`url(#wave-${index})`} />
                            </svg>
                        )}
                        {index === 2 && (
                            <svg width="100%" height="100%">
                                <defs>
                                    <pattern id={`grid-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="20" height="20" fill="#ec6a06" opacity="0.08" />
                                        <rect x="20" y="20" width="20" height="20" fill="#b02d29" opacity="0.08" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
                            </svg>
                        )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-primary/20" />

                    {project.published && (
                        <motion.div
                            className="absolute top-4 right-4 flex items-center gap-1.5 bg-secondary/20 border border-secondary/40 px-3 py-1.5 rounded-full text-xs font-mono text-secondary shadow-lg"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <FiPlay size={12} /> PUBLISHED
                        </motion.div>
                    )}

                    <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="font-mono text-[9px] tracking-wider px-2 py-1 rounded-sm bg-background/80 border border-secondary/30 text-secondary"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <motion.div
                        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary"
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                    >
                        <FiCode size={16} />
                    </motion.div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                    <h3 className="font-display text-xl font-semibold text-on-surface group-hover:text-secondary transition-colors mb-1">
                        {project.name}
                    </h3>
                    <p className="font-mono text-xs text-primary tracking-wider mb-2">
            // {project.subtitle}
                    </p>

                    <motion.p
                        className={`font-body text-sm text-on-surface-variant transition-all duration-300 ${isHovered ? 'line-clamp-none' : 'line-clamp-2'
                            }`}
                    >
                        {project.description}
                    </motion.p>

                    <motion.div
                        className="flex gap-3 mt-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-mono text-xs text-primary hover:text-secondary transition-colors px-3 py-2 rounded-lg bg-surface-container border border-primary/20 hover:border-secondary/40"
                        >
                            <FiGithub size={14} /> SOURCE CODE
                        </a>

                        {project.published && project.store && (
                            <a
                                href={project.store}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 font-mono text-xs text-secondary hover:text-tertiary transition-colors px-3 py-2 rounded-lg bg-surface-container border border-secondary/20 hover:border-secondary/40"
                            >
                                <FiPlay size={14} /> PLAY STORE <FiExternalLink size={12} />
                            </a>
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Info Panel */}
            <div className="w-full flex items-center">
                <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                >
                    <div className="font-mono text-secondary text-xs tracking-[0.3em] mb-2">
                        PROJECT_{String(index + 1).padStart(2, '0')}
                    </div>

                    <h4 className="font-display text-3xl md:text-5xl font-bold burning-text mb-4">
                        {project.name}
                    </h4>

                    <div className={`flex flex-wrap gap-2 mb-6 ${isLeft ? 'justify-start' : 'md:justify-end'}`}>
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="font-mono text-xs px-3 py-1.5 rounded-lg glass-panel border border-primary/20 text-on-surface-variant"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className={`flex gap-6 ${isLeft ? 'justify-start' : 'md:justify-end'}`}>
                        <div className="text-center">
                            <div className="font-mono text-secondary text-lg font-bold">{project.tech.length}</div>
                            <div className="font-mono text-[10px] text-on-surface-variant/60 tracking-wider">TECHS</div>
                        </div>
                        {project.published && (
                            <div className="text-center">
                                <FiPlay className="mx-auto text-secondary mb-0.5" size={18} />
                                <div className="font-mono text-[10px] text-on-surface-variant/60 tracking-wider">LIVE</div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function ProjectsPage() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section className="h-[var(--page-height)] flex flex-col relative px-12 md:px-24 pt-28 pb-8 overflow-y-auto">
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
                className="border-b border-primary/20 pb-6 mb-12 flex-shrink-0"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="font-mono text-secondary text-xs tracking-[0.3em] mb-2">
          // FEATURED WORK
                </div>
                <h2 className="font-display text-4xl md:text-5xl burning-text mb-1">
                    CORE_PROJECTS
                </h2>
            </motion.div>

            {/* Projects - scrollable area */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent pr-4">
                {projects.map((project, index) => (
                    <ProjectRow key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
