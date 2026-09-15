import { FiActivity, FiArrowUpRight, FiGithub, FiGrid, FiPlay, FiUsers } from 'react-icons/fi';
import GlowSurface from '../components/GlowSurface';
import { projects } from '../data/portfolioData';
const visuals = [FiUsers, FiActivity, FiGrid];
export default function ProjectsPage() {
    return <section className="page projects-page"><header className="page-header"><p className="eyebrow">FROM IDEA TO CODE</p><h1>Projects<span className="burning-text"> of my own.</span></h1><p>Applications, automation and ideas in progress. Explore the source code and the thinking behind each project.</p></header>
        <div className="projects-grid">{projects.map((project, index) => {
            const Icon = visuals[index] ?? FiGrid;
            return <GlowSurface key={project.id} className="project-card"><div className={`project-art project-art-${index}`} aria-hidden="true"><div className="art-orbit" /><Icon /><span>{project.category}</span></div>
                <div className="project-content" id={project.slug}><div className="project-meta"><span className="eyebrow">{project.category}</span><span className="project-status">{project.status}</span></div><h2>{project.name}</h2><p className="project-description">{project.description}</p><ul className="project-highlights">{project.highlights.map(point => <li key={point}>{point}</li>)}</ul><ul className="tech-tags" aria-label={`Technologies for ${project.name}`}>{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
                <div className="project-links"><a className="neon-button secondary" href={project.github} target="_blank" rel="noopener noreferrer"><FiGithub aria-hidden="true" /> {project.mobileGithub ? 'Web repo' : 'Repository'}<span className="sr-only"> for {project.name}, opens in a new tab</span><FiArrowUpRight aria-hidden="true" /></a>{project.mobileGithub && <a className="neon-button secondary" href={project.mobileGithub} target="_blank" rel="noopener noreferrer"><FiGithub aria-hidden="true" /> Mobile repo<span className="sr-only"> for {project.name}, opens in a new tab</span><FiArrowUpRight aria-hidden="true" /></a>}{project.inDevelopment && <button className="neon-button secondary" disabled type="button">Website · Coming soon</button>}{project.published && project.store && <a className="neon-button" href={project.store} target="_blank" rel="noopener noreferrer"><FiPlay aria-hidden="true" /> Google Play<span className="sr-only">, opens in a new tab</span></a>}</div></div>
            </GlowSurface>;
        })}</div>
    </section>;
}
