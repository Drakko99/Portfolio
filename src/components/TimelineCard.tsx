import { motion } from 'framer-motion';
import { FiBriefcase, FiChevronDown, FiClock, FiMapPin } from 'react-icons/fi';
import { usePreferences } from '../context/preferences';
import { useExpandableCard } from '../hooks/useExpandableCard';
import type { Experience } from '../types/portfolio';

/** Muestra una experiencia y permite consultar sus detalles con ratón o teclado. */
export default function TimelineCard({ exp }: { exp: Experience }) {
    const { expanded, toggleExpanded, handlePointerEnter, handlePointerLeave, handleKeyDown } =
        useExpandableCard();
    const { reduceMotion } = usePreferences();
    const detailsId = `experience-details-${exp.id}`;
    return (
        <article
            className="timeline-card"
            tabIndex={expanded ? 0 : undefined}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onKeyDown={handleKeyDown}
        >
            <h2 className="timeline-card-title">{exp.displayTitle ?? exp.title}</h2>
            <p className="timeline-company">
                <FiBriefcase className="shrink-0 text-secondary" aria-hidden="true" />
                {exp.displayCompany ?? exp.company}
            </p>
            <p className="timeline-period">
                <FiClock aria-hidden="true" />
                {exp.period}
            </p>
            <button
                type="button"
                className="timeline-toggle"
                aria-expanded={expanded}
                aria-controls={detailsId}
                onClick={toggleExpanded}
            >
                {expanded ? 'Hide details' : 'View details'}
                <FiChevronDown
                    aria-hidden="true"
                    style={{ transform: expanded ? 'rotate(180deg)' : undefined }}
                />
            </button>
            <motion.div
                id={detailsId}
                inert={!expanded}
                aria-hidden={!expanded}
                initial={false}
                animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                className="overflow-hidden"
            >
                <div className="timeline-details">
                    {exp.displayTitle && <p className="timeline-description mb-2">{exp.title}</p>}
                    <p className="flex items-start gap-2 text-xs text-on-surface-variant">
                        <FiMapPin className="shrink-0 text-secondary" aria-hidden="true" />
                        {exp.location}
                    </p>
                    <p className="timeline-description">{exp.description}</p>
                    <ul className="flex flex-wrap gap-1.5 mt-2" aria-label="Technologies">
                        {exp.tech.map((tech) => (
                            <li
                                key={tech}
                                className="text-[10px] px-2 py-1 rounded bg-secondary/10 text-on-surface-variant"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </article>
    );
}
