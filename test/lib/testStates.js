/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

function register(it, expect, context) {
    var testName = context.name + ' ' + context.adapterShortName + ' adapter: ';
    var gid = 'testStates';

    // setState
    it(testName + 'Set local state', function (done) {
        this.timeout(1000);
        context.adapter.setObject(gid, {
            common: {
                name: 'test1',
                type: 'number',
                role: 'level',
                min: -100,
                max: 100
            },
            native: {
            },
            type: 'state'
        }, function (err) {
            expect(err).to.be.null;

            context.states.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                expect(err).to.be.null;

                context.adapter.setState(gid, 1, function (err) {
                    expect(err).to.be.not.ok;

                    context.states.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                        expect(err).to.be.null;
                        expect(state).to.be.ok;
                        expect(state.val).to.equal(1);
                        expect(state.ack).to.equal(false);

                        context.adapter.setState(gid, 2, true, function (err) {
                            expect(err).to.be.not.ok;

                            context.states.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                                expect(err).to.be.null;
                                expect(state).to.be.ok;
                                expect(state.val).to.equal(2);
                                expect(state.ack).to.equal(true);

                                context.adapter.setState(gid, {val: 3, ack: true}, function (err) {
                                    expect(err).to.be.not.ok;

                                    context.states.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                                        expect(err).to.be.null;
                                        expect(state).to.be.ok;
                                        expect(state.val).to.equal(3);
                                        expect(state.ack).to.equal(true);
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    // getState
    it(testName + 'Get local state', function (done) {
        this.timeout(1000);
        context.adapter.getState(gid, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.getState(context.adapterShortName + '.0.' + gid, function (err, state) {
                expect(err).to.be.null;
                expect(state).to.be.ok;
                expect(state.val).to.equal(3);
                expect(state.ack).to.equal(true);

                // ask for non-existing state
                context.adapter.getState(gid + '5', function (err, state) {
                    expect(err).to.be.not.ok;
                    expect(state).to.be.not.ok;
                    done();
                });
            });
        });
    });

    // getStates
    it(testName + 'Get local states', function (done) {
        this.timeout(1000);
        context.adapter.getStates('*', function (err, states) {
            expect(err).to.be.not.ok;
            expect(states).to.be.an('object');
            expect(states[context.adapterShortName + '.0.' + gid]).to.be.ok;
            expect(states[context.adapterShortName + '.0.' + gid].val).to.equal(3);
            expect(states[context.adapterShortName + '.0.' + gid].ack).equal(true);

            context.adapter.getStates('abc*', function (err, states) {
                expect(err).to.be.not.ok;
                expect(states).to.be.an('object');
                var found = false;
                for(var a in states) {
                    found = true;
                }
                expect(found).to.be.false;

                var iid = gid;
                context.adapter.getStates(gid.substring(0, gid.length - 2) + '*', function (err, states) {
                    expect(err).to.be.not.ok;
                    expect(states).to.be.an('object');
                    expect(states[context.adapterShortName + '.0.' + gid]).to.be.ok;
                    expect(states[context.adapterShortName + '.0.' + gid].val).to.equal(3);
                    expect(states[context.adapterShortName + '.0.' + gid].ack).equal(true);

                    done();
                });
            });
        });
    });
    // delState
    it(testName + 'Delete local state', function (done) {
        this.timeout(1000);
        context.adapter.delState(gid, function (err) {
            expect(err).to.be.not.ok;

            context.adapter.getState(gid, function (err, state) {
                expect(err).to.be.not.ok;
                expect(state).to.be.not.ok;

                context.adapter.delState(gid, function (err) {
                    expect(err).to.be.not.ok;

                    done();
                });
            });
        });
    });
    // setStateChanged

    // setForeignState

    // setForeignStateChanged
    // getForeignState
    // delForeignState
    // getForeignStates

    // getHistory - cannot be tested

    // subscribeForeignStates
    // unsubscribeForeignStates
    // subscribeStates
    // unsubscribeStates

}


module.exports.register = register;
