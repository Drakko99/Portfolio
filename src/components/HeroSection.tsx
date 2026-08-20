import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { profile, socialLinks } from '../data/portfolioData';
import { FiGithub, FiLinkedin, FiMail, FiTerminal } from 'react-icons/fi';

const commands = [
    { cmd: 'help', response: 'Available commands: about, skills, projects, contact, clear' },
    { cmd: 'about', response: `${profile.name} (${profile.handle}) - ${profile.role}. Passionate about accessible development and efficient technology solutions.` },
    { cmd: 'skills', response: 'Core Stack: TypeScript, PHP, React, Next.js, Flutter, Node.js. Specialized in full stack development, server administration (Linux/Windows), and web accessibility.' },
    { cmd: 'projects', response: 'Check out my projects below! Key highlights: Juego del Impostor (Flutter multiplayer game on Google Play), MonitorStockTS (real-time stock monitoring).' },
    { cmd: 'contact', response: `Get in touch:\n- GitHub: github.com/Drakko99\n- LinkedIn: linkedin.com/in/adrián-rodríguez-del-río` },
];

function MiniTerminal() {
    const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
        { type: 'output', content: `${profile.handle.toUpperCase()} TERMINAL v1.0.0` },
        { type: 'output', content: `Welcome! Type "help" for commands.` },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 500);
    }, []);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newHistory = [...history, { type: 'input' as const, content: input }];
        const cmd = input.toLowerCase().trim();

        if (cmd === 'clear') {
            setHistory([]);
        } else {
            const command = commands.find(c => c.cmd === cmd);
            const response = command
                ? command.response
                : `Unknown command: "${cmd}". Type "help".`;
            newHistory.push({ type: 'output' as const, content: response });
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <motion.div
            className="glass-panel rounded-xl overflow-hidden font-mono text-xs w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
        >
            {/* Terminal Header */}
            <div className="bg-surface-container-high px-3 py-2 flex items-center gap-2 border-b border-primary/20">
                <FiTerminal size={14} className="text-secondary" />
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="ml-2 text-[10px] text-on-surface-variant">drakko@portfolio:~</span>
            </div>

            {/* Terminal Body */}
            <div
                className="p-3 h-48 overflow-y-auto bg-background/90 cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                {history.map((entry, index) => (
                    <motion.div
                        key={index}
                        className={`mb-1 ${entry.type === 'input' ? 'text-secondary' : 'text-on-surface-variant'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {entry.type === 'input' ? (
                            <span>
                                <span className="text-primary">~$ </span>{entry.content}
                            </span>
                        ) : (
                            <pre className="whitespace-pre-wrap text-[11px]">{entry.content}</pre>
                        )}
                    </motion.div>
                ))}

                {/* Input Line */}
                <form onSubmit={handleCommand} className="flex items-center gap-1">
                    <span className="text-primary">~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-secondary caret-secondary text-[11px]"
                        autoFocus
                        autoComplete="off"
                    />
                </form>
            </div>

            {/* Social Links - Solo aquí, no duplicados */}
            <div className="bg-surface-container-high px-3 py-2 flex items-center justify-between border-t border-primary/20">
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
                        className="text-primary hover:text-secondary transition-colors p-1"
                        whileHover={{ scale: 1.2 }}
                    >
                        <link.icon size={14} />
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
}

export default function HeroSection() {
    const { scrollY } = useScroll();

    const yTitle = useTransform(scrollY, [0, 300], [0, 100]);
    const opacityTitle = useTransform(scrollY, [0, 250], [1, 0]);
    const scaleTitle = useTransform(scrollY, [0, 300], [1, 0.9]);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-between relative px-6 md:px-16 pt-24 overflow-hidden">
            {/* Neon Strip */}
            <motion.div
                className="neon-strip top-[20%] h-[60%]"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 0.7, height: '60%' }}
                transition={{ duration: 1.5, delay: 0.3 }}
            />

            {/* Floating Orbs */}
            <motion.div
                className="absolute -top-20 -left-20 w-64 h-64 bg-primary-container rounded-full blur-[120px] opacity-30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            {/* LEFT SIDE - Name & Bio */}
            <div className="max-w-2xl relative z-10 flex-1">
                {/* Handle */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-mono text-secondary text-sm tracking-[0.3em] mb-4"
                >
          // {profile.handle}
                </motion.div>

                {/* Main Title - NAME */}
                <motion.h1
                    style={{ y: yTitle, opacity: opacityTitle, scale: scaleTitle }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="font-display text-4xl md:text-6xl lg:text-7xl font-bold burning-text mb-6 leading-tight"
                >
                    ADRIÁN<br />RODRÍGUEZ<br />DEL RÍO
                </motion.h1>

                {/* Role */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="font-mono text-primary text-base md:text-lg mb-4"
                >
                    {profile.role}
                </motion.div>

                {/* Bio */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="font-body text-base md:text-lg text-on-surface-variant max-w-xl border-l-2 border-secondary pl-4 py-3 bg-surface-container-high/30 backdrop-blur-sm"
                >
                    {profile.bio}
                </motion.p>

                {/* Scroll indicator - posicionado correctamente sin overlap */}
                <motion.div
                    className="mt-16 flex items-center gap-2 text-secondary font-mono text-xs tracking-widest cursor-pointer group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    whileHover={{ y: 3 }}
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        ↓
                    </motion.div>
                    <span className="group-hover:text-secondary transition-colors">EXPLORE PROJECTS</span>
                </motion.div>
            </div>

            {/* RIGHT SIDE - Terminal (solo desktop) */}
            <div className="hidden lg:flex items-center justify-end flex-1 relative z-10">
                <MiniTerminal />
            </div>
        </section>
    );
}
