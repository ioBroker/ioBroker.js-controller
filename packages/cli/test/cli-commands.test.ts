import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import fs from 'fs-extra';
import path from 'node:path';
import { spawn } from 'node:child_process';
import * as url from 'node:url';

// eslint-disable-next-line unicorn/prefer-module
const thisDir = url.fileURLToPath(new URL('.', import.meta.url || `file://${__filename}`));

const testDir = path.join(thisDir, 'testData');
const testConfigPath = path.join(testDir, 'iobroker.json');

/**
 * Test configuration for CLI tests
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
        port: 19001,
        dataDir: path.join(testDir, 'objects'),
    },
    states: {
        type: 'file',
        host: '127.0.0.1',
        port: 19000,
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
 * Helper function to run CLI commands
 *
 * @param args - CLI command arguments to pass
 * @param timeout - Command timeout in milliseconds
 */
function runCliCommand(
    args: string[],
    timeout = 30000,
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

describe('CLI Commands Integration Tests', function () {
    this.timeout(60000); // Increase timeout for CLI operations

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

    describe('Basic CLI Command Functionality', function () {
        it('should handle version command', async function () {
            const result = await runCliCommand(['version']);

            expect(result.exitCode).to.equal(0);
            expect(result.stdout).to.match(/\d+\.\d+\.\d+/); // Should contain version number
        });

        it('should handle help command', async function () {
            const result = await runCliCommand(['--help']);

            expect(result.exitCode).to.equal(0);
            expect(result.stdout).to.include('Commands:'); // Adjusted to match actual output
        });

        it('should handle list adapters command', async function () {
            const result = await runCliCommand(['list', 'adapters']);

            // Should succeed even with empty adapter list
            expect(result.exitCode).to.equal(0);
        });

        it('should handle list instances command', async function () {
            const result = await runCliCommand(['list', 'instances']);

            // Should succeed even with empty instance list
            expect(result.exitCode).to.equal(0);
        });

        it('should handle invalid command gracefully', async function () {
            const result = await runCliCommand(['invalid-command-xyz']);

            // Should return non-zero exit code for invalid command
            expect(result.exitCode).to.not.equal(0);
        });
    });

    describe('Configuration and Setup', function () {
        it('should validate configuration file exists', async function () {
            const configExists = await fs.pathExists(testConfigPath);
            expect(configExists).to.be.true;

            const config = await fs.readJSON(testConfigPath);
            expect(config).to.have.property('objects');
            expect(config).to.have.property('states');
            expect(config.objects.type).to.equal('file');
            expect(config.states.type).to.equal('file');
        });

        it('should have valid test directory structure', async function () {
            const objectsDir = path.join(testDir, 'objects');
            const statesDir = path.join(testDir, 'states');

            expect(await fs.pathExists(objectsDir)).to.be.true;
            expect(await fs.pathExists(statesDir)).to.be.true;
        });
    });

    describe('Adapter Management Commands', function () {
        it('should handle list repositories command', async function () {
            const result = await runCliCommand(['repo', 'list']);

            expect(result.exitCode).to.equal(0);
        });

        it('should handle info command for non-existent adapter gracefully', async function () {
            const result = await runCliCommand(['info', 'non-existent-adapter-xyz123']);

            // The command may succeed but should handle gracefully (not crash)
            // We don't require a specific exit code, just that it doesn't timeout or crash
            expect(result.stderr).to.not.include('TIMEOUT');
            expect(result.stderr).to.not.include('ENOENT');
        });
    });
});
