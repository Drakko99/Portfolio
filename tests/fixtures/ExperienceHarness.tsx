import ExperiencePage from '../../src/pages/ExperiencePage';
import PreferencesProvider from '../../src/context/PreferencesProvider';
export default function ExperienceHarness() {
    return <PreferencesProvider><ExperiencePage /></PreferencesProvider>;
}
