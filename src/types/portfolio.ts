import type { MonthDate } from '../utils/timeline';

export interface Profile {
    name: string;
    handle: string;
    role: string;
    bio: string;
}

export interface Experience {
    id: number;
    title: string;
    displayTitle?: string;
    company: string;
    displayCompany?: string;
    location: string;
    period: string;
    startDate: MonthDate;
    endDate: MonthDate | null;
    description: string;
    tech: string[];
}

export type ProjectKind = 'game' | 'automation' | 'library';
export type ProjectStatus = 'published' | 'open-source' | 'development';

export interface Project {
    id: number;
    slug: string;
    name: string;
    category: string;
    kind: ProjectKind;
    status: ProjectStatus;
    description: string;
    highlights: string[];
    tech: string[];
    github: string;
    mobileGithub?: string;
    store?: string;
}

export type SkillAreaId = 'web' | 'mobile' | 'systems' | 'security';

export interface SkillArea {
    id: SkillAreaId;
    title: string;
    subtitle: string;
    text: string;
    tech: string[];
    evidence: string;
    href: string;
}
