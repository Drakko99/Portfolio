import { test } from 'node:test';
import assert from 'node:assert/strict';
import { terminalResponse } from '../src/utils/terminal.ts';
import { projects, socialLinks } from '../src/data/portfolioData.ts';

test('console commands accept spaces and case changes', () => {
    assert.match(terminalResponse('  ABOUT  '), /Adrián Rodríguez del Río/);
    for (const command of ['about', 'skills', 'projects', 'contact', 'clear']) {
        assert.ok(terminalResponse('help').includes(command));
    }
    assert.match(terminalResponse('skills'), /TypeScript/);
});
test('console shares the actual project and contact data', () => {
    for (const project of projects) {
        assert.ok(terminalResponse('projects').includes(project.github));
        if (project.mobileGithub) assert.ok(terminalResponse('projects').includes(project.mobileGithub));
    }
    for (const address of Object.values(socialLinks)) assert.ok(terminalResponse('contact').includes(address));
});
test('clear resets output and unknown input is returned as text', () => {
    assert.equal(terminalResponse(' CLEAR '), null);
    assert.equal(terminalResponse('<script>alert(1)</script>'), 'Unknown command: <script>alert(1)</script>. Type help to see available commands.');
});
