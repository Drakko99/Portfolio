import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { profile, socialLinks, techStack } from '../data/portfolioData';
import { FiGithub, FiLinkedin, FiMail, FiTerminal, FiArrowRight, FiCode, FiLayers, FiServer } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const commands = [
    { cmd: 'help', response: 'Available commands:\n- about: Learn who I am\n- skills: View my tech stack\n- projects: See my work\n- contact: Get in touch\n- clear: Clear terminal' },
    { cmd: 'about', response: `${profile.name} (${profile.handle})\n${profile.role}\n\nPassionate about accessible development and efficient technology solutions. Based in Ponferrada, Spain.` },
    { cmd: 'skills', response: 'Core Stack:\n- Languages: TypeScript, PHP, JavaScript, Java, Dart\n- Frontend: React, Next.js, Vue.js, Angular\n- Backend: Laravel, Node.js, Spring Boot\n- Mobile: Flutter, Ionic\n- DevOps: Docker, Kubernetes, Linux Admin' },
    { cmd: 'projects', response: 'Featured Projects:\n- Juego del Impostor (Flutter - Google Play)\n- MonitorStockTS (TypeScript/Node.js)\n- Game Library Web (Next.js)' },
    { cmd: 'contact', response: `Get in touch:\n- GitHub: github.com/Drakko99\n- LinkedIn: linkedin.com/in/adrián-rodríguez-del-río` },
];

