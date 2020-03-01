/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

const promiseSequence = require('../../lib/tools').promiseSequence;
const { spy } = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

/**
 * @typedef {{
 *     adapter: Record<string, (...args: any[]) => any>;
 *     name: string;
 *     adapterShortName: string;
 * }} Context
 */
/**
 * @param {Context} context
 */
function register(it, expect, context) {

    //adapterGetPort
    it(context.name + ' ' + context.adapterShortName + ' adapter: find next free port', function (done) {
        this.timeout(1000);

        //Throw Error
        expect(context.adapter.getPort.bind('')).to.throw('adapterGetPort: no port');

        expect(context.adapter.getPortRunning).to.not.exist;

        //Works like it should be
        context.adapter.getPort(8080, function (port) {
            expect(port).to.be.at.least(8080);
            expect(context.adapter.getPortRunning).to.have.all.keys(['port', 'host', 'callback']);
            expect(context.adapter.getPortRunning).to.have.property('port', port);

            done();
        });
    });

    // NOT READY: Running this after the adapterGetPort (sync) test causes getPortRunning to already exist

    // //adapterGetPort (async)
    // it(context.name + ' ' + context.adapterShortName + ' adapter: find next free port (ASYNC)', function () {
    //     this.timeout(1000);

    //     const tests = [
    //         //Throw Error
    //         () => context.adapter.getPortAsync('').should.be.rejectedWith('adapterGetPort: no port'),
    //         () => expect(context.adapter.getPortRunning).to.not.exist,

    //         //Works like it should be
    //         () => context.adapter.getPortAsync(8080).to.be.fulfilled.then(port => {
    //             expect(port).to.be.at.least(8080);
    //             expect(context.adapter.getPortRunning).to.have.all.keys(['port', 'callback']);
    //             expect(context.adapter.getPortRunning).to.have.property('port', port);
    //         })
    //     ];

    //     return promiseSequence(tests);
    // });

    //checkPassword
    it(context.name + ' ' + context.adapterShortName + ' adapter: validates user and password', function (done) {
        this.timeout(1000);

        //Expecting a callback
        expect(context.adapter.checkPassword.bind('claus', '1234')).to.throw('checkPassword: no callback');

        //User doesnt exists
        context.adapter.checkPassword('claus', '1234', function(res){
            expect(res).to.be.false;
        });

        //Wrong password
        context.adapter.checkPassword('admin', '1234', function(res){
            expect(res).to.be.false;
        });

        done();
    });

    //checkPassword (async)
    it(context.name + ' ' + context.adapterShortName + ' adapter: validates user and password (ASYNC)', function () {
        this.timeout(1000);

        const tests = [
            // promisify always provides a callback, so that doesn't need to be tested

            // User doesn't exist
            () => context.adapter.checkPasswordAsync('claus', '1234').should.eventually.equal(false),

            // Wrong password
            () => context.adapter.checkPasswordAsync('admin', '1234').should.eventually.equal(false)
        ];

        return promiseSequence(tests);
    });

    //setPassword
    it(context.name + ' ' + context.adapterShortName + ' adapter: sets the users password', function (done) {
        this.timeout(1000);
        // TODO: sync
        // TODO: async
        done();
    });

    //checkGroup
    it(context.name + ' ' + context.adapterShortName + ' adapter: user exists and is in the group', function (done) {
        this.timeout(1000);
        // TODO: sync
        // TODO: async
        done();
    });

    //calculatePermissions
    it(context.name + ' ' + context.adapterShortName + ' adapter: get the user permissions', function (done) {
        this.timeout(1000);
        // TODO: sync
        // TODO: async
        done();
    });

    //getCertificates
    it(context.name + ' ' + context.adapterShortName + ' adapter: returns SSL certificates by name', function (done) {
        this.timeout(1000);
        // TODO: sync
        // TODO: async
        done();
    });

    // formatValue
    it(context.name + ' ' + context.adapterShortName + ' adapter: Check formatValue', function (done) {
        this.timeout(1000);
        let testValue, testValue2;

        // Test with number
        testValue = context.adapter.formatValue(1000,'.,');
        expect(testValue).to.be.a('string');
        expect(testValue).to.equal('1.000,00');

        // Test against rounding errors
        testValue = context.adapter.formatValue(1000.1994, 3, '.,');
        expect(testValue).to.equal('1.000,199');
        testValue = context.adapter.formatValue(1000.1996, 3,'.,');
        expect(testValue).to.equal('1.000,200');

        // Test with string
        testValue = context.adapter.formatValue('1000', '.,');
        expect(testValue).to.be.a('string');
        expect(testValue).to.equal('1.000,00');

        // Test with an empty format pattern
        testValue = context.adapter.formatValue('1000', ''); //1.000,00
        testValue2 = context.adapter.formatValue('1000', (context.adapter.isFloatComma === undefined) ? '.,' : ((context.adapter.isFloatComma) ? '.,' : ',.')); //1.000,00
        expect(testValue).to.equal(testValue2);

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
    it(context.name + ' ' + context.adapterShortName + ' adapter: Check formatDate', function (done) {
        this.timeout(1000);
        const testDate = new Date(0);
        let testStringDate, testStringDate2;

        expect(context.adapter.formatDate(new Date())).to.be.a('string');

        testStringDate = context.adapter.formatDate(testDate, 'YYYY-MM-DD');
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.equal('1970-01-01');

        // expect 1 hour as output
        testStringDate = context.adapter.formatDate(1 * 3600000 + 1 * 60000 + 42000 + 1, 'duration', 'hh.mm.ss.sss');
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

        testStringDate = context.adapter.formatDate(undefined, 'YYYY.MM.DD');
        expect(testStringDate).to.be.empty;

        done();
    });

    //_fixId
    it(context.name + ' ' + context.adapterShortName + ' adapter: Check _fixId', function (done) {
        this.timeout(1000);
        const adapterName = context.adapter.name;
        expect(adapterName).to.equal('test');
        const adapterInstance = context.adapter.instance;
        expect(adapterInstance).to.equal(0);
        const adapterNamespace = context.adapter.namespace;
        expect(adapterNamespace).to.equal(adapterName + '.' + adapterInstance);

        let testString;
        //test with Object empty
        testString = context.adapter._fixId({});
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace + '.');

        //test with Object state
        testString = context.adapter._fixId({
            state: 'baz'
        });
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace + '.baz');

        //test with Object state + channel
        testString = context.adapter._fixId({
            state: 'baz',
            channel: 'bar'
        });
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace + '.bar.baz');

        //test with Object state + channel + device
        testString = context.adapter._fixId({
            state: 'baz',
            channel: 'bar',
            device: 'foo'
        });
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace + '.foo.bar.baz');

        //test with string empty as state
        testString = context.adapter._fixId('');
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace);

        //test with string empty as subscribe
        testString = context.adapter._fixId('', true);
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace + '.');

        //test with string state
        testString = context.adapter._fixId('baz');
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace + '.baz');

        //test with string state + channel
        testString = context.adapter._fixId('bar.baz');
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace + '.bar.baz');

        //test with string state + channel + device
        testString = context.adapter._fixId('foo.bar.baz');
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace + '.foo.bar.baz');

        //test with already fixed ID
        testString = context.adapter._fixId(adapterNamespace + '.foo.bar.baz');
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace + '.foo.bar.baz');

        //test composition
        testString = context.adapter._fixId(context.adapter._fixId('foo.bar.baz'));
        expect(testString).to.be.a('string');
        expect(testString).to.equal(adapterNamespace + '.foo.bar.baz');

        done();
    });

    // idToDCS
    it(context.name + ' ' + context.adapterShortName + ' adapter: Check idToDCS', function (done) {
        this.timeout(1000);
        let testString;

        //test no id
        testString = context.adapter.idToDCS();
        expect(testString).to.equal(null);

        //test invalid id
        testString = context.adapter.idToDCS('device.channel.state');
        expect(testString).to.equal(null);

        //test valid id
        testString = context.adapter.idToDCS(context.adapter.namespace + '.device.channel.state');
        expect(testString).to.deep.equal({device: 'device', channel: 'channel', state: 'state'});

        done();
    });

    // _DCS2ID
    it(context.name + ' ' + context.adapterShortName + ' adapter: Check _DCS2ID', function (done) {
        this.timeout(1000);
        let testString;

        //test no parameters
        testString = context.adapter._DCS2ID();
        expect(testString).to.equal('');

        //test device
        testString = context.adapter._DCS2ID('device');
        expect(testString).to.equal('device');

        //test device + channel
        testString = context.adapter._DCS2ID('device', 'channel');
        expect(testString).to.equal('device.channel');

        //test device + channel + stateOrPoint (true)
        testString = context.adapter._DCS2ID('device', 'channel', true);
        expect(testString).to.equal('device.channel.');

        //test device + channel + stateOrPoint (false)
        testString = context.adapter._DCS2ID('device', 'channel', false);
        expect(testString).to.equal('device.channel');

        //test device + channel + stateOrPoint (string)
        testString = context.adapter._DCS2ID('device', 'channel', 'state');
        expect(testString).to.equal('device.channel.state');

        //test device + stateOrPoint (string)
        testString = context.adapter._DCS2ID('device', null, 'state');
        expect(testString).to.equal('device.state');

        //test channel + stateOrPoint (string)
        testString = context.adapter._DCS2ID(null, 'channel', 'state');
        expect(testString).to.equal('channel.state');

        //test stateOrPoint (true)
        testString = context.adapter._DCS2ID(null, null, true);
        expect(testString).to.equal('');

        //test stateOrPoint (false)
        testString = context.adapter._DCS2ID(null, null, false);
        expect(testString).to.equal('');

        //test stateOrPoint (string)
        testString = context.adapter._DCS2ID(null, null, 'state');
        expect(testString).to.equal('state');

        done();
    });

    // setState object validation
    for (const method of ['setState', 'setStateChanged', 'setForeignState', 'setForeignStateChanged']) {
        describe(`${context.name} ${context.adapterShortName} adapter: ${method} validates the state object`, () => {
            it('requires the val property to exist', function (done) {
                this.timeout(1000);
                const callback = spy();
                context.adapter[method]('testid', {ack: true}, callback);
                expect(callback).to.have.been.calledOnce;
                expect(callback.firstCall.args[0]).to.match(/required/);
                done();
            });

            it('forbids extra properties', function (done) {
                this.timeout(1000);
                const callback = spy();
                context.adapter[method]('testid', {val: 1, foo: 'bar'}, callback);
                expect(callback).to.have.been.calledOnce;
                expect(callback.firstCall.args[0]).to.match(/forbidden/);
                done();
            });

            it('enforces ack to be a boolean', function (done) {
                this.timeout(1000);
                const callback = spy();
                context.adapter[method]('testid', {val: 1, ack: 'true'}, callback);
                expect(callback).to.have.been.calledOnce;
                expect(callback.firstCall.args[0]).to.match(/wrong type/);
                expect(callback.firstCall.args[0].includes('should be "boolean"')).to.be.true;
                done();
            });

            it('enforces ts to be a number', function (done) {
                this.timeout(1000);
                const callback = spy();
                context.adapter[method]('testid', {val: 1, ts: true}, callback);
                expect(callback).to.have.been.calledOnce;
                expect(callback.firstCall.args[0]).to.match(/wrong type/);
                expect(callback.firstCall.args[0].includes('should be "number"')).to.be.true;
                done();
            });

            it('enforces q to be a number', function (done) {
                this.timeout(1000);
                const callback = spy();
                context.adapter[method]('testid', {val: 1, q: true}, callback);
                expect(callback).to.have.been.calledOnce;
                expect(callback.firstCall.args[0]).to.match(/wrong type/);
                expect(callback.firstCall.args[0].includes('should be "number"')).to.be.true;
                done();
            });

            it('enforces expire to be a number', function (done) {
                this.timeout(1000);
                const callback = spy();
                context.adapter[method]('testid', {val: 1, expire: true}, callback);
                expect(callback).to.have.been.calledOnce;
                expect(callback.firstCall.args[0]).to.match(/wrong type/);
                expect(callback.firstCall.args[0].includes('should be "number"')).to.be.true;
                done();
            });

            it('enforces from to be a string', function (done) {
                this.timeout(1000);
                const callback = spy();
                context.adapter[method]('testid', {val: 1, from: 2}, callback);
                expect(callback).to.have.been.calledOnce;
                expect(callback.firstCall.args[0]).to.match(/wrong type/);
                expect(callback.firstCall.args[0].includes('should be "string"')).to.be.true;
                done();
            });

            it('enforces c to be a string', function (done) {
                this.timeout(1000);
                const callback = spy();
                context.adapter[method]('testid', {val: 1, c: []}, callback);
                expect(callback).to.have.been.calledOnce;
                expect(callback.firstCall.args[0]).to.match(/wrong type/);
                expect(callback.firstCall.args[0].includes('should be "string"')).to.be.true;
                done();
            });
        });
    }
}

module.exports.register = register;
