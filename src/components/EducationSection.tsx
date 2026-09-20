import { FiArrowUpRight, FiAward, FiBookOpen } from 'react-icons/fi';
import { education, socialLinks } from '../data/portfolioData';
import GlowSurface from './GlowSurface';

/** Presenta formación relevante y diferencia los estudios terminados de los que están en curso. */
export default function EducationSection() {
    return (
        <section className="education-section" aria-labelledby="education-title">
            <header className="education-heading">
                <p className="eyebrow">FOUNDATIONS / CONTINUOUS LEARNING</p>
                <h2 id="education-title">Education & learning</h2>
                <p>Formal education and complementary training behind my work.</p>
                <a
                    className="text-link"
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View my LinkedIn profile <FiArrowUpRight aria-hidden="true" />
                </a>
            </header>
            <div className="education-grid">
                {education.map((item) => {
                    const Icon = item.kind === 'qualification' ? FiAward : FiBookOpen;
                    return (
                        <GlowSurface
                            key={item.id}
                            as="article"
                            className={`education-card education-${item.kind}`}
                        >
                            <div className="education-card-heading">
                                <Icon aria-hidden="true" />
                                <span className="eyebrow">
                                    {item.kind === 'qualification' ? 'QUALIFICATION' : 'COURSE'}
                                </span>
                            </div>
                            <h3>{item.title}</h3>
                            {item.institution && <p>{item.institution}</p>}
                            <p className="education-meta">
                                {item.period && <span>{item.period}</span>}
                                <span>
                                    {item.status === 'completed' ? 'Completed' : 'In progress'}
                                </span>
                            </p>
                            {item.credentialUrl && (
                                <a
                                    className="text-link"
                                    href={item.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View credential <FiArrowUpRight aria-hidden="true" />
                                </a>
                            )}
                        </GlowSurface>
                    );
                })}
            </div>
        </section>
    );
}
