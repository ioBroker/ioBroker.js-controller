import assert from 'node:assert/strict';
import path from 'node:path';
import { buildPythonEnv, getPythonInterpreter, isPythonAdapter, resolvePythonEntry } from '../src/lib/pythonRuntime.js';

describe('pythonRuntime', () => {
    describe('isPythonAdapter', () => {
        it('only reacts to the explicit marker', () => {
            assert.equal(isPythonAdapter({ runtime: 'python' }), true);
            // Everything without the marker must keep the Node path, including
            // the shapes that actually occur: no field, empty object, missing
            // common section entirely.
            assert.equal(isPythonAdapter({}), false);
            assert.equal(isPythonAdapter(undefined), false);
            assert.equal(isPythonAdapter(null), false);
            assert.equal(isPythonAdapter({ runtime: 'Python' }), false);
        });
    });

    describe('getPythonInterpreter', () => {
        it('points into the adapter-specific virtual environment', () => {
            const interpreter = getPythonInterpreter('pyexample');

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

        it('rejects a missing main', () => {
            assert.throws(() => resolvePythonEntry('/adapters/iobroker.foo', undefined), /common\.main/);
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

        it('takes the first entry when the host is configured redundantly', () => {
            const sentinel = {
                states: { type: 'redis', host: ['10.0.0.1', '10.0.0.2'], port: [26379, 26380] },
            } as unknown as ioBroker.IoBrokerJson;

            const env = buildPythonEnv(sentinel, 0);

            assert.equal(env.IOB_STATES_HOST, '10.0.0.1');
            assert.equal(env.IOB_STATES_PORT, '26379');
        });
    });
});
