import type { TestContext } from '../_Types.js';
import { Validator } from '@iobroker/js-controller-adapter';
import assert from 'node:assert/strict';

import { spy } from 'sinon';

export function register(it: Mocha.TestFunction, context: TestContext): void {
    //adapterGetPort
    it(`${context.name} ${context.adapterShortName} adapter: find next free port`, function (done) {
        this.timeout(3_000);

        // @ts-expect-error expects more args
        assert.throws(() => context.adapter.getPort(), /adapterGetPort: no port/);

        // @ts-expect-error not for external use?
        assert.ok(!context.adapter.getPortRunning);

        //Works like it should be
        context.adapter.getPort(8080, function (port) {
            assert.ok(port >= 8080);
            // @ts-expect-error not for external use?
            assert.ok(context.adapter.getPortRunning);
            assert.ok(
                // @ts-expect-error not for external use?
                'port' in context.adapter.getPortRunning &&
                    // @ts-expect-error not for external use?
                    'host' in context.adapter.getPortRunning &&
                    // @ts-expect-error not for external use?
                    'callback' in context.adapter.getPortRunning,
            );
            // @ts-expect-error not for external use?
            assert.strictEqual(context.adapter.getPortRunning.port, port);

            done();
        });
    });

    //checkPassword
    it(`${context.name} ${context.adapterShortName} adapter: validates user and password`, function (done) {
        this.timeout(3_000);

        //@ts-expect-error Expecting a callback
        assert.throws(() => context.adapter.checkPassword('claus', '1234'), /checkPassword: no callback/);

        //User doesnt exists
        context.adapter.checkPassword('claus', '1234', function (res) {
            assert.strictEqual(res, false);
        });

        //Wrong password
        context.adapter.checkPassword('admin', '1234', function (res) {
            assert.strictEqual(res, false);
        });

        done();
    });

    //checkPassword (async)
    it(`${context.name} ${context.adapterShortName} adapter: validates user and password (ASYNC)`, async () => {
        // User doesn't exist
        const res1 = await context.adapter.checkPasswordAsync('claus', '1234');
        assert.deepStrictEqual(res1, [false, 'system.user.claus']);
        // Wrong password
        const res2 = await context.adapter.checkPasswordAsync('admin', '1234');
        assert.deepStrictEqual(res2, [false, 'system.user.admin']);
    }).timeout(3_000);

    //setPassword
    it(`${context.name} ${context.adapterShortName} adapter: sets the users password`, function (done) {
        this.timeout(3_000);
        // TODO: sync
        // TODO: async
        done();
    });

    //checkGroup
    it(`${context.name} ${context.adapterShortName} adapter: user exists and is in the group`, function (done) {
        this.timeout(3_000);
        // TODO: sync
        // TODO: async
        done();
    });

    //calculatePermissions
    it(`${context.name} ${context.adapterShortName} adapter: get the user permissions`, function (done) {
        this.timeout(3_000);
        // TODO: sync
        // TODO: async
        done();
    });

    // getCertificates
    it(`${context.name} ${context.adapterShortName} adapter: returns SSL certificates by name`, async () => {
        // has to work without chained certificate
        const certs = await context.adapter.getCertificatesAsync('defaultPublic', 'defaultPrivate');
        assert.ok(certs);
    });

    it(`${context.name} ${context.adapterShortName} adapter: get the user id`, async () => {
        let id = await context.adapter.getUserID('admin');
        assert.strictEqual(id, 'system.user.admin');
        id = await context.adapter.getUserID('test');
        assert.strictEqual(id, 'system.user.governor');

        // should not exist - uppercase
        id = await context.adapter.getUserID('Test');
        assert.strictEqual(id, undefined);
    });

    // formatValue
    it(`${context.name} ${context.adapterShortName} adapter: Check formatValue`, function (done) {
        this.timeout(3_000);
        let testValue;

        // Test with number
        testValue = context.adapter.formatValue(1000, '.,');
        assert.strictEqual(typeof testValue, 'string');
        assert.strictEqual(testValue, '1.000,00');

        // Test against rounding errors
        testValue = context.adapter.formatValue(1000.1994, 3, '.,');
        assert.strictEqual(testValue, '1.000,199');
        testValue = context.adapter.formatValue(1000.1996, 3, '.,');
        assert.strictEqual(testValue, '1.000,200');

        // Test with string
        testValue = context.adapter.formatValue('1000', '.,');
        assert.strictEqual(typeof testValue, 'string');
        assert.strictEqual(testValue, '1.000,00');

        // Test with an empty format pattern
        testValue = context.adapter.formatValue('1000', ''); //1.000,00
        const testValue2 = context.adapter.formatValue(
            '1000',
            context.adapter.isFloatComma === undefined ? '.,' : context.adapter.isFloatComma ? '.,' : ',.',
        ); //1.000,00
        assert.strictEqual(testValue, testValue2);

        // @ts-expect-error should not be called like this by devs
        testValue = context.adapter.formatValue(undefined, '.,');
        assert.strictEqual(testValue.length, 0);

        // Test with no format and floatcomma true
        context.adapter.isFloatComma = true;
        testValue = context.adapter.formatValue('1000');
        assert.strictEqual(typeof testValue, 'string');
        assert.strictEqual(testValue, '1.000,00');

        // Test with no format and floatcomma false
        context.adapter.isFloatComma = false;
        testValue = context.adapter.formatValue('1000');
        assert.strictEqual(typeof testValue, 'string');
        assert.strictEqual(testValue, '1,000.00');

        done();
    });

    // formatDate
    it(`${context.name} ${context.adapterShortName} adapter: Check formatDate`, function (done) {
        this.timeout(3_000);
        const testDate = new Date(0);
        let testStringDate;

        assert.strictEqual(typeof context.adapter.formatDate(new Date()), 'string');

        testStringDate = context.adapter.formatDate(testDate, 'YYYY-MM-DD');
        assert.strictEqual(typeof testStringDate, 'string');
        assert.strictEqual(testStringDate, '1970-01-01');

        // expect 1 hour as output
        testStringDate = context.adapter.formatDate(3_600_000 + 60_000 + 42_000 + 1, 'duration', 'hh.mm.ss.sss');
        assert.strictEqual(typeof testStringDate, 'string');
        assert.strictEqual(testStringDate, '01.01.42.001'); // 1 hour, 1 minute, 42 seconds, 1 milliseconds

        // positive test with "Februar"
        testStringDate = context.adapter.formatDate('23 Februar 2014', 'YYYY.MM.DD');
        assert.strictEqual(typeof testStringDate, 'string');
        assert.ok(testStringDate.includes('2014.02.23'));

        // negative test, give the wrong date "Fabruar"
        testStringDate = context.adapter.formatDate('23 Fabruar 2014', 'YYYY.MM.DD');
        assert.strictEqual(typeof testStringDate, 'string');
        assert.ok(testStringDate.includes('NaN')); // NaN.NaN.NaN

        // expect 03.03.2003 as output (time in second)
        testStringDate = context.adapter.formatDate(1046681200, false, 'DD.MM.YYYY');
        assert.strictEqual(typeof testStringDate, 'string');
        assert.ok(testStringDate.includes('03.03.2003'));

        // expect 03.03.03 as output (time in milisecond) . year length 2
        testStringDate = context.adapter.formatDate(1046681200000, false, 'DD.MM.YY');
        assert.strictEqual(typeof testStringDate, 'string');
        assert.ok(testStringDate.includes('03.03.03'));

        // expect 03.09.12 as output (time in milisecond) . year length 2
        testStringDate = context.adapter.formatDate(1346681200000, false, 'DD.MM.YY');
        assert.strictEqual(typeof testStringDate, 'string');
        assert.ok(testStringDate.includes('03.09.12'));

        // test with min sec milli
        testStringDate = context.adapter.formatDate(68033, true, 'm.ss,sss');
        assert.ok(testStringDate.includes('1.08,033'));

        // @ts-expect-error should not be called like this by devs
        testStringDate = context.adapter.formatDate(undefined, 'YYYY.MM.DD');
        assert.strictEqual(testStringDate.length, 0);

        done();
    });

    // Validator.fixId
    it(`${context.name} ${context.adapterShortName} adapter utils: check fixId`, () => {
        const utils = new Validator(
            context.objects,
            context.states,
            // @ts-expect-error internal access
            context.adapter.namespaceLog,
            console,
            context.adapter.namespace,
            // @ts-expect-error internal access
            context.adapter._namespaceRegExp,
        );

        const adapterName = context.adapter.name;
        assert.strictEqual(adapterName, 'test');
        const adapterInstance = context.adapter.instance;
        assert.strictEqual(adapterInstance, 0);
        const adapterNamespace = context.adapter.namespace;
        assert.strictEqual(adapterNamespace, `${adapterName}.${adapterInstance}`);

        let testString;
        //test with Object empty
        testString = utils.fixId({});
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, `${adapterNamespace}.`);

        //test with Object state
        testString = utils.fixId({
            state: 'baz',
        });
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, `${adapterNamespace}.baz`);

        //test with Object state + channel
        testString = utils.fixId({
            state: 'baz',
            channel: 'bar',
        });
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, `${adapterNamespace}.bar.baz`);

        //test with Object state + channel + device
        testString = utils.fixId({
            state: 'baz',
            channel: 'bar',
            device: 'foo',
        });
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, `${adapterNamespace}.foo.bar.baz`);

        //test with string empty as state
        testString = utils.fixId('');
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, adapterNamespace);

        //test with string empty as subscribe
        testString = utils.fixId('', true);
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, `${adapterNamespace}.`);

        //test with string state
        testString = utils.fixId('baz');
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, `${adapterNamespace}.baz`);

        //test with string state + channel
        testString = utils.fixId('bar.baz');
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, `${adapterNamespace}.bar.baz`);

        //test with string state + channel + device
        testString = utils.fixId('foo.bar.baz');
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, `${adapterNamespace}.foo.bar.baz`);

        //test with already fixed ID
        testString = utils.fixId(`${adapterNamespace}.foo.bar.baz`);
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, `${adapterNamespace}.foo.bar.baz`);

        //test composition
        testString = utils.fixId(utils.fixId('foo.bar.baz'));
        assert.strictEqual(typeof testString, 'string');
        assert.strictEqual(testString, `${adapterNamespace}.foo.bar.baz`);
    }).timeout(2_000);

    // Check setTimeout throw
    it(`${context.name} ${context.adapterShortName} adapter: check setTimeout`, done => {
        // is valid
        const timeout = context.adapter.setTimeout(
            () => {
                /** pass */
            },
            2 ** 32 / 2 - 1,
        );
        context.adapter.clearTimeout(timeout);

        // is valid
        context.adapter.setTimeout(() => {
            /** pass */
        }, 0);

        assert.throws(() => {
            context.adapter.setTimeout(
                () => {
                    /** pass */
                },
                2 ** 32 / 2,
            );
        }, /is larger than/);

        assert.throws(() => {
            context.adapter.setTimeout(() => {
                /** pass */
            }, -500);
        }, /is smaller than/);

        done();
    });

    // Check setInterval throw
    it(`${context.name} ${context.adapterShortName} adapter: check setInterval`, done => {
        // is valid
        let interval = context.adapter.setInterval(
            () => {
                /** pass */
            },
            2 ** 32 / 2 - 1,
        );
        context.adapter.clearInterval(interval);

        // is valid
        interval = context.adapter.setInterval(() => {
            /** pass */
        }, 0);

        context.adapter.clearInterval(interval);

        assert.throws(() => {
            context.adapter.setInterval(
                () => {
                    /** pass */
                },
                2 ** 32 / 2,
            );
        }, /is larger than/);

        assert.throws(() => {
            context.adapter.setInterval(() => {
                /** pass */
            }, -500);
        }, /is smaller than/);

        done();
    });

    // idToDCS
    it(`${context.name} ${context.adapterShortName} adapter: Check idToDCS`, function (done) {
        this.timeout(3000);
        let testString;

        // @ts-expect-error test no id
        testString = context.adapter.idToDCS();
        assert.strictEqual(testString, null);

        // test invalid id
        testString = context.adapter.idToDCS('device.channel.state');
        assert.strictEqual(testString, null);

        // test valid id
        testString = context.adapter.idToDCS(`${context.adapter.namespace}.device.channel.state`);
        assert.deepStrictEqual(testString, { device: 'device', channel: 'channel', state: 'state' });

        done();
    });

    // _DCS2ID
    it(`${context.name} ${context.adapterShortName} adapter: Check _DCS2ID`, function (done) {
        this.timeout(3_000);
        let testString;

        // @ts-expect-error test no parameters
        testString = context.adapter._DCS2ID();
        assert.strictEqual(testString, '');

        // @ts-expect-error test device
        testString = context.adapter._DCS2ID('device');
        assert.strictEqual(testString, 'device');

        // @ts-expect-error test device + channel
        testString = context.adapter._DCS2ID('device', 'channel');
        assert.strictEqual(testString, 'device.channel');

        // @ts-expect-error test device + channel + stateOrPoint (true)
        testString = context.adapter._DCS2ID('device', 'channel', true);
        assert.strictEqual(testString, 'device.channel.');

        // @ts-expect-error test device + channel + stateOrPoint (false)
        testString = context.adapter._DCS2ID('device', 'channel', false);
        assert.strictEqual(testString, 'device.channel');

        // @ts-expect-error test device + channel + stateOrPoint (string)
        testString = context.adapter._DCS2ID('device', 'channel', 'state');
        assert.strictEqual(testString, 'device.channel.state');

        //@ts-expect-error test device + stateOrPoint (string)
        testString = context.adapter._DCS2ID('device', null, 'state');
        assert.strictEqual(testString, 'device.state');

        //@ts-expect-error test channel + stateOrPoint (string)
        testString = context.adapter._DCS2ID(null, 'channel', 'state');
        assert.strictEqual(testString, 'channel.state');

        // @ts-expect-error test stateOrPoint (true)
        testString = context.adapter._DCS2ID(null, null, true);
        assert.strictEqual(testString, '');

        // @ts-expect-error test stateOrPoint (false)
        testString = context.adapter._DCS2ID(null, null, false);
        assert.strictEqual(testString, '');

        // @ts-expect-error test stateOrPoint (string)
        testString = context.adapter._DCS2ID(null, null, 'state');
        assert.strictEqual(testString, 'state');

        done();
    });

    it(`${context.name} ${context.adapterShortName} adapter: encrypt decrypt functions`, () => {
        const encrypted = context.adapter.encrypt('topSecret');
        // we only check not equal, because encryption can change and is not always deterministic
        assert.strictEqual(encrypted.length, 79);
        assert.strictEqual(encrypted.startsWith('$/aes-192-cbc:'), true);
        const decrypted = context.adapter.decrypt(encrypted);
        // check that correctly decrypted
        assert.strictEqual(decrypted, 'topSecret');
    });

    it(`${context.name} ${context.adapterShortName} adapter: updateConfig needs to respect encryptedNative`, async () => {
        const oldConfig = await context.adapter.getForeignObjectAsync(`system.adapter.${context.adapter.namespace}`);

        const passphrase = 'SavePassword123';

        await context.adapter.updateConfig({
            secondPassword: passphrase,
            complex: { password: passphrase },
            attrArray: [
                { password: `${passphrase}1`, value: 'value1' },
                { value: 'value2' },
                { password: `${passphrase}3`, value: 'value3' },
            ],
        });
        const newConfig = await context.adapter.getForeignObjectAsync(`system.adapter.${context.adapter.namespace}`);

        // non encrypted and non updated params stay the same
        assert.ok(newConfig?.native.paramString);
        assert.strictEqual(newConfig?.native.paramString, oldConfig?.native.paramString);

        // encrypted non updated passwords, decrypt to the same value
        assert.ok(newConfig?.native.password);
        assert.strictEqual(
            context.adapter.decrypt(newConfig?.native.password),
            context.adapter.decrypt(oldConfig?.native.password),
        );

        // updated encrypted value is correctly decrypted
        assert.ok(newConfig?.native.secondPassword);
        assert.strictEqual(context.adapter.decrypt(newConfig?.native.secondPassword), passphrase);

        // updated encrypted complex passwords, decrypt to the same value
        assert.ok(newConfig?.native.complex.password);
        assert.strictEqual(context.adapter.decrypt(newConfig?.native.complex.password), passphrase);

        // updated encrypted complex passwords in the array, decrypt to the same value
        assert.ok(newConfig?.native.attrArray[0].password);
        assert.strictEqual(context.adapter.decrypt(newConfig?.native.attrArray[0].password), `${passphrase}1`);
        assert.strictEqual(newConfig?.native.attrArray[0].value, `value1`);

        assert.ok(!newConfig?.native.attrArray[1].password);
        assert.strictEqual(newConfig?.native.attrArray[1].value, `value2`);

        assert.ok(newConfig?.native.attrArray[2].password);
        assert.strictEqual(context.adapter.decrypt(newConfig?.native.attrArray[2].password), `${passphrase}3`);
        assert.strictEqual(newConfig?.native.attrArray[2].value, `value3`);
    });

    // setState object validation
    for (const method of ['setState', 'setStateChanged', 'setForeignState', 'setForeignStateChanged']) {
        describe(`${context.name} ${context.adapterShortName} adapter: ${method} validates the state object`, () => {
            it('at least one property has to exist', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: undefined }, callback);

                setImmediate(() => {
                    assert.strictEqual(callback.callCount, 1);
                    assert.strictEqual(
                        callback.firstCall.args[0].message.includes('At least one property is expected!'),
                        true,
                    );
                    done();
                });
            });

            it('forbids extra properties', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, foo: 'bar' }, callback);
                setImmediate(() => {
                    assert.strictEqual(callback.callCount, 1);
                    assert.match(callback.firstCall.args[0].message, /forbidden/);
                    done();
                });
            });

            it('enforces ack to be a boolean', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, ack: 'true' }, callback);
                setImmediate(() => {
                    assert.strictEqual(callback.callCount, 1);
                    assert.match(callback.firstCall.args[0].message, /wrong type/);
                    assert.strictEqual(callback.firstCall.args[0].message.includes('should be "boolean"'), true);
                    done();
                });
            });

            it('enforces ts to be a number', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, ts: true }, callback);
                setImmediate(() => {
                    assert.strictEqual(callback.callCount, 1);
                    assert.match(callback.firstCall.args[0].message, /wrong type/);
                    assert.strictEqual(callback.firstCall.args[0].message.includes('should be "number"'), true);
                    done();
                });
            });

            it('enforces q to be a number', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, q: true }, callback);
                setImmediate(() => {
                    assert.strictEqual(callback.callCount, 1);
                    assert.match(callback.firstCall.args[0].message, /wrong type/);
                    assert.strictEqual(callback.firstCall.args[0].message.includes('should be "number"'), true);
                    done();
                });
            });

            it('enforces expire to be a number', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, expire: true }, callback);
                setImmediate(() => {
                    assert.strictEqual(callback.callCount, 1);
                    assert.match(callback.firstCall.args[0].message, /wrong type/);
                    assert.strictEqual(callback.firstCall.args[0].message.includes('should be "number"'), true);
                    done();
                });
            });

            it('enforces from to be a string', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, from: 2 }, callback);
                setImmediate(() => {
                    assert.strictEqual(callback.callCount, 1);
                    assert.match(callback.firstCall.args[0].message, /wrong type/);
                    assert.strictEqual(callback.firstCall.args[0].message.includes('should be "string"'), true);
                    done();
                });
            });

            it('enforces c to be a string', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, c: [] }, callback);
                setImmediate(() => {
                    assert.strictEqual(callback.callCount, 1);
                    assert.match(callback.firstCall.args[0].message, /wrong type/);
                    assert.strictEqual(callback.firstCall.args[0].message.includes('should be "string"'), true);
                    done();
                });
            });

            it('is okay to have undefined val if another property exists', function (done) {
                this.timeout(3_000);
                // cannot use the sync spies here, so only evaluate the err
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { ack: true }, err => {
                    assert.ok(!err);
                    done();
                });
            });
        });
    }

    it(`${context.name} ${context.adapterShortName} getAdapterScopedPackageIdentifier`, () => {
        const nonOrgaPacket = context.adapter.getAdapterScopedPackageIdentifier('axios');
        const orgaPacket = context.adapter.getAdapterScopedPackageIdentifier('@iobroker/adapter-react-v5');

        assert.strictEqual(nonOrgaPacket, '@iobroker-test.0/axios');
        assert.strictEqual(orgaPacket, '@iobroker-test.0/iobroker-adapter-react-v5');
    });
}
