import assert from 'node:assert/strict';
import { Window } from 'happy-dom';
import { build } from 'vite';
import { mkdtemp, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';

const project = fileURLToPath(new URL('../', import.meta.url));
const output = await mkdtemp(join(project, '.qa-app-'));
let root, window, act;
try {
    await build({
        root: project,
        configFile: `${project}/vite.config.ts`,
        logLevel: 'error',
        build: { ssr: `${project}/src/App.tsx`, outDir: output, emptyOutDir: true, minify: false },
    });
    process.env.NODE_ENV = 'development';
    window = new Window({ url: 'http://localhost/' });
    window.matchMedia = (query) => ({
        matches: query.includes('hover: hover'),
        media: query,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
    });
    window.document.documentElement.lang = 'en';
    window.localStorage.setItem('drakko-display', JSON.stringify({ calm: true }));
    for (const name of [
        'window',
        'document',
        'navigator',
        'HTMLElement',
        'HTMLInputElement',
        'HTMLButtonElement',
        'Element',
        'SVGElement',
        'Node',
        'NodeFilter',
        'DocumentFragment',
        'MutationObserver',
        'ResizeObserver',
        'CustomEvent',
        'Event',
        'FocusEvent',
        'KeyboardEvent',
        'MouseEvent',
        'PointerEvent',
        'getComputedStyle',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'localStorage',
        'CSS',
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
    act = React.act;
    const { createRoot } = await import('react-dom/client');
    const { default: App } = await import(pathToFileURL(join(output, 'App.js')).href);
    const { default: axe } = await import('axe-core');
    const mount = document.createElement('div');
    document.body.append(mount);
    root = createRoot(mount);
    /** Deja terminar las actualizaciones asíncronas de los componentes. */
    const settle = () => new Promise((resolve) => setTimeout(resolve, 30));
    await act(async () => {
        root.render(React.createElement(App));
        await settle();
    });
    /** Ejecuta una interacción dentro del ciclo de actualización de React. */
    const interact = async (action) => {
        await act(action);
        await act(settle);
    };
    /** Simula una tecla sobre el elemento indicado. */
    const press = async (element, key) =>
        interact(() => {
            element.dispatchEvent(
                new window.KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
            );
        });
    /** Comprueba que existe el destino antes de simular su activación. */
    const click = async (element) =>
        interact(() => {
            assert.ok(element, 'click target exists');
            element.click();
        });
    /** Comprueba las reglas semánticas compatibles con el DOM simulado. */
    const audit = async (name) => {
        // Happy DOM no calcula el diseño: esta comprobación semántica no certifica WCAG.
        const result = await axe.run(document, {
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
            rules: { 'color-contrast': { enabled: false } },
        });
        assert.deepEqual(
            result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.html) })),
            [],
            `${name}: semantic axe violations`
        );
        console.log(
            `PASS: ${name}, axe ${result.passes.length} passed rules; manual review: ${result.incomplete.map((v) => v.id).join(', ') || 'none returned'}.`
        );
        for (const issue of result.incomplete)
            console.log(
                JSON.stringify({
                    rule: issue.id,
                    nodes: issue.nodes.map((node) => ({
                        html: node.html,
                        reason: node.failureSummary,
                    })),
                })
            );
    };
    assert.equal(document.querySelectorAll('h1').length, 1);
    assert.ok(document.querySelector('.home-copy'));
    assert.ok(document.querySelector('.home-console'));
    const resumeLink = document.querySelector('.home-actions a[download]');
    assert.equal(resumeLink.getAttribute('href'), '/cv/adrian-rodriguez-del-rio.pdf');
    assert.equal(resumeLink.getAttribute('download'), 'Adrian-Rodriguez-del-Rio-CV.pdf');
    assert.match(resumeLink.textContent, /Download CV/);
    assert.equal(document.querySelector('.home-page .stack-grid'), null);
    assert.equal(document.documentElement.dataset.motion, 'off');
    assert.notEqual(document.activeElement?.id, 'terminal-input');
    await audit('Home');

    const input = document.getElementById('terminal-input');
    const shortcuts = [...document.querySelectorAll('.terminal-shortcuts button')];
    await click(shortcuts.find((b) => b.textContent === 'about'));
    assert.match(document.querySelector('[role=log]').textContent, /Adrián Rodríguez del Río/);
    assert.equal(document.activeElement?.id, 'terminal-input');
    await click(shortcuts.find((b) => b.textContent === 'projects'));
    assert.match(
        document.querySelector('[role=log]').textContent,
        /github.com\/Drakko99\/juego_impostor/
    );
    await press(input, 'ArrowUp');
    assert.equal(input.value, 'projects');
    await press(input, 'ArrowUp');
    assert.equal(input.value, 'about');
    await press(input, 'ArrowDown');
    assert.equal(input.value, 'projects');
    await press(input, 'ArrowDown');
    assert.equal(input.value, '');
    await act(async () => {
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(
            input,
            '<script>alert(1)</script>'
        );
        input.dispatchEvent(new window.Event('input', { bubbles: true }));
    });
    await act(async () =>
        document
            .querySelector('.terminal-form')
            .dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }))
    );
    assert.match(document.querySelector('[role=log]').textContent, /Unknown command: <script>/);
    assert.equal(document.querySelector('[role=log] script'), null);
    await click(shortcuts.find((b) => b.textContent === 'clear'));
    assert.equal(document.querySelectorAll('.terminal-entry').length, 0);
    console.log('PASS: console output, focus, history, form submit, HTML escaping and clear.');

    const contact = document.querySelector('.contact-trigger');
    await press(contact, 'ArrowDown');
    assert.equal(
        document.getElementById(contact.getAttribute('aria-controls'))?.getAttribute('role'),
        'menu'
    );
    assert.equal(document.querySelectorAll('[role=menuitem]').length, 3);
    assert.match(document.activeElement.textContent, /GitHub/);
    assert.ok(document.querySelector('[role=menuitem][href^="mailto:"]'));
    await audit('Contact menu');
    await press(document.activeElement, 'ArrowDown');
    assert.match(document.activeElement.textContent, /LinkedIn/);
    await press(document.activeElement, 'Escape');
    assert.equal(document.querySelector('[role=menu]'), null);
    assert.equal(document.activeElement?.className, 'nav-action contact-trigger');

    const display = document.querySelector('[aria-label="Accessibility and appearance options"]');
    await press(display, 'ArrowDown');
    assert.equal(
        document.getElementById(display.getAttribute('aria-controls'))?.getAttribute('role'),
        'menu'
    );
    const contrast = [...document.querySelectorAll('[role=menuitemcheckbox]')].find((n) =>
        n.textContent.includes('High contrast')
    );
    await click(contrast);
    assert.equal(contrast.getAttribute('aria-checked'), 'true');
    assert.equal(document.documentElement.dataset.contrast, 'high');
    assert.equal(JSON.parse(localStorage.getItem('drakko-display')).contrast, true);
    await audit('Appearance menu');
    await press(document.activeElement, 'Escape');
    console.log(
        'PASS: menu keyboard navigation, Escape focus restoration and persisted display settings.'
    );

    for (const [route, heading] of [
        ['/projects', 'Projects of my own.'],
        ['/stack', 'My stack.'],
        ['/experience', 'Experience'],
    ]) {
        await click(document.querySelector(`.desktop-links a[href="${route}"]`));
        assert.equal(window.location.pathname, route);
        assert.equal(document.querySelector('h1').textContent, heading);
        assert.equal(document.querySelectorAll('h1').length, 1);
        assert.equal(document.activeElement.id, 'main-content');
        assert.ok(document.querySelector(`.desktop-links a[href="${route}"][aria-current=page]`));
        if (route === '/projects') {
            assert.ok(
                document.querySelector('a[href="https://github.com/Drakko99/game-library-mobile"]')
            );
            assert.equal(document.querySelector('.project-links button').disabled, true);
            assert.equal(document.querySelectorAll('.project-card').length, 3);
            assert.equal(
                document.querySelectorAll('.project-links a[href^="https://github.com/"]').length,
                4
            );
            assert.equal(
                document.querySelectorAll('.project-links a[href^="https://play.google.com/"]')
                    .length,
                1
            );
        }
        if (route === '/stack') {
            assert.equal(document.querySelectorAll('.education-qualification').length, 1);
            assert.equal(document.querySelectorAll('.education-course').length, 4);
            assert.match(document.querySelector('.stack-grid').textContent, /MongoDB/);
            assert.match(document.querySelector('.stack-grid').textContent, /MySQL/);
            assert.match(document.querySelector('.education-section').textContent, /Adams/);
        }
        await audit(route);
    }
    await press(document.querySelector('[aria-label="Open navigation"]'), 'ArrowDown');
    assert.equal(document.querySelectorAll('[role=menuitem]').length, 4);
    await click(document.querySelector('[role=menuitem][href="/stack"]'));
    assert.equal(window.location.pathname, '/stack');
    assert.equal(document.querySelector('[role=menu]'), null);
    await click(document.querySelector('a[href="/projects#juego-impostor"]'));
    assert.equal(window.location.hash, '#juego-impostor');
    assert.ok(document.getElementById('juego-impostor'));
    await act(async () => {
        window.history.pushState({}, '', '/projects#%invalid');
        window.dispatchEvent(new window.PopStateEvent('popstate'));
        await settle();
    });
    assert.ok(document.querySelector('.projects-page'));
    await act(async () => {
        window.history.pushState({}, '', '/missing');
        window.dispatchEvent(new window.PopStateEvent('popstate'));
        await settle();
    });
    assert.ok(document.querySelector('.not-found'));
    await audit('404');
    await click(document.querySelector('.not-found a'));
    assert.equal(window.location.pathname, '/');
    console.log(
        'PASS: all routes, titles, focus, repo/store links, mobile menu, hash links, invalid fragment and 404 recovery. No browser layout assertions.'
    );
} finally {
    if (root && act) await act(async () => root.unmount());
    if (window) await window.happyDOM.abort();
    await rm(output, { recursive: true, force: true });
}
