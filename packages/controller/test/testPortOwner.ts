import assert from 'node:assert/strict';
import { portOwner } from '@iobroker/js-controller-common';

const {
    bindAddressesCollide,
    canonicalAddress,
    classifyCommand,
    classifyPortHolders,
    decodeProcNetAddress,
    describeBindPermissionError,
    describePortConflict,
    enrichPortOwnersFromDb,
    enrichmentStateIds,
    findPortHolders,
    instancesOnHost,
    parseLsofFields,
    parseNetstat,
    parseProcNetTable,
    parseSockstat,
    parseTasklistImage,
    resolvePortOwners,
} = portOwner;

/** A fake Linux /proc: socket tables, process list, fd links, command lines */
function fakeProc(): {
    files: Record<string, string>;
    dirs: Record<string, string[]>;
    links: Record<string, string>;
    deps: portOwner.PortOwnerDeps;
} {
    const files: Record<string, string> = {
        // header + LISTEN on 0.0.0.0:1883 (inode 12345, uid 1001) + ESTABLISHED on 1883 (must be ignored)
        // + LISTEN on 127.0.0.1:9000 (inode 777, uid 1001, process not readable) + LISTEN 0.0.0.0:22 (uid 0)
        '/proc/net/tcp': [
            '  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode',
            '   0: 00000000:075B 00000000:0000 0A 00000000:00000000 00:00000000 00000000  1001        0 12345 1 0000000000000000 100 0 0 10 0',
            '   1: 0100007F:075B 0100007F:C3A2 01 00000000:00000000 00:00000000 00000000  1001        0 12399 1 0000000000000000 20 4 30 10 -1',
            '   2: 0100007F:2328 00000000:0000 0A 00000000:00000000 00:00000000 00000000  1001        0 777 1 0000000000000000 100 0 0 10 0',
            '   3: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 555 1 0000000000000000 100 0 0 10 0',
            // bound without listen() — TCP_CLOSE (07), holds the port just the same
            '   4: 00000000:1388 00000000:0000 07 00000000:00000000 00:00000000 00000000  1001        0 12500 1 0000000000000000 100 0 0 10 0',
            // a malformed row (no inode) must neither match nor fold with other malformed rows
            '   5: 00000000:1388 00000000:0000 07 00000000:00000000 00:00000000 00000000  1001        0 garbage',
        ].join('\n'),
        '/proc/net/tcp6': [
            '  sl  local_address                         rem_address                         st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode',
            // LISTEN on [::]:8081 (inode 31337) — the dual-stack default of a Node.js server
            '   0: 00000000000000000000000000000000:1F91 00000000000000000000000000000000:0000 0A 00000000:00000000 00:00000000 00000000  1001        0 31337 1 0000000000000000 100 0 0 10 0',
            // LISTEN on [fe80::1]:8082 (inode 31338) — a link-local address, little-endian words
            '   1: 000080FE000000000000000001000000:1F92 00000000000000000000000000000000:0000 0A 00000000:00000000 00:00000000 00000000  1001        0 31338 1 0000000000000000 100 0 0 10 0',
        ].join('\n'),
        '/proc/net/udp': [
            '   sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode ref pointer drops',
            '  100: 00000000:076C 00000000:0000 07 00000000:00000000 00:00000000 00000000  1001        0 4242 2 0000000000000000 0',
            '  101: 00000000:076C 00000000:0000 07 00000000:00000000 00:00000000 00000000  1001        0 4243 2 0000000000000000 0',
        ].join('\n'),
        '/proc/net/udp6':
            '   sl  local_address                         rem_address                         st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode ref pointer drops\n',
        // cmdline is NUL-separated, NUL-terminated
        '/proc/100/cmdline': 'io.mqtt.0\x00',
        '/proc/300/cmdline': 'io.hueemu.0\x00',
        '/proc/400/cmdline': 'io.web.0\x00',
        '/proc/401/cmdline': 'io.admin.0\x00',
        '/proc/301/cmdline': `${['node', '/opt/iobroker/node_modules/iobroker.fakeroku/main.js', '--instance', '0', '--loglevel', 'info'].join('\x00')}\x00`,
    };
    const dirs: Record<string, string[]> = {
        '/proc': ['1', '100', '200', '300', '301', '400', '401', 'self', 'net'],
        '/proc/1/fd': ['0', '1', '2'],
        '/proc/100/fd': ['0', '1', '2', '20'],
        '/proc/300/fd': ['0', '21'],
        '/proc/301/fd': ['0', '22'],
        '/proc/400/fd': ['0', '30', '31'],
        '/proc/401/fd': ['0', '40'],
        // 200 is not readable (another user / not dumpable)
    };
    const links: Record<string, string> = {
        '/proc/1/fd/0': '/dev/null',
        '/proc/1/fd/1': '/dev/null',
        '/proc/1/fd/2': '/dev/null',
        '/proc/100/fd/0': '/dev/null',
        '/proc/100/fd/1': 'pipe:[1]',
        '/proc/100/fd/2': 'pipe:[2]',
        '/proc/100/fd/20': 'socket:[12345]',
        '/proc/300/fd/0': '/dev/null',
        '/proc/300/fd/21': 'socket:[4242]',
        '/proc/301/fd/0': '/dev/null',
        '/proc/301/fd/22': 'socket:[4243]',
        '/proc/400/fd/0': '/dev/null',
        '/proc/400/fd/30': 'socket:[31337]',
        '/proc/400/fd/31': 'socket:[12500]',
        '/proc/401/fd/0': '/dev/null',
        '/proc/401/fd/40': 'socket:[31338]',
    };
    const deps: portOwner.PortOwnerDeps = {
        platform: 'linux',
        ownPid: 999,
        ownUid: 1001,
        readFile: path => (path in files ? Promise.resolve(files[path]) : Promise.reject(new Error(`ENOENT ${path}`))),
        readdir: path => (path in dirs ? Promise.resolve(dirs[path]) : Promise.reject(new Error(`EACCES ${path}`))),
        readlink: path => (path in links ? Promise.resolve(links[path]) : Promise.reject(new Error(`ENOENT ${path}`))),
        exec: () => Promise.reject(new Error('no commands on this fake linux')),
    };
    return { files, dirs, links, deps };
}

