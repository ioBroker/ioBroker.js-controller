import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
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
        // the name is the key of the map, the values are not the only thing a stranger chooses
        addHost(discovery, makeService({ fqdn: `${'x'.repeat(500)}._iobroker._tcp.local` }));

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

    it('reports a change of every published field, but not a mere re-announcement', async () => {
        const discovery = makeDiscovery();
        const notify = sinon.spy(discovery as any, 'notifyChange');

        try {
            addHost(discovery, makeService());
            addHost(discovery, makeService());
            assert.strictEqual(notify.callCount, 1, 'only lastSeen differs');

            addHost(discovery, makeService({ txt: { v: '8.0.0' } }));
            addHost(discovery, makeService({ port: 50006 }));
            addHost(discovery, makeService({ txt: { host: 'renamed' } }));
            assert.strictEqual(notify.callCount, 4, 'the Admin would show the old version, port or name');
        } finally {
            await discovery.close();
        }
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

describe('lib/hostDiscovery: our own announcement', () => {
    it('is not listed when it comes back under our own name', () => {
        const discovery = makeDiscovery();
        (discovery as any).ownFqdn = 'ioBroker myhost._iobroker._tcp.local';

        addHost(discovery, makeService({ fqdn: 'ioBroker myhost._iobroker._tcp.local' }));

        assert.strictEqual(discovery.getHosts().length, 0);
    });

    it('is not listed when it comes back on a second interface under another name', () => {
        const discovery = makeDiscovery();
        (discovery as any).announced = { uuid: '0123456789abcdef', unclaimed: true, master: false };

        addHost(discovery, makeService({ fqdn: 'ioBroker myhost (2)._iobroker._tcp.local', txt: { host: 'myhost' } }));
        assert.strictEqual(discovery.getHosts().length, 0, 'own uuid and own hostname');

        addHost(discovery, makeService({ fqdn: 'other._iobroker._tcp.local', txt: { host: 'other' } }));
        assert.strictEqual(discovery.getHosts().length, 1, 'the same uuid with another hostname is another host');
    });
});

describe('lib/hostDiscovery: the announcement is only re-published on a change', () => {
    /**
     * A responder that only counts what is published
     *
     * @returns the responder and the published TXT records
     */
    function fakeResponder(): { responder: any; published: Record<string, string>[]; names: string[] } {
        const published: Record<string, string>[] = [];
        const names: string[] = [];
        const responder = {
            publish: (options: { name: string; txt: Record<string, string> }) => {
                published.push(options.txt);
                names.push(options.name);
                return {
                    fqdn: `own-${published.length}._iobroker._tcp.local`,
                    name: 'ioBroker myhost',
                    stop: () => {},
                };
            },
            find: () => ({ on: () => {}, stop: () => {}, update: () => {} }),
            destroy: (callback: () => void) => callback(),
        };
        return { responder, published, names };
    }

    it('publishes under a name that two hosts called the same do not share', async () => {
        const discovery = makeDiscovery();
        const { responder, names } = fakeResponder();
        (discovery as any).responderPromise = Promise.resolve(responder);

        try {
            await discovery.announce({ uuid: '0123456789abcdef', unclaimed: true, master: false });
            // bonjour-service gives up on a taken name instead of renaming, so the second device
            // flashed from the same image would never be found
            assert.match(names[0], /^ioBroker myhost [0-9a-f]{6}$/);
        } finally {
            await discovery.close();
        }
    });

    it('publishes once for the same information, and again when it changed', async () => {
        const discovery = makeDiscovery();
        const { responder, published } = fakeResponder();
        (discovery as any).responderPromise = Promise.resolve(responder);

        try {
            const info = { uuid: '0123456789abcdef', unclaimed: true, master: false };
            await discovery.announce(info);
            await discovery.announce({ ...info });
            assert.strictEqual(published.length, 1, 'a re-publish reads as "gone and back" for every master');

            await discovery.announce({ ...info, unclaimed: false });
            assert.strictEqual(published.length, 2);
            assert.strictEqual(published[1].unclaimed, '0');
        } finally {
            await discovery.close();
        }
    });
});

describe('lib/hostDiscovery: a failed bind of UDP 5353 does not end the controller', () => {
    /**
     * A responder laid out like the one of `bonjour-service`, with the `multicast-dns` emitter inside
     *
     * @returns the responder, its socket and whether it was destroyed
     */
    function bonjourLikeResponder(): { responder: any; socket: EventEmitter; destroyed: () => boolean } {
        const socket = new EventEmitter();
        let destroyed = false;
        const responder = {
            server: { mdns: socket },
            publish: () => ({ fqdn: 'own._iobroker._tcp.local', name: 'ioBroker myhost', stop: () => {} }),
            find: () => ({ on: () => {}, stop: () => {}, update: () => {} }),
            destroy: (callback?: () => void) => {
                destroyed = true;
                callback?.();
            },
        };
        return { responder, socket, destroyed: () => destroyed };
    }

    it('switches mDNS off when the socket reports EADDRINUSE', async () => {
        const discovery = makeDiscovery();
        const { responder, socket, destroyed } = bonjourLikeResponder();
        (discovery as any).responder = (discovery as any).watchSocket(responder);
        (discovery as any).responderPromise = Promise.resolve(responder);

        const err = Object.assign(new Error('bind EADDRINUSE 0.0.0.0:5353'), { code: 'EADDRINUSE' });
        // without a listener, EventEmitter throws on `error` - and multicast-dns emits it twice
        socket.emit('error', err);
        socket.emit('error', err);
        await new Promise(resolve => setImmediate(resolve));

        assert.strictEqual(discovery.isAvailable(), false);
        assert.strictEqual(destroyed(), true, 'the socket is released');

        // from here on everything is a no-op instead of publishing on a dead socket
        const publish = sinon.spy(responder, 'publish');
        await discovery.announce({ uuid: '0123456789abcdef', unclaimed: true, master: false });
        assert.strictEqual(publish.callCount, 0);
    });

    it('does not use a version of the package whose socket it cannot watch', () => {
        const discovery = makeDiscovery();
        const { responder, destroyed } = bonjourLikeResponder();
        delete responder.server;

        assert.strictEqual((discovery as any).watchSocket(responder), null);
        assert.strictEqual(discovery.isAvailable(), false);
        assert.strictEqual(destroyed(), true);
    });
});
