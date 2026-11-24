import assert from 'node:assert/strict';
import sinon from 'sinon';
import { tools } from '@iobroker/js-controller-common';
import { WebExtensionProvider } from '@/lib/controller/instances/webExtensionProvider.js';
import { testIdentity, testState } from '@/lib/controller/testing.test-utils.js';
import type { WebExtensionProviderOptions } from '@/lib/controller/instances/webExtensionProvider.js';
import type { InstallQueueEntry } from '@/lib/controller/types.js';

/**
 * Build an instance object as it is stored in the objects database
 *
 * @param id id of the instance
 * @param common Parts of common this test cares about
 * @param native Parts of native this test cares about
 */
function instance(id: string, common: Record<string, any>, native: Record<string, any> = {}): ioBroker.InstanceObject {
    return {
        _id: id as ioBroker.ObjectIDs.Instance,
        type: 'instance',
        common: { name: id.split('.')[2], enabled: true, mode: 'daemon', ...common },
        native,
        instanceObjects: [],
        objects: [],
    } as unknown as ioBroker.InstanceObject;
}

/** The web server of this host */
const web0 = instance('system.adapter.web.0', { host: 'testhost', webExtendable: true });

/**
 * A daemon on the other host which brings a web extension
 *
 * @param webInstance the web server(s) which load the extension
 * @param common Parts of common this test cares about
 */
function frigate(webInstance = 'web.0', common: Record<string, any> = {}): ioBroker.InstanceObject {
    return instance(
        'system.adapter.frigate.0',
        { host: 'otherhost', webExtension: 'lib/web.js', version: '2.1.0', installedVersion: '2.1.0', ...common },
        { webInstance },
    );
}

/**
 * Create a provider whose install queue only records the tasks
 *
 * @param over The parts this test wants to control
 */
function createProvider(over: Partial<WebExtensionProviderOptions> = {}): {
    provider: WebExtensionProvider;
    queued: InstallQueueEntry[];
    options: WebExtensionProviderOptions;
} {
    const queued: InstallQueueEntry[] = [];
    const options: WebExtensionProviderOptions = {
        objects: { extendObject: sinon.stub().resolves() } as any,
        isCompactGroupController: false,
        state: testState(),
        instances: {
            procs: { 'system.adapter.web.0': { config: web0 } },
            installQueue: { push: (entry: InstallQueueEntry) => queued.push(entry) },
        } as any,
        ...testIdentity(),
        ...over,
    };

    const provider = new WebExtensionProvider(options);
    return { provider, queued, options };
}

describe('WebExtensionProvider.getNeededCode', () => {
    it('needs the code of an extension of another host for the web server of this host', async () => {
        const { provider } = createProvider();
        sinon.stub(provider, 'getInstalledVersion').resolves('2.1.0');
        await provider.setInstances([web0, frigate()]);

        assert.deepEqual(provider.getNeededCode(), [
            {
                name: 'frigate',
                version: '2.1.0',
                installedFrom: undefined,
                instanceId: 'system.adapter.frigate.0',
                webServers: ['system.adapter.web.0'],
                extensions: [{ id: 'system.adapter.frigate.0', host: 'otherhost', version: '2.1.0' }],
                hasInstanceHere: false,
            },
        ]);
    });

    it('needs it for every web server of this host with webInstance "*"', async () => {
        const web1 = instance('system.adapter.web.1', { host: 'testhost', webExtendable: true });
        const { provider } = createProvider();
        sinon.stub(provider, 'getInstalledVersion').resolves('2.1.0');
        await provider.setInstances([web0, web1, frigate('*')]);

        assert.deepEqual(provider.getNeededCode()[0].webServers, ['system.adapter.web.0', 'system.adapter.web.1']);
    });

    it('does not take a web server assigned to an IP address of this host as one of this host', async () => {
        const ip = tools.findIPs()[0] ?? '192.168.0.2';
        const webOnIp = instance('system.adapter.web.0', { host: ip, webExtendable: true });
        const { provider } = createProvider();
        await provider.setInstances([webOnIp, frigate()]);

        assert.deepEqual(provider.getNeededCode(), []);
    });

    it('does not need anything without a web server of this host', async () => {
        const otherWeb = instance('system.adapter.web.0', { host: 'otherhost', webExtendable: true });
        const { provider } = createProvider();
        await provider.setInstances([otherWeb, frigate()]);

        assert.deepEqual(provider.getNeededCode(), []);
    });

    it('does not need anything for a disabled web server', async () => {
        const { provider } = createProvider();
        await provider.setInstances([instance(web0._id, { ...web0.common, enabled: false }), frigate()]);

        assert.deepEqual(provider.getNeededCode(), []);
    });

    it('does not need an extension for another web server', async () => {
        const { provider } = createProvider();
        await provider.setInstances([web0, frigate('web.1')]);

        assert.deepEqual(provider.getNeededCode(), []);
    });

    it('does not need an extension of this host, the instance itself is installed here', async () => {
        const { provider } = createProvider();
        await provider.setInstances([web0, frigate('web.0', { host: 'testhost' })]);

        assert.deepEqual(provider.getNeededCode(), []);
    });

    it('leaves an adapter alone which also has an instance on this host', async () => {
        const localFrigate = instance('system.adapter.frigate.1', { host: 'testhost', version: '2.0.0' });
        const { provider } = createProvider();
        await provider.setInstances([web0, frigate(), localFrigate]);

        assert.deepEqual(provider.getNeededCode(), []);
    });

    it('does not need a disabled extension, unless the web server starts disabled extensions', async () => {
        const { provider } = createProvider();
        await provider.setInstances([web0, frigate('web.0', { enabled: false })]);
        assert.deepEqual(provider.getNeededCode(), []);

        const webStartsDisabled = instance(web0._id, web0.common, { startDisabledExtensions: true });
        await provider.setInstances([webStartsDisabled, frigate('web.0', { enabled: false })]);
        assert.equal(provider.getNeededCode().length, 1);
    });

    it('takes the newest version of instances on several other hosts', async () => {
        const frigateOnC = instance(
            'system.adapter.frigate.1',
            { host: 'hostc', webExtension: 'lib/web.js', version: '2.2.0', installedVersion: '2.2.0' },
            { webInstance: 'web.0' },
        );
        const { provider } = createProvider();
        await provider.setInstances([web0, frigate(), frigateOnC]);

        const [needed] = provider.getNeededCode();
        assert.equal(needed.version, '2.2.0');
        assert.equal(needed.instanceId, 'system.adapter.frigate.1');
    });

    it('does not need a Python adapter, a web server cannot load it', async () => {
        const { provider } = createProvider();
        await provider.setInstances([web0, frigate('web.0', { platform: 'Python' })]);

        assert.deepEqual(provider.getNeededCode(), []);
    });
});

