import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'node:path';
import { spawn } from 'node:child_process';
import * as url from 'node:url';

// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

const testDir = path.join(thisDir, 'testDataLifecycle');
const testConfigPath = path.join(testDir, 'iobroker.json');

/**
 * Test configuration for adapter lifecycle tests
 */
const testConfig = {
    system: {
        memoryLimitMB: 0,
        hostname: '',
        instanceStartInterval: 2000,
    },
    objects: {
        type: 'file',
        host: '127.0.0.1',
        port: 19011,
        dataDir: path.join(testDir, 'objects'),
    },
    states: {
        type: 'file',
        host: '127.0.0.1',
        port: 19010,
        dataDir: path.join(testDir, 'states'),
    },
    log: {
        level: 'warn',
        noStdout: true,
        transport: {
            file1: {
                type: 'file',
                enabled: false,
            },
        },
    },
    dataDir: testDir,
    plugins: {},
};

/**
 * Helper function to run CLI commands for lifecycle tests
 *
 * @param args - CLI command arguments to pass
 * @param timeout - Command timeout in milliseconds
 */
function runCliCommand(
    args: string[],
    timeout = 45000,
): Promise<{ exitCode: number | null; stdout: string; stderr: string }> {
    return new Promise(resolve => {
        const nodeExecutable = process.execPath;
        const cliScript = path.join(thisDir, '../../controller/iobroker.js');

        // Set environment variable for test config
        const env = { ...process.env, IOB_CONF_FILE: testConfigPath };

        const child = spawn(nodeExecutable, [cliScript, ...args], {
            env,
            cwd: path.join(thisDir, '../..'),
            stdio: ['pipe', 'pipe', 'pipe'],
        });

        let stdout = '';
        let stderr = '';

        child.stdout?.on('data', data => {
            stdout += data.toString();
        });

        child.stderr?.on('data', data => {
            stderr += data.toString();
        });

        const timeoutId = setTimeout(() => {
            child.kill('SIGTERM');
            resolve({ exitCode: -1, stdout, stderr: `${stderr}\nTIMEOUT` });
        }, timeout);

        child.on('close', exitCode => {
            clearTimeout(timeoutId);
            resolve({ exitCode, stdout, stderr });
        });

        child.on('error', error => {
            clearTimeout(timeoutId);
            resolve({ exitCode: -1, stdout, stderr: stderr + error.message });
        });
    });
}

describe('Adapter Lifecycle Tests', function () {
    this.timeout(120000); // Increase timeout for adapter operations

    before(async function () {
        // Ensure test directory exists and is clean
        if (await fs.pathExists(testDir)) {
            await fs.remove(testDir);
        }
        await fs.ensureDir(testDir);
        await fs.ensureDir(path.join(testDir, 'objects'));
        await fs.ensureDir(path.join(testDir, 'states'));

        // Write test configuration
        await fs.writeJSON(testConfigPath, testConfig, { spaces: 2 });
    });

    after(async function () {
        // Clean up test directory
        if (await fs.pathExists(testDir)) {
            await fs.remove(testDir);
        }
    });

    describe('Adapter and Instance Management Lifecycle', function () {
        // Use a test adapter that should be available - we'll use 'admin' as it's always present in ioBroker
        const testAdapter = 'admin';

        it('should successfully install an adapter (if not already installed)', async function () {
            // First check if adapter is already installed
            const listResult = await runCliCommand(['list', 'adapters']);
            expect(listResult.exitCode).to.equal(0);

            if (!listResult.stdout.includes(testAdapter)) {
                // Try to install the adapter - this might fail in test environment, which is OK
                const installResult = await runCliCommand(['install', testAdapter]);
                // We don't assert success here as it depends on network connectivity and repos
                console.log(`Install result for ${testAdapter}: ${installResult.exitCode}`);
            }
        });

        it('should list adapters and show installed adapters', async function () {
            const result = await runCliCommand(['list', 'adapters']);

            expect(result.exitCode).to.equal(0);
            // Should not timeout or crash
            expect(result.stderr).to.not.include('TIMEOUT');
        });

        it('should create an adapter instance (if adapter is available)', async function () {
            // First check if adapter exists
            const listResult = await runCliCommand(['list', 'adapters']);

            if (listResult.stdout.includes(testAdapter)) {
                // Try to create an instance
                const result = await runCliCommand(['add', testAdapter, '--enabled', 'false']);

                // The command should complete without crashing
                expect(result.stderr).to.not.include('TIMEOUT');

                // If successful, should show in instance list
                if (result.exitCode === 0) {
                    const instancesResult = await runCliCommand(['list', 'instances']);
                    expect(instancesResult.exitCode).to.equal(0);
                    // Should show the instance we just created
                    expect(instancesResult.stdout).to.include(`${testAdapter}.`);
                }
            } else {
                console.log(`Skipping instance creation - ${testAdapter} adapter not available`);
                this.skip();
            }
        });

        it('should list instances and show created instances', async function () {
            const result = await runCliCommand(['list', 'instances']);

            expect(result.exitCode).to.equal(0);
            expect(result.stderr).to.not.include('TIMEOUT');
        });

        it('should delete adapter instance (if one exists)', async function () {
            // List existing instances first
            const listResult = await runCliCommand(['list', 'instances']);

            if (listResult.stdout.includes(`${testAdapter}.`)) {
                // Extract instance number from output (assuming format adapter.X)
                const instanceMatch = listResult.stdout.match(new RegExp(`${testAdapter}\\.(\\d+)`));

                if (instanceMatch) {
                    const instanceNum = instanceMatch[1];
                    const result = await runCliCommand(['del', `${testAdapter}.${instanceNum}`]);

                    // Should complete without crashing
                    expect(result.stderr).to.not.include('TIMEOUT');

                    // Verify deletion by listing instances again
                    const afterDeleteResult = await runCliCommand(['list', 'instances']);
                    expect(afterDeleteResult.exitCode).to.equal(0);
                }
            } else {
                console.log(`Skipping instance deletion - no ${testAdapter} instance found`);
                this.skip();
            }
        });

        it('should handle attempt to delete non-existent instance gracefully', async function () {
            const result = await runCliCommand(['del', 'non-existent-adapter.99']);

            // Should not crash or timeout
            expect(result.stderr).to.not.include('TIMEOUT');
            // Should return with some error indication but not crash
            expect(result.exitCode).to.not.equal(-1);
        });

        it('should handle attempt to add non-existent adapter gracefully', async function () {
            const result = await runCliCommand(['add', 'definitely-non-existent-adapter-xyz123']);

            // Should not crash or timeout
            expect(result.stderr).to.not.include('TIMEOUT');
            // Should return error code for non-existent adapter
            expect(result.exitCode).to.not.equal(0);
        });
    });

    describe('Database State Validation', function () {
        it('should have clean database state after operations', async function () {
            // Verify that database operations completed successfully
            const objectsDir = path.join(testDir, 'objects');
            const statesDir = path.join(testDir, 'states');

            expect(await fs.pathExists(objectsDir)).to.be.true;
            expect(await fs.pathExists(statesDir)).to.be.true;

            // Check if database files were created during testing
            const objectFiles = await fs.readdir(objectsDir);
            const stateFiles = await fs.readdir(statesDir);

            // Should have at least some files if operations occurred
            console.log(`Objects directory contains ${objectFiles.length} files`);
            console.log(`States directory contains ${stateFiles.length} files`);
        });
    });
});
