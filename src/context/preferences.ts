import { createContext, useContext } from 'react';
export type Preferences = { contrast: boolean; calm: boolean; halo: boolean };
interface PreferencesValue {
    preferences: Preferences;
    reduceMotion: boolean;
    update: (key: keyof Preferences, value: boolean) => void;
}

export const PreferencesContext = createContext<PreferencesValue | undefined>(undefined);

/** Obtiene las preferencias y avisa si falta el proveedor en el árbol de React. */
export function usePreferences() {
    const context = useContext(PreferencesContext);
    if (!context) throw new Error('usePreferences debe usarse dentro de PreferencesProvider.');
    return context;
}
