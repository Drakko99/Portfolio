import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { socialLinks } from '../data/portfolioData';

/** Mantiene la autoría y el contacto accesibles al final de cualquier página. */
export default function Footer() {
    return (
        <footer className="site-footer">
            <span>© {new Date().getFullYear()} Adrián Rodríguez del Río</span>
            <nav className="footer-contact" aria-label="Contact links">
                <a href={`mailto:${socialLinks.email}`} aria-label="Email Adrián" title="Email">
                    <FiMail aria-hidden="true" />
                </a>
                <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn (opens in a new tab)"
                    title="LinkedIn"
                >
                    <FiLinkedin aria-hidden="true" />
                </a>
                <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub (opens in a new tab)"
                    title="GitHub"
                >
                    <FiGithub aria-hidden="true" />
                </a>
            </nav>
        </footer>
    );
}
