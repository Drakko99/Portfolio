
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { experience } from '../data/portfolioData';
import {
    FiClock,
    FiMapPin,
    FiBriefcase,
    FiArrowUpRight,
    FiChevronDown,
} from 'react-icons/fi';

type ExperienceItem = (typeof experience)[number];

interface TimelineCardProps {
    exp: ExperienceItem;
    index: number;
    isTop: boolean;
}

/* =========================================================
   UTILIDADES
========================================================= */

/**
 * Extrae los años del periodo.
 *
 * Ejemplos:
 * "Mar 2020 - Jul 2020" -> ["2020", "2020"]
 * "Jun 2025 - Presente" -> ["2025"]
 * "2024 - 2026" -> ["2024", "2026"]
 *
 * Si no encuentra años, devuelve un fallback.
 */
function extractYears(period: string): string[] {
    const years = period.match(/\b(?:19|20)\d{2}\b/g);

    if (!years || years.length === 0) {
        return ['----'];
    }

    return [...new Set(years)];
}

/**
 * Devuelve el año inicial del periodo.
 */
function getStartYear(period: string): number | null {
    const years = period.match(/\b(?:19|20)\d{2}\b/g);

    if (!years || years.length === 0) {
        return null;
    }

    return Number(years[0]);
}

/**
 * Etiqueta temporal de cada experiencia.
 */
function getTimelineLabel(period: string): string {
    const years = extractYears(period);

    if (years.length === 1) {
        return years[0];
    }

    return `${years[0]} — ${years[years.length - 1]}`;
}

/* =========================================================
   TARJETA DE EXPERIENCIA
========================================================= */

