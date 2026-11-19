import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import type http from 'node:http';
import os from 'node:os';
import path from 'node:path';

import fs from 'fs-extra';

import { getWindowsServiceInstallation } from '@iobroker/js-controller-common-db/tools';
import { isUpgradeStatusRequest, sanitizeUpgradeOutput, sendUpgradeResponse } from './upgradeManager.js';

describe('lib/upgradeManager: status request', () => {
    it('accepts only the dedicated status endpoint', () => {
        assert.strictEqual(isUpgradeStatusRequest('/controller-upgrade-status'), true);
        assert.strictEqual(isUpgradeStatusRequest('/controller-upgrade-status?cacheBust=1'), true);
        assert.strictEqual(isUpgradeStatusRequest('/'), false);
        assert.strictEqual(isUpgradeStatusRequest('/socket.io/?EIO=4&transport=polling'), false);
        assert.strictEqual(isUpgradeStatusRequest('/favicon.ico'), false);
        assert.strictEqual(isUpgradeStatusRequest(undefined), false);
    });
});

describe('lib/upgradeManager: status response', () => {
    it('waits until the final response was flushed before invoking the shutdown callback', () => {
        const emitter = new EventEmitter();
        let statusCode: number | undefined;
        let headers: http.OutgoingHttpHeaders | undefined;
        let body: string | undefined;
        let finalResponseDelivered = false;
        const res = Object.assign(emitter, {
            writeHead: (code: number, responseHeaders: http.OutgoingHttpHeaders): void => {
                statusCode = code;
                headers = responseHeaders;
            },
            end: (responseBody: string): void => {
                body = responseBody;
            },
        }) as unknown as http.ServerResponse;

        sendUpgradeResponse(
            res,
            { running: false, stderr: [], stdout: ['done'], success: true },
            () => (finalResponseDelivered = true),
        );

        assert.strictEqual(statusCode, 200);
        assert.strictEqual(headers?.Connection, 'close');
        assert.strictEqual(headers?.['Content-Type'], 'application/json');
        assert.deepStrictEqual(JSON.parse(body!), {
            running: false,
            stderr: [],
            stdout: ['done'],
            success: true,
        });
        assert.strictEqual(finalResponseDelivered, false);

        emitter.emit('finish');

        assert.strictEqual(finalResponseDelivered, true);
    });

    it('does not invoke the shutdown callback for an intermediate response', () => {
        const emitter = new EventEmitter();
        let headers: http.OutgoingHttpHeaders | undefined;
        let finalResponseDelivered = false;
        const res = Object.assign(emitter, {
            writeHead: (_code: number, responseHeaders: http.OutgoingHttpHeaders): void => {
                headers = responseHeaders;
            },
            end: (): void => undefined,
        }) as unknown as http.ServerResponse;

        sendUpgradeResponse(res, { running: true, stderr: [], stdout: [] }, () => (finalResponseDelivered = true));
        emitter.emit('finish');

        assert.strictEqual(headers?.Connection, undefined);
        assert.strictEqual(finalResponseDelivered, false);
    });
});

describe('lib/upgradeManager: output sanitizing', () => {
    it('replaces the complete generated certificate object', () => {
        const output = JSON.stringify(
            {
                defaultPrivate: '-----BEGIN PRIVATE KEY-----\nprivate\n-----END PRIVATE KEY-----',
                defaultPublic: '-----BEGIN CERTIFICATE-----\npublic\n-----END CERTIFICATE-----',
            },
            null,
            2,
        );

        assert.strictEqual(
            sanitizeUpgradeOutput(output),
            'Certificate configuration updated (certificate contents omitted)',
        );
    });

    it('redacts standalone private keys and certificates as a fallback', () => {
        const output = [
            '-----BEGIN PRIVATE KEY-----',
            'private',
            '-----END PRIVATE KEY-----',
            '-----BEGIN CERTIFICATE-----',
            'public',
            '-----END CERTIFICATE-----',
        ].join('\n');
        const sanitized = sanitizeUpgradeOutput(output);

        assert.ok(!sanitized.includes('private'));
        assert.ok(!sanitized.includes('public'));
        assert.ok(sanitized.includes('[REDACTED PRIVATE KEY]'));
        assert.ok(sanitized.includes('[REDACTED CERTIFICATE]'));
    });
});

describe('lib/upgradeManager: Windows service detection', () => {
    let tempDir: string;

    beforeEach(async () => {
        tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'iobroker-winsw-test-'));
    });

    afterEach(async () => {
        await fs.remove(tempDir);
    });

    it('detects a same-named WinSW executable and XML configuration', async () => {
        const daemonDir = path.join(tempDir, 'daemon');
        const executable = path.join(daemonDir, 'iob_test.exe');
        const config = path.join(daemonDir, 'iob_test.xml');
        await fs.ensureDir(daemonDir);
        await fs.writeFile(executable, '');
        await fs.writeFile(config, '<service/>');

        assert.deepStrictEqual(getWindowsServiceInstallation(tempDir, {}), { executable, config });
    });

    it('does not accept an XML configuration without a same-named executable', async () => {
        const daemonDir = path.join(tempDir, 'daemon');
        await fs.ensureDir(daemonDir);
        await fs.writeFile(path.join(daemonDir, 'iob_test.xml'), '<service/>');

        assert.strictEqual(getWindowsServiceInstallation(tempDir, {}), undefined);
    });
});
