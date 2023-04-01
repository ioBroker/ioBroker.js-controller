import type { TestContext } from '../_Types';

export function register(it: Mocha.TestFunction, expect: Chai.Assertion, context: TestContext): void {
    // deleteChannel
    // deleteState
    // getDevices
    // getChannelsOf
    // getStatesOf
    // createDevice
    // createChannel
    // createState
    // deleteDevice
    const testName = `${context.name} ${context.adapterShortName} state helpers: `;

    // setBinaryState
    it(testName + 'requireLog should activate corresponding state', async () => {
        // default should be false or non-existent
        let state = await context.states.getState(`system.adapter.${context.adapter.namespace}.logging`);
        expect(state?.val as any).to.be.not.ok;

        // now activate
        await context.adapter.requireLog!(true);
        state = await context.states.getState(`system.adapter.${context.adapter.namespace}.logging`);
        expect(state!.val as any).to.be.true;

        // clean up
        await context.adapter.requireLog!(false);
    });
}
