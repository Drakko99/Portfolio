import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { techStack } from '../data/portfolioData';
import { FiCode, FiTool, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function SkillBar({ skill, index }: { skill: typeof techStack.languages[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            className="group"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="flex justify-between items-center mb-2">
                <span className={`font-mono text-sm font-semibold ${skill.color}`}>{skill.name}</span>
                <motion.span
                    className="font-mono text-xs text-on-surface-variant"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3 }}
                >
                    {skill.level}%
                </motion.span>
            </div>
            <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${index % 2 === 0 ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gradient-to-r from-secondary to-tertiary'
                        }`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
                />
            </div>
        </motion.div>
    );
}

function TechChip({ tech, index }: { tech: typeof techStack.allTools[0]; index: number }) {
    const categoryColors: Record<string, string> = {
        Frontend: 'border-cyan-500/30 text-cyan-400',
        Backend: 'border-green-500/30 text-green-400',
        Mobile: 'border-blue-500/30 text-blue-400',
        Database: 'border-yellow-500/30 text-yellow-400',
        DevOps: 'border-purple-500/30 text-purple-400',
        Systems: 'border-orange-500/30 text-orange-400',
        Tools: 'border-pink-500/30 text-pink-400',
    };

    const colorClass = categoryColors[tech.category] || 'border-primary/30 text-on-surface';

    return (
        <motion.span
            className={`font-mono text-xs tracking-wider px-3 py-2 rounded-lg glass-panel border ${colorClass} hover:border-secondary transition-all duration-300 cursor-default group flex items-center gap-1.5`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 }}
            whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px rgba(236, 106, 6, 0.3)'
            }}
        >
            <span className="text-[9px] opacity-60">{tech.category}</span>
            <span className="font-semibold">{tech.name}</span>
        </motion.span>
    );
}

export default function TechStackPage() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const navigate = useNavigate();

    return (
        <section className="min-h-screen py-32 px-6 md:px-16 relative">
            {/* Neon Strip */}
            <motion.div
                className="neon-strip top-[15%] h-[70%]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.5 } : {}}
                transition={{ duration: 1 }}
            />

            {/* Back Button */}
            <motion.button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 font-mono text-xs tracking-wider text-on-surface-variant hover:text-secondary mb-8 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
                <FiArrowLeft size={14} /> BACK TO HOME
            </motion.button>

            {/* Section Header */}
            <motion.div
                ref={ref}
                className="border-b border-primary/20 pb-8 mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="font-mono text-secondary text-xs tracking-[0.3em] mb-2">
          // TOOLS & TECHNOLOGIES
                </div>
                <h2 className="font-display text-4xl md:text-6xl burning-text mb-2">
                    TECH_STACK
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full max-w-6xl">
                {/* Languages */}
                <motion.div
                    className="lg:col-span-2 glass-panel p-8 rounded-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-2 mb-8">
                        <FiCode className="text-secondary" size={24} />
                        <h3 className="font-display text-xl font-semibold text-on-surface tracking-wider">LANGUAGES</h3>
                    </div>
                    <div className="space-y-5">
                        {techStack.languages.map((skill, index) => (
                            <SkillBar key={skill.name} skill={skill} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* All Tools */}
                <motion.div
                    className="lg:col-span-3 glass-panel p-8 rounded-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center gap-2 mb-8">
                        <FiTool className="text-secondary" size={24} />
                        <h3 className="font-display text-xl font-semibold text-on-surface tracking-wider">FRAMEWORKS & TOOLS</h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        {techStack.allTools.map((tech, index) => (
                            <TechChip key={tech.name} tech={tech} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
