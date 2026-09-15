import assert from 'node:assert/strict';
import { Window } from 'happy-dom';
import { build } from 'vite';
import { mkdtemp, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';

const project = fileURLToPath(new URL('../', import.meta.url));
const output = await mkdtemp(join(project, '.qa-effects-'));
let root, window, act;
try {
    await build({
        root: project,
        logLevel: 'error',
        build: {
            ssr: join(project, 'tests/fixtures/EffectsHarness.tsx'),
            outDir: output,
            minify: false,
        },
    });
    process.env.NODE_ENV = 'development';
    window = new Window({ url: 'http://localhost/' });
    const queries = new Map();
    /** Conserva cada consulta para poder emitir cambios del dispositivo. */
    window.matchMedia = (query) => {
        if (!queries.has(query)) {
            const media = new window.EventTarget();
            media.matches = query.includes('hover: hover');
            media.media = query;
            media.addListener = (listener) => media.addEventListener('change', listener);
            media.removeListener = (listener) => media.removeEventListener('change', listener);
            queries.set(query, media);
        }
        return queries.get(query);
    };
    window.localStorage.setItem('drakko-display', JSON.stringify({ halo: true }));
    for (const name of [
        'window',
        'document',
        'navigator',
        'HTMLElement',
        'Element',
        'Node',
        'getComputedStyle',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'localStorage',
    ]) {
        const value = name === 'window' ? window : window[name];
        Object.defineProperty(globalThis, name, {
            value:
                typeof value === 'function' &&
                ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame'].includes(name)
                    ? value.bind(window)
                    : value,
            configurable: true,
        });
    }
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    const React = await import('react');
    act = React.act;
    const { createRoot } = await import('react-dom/client');
    const { default: Harness } = await import(
        pathToFileURL(join(output, 'EffectsHarness.js')).href
    );
    const mount = document.createElement('div');
    document.body.append(mount);
    root = createRoot(mount);
    await act(async () => root.render(React.createElement(Harness)));
    const halo = document.querySelector('.cursor-halo');
    /** Emite un movimiento realista sin depender de coordenadas calculadas por un navegador. */
    const move = (pointerType) =>
        window.dispatchEvent(
            new window.PointerEvent('pointermove', { pointerType, clientX: 120, clientY: 80 })
        );
    await act(async () => move('mouse'));
    assert.equal(halo.style.opacity, '1');
    assert.equal(halo.style.transform, 'translate(120px, 80px)');
    window.dispatchEvent(new window.Event('blur'));
    assert.equal(halo.style.opacity, '0');
    move('touch');
    assert.equal(halo.style.opacity, '0');
    const mouse = queries.get('(hover: hover) and (pointer: fine)');
    await act(async () => {
        mouse.matches = false;
        mouse.dispatchEvent(new window.Event('change'));
    });
    move('mouse');
    assert.equal(halo.style.opacity, '0');
    await act(async () => {
        mouse.matches = true;
        mouse.dispatchEvent(new window.Event('change'));
    });
    move('mouse');
    assert.equal(halo.style.opacity, '1');
    const colors = queries.get('(forced-colors: active)');
    await act(async () => {
        colors.matches = true;
        colors.dispatchEvent(new window.Event('change'));
    });
    assert.equal(halo.style.opacity, '0');
    move('mouse');
    assert.equal(halo.style.opacity, '0');
    for (const state of ['hidden', 'visible']) {
        await act(async () => {
            Object.defineProperty(document, 'visibilityState', {
                value: state,
                configurable: true,
            });
            document.dispatchEvent(new window.Event('visibilitychange'));
        });
        assert.equal(document.querySelector('output').textContent, state);
    }
    console.log(
        'PASS: halo follows mouse, ignores touch, hides on blur, reacts to device/forced-color changes; visibility hook updates. No WebGL rendering assertions.'
    );
} finally {
    if (root && act) await act(async () => root.unmount());
    if (window) await window.happyDOM.abort();
    await rm(output, { recursive: true, force: true });
}
