import assert from 'node:assert/strict';
import sinon from 'sinon';
import { tools } from '@iobroker/js-controller-common';
import { SubscriptionManager } from './SubscriptionManager.js';
import type { AdapterContext } from '../context.js';

function makeContext(over: Partial<AdapterContext> = {}): AdapterContext {
    return {
        namespace: 'test.0',
        namespaceLog: 'test.0',
        logger: { silly() {}, debug() {}, info() {}, warn() {}, error() {} } as any,
        uiMessagingController: {} as any,
        states: null,
        objects: null,
        common: undefined,
        config: {} as ioBroker.AdapterConfig,
        host: 'localhost',
        countOutput: () => {},
        ...over,
    };
}
const fixId = (id: string): string => `test.0.${id}`;
function objStub(): {
    subscribeUserAsync: sinon.SinonStub;
    unsubscribeUserAsync: sinon.SinonStub;
    subscribeUserFile: sinon.SinonStub;
    unsubscribeUserFile: sinon.SinonStub;
} {
    return {
        subscribeUserAsync: sinon.stub().resolves(),
        unsubscribeUserAsync: sinon.stub().resolves(),
        subscribeUserFile: sinon.stub().resolves(),
        unsubscribeUserFile: sinon.stub().resolves(),
    };
}

function aliasStub(): Record<string, sinon.SinonStub> {
    return {
        hasPattern: sinon.stub().returns(false),
        addPattern: sinon.stub(),
        deletePattern: sinon.stub(),
        ensureAliasObjectSubscription: sinon.stub(),
        maybeDropAliasObjectSubscription: sinon.stub(),
        addAliasSubscribe: sinon.stub().resolves(),
        removeTargetsForPattern: sinon.stub().resolves(),
    };
}

function objectAccessStub(): { getForeignStateObjects: sinon.SinonStub } {
    return { getForeignStateObjects: sinon.stub().resolves({}) };
}

function statesStub(): Record<string, sinon.SinonStub> {
    return {
        subscribeUser: sinon.stub().callsFake((_pattern: string, cb?: () => void) => {
            if (typeof cb === 'function') {
                cb();
            }
            return Promise.resolve();
        }),
        unsubscribeUser: sinon.stub().resolves(),
        getState: sinon.stub().resolves(null),
        setState: sinon.stub().resolves(),
    };
}

