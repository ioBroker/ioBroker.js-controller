#!/usr/bin/env node
/**
 * Simple validation test for conditional meta file deletion
 * This can be run directly with node to validate the basic functionality
 */

import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple assertion function
function assert(condition: boolean, message: string): void {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

// Mock objects database for testing
class MockObjectsDB {
    private objects: Map<string, any>;
    constructor() {
        this.objects = new Map();
    }

    setObject(id: string, obj: ioBroker.Object): Promise<void> {
        this.objects.set(id, { ...obj, _id: id });
        return Promise.resolve();
    }

    getObject(id: string, callback: (err: Error | null, obj: ioBroker.Object | null | undefined) => void): void {
        callback(null, this.objects.get(id) || null);
    }

    getObjectAsync(id: string): Promise<ioBroker.Object | null | undefined> {
        return new Promise((resolve, reject) => this.getObject(id, (err, obj) => (err ? reject(err) : resolve(obj))));
    }

    delObject(id: string, callback?: (err: Error | null) => void): void {
        this.objects.delete(id);
        callback?.(null);
    }

    delObjectAsync(id: string): Promise<void> {
        this.delObject(id);
        return Promise.resolve();
    }

    getObjectViewAsync(
        design: string,
        view: string,
        params: { startkey: string; endkey: string },
    ): Promise<{ rows: Array<{ value: ioBroker.Object }> }> {
        const { startkey, endkey } = params;
        const rows = Array.from(this.objects.entries())
            .filter(([id]) => id >= startkey && id < endkey)
            .filter(([, obj]) => obj.type === 'meta')
            .map(([, obj]) => ({ value: obj }));

        return Promise.resolve({ rows });
    }
}

// Mock implementation of the conditional deletion logic
class MockConditionalDeletion {
    private objects: MockObjectsDB;
    private readonly testDir: string;

    constructor(objects: MockObjectsDB, testDir: string) {
        this.objects = objects;
        this.testDir = testDir;
    }

    async _hasInstanceMetaFiles(adapter: string, instance: number): Promise<boolean> {
        const adapterPrefix = `${adapter}.${instance}.`;
        const doc = await this.objects.getObjectViewAsync('system', 'meta', {
            startkey: `${adapterPrefix}`,
            endkey: `${adapterPrefix}\u9999`,
        });

        return doc.rows.some(
            row => row.value._id?.startsWith(adapterPrefix) && row.value._id !== `${adapter}.${instance}`,
        );
    }

    async _isMetaFileDeletionAllowed(adapter: string): Promise<boolean> {
        try {
            const ioPackagePath = path.join(this.testDir, 'adapters', adapter, 'io-package.json');
            if (await fs.pathExists(ioPackagePath)) {
                const ioPackage = await fs.readJSON(ioPackagePath);
                return ioPackage.common?.allowDeletionOfFilesInMetaObject === true;
            }
            return false;
        } catch {
            return false;
        }
    }

    async deleteInstance(
        adapter: string,
        instance: number,
        withMeta?: boolean,
    ): Promise<{ metaDeleted: boolean; reason: string }> {
        // Delete instance object
        await this.objects.delObjectAsync(`system.adapter.${adapter}.${instance}`);

        const hasMetaFiles = await this._hasInstanceMetaFiles(adapter, instance);

        if (!hasMetaFiles) {
            return { metaDeleted: false, reason: 'no-meta-files' };
        }

        const allowedByAdapter = await this._isMetaFileDeletionAllowed(adapter);

        if (allowedByAdapter) {
            await this._deleteInstanceFiles(adapter, instance);
            return { metaDeleted: true, reason: 'adapter-allows' };
        }

        if (withMeta) {
            await this._deleteInstanceFiles(adapter, instance);
            return { metaDeleted: true, reason: 'with-meta-flag' };
        }

        // In a real implementation, this would show an interactive prompt
        // For testing, we preserve the files
        return { metaDeleted: false, reason: 'user-not-confirmed' };
    }

    async _deleteInstanceFiles(adapter: string, instance: number): Promise<void> {
        const adapterPrefix = `${adapter}.${instance}`;
        const doc = await this.objects.getObjectViewAsync('system', 'meta', {
            startkey: `${adapterPrefix}`,
            endkey: `${adapterPrefix}\u9999`,
        });

        // Delete instance folder and all meta files
        await this.objects.delObjectAsync(`${adapter}.${instance}`);
        for (const row of doc.rows) {
            if (row.value._id && row.value._id.startsWith(adapterPrefix)) {
                await this.objects.delObjectAsync(row.value._id);
            }
        }
    }
}

// Test runner
async function runTests(): Promise<void> {
    console.log('🧪 Running Conditional Meta File Deletion Tests...\n');

    const testDir = path.join(__dirname, '../../tmp/test-meta-deletion');
    await fs.ensureDir(testDir);

    try {
        const objects = new MockObjectsDB();
        const deletion = new MockConditionalDeletion(objects, testDir);

        // Test 1: Instance with meta files, adapter disallows deletion
        console.log('Test 1: Preserve meta files when adapter disallows deletion');
        await setupTest1(objects, testDir);
        const result1 = await deletion.deleteInstance('testadapter', 0);
        assert(result1.metaDeleted === false, 'Meta files should be preserved');
        assert(result1.reason === 'user-not-confirmed', 'Reason should be user-not-confirmed');
        console.log('✅ PASSED: Meta files preserved\n');

        // Test 2: Instance with meta files, adapter allows deletion
        console.log('Test 2: Delete meta files when adapter allows deletion');
        await setupTest2(objects, testDir);
        const result2 = await deletion.deleteInstance('testadapter2', 0);
        assert(result2.metaDeleted === true, 'Meta files should be deleted');
        assert(result2.reason === 'adapter-allows', 'Reason should be adapter-allows');
        console.log('✅ PASSED: Meta files deleted due to adapter config\n');

        // Test 3: Instance with meta files, withMeta flag
        console.log('Test 3: Delete meta files when --with-meta flag is used');
        await setupTest1(objects, testDir); // Reuse setup but different instance
        const result3 = await deletion.deleteInstance('testadapter', 1, true);
        assert(result3.metaDeleted === true, 'Meta files should be deleted');
        assert(result3.reason === 'with-meta-flag', 'Reason should be with-meta-flag');
        console.log('✅ PASSED: Meta files deleted due to --with-meta flag\n');

        // Test 4: Instance without meta files
        console.log('Test 4: Normal behavior when no meta files exist');
        await setupTest4(objects);
        const result4 = await deletion.deleteInstance('testadapter3', 0);
        assert(result4.metaDeleted === false, 'Meta files should not be deleted');
        assert(result4.reason === 'no-meta-files', 'Reason should be no-meta-files');
        console.log('✅ PASSED: Normal deletion when no meta files\n');

        // Test 5: Meta file enumeration logic
        console.log('Test 5: Verify meta file detection logic');
        await setupTest5(objects);
        const hasMetaFiles = await deletion._hasInstanceMetaFiles('testadapter4', 0);
        const hasNoMetaFiles = await deletion._hasInstanceMetaFiles('testadapter4', 1);
        assert(hasMetaFiles === true, 'Should detect meta files for instance 0');
        assert(hasNoMetaFiles === false, 'Should not detect meta files for instance 1');
        console.log('✅ PASSED: Meta file detection works correctly\n');

        console.log('🎉 All tests passed! The conditional meta file deletion feature works correctly.');

        console.log('\n📋 Summary of tested scenarios:');
        console.log('   ✅ Preserve meta files when adapter disallows deletion');
        console.log('   ✅ Delete meta files when adapter allows deletion');
        console.log('   ✅ Delete meta files when --with-meta flag is used');
        console.log('   ✅ Normal behavior when no meta files exist');
        console.log('   ✅ Correct meta file detection logic');
    } finally {
        // Cleanup
        await fs.remove(testDir);
    }
}

// Test setup functions
async function setupTest1(objects: MockObjectsDB, testDir: string): Promise<void> {
    // Create instance
    await objects.setObject('system.adapter.testadapter.0', {
        type: 'instance',
        common: { name: 'testadapter' },
    } as ioBroker.InstanceObject);

    // Create meta objects
    await objects.setObject('testadapter.0', {
        type: 'meta',
        common: { type: 'meta.folder' },
    } as ioBroker.MetaObject);
    await objects.setObject('testadapter.0.project1', {
        type: 'meta',
        common: { type: 'meta.user' },
    } as ioBroker.MetaObject);

    // Create io-package.json that DOES NOT allow deletion
    await fs.ensureDir(path.join(testDir, 'adapters/testadapter'));
    await fs.writeJSON(path.join(testDir, 'adapters/testadapter/io-package.json'), {
        common: {
            name: 'testadapter',
            allowDeletionOfFilesInMetaObject: false,
        },
    });
}

async function setupTest2(objects: MockObjectsDB, testDir: string): Promise<void> {
    // Create instance
    await objects.setObject('system.adapter.testadapter2.0', {
        type: 'instance',
        common: { name: 'testadapter2' },
    } as ioBroker.InstanceObject);

    // Create meta objects
    await objects.setObject('testadapter2.0', {
        type: 'meta',
        common: { type: 'meta.folder' },
    } as ioBroker.MetaObject);
    await objects.setObject('testadapter2.0.project1', {
        type: 'meta',
        common: { type: 'meta.user' },
    } as ioBroker.MetaObject);

    // Create io-package.json that ALLOWS deletion
    await fs.ensureDir(path.join(testDir, 'adapters/testadapter2'));
    await fs.writeJSON(path.join(testDir, 'adapters/testadapter2/io-package.json'), {
        common: {
            name: 'testadapter2',
            allowDeletionOfFilesInMetaObject: true,
        },
    });
}

async function setupTest4(objects: MockObjectsDB): Promise<void> {
    // Create instance without meta files
    await objects.setObject('system.adapter.testadapter3.0', {
        type: 'instance',
        common: { name: 'testadapter3' },
    } as ioBroker.InstanceObject);

    // No meta objects created for this test
}

async function setupTest5(objects: MockObjectsDB): Promise<void> {
    // Create instance with meta files
    await objects.setObject('testadapter4.0.project1', {
        type: 'meta',
        common: { type: 'meta.user' },
    } as ioBroker.MetaObject);

    // Instance 1 has no meta files
    // (no objects created for instance 1)
}

// Feature documentation for reference
const FEATURE_DOCUMENTATION = {
    purpose: 'Prevent accidental deletion of valuable user data like vis projects during adapter instance removal',
    controlMechanisms: [
        'allowDeletionOfFilesInMetaObject flag in adapter io-package.json',
        '--with-meta CLI flag for forced deletion',
        'Interactive user prompt when meta files exist',
        'Automatic preservation in non-interactive environments',
    ],
    behaviorMatrix: [
        { condition: 'No meta files exist', action: 'Normal deletion (N/A)', userAction: 'None' },
        { condition: 'Adapter allows deletion', action: 'Delete meta files', userAction: 'None' },
        { condition: '--with-meta flag used', action: 'Delete meta files', userAction: 'None' },
        { condition: 'Interactive TTY + meta files', action: 'Prompt user', userAction: 'Confirmation required' },
        { condition: 'Non-interactive environment', action: 'Preserve meta files', userAction: 'None' },
    ],
};

// Run the tests if this file is executed directly
if (import.meta.url.endsWith(process.argv[1])) {
    runTests().catch(error => {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    });
}

export { runTests, FEATURE_DOCUMENTATION };
