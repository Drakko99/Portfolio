import type { ReactNode, PointerEvent } from 'react';
import { usePreferences } from '../context/preferences';

interface GlowSurfaceProps {
    children: ReactNode;
    className?: string;
    as?: 'div' | 'article';
}

/** Añade un reflejo al contenedor sin imponer la semántica de una tarjeta. */
export default function GlowSurface({
    children,
    className = '',
    as: Tag = 'div',
}: GlowSurfaceProps) {
    const { preferences, reduceMotion } = usePreferences();

    /** Sitúa el brillo con coordenadas relativas al contenedor. */
    function handlePointerMove(event: PointerEvent<HTMLElement>) {
        if (event.pointerType !== 'mouse' || reduceMotion || preferences.contrast) return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--glow-x', `${event.clientX - box.left}px`);
        event.currentTarget.style.setProperty('--glow-y', `${event.clientY - box.top}px`);
    }

    return (
        <Tag className={`glow-surface ${className}`} onPointerMove={handlePointerMove}>
            {children}
        </Tag>
    );
}
