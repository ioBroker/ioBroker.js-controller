import assert from 'node:assert/strict';
import { resolveStartMode } from './instanceStarter.js';

describe('resolveStartMode', () => {
    it('keeps the configured mode when the instance is started normally', () => {
        for (const mode of ['none', 'daemon', 'schedule', 'once', 'extension'] as ioBroker.InstanceMode[]) {
            assert.equal(resolveStartMode(mode, false), mode);
        }
    });

    it('runs an instance which is woken up as a daemon', () => {
        assert.equal(resolveStartMode('schedule', true), 'daemon');
        assert.equal(resolveStartMode('once', true), 'daemon');
        assert.equal(resolveStartMode('none', true), 'daemon');
    });

    it('never turns an extension into a daemon', () => {
        // an extension is loaded by a web server instance and has no main file, so a fork would get `undefined`
        assert.equal(resolveStartMode('extension', true), 'extension');
    });
});
