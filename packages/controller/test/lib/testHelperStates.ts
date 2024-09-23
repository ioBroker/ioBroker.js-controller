import type { TestContext } from '../_Types.js';

export function register(it: Mocha.TestFunction, expect: Chai.ExpectStatic, context: TestContext): void {
    const testName = `${context.name} ${context.adapterShortName} state helpers: `;

    // deleteChannel
    // deleteState
    it(`${testName}delete state should validate the input`, async () => {
        await context.adapter.deleteStateAsync('test');
        await context.adapter.deleteStateAsync('dev', 'channel', 'state');
        await context.adapter.deleteStateAsync('channel', 'state');

        context.adapter.deleteState('test', 'string');

        // @ts-expect-error invalid test case
        return expect(context.adapter.deleteStateAsync({})).to.be.eventually.rejectedWith(
            /needs to be of type "string" but type "object"/g,
            'Should have thrown on invalid input',
        );
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
        expect(state?.val).to.be.not.ok;

        // now activate
        await context.adapter.requireLog!(true);
        state = await context.states.getState(`system.adapter.${context.adapter.namespace}.logging`);
        expect(state!.val).to.be.true;

        // clean up
        await context.adapter.requireLog!(false);
    });
}
