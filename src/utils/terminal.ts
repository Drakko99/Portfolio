import { profile, projects, socialLinks, techStack } from '../data/portfolioData.ts';
export function terminalResponse(command: string): string | null {
    switch (command.trim().toLowerCase()) {
        case 'help': return 'about     About me\nskills    Technologies\nprojects  My projects\ncontact   Contact\nclear     Clear the terminal';
        case 'about': return `${profile.name}\n${profile.role}\n\n${profile.bio}`;
        case 'skills': return `Languages: ${techStack.languages.map(skill => skill.name).join(', ')}.\n\nWeb, mobile and systems. Find practical examples on the Stack page.`;
        case 'projects': return projects.map(project => `${project.name}\n${project.github}${project.mobileGithub ? `\n${project.mobileGithub}` : ''}`).join('\n\n');
        case 'contact': return `Email: ${socialLinks.email}\nGitHub: ${socialLinks.github}\nLinkedIn: ${socialLinks.linkedin}\n\nLinks are available in the Contact menu above.`;
        case 'clear': return null;
        default: return `Unknown command: ${command.trim()}. Type help to see available commands.`;
    }
}
