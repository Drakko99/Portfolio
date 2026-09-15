import * as Menu from '@radix-ui/react-dropdown-menu';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiArrowUpRight, FiCheck, FiChevronDown, FiEye, FiGithub, FiLinkedin, FiMail, FiMenu } from 'react-icons/fi';
import { socialLinks } from '../data/portfolioData';
import { usePreferences } from '../context/preferences';

const pages = [{ label: 'Projects', href: '/projects' }, { label: 'Experience', href: '/experience' }, { label: 'Stack', href: '/stack' }];
const social = [{ label: 'GitHub', href: socialLinks.github, Icon: FiGithub }, { label: 'LinkedIn', href: socialLinks.linkedin, Icon: FiLinkedin }, { label: 'Email', href: `mailto:${socialLinks.email}`, Icon: FiMail }];
function ContactMenu() {
    return <Menu.Root modal={false}><Menu.Trigger className="nav-action contact-trigger">Contact <FiChevronDown aria-hidden="true" /></Menu.Trigger>
        <Menu.Portal><Menu.Content className="dropdown-panel" align="end" sideOffset={10} collisionPadding={16}>
            <Menu.Label className="dropdown-label">Let’s talk</Menu.Label>
            {social.map(({ label, href, Icon }) => <Menu.Item key={label} asChild><a className="dropdown-item" href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noopener noreferrer'}>
                <Icon aria-hidden="true" />{label}<FiArrowUpRight className="item-arrow" aria-hidden="true" />{label !== 'Email' && <span className="sr-only"> (opens in a new tab)</span>}
            </a></Menu.Item>)}
        </Menu.Content></Menu.Portal>
    </Menu.Root>;
}
function DisplayMenu() {
    const { preferences, update } = usePreferences();
    return <Menu.Root modal={false}><Menu.Trigger className="nav-action icon-button" aria-label="Accessibility and appearance options"><FiEye aria-hidden="true" /></Menu.Trigger>
        <Menu.Portal><Menu.Content className="dropdown-panel" align="end" sideOffset={10} collisionPadding={16}>
            <Menu.Label className="dropdown-label">Accessibility and appearance</Menu.Label>
            {([{ key: 'contrast', label: 'High contrast' }, { key: 'calm', label: 'Reduce effects' }, { key: 'halo', label: 'Cursor halo' }] as const).map(({ key, label }) => <Menu.CheckboxItem key={key} checked={preferences[key]} onCheckedChange={value => update(key, value === true)} onSelect={event => event.preventDefault()} className="dropdown-item">
                <span className="check-slot"><Menu.ItemIndicator><FiCheck aria-hidden="true" /></Menu.ItemIndicator></span>{label}
            </Menu.CheckboxItem>)}
            <p className="dropdown-note">Your device’s reduced motion preference is also respected.</p>
        </Menu.Content></Menu.Portal>
    </Menu.Root>;
}
export default function Navbar() {
    const location = useLocation();
    return <nav className="site-nav" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="Adrián Rodríguez, home">Adrián<span aria-hidden="true">.</span></Link>
        <div className="desktop-links">{pages.map(page => <NavLink key={page.href} to={page.href} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>{page.label}</NavLink>)}</div>
        <div className="nav-utilities" key={location.key}><ContactMenu /><DisplayMenu />
            <div className="mobile-menu"><Menu.Root modal={false}><Menu.Trigger className="nav-action icon-button" aria-label="Open navigation"><FiMenu aria-hidden="true" /></Menu.Trigger>
                <Menu.Portal><Menu.Content className="dropdown-panel" align="end" sideOffset={10} collisionPadding={16}>
                    <Menu.Item asChild><Link className="dropdown-item" to="/">Home</Link></Menu.Item>
                    {pages.map(page => <Menu.Item key={page.href} asChild><Link className="dropdown-item" to={page.href} aria-current={location.pathname === page.href ? 'page' : undefined}>{page.label}</Link></Menu.Item>)}
                </Menu.Content></Menu.Portal>
            </Menu.Root></div>
        </div>
    </nav>;
}
