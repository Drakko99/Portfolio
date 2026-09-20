import type { EducationItem, Experience, Profile, Project, SkillArea } from '../types/portfolio';

export const profile: Profile = {
    name: 'Adrián Rodríguez del Río',
    handle: '@Drakko99',
    role: 'Full-Stack Developer // Systems Administrator',
    bio: 'I build web and mobile applications and manage the systems behind them. I combine full-stack development, automation and experience with educational platforms to create useful, accessible solutions.',
};

export const experience: Experience[] = [
    {
        id: 1,
        title: 'Systems Developer',
        company: 'Be Call Group',
        location: 'León, Spain · Remote',
        period: 'Jun 2025 - Present',
        startDate: '2025-06',
        endDate: null,
        description:
            'Full-stack development of business applications with PHP and Laravel, including time tracking and CRM tools. Development and maintenance of MySQL databases.',
        tech: ['PHP', 'Laravel', 'MySQL', 'Full-Stack'],
    },
    {
        id: 2,
        title: 'Cybersecurity Instructor and Learning Facilitator · INCIBE–UNED',
        displayTitle: 'Cybersecurity Instructor',
        displayCompany: 'UNED · INCIBE',
        company: 'Universidad Nacional de Educación a Distancia (UNED)',
        location: 'Ponferrada, Spain · Remote',
        period: 'Jul 2025 - Jan 2026',
        startDate: '2025-07',
        endDate: '2026-01',
        description:
            'Teaching and supporting learners on a cybersecurity course for Spanish law enforcement agencies. Specialist training in information security.',
        tech: ['Cybersecurity', 'Moodle', 'Training'],
    },
    {
        id: 3,
        title: 'Full-Stack Developer',
        company: 'INTECCA - UNED',
        location: 'Ponferrada, Spain · On-site',
        period: 'Feb 2024 - Feb 2025',
        startDate: '2024-02',
        endDate: '2025-02',
        description:
            'Administration and configuration of Windows and Linux servers, supporting availability and security. Full-stack development with TypeScript, Laravel and Ionic to build and maintain educational platforms.',
        tech: ['TypeScript', 'Laravel', 'Ionic', 'Linux', 'Windows Server'],
    },
    {
        id: 4,
        title: 'Web Developer',
        company: 'IP Informática Profesional',
        location: 'Ponferrada, Spain · On-site',
        period: 'Mar 2020 - Jul 2020',
        startDate: '2020-03',
        endDate: '2020-07',
        description:
            'Creation and maintenance of WordPress websites during my internship, using Elementor and WooCommerce. Responsive layouts, content updates and on-page SEO.',
        tech: ['WordPress', 'Elementor', 'WooCommerce', 'SEO', 'HTML', 'CSS', 'JavaScript', 'PHP'],
    },
];

export const projects: Project[] = [
    {
        id: 1,
        slug: 'juego-impostor',
        name: 'Juego del Impostor',
        category: 'MOBILE APPLICATION',
        kind: 'game',
        status: 'published',
        description:
            'A local social deduction game: pass the phone, discover your role and find the impostor.',
        highlights: [
            'Games for 3 to 12 players.',
            'Custom categories and words stored with SQLite.',
        ],
        tech: ['Flutter', 'Dart', 'SQLite'],
        github: 'https://github.com/Drakko99/juego_impostor',
        store: 'https://play.google.com/store/apps/details?id=com.drakko99.juego_impostor',
    },
    {
        id: 2,
        slug: 'monitorstock',
        name: 'MonitorStockTS',
        category: 'AUTOMATION',
        kind: 'automation',
        status: 'open-source',
        description:
            'A stock monitor that checks product pages and reports availability through the console.',
        highlights: [
            'Configurable intervals and matching patterns.',
            'Scraping with Axios, Cheerio and Playwright.',
        ],
        tech: ['TypeScript', 'Node.js', 'Playwright'],
        github: 'https://github.com/Drakko99/MonitorStockTS',
    },
    {
        id: 3,
        slug: 'game-library',
        name: 'Game Library',
        category: 'WEB + MOBILE',
        kind: 'library',
        status: 'development',
        description:
            'One game library, two interfaces. A web application and a mobile app share a NestJS backend, with MySQL and Prisma powering the data layer.',
        highlights: [
            'Web interface: React and Next.js.',
            'Mobile interface: React Native and Expo.',
            'Shared API: NestJS. Database: MySQL with Prisma ORM.',
            'Currently in development. Backend repository is private.',
        ],
        tech: ['NestJS', 'React', 'Next.js', 'React Native', 'Expo', 'MySQL', 'Prisma'],
        github: 'https://github.com/Drakko99/game-library-web',
        mobileGithub: 'https://github.com/Drakko99/game-library-mobile',
    },
];

