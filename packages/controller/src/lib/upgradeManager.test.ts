import assert from 'node:assert/strict';

import { sanitizeUpgradeOutput } from './upgradeManager.js';

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
