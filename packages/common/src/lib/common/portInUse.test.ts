import assert from 'node:assert/strict';
import net from 'node:net';
import { describePortInUse, getPortInUse } from './portInUse.js';

/**
 * Build a registry entry of a TCP port
 *
 * @param instance the instance that registered the port
 * @param port the port number
 * @param isBlocked whether the instance is running
 * @param bind the bind address, if any
 */
function tcp(instance: string, port: number, isBlocked: boolean, bind?: string): ioBroker.RegisteredResource {
    return { type: 'tcpPort', data: bind ? { port, bind } : { port }, instance, ts: 1, isBlocked };
}

describe('portInUse', () => {
    describe('getPortInUse', () => {
        it('reads port, address and protocol of a real EADDRINUSE', async () => {
            const first = net.createServer();
            await new Promise<void>(resolve => first.listen(0, '127.0.0.1', resolve));
            const { port } = first.address() as net.AddressInfo;

            const second = net.createServer();
            const err = await new Promise<Error>(resolve => {
                second.once('error', resolve);
                second.listen(port, '127.0.0.1');
            });
            await new Promise(resolve => first.close(resolve));

            assert.deepEqual(getPortInUse(err), { port, protocol: 'tcp', address: '127.0.0.1' });
        });

        it('takes a failed bind for UDP', () => {
            const err = Object.assign(new Error('bind EADDRINUSE 0.0.0.0:50005'), {
                code: 'EADDRINUSE',
                syscall: 'bind',
                port: 50005,
                address: '0.0.0.0',
            });
            assert.deepEqual(getPortInUse(err), { port: 50005, protocol: 'udp', address: '0.0.0.0' });
        });

        it('ignores other errors and EADDRINUSE without a port', () => {
            assert.equal(getPortInUse(new Error('listen EADDRINUSE')), undefined);
            assert.equal(getPortInUse(Object.assign(new Error('x'), { code: 'EACCES', port: 80 })), undefined);
            assert.equal(
                getPortInUse(Object.assign(new Error('x'), { code: 'EADDRINUSE', address: '/tmp/s.sock' })),
                undefined,
            );
            assert.equal(getPortInUse(undefined), undefined);
            assert.equal(getPortInUse('EADDRINUSE'), undefined);
        });
    });

    describe('describePortInUse', () => {
        const portInUse = { port: 8081, protocol: 'tcp' as const };

        it('names the running instances that hold the port', () => {
            const text = describePortInUse({
                portInUse,
                resources: [tcp('admin.0', 8081, true), tcp('web.0', 8082, true), tcp('web.1', 8081, true)],
                instance: 'web.2',
            });
            assert.equal(text, 'TCP port 8081 is used by admin.0, web.1 on this host');
        });

        it('says another program holds it when no running instance does', () => {
            const text = describePortInUse({
                portInUse,
                resources: [tcp('admin.0', 8081, false), tcp('web.0', 8082, true)],
                instance: 'web.2',
            });
            assert.equal(
                text,
                'TCP port 8081 is not used by a running instance of this host, so another program holds it',
            );
        });

        it('never names the failing instance itself', () => {
            const text = describePortInUse({ portInUse, resources: [tcp('web.2', 8081, true)], instance: 'web.2' });
            assert.match(text, /another program holds it$/);
        });

        it('does not take a UDP entry for a TCP port', () => {
            const text = describePortInUse({
                portInUse,
                resources: [{ type: 'udpPort', data: { port: 8081 }, instance: 'mdns.0', ts: 1, isBlocked: true }],
            });
            assert.match(text, /another program holds it$/);
        });

        it('only counts bind addresses that can collide', () => {
            const resources = [
                tcp('admin.0', 8081, true, '127.0.0.1'),
                tcp('web.0', 8081, true, '0.0.0.0'),
                tcp('web.1', 8081, true, '192.168.1.5'),
            ];
            assert.equal(
                describePortInUse({ portInUse: { ...portInUse, address: '192.168.1.5' }, resources }),
                'TCP port 8081 is used by web.0, web.1 on this host',
            );
            assert.equal(
                describePortInUse({ portInUse: { ...portInUse, address: '::' }, resources }),
                'TCP port 8081 is used by admin.0, web.0, web.1 on this host',
            );
        });
    });
});
