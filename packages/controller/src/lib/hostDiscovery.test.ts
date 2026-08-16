import assert from 'node:assert/strict';
import sinon from 'sinon';
import { DISCOVERY_PROTOCOL_VERSION, HostDiscovery, type DiscoveredHost } from './hostDiscovery.js';

/**
 * The tests drive `addHost`, `removeHost` and `expire` directly with hand-written service objects.
 * That is the whole point: these are the parts that decide what a stranger on the network can put
 * into the list the Admin shows, and none of them needs an mDNS responder to be exercised.
 */

const silentLogger = {
    silly: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
} as any;

/**
 * A well-formed announcement of another ioBroker host.
 *
 * @param over Fields to replace; a `txt` object is merged into the default TXT record
 */
function makeService(over: Record<string, any> = {}): any {
    const { txt, ...rest } = over;
    return {
        fqdn: 'other._iobroker._tcp.local',
        name: 'other',
        port: 50005,
        addresses: ['192.168.1.42'],
        txt: {
            proto: DISCOVERY_PROTOCOL_VERSION,
            uuid: '0123456789abcdef',
            host: 'other',
            unclaimed: '1',
            master: '0',
            v: '7.3.0',
            ...txt,
        },
        stop: () => {},
        ...rest,
    };
}

function makeDiscovery(onChange?: (hosts: DiscoveredHost[]) => void): HostDiscovery {
    return new HostDiscovery({
        hostname: 'myhost',
        logger: silentLogger,
        logPrefix: 'host.myhost',
        version: '7.3.0',
        onChange,
    });
}

/**
 * `addHost` and the map behind it are private - reaching in is deliberate, see the note on top.
 *
 * @param discovery The instance under test
 * @param service The announcement to feed it
 */
const addHost = (discovery: HostDiscovery, service: any): void => (discovery as any).addHost(service);

/**
 * The internal map, to assert on keys rather than on the sorted public list.
 *
 * @param discovery The instance under test
 */
const hostsOf = (discovery: HostDiscovery): Map<string, DiscoveredHost> => (discovery as any).hosts;

describe('lib/hostDiscovery: addHost accepts only our own announcements', () => {
    it('takes a well-formed announcement', () => {
        const discovery = makeDiscovery();
        addHost(discovery, makeService());

        const hosts = discovery.getHosts();
        assert.strictEqual(hosts.length, 1);
        assert.deepStrictEqual(
            { ...hosts[0], lastSeen: 0 },
            {
                uuid: '0123456789abcdef',
                hostname: 'other',
                ip: '192.168.1.42',
                port: 50005,
                unclaimed: true,
                master: false,
                version: '7.3.0',
                lastSeen: 0,
            },
        );
    });

    it('drops an announcement without our protocol version', () => {
        const discovery = makeDiscovery();
        addHost(discovery, makeService({ txt: { proto: undefined } }));
        addHost(discovery, makeService({ txt: { proto: '99' }, fqdn: 'b._iobroker._tcp.local' }));

        assert.deepStrictEqual(discovery.getHosts(), []);
    });

    it('drops an announcement without a plausible uuid', () => {
        const discovery = makeDiscovery();
        addHost(discovery, makeService({ txt: { uuid: undefined } }));
        addHost(discovery, makeService({ txt: { uuid: 'short' }, fqdn: 'b._iobroker._tcp.local' }));
        addHost(discovery, makeService({ txt: { uuid: 'not a uuid at all!!' }, fqdn: 'c._iobroker._tcp.local' }));

        assert.deepStrictEqual(discovery.getHosts(), []);
    });

    it('drops attacker-length strings', () => {
        const discovery = makeDiscovery();
        addHost(discovery, makeService({ txt: { host: 'x'.repeat(500) } }));
        addHost(discovery, makeService({ txt: { v: 'x'.repeat(500) }, fqdn: 'b._iobroker._tcp.local' }));

        assert.deepStrictEqual(discovery.getHosts(), []);
    });

    it('drops an announcement without an IPv4 address', () => {
        const discovery = makeDiscovery();
        addHost(discovery, makeService({ addresses: [] }));
        addHost(discovery, makeService({ addresses: ['fe80::1'], fqdn: 'b._iobroker._tcp.local' }));

        assert.deepStrictEqual(discovery.getHosts(), []);
    });

    it('refreshes an entry instead of duplicating it', () => {
        const discovery = makeDiscovery();
        addHost(discovery, makeService());
        addHost(discovery, makeService({ txt: { unclaimed: '0' } }));

        const hosts = discovery.getHosts();
        assert.strictEqual(hosts.length, 1);
        assert.strictEqual(hosts[0].unclaimed, false);
    });
});

