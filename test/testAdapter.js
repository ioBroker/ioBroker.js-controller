/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */

var expect = require('chai').expect;
var setup  = require(__dirname + '/lib/setup4controller');

var objects = null;
var states  = null;
var adapter = null;

var onControllerStateChanged  = null;
var onControllerObjectChanged = null;
var onAdapterStateChanged     = null;
var onAdapterObjectChanged    = null;
var onAdapterUnload           = null;
var onAdapterMessage          = null;
var sendToID = 1;
var dataDir = __dirname + '/../tmp/data';

var statesConfig = {
    options : {
        auth_pass : null,
        retry_max_delay : 15000
    },
    type:           'file',
    host:           '127.0.0.1',
    port:           19000,
    user:           '',
    pass:           '',
    dataDir:        dataDir
};

var objectsConfig = {
    dataDir:        dataDir,
    type:           'file',
    host:           '127.0.0.1',
    port:           19001,
    user:           '',
    pass:           '',
    noFileCache:    true,
    connectTimeout: 2000
};

var adapterShortName = 'test';

function startAdapter(callback) {
    var Adapter = require(__dirname + '/../lib/adapter.js');

    adapter = new Adapter({
        config: {
            states: statesConfig,
            objects: objectsConfig
        },
        dirname: __dirname + '/lib',
        name: adapterShortName,
        objectChange: function (id, obj) {
            if (onAdapterObjectChanged) onAdapterObjectChanged(id, obj);
        },
        stateChange: function (id, state) {
            if (onAdapterStateChanged) onAdapterStateChanged(id, state);
        },
        unload: function (callback) {
            if (onAdapterUnload) onAdapterUnload(callback);
        },
        message: function (obj) {
            if (onAdapterMessage) onAdapterMessage(obj);

        },
        ready: function () {
            if (callback) callback();
        }
    });
}

function checkConnectionOfAdapter(isConnected, cb, counter) {
    counter = counter || 0;
    console.log('Try check #' + counter);
    if (counter > 30) {
        if (cb) cb('Cannot check connection');
        return;
    }

    states.getState('system.adapter.' + adapterShortName + '.0.alive', function (err, state) {
        if (err) console.error(err);
        if (state && (state.val === isConnected)) {
            if (cb) cb();
        } else {
            setTimeout(function () {
                checkConnectionOfAdapter(isConnected, cb, counter + 1);
            }, 1000);
        }
    });
}

function checkValueOfState(id, value, cb, counter) {
    counter = counter || 0;
    if (counter > 20) {
        if (cb) cb('Cannot check value Of State ' + id);
        return;
    }

    states.getState(id, function (err, state) {
        if (err) console.error(err);
        if (value === null && !state) {
            if (cb) cb();
        } else
        if (state && (value === undefined || state.val === value)) {
            if (cb) cb();
        } else {
            setTimeout(function () {
                checkValueOfState(id, value, cb, counter + 1);
            }, 500);
        }
    });
}

function sendTo(target, command, message, callback) {
    onControllerStateChanged = function (id, state) {
        if (id === 'messagebox.system.adapter.test.0') {
            callback(state.message);
        }
    };

    states.pushMessage('system.adapter.' + target, {
        command:    command,
        message:    message,
        from:       'system.adapter.test.0',
        callback: {
            message: message,
            id:      sendToID++,
            ack:     false,
            time:    (new Date()).getTime()
        }
    });
}

function addInstance() {
    var fs = require('fs');
    if (!fs.existsSync(setup.rootDir + 'tmp/')) {
        fs.mkdirSync(setup.rootDir + 'tmp/');
    }
    if (!fs.existsSync(setup.rootDir + 'tmp/data/')) {
        fs.mkdirSync(setup.rootDir + 'tmp/data/');
    }
    fs.writeFileSync(setup.rootDir + 'tmp/data/objects.json', fs.readFileSync(__dirname + '/lib/objects.json'));
    fs.writeFileSync(setup.rootDir + 'tmp/data/states.json', fs.readFileSync(__dirname + '/lib/states.json'));
}