function Terminal() {
    const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
        { type: 'output', content: `╔══════════════════════════════════╗` },
        { type: 'output', content: `║   ${profile.handle.toUpperCase()} TERMINAL v2.0  ║` },
        { type: 'output', content: `╚══════════════════════════════════╝` },
        { type: 'output', content: `\nWelcome! Type "help" for available commands.\n` },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 300);
    }, []);

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newHistory = [...history, { type: 'input' as const, content: input }];
        const cmd = input.toLowerCase().trim();

        if (cmd === 'clear') {
            setHistory([
                { type: 'output', content: `╔══════════════════════════════════╗` },
                { type: 'output', content: `║   ${profile.handle.toUpperCase()} TERMINAL v2.0  ║` },
                { type: 'output', content: `╚══════════════════════════════════╝` },
            ]);
        } else {
            const command = commands.find(c => c.cmd === cmd);
            const response = command
                ? command.response
                : `Unknown command: "${cmd}". Type "help".`;
            newHistory.push({ type: 'output' as const, content: `\n${response}\n` });
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <motion.div
            className="glass-panel rounded-2xl overflow-hidden font-mono text-base w-full max-w-3xl shadow-2xl shadow-primary/10"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <div className="bg-surface-container-high px-4 py-3 flex items-center justify-between border-b border-primary/20">
                <div className="flex items-center gap-2">
                    <FiTerminal size={16} className="text-secondary" />
                    <span className="text-xs text-on-surface-variant">drakko@portfolio:~</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
            </div>

            <div
                className="p-6 h-[420px] overflow-y-auto bg-background/95 cursor-text scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((entry, index) => (
                    <motion.div
                        key={index}
                        className={`mb-2 ${entry.type === 'input' ? 'text-secondary font-semibold' : 'text-on-surface-variant'}`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        {entry.type === 'input' ? (
                            <span>
                                <span className="text-primary">➜ ~ </span>{entry.content}
                            </span>
                        ) : (
                            <pre className="whitespace-pre-wrap text-sm leading-relaxed">{entry.content}</pre>
                        )}
                    </motion.div>
                ))}

                <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
                    <span className="text-primary font-semibold">➜ ~</span>
                    <input
                        ref={inputRef}
                        id="terminal-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-secondary caret-secondary font-mono text-base"
                        autoFocus
                        autoComplete="off"
                    />
                </form>
                <div ref={terminalEndRef} />
            </div>

            <div className="bg-surface-container-high px-4 py-3 flex items-center justify-between border-t border-primary/20">
                <span className="text-[10px] text-on-surface-variant/50 font-mono">INTERACTIVE TERMINAL</span>
                <div className="flex gap-3">
                    {[
                        { icon: FiGithub, href: socialLinks.github },
                        { icon: FiLinkedin, href: socialLinks.linkedin },
                        { icon: FiMail, href: `mailto:${socialLinks.email}` },
                    ].map((link, i) => (
                        <motion.a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary/60 hover:text-secondary transition-colors"
                            whileHover={{ scale: 1.2 }}
                        >
                            <link.icon size={14} />
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

function TechStackRedesigned() {
    return (
        <motion.div
            className="mt-8 glass-panel rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
        >
            <div className="flex items-center gap-2 mb-5">
                <FiCode className="text-secondary" size={18} />
                <h3 className="font-mono text-sm tracking-wider text-on-surface font-semibold">TECH STACK</h3>
            </div>

            {/* Languages as visual bars */}
            <div className="mb-6">
                <h4 className="font-mono text-xs text-secondary mb-3 flex items-center gap-1.5">
                    <FiCode size={12} /> LANGUAGES
                </h4>
                <div className="space-y-2.5">
                    {techStack.languages.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 + index * 0.1 }}
                        >
                            <span className={`font-mono text-xs w-24 ${skill.color}`}>{skill.name}</span>
                            <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full rounded-full ${index % 2 === 0 ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gradient-to-r from-secondary to-tertiary'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, delay: 1.8 + index * 0.1 }}
                                />
                            </div>
                            <span className="font-mono text-[10px] text-on-surface-variant w-8 text-right">{skill.level}%</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Frameworks & Tools as categorized chips */}
            <div className="mb-4">
                <h4 className="font-mono text-xs text-secondary mb-3 flex items-center gap-1.5">
                    <FiLayers size={12} /> FRAMEWORKS & TOOLS
                </h4>
                <div className="flex flex-wrap gap-2">
                    {techStack.allTools.map((tech, index) => (
                        <motion.span
                            key={tech.name}
                            className={`font-mono text-xs px-3 py-1.5 rounded-md bg-surface-container border transition-all duration-200 cursor-default ${tech.category === 'Frontend' ? 'border-cyan-500/30 text-cyan-400 hover:border-cyan-500/60' :
                                    tech.category === 'Backend' ? 'border-green-500/30 text-green-400 hover:border-green-500/60' :
                                        tech.category === 'Mobile' ? 'border-blue-500/30 text-blue-400 hover:border-blue-500/60' :
                                            tech.category === 'Database' ? 'border-yellow-500/30 text-yellow-400 hover:border-yellow-500/60' :
                                                tech.category === 'DevOps' ? 'border-purple-500/30 text-purple-400 hover:border-purple-500/60' :
                                                    tech.category === 'Systems' ? 'border-orange-500/30 text-orange-400 hover:border-orange-500/60' :
                                                        'border-pink-500/30 text-pink-400 hover:border-pink-500/60'
                                }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2 + index * 0.05 }}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(236, 106, 6, 0.2)' }}
                        >
                            {tech.name}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Systems */}
            <div>
                <h4 className="font-mono text-xs text-secondary mb-3 flex items-center gap-1.5">
                    <FiServer size={12} /> SYSTEMS & INFRASTRUCTURE
                </h4>
                <div className="flex flex-wrap gap-2">
                    {['Linux Admin', 'Windows Server', 'Docker', 'Kubernetes', 'Git/GitLab'].map((tech, index) => (
                        <motion.span
                            key={tech}
                            className="font-mono text-xs px-3 py-1.5 rounded-md bg-surface-container border border-orange-500/30 text-orange-400 hover:border-orange-500/60 transition-all duration-200"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.5 + index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <section className="h-screen relative overflow-hidden">
            {/* Neon Strip */}
            <motion.div
                className="neon-strip top-[20%] h-[60%]"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 0.7, height: '60%' }}
                transition={{ duration: 1.5, delay: 0.3 }}
            />

            {/* Floating Orbs */}
            <motion.div
                className="absolute -top-20 -left-20 w-72 h-72 bg-primary-container rounded-full blur-[140px] opacity-30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.div
                className="absolute top-40 right-1/4 w-48 h-48 bg-secondary rounded-full blur-[120px] opacity-20"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Main Content - LEFT ALIGNED with padding */}
            <div className="h-full flex items-center px-12 md:px-24">
                <div className="w-full max-w-[1600px] flex gap-12 items-start">
                    {/* LEFT SIDE - Name & Bio */}
                    <div className="max-w-lg relative z-10 flex-shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-mono text-secondary text-sm tracking-[0.3em] mb-4"
                        >
              // {profile.handle}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="font-display text-4xl md:text-6xl font-bold burning-text mb-6 leading-tight"
                        >
                            ADRIÁN<br />RODRÍGUEZ<br />DEL RÍO
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="font-mono text-primary text-base md:text-lg mb-4"
                        >
                            {profile.role}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="font-body text-base md:text-lg text-on-surface-variant max-w-lg border-l-2 border-secondary pl-4 py-3 bg-surface-container-high/30 backdrop-blur-sm mb-6"
                        >
                            {profile.bio}
                        </motion.p>

                        <motion.button
                            className="flex items-center gap-2 font-mono text-xs tracking-widest bg-secondary/10 border border-secondary/40 px-6 py-3 rounded-full text-secondary hover:bg-secondary/20 transition-all duration-300 group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(236, 106, 6, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/projects')}
                        >
                            VIEW PROJECTS <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        {/* Redesigned Tech Stack */}
                        <TechStackRedesigned />
                    </div>

                    {/* RIGHT SIDE - Large Terminal */}
                    <div className="hidden lg:flex items-start justify-end flex-shrink-0 relative z-10">
                        <Terminal />
                    </div>
                </div>
            </div>
        </section>
    );
}
