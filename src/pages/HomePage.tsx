import { FiArrowUpRight, FiDownload, FiMapPin } from 'react-icons/fi';
import { profile, resume, socialLinks } from '../data/portfolioData';
import Terminal from '../components/Terminal';
/** Presenta el perfil junto a la consola y los enlaces principales. */
export default function HomePage() {
    return (
        <section className="page home-page" aria-labelledby="home-title">
            <div className="home-copy">
                <p className="eyebrow">{profile.handle} / FULL-STACK DEVELOPMENT</p>
                <h1 id="home-title">
                    Adrián
                    <br />
                    <span className="burning-text">Rodríguez del Río.</span>
                </h1>
                <p className="home-role">
                    Full-stack developer.
                    <br />
                    Web, mobile and the systems behind them.
                </p>
                <p className="home-bio">{profile.bio}</p>
                <div className="home-actions">
                    <a className="neon-button" href={resume.url} download={resume.filename}>
                        Download CV <FiDownload aria-hidden="true" />
                    </a>
                    <a className="neon-button secondary" href={`mailto:${socialLinks.email}`}>
                        Let’s talk <FiArrowUpRight aria-hidden="true" />
                    </a>
                </div>
                <p className="home-location">
                    <FiMapPin aria-hidden="true" /> Ponferrada, Spain{' '}
                    <span aria-hidden="true">·</span> Web, mobile and systems
                </p>
            </div>
            <div className="home-console">
                <Terminal />
            </div>
        </section>
    );
}
