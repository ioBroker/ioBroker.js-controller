import assert from 'node:assert/strict';
import sinon from 'sinon';
import { DiagInfoCollector } from '@/lib/controller/host/diagInfoCollector.js';
import { createTestContext } from '@/lib/controller/context.test-utils.js';

const INTERVAL = 30_000;

describe('DiagInfoCollector.tryStartDiagSend', () => {
    it('allows the first send', () => {
        const diag = new DiagInfoCollector(createTestContext());

        assert.equal(diag.tryStartDiagSend(INTERVAL), true);
    });

    it('blocks a second send within the interval', () => {
        const clock = sinon.useFakeTimers();
        try {
            const diag = new DiagInfoCollector(createTestContext());

            assert.equal(diag.tryStartDiagSend(INTERVAL), true);
            clock.tick(INTERVAL - 1);
            assert.equal(diag.tryStartDiagSend(INTERVAL), false);
            // exactly at the interval it is still blocked, only a later call passes
            clock.tick(1);
            assert.equal(diag.tryStartDiagSend(INTERVAL), false);
        } finally {
            clock.restore();
        }
    });

    it('allows the next send once the interval has passed', () => {
        const clock = sinon.useFakeTimers();
        try {
            const diag = new DiagInfoCollector(createTestContext());

            assert.equal(diag.tryStartDiagSend(INTERVAL), true);
            clock.tick(INTERVAL + 1);
            assert.equal(diag.tryStartDiagSend(INTERVAL), true);
        } finally {
            clock.restore();
        }
    });

    it('restarts the interval on every accepted send', () => {
        const clock = sinon.useFakeTimers();
        try {
            const diag = new DiagInfoCollector(createTestContext());

            assert.equal(diag.tryStartDiagSend(INTERVAL), true);
            clock.tick(INTERVAL + 1);
            assert.equal(diag.tryStartDiagSend(INTERVAL), true);
            // the second send reset the timestamp, so we are blocked again
            clock.tick(1);
            assert.equal(diag.tryStartDiagSend(INTERVAL), false);
        } finally {
            clock.restore();
        }
    });
});

describe('DiagInfoCollector.collectDiagInfo', () => {
    it('answers with null for a diagnostics type which sends nothing', async () => {
        const diag = new DiagInfoCollector(createTestContext());

        assert.equal(await diag.collectDiagInfo('none'), null);
    });
});
