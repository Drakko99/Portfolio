export const profile = {
    name: 'Adrián Rodríguez del Río',
    handle: '@Drakko99',
    role: 'Full-Stack Developer // Systems Administrator',
    bio: 'IT Systems Administration Specialist and Full Stack Developer with experience in building and maintaining web and mobile applications. Passionate about accessible development and efficient technology solutions.',
};

export const experience = [
    {
        id: 1,
        title: 'Programador de Sistemas',
        company: 'Be Call Group',
        location: 'León, España · Remoto',
        period: 'Jun 2025 - Presente',
        duration: '1 año 3 meses',
        description: 'Desarrollo y mantenimiento de sistemas con PHP y bases de datos. Programación full-stack para aplicaciones web empresariales.',
        tech: ['PHP', 'Bases de Datos', 'Full-Stack'],
        type: 'Jornada completa',
    },
    {
        id: 2,
        title: 'Docente-Dinamizador en curso de ciberseguridad INCIBE-UNED',
        company: 'Universidad Nacional de Educación a Distancia (UNED)',
        location: 'Ponferrada, España · Remoto',
        period: 'Jul 2025 - Ene 2026',
        duration: '7 meses',
        description: 'Docente dinamizador en curso de ciberseguridad para las Fuerzas y Cuerpos de Seguridad del Estado. Formación especializada en seguridad informática.',
        tech: ['Ciberseguridad', 'Moodle', 'Formación'],
        type: 'Contrato temporal',
    },
    {
        id: 3,
        title: 'Programador Full Stack',
        company: 'INTECCA - UNED',
        location: 'Ponferrada, España · Presencial',
        period: 'Feb 2024 - Feb 2025',
        duration: '1 año 1 mes',
        description: 'Administración y configuración de servidores (Windows y Linux), garantizando disponibilidad y seguridad. Programación full stack con TypeScript, Laravel e Ionic para la creación y mantenimiento de plataformas educativas.',
        tech: ['TypeScript', 'Laravel', 'Ionic', 'Linux', 'Windows Server'],
        type: 'Jornada completa',
    },
    {
        id: 4,
        title: 'Desarrollador Web',
        company: 'IP Informática Profesional',
        location: 'Ponferrada, España · Presencial',
        period: 'Mar 2020 - Jul 2020',
        duration: '5 meses',
        description: 'Desarrollo de aplicaciones web y sistemas informáticos. Mantenimiento y optimización de plataformas existentes.',
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        type: 'Jornada completa',
    },
];

export const projects = [
    {
        id: 1,
        name: 'Juego del Impostor',
        subtitle: 'juego_impostor',
        description: 'Juego social del impostor para jugar con amigos en fiestas y quedadas. Aplicación móvil desarrollada completamente en Flutter/Dart con sincronización en tiempo real.',
        tech: ['Flutter', 'Dart', 'Real-time'],
        github: 'https://github.com/Drakko99/juego_impostor',
        store: 'https://play.google.com/store/apps/details?id=com.drakko99.juego_impostor&pcampaignid=web_share',
        published: true,
    },
    {
        id: 2,
        name: 'MonitorStockTS',
        subtitle: 'Stock Monitor',
        description: 'Script avanzado para monitorizar la disponibilidad de stock en tiendas online. Notificaciones instantáneas cuando un producto vuelve a estar disponible.',
        tech: ['TypeScript', 'Node.js', 'Web Scraping'],
        github: 'https://github.com/Drakko99/MonitorStockTS',
        published: false,
    },
    {
        id: 3,
        name: 'Game Library Web',
        subtitle: 'game-library-web',
        description: 'Cliente web para biblioteca personal de videojuegos. Gestión completa del catálogo con interfaz moderna y responsive.',
        tech: ['Next.js', 'TypeScript', 'React'],
        github: 'https://github.com/Drakko99/game-library-web',
        published: false,
    },
];

export const techStack = {
    languages: [
        { name: 'TypeScript', level: 95, color: 'text-cyan-400' },
        { name: 'PHP', level: 90, color: 'text-indigo-400' },
        { name: 'JavaScript', level: 92, color: 'text-yellow-400' },
        { name: 'Java', level: 85, color: 'text-red-400' },
        { name: 'Dart', level: 88, color: 'text-blue-400' },
        { name: 'Python', level: 75, color: 'text-green-400' },
    ],
    allTools: [
        { name: 'React', category: 'Frontend' },
        { name: 'Next.js', category: 'Frontend' },
        { name: 'Flutter', category: 'Mobile' },
        { name: 'Vue.js', category: 'Frontend' },
        { name: 'Angular', category: 'Frontend' },
        { name: 'Ionic', category: 'Mobile' },
        { name: 'Laravel', category: 'Backend' },
        { name: 'Node.js', category: 'Backend' },
        { name: 'Spring Boot', category: 'Backend' },
        { name: 'MySQL', category: 'Database' },
        { name: 'MongoDB', category: 'Database' },
        { name: 'Docker', category: 'DevOps' },
        { name: 'Kubernetes', category: 'DevOps' },
        { name: 'Linux Admin', category: 'Systems' },
        { name: 'Git/GitLab', category: 'Tools' },
    ],
};

export const socialLinks = {
    github: 'https://github.com/Drakko99',
    linkedin: 'https://www.linkedin.com/in/adrián-rodríguez-del-río-15446b2bb/',
    email: 'adrianrdr17@gmail.com',
};
