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

    it(`${testName}sigKill from another host should not terminate the instance`, async () => {
        let unloaded = false;
        context.onAdapterUnload = (callback: () => void) => {
            unloaded = true;
            callback();
        };

        // the controller of another host stops its copy of this instance, e.g. after it has been moved
        await context.states.setState(`system.adapter.${context.adapter.namespace}.sigKill`, {
            val: -1,
            ack: false,
            from: 'system.host.anotherHost',
        });
        // give the adapter time to process the state change
        await new Promise(resolve => setTimeout(resolve, 500));
        context.onAdapterUnload = null;

        assert.strictEqual(unloaded, false);
    });

    describe(`${testName}fence after a reconnect`, () => {
        const instanceId = (): string => `system.adapter.${context.adapter.namespace}`;
        let originalHost: string;
        let terminated: { reason?: string; code?: number } | null;
        let originalTerminate: any;

        beforeEach(async () => {
            const obj = await context.objects.getObjectAsync(instanceId());
            originalHost = obj!.common.host;
            terminated = null;
            originalTerminate = context.adapter.terminate;
            (context.adapter as any).terminate = (reason?: string, code?: number) => (terminated = { reason, code });
        });

        afterEach(async () => {
            (context.adapter as any).terminate = originalTerminate;
            await context.objects.extendObject(instanceId(), { common: { host: originalHost } });
        });

        it('keeps an instance which is still assigned to this host', async () => {
            await context.objects.extendObject(instanceId(), { common: { host: context.adapter.host } });

            assert.strictEqual(await (context.adapter as any)._fence('a test'), true);
            assert.strictEqual(terminated, null);
        });

        it('terminates an instance which was moved to another host, without unload', async () => {
            await context.objects.extendObject(instanceId(), { common: { host: 'anotherHost' } });

            assert.strictEqual(await (context.adapter as any)._fence('a test'), false);
            assert.strictEqual(terminated!.code, 11); // ADAPTER_REQUESTED_TERMINATION
            assert.match(terminated!.reason!, /Moved to host "anotherHost"/);
        });
    });
}
