import type { ReactNode, PointerEvent } from 'react';
export default function GlowSurface({ children, className = '' }: { children: ReactNode; className?: string }) {
    const move = (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType !== 'mouse') return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--glow-x', `${event.clientX - box.left}px`);
        event.currentTarget.style.setProperty('--glow-y', `${event.clientY - box.top}px`);
    };
    return <article className={`glow-surface ${className}`} onPointerMove={move}>{children}</article>;
}
