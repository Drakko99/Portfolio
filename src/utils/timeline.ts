export type MonthDate = `${number}-${number}`;

/** Valida una fecha mensual y la convierte en un índice que se puede comparar. */
export function monthIndex(date: MonthDate): number {
    const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(date);
    if (!match) throw new Error(`Invalid month: ${date}`);
    return Number(match[1]) * 12 + Number(match[2]) - 1;
}

/** Calcula una cronología inversa y comprime solo los huecos sin empleo de más de seis meses. */
export function buildTimeline<
    T extends { id: number; startDate: MonthDate; endDate: MonthDate | null },
>(items: T[], now = new Date()) {
    const current = now.getFullYear() * 12 + now.getMonth();
    const chronological = items
        .map((item) => {
            const start = monthIndex(item.startDate);
            // Suma un mes para incluir el mes final, también en los trabajos vigentes.
            const end = item.endDate ? monthIndex(item.endDate) + 1 : current + 1;
            if (end <= start) throw new Error(`Invalid period for experience ${item.id}`);
            return { item, start, end };
        })
        .sort((a, b) => a.start - b.start || a.item.id - b.item.id);

    if (!chronological.length) return { entries: [], years: [], breaks: [], total: 0 };

    // Une empleos simultáneos antes de buscar huecos: un solapamiento nunca se comprime.
    const occupied: { start: number; end: number }[] = [];
    for (const entry of chronological) {
        const previous = occupied.at(-1);
        if (previous && entry.start <= previous.end)
            previous.end = Math.max(previous.end, entry.end);
        else occupied.push({ start: entry.start, end: entry.end });
    }
    const first = occupied[0].start;
    const last = occupied[occupied.length - 1].end;
    const gaps = occupied.slice(1).flatMap((span, index) => {
        const start = occupied[index].end;
        return span.start - start > 6 ? [{ start, end: span.start, visualMonths: 2 }] : [];
    });
    /** Resta únicamente la parte del hueco que queda antes de la fecha consultada. */
    const distance = (month: number) =>
        month -
        first -
        gaps.reduce((removed, gap) => {
            const traversed = Math.max(0, Math.min(month, gap.end) - gap.start);
            return removed + traversed * (1 - gap.visualMonths / (gap.end - gap.start));
        }, 0);
    const total = distance(last);
    /** Invierte el porcentaje para colocar las fechas recientes a la izquierda. */
    const position = (month: number) => (1 - distance(month) / total) * 100;

    // Etiqueta cada año con actividad una sola vez y omite los años del hueco comprimido.
    const years = [];
    for (let year = Math.floor((last - 1) / 12); year >= Math.floor(first / 12); year--) {
        const slices = occupied
            .map((span) => ({
                start: Math.max(span.start, year * 12),
                end: Math.min(span.end, (year + 1) * 12),
            }))
            .filter((span) => span.end > span.start);
        if (slices.length)
            years.push({
                year,
                position: position((slices[0].start + slices[slices.length - 1].end) / 2),
            });
    }
    const entries = [...chronological]
        .sort((a, b) => b.end - a.end || b.start - a.start || a.item.id - b.item.id)
        .map((entry) => {
            const left = position(entry.end);
            const right = position(entry.start);
            return { ...entry, left, width: right - left, center: (left + right) / 2 };
        });
    return {
        total,
        years,
        entries,
        breaks: gaps.map((gap) => ({ ...gap, position: position((gap.start + gap.end) / 2) })),
    };
}