describe('SubscriptionManager object subs', () => {
    it('subscribeForeignObjects delegates verbatim to subscribeUserAsync', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await mgr.subscribeForeignObjects('foo.*', { user: 'system.user.x' } as any);
        assert.equal(objects.subscribeUserAsync.firstCall.args[0], 'foo.*');
    });

    it('subscribeObjects fixes a non-foreign pattern and namespaces "*"', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await mgr.subscribeObjects('chan.*');
        assert.equal(objects.subscribeUserAsync.firstCall.args[0], 'test.0.chan.*');
        await mgr.subscribeObjects('*');
        assert.equal(objects.subscribeUserAsync.secondCall.args[0], 'test.0.*');
    });

    it('subscribeObjects passes an array pattern through unfixed', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await mgr.subscribeObjects(['chan.*', 'other.*']);
        assert.deepEqual(objects.subscribeUserAsync.firstCall.args[0], ['chan.*', 'other.*']);
    });

    it('subscribeObjects calls fixId with isPattern=true', async () => {
        const objects = objStub();
        const fixIdSpy = sinon.stub().callsFake((id: string) => `test.0.${id}`);
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixIdSpy,
            aliasStub() as any,
            objectAccessStub(),
        );
        await mgr.subscribeObjects('chan.*');
        assert.deepEqual(fixIdSpy.firstCall.args, ['chan.*', true]);
    });

    it('subscribeObjects/subscribeForeignObjects forward options to subscribeUserAsync', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        const options = { user: 'system.user.x' } as any;
        await mgr.subscribeObjects('chan.*', options);
        assert.equal(objects.subscribeUserAsync.firstCall.args[1], options);
        await mgr.subscribeForeignObjects('foo.*', options);
        assert.equal(objects.subscribeUserAsync.secondCall.args[1], options);
    });

    it('subscribeForeignObjects forwards null options when omitted', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await mgr.subscribeForeignObjects('foo.*');
        assert.equal(objects.subscribeUserAsync.firstCall.args[1], null);
    });

    it('unsubscribeObjects fixes a non-foreign pattern and namespaces "*"', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await mgr.unsubscribeObjects('chan.*');
        assert.equal(objects.unsubscribeUserAsync.firstCall.args[0], 'test.0.chan.*');
        await mgr.unsubscribeObjects('*');
        assert.equal(objects.unsubscribeUserAsync.secondCall.args[0], 'test.0.*');
    });

    it('unsubscribeObjects passes an array pattern through unfixed', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await mgr.unsubscribeObjects(['chan.*']);
        assert.deepEqual(objects.unsubscribeUserAsync.firstCall.args[0], ['chan.*']);
    });

    it('unsubscribeForeignObjects defaults pattern to "*"', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await mgr.unsubscribeForeignObjects(undefined as any);
        assert.equal(objects.unsubscribeUserAsync.firstCall.args[0], '*');
    });

    it('unsubscribeForeignObjects forwards options to unsubscribeUserAsync', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        const options = { user: 'system.user.x' } as any;
        await mgr.unsubscribeForeignObjects('foo.*', options);
        assert.equal(objects.unsubscribeUserAsync.firstCall.args[1], options);
    });

    it('rejects with ERROR_DB_CLOSED when objects DB down', async () => {
        const mgr = new SubscriptionManager(
            makeContext({ objects: null }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await assert.rejects(() => mgr.subscribeForeignObjects('foo.*'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('unsubscribeObjects rejects with ERROR_DB_CLOSED when objects DB down', async () => {
        const mgr = new SubscriptionManager(
            makeContext({ objects: null }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await assert.rejects(() => mgr.unsubscribeObjects('foo.*'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('rejects when subscribeUserAsync rejects', async () => {
        const objects = objStub();
        objects.subscribeUserAsync.rejects(new Error('boom'));
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await assert.rejects(() => mgr.subscribeForeignObjects('foo.*'), /boom/);
    });

    it('rejects when unsubscribeUserAsync rejects', async () => {
        const objects = objStub();
        objects.unsubscribeUserAsync.rejects(new Error('boom'));
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await assert.rejects(() => mgr.unsubscribeObjects('foo.*'), /boom/);
    });
});

describe('SubscriptionManager file subs', () => {
    it('subscribeForeignFiles delegates to subscribeUserFile', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await mgr.subscribeForeignFiles('vis.0', '*');
        assert.deepEqual(objects.subscribeUserFile.firstCall.args.slice(0, 2), ['vis.0', '*']);
    });

    it('unsubscribeForeignFiles defaults pattern to "*"', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await mgr.unsubscribeForeignFiles('vis.0', undefined as any);
        assert.equal(objects.unsubscribeUserFile.firstCall.args[1], '*');
    });

    it('subscribeForeignFiles/unsubscribeForeignFiles forward options', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        const options = { user: 'system.user.x' } as any;
        await mgr.subscribeForeignFiles('vis.0', '*', options);
        assert.equal(objects.subscribeUserFile.firstCall.args[2], options);
        await mgr.unsubscribeForeignFiles('vis.0', '*', options);
        assert.equal(objects.unsubscribeUserFile.firstCall.args[2], options);
    });

    it('throws ERROR_DB_CLOSED when objects DB down', async () => {
        const mgr = new SubscriptionManager(
            makeContext({ objects: null }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await assert.rejects(() => mgr.subscribeForeignFiles('vis.0', '*'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('unsubscribeForeignFiles throws ERROR_DB_CLOSED when objects DB down', async () => {
        const mgr = new SubscriptionManager(
            makeContext({ objects: null }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await assert.rejects(() => mgr.unsubscribeForeignFiles('vis.0', '*'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('rejects when subscribeUserFile rejects', async () => {
        const objects = objStub();
        objects.subscribeUserFile.rejects(new Error('boom'));
        const mgr = new SubscriptionManager(
            makeContext({ objects: objects as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await assert.rejects(() => mgr.subscribeForeignFiles('vis.0', '*'), /boom/);
    });
});

function build(
    over: {
        states?: Record<string, sinon.SinonStub>;
        objects?: any;
        alias?: Record<string, sinon.SinonStub>;
        objectAccess?: { getForeignStateObjects: sinon.SinonStub };
        countOutput?: sinon.SinonStub;
    } = {},
): {
    mgr: SubscriptionManager;
    states: Record<string, sinon.SinonStub>;
    objects: any;
    alias: Record<string, sinon.SinonStub>;
    objectAccess: { getForeignStateObjects: sinon.SinonStub };
    countOutput: sinon.SinonStub;
} {
    const states = over.states ?? statesStub();
    const objects = over.objects ?? {};
    const alias = over.alias ?? aliasStub();
    const objectAccess = over.objectAccess ?? objectAccessStub();
    const countOutput = over.countOutput ?? sinon.stub();
    const mgr = new SubscriptionManager(
        makeContext({ states: states as any, objects: objects, countOutput }),
        fixId,
        alias as any,
        objectAccess,
    );
    return { mgr, states, objects, alias, objectAccess, countOutput };
}

describe('SubscriptionManager state subs', () => {
    it('subscribeForeignStates subscribes a plain foreign state via states.subscribeUser', async () => {
        const { mgr, states } = build();
        await mgr.subscribeForeignStates('foo.0.x');
        assert.equal(states.subscribeUser.calledWith('foo.0.x'), true);
    });

    it('subscribeForeignStates("*") reads alias objects, subscribes each alias, then subscribes "*"', async () => {
        const aliasObj = { _id: 'alias.0.x', type: 'state', common: { alias: { id: 'foo.0.src' } } };
        const objectAccess = {
            getForeignStateObjects: sinon
                .stub()
                .resolves({ 'alias.0.x': aliasObj, 'foo.0.y': { _id: 'foo.0.y', type: 'state' } }),
        };
        const alias = aliasStub();
        const options = { user: 'system.user.admin' } as any;
        const { mgr, states } = build({ alias, objectAccess });
        await mgr.subscribeForeignStates('*', options);
        assert.equal(objectAccess.getForeignStateObjects.calledWith('*', options), true);
        assert.equal(alias.ensureAliasObjectSubscription.called, true);
        assert.equal(alias.addAliasSubscribe.calledWith(aliasObj, '*'), true);
        assert.equal(states.subscribeUser.calledWith('*'), true);
    });

    it('subscribeForeignStates([alias, plain]) subscribes the alias and the plain state separately', async () => {
        const aliasObj = { _id: 'alias.0.a', type: 'state', common: { alias: { id: 'foo.0.src' } } };
        const objects = { getObjects: sinon.stub().resolves([aliasObj]) };
        const alias = aliasStub();
        const { mgr, states } = build({ objects, alias });
        await mgr.subscribeForeignStates(['alias.0.a', 'foo.0.b']);
        assert.equal(alias.ensureAliasObjectSubscription.called, true);
        assert.equal(objects.getObjects.calledWith(['alias.0.a']), true);
        assert.equal(alias.addAliasSubscribe.calledWith(aliasObj, 'alias.0.a'), true);
        assert.equal(states.subscribeUser.calledWith('foo.0.b'), true);
    });

    it('subscribeForeignStates maintains the auto-subscribe counter and calls countOutput', async () => {
        const states = statesStub();
        const countOutput = sinon.stub();
        const { mgr } = build({ states, countOutput });
        mgr.addSubscribableInstance('pushover.0');
        await mgr.subscribeForeignStates('pushover.0.x');
        assert.equal(states.getState.calledWith('system.adapter.pushover.0.subscribes'), true);
        const setArgs = states.setState.firstCall.args;
        assert.equal(setArgs[0], 'system.adapter.pushover.0.subscribes');
        assert.deepEqual(JSON.parse(setArgs[1] as string), { 'pushover.0.x': { 'test.0': 1 } });
        assert.equal(countOutput.calledOnce, true);
    });

    it('removeSubscribableInstance stops auto-subscribe counter maintenance', async () => {
        const states = statesStub();
        const countOutput = sinon.stub();
        const { mgr } = build({ states, countOutput });
        mgr.addSubscribableInstance('pushover.0');
        mgr.removeSubscribableInstance('pushover.0');
        await mgr.subscribeForeignStates('pushover.0.x');
        assert.equal(states.getState.called, false);
        assert.equal(states.setState.called, false);
        assert.equal(countOutput.called, false);
    });

    it('unsubscribeForeignStates decrements+deletes the auto-subscribe counter and calls countOutput', async () => {
        const states = statesStub();
        states.getState.resolves({ val: JSON.stringify({ 'pushover.0.x': { 'test.0': 1 } }) });
        const countOutput = sinon.stub();
        const { mgr } = build({ states, countOutput });
        mgr.addSubscribableInstance('pushover.0');
        await mgr.unsubscribeForeignStates('pushover.0.x');
        const setArgs = states.setState.firstCall.args;
        assert.deepEqual(JSON.parse(setArgs[1] as string), {});
        assert.equal(countOutput.calledOnce, true);
        assert.equal(states.unsubscribeUser.calledWith('pushover.0.x'), true);
    });

    it('unsubscribeForeignStates(alias) drops the pattern targets and maybe-drops the alias subscription', async () => {
        const alias = aliasStub();
        const states = statesStub();
        const { mgr } = build({ states, alias });
        await mgr.unsubscribeForeignStates('alias.0.x');
        assert.equal(alias.deletePattern.calledWith('alias.0.x'), true);
        assert.equal(alias.removeTargetsForPattern.calledWith('alias.0.x'), true);
        assert.equal(alias.maybeDropAliasObjectSubscription.called, true);
        assert.equal(states.unsubscribeUser.called, false);
    });

    it('unsubscribeForeignStates treats an empty pattern as "*" (legacy default)', async () => {
        const states = statesStub();
        const { mgr } = build({ states });
        await mgr.unsubscribeForeignStates('');
        assert.equal(states.unsubscribeUser.calledWith('*'), true);
    });

    it('unsubscribeForeignStates defaults each empty array element to "*"', async () => {
        const states = statesStub();
        const { mgr } = build({ states });
        await mgr.unsubscribeForeignStates(['', 'foo.0.x']);
        assert.equal(states.unsubscribeUser.calledWith('*'), true);
        assert.equal(states.unsubscribeUser.calledWith('foo.0.x'), true);
    });

    it('autoSubscribeOn is a no-op (preserved dead guard)', async () => {
        const objects = {
            getObjectViewAsync: sinon.stub().resolves({ rows: [] }),
            subscribeAsync: sinon.stub().resolves(),
        };
        const objectAccess = objectAccessStub();
        const { mgr } = build({ objects, objectAccess });
        await mgr.autoSubscribeOn();
        assert.equal(objects.getObjectViewAsync.called, false);
        assert.equal(objects.subscribeAsync.called, false);
        assert.equal(objectAccess.getForeignStateObjects.called, false);
    });

    it('subscribeForeignStates rejects with ERROR_DB_CLOSED when states DB down', async () => {
        const mgr = new SubscriptionManager(
            makeContext({ states: null, objects: {} as any }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await assert.rejects(() => mgr.subscribeForeignStates('foo.0.x'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('subscribeForeignStates rejects with ERROR_DB_CLOSED when objects DB down', async () => {
        const mgr = new SubscriptionManager(
            makeContext({ states: statesStub() as any, objects: null }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await assert.rejects(() => mgr.subscribeForeignStates('foo.0.x'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('unsubscribeForeignStates rejects with ERROR_DB_CLOSED when states DB down', async () => {
        const mgr = new SubscriptionManager(
            makeContext({ states: null }),
            fixId,
            aliasStub() as any,
            objectAccessStub(),
        );
        await assert.rejects(() => mgr.unsubscribeForeignStates('foo.0.x'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });
});
