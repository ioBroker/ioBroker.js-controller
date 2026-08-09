import assert from 'node:assert/strict';
import sinon from 'sinon';
import { AliasManager } from './AliasManager.js';
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

const validateId = (): void => undefined; // no-op validator for tests

function aliasObj(id: string, readSource: string): any {
    return {
        _id: id,
        type: 'state',
        common: { alias: { id: readSource }, type: 'number', min: 0, max: 100, unit: '%' },
    } as any;
}

describe('AliasManager.addAliasSubscribe', () => {
    it('creates the entry, subscribes source state + reads source object once', async () => {
        const subscribe = sinon.stub().resolves();
        const getObject = sinon
            .stub()
            .resolves({ _id: 'x.0.src', common: { min: 0, max: 10, type: 'number', unit: 'K' } });
        const mgr = new AliasManager(
            makeContext({ states: { subscribe } as any, objects: { getObject } as any }),
            validateId,
        );

        await mgr.addAliasSubscribe(aliasObj('alias.0.a', 'x.0.src'), 'alias.0.*');
        assert.equal(mgr.hasSource('x.0.src'), true);
        assert.equal(subscribe.calledOnceWith('x.0.src'), true);

        await mgr.addAliasSubscribe(aliasObj('alias.0.b', 'x.0.src'), 'alias.0.*');
        assert.equal(subscribe.calledOnce, true); // reused entry, no second subscribe
        assert.equal(getObject.calledOnce, true); // source resolved once
    });

    it('does not write source onto an entry deleted during the awaits (has-recheck)', async () => {
        const subscribe = sinon.stub().resolves();
        // getObject resolves AFTER we delete the entry to simulate an interleaved remove
        const mgr = new AliasManager(
            makeContext({
                states: { subscribe, unsubscribe: sinon.stub().resolves() } as any,
                objects: {
                    getObject: async () => {
                        await mgr.removeAliasSubscribe('x.0.src', 0); // interleave: drop the entry
                        return { _id: 'x.0.src', common: { min: 1 } };
                    },
                } as any,
            }),
            validateId,
        );
        await mgr.addAliasSubscribe(aliasObj('alias.0.a', 'x.0.src'), 'p');
        // entry was deleted mid-populate; must not resurrect with a source
        assert.equal(mgr.hasSource('x.0.src'), false);
    });

    it('ignores non-state alias objects without subscribing', async () => {
        const subscribe = sinon.stub().resolves();
        const mgr = new AliasManager(makeContext({ states: { subscribe } as any }), validateId);

        const channelObj = { _id: 'alias.0.a', type: 'channel', common: {} } as any;
        await mgr.addAliasSubscribe(channelObj, 'p');
        assert.equal(mgr.size, 0);
        assert.equal(subscribe.called, false);
    });

    it('throws and does not create an entry when common.alias.id is missing', async () => {
        const subscribe = sinon.stub().resolves();
        const mgr = new AliasManager(makeContext({ states: { subscribe } as any }), validateId);

        const noAlias = { _id: 'alias.0.a', type: 'state', common: {} } as any;
        await assert.rejects(mgr.addAliasSubscribe(noAlias, 'p'), /has no target/);
        assert.equal(mgr.size, 0);
        assert.equal(subscribe.called, false);
    });
});

describe('AliasManager.removeAliasSubscribe', () => {
    it('splices one target and unsubscribes + drops entry when empty', async () => {
        const subscribe = sinon.stub().resolves();
        const unsubscribe = sinon.stub().resolves();
        const getObject = sinon.stub().resolves({ _id: 'x.0.src', common: {} });
        const mgr = new AliasManager(
            makeContext({ states: { subscribe, unsubscribe } as any, objects: { getObject } as any }),
            validateId,
        );
        await mgr.addAliasSubscribe(aliasObj('alias.0.a', 'x.0.src'), 'p');
        await mgr.removeAliasSubscribe('x.0.src', 0);
        assert.equal(mgr.hasSource('x.0.src'), false);
        assert.equal(unsubscribe.calledOnceWith('x.0.src'), true);
    });
});

describe('AliasManager.resolveSourceChange', () => {
    it('is synchronous and returns one transformed entry per unique target', async () => {
        const getObject = sinon.stub().resolves({ _id: 'x.0.src', common: { type: 'number' } });
        const mgr = new AliasManager(
            makeContext({ states: { subscribe: sinon.stub().resolves() } as any, objects: { getObject } as any }),
            validateId,
        );
        await mgr.addAliasSubscribe(aliasObj('alias.0.a', 'x.0.src'), 'p');

        const out = mgr.resolveSourceChange('x.0.src', { val: 5, ack: true } as any);
        assert.equal(Array.isArray(out), true); // synchronous: a plain array, not a Promise
        assert.equal(out instanceof Promise, false);
        assert.equal(out.length, 1);
        assert.equal(out[0].targetId, 'alias.0.a');
    });

    it('returns null-state entries when the source state is null', async () => {
        const getObject = sinon.stub().resolves({ _id: 'x.0.src', common: {} });
        const mgr = new AliasManager(
            makeContext({ states: { subscribe: sinon.stub().resolves() } as any, objects: { getObject } as any }),
            validateId,
        );
        await mgr.addAliasSubscribe(aliasObj('alias.0.a', 'x.0.src'), 'p');
        const out = mgr.resolveSourceChange('x.0.src', null);
        assert.equal(out.length, 1);
        assert.equal(out[0].state, null);
    });

    it('returns empty for an unknown source', () => {
        const mgr = new AliasManager(makeContext(), validateId);
        assert.deepEqual(mgr.resolveSourceChange('nope', { val: 1 } as any), []);
    });
});

