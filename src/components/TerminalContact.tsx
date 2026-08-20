import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiTerminal, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { socialLinks, profile } from '../data/portfolioData';

const commands = [
    { cmd: 'help', response: 'Available commands: about, skills, projects, contact, clear' },
    { cmd: 'about', response: `${profile.name} (${profile.handle}) - ${profile.role}. Passionate about accessible development and efficient technology solutions.` },
    { cmd: 'skills', response: 'Core Stack: TypeScript, PHP, React, Next.js, Flutter, Node.js. Specialized in full stack development, server administration (Linux/Windows), and web accessibility.' },
    { cmd: 'projects', response: 'Check out my projects section above! Key highlights: Juego del Impostor (Flutter multiplayer game), MonitorStockTS (real-time stock monitoring), Game Library (Next.js + React Native).' },
    { cmd: 'contact', response: `Get in touch:\n- GitHub: github.com/Drakko99\n- LinkedIn: linkedin.com/in/adrián-rodríguez-del-río` },
];

export default function TerminalContact() {
    const ref = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const isInView = useInView(ref, { once: true });

    const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
        { type: 'output', content: `${profile.handle.toUpperCase()} TERMINAL v1.0.0` },
        { type: 'output', content: `Welcome! Type "help" for available commands.` },
    ]);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (isInView && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 500);
        }
    }, [isInView]);

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
                : `Unknown command: "${cmd}". Type "help" for available commands.`;

            newHistory.push({ type: 'output' as const, content: response });
        }

        setHistory(newHistory);
        setInput('');
    };

    return (
        <section id="contact" className="py-32 px-6 md:px-16 relative">
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
                className="border-b border-primary/20 pb-4 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <FiTerminal className="text-secondary" size={24} />
                    <h2 className="font-display text-4xl md:text-5xl burning-text">
                        TERMINAL_ACCESS
                    </h2>
                </div>
            </motion.div>

            {/* Terminal */}
            <motion.div
                className="glass-panel rounded-xl overflow-hidden font-mono text-sm"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {/* Terminal Header */}
                <div className="bg-surface-container-high px-4 py-2 flex items-center gap-2 border-b border-primary/20">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-xs text-on-surface-variant">drakko@portfolio:~</span>
                </div>

                {/* Terminal Body */}
                <div
                    className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto bg-background/80"
                    onClick={() => inputRef.current?.focus()}
                >
                    {history.map((entry, index) => (
                        <motion.div
                            key={index}
                            className={`mb-2 ${entry.type === 'input' ? 'text-secondary' : 'text-on-surface-variant'}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {entry.type === 'input' ? (
                                <span>
                                    <span className="text-primary">drakko@portfolio:~$ </span>
                                    {entry.content}
                                </span>
                            ) : (
                                <pre className="whitespace-pre-wrap">{entry.content}</pre>
                            )}
                        </motion.div>
                    ))}

                    {/* Input Line */}
                    <form onSubmit={handleCommand} className="flex items-center gap-2">
                        <span className="text-primary">drakko@portfolio:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-secondary caret-secondary"
                            autoFocus
                            autoComplete="off"
                        />
                    </form>
                </div>
            </motion.div>

            {/* Quick Connect Buttons */}
            <motion.div
                className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
            >
                <motion.a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel flex items-center gap-2 px-4 py-3 rounded-lg hover:border-secondary transition-all duration-300 group"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(236, 106, 6, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiGithub className="text-primary group-hover:text-secondary transition-colors" />
                    <span className="font-mono text-xs tracking-wider">GITHUB</span>
                </motion.a>

                <motion.a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel flex items-center gap-2 px-4 py-3 rounded-lg hover:border-secondary transition-all duration-300 group"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(236, 106, 6, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiLinkedin className="text-primary group-hover:text-secondary transition-colors" />
                    <span className="font-mono text-xs tracking-wider">LINKEDIN</span>
                </motion.a>

                <motion.a
                    href={`mailto:${socialLinks.email}`}
                    className="glass-panel flex items-center gap-2 px-4 py-3 rounded-lg hover:border-secondary transition-all duration-300 group"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(236, 106, 6, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiMail className="text-primary group-hover:text-secondary transition-colors" />
                    <span className="font-mono text-xs tracking-wider">EMAIL</span>
                </motion.a>
            </motion.div>
        </section>
    );
}
