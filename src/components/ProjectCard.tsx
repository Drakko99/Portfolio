import { FiActivity, FiArrowUpRight, FiGithub, FiGrid, FiPlay, FiUsers } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import type { Project, ProjectKind, ProjectStatus } from '../types/portfolio';
import GlowSurface from './GlowSurface';

const projectIcons: Record<ProjectKind, IconType> = {
    game: FiUsers,
    automation: FiActivity,
    library: FiGrid,
};

const statusLabels: Record<ProjectStatus, string> = {
    published: 'On Google Play',
    'open-source': 'Open source',
    development: 'In development',
};

/** Presenta un proyecto y los destinos que realmente tiene disponibles. */
export default function ProjectCard({ project }: { project: Project }) {
    const Icon = projectIcons[project.kind];

    return (
        <GlowSurface as="article" className="project-card">
            <div className={`project-art project-art-${project.kind}`} aria-hidden="true">
                <div className="art-orbit" />
                <Icon />
                <span>{project.category}</span>
            </div>

            <div className="project-content" id={project.slug}>
                <div className="project-meta">
                    <span className="eyebrow">{project.category}</span>
                    <span className="project-status">{statusLabels[project.status]}</span>
                </div>
                <h2>{project.name}</h2>
                <p className="project-description">{project.description}</p>
                <ul className="project-highlights">
                    {project.highlights.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>
                <ul className="tech-tags" aria-label={`Technologies for ${project.name}`}>
                    {project.tech.map((tech) => (
                        <li key={tech}>{tech}</li>
                    ))}
                </ul>

                <div className="project-links">
                    <a
                        className="neon-button secondary"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiGithub aria-hidden="true" />
                        {project.mobileGithub ? 'Web repo' : 'Repository'}
                        <span className="sr-only"> for {project.name}, opens in a new tab</span>
                        <FiArrowUpRight aria-hidden="true" />
                    </a>
                    {project.mobileGithub && (
                        <a
                            className="neon-button secondary"
                            href={project.mobileGithub}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FiGithub aria-hidden="true" /> Mobile repo
                            <span className="sr-only"> for {project.name}, opens in a new tab</span>
                            <FiArrowUpRight aria-hidden="true" />
                        </a>
                    )}
                    {project.status === 'development' && (
                        <button className="neon-button secondary" disabled type="button">
                            Website · Coming soon
                        </button>
                    )}
                    {project.store && (
                        <a
                            className="neon-button"
                            href={project.store}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FiPlay aria-hidden="true" /> Google Play
                            <span className="sr-only">, opens in a new tab</span>
                        </a>
                    )}
                </div>
            </div>
        </GlowSurface>
    );
}
