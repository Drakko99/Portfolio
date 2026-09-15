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
                    Applications, automation and ideas in progress. Explore the source code and the
                    thinking behind each project.
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