export const techStack = {
    languages: [
        { name: 'TypeScript' },
        { name: 'PHP' },
        { name: 'JavaScript' },
        { name: 'Java' },
        { name: 'Dart' },
        { name: 'Python' },
    ],
};

export const skillAreas: SkillArea[] = [
    {
        id: 'web',
        title: 'Web development',
        subtitle: 'INTERFACES + LOGIC',
        text: 'Business applications and educational platforms, from user interfaces to business logic.',
        tech: [
            'HTML',
            'CSS',
            'JavaScript',
            'TypeScript',
            'PHP',
            'Laravel',
            'React',
            'Next.js',
            'NestJS',
        ],
        evidence: 'Explore my development work',
        href: '/projects',
    },
    {
        id: 'mobile',
        title: 'Mobile applications',
        subtitle: 'IDEA → APPLICATION',
        text: 'Mobile experiences with customisable content and local persistence.',
        tech: ['Flutter', 'Dart', 'Ionic', 'SQLite', 'React Native', 'Expo'],
        evidence: 'Explore Juego del Impostor',
        href: '/projects#juego-impostor',
    },
    {
        id: 'systems',
        title: 'Systems and automation',
        subtitle: 'INFRASTRUCTURE + AUTOMATION',
        text: 'Windows and Linux server administration and task automation with TypeScript.',
        tech: ['Linux', 'Windows Server', 'Node.js', 'Playwright'],
        evidence: 'Explore MonitorStockTS',
        href: '/projects#monitorstock',
    },
    {
        id: 'security',
        title: 'Security and teaching',
        subtitle: 'SHARED KNOWLEDGE',
        text: 'Teaching and facilitating the INCIBE–UNED cybersecurity course for Spanish law enforcement agencies.',
        tech: ['Cybersecurity', 'Moodle', 'Training'],
        evidence: 'View UNED experience',
        href: '/experience',
    },
    {
        id: 'databases',
        title: 'Databases',
        subtitle: 'RELATIONAL + DOCUMENT',
        text: 'MySQL in my current role at Be Call, alongside knowledge of MongoDB. SQLite for local mobile storage and Prisma in Game Library.',
        tech: ['MySQL', 'MongoDB', 'SQLite', 'Prisma'],
        evidence: 'View my experience',
        href: '/experience',
    },
    {
        id: 'cms',
        title: 'WordPress and SEO',
        subtitle: 'CONTENT + DISCOVERABILITY',
        text: 'Website creation and maintenance at IP Informática Profesional, with visual layouts, e-commerce and on-page search optimisation.',
        tech: ['WordPress', 'Elementor', 'WooCommerce', 'SEO'],
        evidence: 'View my experience',
        href: '/experience',
    },
];

// El PDF local se sirve desde public/cv. Puede sustituirse por una URL de descarga pública.
export const resume = {
    url: '/cv/adrian-rodriguez-del-rio.pdf',
    filename: 'Adrian-Rodriguez-del-Rio-CV.pdf',
};

// Formación contrastada con LinkedIn; los nombres se traducen para mantener la interfaz en inglés.
export const education: EducationItem[] = [
    {
        id: 'daw',
        title: 'Higher Technician in Web Application Development (DAW)',
        kind: 'qualification',
        status: 'completed',
        institution: 'CIFP Ponferrada',
        period: 'Sep 2018 – Jun 2020',
    },
    {
        id: 'cybersecurity-iot',
        title: 'Cybersecurity and IoT',
        kind: 'course',
        status: 'completed',
        institution: 'UNED',
        period: 'Nov 2025',
    },
    {
        id: 'online-tutoring',
        title: 'Tutoring Courses in Online Learning Environments',
        kind: 'course',
        status: 'completed',
        institution: 'Adams',
        period: 'Oct 2025',
    },
    {
        id: 'iot-cybersecurity',
        title: 'IoT and Cybersecurity in Rural Environments: Trends and Best Practices',
        kind: 'course',
        status: 'completed',
        institution: 'UNED',
        period: 'Jul 2024',
    },
    {
        id: 'digital-marketing-ai',
        title: 'Digital Marketing and Artificial Intelligence',
        kind: 'course',
        status: 'completed',
        institution: 'UNED',
        period: 'Jul 2024',
    },
];

export const socialLinks = {
    github: 'https://github.com/Drakko99',
    linkedin: 'https://www.linkedin.com/in/adrián-rodríguez-del-río-15446b2bb/',
    email: 'adrianrdr17@gmail.com',
};