describe('WebExtensionProvider.evaluate', () => {
    it('installs a missing adapter without an instance', async () => {
        const { provider, queued } = createProvider();
        sinon.stub(provider, 'getInstalledVersion').resolves(null);
        await provider.setInstances([web0, frigate('web.0', { installedFrom: 'iobroker.frigate@2.1.0' })]);

        assert.equal(queued.length, 1);
        assert.equal(queued[0].id, 'system.adapter.frigate.0');
        assert.equal(queued[0].version, '2.1.0');
        assert.equal(queued[0].installedFrom, 'iobroker.frigate@2.1.0');
        assert.equal(queued[0].disabled, true);
        assert.equal(queued[0].codeOnly?.isInstalled, false);
    });

    it('upgrades an adapter of another version', async () => {
        const { provider, queued } = createProvider();
        sinon.stub(provider, 'getInstalledVersion').resolves('2.0.0');
        await provider.setInstances([web0, frigate()]);

        assert.equal(queued.length, 1);
        assert.equal(queued[0].codeOnly?.isInstalled, true);
    });

    it('does nothing when the version of the other host is installed', async () => {
        const { provider, queued } = createProvider();
        sinon.stub(provider, 'getInstalledVersion').resolves('2.1.0');
        await provider.setInstances([web0, frigate()]);

        assert.equal(queued.length, 0);
    });

    it('does not queue an adapter twice while it is being installed', async () => {
        const { provider, queued } = createProvider();
        sinon.stub(provider, 'getInstalledVersion').resolves(null);
        await provider.setInstances([web0, frigate()]);
        await provider.evaluate();

        assert.equal(queued.length, 1);
    });

    it('does nothing in a compact group controller, the main controller installs', async () => {
        const { provider, queued } = createProvider({ isCompactGroupController: true });
        sinon.stub(provider, 'getInstalledVersion').resolves(null);
        await provider.setInstances([web0, frigate()]);

        assert.equal(queued.length, 0);
    });

    it('restarts the web server once the code is installed', async () => {
        const { provider, queued, options } = createProvider();
        const installedVersion = sinon.stub(provider, 'getInstalledVersion').resolves(null);
        await provider.setInstances([web0, frigate()]);

        installedVersion.resolves('2.1.0');
        queued[0].codeOnly!.onDone();
        await waitFor(() => (options.objects.extendObject as sinon.SinonStub).called);
        provider.stop();

        assert.deepEqual((options.objects.extendObject as sinon.SinonStub).firstCall.args, [
            'system.adapter.web.0',
            {},
        ]);
    });

    it('does not try a version again which could not be installed', async () => {
        const error = sinon.stub();
        const { provider, queued, options } = createProvider({ ...testIdentity({ logger: silentLoggerWith(error) }) });
        sinon.stub(provider, 'getInstalledVersion').resolves(null);
        await provider.setInstances([web0, frigate()]);

        queued[0].codeOnly!.onDone();
        await waitFor(() => error.called);
        provider.stop();
        await provider.evaluate();

        assert.match(error.firstCall.args[0], /Could not install "frigate@2.1\.0"/);
        assert.equal((options.objects.extendObject as sinon.SinonStub).called, false);
        assert.equal(queued.length, 1);
    });
});

