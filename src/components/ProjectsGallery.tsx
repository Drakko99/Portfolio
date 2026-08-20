import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '../data/portfolioData';
import { FiExternalLink, FiGithub, FiChevronRight, FiPlay } from 'react-icons/fi';

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    // Patrones SVG diferentes para cada proyecto
    const patterns = [
        // Patrón 1: Hexágonos (Juego del Impostor)
        `<svg width="100%" height="100%"><defs><pattern id="hex-${index}" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse"><path d="M30 0L60 17v18L30 52 0 35V17z" fill="none" stroke="#ec6a06" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100%" height="100%" fill="url(#hex-${index})"/></svg>`,
        // Patrón 2: Ondas (MonitorStockTS)
        `<svg width="100%" height="100%"><defs><pattern id="wave-${index}" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse"><path d="M0 20 Q20 5, 40 20 T80 20" fill="none" stroke="#b02d29" stroke-width="1" opacity="0.3"/></pattern></defs><rect width="100%" height="100%" fill="url(#wave-${index})"/></svg>`,
        // Patrón 3: Cuadrícula (Game Library)
        `<svg width="100%" height="100%"><defs><pattern id="grid-${index}" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="20" height="20" fill="#ec6a06" opacity="0.05"/><rect x="20" y="20" width="20" height="20" fill="#b02d29" opacity="0.05"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid-${index})"/></svg>`,
    ];

    return (
        <motion.div
            className="glass-panel rounded-xl min-w-[340px] md:min-w-[420px] flex flex-col overflow-hidden relative cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
        >
            {/* Top visual area with pattern */}
            <div className="h-48 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-container via-surface to-background"
                    animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.7 }}
                />

                {/* Pattern overlay */}
                <div
                    className="absolute inset-0 opacity-60"
                    dangerouslySetInnerHTML={{ __html: patterns[index % patterns.length] }}
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-primary/20" />

                {/* Status badge */}
                {project.published && (
                    <motion.div
                        className="absolute top-3 right-3 flex items-center gap-1 bg-secondary/20 border border-secondary/40 px-2 py-1 rounded-full text-[10px] font-mono text-secondary"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                    >
                        <FiPlay size={10} /> PUBLISHED
                    </motion.div>
                )}

                {/* Tech tags floating */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {project.tech.slice(0, 2).map((tech) => (
                        <span
                            key={tech}
                            className="font-mono text-[9px] tracking-wider px-2 py-0.5 rounded-sm bg-background/80 border border-secondary/30 text-secondary"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content area */}
            <div className="p-5 flex flex-col gap-2 flex-1">
                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl font-semibold text-on-surface group-hover:text-secondary transition-colors">
                    {project.name}
                </h3>

                {/* Subtitle */}
                <p className="font-mono text-[10px] text-primary tracking-wider">
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
                    className="flex gap-3 mt-auto pt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 5 }}
                    transition={{ duration: 0.3 }}
                >
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-mono text-[10px] text-primary hover:text-secondary transition-colors group/link"
                    >
                        <FiGithub size={12} /> SOURCE
                    </a>

                    {project.published && project.store && (
                        <a
                            href={project.store}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-mono text-[10px] text-secondary hover:text-tertiary transition-colors group/link"
                        >
                            <FiPlay size={12} /> PLAY STORE <FiExternalLink size={10} />
                        </a>
                    )}
                </motion.div>
            </div>

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
    const scrollRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Función para hacer scroll horizontal con el botón
    const handleScrollClick = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 450, behavior: 'smooth' });
        }
    };

    return (
        <section id="projects" className="min-h-screen flex items-center py-24 px-6 md:px-16 relative">
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
                className="flex items-center justify-between border-b border-primary/20 pb-4 mb-8 w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h2 className="font-display text-4xl md:text-5xl burning-text">
                    CORE_PROJECTS
                </h2>
                {/* Botón scroll que SÍ funciona */}
                <motion.button
                    onClick={handleScrollClick}
                    className="font-mono text-secondary flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiChevronRight /> SCROLL
                </motion.button>
            </motion.div>

            {/* Horizontal Scroll Gallery */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:-mx-16 md:px-16 pt-4"
            >
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
