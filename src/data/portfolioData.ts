import type { EducationItem, Experience, Profile, Project, SkillArea } from '../types/portfolio';

export const profile: Profile = {
    name: 'Adrián Rodríguez del Río',
    handle: '@Drakko99',
    role: 'Full-Stack Developer // Systems Administrator',
    bio: 'I’m a full-stack developer with a background in systems administration. I enjoy turning ideas into web and mobile applications, understanding how each part works and finding ways to improve it. I care about clear code, accessibility and building software that people find useful.',
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
            'Taught and supported learners on an INCIBE–UNED cybersecurity course for Spanish law enforcement agencies, using Moodle to guide their learning.',
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
            'Built and maintained educational web and mobile applications with TypeScript, Laravel and Ionic. Worked on APIs, accessibility with NVDA, and Windows and Linux server administration.',
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
            'A party game played on one phone. Each player checks their word in private, then the group tries to work out who the impostor is.',
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
        slug: 'game-library',
        name: 'Game Library',
        category: 'WEB + MOBILE',
        kind: 'library',
        status: 'development',
        description:
            'A game library I’m building for web and mobile. Both interfaces share a NestJS API and a MySQL database accessed through Prisma.',
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
    {
        id: 3,
        slug: 'monitorstock',
        name: 'MonitorStockTS',
        category: 'AUTOMATION',
        kind: 'automation',
        status: 'open-source',
        description:
            'A TypeScript tool for checking product availability at regular intervals and reporting changes in the console.',
        highlights: [
            'Configurable intervals and matching patterns.',
            'Scraping with Axios, Cheerio and Playwright.',
        ],
        tech: ['TypeScript', 'Node.js', 'Playwright'],
        github: 'https://github.com/Drakko99/MonitorStockTS',
    },
    {
        id: 4,
        slug: 'todo-app',
        name: 'ToDo App',
        category: 'WEB APPLICATION',
        kind: 'tasks',
        status: 'learning',
        description:
            'A PHP and MySQL task manager, built to practise working with forms, sessions and relational data without a framework.',
        highlights: [
            'Create, edit and organise tasks by status and due date.',
            'Search, sorting, an activity log and webhook integration.',
            'Includes a REST API for local development and experimentation.',
        ],
        tech: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/Drakko99/todo_app',
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
        text: 'Web applications and APIs, from responsive interfaces to business logic and backend services.',
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
        text: 'Cross-platform mobile applications with customisable content, local storage and interfaces designed for touch.',
        tech: ['Flutter', 'Dart', 'Ionic', 'SQLite', 'React Native', 'Expo'],
        evidence: 'Explore Juego del Impostor',
        href: '/projects#juego-impostor',
    },
    {
        id: 'systems',
        title: 'Systems and automation',
        subtitle: 'INFRASTRUCTURE + AUTOMATION',
        text: 'Windows and Linux server administration, scripting and task automation with TypeScript and Node.js.',
        tech: ['Linux', 'Windows Server', 'Node.js', 'Playwright'],
        evidence: 'Explore MonitorStockTS',
        href: '/projects#monitorstock',
    },
    {
        id: 'security',
        title: 'Security and teaching',
        subtitle: 'SHARED KNOWLEDGE',
        text: 'Teaching and supporting learners on the INCIBE–UNED cybersecurity course for Spanish law enforcement agencies, using Moodle.',
        tech: ['Cybersecurity', 'Moodle', 'Training'],
        evidence: 'View UNED experience',
        href: '/experience',
    },
    {
        id: 'databases',
        title: 'Databases',
        subtitle: 'RELATIONAL + DOCUMENT',
        text: 'Relational data with MySQL and SQLite, knowledge of document databases with MongoDB, and application data access through Prisma.',
        tech: ['MySQL', 'MongoDB', 'SQLite', 'Prisma'],
        evidence: 'View my experience',
        href: '/experience',
    },
    {
        id: 'cms',
        title: 'WordPress and SEO',
        subtitle: 'CONTENT + DISCOVERABILITY',
        text: 'WordPress website creation and maintenance, visual layouts with Elementor, e-commerce with WooCommerce and on-page SEO.',
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
        id: 'ai-development',
        title: 'AI Development Course: The New Programmer',
        kind: 'course',
        status: 'in-progress',
        institution: 'BIG School',
        instructor: 'Brais Moure',
        period: 'Sep 2026 – Present',
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