/**
 * A logger which swallows everything but errors and warnings
 *
 * @param error stub which receives the errors
 * @param warn stub which receives the warnings
 */
function silentLoggerWith(error: sinon.SinonStub, warn: sinon.SinonStub = sinon.stub()): any {
    const noop = (): void => {};
    return { silly: noop, debug: noop, info: noop, warn, error, transports: [] };
}

/**
 * Wait until a condition is met, the provider finishes an installation asynchronously
 *
 * @param condition The condition to wait for
 */
async function waitFor(condition: () => boolean): Promise<void> {
    for (let i = 0; i < 100 && !condition(); i++) {
        await new Promise(resolve => setImmediate(resolve));
    }
}

describe('WebExtensionProvider version conflicts', () => {
    /** frigate on a third host in another version */
    const frigateOnC = instance(
        'system.adapter.frigate.1',
        { host: 'hostc', webExtension: 'lib/web.js', version: '2.2.0', installedVersion: '2.2.0' },
        { webInstance: 'web.0' },
    );

    it('warns once when the instances of other hosts run different versions', async () => {
        const warn = sinon.stub();
        const { provider } = createProvider(testIdentity({ logger: silentLoggerWith(sinon.stub(), warn) }));
        sinon.stub(provider, 'getInstalledVersion').resolves('2.2.0');
        await provider.setInstances([web0, frigate(), frigateOnC]);
        await provider.evaluate();

        assert.equal(warn.calledOnce, true);
        assert.match(warn.firstCall.args[0], /web extension of "frigate" in version 2\.2\.0/);
        assert.match(warn.firstCall.args[0], /frigate\.0 2\.1\.0 on otherhost, frigate\.1 2\.2\.0 on hostc/);
    });

    it('warns when the instance of this host runs another version than the one of the extension', async () => {
        const warn = sinon.stub();
        const localFrigate = instance('system.adapter.frigate.1', { host: 'testhost', version: '2.0.0' });
        const { provider, queued } = createProvider(testIdentity({ logger: silentLoggerWith(sinon.stub(), warn) }));
        sinon.stub(provider, 'getInstalledVersion').resolves('2.0.0');
        await provider.setInstances([web0, frigate(), localFrigate]);

        assert.equal(warn.calledOnce, true);
        assert.match(warn.firstCall.args[0], /in version 2\.0\.0, which the instance of this host runs/);
        // the version here follows the own instance, nothing is installed
        assert.equal(queued.length, 0);
    });

    it('does not warn when all run the same version', async () => {
        const warn = sinon.stub();
        const { provider } = createProvider(testIdentity({ logger: silentLoggerWith(sinon.stub(), warn) }));
        sinon.stub(provider, 'getInstalledVersion').resolves('2.1.0');
        await provider.setInstances([web0, frigate()]);

        assert.equal(warn.called, false);
    });
});

describe('WebExtensionProvider.getUsage', () => {
    it('needs an adapter whose web extension of another host is loaded here', async () => {
        const { provider } = createProvider();
        sinon.stub(provider, 'getInstalledVersion').resolves('2.1.0');
        await provider.setInstances([web0, frigate()]);

        assert.deepEqual(await provider.getUsage('frigate'), {
            adapter: 'frigate',
            installedVersion: '2.1.0',
            instances: [],
            webExtensions: ['system.adapter.frigate.0'],
            needed: true,
        });
    });

    it('needs an adapter with an instance on this host', async () => {
        const localFrigate = instance('system.adapter.frigate.1', { host: 'testhost' });
        const { provider } = createProvider();
        sinon.stub(provider, 'getInstalledVersion').resolves('2.1.0');
        await provider.setInstances([web0, localFrigate]);

        const usage = await provider.getUsage('frigate');
        assert.deepEqual(usage.instances, ['system.adapter.frigate.1']);
        assert.equal(usage.needed, true);
    });

    it('does not need an adapter once its instance on the other host is deleted', async () => {
        const { provider } = createProvider();
        sinon.stub(provider, 'getInstalledVersion').resolves('2.1.0');
        await provider.setInstances([web0, frigate()]);
        provider.handleObjectChange('system.adapter.frigate.0', null);
        provider.stop();

        assert.deepEqual(await provider.getUsage('frigate'), {
            adapter: 'frigate',
            installedVersion: '2.1.0',
            instances: [],
            webExtensions: [],
            needed: false,
        });
    });
});
