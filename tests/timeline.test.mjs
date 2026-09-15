import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildTimeline, monthIndex } from '../src/utils/timeline.ts';
import { experience as jobs } from '../src/data/portfolioData.ts';
const now = new Date(2026, 8, 12);

test('actual roles appear newest first, with current work first, without mutating source data', () => {
    const original = structuredClone(jobs);
    assert.deepEqual(
        buildTimeline(jobs, now).entries.map((e) => e.item.id),
        [1, 2, 3, 4]
    );
    assert.deepEqual(jobs, original);
});
test('preserves inclusive work durations and simultaneous work after compression', () => {
    const {
        entries: [becall, uned, intecca, ip],
    } = buildTimeline(jobs, now);
    assert.equal(ip.end - ip.start, 5);
    assert.equal(intecca.end - intecca.start, 13);
    assert.equal(uned.end - uned.start, 7);
    assert.equal(becall.end - becall.start, 16);
    assert.ok(becall.left < uned.left);
    assert.ok(becall.left + becall.width > uned.left + uned.width);
    assert.ok(Math.abs(uned.width / ip.width - 7 / 5) < 1e-10);
});
test('compresses the actual 42-month empty gap to two visual months', () => {
    const timeline = buildTimeline(jobs, now);
    assert.equal(timeline.breaks.length, 1);
    assert.equal(timeline.breaks[0].end - timeline.breaks[0].start, 42);
    assert.equal(timeline.breaks[0].visualMonths, 2);
    assert.equal(timeline.total, 39);
    const [, , intecca, ip] = timeline.entries;
    assert.ok(Math.abs(ip.left - (intecca.left + intecca.width) - (2 / 39) * 100) < 1e-10);
});
test('labels only occupied years once, in descending order; all bars remain on the axis', () => {
    const { entries, years } = buildTimeline(jobs, now);
    assert.deepEqual(
        years.map((y) => y.year),
        [2026, 2025, 2024, 2020]
    );
    for (const entry of entries)
        assert.ok(entry.left >= 0 && entry.left + entry.width <= 100 + 1e-10);
    assert.ok(entries.every((entry, i) => i === 0 || entry.center > entries[i - 1].center));
});
test('does not compress short gaps or any part of overlapping jobs', () => {
    const timeline = buildTimeline(
        [
            { id: 1, startDate: '2024-01', endDate: '2024-12' },
            { id: 2, startDate: '2024-03', endDate: '2024-04' },
            { id: 3, startDate: '2025-07', endDate: '2025-12' },
        ],
        now
    );
    assert.equal(timeline.breaks.length, 0);
    assert.equal(timeline.total, 24);
});
test('ongoing roles advance automatically; closed roles stay fixed', () => {
    const before = buildTimeline(jobs, now).entries;
    const after = buildTimeline(jobs, new Date(2026, 9, 1)).entries;
    assert.equal(after[0].end - before[0].end, 1);
    assert.equal(after[1].end, before[1].end);
});
test('handles empty data and rejects invalid dates or reversed periods', () => {
    assert.deepEqual(buildTimeline([], now).entries, []);
    assert.throws(() => monthIndex('2025-13'));
    assert.throws(() => buildTimeline([{ id: 1, startDate: '2025-06', endDate: '2024-01' }], now));
});
