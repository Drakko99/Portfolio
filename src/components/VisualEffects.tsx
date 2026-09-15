import { Component, lazy, Suspense, type ReactNode } from 'react';
import { usePreferences } from '../context/preferences';
import { useMediaQuery } from '../hooks/useMediaQuery';
import CursorHalo from './CursorHalo';

// El contenido de la página puede mostrarse mientras se descarga la escena 3D.
const WebGLBackground = lazy(() => import('./WebGLBackground'));

class BackgroundBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: false };

    /** Aísla los errores del fondo para que el portfolio siga siendo utilizable. */
    static getDerivedStateFromError() {
        return { failed: true };
    }

    /** Omite únicamente la decoración cuando el navegador no puede mostrarla. */
    render() {
        return this.state.failed ? null : this.props.children;
    }
}

/** Agrupa los efectos y aplica las preferencias visuales antes de cargar WebGL. */
export default function VisualEffects() {
    const { preferences, reduceMotion } = usePreferences();
    const forcedColors = useMediaQuery('(forced-colors: active)');
    const showBackground = !reduceMotion && !preferences.contrast && !forcedColors;

    return (
        <>
            {showBackground && (
                <BackgroundBoundary>
                    <Suspense fallback={null}>
                        <WebGLBackground />
                    </Suspense>
                </BackgroundBoundary>
            )}
            <CursorHalo />
        </>
    );
}
