import { createContext, useContext } from 'react';
export type Preferences = { contrast: boolean; calm: boolean; halo: boolean };
export const PreferencesContext = createContext<{
    preferences: Preferences;
    reduceMotion: boolean;
    update: (key: keyof Preferences, value: boolean) => void;
}>({ preferences: { contrast: false, calm: false, halo: false }, reduceMotion: false, update: () => {} });
export const usePreferences = () => useContext(PreferencesContext);
