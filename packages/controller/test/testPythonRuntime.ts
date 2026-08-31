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
} from '../src/lib/pythonRuntime.js';

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

        it('takes the first entry when the host is configured redundantly', () => {
            // Defensive only: startInstance refuses such configurations via
            // unsupportedPythonDbConfig before this function is ever reached.
            const sentinel = {
                states: { type: 'redis', host: ['10.0.0.1', '10.0.0.2'], port: [26379, 26380] },
            } as unknown as ioBroker.IoBrokerJson;

            const env = buildPythonEnv(sentinel, 0);

            assert.equal(env.IOB_STATES_HOST, '10.0.0.1');
            assert.equal(env.IOB_STATES_PORT, '26379');
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

        it('refuses a Sentinel configuration and names the section', () => {
            // The host entries of a sentinel setup are sentinels, not databases. Flattened to
            // host[0] a Python adapter would connect to one of them as if it were a plain Redis
            // and fail looking like a network problem -- refusing with the reason is the honest
            // alternative until the topology can be passed through.
            const config = {
                states: { type: 'redis', host: ['10.0.0.1', '10.0.0.2'], port: [26379, 26380] },
                objects: { type: 'jsonl', host: '127.0.0.1', port: 9001 },
            } as unknown as ioBroker.IoBrokerJson;

            const reason = unsupportedPythonDbConfig(config);

            assert.ok(reason);
            assert.match(reason, /states/);
            assert.match(reason, /Sentinel/);
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
});
