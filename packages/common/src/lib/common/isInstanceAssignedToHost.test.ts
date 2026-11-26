import assert from 'node:assert/strict';
import { tools } from '@iobroker/js-controller-common-db';

/**
 * Build an instance object with the given host
 *
 * @param host value of common.host
 */
function instanceWithHost(host: string | null | undefined): ioBroker.InstanceObject {
    return { _id: 'system.adapter.hm-rpc.0', type: 'instance', common: { name: 'hm-rpc', host } } as any;
}

describe('tools.isInstanceAssignedToHost', () => {
    it('is true for an instance assigned to the hostname', () => {
        assert.equal(tools.isInstanceAssignedToHost(instanceWithHost('testhost'), 'testhost'), true);
    });

    it('is false for an instance assigned to another host', () => {
        assert.equal(tools.isInstanceAssignedToHost(instanceWithHost('otherhost'), 'testhost'), false);
    });

    it('is false for an instance assigned to an IP address', () => {
        assert.equal(tools.isInstanceAssignedToHost(instanceWithHost('192.168.0.2'), 'testhost'), false);
    });

    it('is false for an instance with an empty host', () => {
        assert.equal(tools.isInstanceAssignedToHost(instanceWithHost(''), 'testhost'), false);
        assert.equal(tools.isInstanceAssignedToHost(instanceWithHost(null), 'testhost'), false);
        assert.equal(tools.isInstanceAssignedToHost(instanceWithHost(undefined), 'testhost'), false);
    });

    it('is false for an empty hostname or a missing instance', () => {
        assert.equal(tools.isInstanceAssignedToHost(instanceWithHost(''), ''), false);
        assert.equal(tools.isInstanceAssignedToHost(null, 'testhost'), false);
        assert.equal(tools.isInstanceAssignedToHost({} as any, 'testhost'), false);
    });
});
