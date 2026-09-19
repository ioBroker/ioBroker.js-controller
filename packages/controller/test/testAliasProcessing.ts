import assert from 'node:assert/strict';
import { tools } from '@iobroker/js-controller-common-db';

const logger = {
    error: (msg: string): void => {
        throw new Error(msg);
    },
    warn: (): void => {},
    info: (): void => {},
    debug: (): void => {},
    silly: (): void => {},
} as unknown as ioBroker.Logger;

/**
 * Run a source value through an alias with the given read function.
 *
 * @param read the alias read function
 * @param targetType common.type of the alias state
 * @param val the source value
 */
function readAlias(read: string, targetType: ioBroker.CommonType, val: ioBroker.StateValue): ioBroker.StateValue {
    const state = tools.formatAliasValue({
        sourceCommon: { type: 'number' },
        targetCommon: { type: targetType, alias: { id: 'x.0.source', read } },
        state: { val, ack: true, ts: 1, lc: 1, from: 'test' },
        logger,
        logNamespace: 'test',
        sourceId: 'x.0.source',
        targetId: 'alias.0.target',
    });

    return state!.val;
}

describe('alias value conversion', () => {
    it('stores a comparison result as 1/0 in a number alias', () => {
        assert.equal(readAlias('val < 20', 'number', 15), 1);
        assert.equal(readAlias('val < 20', 'number', 25), 0);
    });

    it('keeps the comparison result boolean in a boolean alias', () => {
        assert.equal(readAlias('val < 20', 'boolean', 15), true);
        assert.equal(readAlias('val < 20', 'boolean', 25), false);
    });

    it('still converts a string result into a number', () => {
        assert.equal(readAlias('String(val)', 'number', 42.5), 42.5);
    });

    it('leaves a numeric result untouched', () => {
        assert.equal(readAlias('val * 2', 'number', 21), 42);
    });
});
