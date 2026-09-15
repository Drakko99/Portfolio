import { FiArrowUpRight, FiCode, FiDatabase, FiShield, FiSmartphone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import GlowSurface from '../components/GlowSurface';
import { techStack } from '../data/portfolioData';
const areas = [
    { title: 'Web development', Icon: FiCode, subtitle: 'INTERFACES + LOGIC', text: 'Business applications and educational platforms, from user interfaces to business logic.', tech: ['TypeScript', 'PHP', 'Laravel', 'React', 'Next.js', 'NestJS', 'Prisma'], evidence: 'Used at INTECCA and Be Call', href: '/experience' },
    { title: 'Mobile applications', Icon: FiSmartphone, subtitle: 'IDEA → APPLICATION', text: 'Mobile experiences with customisable content and local persistence.', tech: ['Flutter', 'Dart', 'Ionic', 'SQLite', 'React Native', 'Expo'], evidence: 'Explore Juego del Impostor', href: '/projects#juego-impostor' },
    { title: 'Systems and automation', Icon: FiDatabase, subtitle: 'INFRASTRUCTURE + DATA', text: 'Windows and Linux server administration, databases and task automation with TypeScript.', tech: ['Linux', 'Windows Server', 'Databases', 'Node.js', 'Playwright'], evidence: 'Explore MonitorStockTS', href: '/projects#monitorstock' },
    { title: 'Security and teaching', Icon: FiShield, subtitle: 'SHARED KNOWLEDGE', text: 'Teaching and facilitating the INCIBE–UNED cybersecurity course for Spanish law enforcement agencies.', tech: ['Cybersecurity', 'Moodle', 'Training'], evidence: 'View UNED experience', href: '/experience' },
];
export default function TechStackPage() {
    return <section className="page stack-page"><header className="page-header"><p className="eyebrow">TOOLS / IN CONTEXT</p><h1>My <span className="burning-text">stack.</span></h1><p>Technologies connected to the problems they help solve.</p></header>
        <div className="stack-grid">{areas.map(({ title, Icon, subtitle, text, tech, evidence, href }) => <GlowSurface key={title} className="stack-card"><div className="stack-card-heading"><span className="surface-icon"><Icon aria-hidden="true" /></span><span className="eyebrow">{subtitle}</span></div><h2>{title}</h2><p>{text}</p><ul className="tech-tags" aria-label={`Technologies for ${title}`}>{tech.map(tool => <li key={tool}>{tool}</li>)}</ul><Link className="text-link" to={href}>{evidence}<FiArrowUpRight aria-hidden="true" /></Link></GlowSurface>)}</div>
        <div className="stack-languages"><h2>Languages</h2><ul className="tech-tags">{techStack.languages.map(skill => <li key={skill.name}>{skill.name}</li>)}</ul></div>
    </section>;
}