function TimelineCard({
    exp,
    index,
    isTop,
}: TimelineCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded((previous) => !previous);
    };

    const years = extractYears(exp.period);

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: isTop ? -25 : 25,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.65,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={`relative min-w-0 w-full flex flex-col ${
                isTop ? 'justify-end' : 'justify-start'
            }`}
        >
            {/* =================================================
                CONECTOR DE LA TARJETA AL EJE
            ================================================== */}

            <div
                className={`absolute left-1/2 -translate-x-1/2 w-px z-10 pointer-events-none ${
                    isTop
                        ? 'bottom-0 h-[76px]'
                        : 'top-0 h-[76px]'
                }`}
            >
                {/* Línea vertical */}
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-secondary to-secondary/20 shadow-[0_0_8px_rgba(236,106,6,0.45)]" />

                {/* Flecha hacia el nodo */}
                <div
                    className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 border-secondary ${
                        isTop
                            ? 'bottom-0 border-b border-r rotate-45'
                            : 'top-0 border-t border-l rotate-45'
                    }`}
                />
            </div>

            {/* =================================================
                TARJETA
            ================================================== */}

            <motion.div
                layout
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                aria-label={`Ver detalles de ${exp.title}`}
                onClick={toggleExpanded}
                onKeyDown={(event) => {
                    if (
                        event.key === 'Enter' ||
                        event.key === ' '
                    ) {
                        event.preventDefault();
                        toggleExpanded();
                    }
                }}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                className={`group relative z-20 w-full rounded-xl border border-primary/25 bg-surface-container-high/90 backdrop-blur-xl p-4 md:p-5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:border-secondary/60 transition-colors duration-300 hover:border-secondary/50 hover:bg-surface-container-high ${
                    isTop ? 'mb-[76px]' : 'mt-[76px]'
                }`}
            >
                {/* Brillo superior */}
                <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Número */}
                <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-secondary/70">
                        {String(index + 1).padStart(2, '0')} / CAREER
                    </span>

                    <FiArrowUpRight
                        size={13}
                        className="text-on-surface-variant/40 group-hover:text-secondary transition-colors"
                    />
                </div>

                {/* Puesto */}
                <h3 className="font-display text-base md:text-lg font-semibold text-primary group-hover:text-secondary transition-colors duration-300 leading-tight mb-2">
                    {exp.title}
                </h3>

                {/* Empresa */}
                <p className="font-mono text-xs text-on-surface-variant flex items-center gap-1.5 mb-3">
                    <FiBriefcase
                        size={11}
                        className="text-secondary/70 flex-shrink-0"
                    />

                    <span className="truncate">
                        {exp.company}
                    </span>
                </p>

                {/* Periodo */}
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider bg-secondary/10 px-2.5 py-1.5 rounded-full border border-secondary/20 text-secondary">
                    <FiClock size={10} />
                    {exp.period}
                </span>

                {/* Indicador de detalles */}
                <div className="flex items-center justify-center gap-1 mt-3 pt-3 border-t border-primary/10 text-[9px] font-mono text-on-surface-variant/50 group-hover:text-secondary transition-colors">
                    <span>
                        {isExpanded
                            ? 'CLOSE DETAILS'
                            : 'VIEW DETAILS'}
                    </span>

                    <FiChevronDown
                        size={11}
                        className={`transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                        }`}
                    />
                </div>

                {/* =================================================
                    DETALLES EXPANDIBLES
                ================================================== */}

                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            initial={{
                                height: 0,
                                opacity: 0,
                            }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-1 border-t border-primary/20">
                                {/* Ubicación */}
                                <div className="flex items-center gap-1.5 mb-3 text-[10px] font-mono text-on-surface-variant/70">
                                    <FiMapPin
                                        size={11}
                                        className="text-secondary/70"
                                    />

                                    <span>{exp.location}</span>
                                </div>

                                {/* Descripción */}
                                <p className="font-body text-xs leading-relaxed text-on-surface-variant mb-4">
                                    {exp.description}
                                </p>

                                {/* Tecnologías */}
                                <div className="flex flex-wrap gap-1.5">
                                    {exp.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="font-mono text-[9px] tracking-wider px-2 py-1 rounded-md bg-surface-container border border-primary/20 text-on-surface-variant"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Punto de luz */}
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(236,106,6,0.7)] transition-opacity duration-300" />
            </motion.div>
        </motion.div>
    );
}

/* =========================================================
   NODO CENTRAL
========================================================= */

function TimelineNode({
    index,
    period,
}: {
    index: number;
    period: string;
}) {
    const startYear = getStartYear(period);
    const label = getTimelineLabel(period);

    return (
        <motion.div
            initial={{
                scale: 0,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            transition={{
                duration: 0.4,
                delay: 0.65 + index * 0.12,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-30 flex flex-col items-center justify-center"
        >
            {/* Año superior */}
            <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                <span className="font-mono text-[10px] md:text-xs font-semibold tracking-wider text-secondary">
                    {startYear ?? '----'}
                </span>

                <span className="font-mono text-[8px] text-on-surface-variant/50 mt-1">
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Línea hasta el nodo */}
                <div className="w-px h-3 bg-secondary/30 mt-1" />
            </div>

            {/* Nodo */}
            <div className="relative w-6 h-6 rounded-full bg-surface-container-high border-2 border-secondary shadow-[0_0_0_3px_rgba(236,106,6,0.15),0_0_20px_rgba(236,106,6,0.6)] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(236,106,6,0.9)]" />

                <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-10" />
            </div>

            {/* Año inferior / periodo */}
            <div className="absolute top-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                <div className="w-px h-3 bg-secondary/30 mb-1" />

                <span className="font-mono text-[9px] text-on-surface-variant/70 tracking-wide text-center">
                    {label}
                </span>
            </div>
        </motion.div>
    );
}

/* =========================================================
   SEPARADORES DE ZONA
========================================================= */

function TimelineZone({
    index,
    period,
}: {
    index: number;
    period: string;
}) {
    const years = extractYears(period);

    return (
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none">
            {/* Separación vertical sutil */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-secondary/10" />

            {/* Etiqueta de zona */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0">
                <span className="font-mono text-[8px]">
                    {years.join(' — ')}
                </span>
            </div>
        </div>
    );
}

/* =========================================================
   PÁGINA EXPERIENCE
========================================================= */

export default function ExperiencePage() {
    return (
        <section className="min-h-screen flex flex-col relative px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-40 md:pt-44 pb-20 overflow-x-hidden">
            {/* =================================================
                FONDO NEÓN
            ================================================== */}

            <div className="neon-strip top-[12%] h-[76%] opacity-50" />

            {/* =================================================
                CABECERA
            ================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                }}
                className="relative z-10 border-b border-primary/20 pb-7 mb-16 text-center flex-shrink-0"
            >
                <div className="font-mono text-secondary text-xs tracking-[0.3em] mb-3">
                    // CAREER PATH
                </div>

                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl burning-text mb-3">
                    Experience
                </h2>

                <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-on-surface-variant/60">
                    MY PROFESSIONAL JOURNEY
                </p>
            </motion.div>

            {/* =================================================
                TIMELINE DESKTOP
            ================================================== */}

            <div className="relative z-10 hidden md:block w-full min-h-[780px]">
                <div className="relative min-h-[780px] w-full">
                    {/* =================================================
                        EJE CENTRAL HORIZONTAL
                    ================================================== */}

                    <motion.div
                        initial={{
                            scaleX: 0,
                            opacity: 0,
                        }}
                        animate={{
                            scaleX: 1,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 0.25,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 pointer-events-none"
                    >
                        {/* Resplandor */}
                        <div className="absolute left-0 right-0 -top-5 h-12 bg-secondary/10 blur-2xl" />

                        {/* Línea principal */}
                        <div className="relative h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_15px_rgba(236,106,6,0.8)]" />

                        {/* Línea secundaria */}
                        <div className="absolute top-2 left-0 right-0 h-px bg-secondary/20" />

                        {/* Segmentos decorativos */}
                        <div className="absolute top-[-4px] left-[12%] right-[12%] h-px bg-secondary/20" />
                    </motion.div>

                    {/* =================================================
                        ESTRUCTURA DE 3 FILAS
                    ================================================== */}

                    <div
                        className="relative grid gap-x-6 lg:gap-x-10 xl:gap-x-14 min-h-[780px] w-full"
                        style={{
                            gridTemplateColumns: `repeat(${experience.length}, minmax(0, 1fr))`,
                            gridTemplateRows: 'minmax(300px, 1fr) 180px minmax(300px, 1fr)',
                        }}
                    >
                        {/* =================================================
                            TARJETAS ARRIBA Y ABAJO
                        ================================================== */}

                        {experience.map((exp, index) => (
                            <div
                                key={exp.id}
                                className="relative min-w-0"
                                style={{
                                    gridColumn: index + 1,
                                    gridRow: index % 2 === 0 ? 1 : 3,
                                }}
                            >
                                <TimelineCard
                                    exp={exp}
                                    index={index}
                                    isTop={index % 2 === 0}
                                />
                            </div>
                        ))}

                        {/* =================================================
                            EJE TEMPORAL CON AÑOS
                        ================================================== */}

                        {experience.map((exp, index) => (
                            <div
                                key={`axis-${exp.id}`}
                                className="relative row-start-2 flex items-center justify-center"
                                style={{
                                    gridColumn: index + 1,
                                }}
                            >
                                {/* Zona temporal */}
                                <TimelineZone
                                    index={index}
                                    period={exp.period}
                                />

                                {/* Nodo con año */}
                                <TimelineNode
                                    index={index}
                                    period={exp.period}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* =================================================
                TIMELINE MÓVIL
            ================================================== */}

            <div className="relative z-10 md:hidden">
                {/* Línea vertical */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary to-transparent shadow-[0_0_8px_rgba(236,106,6,0.4)]" />

                <div className="flex flex-col gap-8">
                    {experience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{
                                opacity: 0,
                                x: -20,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                            }}
                            className="relative pl-10"
                        >
                            {/* Nodo móvil */}
                            <div className="absolute left-3 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary border-2 border-surface-container-high shadow-[0_0_12px_rgba(236,106,6,0.6)] z-10" />

                            {/* Año móvil */}
                            <div className="font-mono text-[10px] text-secondary tracking-wider mb-2">
                                {getTimelineLabel(exp.period)}
                            </div>

                            {/* Tarjeta */}
                            <TimelineCard
                                exp={exp}
                                index={index}
                                isTop={false}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}