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
    // getStates
    // delState

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
