import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { profile, socialLinks } from '../data/portfolioData';
import Terminal from '../components/Terminal';
export default function HomePage() {
    return <section className="page home-page" aria-labelledby="home-title">
        <div className="home-copy"><p className="eyebrow">{profile.handle} / DEVELOPMENT & SYSTEMS</p>
            <h1 id="home-title">Adrián<br /><span className="burning-text">Rodríguez del Río.</span></h1>
            <p className="home-role">Full-stack developer.<br />Systems administrator.</p>
            <p className="home-bio">{profile.bio}</p>
            <div className="home-actions"><Link className="neon-button" to="/projects">Explore projects <FiArrowUpRight aria-hidden="true" /></Link><a className="neon-button secondary" href={`mailto:${socialLinks.email}`}>Let’s talk <FiArrowUpRight aria-hidden="true" /></a></div>
            <p className="home-location"><FiMapPin aria-hidden="true" /> Ponferrada, Spain <span aria-hidden="true">·</span> Web, mobile and systems</p>
        </div>
        <div className="home-console"><Terminal /></div>
    </section>;
}
