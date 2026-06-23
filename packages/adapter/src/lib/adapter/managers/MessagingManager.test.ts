import assert from 'node:assert/strict';
import { MessagingManager, type MessagingManagerDeps } from './MessagingManager.js';

function makeDeps(over: Partial<MessagingManagerDeps> = {}): MessagingManagerDeps {
    return {
        namespace: 'test.0',
        namespaceLog: 'test.0',
        logger: { silly() {}, debug() {}, info() {}, warn() {}, error() {} } as any,
        uiMessagingController: {} as any,
        getStates: () => null,
        getObjects: () => null,
        getCommon: () => undefined,
        ...over,
    };
}

describe('MessagingManager', () => {
    it('constructs with injected deps', () => {
        const mgr = new MessagingManager(makeDeps());
        assert.ok(mgr instanceof MessagingManager);
    });
});