describe('Test ' + adapterShortName + ' adapter', function() {
    before('Test ' + adapterShortName + ' adapter: Start js-controller and adapter', function (_done) {
        this.timeout(6000); // no installation

        addInstance();
        var _statesConfig  = JSON.parse(JSON.stringify(statesConfig));
        var _objectsConfig = JSON.parse(JSON.stringify(objectsConfig));

        _statesConfig.onChange = function (id, state) {
            console.log('state changed. ' + id);
            if (onControllerStateChanged) onControllerStateChanged(id, state)
        };
        _objectsConfig.onChange = function (id, obj) {
            console.log('object changed. ' + id);
            if (onControllerObjectChanged) onControllerObjectChanged(id, obj)
        };

        setup.startController({
                objects: _objectsConfig,
                states: _statesConfig
            },
            function (_objects, _states) {
                objects = _objects;
                states  = _states;
                expect(objects).to.be.ok;
                expect(states).to.be.ok;
                startAdapter(function () {
                    _done();
                });
            }
        );
    });
    
    it('Test ' + adapterShortName + ' adapter: Check if adapter started', function (done) {
        this.timeout(60000);
        checkConnectionOfAdapter(true, function (err) {
            if (err) console.log(err);
            expect(err).not.to.be.equal('Cannot check connection');
            done();
        });
    });

    it('Test ' + adapterShortName + ' adapter: check all important adapter attributes', function (done) {
        this.timeout(1000);
        expect(adapter.namespace).to.be.equal(adapterShortName + '.0');
        expect(adapter.name).to.be.equal(adapterShortName);
        expect(adapter.instance).to.be.equal('0');
        expect(adapter.states).to.be.ok;
        expect(adapter.objects).to.be.ok;
        expect(adapter.log).to.be.ok;
        expect(adapter.log.info).to.be.a('function');
        expect(adapter.log.debug).to.be.a('function');
        expect(adapter.log.warn).to.be.a('function');
        expect(adapter.log.error).to.be.a('function');
        expect(adapter.config.paramString).to.be.equal('value1');
        expect(adapter.config.paramNumber).to.be.equal(42);
        expect(adapter.config.paramBoolean).to.be.equal(false);
        var count = 0;

        states.getState('system.adapter.' + adapterShortName + '.0.connected', function (err, state) {
            expect(state.val).to.be.equal(true);
            setTimeout(function () {
                if (!--count) done();
            }, 0);
        });

        count++;
        states.getState('system.adapter.' + adapterShortName + '.0.memRss', function (err, state) {
            expect(state.val).to.be.above(0);
            setTimeout(function () {
                if (!--count) done();
            }, 0);
        });

        count++;
        states.getState('system.adapter.' + adapterShortName + '.0.memHeapTotal', function (err, state) {
            expect(state.val).to.be.above(0);
            setTimeout(function () {
                if (!--count) done();
            }, 0);
        });

        count++;
        states.getState('system.adapter.' + adapterShortName + '.0.memHeapUsed', function (err, state) {
            expect(state.val).to.be.above(0);
            setTimeout(function () {
                if (!--count) done();
            }, 0);
        });

        count++;
        states.getState('system.adapter.' + adapterShortName + '.0.uptime', function (err, state) {
            expect(state.val).to.be.at.least(0);
            setTimeout(function () {
                if (!--count) done();
            }, 0);
        });
    });

    // setObject positive
    it('Test ' + adapterShortName + ' adapter: Check if objects will be created', function (done) {
        this.timeout(1000);
        var id = 'myTestObject';
        adapter.setObject(id, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level'
            },
            native: {},
            type: 'state'
        }, function () {
            objects.getObject(adapterShortName + '.0.' + id, function (err, obj) {
                expect(err).to.be.not.ok;
                expect(obj).to.be.ok;
                expect(obj.native).to.be.ok;
                expect(obj._id).equal(adapterShortName + '.0.' + id);
                expect(obj.common.name).equal('test1');
                expect(obj.type).equal('state');
                //expect(obj.acl).to.be.ok;
                done();
            });
        });
    });

    // setObject negative
    it('Test ' + adapterShortName + ' adapter: Check if objects will not be created without mandatory attribute type', function (done) {
        this.timeout(1000);
        var id = 'myTestObjectNoType';
        adapter.setObject(id, {
            common: {
                name: 'test1',
                type: 'number'
            },
            native: {},
            type_: 'state' // extra no type
        }, function () {
            objects.getObject(adapterShortName + '.0.' + id, function (err, obj) {
                expect(err).to.be.not.ok; // there is no message, that object does not exist. Errors will be given back only if no access rights
                expect(obj).to.be.not.ok;
                done();
            });
        });
    });

    // getAdapterObjects
    // extendObject
    // setForeignObject
    // extendForeignObject
    // getObject
    // getEnum
    // getEnums
    // getForeignObjects
    // findForeignObject
    // getForeignObject
    // delObject
    // delForeignObject
    // subscribeObjects
    // subscribeForeignObjects
    // unsubscribeForeignObjects
    // unsubscribeObjects
    // setObjectNotExists
    // setForeignObjectNotExists
    // _DCS2ID
    // createDevice
    // createChannel
    // createState
    // deleteDevice
    // addChannelToEnum
    // deleteChannelFromEnum
    // deleteChannel
    // deleteState
    // getDevices
    // getChannelsOf
    // getStatesOf
    // addStateToEnum
    // deleteStateFromEnum
    // chmodFile
    // readDir
    // unlink
    // rename
    // mkdir
    // readFile
    // writeFile
    // formatValue
    it('Test ' + adapterShortName + ' adapter: Check formatValue', function (done) {
        this.timeout(1000);
        var testValue, testValue2;

        testValue = adapter.formatValue(1000,'.,');
        expect(testValue).to.be.a('string');
        expect(testValue).to.equal('1.000,00');

        testValue = adapter.formatValue(1000.1994,3,'.,');
        expect(testValue).to.equal('1.000,199');
        testValue = adapter.formatValue(1000.1996,3,'.,');
        expect(testValue).to.equal('1.000,200');

        testValue = adapter.formatValue("1000",'.,');
        expect(testValue).to.be.a('string');
        expect(testValue).to.equal('1.000,00');

        testValue = adapter.formatValue("1000",'');
        testValue2 = adapter.formatValue("1000", (adapter.isFloatComma === undefined) ? '.,' : ((adapter.isFloatComma) ? '.,' : ',.'));
        expect(testValue).to.equal(testValue2);

        testValue = adapter.formatValue(undefined,'.,');
        expect(testValue).to.be.empty;
    });

    // formatDate
    it('Test ' + adapterShortName + ' adapter: Check formatDate', function (done) {
        this.timeout(1000);
        var testDate = new Date(0);
        var testStringDate, testStringDate2;

        expect(adapter.formatDate(new Date())).to.be.a('string');

        testStringDate = adapter.formatDate(testDate, "YYYY-MM-DD");
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.equal('1970-01-01');

        testStringDate = adapter.formatDate(testDate, "duration", "YYYY.MM.DD.hh.mm.ss.sss");
        testStringDate2 = adapter.formatDate(new Date(0).setMilliseconds(testDate.getMilliseconds() + testDate.getTimezoneOffset() * 60 * 1000), "YYYY.MM.DD.hh.mm.ss.sss");
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.equal(testStringDate2);

        testStringDate = adapter.formatDate("23 Februar 2014", "YYYY.MM.DD");
        expect(testStringDate).to.be.a('string');
        expect(testStringDate).to.equal('NaN');

        testStringDate = adapter.formatDate(undefined, "YYYY.MM.DD");
        expect(testStringDate).to.be.empty;
    });


    // sendTo => controller => adapter
    // sendToHost - cannot be tested
    // setState
    // setStateChanged
    // setForeignState
    // setForeignStateChanged
    // getState
    // getForeignState
    // getHistory - cannot be tested
    // idToDCS
    // delState
    // delForeignState
    // getStates
    // getForeignStates
    // subscribeForeignStates
    // unsubscribeForeignStates
    // subscribeStates
    // unsubscribeStates
    // pushFifo
    // trimFifo
    // getFifoRange
    // getFifo
    // lenFifo
    // subscribeFifo
    // getSession
    // setSession
    // destroySession
    // getMessage
    // lenMessage
    // setBinaryState
    // getBinaryState

    // this test is 15 seconds long. Enable it only if ready to push
    /*it('Test ' + adapterShortName + ' adapter: Check if uptime changes', function (done) {
        this.timeout(20000);

        states.getState('system.adapter.' + adapterShortName + '.0.uptime', function (err, state1) {
            expect(err).to.be.not.ok;
            expect(state1).to.be.ok;
            expect(state1.val).to.be.ok;

            setTimeout(function () {
                states.getState('system.adapter.' + adapterShortName + '.0.uptime', function (err, state2) {
                    expect(err).to.be.not.ok;
                    expect(state2).to.be.ok;
                    expect(state2.val).to.be.ok;
                    if (state2.val !== state1.val) {
                        expect(state2.val).to.be.above(state1.val);
                        done();
                    } else {
                        setTimeout(function () {
                            states.getState('system.adapter.' + adapterShortName + '.0.uptime', function (err, state2) {
                                expect(err).to.be.not.ok;
                                expect(state2).to.be.ok;
                                expect(state2.val).to.be.ok;
                                if (state2.val !== state1.val) {
                                    expect(state2.val).to.be.above(state1.val);
                                    done();
                                } else {
                                    setTimeout(function () {
                                        states.getState('system.adapter.' + adapterShortName + '.0.uptime', function (err, state2) {
                                            expect(err).to.be.not.ok;
                                            expect(state2).to.be.ok;
                                            expect(state2.val).to.be.ok;
                                            expect(state2.val).to.be.above(state1.val);
                                            done();
                                        });
                                    }, 6000);
                                }
                            });
                        }, 5000);
                    }
                });
            }, 5000);
        });
    });*/

    after('Test ' + adapterShortName + ' adapter: Stop js-controller', function (done) {
        this.timeout(10000);

        expect(adapter.connected).to.be.true;
        setup.stopController(function (normalTerminated) {
            console.log('Adapter normal terminated: ' + normalTerminated);
            setTimeout(function () {
                expect(adapter.connected).to.be.false;
                done();
            }, 500);
        });
    });
});