describe('portOwner: who holds a port', () => {
    describe('/proc parsing', () => {
        it('decodes the hex local_address column', () => {
            assert.deepEqual(decodeProcNetAddress('0100007F:1F90'), { address: '127.0.0.1', port: 8080 });
            assert.deepEqual(decodeProcNetAddress('00000000:0050'), { address: '0.0.0.0', port: 80 });
            assert.deepEqual(decodeProcNetAddress('00000000000000000000000000000000:075B'), {
                address: '::',
                port: 1883,
            });
            assert.deepEqual(decodeProcNetAddress('00000000000000000000000001000000:1F90'), {
                address: '0:0:0:0:0:0:0:1',
                port: 8080,
            });
        });

        it('decodes IPv6 addresses, little-endian per 32-bit word', () => {
            assert.deepEqual(decodeProcNetAddress('00000000000000000000000000000000:1F91'), {
                address: '::',
                port: 8081,
            });
            assert.equal(decodeProcNetAddress('000080FE000000000000000001000000:1F92').address, 'fe80:0:0:0:0:0:0:1');
            assert.equal(canonicalAddress('fe80:0:0:0:0:0:0:1'), canonicalAddress('fe80::1'));
        });

        it('skips a malformed row instead of folding it with every other malformed row', () => {
            const rows = parseProcNetTable(fakeProc().files['/proc/net/tcp']);
            assert.deepEqual(
                rows.map(r => r.inode),
                [12345, 12399, 777, 555, 12500],
            );
        });

        it('parses a socket table and keeps state, uid and inode', () => {
            const rows = parseProcNetTable(fakeProc().files['/proc/net/tcp']);
            assert.equal(rows.length, 5);
            assert.deepEqual(rows[0], { localAddress: '0.0.0.0', port: 1883, state: '0A', uid: 1001, inode: 12345 });
            assert.equal(rows[1].state, '01');
            assert.equal(rows[3].uid, 0);
        });
    });

    describe('classifyCommand', () => {
        it('recognises an adapter by its process title or its spawn command line', () => {
            assert.deepEqual(classifyCommand('io.mqtt.0'), { kind: 'instance', instance: 'mqtt.0' });
            assert.deepEqual(
                classifyCommand('node /opt/iobroker/node_modules/iobroker.web/main.js --instance 0 --loglevel info'),
                { kind: 'instance', instance: 'web.0' },
            );
            assert.deepEqual(
                classifyCommand('C:\\ioBroker\\node_modules\\iobroker.hm-rpc\\main.js --instance 2 --loglevel debug'),
                { kind: 'instance', instance: 'hm-rpc.2' },
            );
        });

        it('recognises the controller and its compact mode groups', () => {
            assert.deepEqual(classifyCommand('iobroker.js-controller'), { kind: 'controller' });
            assert.deepEqual(classifyCommand('iobroker.js-controller.compactgroup2'), { kind: 'compact', group: 2 });
            assert.deepEqual(
                classifyCommand('node /opt/iobroker/node_modules/iobroker.js-controller/compactgroupController.js 3'),
                { kind: 'compact', group: 3 },
            );
        });

        it('does not take a program that merely mentions the controller package for the controller', () => {
            assert.deepEqual(
                classifyCommand('tail -f /opt/iobroker/node_modules/iobroker.js-controller/log/iobroker.log'),
                {
                    kind: 'process',
                    name: 'tail',
                },
            );
            assert.deepEqual(classifyCommand('iobroker.js-controller'), { kind: 'controller' });
            assert.deepEqual(classifyCommand('iobroker.js-controller.compactgroup2'), { kind: 'compact', group: 2 });
            assert.deepEqual(
                classifyCommand('/usr/bin/node /opt/iobroker/node_modules/iobroker.js-controller/controller.js'),
                { kind: 'controller' },
            );
        });

        it('names any other program by its basename', () => {
            assert.deepEqual(classifyCommand('/usr/sbin/mosquitto -c /etc/mosquitto/mosquitto.conf'), {
                kind: 'process',
                name: 'mosquitto',
            });
            assert.deepEqual(classifyCommand('node.exe'), { kind: 'process', name: 'node.exe' });
        });
    });

    describe('Linux lookup through /proc', () => {
        it('finds the instance holding a TCP port by its socket inode', async () => {
            const owners = await resolvePortOwners({ port: 1883 }, fakeProc().deps);
            assert.deepEqual(owners, [{ kind: 'instance', instance: 'mqtt.0', pid: 100 }]);
        });

        it('ignores established connections on the same port', async () => {
            const holders = await findPortHolders({ port: 1883 }, fakeProc().deps);
            assert.equal(holders.length, 1);
            assert.equal(holders[0].pid, 100);
        });

        it('reports a socket whose process cannot be entered as foreign, and tells our own uid from another user', async () => {
            // uid 1001 is ours: a process we may not enter — not dumpable, e.g. raised privileges
            assert.deepEqual(await resolvePortOwners({ port: 9000 }, fakeProc().deps), [
                { kind: 'foreign', uid: 1001, sameUser: true },
            ]);
            // uid 0 is another user
            assert.deepEqual(await resolvePortOwners({ port: 22 }, fakeProc().deps), [
                { kind: 'foreign', uid: 0, sameUser: false },
            ]);
        });

        it('names only holders whose bind address collides with the failed bind', async () => {
            // 9000 is bound to 127.0.0.1 only
            assert.deepEqual(await findPortHolders({ port: 9000, address: '192.168.1.5' }, fakeProc().deps), []);
            assert.equal((await findPortHolders({ port: 9000, address: '127.0.0.1' }, fakeProc().deps)).length, 1);
            assert.equal((await findPortHolders({ port: 9000, address: '0.0.0.0' }, fakeProc().deps)).length, 1);
            assert.equal((await findPortHolders({ port: 9000 }, fakeProc().deps)).length, 1);
            // 1883 listens on 0.0.0.0 — it collides with every address
            assert.equal((await findPortHolders({ port: 1883, address: '192.168.1.5' }, fakeProc().deps)).length, 1);
        });

        it('counts a socket that is bound but does not listen as a holder', async () => {
            assert.deepEqual(await resolvePortOwners({ port: 5000 }, fakeProc().deps), [
                { kind: 'instance', instance: 'web.0', pid: 400 },
            ]);
        });

        it('finds IPv6 listeners in tcp6, the dual-stack wildcard and a concrete address', async () => {
            assert.deepEqual(await resolvePortOwners({ port: 8081, address: '::' }, fakeProc().deps), [
                { kind: 'instance', instance: 'web.0', pid: 400 },
            ]);
            // a wildcard listener on [::] collides with a failed IPv4 bind as well
            assert.deepEqual(await resolvePortOwners({ port: 8081, address: '0.0.0.0' }, fakeProc().deps), [
                { kind: 'instance', instance: 'web.0', pid: 400 },
            ]);
            assert.deepEqual(await resolvePortOwners({ port: 8082, address: 'fe80::1' }, fakeProc().deps), [
                { kind: 'instance', instance: 'admin.0', pid: 401 },
            ]);
            assert.deepEqual(await resolvePortOwners({ port: 8082, address: '::1' }, fakeProc().deps), []);
        });

        it('lists every holder of a shared UDP port', async () => {
            const owners = await resolvePortOwners({ port: 1900, protocol: 'udp' }, fakeProc().deps);
            assert.deepEqual(owners, [
                { kind: 'instance', instance: 'hueemu.0', pid: 300 },
                { kind: 'instance', instance: 'fakeroku.0', pid: 301 },
            ]);
        });

        it('recognises its own process', async () => {
            const owners = await resolvePortOwners({ port: 1883 }, { ...fakeProc().deps, ownPid: 100 });
            assert.deepEqual(owners, [{ kind: 'self', pid: 100 }]);
        });

        it('answers with nothing when the port is free or /proc is unavailable', async () => {
            assert.deepEqual(await findPortHolders({ port: 5555 }, fakeProc().deps), []);
            const broken: portOwner.PortOwnerDeps = {
                ...fakeProc().deps,
                readFile: () => Promise.reject(new Error('EACCES')),
            };
            assert.deepEqual(await findPortHolders({ port: 1883 }, broken), []);
        });

        it('gives up after the deadline instead of delaying the error path', async () => {
            const stuck: portOwner.PortOwnerDeps = {
                ...fakeProc().deps,
                readFile: () => new Promise(() => undefined),
                timeoutMs: 30,
            };
            const started = Date.now();
            assert.deepEqual(await findPortHolders({ port: 1883 }, stuck), []);
            // the answer comes with the deadline timer, not with the stuck work — a loaded CI runner may fire
            // that timer late, so this bounds the order of magnitude; that the WORK stops is measured below
            assert.ok(Date.now() - started < 500, `answered after ${Date.now() - started} ms`);
        });

        it('stops the walk at the deadline even when every fd directory is closed to us', async () => {
            // the realistic host: hundreds of processes of other users (or not dumpable) — readdir rejects,
            // the inner fd loop is never entered, only the per-process check can stop the walk. The deadline is
            // measured on an injected clock that every fd directory advances by 2 ms: the walk stops after exactly
            // 20 of them, whatever the wall clock and the timer resolution of the runner do
            const { files, links } = fakeProc();
            const pids = Array.from({ length: 500 }, (_, i) => String(1000 + i));
            let clock = 1_000;
            let fdReads = 0;
            const foreign: portOwner.PortOwnerDeps = {
                platform: 'linux',
                ownPid: 999,
                ownUid: 1001,
                timeoutMs: 40,
                now: () => clock,
                readFile: path => (path in files ? Promise.resolve(files[path]) : Promise.reject(new Error('ENOENT'))),
                readdir: path => {
                    if (path === '/proc') {
                        return Promise.resolve([...pids, '100']);
                    }
                    fdReads++;
                    clock += 2;
                    return new Promise((_, reject) => setImmediate(() => reject(new Error(`EACCES ${path}`))));
                },
                readlink: path => (path in links ? Promise.resolve(links[path]) : Promise.resolve('/dev/null')),
                exec: () => Promise.reject(new Error('no commands')),
            };
            // the socket of port 1883 belongs to our own uid, but the walk never reached its process: the answer says
            // nothing was found — it does not call the unreached socket "not dumpable", which nobody established
            assert.deepEqual(await findPortHolders({ port: 1883 }, foreign), []);
            const readsWhenAnswered = fdReads;
            await new Promise(resolve => setTimeout(resolve, 20));
            assert.equal(readsWhenAnswered, 20, 'fd directories read before the deadline');
            assert.equal(fdReads, readsWhenAnswered, 'fd directories read after the answer');
        });

        it('stops the /proc walk at the deadline instead of scanning on after the caller was answered', async () => {
            const { files, links } = fakeProc();
            // a busy host: the holder sits at the very end of a long process list, every fd directory costs 2 ms of
            // the injected clock — 20 of them fill the 40 ms budget, ~480 processes and the holder are never visited
            const pids = Array.from({ length: 500 }, (_, i) => String(1000 + i));
            let clock = 1_000;
            let fdReads = 0;
            const slow: portOwner.PortOwnerDeps = {
                platform: 'linux',
                ownPid: 999,
                ownUid: 1001,
                timeoutMs: 40,
                now: () => clock,
                readFile: path => (path in files ? Promise.resolve(files[path]) : Promise.reject(new Error('ENOENT'))),
                readdir: path => {
                    if (path === '/proc') {
                        return Promise.resolve([...pids, '100']);
                    }
                    fdReads++;
                    clock += 2;
                    return new Promise(resolve =>
                        setImmediate(() => resolve(path === '/proc/100/fd' ? ['20'] : ['0'])),
                    );
                },
                readlink: path => (path in links ? Promise.resolve(links[path]) : Promise.resolve('/dev/null')),
                exec: () => Promise.reject(new Error('no commands')),
            };
            const holders = await findPortHolders({ port: 1883 }, slow);
            const readsWhenAnswered = fdReads;
            await new Promise(resolve => setTimeout(resolve, 20));
            // the walk stopped itself at the deadline and reported what it had: nothing — no guess for the rest
            assert.deepEqual(holders, []);
            assert.equal(readsWhenAnswered, 20, 'fd directories read before the deadline');
            assert.equal(fdReads, readsWhenAnswered, 'fd directories read after the answer');
        });

        it('keeps the holder it found before the deadline cut the rest of the walk', async () => {
            const { files, links } = fakeProc();
            // the shared UDP port: hueemu.0 (pid 300) sits first in the process list, fakeroku.0 (pid 301) last
            const pids = Array.from({ length: 500 }, (_, i) => String(1000 + i));
            let clock = 1_000;
            let fdReads = 0;
            const cut: portOwner.PortOwnerDeps = {
                platform: 'linux',
                ownPid: 999,
                ownUid: 1001,
                timeoutMs: 40,
                now: () => clock,
                readFile: path => (path in files ? Promise.resolve(files[path]) : Promise.reject(new Error('ENOENT'))),
                readdir: path => {
                    if (path === '/proc') {
                        return Promise.resolve(['300', ...pids, '301']);
                    }
                    fdReads++;
                    clock += 2;
                    return new Promise(resolve =>
                        setImmediate(() => resolve(path === '/proc/300/fd' ? ['21'] : ['0'])),
                    );
                },
                readlink: path => (path in links ? Promise.resolve(links[path]) : Promise.resolve('/dev/null')),
                exec: () => Promise.reject(new Error('no commands')),
            };
            const holders = await findPortHolders({ port: 1900, protocol: 'udp' }, cut);
            // the first holder is reported, the second socket was never reached and gets no guess
            assert.deepEqual(
                holders.map(h => [h.pid, h.command]),
                [[300, 'io.hueemu.0']],
            );
            assert.equal(fdReads, 20, 'fd directories read before the deadline');
        });

        it('hands the caller what the walk had found when the deadline timer answers first', async () => {
            const { files, links } = fakeProc();
            // the walk finds hueemu.0 at once and then hangs on a process whose fd directory never answers —
            // only the timer can answer, and it answers with the holder found so far, not with an empty list
            const stuck: portOwner.PortOwnerDeps = {
                platform: 'linux',
                ownPid: 999,
                ownUid: 1001,
                timeoutMs: 30,
                readFile: path => (path in files ? Promise.resolve(files[path]) : Promise.reject(new Error('ENOENT'))),
                readdir: path => {
                    if (path === '/proc') {
                        return Promise.resolve(['300', '1000', '301']);
                    }
                    return path === '/proc/300/fd'
                        ? new Promise(resolve => setImmediate(() => resolve(['21'])))
                        : new Promise(() => undefined);
                },
                readlink: path => (path in links ? Promise.resolve(links[path]) : Promise.resolve('/dev/null')),
                exec: () => Promise.reject(new Error('no commands')),
            };
            const started = Date.now();
            const holders = await findPortHolders({ port: 1900, protocol: 'udp' }, stuck);
            assert.ok(Date.now() - started < 500, `answered after ${Date.now() - started} ms`);
            assert.deepEqual(
                holders.map(h => [h.pid, h.command]),
                [[300, 'io.hueemu.0']],
            );
        });
    });

    describe('a deadline on macOS and Windows', () => {
        it('names a process lsof found but ps could not identify in time by its pid, never as uninspectable', async () => {
            let clock = 1_000;
            const calls: string[] = [];
            const deps: portOwner.PortOwnerDeps = {
                platform: 'darwin',
                ownPid: 1,
                timeoutMs: 40,
                now: () => clock,
                exec: (file: string) => {
                    calls.push(file);
                    if (file === 'lsof') {
                        clock += 50; // lsof alone used up the budget
                        return Promise.resolve('p4321\ncnode\nu501\nn*:1883\n');
                    }
                    return Promise.resolve('node /opt/iobroker/node_modules/iobroker.mqtt/main.js --instance 0');
                },
            };
            const owners = await resolvePortOwners({ port: 1883 }, deps);
            assert.deepEqual(calls, ['lsof'], 'ps is not started after the deadline');
            // the short name "node" is reported as what it is — not classified as a process outside ioBroker
            assert.deepEqual(owners, [{ kind: 'foreign', pid: 4321, uid: 501, unresolved: true, name: 'node' }]);
            const text = describePortConflict({ port: 1883, owners });
            assert.match(
                text,
                /process 4321 \("node"\) – the lookup reached its deadline before the process was identified/,
            );
            assert.doesNotMatch(text, /cannot be inspected|not an ioBroker instance/);
        });

        it('names a process netstat found but tasklist could not identify in time by its pid', async () => {
            let clock = 1_000;
            const calls: string[] = [];
            const deps: portOwner.PortOwnerDeps = {
                platform: 'win32',
                ownPid: 1,
                timeoutMs: 40,
                now: () => clock,
                exec: (file: string, args: string[]) => {
                    calls.push(file);
                    if (file === 'netstat') {
                        // both tables are read, the deadline passes with the second one
                        clock += args.includes('tcpv6') ? 30 : 15;
                        return Promise.resolve(
                            args.includes('tcpv6')
                                ? '  Proto  Local Address          Foreign Address        State           PID\r\n'
                                : '  Proto  Local Address          Foreign Address        State           PID\r\n  TCP    0.0.0.0:8081           0.0.0.0:0              LISTENING       1234\r\n',
                        );
                    }
                    return Promise.resolve('"node.exe","1234","Console","1","85,000 K"\r\n');
                },
            };
            const owners = await resolvePortOwners({ port: 8081 }, deps);
            assert.deepEqual(calls, ['netstat', 'netstat'], 'tasklist is not started after the deadline');
            assert.deepEqual(owners, [{ kind: 'foreign', pid: 1234, unresolved: true }]);
            assert.match(
                describePortConflict({ port: 8081, owners }),
                /process 1234 – the lookup reached its deadline before the process was identified/,
            );
        });
    });

    describe('command output parsers', () => {
        it('parses lsof -F output into holders — the tag letter is glued to its value', () => {
            const out = 'p15411\ncnode\nu1001\nn*:1883\np812\ncmosquitto\nu108\nn127.0.0.1:1883\n';
            assert.deepEqual(parseLsofFields(out), [
                { pid: 15411, command: 'node', uid: 1001, localAddress: '*:1883' },
                { pid: 812, command: 'mosquitto', uid: 108, localAddress: '127.0.0.1:1883' },
            ]);
        });

        it('parses netstat -ano output for TCP listeners and UDP sockets', () => {
            const tcp = [
                'Active Connections',
                '',
                '  Proto  Local Address          Foreign Address        State           PID',
                '  TCP    0.0.0.0:8081           0.0.0.0:0              LISTENING       1234',
                '  TCP    192.168.1.5:8081       192.168.1.9:51000      ESTABLISHED     1234',
                '  TCP    [::]:8081              [::]:0                 LISTENING       1234',
                '  TCP    0.0.0.0:8082           0.0.0.0:0              LISTENING       9999',
            ].join('\r\n');
            assert.deepEqual(parseNetstat(tcp, 8081, 'tcp'), [{ pid: 1234, localAddress: '0.0.0.0' }]);
            const udp =
                '  Proto  Local Address          Foreign Address        State           PID\r\n  UDP    0.0.0.0:1900           *:*                                    4321\r\n';
            assert.deepEqual(parseNetstat(udp, 1900, 'udp'), [{ pid: 4321, localAddress: '0.0.0.0' }]);
        });

        it('recognises a listener by the unbound foreign address when netstat speaks German', () => {
            const tcp = [
                'Aktive Verbindungen',
                '',
                '  Proto  Lokale Adresse         Remoteadresse          Status          PID',
                '  TCP    0.0.0.0:8081           0.0.0.0:0              ABHÖREN         1234',
                '  TCP    192.168.1.5:8081       192.168.1.9:51000      HERGESTELLT     1234',
                '  TCP    [::]:8081              [::]:0                 ABHÖREN         1234',
                '  TCP    [fe80::1%12]:8081      [::]:0                 ABHÖREN         77',
            ].join('\r\n');
            assert.deepEqual(parseNetstat(tcp, 8081, 'tcp'), [
                { pid: 1234, localAddress: '0.0.0.0' },
                { pid: 77, localAddress: '[fe80::1%12]' },
            ]);
        });

        it('reads the image name from tasklist CSV output', () => {
            assert.equal(parseTasklistImage('"node.exe","1234","Console","1","85,000 K"\r\n'), 'node.exe');
            assert.equal(
                parseTasklistImage('INFO: No tasks are running which match the specified criteria.'),
                undefined,
            );
        });

        it('parses sockstat output', () => {
            const out = [
                'USER     COMMAND    PID   FD  PROTO  LOCAL ADDRESS         FOREIGN ADDRESS',
                'iobroker node       2211  22  tcp4   *:1883                *:*',
                'root     sshd       801   4   tcp4   *:22                  *:*',
            ].join('\n');
            assert.deepEqual(parseSockstat(out, 1883), [{ pid: 2211, command: 'node', localAddress: '*' }]);
        });

        it('runs the platform commands with the argument vectors the parsers expect', async () => {
            const calls: [string, string[]][] = [];
            const outputs: Record<string, string> = {
                lsof: 'p15411\ncnode\nu1001\nn*:1883\n',
                ps: 'node /opt/iobroker/node_modules/iobroker.mqtt/main.js --instance 0\n',
                netstat: '  TCP    0.0.0.0:1883           0.0.0.0:0              LISTENING       1234\r\n',
                tasklist: '"node.exe","1234","Console","1","85,000 K"\r\n',
                sockstat:
                    'USER     COMMAND    PID   FD  PROTO  LOCAL ADDRESS         FOREIGN ADDRESS\niobroker node       2211  22  tcp4   *:1883                *:*\n',
            };
            const budgets: number[] = [];
            const exec = (file: string, args: string[], timeoutMs: number): Promise<string> => {
                calls.push([file, args]);
                budgets.push(timeoutMs);
                // a real command takes time — the next one must get less of the shared budget
                return new Promise(resolve => setTimeout(() => resolve(outputs[file] ?? ''), 5));
            };

            calls.length = 0;
            assert.deepEqual(
                await resolvePortOwners({ port: 1883 }, { platform: 'darwin', ownPid: 1, exec, timeoutMs: 500 }),
                [{ kind: 'instance', instance: 'mqtt.0', pid: 15411 }],
            );
            assert.deepEqual(calls, [
                ['lsof', ['-nP', '-iTCP:1883', '-sTCP:LISTEN', '-Fpcun']],
                ['ps', ['-o', 'args=', '-p', '15411']],
            ]);

            calls.length = 0;
            assert.deepEqual(
                await resolvePortOwners({ port: 1900, protocol: 'udp' }, { platform: 'darwin', ownPid: 1, exec }),
                [{ kind: 'instance', instance: 'mqtt.0', pid: 15411 }],
            );
            assert.deepEqual(calls[0], ['lsof', ['-nP', '-iUDP:1900', '-Fpcun']]);

            calls.length = 0;
            assert.deepEqual(await resolvePortOwners({ port: 1883 }, { platform: 'win32', ownPid: 1, exec }), [
                { kind: 'process', pid: 1234, name: 'node.exe', command: 'node.exe' },
            ]);
            // IPv4 and IPv6 tables, one tasklist per holder (the same pid in both tables is one holder)
            assert.deepEqual(calls, [
                ['netstat', ['-ano', '-p', 'tcp']],
                ['netstat', ['-ano', '-p', 'tcpv6']],
                ['tasklist', ['/FI', 'PID eq 1234', '/FO', 'CSV', '/NH']],
            ]);

            calls.length = 0;
            assert.deepEqual(
                await resolvePortOwners({ port: 1883, protocol: 'udp' }, { platform: 'freebsd', ownPid: 1, exec }),
                [{ kind: 'process', pid: 2211, name: 'node', command: 'node' }],
            );
            assert.deepEqual(calls, [['sockstat', ['-l', '-P', 'udp', '-p', '1883']]]);

            // every command gets what is LEFT of the one deadline, never the whole budget again
            assert.ok(
                budgets.every(ms => ms <= 2000),
                `budgets: ${budgets.join(', ')}`,
            );
            const [first, second] = budgets;
            assert.ok(second < first, `the second command got ${second} ms after the first got ${first} ms`);
        });

        it('classifies raw holders from the command parsers', () => {
            const owners = classifyPortHolders(
                [
                    { pid: 15411, command: 'io.mqtt.0' },
                    { pid: 812, command: '/usr/sbin/mosquitto -c /etc/mosquitto/mosquitto.conf', uid: 108 },
                    { pid: 4321 },
                    { uid: 0 },
                ],
                999,
            );
            assert.deepEqual(owners, [
                { kind: 'instance', instance: 'mqtt.0', pid: 15411 },
                {
                    kind: 'process',
                    pid: 812,
                    name: 'mosquitto',
                    command: '/usr/sbin/mosquitto -c /etc/mosquitto/mosquitto.conf',
                },
                { kind: 'foreign', uid: undefined, pid: 4321 },
                { kind: 'foreign', uid: 0 },
            ]);
        });
    });

    describe('what the objects and states db add', () => {
        /**
         * An instance object as the `system/instance` view returns it
         *
         * @param id `<adapter>.<n>`
         * @param common overrides of the instance common (host `pi`, enabled)
         * @param native the instance settings
         */
        function instance(
            id: string,
            common: Partial<ioBroker.InstanceCommon>,
            native: Record<string, unknown> = {},
        ): ioBroker.InstanceObject {
            return {
                _id: `system.adapter.${id}`,
                type: 'instance',
                common: { host: 'pi', enabled: true, ...common } as ioBroker.InstanceCommon,
                native,
            } as ioBroker.InstanceObject;
        }
        /**
         * A state with the given value, acknowledged unless said otherwise
         *
         * @param val the value
         * @param ack acknowledged (the host writes the spawned pid with ack, -1 for compact mode without)
         */
        function state(val: ioBroker.StateValue, ack = true): ioBroker.State {
            return { val, ack, ts: 0, lc: 0, from: 'system.host.pi' };
        }
        const instances = [
            instance('mqtt.0', {}, { port: 1883, bind: '0.0.0.0' }),
            instance('sonoff.0', { enabled: false }, { port: '1883', bind: '' }),
            instance('mqtt-client.0', {}, { port: 1883 }),
            instance(
                'web.0',
                { compact: true, runAsCompactMode: true, compactGroup: 0 },
                { port: 8082, bind: '0.0.0.0' },
            ),
            instance('sonoff.1', { compact: true, runAsCompactMode: true }, { port: 8082, bind: '0.0.0.0' }),
            instance(
                'admin.0',
                { compact: true, runAsCompactMode: false, compactGroup: 0 },
                { port: 8081, bind: '0.0.0.0' },
            ),
            instance('hue.0', {}, { port: 80 }),
        ];
        const states: Record<string, ioBroker.State | null | undefined> = {
            'system.adapter.mqtt.0.sigKill': state(15411),
            'system.adapter.mqtt.0.alive': state(true),
            'system.adapter.sonoff.0.sigKill': state(0, false),
            'system.adapter.sonoff.0.alive': state(false),
            'system.adapter.mqtt-client.0.sigKill': state(15412),
            'system.adapter.mqtt-client.0.alive': state(true),
            'system.adapter.web.0.sigKill': state(-1, false),
            'system.adapter.web.0.alive': state(true),
            'system.adapter.sonoff.1.sigKill': state(-1, false),
            'system.adapter.sonoff.1.alive': state(true),
            'system.adapter.admin.0.sigKill': state(723, false),
            'system.adapter.admin.0.alive': state(true),
        };

        it('selects the instances of one host and names the states to read for them', () => {
            const onPi = instancesOnHost(
                [
                    instance('mqtt.0', {}),
                    instance('web.0', { host: 'nas' }),
                    null,
                    {
                        _id: 'system.adapter.mqtt',
                        type: 'adapter',
                        common: {},
                        native: {},
                    } as unknown as ioBroker.AnyObject,
                ],
                'pi',
            );
            assert.deepEqual(
                onPi.map(o => o._id),
                ['system.adapter.mqtt.0'],
            );
            assert.deepEqual(enrichmentStateIds(onPi), [
                'system.adapter.mqtt.0.sigKill',
                'system.adapter.mqtt.0.alive',
            ]);
        });

        it('names the instance behind a pid the OS could not name — only an acknowledged sigKill is a spawned pid', () => {
            const ctx: portOwner.PortConflictContext = {
                port: 1883,
                owners: [
                    { kind: 'process', pid: 15411, name: 'node.exe', command: 'node.exe' },
                    { kind: 'foreign', pid: 15412, uid: 1001 },
                    { kind: 'foreign', pid: 723 },
                    { kind: 'process', pid: 812, name: 'mosquitto', command: '/usr/sbin/mosquitto' },
                ],
            };
            enrichPortOwnersFromDb(ctx, { instances, states, compactModeEnabled: true });
            assert.deepEqual(ctx.owners, [
                { kind: 'instance', instance: 'mqtt.0', pid: 15411 },
                { kind: 'instance', instance: 'mqtt-client.0', pid: 15412 },
                { kind: 'foreign', pid: 723 },
                { kind: 'process', pid: 812, name: 'mosquitto', command: '/usr/sbin/mosquitto' },
            ]);
        });

        it('does not name a stopped instance whose old sigKill pid the OS handed to another process', () => {
            const ctx: portOwner.PortConflictContext = {
                port: 1883,
                owners: [{ kind: 'foreign', pid: 15411, uid: 1001 }],
            };
            const dead = { ...states, 'system.adapter.mqtt.0.alive': state(false) };
            enrichPortOwnersFromDb(ctx, { instances, states: dead, compactModeEnabled: true });
            assert.deepEqual(ctx.owners, [{ kind: 'foreign', pid: 15411, uid: 1001 }]);
        });

        it('lists every instance configured for the port, listen-address carriers first, and does not repeat a named holder', () => {
            const ctx: portOwner.PortConflictContext = {
                port: 1883,
                owners: [{ kind: 'instance', instance: 'mqtt.0', pid: 15411 }],
            };
            enrichPortOwnersFromDb(ctx, { instances, states, compactModeEnabled: true });
            assert.deepEqual(ctx.configuredBy, [
                { instance: 'mqtt.0', enabled: true, alive: true, bind: '0.0.0.0' },
                { instance: 'sonoff.0', enabled: false, alive: false, bind: undefined },
                { instance: 'mqtt-client.0', enabled: true, alive: true, bind: undefined },
            ]);
            assert.equal(
                describePortConflict(ctx),
                'Port 1883 is already in use by ioBroker instance mqtt.0 (pid 15411) on this host – stop or reconfigure one of the two instances; also configured for Port 1883: sonoff.0 (disabled, no bind address – possibly a client port), mqtt-client.0 (running, no bind address – possibly a client port)',
            );
            const free: portOwner.PortConflictContext = { port: 4711, owners: [] };
            enrichPortOwnersFromDb(free, { instances, states, compactModeEnabled: true });
            assert.equal(free.configuredBy, undefined);
        });

        it('names the running instances inside the compact mode process that holds the port, group 1 being the default', () => {
            const inController: portOwner.PortConflictContext = {
                port: 8082,
                owners: [{ kind: 'controller', pid: 723 }],
            };
            enrichPortOwnersFromDb(inController, { instances, states, compactModeEnabled: true });
            // admin.0 sits in group 0 but does not run in compact mode; sonoff.1 has no group → 1
            assert.deepEqual(inController.compactInstances, { group: 0, instances: ['web.0'] });
            assert.match(describePortConflict(inController), /inside the controller holds it: web\.0;/);

            const inGroup: portOwner.PortConflictContext = {
                port: 8082,
                owners: [{ kind: 'compact', group: 1, pid: 1000 }],
            };
            enrichPortOwnersFromDb(inGroup, { instances, states, compactModeEnabled: true });
            assert.deepEqual(inGroup.compactInstances, { group: 1, instances: ['sonoff.1'] });
        });

        it('blames nobody inside the controller while the host runs no compact mode', () => {
            const ctx: portOwner.PortConflictContext = { port: 9001, owners: [{ kind: 'controller', pid: 723 }] };
            enrichPortOwnersFromDb(ctx, { instances, states, compactModeEnabled: false });
            assert.equal(ctx.compactInstances, undefined);
            assert.equal(ctx.compactModeEnabled, false);
            assert.match(describePortConflict(ctx), /the controller itself holds it \(compact mode is off/);
        });
    });

    describe('the sentence the user reads', () => {
        it('names another ioBroker instance', () => {
            const text = describePortConflict({
                port: 1883,
                address: '0.0.0.0',
                owners: [{ kind: 'instance', instance: 'mqtt.0', pid: 15411 }],
            });
            assert.equal(
                text,
                'Port 1883 is already in use by ioBroker instance mqtt.0 (pid 15411) on this host – stop or reconfigure one of the two instances',
            );
        });

        it('names a program outside ioBroker, and says when the holder is not visible', () => {
            assert.match(
                describePortConflict({
                    port: 1883,
                    owners: [{ kind: 'process', pid: 812, name: 'mosquitto', command: '/usr/sbin/mosquitto' }],
                }),
                /process "mosquitto" \(pid 812\), which is not an ioBroker instance/,
            );
            assert.equal(
                describePortConflict({ port: 22, owners: [{ kind: 'foreign', uid: 0 }], userName: 'iobroker' }),
                'Port 22 is already in use by a process outside ioBroker (owner not visible to user "iobroker", uid 0)',
            );
            assert.match(
                describePortConflict({ port: 22, owners: [{ kind: 'foreign', uid: 0, sameUser: false }] }),
                /by a process of another user \(uid 0\), which is outside ioBroker/,
            );
            assert.match(
                describePortConflict({
                    port: 9000,
                    owners: [{ kind: 'foreign', uid: 1001, sameUser: true }],
                    userName: 'iobroker',
                }),
                /by a process of user "iobroker" that this process may not inspect \(not dumpable/,
            );
        });

        it('compares bind addresses by what collides, not by spelling', () => {
            assert.ok(bindAddressesCollide('0.0.0.0', '127.0.0.1'));
            assert.ok(bindAddressesCollide('127.0.0.1', '::'));
            assert.ok(bindAddressesCollide('::1', '[0:0:0:0:0:0:0:1]'));
            assert.ok(bindAddressesCollide('10.0.0.1', '::ffff:10.0.0.1'));
            assert.ok(bindAddressesCollide('1.2.3.4', '0:0:0:0:0:ffff:102:304'));
            assert.ok(bindAddressesCollide('fe80::1', 'fe80::1%eth0'));
            assert.ok(bindAddressesCollide(undefined, '127.0.0.1'));
            assert.ok(bindAddressesCollide('127.0.0.1', undefined));
            assert.ok(bindAddressesCollide('*', '192.168.1.5'));
            assert.equal(bindAddressesCollide('127.0.0.1', '192.168.1.5'), false);
            assert.equal(bindAddressesCollide('::1', 'fe80::1'), false);
        });

        it('explains a compact mode holder with the instances running inside that process', () => {
            const text = describePortConflict({
                port: 8082,
                owners: [{ kind: 'controller', pid: 723 }],
                compactInstances: { group: 0, instances: ['web.0', 'sonoff.0'] },
            });
            assert.match(text, /js-controller process \(pid 723\)/);
            assert.match(text, /inside the controller holds it: web\.0, sonoff\.0/);
            assert.match(
                describePortConflict({ port: 8082, owners: [{ kind: 'compact', group: 2, pid: 1000 }] }),
                /compact mode group 2 \(pid 1000\)/,
            );
        });

        it('does not blame a compact mode instance while the host runs no compact mode at all', () => {
            assert.match(
                describePortConflict({
                    port: 9001,
                    owners: [{ kind: 'controller', pid: 723 }],
                    compactModeEnabled: false,
                }),
                /\(pid 723\) – the controller itself holds it \(compact mode is off, so no instance runs inside it\)$/,
            );
            assert.match(
                describePortConflict({ port: 9001, owners: [{ kind: 'controller', pid: 723 }] }),
                /inside the controller, or the controller itself, holds it$/,
            );
        });

        it('adds the instances configured for the port, and stands alone when nothing else is known', () => {
            const text = describePortConflict({
                port: 1883,
                owners: [{ kind: 'instance', instance: 'mqtt.0', pid: 15411 }],
                configuredBy: [
                    { instance: 'mqtt.0', enabled: true, alive: true, bind: '0.0.0.0' },
                    { instance: 'sonoff.0', enabled: true, alive: false, bind: '0.0.0.0' },
                    { instance: 'mqtt-client.0', enabled: true, alive: true },
                ],
            });
            assert.match(
                text,
                /; also configured for Port 1883: sonoff\.0 \(bind 0\.0\.0\.0, enabled, not running\), mqtt-client\.0 \(running, no bind address – possibly a client port\)$/,
            );
            assert.equal(
                describePortConflict({
                    port: 1883,
                    owners: [],
                    configuredBy: [{ instance: 'sonoff.0', enabled: false, alive: false, bind: '0.0.0.0' }],
                }),
                'Port 1883 could not be bound – configured for the same port on this host: sonoff.0 (bind 0.0.0.0, disabled)',
            );
            assert.equal(describePortConflict({ port: 1883, owners: [] }), '');
        });

        it('mentions UDP and a concrete address, and the own process', () => {
            const text = describePortConflict({
                port: 1900,
                address: '192.168.1.5',
                protocol: 'udp',
                owners: [{ kind: 'self', pid: 999 }],
            });
            assert.match(text, /^UDP port 1900 on 192\.168\.1\.5 is already in use by this process itself \(pid 999\)/);
        });

        it('hints at "iobroker fix" for a privileged port', () => {
            assert.match(
                describeBindPermissionError(80, 'linux'),
                /ports below 1024 need elevated rights; run "iobroker fix"/,
            );
            assert.match(describeBindPermissionError(80, 'win32'), /check the rights of the user ioBroker runs as/);
            assert.match(describeBindPermissionError(8081, 'linux'), /check the rights of the user ioBroker runs as/);
        });
    });
});
