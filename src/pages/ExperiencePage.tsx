import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { usePreferences } from '../context/preferences';
import { experience } from '../data/portfolioData';
import { buildTimeline } from '../utils/timeline';
import TimelineCard from '../components/TimelineCard';

/** Distribuye las experiencias sobre el eje sin variar sus filas al abrir detalles. */
export default function ExperiencePage() {
    const timeline = buildTimeline(experience);
    const { reduceMotion } = usePreferences();
    return (
        <section className="page experience-page">
            <motion.header
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="experience-header"
            >
                <p className="font-mono text-secondary text-[10px] tracking-[0.3em] mb-1.5">
                    PROFESSIONAL / JOURNEY
                </p>
                <h1 className="experience-title burning-text">Experience</h1>
                <p className="experience-intro">Development, systems and shared knowledge.</p>
            </motion.header>
            <div
                className="timeline-stage"
                role="region"
                aria-label="Career timeline, newest role first"
            >
                <ol className="career-timeline">
                    <li className="timeline-axis" aria-hidden="true">
                        {timeline.years.map(({ year, position }) => (
                            <span
                                key={year}
                                className="timeline-year"
                                style={{ left: `${position}%` }}
                            >
                                {year}
                            </span>
                        ))}
                        {timeline.breaks.map((gap) => (
                            <span
                                key={gap.start}
                                className="timeline-break"
                                style={{ left: `${gap.position}%` }}
                            >
                                //
                            </span>
                        ))}
                    </li>
                    {timeline.entries.map(({ item, left, width, center }, index) => (
                        <li
                            key={item.id}
                            className={`timeline-entry ${index % 2 === 0 ? 'is-top' : 'is-bottom'}`}
                            style={
                                {
                                    '--center': `${center}%`,
                                    '--start': `${left}%`,
                                    '--duration': `${width}%`,
                                } as CSSProperties
                            }
                        >
                            <span
                                className="timeline-mobile-year font-mono text-secondary"
                                aria-hidden="true"
                            >
                                {item.startDate.slice(0, 4)}
                            </span>
                            <div className="timeline-card-slot">
                                <TimelineCard exp={item} />
                            </div>
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
