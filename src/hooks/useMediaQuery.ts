import { useCallback, useSyncExternalStore } from 'react';

/** Ofrece un valor seguro al renderizar fuera del navegador. */
function getServerSnapshot() {
    return false;
}

/** Mantiene una consulta de medios sincronizada al cambiar el dispositivo o la ventana. */
export function useMediaQuery(query: string) {
    /** Registra el aviso de cambio y lo retira cuando deja de necesitarse. */
    const subscribe = useCallback(
        (notify: () => void) => {
            const media = window.matchMedia(query);
            media.addEventListener('change', notify);
            return () => media.removeEventListener('change', notify);
        },
        [query]
    );

    /** Lee el valor actual; React compara la respuesta antes de volver a renderizar. */
    const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
