import { useState, type KeyboardEvent, type PointerEvent } from 'react';

/** Coordina la apertura temporal por ratón y la apertura persistente por botón. */
export function useExpandableCard() {
    const [pinned, setPinned] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [hoverDismissed, setHoverDismissed] = useState(false);
    const expanded = pinned || (hovered && !hoverDismissed);

    /** El cierre manual prevalece sobre el hover hasta que el ratón vuelva a entrar. */
    function toggleExpanded() {
        setPinned(!expanded);
        setHoverDismissed(expanded);
    }

    /** Evita interpretar un toque como la entrada de un ratón. */
    function handlePointerEnter(event: PointerEvent<HTMLElement>) {
        if (event.pointerType !== 'mouse') return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        setHovered(true);
        setHoverDismissed(false);
    }

    /** Descarta solo la apertura temporal al salir de la tarjeta. */
    function handlePointerLeave() {
        setHovered(false);
        setHoverDismissed(false);
    }

    /** Permite cerrar los detalles con Escape sin depender del puntero. */
    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
        if (event.key !== 'Escape') return;

        setPinned(false);
        setHoverDismissed(true);
    }

    return { expanded, toggleExpanded, handlePointerEnter, handlePointerLeave, handleKeyDown };
}
