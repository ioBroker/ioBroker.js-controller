import assert from 'node:assert/strict';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import fs from 'fs-extra';
import {
    buildPythonEnv,
    checkPythonEnvironment,
    createLineSplitter,
    forwardPythonOutput,
    getPythonInterpreter,
    isPythonAdapter,
    resolvePythonEntry,
    spawnPythonAdapter,
    unsupportedPythonDbConfig,
    FORWARDED_PYTHON_RECORD,
} from '../src/lib/pythonRuntime.js';
import { getSupportedFeatures } from '@iobroker/js-controller-common';
import { getInstanceIndicatorObjects } from '@iobroker/js-controller-common-db/tools';

describe('pythonRuntime', () => {
    describe('isPythonAdapter', () => {
        it('recognises the Python platform regardless of case', () => {
            assert.equal(isPythonAdapter({ platform: 'Python' }), true);
            // Case is ignored deliberately: platform is hand-written and already
            // wrong in the wild -- adapters shipping 'javascript/Node.js' exist.
            assert.equal(isPythonAdapter({ platform: 'python' }), true);
        });

        it('keeps everything else on the Node path', () => {
            // The shapes that actually occur: the default, no field at all,
            // empty object, missing common section.
            assert.equal(isPythonAdapter({ platform: 'Javascript/Node.js' }), false);
            assert.equal(isPythonAdapter({ platform: 'javascript/Node.js' }), false);
            assert.equal(isPythonAdapter({}), false);
            assert.equal(isPythonAdapter(undefined), false);
            assert.equal(isPythonAdapter(null), false);
        });
    });

    describe('the compact flag', () => {
        it('is what decides compact group membership, so Python has to be recognised first', () => {
            // instanceRelevantForThisController clears common.compact for Python adapters before
            // anything reads it. That has to happen there rather than at start time: both it and
            // checkAndAddInstance decide compact group membership from the flag, so an adapter
            // mistakenly published with compact=true would already have been claimed by a group
            // before the start path ran. This test pins the detection the clearing depends on.
            assert.equal(isPythonAdapter({ platform: 'Python' }), true);
            assert.equal(isPythonAdapter({ platform: 'Javascript/Node.js' }), false);
        });
    });

    describe('getPythonInterpreter', () => {
        it('points into the adapter-specific virtual environment', () => {
            const interpreter = getPythonInterpreter('pyexample');

            // Must be absolute. The path becomes the executable of a spawn() whose cwd is the
            // adapter's package directory, so a relative one resolves against the wrong place and
            // fails with ENOENT -- while every check made from the controller's cwd still passes.
            assert.ok(path.isAbsolute(interpreter), `expected an absolute path, got "${interpreter}"`);
            assert.ok(interpreter.includes(path.join('py', 'pyexample', 'venv')));
            // The layout differs between platforms and getting it wrong means the
            // adapter silently never starts.
            if (process.platform === 'win32') {
                assert.ok(interpreter.endsWith(path.join('Scripts', 'python.exe')));
            } else {
                assert.ok(interpreter.endsWith(path.join('bin', 'python')));
            }
        });
    });

    describe('resolvePythonEntry', () => {
        it('derives module and working directory from common.main', () => {
            const entry = resolvePythonEntry(
                '/opt/iobroker/node_modules/iobroker.pyexample',
                'python/pyexample/__main__.py',
            );

            assert.equal(entry.module, 'pyexample');
            assert.equal(entry.cwd, path.join('/opt/iobroker/node_modules/iobroker.pyexample', 'python'));
        });

        it('accepts backslashes, because io-package.json is written on Windows too', () => {
            const entry = resolvePythonEntry('/adapters/iobroker.foo', 'python\\foo\\__main__.py');

            assert.equal(entry.module, 'foo');
        });

        it('rejects a main file that is not a package entry point', () => {
            // Started by path instead of with -m, a file is not part of a package
            // and its relative imports fail at runtime. Better to refuse early
            // with a message naming the expected layout.
            assert.throws(() => resolvePythonEntry('/adapters/iobroker.foo', 'python/foo/run.py'), /__main__\.py/);
        });

        it('rejects a nested package, whose module name cannot be derived this way', () => {
            // The tempting loose check -- "ends with __main__.py" -- accepts this and derives the
            // module "bar", but `python -m bar` fails for a package reachable as foo.bar. Failing
            // here names the problem; failing at spawn time does not.
            assert.throws(
                () => resolvePythonEntry('/adapters/iobroker.foo', 'python/foo/bar/__main__.py'),
                /python\/<module>\/__main__\.py/,
            );
        });

        it('rejects a package outside the python/ directory', () => {
            assert.throws(
                () => resolvePythonEntry('/adapters/iobroker.foo', 'foo/__main__.py'),
                /python\/<module>\/__main__\.py/,
            );
        });

        it('rejects a missing main', () => {
            assert.throws(() => resolvePythonEntry('/adapters/iobroker.foo', undefined), /common\.main/);
        });
    });

    describe('checkPythonEnvironment', () => {
        it('reports a missing environment and names what it expected', async () => {
            const env = await checkPythonEnvironment('adapter-that-does-not-exist', '1.0.0');

            assert.equal(env.ready, false);
            assert.equal(env.stale, undefined);
            // The message has to carry the path, otherwise "environment is missing" sends people
            // looking in the wrong place.
            assert.match(env.reason!, /is missing/);
            assert.ok(env.reason!.includes(env.interpreter));
        });

        describe('an environment that is mid-rebuild', () => {
            // Faked on disk rather than built for real: what is under test is the decision, and a
            // real rebuild would need uv, a network and thirty seconds.
            const adapter = 'python-rebuild-fixture';
            const interpreter = getPythonInterpreter(adapter);
            const envDir = path.join(interpreter, '..', '..', '..');
            const stampFile = path.join(envDir, 'environment.json');

            const writeStamp = async (stamp: Record<string, unknown>): Promise<void> => {
                await fs.ensureDir(path.dirname(interpreter));
                await fs.writeFile(interpreter, '');
                await fs.writeJson(stampFile, stamp);
            };

            afterEach(async () => {
                await fs.remove(envDir);
            });

            it('is refused while `building` is set', async () => {
                // `uv venv --clear` puts the interpreter back in its first moment and fills
                // site-packages afterwards, so for the seconds in between the environment looks
                // complete and holds nothing. Starting an adapter there fails on an import of a
                // package that was present a second earlier -- a symptom that points nowhere.
                await writeStamp({ adapterVersion: '1.0.0', building: true });

                const env = await checkPythonEnvironment(adapter, '1.0.0');

                assert.equal(env.ready, false, 'the version matches, so only the flag can stop it');
                assert.equal(env.stale, true);
                assert.match(env.reason!, /being rebuilt/);
            });

            it('stays refused after an interrupted build, not just during one', async () => {
                // The flag is written before the venv is touched and cleared only on success, so a
                // build that was killed leaves it set. That is the point: an environment nobody
                // finished is one nothing should start from until it has been rebuilt.
                await writeStamp({ adapterVersion: '1.0.0', building: true, builtAt: '2020-01-01T00:00:00.000Z' });

                assert.equal((await checkPythonEnvironment(adapter, '1.0.0')).ready, false);
            });

            it('is accepted once the flag is gone', async () => {
                await writeStamp({ adapterVersion: '1.0.0' });

                const env = await checkPythonEnvironment(adapter, '1.0.0');

                assert.equal(env.ready, true);
                assert.equal(env.reason, undefined);
            });
        });
    });

    describe('buildPythonEnv', () => {
        const config = {
            states: { type: 'jsonl', host: '127.0.0.1', port: 9000, options: { db: 0, auth_pass: null } },
            objects: { type: 'redis', host: '10.0.0.5', port: 6379, options: { db: 2, auth_pass: 'secret' } },
        } as unknown as ioBroker.IoBrokerJson;

        it('passes both database connections through', () => {
            const env = buildPythonEnv(config, 3, 'debug');

            assert.equal(env.IOB_STATES_HOST, '127.0.0.1');
            assert.equal(env.IOB_STATES_PORT, '9000');
            assert.equal(env.IOB_STATES_TYPE, 'jsonl');
            assert.equal(env.IOB_OBJECTS_HOST, '10.0.0.5');
            assert.equal(env.IOB_OBJECTS_PORT, '6379');
            assert.equal(env.IOB_OBJECTS_DB, '2');
            assert.equal(env.IOB_INSTANCE, '3');
            assert.equal(env.IOB_LOGLEVEL, 'debug');
        });

        it('only sets a password when there is one', () => {
            const env = buildPythonEnv(config, 0);

            assert.equal(env.IOB_OBJECTS_PASS, 'secret');
            // A null auth_pass is the common case and must not turn into the
            // string "null", which the adapter would then try to authenticate with.
            assert.equal(env.IOB_STATES_PASS, undefined);
            assert.equal(env.IOB_LOGLEVEL, undefined);
        });

        it('ignores IOB_ variables inherited from the controller', () => {
            // If the controller was started from a shell that already had these set, an inherited
            // value would survive wherever the configuration has none and quietly point the
            // adapter at a different database. The environment has to come from the config alone.
            process.env.IOB_STATES_HOST = '10.9.9.9';
            process.env.IOB_STATES_PASS = 'leaked';
            process.env.IOB_LOGLEVEL = 'silly';

            try {
                const sparse = {
                    states: { type: 'jsonl', host: '127.0.0.1', port: 9000 },
                } as unknown as ioBroker.IoBrokerJson;

                const env = buildPythonEnv(sparse, 0);

                assert.equal(env.IOB_STATES_HOST, '127.0.0.1');
                assert.equal(env.IOB_STATES_PASS, undefined);
                assert.equal(env.IOB_LOGLEVEL, undefined);
                // Everything else the controller carries is still inherited on purpose.
                assert.ok(env.PATH !== undefined || process.platform === 'win32');
            } finally {
                delete process.env.IOB_STATES_HOST;
                delete process.env.IOB_STATES_PASS;
                delete process.env.IOB_LOGLEVEL;
            }
        });

        it('passes a Sentinel setup through as the list it is', () => {
            const sentinel = {
                states: {
                    type: 'redis',
                    host: ['10.0.0.1', '10.0.0.2', '10.0.0.3'],
                    port: [26379, 26380, 26381],
                    sentinelName: 'iob',
                    options: { auth_pass: 'pw', db: 1 },
                },
            } as unknown as ioBroker.IoBrokerJson;

            const env = buildPythonEnv(sentinel, 0);

            assert.equal(env.IOB_STATES_SENTINELS, '10.0.0.1:26379,10.0.0.2:26380,10.0.0.3:26381');
            assert.equal(env.IOB_STATES_SENTINEL_NAME, 'iob');
            assert.equal(env.IOB_STATES_PASS, 'pw');
            assert.equal(env.IOB_STATES_DB, '1');
        });

        it('leaves no host and no port beside the sentinels', () => {
            // Whichever of the two it was given would be an address something eventually
            // connects to -- and a sentinel answering as if it were the database is exactly the
            // failure this used to be refused for.
            const sentinel = {
                states: { type: 'redis', host: ['10.0.0.1', '10.0.0.2'], port: [26379, 26380] },
            } as unknown as ioBroker.IoBrokerJson;

            const env = buildPythonEnv(sentinel, 0);

            assert.equal(env.IOB_STATES_HOST, undefined);
            assert.equal(env.IOB_STATES_PORT, undefined);
        });

        it('shares a single port across every sentinel', () => {
            // The same reading as the Redis clients: one port applies to all hosts, a list is
            // taken index for index.
            const sentinel = {
                objects: { type: 'redis', host: ['a', 'b'], port: 26379 },
            } as unknown as ioBroker.IoBrokerJson;

            assert.equal(buildPythonEnv(sentinel, 0).IOB_OBJECTS_SENTINELS, 'a:26379,b:26379');
        });

        it('brackets an IPv6 sentinel', () => {
            // Without them the address's own colons cannot be told from the separator before the
            // port, and the adapter would resolve a host that does not exist.
            const sentinel = {
                states: { type: 'redis', host: ['::1', 'fd00::2'], port: [26379, 26380] },
            } as unknown as ioBroker.IoBrokerJson;

            assert.equal(buildPythonEnv(sentinel, 0).IOB_STATES_SENTINELS, '[::1]:26379,[fd00::2]:26380');
        });

        it('names the master group ioredis would use when none is configured', () => {
            // Both sides have to ask for the same group, and the JS clients fall back to this.
            const sentinel = {
                states: { type: 'redis', host: ['10.0.0.1'], port: 26379 },
            } as unknown as ioBroker.IoBrokerJson;

            assert.equal(buildPythonEnv(sentinel, 0).IOB_STATES_SENTINEL_NAME, 'mymaster');
        });

        it('clears an inherited sentinel list for a plain configuration', () => {
            // Same reason as for HOST and PORT: a value left over from the controller's own
            // environment would send the adapter to a different database entirely.
            process.env.IOB_STATES_SENTINELS = '10.9.9.9:26379';
            process.env.IOB_STATES_SENTINEL_NAME = 'leaked';

            try {
                const env = buildPythonEnv(config, 0);

                assert.equal(env.IOB_STATES_SENTINELS, undefined);
                assert.equal(env.IOB_STATES_SENTINEL_NAME, undefined);
                assert.equal(env.IOB_STATES_HOST, '127.0.0.1');
            } finally {
                delete process.env.IOB_STATES_SENTINELS;
                delete process.env.IOB_STATES_SENTINEL_NAME;
            }
        });
    });

    describe('unsupportedPythonDbConfig', () => {
        it('accepts a plain single-host configuration', () => {
            const config = {
                states: { type: 'jsonl', host: '127.0.0.1', port: 9000 },
                objects: { type: 'jsonl', host: '127.0.0.1', port: 9001 },
            } as unknown as ioBroker.IoBrokerJson;

            assert.equal(unsupportedPythonDbConfig(config), null);
        });

        it('accepts a Sentinel configuration', () => {
            // Refused until js-controller 8.0, because the environment could express only one
            // host and one port. It carries the sentinel list now, and the SDK discovers the
            // master through it.
            const config = {
                states: { type: 'redis', host: ['10.0.0.1', '10.0.0.2'], port: [26379, 26380] },
                objects: { type: 'jsonl', host: '127.0.0.1', port: 9001 },
            } as unknown as ioBroker.IoBrokerJson;

            assert.equal(unsupportedPythonDbConfig(config), null);
        });

        it('refuses a unix socket and names the section', () => {
            // Port 0 means the host is the path of a socket. Handed over as a host and a port,
            // the adapter would open a TCP connection to port 0 and report a refused connection,
            // which says nothing about the cause.
            const config = {
                states: { type: 'jsonl', host: '127.0.0.1', port: 9000 },
                objects: { type: 'redis', host: '/var/run/redis/redis.sock', port: 0 },
            } as unknown as ioBroker.IoBrokerJson;

            const reason = unsupportedPythonDbConfig(config);

            assert.ok(reason);
            assert.match(reason, /objects/);
            assert.match(reason, /unix socket/);
            assert.match(reason, /redis\.sock/);
        });
    });

    describe('createLineSplitter', () => {
        it('re-assembles lines torn across chunks', () => {
            // Chunks are not lines: a read can end in the middle of a traceback line, and the two
            // halves must come out as one entry, not two.
            const lines: string[] = [];
            const splitter = createLineSplitter(line => lines.push(line));

            splitter.onData('Traceback (most re');
            splitter.onData('cent call last):\n  File "x.py"\n');

            assert.deepEqual(lines, ['Traceback (most recent call last):', '  File "x.py"']);
        });

        it('drops blank lines and strips Windows line endings', () => {
            const lines: string[] = [];
            const splitter = createLineSplitter(line => lines.push(line));

            splitter.onData('first\r\n\r\n   \r\nsecond\r\n');

            assert.deepEqual(lines, ['first', 'second']);
        });

        it('emits the held-back tail on flush', () => {
            // A crash often ends without a trailing newline, and that last line is the
            // interesting one.
            const lines: string[] = [];
            const splitter = createLineSplitter(line => lines.push(line));

            splitter.onData('almost done');
            assert.deepEqual(lines, []);

            splitter.flush();
            assert.deepEqual(lines, ['almost done']);
        });

        it('does not buffer without limit when no newline ever arrives', () => {
            const lines: string[] = [];
            const splitter = createLineSplitter(line => lines.push(line));

            splitter.onData('x'.repeat(9_000));

            assert.equal(lines.length, 1);
            assert.equal(lines[0].length, 9_000);
        });
    });

    describe('spawning a real Python module', function () {
        // These tests exercise the actual contract -- module started with -m from the python/
        // directory, args and environment passed through, both streams forwarded line-wise --
        // against whatever Python the machine has. Without one they are skipped; the GitHub
        // runners of all three OSes ship a Python 3.
        let python: string | null = null;
        let adapterDir: string;

        for (const candidate of process.platform === 'win32' ? ['python', 'python3'] : ['python3', 'python']) {
            const probe = spawnSync(candidate, ['--version'], { windowsHide: true, encoding: 'utf8' });

            // The Microsoft Store alias on Windows is an executable named python.exe that only
            // prints an ad -- it reports a non-zero status here and is correctly not accepted.
            if (probe.status === 0 && /Python 3/.test(probe.stdout + probe.stderr)) {
                python = candidate;
                break;
            }
        }

        before(async function () {
            if (!python) {
                this.skip();
            }

            adapterDir = await fs.mkdtemp(path.join(os.tmpdir(), 'iob-python-test-'));
            await fs.outputFile(
                path.join(adapterDir, 'python', 'testmod', '__main__.py'),
                [
                    'import os, sys',
                    'print("argv=" + " ".join(sys.argv[1:]))',
                    'print("cwd=" + os.getcwd())',
                    'print("inst=" + os.environ.get("IOB_INSTANCE", "missing"))',
                    'sys.stderr.write("boom\\n")',
                    // Deliberately no trailing newline: this line only reaches the log if the
                    // forwarder flushes its buffer when the process exits.
                    'sys.stderr.write("tail without newline")',
                ].join('\n'),
            );
        });

        after(async () => {
            if (adapterDir) {
                await fs.remove(adapterDir);
            }
        });

        it('starts the module with -m, hands over args and environment, and forwards both streams', async function () {
            this.timeout(15_000);

            const config = {
                states: { type: 'jsonl', host: '127.0.0.1', port: 9000 },
                objects: { type: 'jsonl', host: '127.0.0.1', port: 9001 },
            } as unknown as ioBroker.IoBrokerJson;

            const child = spawnPythonAdapter({
                adapterName: 'testmod',
                adapterDir,
                main: 'python/testmod/__main__.py',
                interpreter: python!,
                args: ['--instance', '7', '--loglevel', 'debug'],
                env: buildPythonEnv(config, 7, 'debug'),
            });

            const logged: { level: string; line: string }[] = [];
            forwardPythonOutput(child, (level, line) => logged.push({ level, line }));

            const exitCode = await new Promise<number | null>(resolve => child.on('close', resolve));

            assert.equal(exitCode, 0);

            const info = logged.filter(entry => entry.level === 'info').map(entry => entry.line);
            const error = logged.filter(entry => entry.level === 'error').map(entry => entry.line);

            assert.ok(
                info.includes('argv=--instance 7 --loglevel debug'),
                `argv not passed through: ${JSON.stringify(info)}`,
            );
            // The working directory decides whether -m finds the package at all.
            const cwdLine = info.find(line => line.startsWith('cwd='));
            assert.ok(cwdLine, 'cwd line missing');
            assert.equal(await fs.realpath(cwdLine.substring(4)), await fs.realpath(path.join(adapterDir, 'python')));
            assert.ok(info.includes('inst=7'), `IOB_INSTANCE not passed through: ${JSON.stringify(info)}`);

            assert.deepEqual(error, ['boom', 'tail without newline']);
        });
    });

    describe('the states an instance gets when it is created', () => {
        const objects = (platform: string): string[] =>
            getInstanceIndicatorObjects('demo.0', { platform } as ioBroker.AdapterCommon).map(obj =>
                obj._id.replace('system.adapter.demo.0.', ''),
            );

        it('leaves out the V8 heap states for a Python instance', () => {
            // Two rows that would sit at (null) for the life of the installation: CPython's
            // allocator publishes no total, and the one figure that could be measured costs
            // several times the memory it reports. Empty reads as broken, so they are not created.
            const python = objects('Python');

            assert.equal(python.includes('memHeapTotal'), false);
            assert.equal(python.includes('memHeapUsed'), false);
        });

        it('keeps everything the Python SDK does report', () => {
            const python = objects('Python');

            for (const name of ['alive', 'connected', 'cpu', 'cputime', 'memRss', 'uptime', 'eventLoopLag']) {
                assert.ok(python.includes(name), `${name} is missing`);
            }
        });

        it('changes nothing for a Node adapter', () => {
            const node = objects('Javascript/Node.js');

            assert.ok(node.includes('memHeapTotal'));
            assert.ok(node.includes('memHeapUsed'));
        });

        it('does not call the lag Node.js when asyncio measured it', () => {
            const lag = (platform: string): ioBroker.StateCommon =>
                getInstanceIndicatorObjects('demo.0', { platform } as ioBroker.AdapterCommon).find(obj =>
                    obj._id.endsWith('.eventLoopLag'),
                )!.common;

            // `desc` and `name` are declared as translatable; these two are written as plain
            // strings, which is what the assertion below relies on.
            assert.match(lag('Python').desc as string, /asyncio/);
            assert.doesNotMatch(lag('Python').name as string, /Node\.js/);
            assert.match(lag('Javascript/Node.js').desc as string, /Node\.js/);
        });
    });

    describe('a forwarded record the adapter already pushed', () => {
        // Both routes end at the same user. The adapter pushes its own records to whoever asked
        // for the log, with the level and timestamp they actually had; this controller captures
        // the same lines from stdout for the host's log file. Without telling the two apart, admin
        // shows every Python line twice.
        const forwarded = (line: string): string => `host.testhost system.adapter.python.0 ${line}`;

        it('is recognised by the shape the SDK writes', () => {
            assert.ok(
                FORWARDED_PYTHON_RECORD.test(
                    forwarded('2026-09-06 07:12:03,001 INFO python.0 Adapter python.0 started'),
                ),
            );
            assert.ok(
                FORWARDED_PYTHON_RECORD.test(forwarded('2026-09-06 07:12:03,001 ERROR python.0 the device refused')),
            );
        });

        it('leaves everything the adapter did not push', () => {
            // These have no other route to a user, so they must keep being pushed under the host.
            // The failure mode here is a duplicate line; the failure mode of the opposite mistake
            // is a traceback nobody ever sees.
            assert.equal(FORWARDED_PYTHON_RECORD.test(forwarded('  File "main.py", line 5')), false);
            assert.equal(FORWARDED_PYTHON_RECORD.test(forwarded('ValueError: boom')), false);
            assert.equal(FORWARDED_PYTHON_RECORD.test(forwarded('a bare print()')), false);
        });

        it('leaves the host lines that mention an instance', () => {
            // The controller says "system.adapter.x.0" in a great many of its own messages, and
            // those are the log. Only the record header behind it makes a line the adapter's.
            assert.equal(FORWARDED_PYTHON_RECORD.test('host.testhost instance system.adapter.python.0 started'), false);
            assert.equal(
                FORWARDED_PYTHON_RECORD.test(
                    'host.testhost stopInstance system.adapter.python.0 (force=false, process=true)',
                ),
                false,
            );
        });
    });

    describe('the CONTROLLER_PYTHON_ADAPTERS feature flag', () => {
        // What a UI asks before it offers the platform: admin reaches this through
        // `socket.checkFeatureSupported`, which the admin adapter answers out of
        // `adapter.supportsFeature` -- and that is this list.
        it('is announced, so a UI can ask instead of guessing', () => {
            assert.ok(
                getSupportedFeatures().includes('CONTROLLER_PYTHON_ADAPTERS'),
                'a controller that starts Python adapters has to say so',
            );
        });

        it('is announced on every platform', () => {
            // Unlike CONTROLLER_UI_UPGRADE, this one is not filtered by the host it runs
            // on: it describes what the controller implements, not what is installed
            // beside it. A Windows host without Python still understands the platform --
            // whether an environment exists is py-controller's answer, not this flag's.
            // The suite runs on all three operating systems, so this asserts it there.
            assert.ok(getSupportedFeatures().includes('CONTROLLER_PYTHON_ADAPTERS'));
        });

        it('promises exactly what the start path recognises', () => {
            // The flag and the platform check are two halves of one statement. Announcing
            // the feature while the start path no longer recognises the platform would be
            // a promise nothing keeps, and the failure would surface as an instance that
            // silently starts on the Node path.
            assert.equal(isPythonAdapter({ platform: 'Python' }), true);
        });
    });
});