describe('AliasManager patterns + object subscription', () => {
    it('add/has/delete pattern and matchesAnyPattern', () => {
        const mgr = new AliasManager(makeContext(), validateId);
        mgr.addPattern('alias.0.*');
        assert.equal(mgr.hasPattern('alias.0.*'), true);
        assert.equal(mgr.matchesAnyPattern('alias.0.foo'), true);
        assert.equal(mgr.matchesAnyPattern('alias.1.foo'), false);
        mgr.deletePattern('alias.0.*');
        assert.equal(mgr.hasPattern('alias.0.*'), false);
    });

    it('subscribes the alias.* object once and drops it when empty', () => {
        const subscribe = sinon.stub().resolves();
        const unsubscribe = sinon.stub().resolves();
        const mgr = new AliasManager(
            makeContext({ objects: { subscribe, unsubscribe } as any, states: {} as any }),
            validateId,
        );
        mgr.ensureAliasObjectSubscription();
        mgr.ensureAliasObjectSubscription();
        assert.equal(subscribe.calledOnce, true);
        mgr.maybeDropAliasObjectSubscription();
        assert.equal(unsubscribe.calledOnceWith('alias.*'), true);
    });
});

describe('AliasManager.handleAliasObjectChange', () => {
    async function withOneAlias(): Promise<{
        mgr: AliasManager;
        subscribe: sinon.SinonStub;
        unsubscribe: sinon.SinonStub;
    }> {
        const subscribe = sinon.stub().resolves();
        const unsubscribe = sinon.stub().resolves();
        const getObject = sinon.stub().resolves({ _id: 'x.0.src', common: { type: 'number' } });
        const mgr = new AliasManager(
            makeContext({ states: { subscribe, unsubscribe } as any, objects: { getObject } as any }),
            validateId,
        );
        mgr.addPattern('alias.0.*');
        await mgr.addAliasSubscribe(aliasObj('alias.0.a', 'x.0.src'), 'alias.0.*');
        return { mgr, subscribe, unsubscribe };
    }

    it('re-points the target when the source id changes (remove old, add new)', async () => {
        const { mgr } = await withOneAlias();
        await mgr.handleAliasObjectChange('alias.0.a', aliasObj('alias.0.a', 'x.0.other'));
        assert.equal(mgr.hasSource('x.0.src'), false);
        assert.equal(mgr.hasSource('x.0.other'), true);
    });

    it('updates target metadata in place when the source id is unchanged', async () => {
        const { mgr } = await withOneAlias();
        const changed = aliasObj('alias.0.a', 'x.0.src');
        changed.common.max = 42;
        await mgr.handleAliasObjectChange('alias.0.a', changed);
        assert.equal(mgr.hasSource('x.0.src'), true); // same source, not re-pointed
    });

    it('removes the target when the alias link is deleted', async () => {
        const { mgr } = await withOneAlias();
        const noLink = { _id: 'alias.0.a', type: 'state', common: { type: 'number' } } as any;
        await mgr.handleAliasObjectChange('alias.0.a', noLink);
        assert.equal(mgr.hasSource('x.0.src'), false);
    });

    it('picks up a brand-new alias that matches a tracked pattern', async () => {
        const { mgr } = await withOneAlias();
        await mgr.handleAliasObjectChange('alias.0.b', aliasObj('alias.0.b', 'x.0.src2'));
        assert.equal(mgr.hasSource('x.0.src2'), true);
    });
});

describe('AliasManager.removeTargetsForPattern', () => {
    it('removes all targets subscribed under the given pattern', async () => {
        const subscribe = sinon.stub().resolves();
        const unsubscribe = sinon.stub().resolves();
        const getObject = sinon.stub().resolves({ _id: 's', common: {} });
        const mgr = new AliasManager(
            makeContext({ states: { subscribe, unsubscribe } as any, objects: { getObject } as any }),
            validateId,
        );
        await mgr.addAliasSubscribe(aliasObj('alias.0.a', 'x.0.s1'), 'alias.0.*');
        await mgr.addAliasSubscribe(aliasObj('alias.0.b', 'x.0.s2'), 'other');
        await mgr.removeTargetsForPattern('alias.0.*');
        assert.equal(mgr.hasSource('x.0.s1'), false);
        assert.equal(mgr.hasSource('x.0.s2'), true); // different pattern, kept
    });
});
