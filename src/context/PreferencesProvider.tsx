import { useEffect, useState, type ReactNode } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { PreferencesContext, type Preferences } from './preferences';
const defaults: Preferences = { contrast: false, calm: false, halo: false };

/** Recupera solo los valores booleanos reconocidos; tolera almacenamiento bloqueado o inválido. */
function readPreferences(): Preferences {
    try {
        const saved = JSON.parse(localStorage.getItem('drakko-display') || '{}');
        return {
            contrast: saved?.contrast === true,
            calm: saved?.calm === true,
            halo: saved?.halo === true,
        };
    } catch {
        return { ...defaults };
    }
}

/** Comparte las preferencias y las sincroniza con CSS, Motion y el almacenamiento local. */
export default function PreferencesProvider({ children }: { children: ReactNode }) {
    const [preferences, setPreferences] = useState<Preferences>(readPreferences);
    const systemReduced = useReducedMotion();
    const reduceMotion = preferences.calm || Boolean(systemReduced);
    // La preferencia del sistema prevalece aunque el usuario no haya marcado la opción local.
    useEffect(() => {
        document.documentElement.dataset.contrast = preferences.contrast ? 'high' : 'normal';
        document.documentElement.dataset.motion = reduceMotion ? 'off' : 'on';
        try {
            localStorage.setItem('drakko-display', JSON.stringify(preferences));
        } catch {
            /* La interfaz sigue funcionando si el navegador bloquea el almacenamiento. */
        }
    }, [preferences, reduceMotion]);
    /** Modifica una opción sin perder las demás preferencias. */
    function update(key: keyof Preferences, value: boolean) {
        setPreferences((previous) => ({ ...previous, [key]: value }));
    }

    return (
        <PreferencesContext.Provider value={{ preferences, reduceMotion, update }}>
            <MotionConfig reducedMotion={reduceMotion ? 'always' : 'user'}>{children}</MotionConfig>
        </PreferencesContext.Provider>
    );
}
