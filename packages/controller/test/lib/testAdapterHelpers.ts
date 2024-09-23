import type { TestContext } from '../_Types.js';
import { Validator } from '@iobroker/js-controller-adapter';

import { spy } from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai.default);
chai.use(chaiAsPromised);

export function register(it: Mocha.TestFunction, expect: Chai.ExpectStatic, context: TestContext): void {
    //adapterGetPort
    it(`${context.name} ${context.adapterShortName} adapter: find next free port`, function (done) {
        this.timeout(3_000);

        // @ts-expect-error expects more args
        expect(() => context.adapter.getPort()).to.throw('adapterGetPort: no port');

        // @ts-expect-error not for external use?
        expect(context.adapter.getPortRunning).to.not.exist;

        //Works like it should be
        context.adapter.getPort(8080, function (port) {
            expect(port).to.be.at.least(8080);
            // @ts-expect-error not for external use?
            expect(context.adapter.getPortRunning).to.have.all.keys(['port', 'host', 'callback']);
            // @ts-expect-error not for external use?
            expect(context.adapter.getPortRunning).to.have.property('port', port);

            done();
        });
    });

    //checkPassword
    it(`${context.name} ${context.adapterShortName} adapter: validates user and password`, function (done) {
        this.timeout(3_000);

        //@ts-expect-error Expecting a callback
        expect(() => context.adapter.checkPassword('claus', '1234')).to.throw('checkPassword: no callback');

        //User doesnt exists
        context.adapter.checkPassword('claus', '1234', function (res) {
            expect(res).to.be.false;
        });

        //Wrong password
        context.adapter.checkPassword('admin', '1234', function (res) {
            expect(res).to.be.false;
        });

        done();
    });

    //checkPassword (async)
    it(`${context.name} ${context.adapterShortName} adapter: validates user and password (ASYNC)`, () => {
        const promises = [
            // promisify always provides a callback, so that doesn't need to be tested
            // User doesn't exist
            context.adapter
                .checkPasswordAsync('claus', '1234')
                .should.eventually.deep.equal([false, 'system.user.claus']),
            // Wrong password
            context.adapter
                .checkPasswordAsync('admin', '1234')
                .should.eventually.deep.equal([false, 'system.user.admin']),
        ];

        return Promise.all(promises);
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
        expect(certs).to.be.ok;
    });

    it(`${context.name} ${context.adapterShortName} adapter: get the user id`, async () => {
        let id = await context.adapter.getUserID('admin');
        expect(id).to.be.equal('system.user.admin');
        id = await context.adapter.getUserID('test');
        expect(id).to.be.equal('system.user.governor');

        // should not exist - uppercase
        id = await context.adapter.getUserID('Test');
        expect(id).to.be.undefined;
    });

    // formatValue
    it(`${context.name} ${context.adapterShortName} adapter: Check formatValue`, function (done) {
        this.timeout(3_000);
        let testValue;

        // Test with number
        testValue = context.adapter.formatValue(1000, '.,');
        expect(testValue).to.be.a('string');
        expect(testValue).to.equal('1.000,00');

        // Test against rounding errors
        testValue = context.adapter.formatValue(1000.1994, 3, '.,');
        expect(testValue).to.equal('1.000,199');
        testValue = context.adapter.formatValue(1000.1996, 3, '.,');
        expect(testValue).to.equal('1.000,200');

        // Test with string
        testValue = context.adapter.formatValue('1000', '.,');
        expect(testValue).to.be.a('string');
        expect(testValue).to.equal('1.000,00');

        // Test with an empty format pattern
        testValue = context.adapter.formatValue('1000', ''); //1.000,00
        const testValue2 = context.adapter.formatValue(
            '1000',
            context.adapter.isFloatComma === undefined ? '.,' : context.adapter.isFloatComma ? '.,' : ',.',
        ); //1.000,00
        expect(testValue).to.equal(testValue2);

        // @ts-expect-error should not be called like this by devs
        testValue = context.adapter.formatValue(undefined, '.,');
        expect(testValue).to.be.empty;

        // Test with no format and floatcomma true
        context.adapter.isFloatComma = true;
        testValue = context.adapter.formatValue('1000');
        expect(testValue).to.be.a('string');
        expect(testValue).to.equal('1.000,00');

        // Test with no format and floatcomma false
        context.adapter.isFloatComma = false;
        testValue = context.adapter.formatValue('1000');
        expect(testValue).to.be.a('string');
        expect(testValue).to.equal('1,000.00');

        done();
    });

    // formatDate
    it(`${context.name} ${context.adapterShortName} adapter: Check formatDate`, function (done) {
        this.timeout(3_000);
        const testDate = new Date(0);
        let testStringDate;

        expect(context.adapter.formatDate(new Date())).to.be.a('string');

        testStringDate = context.adapter.formatDate(testDate, 'YYYY-MM-DD');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.equal('1970-01-01');

        // expect 1 hour as output
        testStringDate = context.adapter.formatDate(3_600_000 + 60_000 + 42_000 + 1, 'duration', 'hh.mm.ss.sss');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.equal('01.01.42.001'); // 1 hour, 1 minute, 42 seconds, 1 milliseconds

        // positive test with "Februar"
        testStringDate = context.adapter.formatDate('23 Februar 2014', 'YYYY.MM.DD');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.contain('2014.02.23');

        // negative test, give the wrong date "Fabruar"
        testStringDate = context.adapter.formatDate('23 Fabruar 2014', 'YYYY.MM.DD');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.contain('NaN'); // NaN.NaN.NaN

        // expect 03.03.2003 as output (time in second)
        testStringDate = context.adapter.formatDate(1046681200, false, 'DD.MM.YYYY');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.contain('03.03.2003');

        // expect 03.03.03 as output (time in milisecond) . year length 2
        testStringDate = context.adapter.formatDate(1046681200000, false, 'DD.MM.YY');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.contain('03.03.03');

        // expect 03.09.12 as output (time in milisecond) . year length 2
        testStringDate = context.adapter.formatDate(1346681200000, false, 'DD.MM.YY');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.contain('03.09.12');

        // test with min sec milli
        testStringDate = context.adapter.formatDate(68033, true, 'm.ss,sss');
        expect(testStringDate).to.contain('1.08,033');

        // @ts-expect-error should not be called like this by devs
        testStringDate = context.adapter.formatDate(undefined, 'YYYY.MM.DD');
        expect(testStringDate).to.be.empty;

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
        expect(adapterName).to.equal('test');
        const adapterInstance = context.adapter.instance;
        expect(adapterInstance).to.equal(0);
        const adapterNamespace = context.adapter.namespace;
        expect(adapterNamespace).to.equal(`${adapterName}.${adapterInstance}`);

        let testString;
        //test with Object empty
        testString = utils.fixId({});
        expect(testString).to.be.a('string');
        expect(testString).to.equal(`${adapterNamespace}.`);

        //test with Object state
        testString = utils.fixId({
            state: 'baz',
        });
        expect(testString).to.be.a('string');
        expect(testString).to.equal(`${adapterNamespace}.baz`);

        //test with Object state + channel
        testString = utils.fixId({
            state: 'baz',
            channel: 'bar',
        });
        expect(testString).to.be.a('string');
        expect(testString).to.equal(`${adapterNamespace}.bar.baz`);

        //test with Object state + channel + device
        testString = utils.fixId({
            state: 'baz',
            channel: 'bar',
            device: 'foo',
        });
        expect(testString).to.be.a('string');
        expect(testString).to.equal(`${adapterNamespace}.foo.bar.baz`);

        //test with string empty as state
        testString = utils.fixId('');
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace);

        //test with string empty as subscribe
        testString = utils.fixId('', true);
        expect(testString).to.be.a('string');
        expect(testString).to.equal(`${adapterNamespace}.`);

        //test with string state
        testString = utils.fixId('baz');
        expect(testString).to.be.a('string');
        expect(testString).to.equal(`${adapterNamespace}.baz`);

        //test with string state + channel
        testString = utils.fixId('bar.baz');
        expect(testString).to.be.a('string');
        expect(testString).to.equal(`${adapterNamespace}.bar.baz`);

        //test with string state + channel + device
        testString = utils.fixId('foo.bar.baz');
        expect(testString).to.be.a('string');
        expect(testString).to.equal(`${adapterNamespace}.foo.bar.baz`);

        //test with already fixed ID
        testString = utils.fixId(`${adapterNamespace}.foo.bar.baz`);
        expect(testString).to.be.a('string');
        expect(testString).to.equal(`${adapterNamespace}.foo.bar.baz`);

        //test composition
        testString = utils.fixId(utils.fixId('foo.bar.baz'));
        expect(testString).to.be.a('string');
        expect(testString).to.equal(`${adapterNamespace}.foo.bar.baz`);
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

        expect(() => {
            context.adapter.setTimeout(
                () => {
                    /** pass */
                },
                2 ** 32 / 2,
            );
        }).to.throw(/is larger than/, 'Invalid timeout not thrown');

        expect(() => {
            context.adapter.setTimeout(() => {
                /** pass */
            }, -500);
        }).to.throw(/is smaller than/, 'Invalid timeout not thrown');

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

        expect(() => {
            context.adapter.setInterval(
                () => {
                    /** pass */
                },
                2 ** 32 / 2,
            );
        }).to.throw(/is larger than/, 'Invalid timeout not thrown');

        expect(() => {
            context.adapter.setInterval(() => {
                /** pass */
            }, -500);
        }).to.throw(/is smaller than/, 'Invalid timeout not thrown');

        done();
    });

    // idToDCS
    it(`${context.name} ${context.adapterShortName} adapter: Check idToDCS`, function (done) {
        this.timeout(3000);
        let testString;

        // @ts-expect-error test no id
        testString = context.adapter.idToDCS();
        expect(testString).to.equal(null);

        // test invalid id
        testString = context.adapter.idToDCS('device.channel.state');
        expect(testString).to.equal(null);

        // test valid id
        testString = context.adapter.idToDCS(`${context.adapter.namespace}.device.channel.state`);
        expect(testString).to.deep.equal({ device: 'device', channel: 'channel', state: 'state' });

        done();
    });

    // _DCS2ID
    it(`${context.name} ${context.adapterShortName} adapter: Check _DCS2ID`, function (done) {
        this.timeout(3_000);
        let testString;

        // @ts-expect-error test no parameters
        testString = context.adapter._DCS2ID();
        expect(testString).to.equal('');

        // @ts-expect-error test device
        testString = context.adapter._DCS2ID('device');
        expect(testString).to.equal('device');

        // @ts-expect-error test device + channel
        testString = context.adapter._DCS2ID('device', 'channel');
        expect(testString).to.equal('device.channel');

        // @ts-expect-error test device + channel + stateOrPoint (true)
        testString = context.adapter._DCS2ID('device', 'channel', true);
        expect(testString).to.equal('device.channel.');

        // @ts-expect-error test device + channel + stateOrPoint (false)
        testString = context.adapter._DCS2ID('device', 'channel', false);
        expect(testString).to.equal('device.channel');

        // @ts-expect-error test device + channel + stateOrPoint (string)
        testString = context.adapter._DCS2ID('device', 'channel', 'state');
        expect(testString).to.equal('device.channel.state');

        //@ts-expect-error test device + stateOrPoint (string)
        testString = context.adapter._DCS2ID('device', null, 'state');
        expect(testString).to.equal('device.state');

        //@ts-expect-error test channel + stateOrPoint (string)
        testString = context.adapter._DCS2ID(null, 'channel', 'state');
        expect(testString).to.equal('channel.state');

        // @ts-expect-error test stateOrPoint (true)
        testString = context.adapter._DCS2ID(null, null, true);
        expect(testString).to.equal('');

        // @ts-expect-error test stateOrPoint (false)
        testString = context.adapter._DCS2ID(null, null, false);
        expect(testString).to.equal('');

        // @ts-expect-error test stateOrPoint (string)
        testString = context.adapter._DCS2ID(null, null, 'state');
        expect(testString).to.equal('state');

        done();
    });

    it(`${context.name} ${context.adapterShortName} adapter: encrypt decrypt functions`, () => {
        const encrypted = context.adapter.encrypt('topSecret');
        // we only check not equal, because encryption can change and is not always deterministic
        expect(encrypted.length).to.equal(79);
        expect(encrypted.startsWith('$/aes-192-cbc:')).to.be.true;
        const decrypted = context.adapter.decrypt(encrypted);
        // check that correctly decrypted
        expect(decrypted).to.equal('topSecret');
    });

    it(`${context.name} ${context.adapterShortName} adapter: updateConfig needs to respect encryptedNative`, async () => {
        const oldConfig = await context.adapter.getForeignObjectAsync(`system.adapter.${context.adapter.namespace}`);

        const passphrase = 'SavePassword123';

        await context.adapter.updateConfig({ secondPassword: passphrase });
        const newConfig = await context.adapter.getForeignObjectAsync(`system.adapter.${context.adapter.namespace}`);

        // non encrypted and non updated params stay the same
        expect(newConfig?.native.paramString).to.exist;
        expect(newConfig?.native.paramString).to.be.equal(oldConfig?.native.paramString);

        // encrypted non updated passwords, decrypt to the same value
        expect(newConfig?.native.password).to.exist;
        expect(context.adapter.decrypt(newConfig?.native.password)).to.be.equal(
            context.adapter.decrypt(oldConfig?.native.password),
        );

        // updated encrypted value is correctly decrypted
        expect(newConfig?.native.secondPassword).to.exist;
        expect(context.adapter.decrypt(newConfig?.native.secondPassword)).to.be.equal(passphrase);
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
                    expect(callback).to.have.been.calledOnce;
                    expect(callback.firstCall.args[0].message.includes('At least one property is expected!')).to.be
                        .true;
                    done();
                });
            });

            it('forbids extra properties', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, foo: 'bar' }, callback);
                setImmediate(() => {
                    expect(callback).to.have.been.calledOnce;
                    expect(callback.firstCall.args[0].message).to.match(/forbidden/);
                    done();
                });
            });

            it('enforces ack to be a boolean', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, ack: 'true' }, callback);
                setImmediate(() => {
                    expect(callback).to.have.been.calledOnce;
                    expect(callback.firstCall.args[0].message).to.match(/wrong type/);
                    expect(callback.firstCall.args[0].message.includes('should be "boolean"')).to.be.true;
                    done();
                });
            });

            it('enforces ts to be a number', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, ts: true }, callback);
                setImmediate(() => {
                    expect(callback).to.have.been.calledOnce;
                    expect(callback.firstCall.args[0].message).to.match(/wrong type/);
                    expect(callback.firstCall.args[0].message.includes('should be "number"')).to.be.true;
                    done();
                });
            });

            it('enforces q to be a number', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, q: true }, callback);
                setImmediate(() => {
                    expect(callback).to.have.been.calledOnce;
                    expect(callback.firstCall.args[0].message).to.match(/wrong type/);
                    expect(callback.firstCall.args[0].message.includes('should be "number"')).to.be.true;
                    done();
                });
            });

            it('enforces expire to be a number', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, expire: true }, callback);
                setImmediate(() => {
                    expect(callback).to.have.been.calledOnce;
                    expect(callback.firstCall.args[0].message).to.match(/wrong type/);
                    expect(callback.firstCall.args[0].message.includes('should be "number"')).to.be.true;
                    done();
                });
            });

            it('enforces from to be a string', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, from: 2 }, callback);
                setImmediate(() => {
                    expect(callback).to.have.been.calledOnce;
                    expect(callback.firstCall.args[0].message).to.match(/wrong type/);
                    expect(callback.firstCall.args[0].message.includes('should be "string"')).to.be.true;
                    done();
                });
            });

            it('enforces c to be a string', function (done) {
                this.timeout(3_000);
                const callback = spy();
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { val: 1, c: [] }, callback);
                setImmediate(() => {
                    expect(callback).to.have.been.calledOnce;
                    expect(callback.firstCall.args[0].message).to.match(/wrong type/);
                    expect(callback.firstCall.args[0].message.includes('should be "string"')).to.be.true;
                    done();
                });
            });

            it('is okay to have undefined val if another property exists', function (done) {
                this.timeout(3_000);
                // cannot use the sync spies here, so only evaluate the err
                // @ts-expect-error methods have different signatures, but it is fine here
                context.adapter[method]('testid', { ack: true }, err => {
                    expect(err).to.be.not.ok;
                    done();
                });
            });
        });
    }

    it(`${context.name} ${context.adapterShortName} getAdapterScopedPackageIdentifier`, () => {
        const nonOrgaPacket = context.adapter.getAdapterScopedPackageIdentifier('axios');
        const orgaPacket = context.adapter.getAdapterScopedPackageIdentifier('@iobroker/adapter-react-v5');

        expect(nonOrgaPacket).to.be.equal('@iobroker-test.0/axios');
        expect(orgaPacket).to.be.equal('@iobroker-test.0/iobroker-adapter-react-v5');
    });
}
