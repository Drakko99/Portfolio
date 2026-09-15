import ExperiencePage from '../../src/pages/ExperiencePage';
import PreferencesProvider from '../../src/context/PreferencesProvider';
/** Monta la cronología con las preferencias necesarias para probarla de forma aislada. */
export default function ExperienceHarness() {
    return (
        <PreferencesProvider>
            <ExperiencePage />
        </PreferencesProvider>
    );
}
