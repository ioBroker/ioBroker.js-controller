import assert from 'node:assert/strict';
import { StallDetector } from './stallDetector.js';

describe('StallDetector', () => {
    it('stays quiet while the ticks come in time', () => {
        const gaps: number[] = [];
        const detector = new StallDetector(gap => gaps.push(gap), 10_000);

        detector.tick(0, 0);
        detector.tick(1_000, 1_000);
        detector.tick(9_000, 9_000);

        assert.deepEqual(gaps, []);
    });

    it('reports a gap of the monotonic clock', () => {
        const gaps: number[] = [];
        const detector = new StallDetector(gap => gaps.push(gap), 10_000);

        detector.tick(0, 0);
        detector.tick(30_000, 1_000);

        assert.deepEqual(gaps, [30_000]);
    });

    it('reports a gap of the wall clock', () => {
        const gaps: number[] = [];
        const detector = new StallDetector(gap => gaps.push(gap), 10_000);

        detector.tick(0, 0);
        detector.tick(1_000, 47_000);

        assert.deepEqual(gaps, [47_000]);
    });

    it('reports a stall once and measures from there', () => {
        const gaps: number[] = [];
        const detector = new StallDetector(gap => gaps.push(gap), 10_000);

        detector.tick(0, 0);
        detector.tick(20_000, 20_000);
        detector.tick(21_000, 21_000);

        assert.deepEqual(gaps, [20_000]);
    });
});
