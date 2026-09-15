import { useEffect, useRef } from 'react';
import { usePreferences } from '../context/preferences';
import { useMediaQuery } from '../hooks/useMediaQuery';

/** Dibuja un halo opcional y conserva la forma y el comportamiento del cursor nativo. */
export default function CursorHalo() {
    const halo = useRef<HTMLDivElement>(null);
    const { preferences, reduceMotion } = usePreferences();
    const hasMouse = useMediaQuery('(hover: hover) and (pointer: fine)');
    const forcedColors = useMediaQuery('(forced-colors: active)');
    const enabled =
        preferences.halo && hasMouse && !reduceMotion && !preferences.contrast && !forcedColors;

    // El efecto visual no necesita actualizar el estado de React en cada movimiento.
    useEffect(() => {
        if (!enabled) return;

        /** Mueve el halo a las coordenadas de la ventana sin capturar clics. */
        function handlePointerMove(event: PointerEvent) {
            if (event.pointerType !== 'mouse' || !halo.current) return;
            halo.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
            halo.current.style.opacity = '1';
        }

        /** Oculta el halo al salir del documento o perder el foco de la ventana. */
        function hideHalo() {
            if (halo.current) halo.current.style.opacity = '0';
        }

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        document.addEventListener('pointerleave', hideHalo);
        window.addEventListener('blur', hideHalo);

        /** Retira los listeners y el último halo al desactivar la preferencia. */
        return function cleanup() {
            window.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerleave', hideHalo);
            window.removeEventListener('blur', hideHalo);
            hideHalo();
        };
    }, [enabled]);

    return <div ref={halo} className="cursor-halo" aria-hidden="true" />;
}
