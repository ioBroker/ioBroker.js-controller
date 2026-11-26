import assert from 'node:assert/strict';

import {
    escapeWindowsServiceXml,
    removeStaleWindowsUpgradeHelper,
    validateControllerUpgradeArguments,
} from './systemChecks.js';

function serviceControlError(code: number): Error & { code: number } {
    return Object.assign(new Error(`[SC] OpenService FAILED ${code}`), { code });
}

describe('lib/controller/host/systemChecks: controller upgrade arguments', () => {
    it('accepts a valid version and admin instance', () => {
        assert.doesNotThrow(() => validateControllerUpgradeArguments('8.0.0', 0));
    });

    it('rejects invalid versions before starting the upgrade manager', () => {
        assert.throws(() => validateControllerUpgradeArguments('latest', 0), /Invalid version/);
        assert.throws(() => validateControllerUpgradeArguments(undefined, 0), /Invalid version/);
    });

    it('rejects invalid or manipulated admin instances', () => {
        assert.throws(() => validateControllerUpgradeArguments('8.0.0', -1), /Invalid admin instance/);
        assert.throws(() => validateControllerUpgradeArguments('8.0.0', 1.5), /Invalid admin instance/);
        assert.throws(
            () =>
                validateControllerUpgradeArguments(
                    '8.0.0',
                    '1</arguments><prestart><executable>cmd.exe</executable></prestart><arguments>',
                ),
            /Invalid admin instance/,
        );
    });

    it('escapes every XML control character in helper arguments', () => {
        assert.strictEqual(escapeWindowsServiceXml('&<>"\''), '&amp;&lt;&gt;&quot;&apos;');
        assert.strictEqual(escapeWindowsServiceXml('1</arguments><prestart>'), '1&lt;/arguments&gt;&lt;prestart&gt;');
    });
});

describe('lib/controller/host/systemChecks: stale Windows upgrade helper', () => {
    it('removes a stale config when the helper service does not exist', async () => {
        const removed: string[] = [];

        await removeStaleWindowsUpgradeHelper(
            'upgrade_helper',
            'upgrade_helper.xml',
            () => Promise.reject(serviceControlError(1060)),
            file => {
                removed.push(file);
                return Promise.resolve();
            },
        );

        assert.deepStrictEqual(removed, ['upgrade_helper.xml']);
    });

    it('stops and deletes an existing helper before removing its config', async () => {
        const commands: string[][] = [];
        const events: string[] = [];
        let queryCount = 0;

        await removeStaleWindowsUpgradeHelper(
            'upgrade_helper',
            'upgrade_helper.xml',
            (_file, args) => {
                commands.push([...args]);
                if (args[0] === 'query') {
                    queryCount++;
                    if (queryCount === 3) {
                        return Promise.reject(serviceControlError(1060));
                    }
                }
                if (args[0] === 'stop') {
                    return Promise.reject(serviceControlError(1062));
                }
                return Promise.resolve();
            },
            file => {
                events.push(`remove ${file}`);
                return Promise.resolve();
            },
            delay => {
                events.push(`wait ${delay}`);
                return Promise.resolve();
            },
        );

        assert.deepStrictEqual(commands, [
            ['query', 'upgrade_helper'],
            ['stop', 'upgrade_helper'],
            ['delete', 'upgrade_helper'],
            ['query', 'upgrade_helper'],
            ['query', 'upgrade_helper'],
        ]);
        assert.deepStrictEqual(events, ['wait 250', 'remove upgrade_helper.xml']);
    });

    it('does not hide unexpected service control errors', async () => {
        const error = serviceControlError(5);
        let configRemoved = false;

        await assert.rejects(
            removeStaleWindowsUpgradeHelper(
                'upgrade_helper',
                'upgrade_helper.xml',
                () => Promise.reject(error),
                () => {
                    configRemoved = true;
                    return Promise.resolve();
                },
            ),
            error,
        );

        assert.strictEqual(configRemoved, false);
    });
});
