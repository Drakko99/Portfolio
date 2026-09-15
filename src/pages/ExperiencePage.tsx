import { motion } from 'framer-motion';
import { usePreferences } from '../context/preferences';
import { useState, type CSSProperties } from 'react';
import { FiBriefcase, FiChevronDown, FiClock, FiMapPin } from 'react-icons/fi';
import { experience } from '../data/portfolioData';
import { buildTimeline } from '../utils/timeline';
import './ExperiencePage.css';

type ExperienceItem = (typeof experience)[number];

function TimelineCard({ exp }: { exp: ExperienceItem }) {
    const [pinned, setPinned] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [hoverDismissed, setHoverDismissed] = useState(false);
    const expanded = pinned || (hovered && !hoverDismissed);
    const toggleExpanded = () => {
        if (expanded) {
            setPinned(false);
            setHoverDismissed(true);
        } else {
            setPinned(true);
            setHoverDismissed(false);
        }
    };
    const { reduceMotion } = usePreferences();
    const detailsId = `experience-details-${exp.id}`;
    return (
        <article className="timeline-card" tabIndex={expanded ? 0 : undefined}
            onPointerEnter={event => {
                if (event.pointerType === 'mouse' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                    setHovered(true);
                    setHoverDismissed(false);
                }
            }}
            onPointerLeave={() => { setHovered(false); setHoverDismissed(false); }}
            onKeyDown={event => {
                if (event.key === 'Escape') { setPinned(false); setHoverDismissed(true); }
            }}
        >
            <h2 className="timeline-card-title">{exp.displayTitle ?? exp.title}</h2>
            <p className="timeline-company"><FiBriefcase className="shrink-0 text-secondary" aria-hidden="true" />{exp.displayCompany ?? exp.company}</p>
            <p className="timeline-period"><FiClock aria-hidden="true" />{exp.period}</p>
            <button type="button" className="timeline-toggle" aria-expanded={expanded} aria-controls={detailsId} onClick={toggleExpanded}>
                {expanded ? 'Hide details' : 'View details'}
                <FiChevronDown aria-hidden="true" style={{ transform: expanded ? 'rotate(180deg)' : undefined }} />
            </button>
            <motion.div id={detailsId} inert={!expanded} aria-hidden={!expanded} initial={false} animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.22 }} className="overflow-hidden">
                <div className="timeline-details">
                    {exp.displayTitle && <p className="timeline-description mb-2">{exp.title}</p>}
                    <p className="flex items-start gap-2 text-xs text-on-surface-variant"><FiMapPin className="shrink-0 text-secondary" aria-hidden="true" />{exp.location}</p>
                    <p className="timeline-description">{exp.description}</p>
                    <ul className="flex flex-wrap gap-1.5 mt-2" aria-label="Technologies">{exp.tech.map(tech => <li key={tech} className="text-[10px] px-2 py-1 rounded bg-secondary/10 text-on-surface-variant">{tech}</li>)}</ul>
                </div>
            </motion.div>
        </article>
    );
}

export default function ExperiencePage() {
    const timeline = buildTimeline(experience);
    const { reduceMotion } = usePreferences();
    return (
        <section className="page experience-page">
            <motion.header initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="experience-header">
                <p className="font-mono text-secondary text-[10px] tracking-[0.3em] mb-1.5">PROFESSIONAL / JOURNEY</p>
                <h1 className="experience-title burning-text">Experience</h1>
                <p className="experience-intro">Development, systems and shared knowledge.</p>
            </motion.header>
            <div className="timeline-stage" role="region" aria-label="Career timeline, newest role first">
                <ol className="career-timeline">
                    <li className="timeline-axis" aria-hidden="true">
                        {timeline.years.map(({ year, position }) => <span key={year} className="timeline-year" style={{ left: `${position}%` }}>{year}</span>)}
                        {timeline.breaks.map(gap => <span key={gap.start} className="timeline-break" style={{ left: `${gap.position}%` }}>//</span>)}
                    </li>
                    {timeline.entries.map(({ item, left, width, center }, index) => (
                        <li key={item.id} className={`timeline-entry ${index % 2 === 0 ? 'is-top' : 'is-bottom'}`} style={{ '--center': `${center}%`, '--start': `${left}%`, '--duration': `${width}%` } as CSSProperties}>
                            <span className="timeline-mobile-year font-mono text-secondary" aria-hidden="true">{item.startDate.slice(0, 4)}</span>
                            <div className="timeline-card-slot"><TimelineCard exp={item} /></div>
                            <span className="timeline-connector" aria-hidden="true" />
                            <span className="timeline-range" aria-hidden="true" />
                            <span className="timeline-node" aria-hidden="true" />
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
