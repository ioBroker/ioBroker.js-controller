import type { TestContext } from '../_Types.js';
import assert from 'node:assert/strict';

/**
 * Register the state helper tests on the given mocha test function
 *
 * @param it The mocha test function to register the tests on
 * @param context The shared test context (adapter, states and objects clients)
 */
export function register(it: Mocha.TestFunction, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} state helpers: `;

    // deleteChannel
    // deleteState
    it(`${testName}delete state should validate the input`, async () => {
        await context.adapter.deleteStateAsync('test');
        await context.adapter.deleteStateAsync('dev', 'channel', 'state');
        await context.adapter.deleteStateAsync('channel', 'state');

        context.adapter.deleteState('test', 'string');

        // @ts-expect-error invalid test case
        await assert.rejects(context.adapter.deleteStateAsync({}), /needs to be of type "string" but type "object"/);
    });

    // getDevices
    // getChannelsOf
    // getStatesOf
    // createDevice
    // createChannel
    // createState
    // deleteDevice

    it(`${testName}requireLog should activate corresponding state`, async () => {
        // default should be false or non-existent
        let state = await context.states.getState(`system.adapter.${context.adapter.namespace}.logging`);
        assert.ok(!state?.val);

        // now activate
        await context.adapter.requireLog!(true);
        state = await context.states.getState(`system.adapter.${context.adapter.namespace}.logging`);
        assert.strictEqual(state!.val, true);

        // clean up
        await context.adapter.requireLog!(false);
    });
}
