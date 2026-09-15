import { useSyncExternalStore } from 'react';

/** Escucha cambios de pestaña para detener el trabajo gráfico que no se ve. */
function subscribe(notify: () => void) {
    document.addEventListener('visibilitychange', notify);
    return () => document.removeEventListener('visibilitychange', notify);
}

/** Comprueba si el documento sigue visible para el usuario. */
function getSnapshot() {
    return document.visibilityState === 'visible';
}

/** Evita iniciar animaciones durante una renderización sin navegador. */
function getServerSnapshot() {
    return false;
}

/** Informa al fondo de cuándo debe pausar o reanudar su bucle de renderizado. */
export function usePageVisibility() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
