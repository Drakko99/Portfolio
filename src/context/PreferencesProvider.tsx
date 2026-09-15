import { useEffect, useState, type ReactNode } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { PreferencesContext, type Preferences } from './preferences';
const defaults: Preferences = { contrast: false, calm: false, halo: false };
export default function PreferencesProvider({ children }: { children: ReactNode }) {
    const [preferences, setPreferences] = useState<Preferences>(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('drakko-display') || '{}');
            return { contrast: saved?.contrast === true, calm: saved?.calm === true, halo: saved?.halo === true };
        } catch { return defaults; }
    });
    const systemReduced = useReducedMotion();
    const reduceMotion = preferences.calm || Boolean(systemReduced);
    useEffect(() => {
        document.documentElement.dataset.contrast = preferences.contrast ? 'high' : 'normal';
        document.documentElement.dataset.motion = reduceMotion ? 'off' : 'on';
        try { localStorage.setItem('drakko-display', JSON.stringify(preferences)); } catch { /* Private browsing may disable storage. */ }
    }, [preferences, reduceMotion]);
    return <PreferencesContext.Provider value={{ preferences, reduceMotion, update: (key, value) => setPreferences(previous => ({ ...previous, [key]: value })) }}>
        <MotionConfig reducedMotion={reduceMotion ? 'always' : 'user'}>{children}</MotionConfig>
    </PreferencesContext.Provider>;
}
