import { FiArrowUpRight, FiCode, FiDatabase, FiShield, FiSmartphone } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import GlowSurface from '../components/GlowSurface';
import { skillAreas, techStack } from '../data/portfolioData';
import type { SkillAreaId } from '../types/portfolio';

const areaIcons: Record<SkillAreaId, IconType> = {
    web: FiCode,
    mobile: FiSmartphone,
    systems: FiDatabase,
    security: FiShield,
};

/** Relaciona las áreas técnicas con ejemplos de trabajo y proyectos personales. */
export default function TechStackPage() {
    return (
        <section className="page stack-page">
            <header className="page-header">
                <p className="eyebrow">TOOLS / IN CONTEXT</p>
                <h1>
                    My <span className="burning-text">stack.</span>
                </h1>
                <p>Technologies connected to the problems they help solve.</p>
            </header>
            <div className="stack-grid">
                {skillAreas.map(({ id, title, subtitle, text, tech, evidence, href }) => {
                    const Icon = areaIcons[id];
                    return (
                        <GlowSurface key={id} as="article" className="stack-card">
                            <div className="stack-card-heading">
                                <span className="surface-icon">
                                    <Icon aria-hidden="true" />
                                </span>
                                <span className="eyebrow">{subtitle}</span>
                            </div>
                            <h2>{title}</h2>
                            <p>{text}</p>
                            <ul className="tech-tags" aria-label={`Technologies for ${title}`}>
                                {tech.map((tool) => (
                                    <li key={tool}>{tool}</li>
                                ))}
                            </ul>
                            <Link className="text-link" to={href}>
                                {evidence}
                                <FiArrowUpRight aria-hidden="true" />
                            </Link>
                        </GlowSurface>
                    );
                })}
            </div>
            <div className="stack-languages">
                <h2>Languages</h2>
                <ul className="tech-tags">
                    {techStack.languages.map((skill) => (
                        <li key={skill.name}>{skill.name}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
