import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import { joinMaster, pointsToLoopback } from '@/lib/controller/host/multihostJoin.js';
import type { MHConnectResult } from '@iobroker/js-controller-common';

const silentLogger = {
    silly: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
} as any;

const MASTER = '192.168.1.2';

/** The configuration of a fresh host, as an image ships it */
const FRESH_CONFIG = {
    system: { hostname: 'fresh' },
    multihostService: { enabled: false, secure: false, password: '', persist: false, pairing: true },
    objects: { type: 'jsonl', host: '127.0.0.1', port: 9001 },
    states: { type: 'jsonl', host: '127.0.0.1', port: 9000 },
};

/**
 * What a master hands out
 *
 * @param host the host of both databases
 */
function masterDatabases(host: string | string[] = MASTER): MHConnectResult {
    return {
        objects: { type: 'jsonl', host, port: 9001 } as any,
        states: { type: 'jsonl', host, port: 9000 } as any,
        address: MASTER,
    };
}

describe('lib/controller/host/multihostJoin: pointsToLoopback', () => {
    it('recognizes the loopback addresses, also in a list of Sentinel addresses', () => {
        assert.strictEqual(pointsToLoopback('127.0.0.1'), true);
        assert.strictEqual(pointsToLoopback('::1'), true);
        assert.strictEqual(pointsToLoopback('localhost'), true);
        assert.strictEqual(pointsToLoopback(['192.168.1.2', '127.0.0.1']), true);
    });

    it('takes a "listen all" and a real address for what they are', () => {
        assert.strictEqual(pointsToLoopback('0.0.0.0'), false);
        assert.strictEqual(pointsToLoopback(MASTER), false);
        assert.strictEqual(pointsToLoopback([MASTER, '192.168.1.3']), false);
        assert.strictEqual(pointsToLoopback(undefined), false);
    });
});

describe('lib/controller/host/multihostJoin: joinMaster', () => {
    let dir: string;
    let configFile: string;

    beforeEach(async () => {
        dir = await fs.mkdtemp(path.join(os.tmpdir(), 'iob-join-'));
        configFile = path.join(dir, 'iobroker.json');
        await fs.writeJson(configFile, FRESH_CONFIG);
    });

    afterEach(async () => {
        await fs.remove(dir);
    });

    /**
     * Join with a master that answers with the given databases
     *
     * @param databases what the master hands out
     */
    function join(databases: MHConnectResult | Error = masterDatabases()): ReturnType<typeof joinMaster> {
        return joinMaster({
            ip: MASTER,
            password: '',
            configFile,
            fetchDatabases: () => (databases instanceof Error ? Promise.reject(databases) : Promise.resolve(databases)),
            logger: silentLogger,
            hostLogPrefix: 'host.fresh',
        });
    }

    it('stores the databases of the master and switches the pairing off', async () => {
        assert.deepStrictEqual(await join(), { result: true });

        const config = await fs.readJson(configFile);
        assert.strictEqual(config.objects.host, MASTER);
        assert.strictEqual(config.states.host, MASTER);
        assert.strictEqual(config.multihostService.pairing, false, 'the host is not a fresh one any more');
        assert.strictEqual(config.system.hostname, 'fresh', 'everything else stays');
        assert.strictEqual(await fs.pathExists(`${configFile}.tmp`), false);
    });

    it('replaces a "listen all" address by the address of the master', async () => {
        assert.strictEqual((await join(masterDatabases('0.0.0.0'))).result, true);

        const config = await fs.readJson(configFile);
        assert.strictEqual(config.objects.host, MASTER);
        assert.strictEqual(config.states.host, MASTER);
    });

    it('refuses a master that points back to a local database, for every database type', async () => {
        for (const host of ['127.0.0.1', ['192.168.1.3', '127.0.0.1']]) {
            const databases = masterDatabases(host);
            (databases.objects as any).type = 'redis';

            const result = await join(databases);

            assert.strictEqual(result.result, false, JSON.stringify(host));
            assert.match(result.error!, /points back to a local database/);
        }
        assert.deepStrictEqual(await fs.readJson(configFile), FRESH_CONFIG, 'nothing was written');
        assert.strictEqual(await fs.pathExists(`${configFile}.bak`), false);
    });

    it('keeps the first configuration as backup, and only the first', async () => {
        assert.strictEqual((await join()).result, true);
        assert.deepStrictEqual(await fs.readJson(`${configFile}.bak`), FRESH_CONFIG);

        assert.strictEqual((await join(masterDatabases('192.168.1.99'))).result, true);
        assert.deepStrictEqual(
            await fs.readJson(`${configFile}.bak`),
            FRESH_CONFIG,
            'a second join must not overwrite the way back',
        );
        assert.strictEqual((await fs.readJson(configFile)).objects.host, '192.168.1.99');
    });

    it('answers the error of the master and leaves the configuration alone', async () => {
        assert.deepStrictEqual(await join(new Error('invalid password')), { result: false, error: 'invalid password' });
        assert.deepStrictEqual(await fs.readJson(configFile), FRESH_CONFIG);
    });

    it('leaves the old configuration intact when the new one cannot be stored', async () => {
        // a directory where the temporary file has to go makes the write fail
        await fs.mkdir(`${configFile}.tmp`);

        const result = await join();

        assert.strictEqual(result.result, false);
        assert.match(result.error!, /Cannot store new configuration/);
        assert.deepStrictEqual(await fs.readJson(configFile), FRESH_CONFIG);
    });
});
