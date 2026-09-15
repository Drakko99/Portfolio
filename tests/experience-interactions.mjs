import assert from 'node:assert/strict';
import { Window } from 'happy-dom';
import { build } from 'vite';
import { mkdtemp, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
const project = fileURLToPath(new URL('../', import.meta.url));
const output = await mkdtemp(join(project, '.qa-experience-'));
let root, window, act;
try {
    await build({
        root: project,
        configFile: `${project}/vite.config.ts`,
        logLevel: 'error',
        build: {
            ssr: `${project}/tests/fixtures/ExperienceHarness.tsx`,
            outDir: output,
            emptyOutDir: true,
            minify: false,
        },
    });
    process.env.NODE_ENV = 'development';
    window = new Window();
    window.matchMedia = (query) => ({
        matches: query.includes('prefers-reduced-motion') || query.includes('hover: hover'),
        media: query,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
    });
    for (const name of [
        'window',
        'document',
        'navigator',
        'HTMLElement',
        'Element',
        'SVGElement',
        'Node',
        'MutationObserver',
        'getComputedStyle',
        'requestAnimationFrame',
        'cancelAnimationFrame',
    ]) {
        const value = name === 'window' ? window : window[name];
        if (value)
            Object.defineProperty(globalThis, name, {
                value:
                    typeof value === 'function' &&
                    ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(
                        name
                    )
                        ? value.bind(window)
                        : value,
                configurable: true,
            });
    }
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const React = await import('react');
    const { createElement } = React;
    act = React.act;
    const { createRoot } = await import('react-dom/client');
    const { default: Experience } = await import(
        pathToFileURL(join(output, 'ExperienceHarness.js')).href
    );
    const mount = document.createElement('div');
    document.body.append(mount);
    root = createRoot(mount);
    await act(async () => root.render(createElement(Experience)));
    const cards = [...document.querySelectorAll('.timeline-card')];
    assert.equal(cards.length, 4);
    assert.match(cards[0].textContent, /Be Call Group/);
    assert.match(cards[3].textContent, /IP Informática/);
    assert.equal(document.querySelector('#timeline-help'), null);
    const button = cards[0].querySelector('button');
    const details = document.getElementById(button.getAttribute('aria-controls'));
    /** Construye entradas y salidas de puntero para distinguir ratón y pantalla táctil. */
    const event = (name, pointerType) =>
        new window.PointerEvent(name, { bubbles: true, pointerType, relatedTarget: document.body });
    assert.equal(button.getAttribute('aria-expanded'), 'false');
    await act(async () => cards[0].dispatchEvent(event('pointerover', 'mouse')));
    assert.equal(button.getAttribute('aria-expanded'), 'true');
    assert.equal(details.hasAttribute('inert'), false);
    await act(async () => cards[0].dispatchEvent(event('pointerout', 'mouse')));
    assert.equal(button.getAttribute('aria-expanded'), 'false');
    await act(async () => cards[0].dispatchEvent(event('pointerover', 'touch')));
    assert.equal(button.getAttribute('aria-expanded'), 'false');
    await act(async () => button.click());
    assert.equal(button.getAttribute('aria-expanded'), 'true');
    await act(async () => cards[0].dispatchEvent(event('pointerout', 'touch')));
    assert.equal(button.getAttribute('aria-expanded'), 'true');
    await act(async () =>
        button.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    );
    assert.equal(button.getAttribute('aria-expanded'), 'false');
    assert.equal(details.hasAttribute('inert'), true);
    // Cerrar con un clic mantiene la tarjeta cerrada hasta que el ratón vuelva a entrar.
    await act(async () => cards[0].dispatchEvent(event('pointerover', 'mouse')));
    await act(async () => button.click());
    assert.equal(button.getAttribute('aria-expanded'), 'false');
    await act(async () => cards[0].dispatchEvent(event('pointerout', 'mouse')));
    await act(async () => cards[0].dispatchEvent(event('pointerover', 'mouse')));
    assert.equal(button.getAttribute('aria-expanded'), 'true');
    console.log(
        'PASS: four real cards, reverse order, removed help text, mouse hover enter/leave, touch exclusion, click persistence, Escape, inert state, close during hover and reopen. DOM simulation only; no layout assertions.'
    );
} finally {
    if (root && act) await act(async () => root.unmount());
    if (window) await window.happyDOM.abort();
    await rm(output, { recursive: true, force: true });
}
