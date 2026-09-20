import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resume } from '../src/data/portfolioData.ts';

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

// Comprueba el alcance del patrón; no sustituye una prueba del despliegue en Vercel.
test('SPA fallback covers navigation without swallowing documents or telemetry', () => {
    const fallback = config.rewrites.find((rule) => rule.destination === '/index.html');
    assert.ok(fallback);
    const pattern = new RegExp(`^${fallback.source}$`);
    for (const route of ['/', '/experience', '/projects', '/stack', '/missing-page']) {
        assert.equal(pattern.test(route), true, route);
    }
    for (const route of [
        resume.url,
        '/cv/missing.pdf',
        '/assets/app.js',
        '/_vercel/speed-insights/script.js',
    ]) {
        assert.equal(pattern.test(route), false, route);
    }
});

test('local CV response is configured as an attachment with cache revalidation', () => {
    const entry = config.headers.find((rule) => rule.source === resume.url);
    assert.ok(entry);
    const headers = Object.fromEntries(entry.headers.map(({ key, value }) => [key, value]));
    assert.equal(headers['Content-Disposition'], `attachment; filename="${resume.filename}"`);
    assert.match(headers['Cache-Control'], /must-revalidate/);
});
