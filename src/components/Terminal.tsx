import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { FiArrowRight, FiTerminal } from 'react-icons/fi';
import { terminalResponse } from '../utils/terminal';
import GlowSurface from './GlowSurface';
type Entry = { command: string; response: string };
export default function Terminal() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [input, setInput] = useState('');
    const [commands, setCommands] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [draft, setDraft] = useState('');
    const output = useRef<HTMLDivElement>(null);
    const inputElement = useRef<HTMLInputElement>(null);
    useEffect(() => { if (output.current && entries.length) output.current.scrollTop = output.current.scrollHeight; }, [entries]);
    const run = (raw: string) => {
        const command = raw.trim();
        if (!command) return;
        const response = terminalResponse(command);
        setEntries(previous => response === null ? [] : [...previous.slice(-39), { command, response }]);
        setCommands(previous => [...previous.slice(-39), command]);
        setInput(''); setHistoryIndex(-1); setDraft('');
    };
    const submit = (event: FormEvent) => { event.preventDefault(); run(input); };
    const history = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!['ArrowUp', 'ArrowDown'].includes(event.key) || !commands.length) return;
        event.preventDefault();
        if (historyIndex === -1) setDraft(input);
        const next = event.key === 'ArrowUp' ? Math.min(historyIndex + 1, commands.length - 1) : Math.max(-1, historyIndex - 1);
        setHistoryIndex(next); setInput(next === -1 ? draft : commands[commands.length - 1 - next]);
    };
    return <GlowSurface className="terminal">
        <div className="terminal-chrome"><span><FiTerminal aria-hidden="true" /> drakko@portfolio:~</span><span className="window-dots" aria-hidden="true"><i /><i /><i /></span></div>
        <div className="terminal-intro"><span className="eyebrow">INTERACTIVE SHELL</span><h2>Meet the person behind the code.</h2><p>Type <code>help</code> or choose a command to get started.</p></div>
        <div className="terminal-log" ref={output} role="log" aria-label="Terminal output" aria-live="polite" aria-relevant="additions text" tabIndex={0}>
            {entries.length === 0 && <p className="terminal-welcome">Connection established.<br />Ready to explore.</p>}
            {entries.map((entry, i) => <div className="terminal-entry" key={`${i}-${entry.command}`}><p className="terminal-command"><span aria-hidden="true">❯ </span>{entry.command}</p><pre>{entry.response}</pre></div>)}
        </div>
        <form onSubmit={submit} className="terminal-form"><label htmlFor="terminal-input" className="sr-only">Terminal command</label><span aria-hidden="true">❯</span><input id="terminal-input" ref={inputElement} value={input} onChange={event => setInput(event.target.value)} onKeyDown={history} placeholder="help" maxLength={120} autoComplete="off" autoCapitalize="none" spellCheck={false} aria-describedby="terminal-hint" /><button type="submit" className="terminal-send" aria-label="Run command"><FiArrowRight aria-hidden="true" /></button></form>
        <div className="terminal-shortcuts" role="group" aria-label="Quick commands">{['help', 'about', 'projects', 'skills', 'clear'].map(command => <button type="button" key={command} onClick={() => { run(command); inputElement.current?.focus({ preventScroll: true }); }}>{command}</button>)}</div>
        <p className="terminal-hint" id="terminal-hint">Enter to run · ↑ ↓ to browse command history.</p>
    </GlowSurface>;
}
