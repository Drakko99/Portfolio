import { Component, lazy, Suspense, useEffect, useRef, type ReactNode } from 'react';
import { usePreferences } from '../context/preferences';
const WebGLBackground = lazy(() => import('./WebGLBackground'));
class BackgroundBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? null : this.props.children; }
}
export default function AmbientBackground() {
    const halo = useRef<HTMLDivElement>(null);
    const { preferences, reduceMotion } = usePreferences();
    useEffect(() => {
        if (!preferences.halo || preferences.contrast || reduceMotion) return;
        const media = window.matchMedia('(hover: hover) and (pointer: fine)');
        if (!media.matches) return;
        const move = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse' || !halo.current) return;
            halo.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
            halo.current.style.opacity = '1';
        };
        const hide = () => { if (halo.current) halo.current.style.opacity = '0'; };
        window.addEventListener('pointermove', move, { passive: true });
        document.addEventListener('pointerleave', hide);
        window.addEventListener('blur', hide);
        return () => {
            window.removeEventListener('pointermove', move);
            document.removeEventListener('pointerleave', hide);
            window.removeEventListener('blur', hide);
            hide();
        };
    }, [preferences.halo, preferences.contrast, reduceMotion]);
    return <>
        {!reduceMotion && !preferences.contrast && <BackgroundBoundary><Suspense fallback={null}><WebGLBackground /></Suspense></BackgroundBoundary>}
        <div ref={halo} className="cursor-halo" aria-hidden="true" />
    </>;
}
