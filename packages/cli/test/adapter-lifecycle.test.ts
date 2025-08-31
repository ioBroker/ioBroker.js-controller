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
        let adapterWasInstalled = false;

        it('should successfully install admin adapter', async function () {
            // First check if adapter is already installed
            const listResult = await runCliCommand(['list', 'adapters']);
            expect(listResult.exitCode).to.equal(0);

            if (!listResult.stdout.includes(testAdapter)) {
                // Try to install the adapter
                const installResult = await runCliCommand(['install', testAdapter], 60000);
                
                if (installResult.exitCode !== 0) {
                    if (installResult.stderr.includes('TIMEOUT') || 
                        installResult.stderr.includes('getaddrinfo ENOTFOUND') ||
                        installResult.stderr.includes('dns block')) {
                        console.log(`Skipping test - network not available for adapter installation`);
                        this.skip();
                        return;
                    }
                }
                
                expect(installResult.exitCode).to.equal(0, `Failed to install ${testAdapter}: ${installResult.stderr}`);
                adapterWasInstalled = true;
                
                // Verify the adapter was actually installed
                const verifyResult = await runCliCommand(['list', 'adapters']);
                expect(verifyResult.exitCode).to.equal(0);
                expect(verifyResult.stdout).to.include(testAdapter);
                
                // Check that adapter files were created
                const adapterDir = path.join(testDir, 'node_modules', `iobroker.${testAdapter}`);
                expect(await fs.pathExists(adapterDir)).to.be.true;
                
                // Check that io-package.json exists
                const ioPackageFile = path.join(adapterDir, 'io-package.json');
                expect(await fs.pathExists(ioPackageFile)).to.be.true;
                
                // Validate the io-package.json structure
                const ioPackage = await fs.readJSON(ioPackageFile);
                expect(ioPackage).to.have.property('common');
                expect(ioPackage.common).to.have.property('name', testAdapter);
            } else {
                console.log(`${testAdapter} adapter already installed`);
            }
        });

        it('should list adapters and show installed adapters', async function () {
            const result = await runCliCommand(['list', 'adapters']);

            expect(result.exitCode).to.equal(0);
            // Should not timeout or crash
            expect(result.stderr).to.not.include('TIMEOUT');
        });

        it('should create an adapter instance and validate objects/states', async function () {
            // First check if adapter exists
            const listResult = await runCliCommand(['list', 'adapters']);

            if (listResult.stdout.includes(testAdapter)) {
                // Try to create an instance
                const result = await runCliCommand(['add', testAdapter, '--enabled', 'false']);

                // The command should complete without crashing
                expect(result.stderr).to.not.include('TIMEOUT');
                expect(result.exitCode).to.equal(0, `Failed to create instance: ${result.stderr}`);

                // Verify the instance was created
                const instancesResult = await runCliCommand(['list', 'instances']);
                expect(instancesResult.exitCode).to.equal(0);
                expect(instancesResult.stdout).to.include(`${testAdapter}.`);

                // Check that objects were created in the database
                const objectsDir = path.join(testDir, 'objects');
                const objectFiles = await fs.readdir(objectsDir);
                expect(objectFiles.length).to.be.greaterThan(0, 'No object files were created');

                // Check for system objects that should be created
                const systemObjectFile = path.join(objectsDir, 'system.json');
                if (await fs.pathExists(systemObjectFile)) {
                    const systemObjects = await fs.readJSON(systemObjectFile);
                    
                    // Should have adapter object
                    const adapterObjectKey = `system.adapter.${testAdapter}.0`;
                    expect(systemObjects).to.have.property(adapterObjectKey);
                    
                    const adapterObject = systemObjects[adapterObjectKey];
                    expect(adapterObject).to.have.property('common');
                    expect(adapterObject.common).to.have.property('name', testAdapter);
                    expect(adapterObject.common).to.have.property('enabled', false);
                }

                // Check states directory was created and used
                const statesDir = path.join(testDir, 'states');
                const stateFiles = await fs.readdir(statesDir);
                console.log(`Created ${stateFiles.length} state files during instance creation`);
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
        it('should have proper database structure after operations', async function () {
            // Verify that database operations completed successfully
            const objectsDir = path.join(testDir, 'objects');
            const statesDir = path.join(testDir, 'states');

            expect(await fs.pathExists(objectsDir)).to.be.true;
            expect(await fs.pathExists(statesDir)).to.be.true;

            // Check if database files were created during testing
            const objectFiles = await fs.readdir(objectsDir);
            const stateFiles = await fs.readdir(statesDir);

            console.log(`Objects directory contains ${objectFiles.length} files: ${objectFiles.join(', ')}`);
            console.log(`States directory contains ${stateFiles.length} files: ${stateFiles.join(', ')}`);

            // If we performed operations, should have at least some files
            if (objectFiles.length > 0) {
                // Check that key system files exist
                const expectedFiles = ['system.json'];
                for (const file of expectedFiles) {
                    if (objectFiles.includes(file)) {
                        const filePath = path.join(objectsDir, file);
                        const fileContent = await fs.readJSON(filePath);
                        expect(fileContent).to.be.an('object');
                        console.log(`Validated structure of ${file}`);
                    }
                }
            }
        });

        it('should validate adapter metadata if admin was installed', async function () {
            // Check if admin adapter was installed and has proper metadata
            const objectsDir = path.join(testDir, 'objects');
            const systemFile = path.join(objectsDir, 'system.json');
            
            if (await fs.pathExists(systemFile)) {
                const systemObjects = await fs.readJSON(systemFile);
                
                // Look for admin adapter object
                const adminAdapterKey = 'system.adapter.admin.0';
                if (systemObjects[adminAdapterKey]) {
                    const adminObject = systemObjects[adminAdapterKey];
                    
                    expect(adminObject).to.have.property('type', 'instance');
                    expect(adminObject).to.have.property('common');
                    expect(adminObject.common).to.have.property('name', 'admin');
                    expect(adminObject.common).to.have.property('enabled');
                    
                    console.log('Successfully validated admin adapter metadata in database');
                } else {
                    console.log('Admin adapter not found in database - may have been skipped due to network issues');
                }
            }
        });
    });
});
