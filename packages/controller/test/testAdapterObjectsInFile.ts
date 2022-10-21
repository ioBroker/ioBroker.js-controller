import { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const setup = require('./lib/setup4controller');
let objects = null;
let states = null;
const textName = 'File';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tests = require('./lib/testObjects');
const context = {
    objects: null,
    name: textName
};

describe(textName + ' Test Objects File-Redis', function () {
    before(textName + ' Start js-controller', async function () {
        this.timeout(3000);

        const { objects: _objects, states: _states } = await setup.startController({
            objects: {
                dataDir: `${__dirname}/../tmp/data`,
                onChange: function (id: string, _obj: ioBroker.AnyObject) {
                    console.log('object changed. ' + id);
                }
            },
            states: {
                dataDir: `${__dirname}/../tmp/data`,
                onChange: function (id: string, _state: ioBroker.State) {
                    console.log('state changed. ' + id);
                }
            }
        });

        objects = _objects;
        states = _states;
        context.objects = _objects;
        expect(objects).to.be.ok;
        expect(states).to.be.ok;
    });

    tests.register(it, expect, context);

    after(textName + ' Stop js-controller', async function () {
        this.timeout(5_000);
        await setup.stopController();
        await new Promise<void>(resolve => {
            setTimeout(() => resolve(), 2_000);
        });
    });
});
