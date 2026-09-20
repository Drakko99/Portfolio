import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/portfolioData';

/** Reúne los proyectos personales con sus repositorios y publicaciones. */
export default function ProjectsPage() {
    return (
        <section className="page projects-page">
            <header className="page-header">
                <p className="eyebrow">FROM IDEA TO CODE</p>
                <h1>
                    Projects<span className="burning-text"> of my own.</span>
                </h1>
                <p>
                    Things I’ve built outside work: a published game, automation tools and web
                    applications. Each project includes its source code and current status.
                </p>
            </header>
            <div className="projects-grid">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}
