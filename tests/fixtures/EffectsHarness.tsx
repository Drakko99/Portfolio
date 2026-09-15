import CursorHalo from '../../src/components/CursorHalo';
import PreferencesProvider from '../../src/context/PreferencesProvider';
import { usePageVisibility } from '../../src/hooks/usePageVisibility';

/** Expone la visibilidad junto al halo sin crear un contexto WebGL. */
function EffectsProbe() {
    const visible = usePageVisibility();
    return (
        <>
            <CursorHalo />
            <output>{visible ? 'visible' : 'hidden'}</output>
        </>
    );
}

/** Proporciona las preferencias reales a los efectos bajo prueba. */
export default function EffectsHarness() {
    return (
        <PreferencesProvider>
            <EffectsProbe />
        </PreferencesProvider>
    );
}
