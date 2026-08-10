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

describe('SubscriptionManager object subs', () => {
    it('subscribeForeignObjects delegates verbatim to subscribeUserAsync', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await mgr.subscribeForeignObjects('foo.*', { user: 'system.user.x' } as any);
        assert.equal(objects.subscribeUserAsync.firstCall.args[0], 'foo.*');
    });

    it('subscribeObjects fixes a non-foreign pattern and namespaces "*"', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await mgr.subscribeObjects('chan.*');
        assert.equal(objects.subscribeUserAsync.firstCall.args[0], 'test.0.chan.*');
        await mgr.subscribeObjects('*');
        assert.equal(objects.subscribeUserAsync.secondCall.args[0], 'test.0.*');
    });

    it('subscribeObjects passes an array pattern through unfixed', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await mgr.subscribeObjects(['chan.*', 'other.*']);
        assert.deepEqual(objects.subscribeUserAsync.firstCall.args[0], ['chan.*', 'other.*']);
    });

    it('subscribeObjects calls fixId with isPattern=true', async () => {
        const objects = objStub();
        const fixIdSpy = sinon.stub().callsFake((id: string) => `test.0.${id}`);
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixIdSpy);
        await mgr.subscribeObjects('chan.*');
        assert.deepEqual(fixIdSpy.firstCall.args, ['chan.*', true]);
    });

    it('subscribeObjects/subscribeForeignObjects forward options to subscribeUserAsync', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        const options = { user: 'system.user.x' } as any;
        await mgr.subscribeObjects('chan.*', options);
        assert.equal(objects.subscribeUserAsync.firstCall.args[1], options);
        await mgr.subscribeForeignObjects('foo.*', options);
        assert.equal(objects.subscribeUserAsync.secondCall.args[1], options);
    });

    it('subscribeForeignObjects forwards null options when omitted', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await mgr.subscribeForeignObjects('foo.*');
        assert.equal(objects.subscribeUserAsync.firstCall.args[1], null);
    });

    it('unsubscribeObjects fixes a non-foreign pattern and namespaces "*"', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await mgr.unsubscribeObjects('chan.*');
        assert.equal(objects.unsubscribeUserAsync.firstCall.args[0], 'test.0.chan.*');
        await mgr.unsubscribeObjects('*');
        assert.equal(objects.unsubscribeUserAsync.secondCall.args[0], 'test.0.*');
    });

    it('unsubscribeObjects passes an array pattern through unfixed', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await mgr.unsubscribeObjects(['chan.*']);
        assert.deepEqual(objects.unsubscribeUserAsync.firstCall.args[0], ['chan.*']);
    });

    it('unsubscribeForeignObjects defaults pattern to "*"', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await mgr.unsubscribeForeignObjects(undefined as any);
        assert.equal(objects.unsubscribeUserAsync.firstCall.args[0], '*');
    });

    it('unsubscribeForeignObjects forwards options to unsubscribeUserAsync', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        const options = { user: 'system.user.x' } as any;
        await mgr.unsubscribeForeignObjects('foo.*', options);
        assert.equal(objects.unsubscribeUserAsync.firstCall.args[1], options);
    });

    it('rejects with ERROR_DB_CLOSED when objects DB down', async () => {
        const mgr = new SubscriptionManager(makeContext({ objects: null }), fixId);
        await assert.rejects(() => mgr.subscribeForeignObjects('foo.*'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('unsubscribeObjects rejects with ERROR_DB_CLOSED when objects DB down', async () => {
        const mgr = new SubscriptionManager(makeContext({ objects: null }), fixId);
        await assert.rejects(() => mgr.unsubscribeObjects('foo.*'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('rejects when subscribeUserAsync rejects', async () => {
        const objects = objStub();
        objects.subscribeUserAsync.rejects(new Error('boom'));
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await assert.rejects(() => mgr.subscribeForeignObjects('foo.*'), /boom/);
    });

    it('rejects when unsubscribeUserAsync rejects', async () => {
        const objects = objStub();
        objects.unsubscribeUserAsync.rejects(new Error('boom'));
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await assert.rejects(() => mgr.unsubscribeObjects('foo.*'), /boom/);
    });
});

describe('SubscriptionManager file subs', () => {
    it('subscribeForeignFiles delegates to subscribeUserFile', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await mgr.subscribeForeignFiles('vis.0', '*');
        assert.deepEqual(objects.subscribeUserFile.firstCall.args.slice(0, 2), ['vis.0', '*']);
    });

    it('unsubscribeForeignFiles defaults pattern to "*"', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await mgr.unsubscribeForeignFiles('vis.0', undefined as any);
        assert.equal(objects.unsubscribeUserFile.firstCall.args[1], '*');
    });

    it('subscribeForeignFiles/unsubscribeForeignFiles forward options', async () => {
        const objects = objStub();
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        const options = { user: 'system.user.x' } as any;
        await mgr.subscribeForeignFiles('vis.0', '*', options);
        assert.equal(objects.subscribeUserFile.firstCall.args[2], options);
        await mgr.unsubscribeForeignFiles('vis.0', '*', options);
        assert.equal(objects.unsubscribeUserFile.firstCall.args[2], options);
    });

    it('throws ERROR_DB_CLOSED when objects DB down', async () => {
        const mgr = new SubscriptionManager(makeContext({ objects: null }), fixId);
        await assert.rejects(() => mgr.subscribeForeignFiles('vis.0', '*'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('unsubscribeForeignFiles throws ERROR_DB_CLOSED when objects DB down', async () => {
        const mgr = new SubscriptionManager(makeContext({ objects: null }), fixId);
        await assert.rejects(() => mgr.unsubscribeForeignFiles('vis.0', '*'), new RegExp(tools.ERRORS.ERROR_DB_CLOSED));
    });

    it('rejects when subscribeUserFile rejects', async () => {
        const objects = objStub();
        objects.subscribeUserFile.rejects(new Error('boom'));
        const mgr = new SubscriptionManager(makeContext({ objects: objects as any }), fixId);
        await assert.rejects(() => mgr.subscribeForeignFiles('vis.0', '*'), /boom/);
    });
});