describe('lib/hostDiscovery: the list is bounded', () => {
    it('drops the entry that was not heard from for the longest time', () => {
        const clock = sinon.useFakeTimers({ now: 1_700_000_000_000, toFake: ['Date'] });
        try {
            const discovery = makeDiscovery();

            // the very first one is also the oldest
            addHost(discovery, makeService({ fqdn: 'first._iobroker._tcp.local', name: 'first' }));

            for (let i = 1; i < 200; i++) {
                clock.tick(10);
                addHost(discovery, makeService({ fqdn: `host${i}._iobroker._tcp.local`, name: `host${i}` }));
            }
            assert.strictEqual(hostsOf(discovery).size, 200);

            clock.tick(10);
            addHost(discovery, makeService({ fqdn: 'newcomer._iobroker._tcp.local', name: 'newcomer' }));

            assert.strictEqual(hostsOf(discovery).size, 200);
            assert.ok(!hostsOf(discovery).has('first._iobroker._tcp.local'), 'the oldest entry should be gone');
            assert.ok(hostsOf(discovery).has('newcomer._iobroker._tcp.local'));
        } finally {
            clock.restore();
        }
    });
});

describe('lib/hostDiscovery: change notifications are debounced', () => {
    it('reports many announcements as one change', async () => {
        const clock = sinon.useFakeTimers({ now: 1_700_000_000_000, toFake: ['Date', 'setTimeout', 'clearTimeout'] });
        try {
            const onChange = sinon.stub();
            const discovery = makeDiscovery(onChange);

            for (let i = 0; i < 50; i++) {
                addHost(discovery, makeService({ fqdn: `host${i}._iobroker._tcp.local`, name: `host${i}` }));
            }

            assert.strictEqual(onChange.callCount, 0, 'nothing should be reported before the debounce elapsed');

            await clock.tickAsync(2_000);

            assert.strictEqual(onChange.callCount, 1);
            assert.strictEqual(onChange.firstCall.args[0].length, 50);
        } finally {
            clock.restore();
        }
    });

    it('reports again after the window closed', async () => {
        const clock = sinon.useFakeTimers({ now: 1_700_000_000_000, toFake: ['Date', 'setTimeout', 'clearTimeout'] });
        try {
            const onChange = sinon.stub();
            const discovery = makeDiscovery(onChange);

            addHost(discovery, makeService({ fqdn: 'a._iobroker._tcp.local', name: 'a' }));
            await clock.tickAsync(2_000);

            addHost(discovery, makeService({ fqdn: 'b._iobroker._tcp.local', name: 'b' }));
            await clock.tickAsync(2_000);

            assert.strictEqual(onChange.callCount, 2);
        } finally {
            clock.restore();
        }
    });
});

describe('lib/hostDiscovery: entries are removed', () => {
    it('removeHost drops the entry of a goodbye', () => {
        const discovery = makeDiscovery();
        addHost(discovery, makeService());
        assert.strictEqual(discovery.getHosts().length, 1);

        (discovery as any).removeHost(makeService());
        assert.deepStrictEqual(discovery.getHosts(), []);
    });

    it('expire drops what was not seen within the TTL', () => {
        const clock = sinon.useFakeTimers({ now: 1_700_000_000_000, toFake: ['Date'] });
        try {
            const discovery = makeDiscovery();
            addHost(discovery, makeService({ fqdn: 'old._iobroker._tcp.local', name: 'old' }));

            clock.tick(4 * 60_000);
            addHost(discovery, makeService({ fqdn: 'fresh._iobroker._tcp.local', name: 'fresh' }));

            clock.tick(2 * 60_000); // "old" is now 6 minutes untouched, "fresh" 2
            (discovery as any).expire();

            assert.deepStrictEqual(
                discovery.getHosts().map(host => host.hostname),
                ['other'],
            );
            assert.ok(hostsOf(discovery).has('fresh._iobroker._tcp.local'));
        } finally {
            clock.restore();
        }
    });
});
