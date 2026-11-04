import assert from 'node:assert/strict';
import { checkVersions, type CheckVersionsOptions } from '@/lib/controller/dependencyChecker.js';

const silentLogger = {
    silly: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
} as any;

/**
 * An instance object as the `system/instance` view returns it
 *
 * @param id the instance id
 * @param name the adapter name
 * @param version the installed version
 * @param host the host it runs on
 */
function instance(id: string, name: string, version: string, host: string): ioBroker.InstanceObject {
    return { _id: id, type: 'instance', common: { name, version, host }, native: {} } as any;
}

/**
 * Check the dependencies of `kecontact.0` on host `master` against the given instances
 *
 * @param instances all instances of the system
 * @param deps the dependencies to check
 */
function check(instances: ioBroker.InstanceObject[], deps: Partial<CheckVersionsOptions>): Promise<void> {
    return checkVersions({
        objects: {
            getObjectViewAsync: () => Promise.resolve({ rows: instances.map(value => ({ id: value._id, value })) }),
        } as any,
        id: 'system.adapter.kecontact.0',
        hostname: 'master',
        controllerVersion: '7.2.0',
        logger: silentLogger,
        logPrefix: 'host.master',
        ...deps,
    });
}

describe('lib/controller/dependencyChecker: global dependencies', () => {
    it('is fulfilled by an instance on another host', async () => {
        await check([instance('system.adapter.admin.0', 'admin', '7.6.0', 'slave1')], {
            globalDeps: [{ admin: '>=7.4.10' }],
        });
    });

    it('says that the adapter is not installed anywhere, instead of talking about versions', async () => {
        await assert.rejects(check([], { globalDeps: [{ admin: '>=7.4.10' }] }), {
            message: 'Adapter dependency not fulfilled: required adapter "admin" is not installed on any host!',
        });
    });

    it('names the host whose instance has the wrong version', async () => {
        await assert.rejects(
            check(
                [
                    instance('system.adapter.admin.0', 'admin', '7.6.0', 'master'),
                    instance('system.adapter.admin.1', 'admin', '7.2.6', 'slave1'),
                ],
                { globalDeps: [{ admin: '>=7.4.10' }] },
            ),
            {
                message:
                    'Adapter dependency not fulfilled on "slave1": required adapter "admin" has wrong version. Installed "7.2.6", required ">=7.4.10"!',
            },
        );
    });

    it('does not claim "all hosts" for the js-controller, whose version is the one of this host', async () => {
        await assert.rejects(check([], { globalDeps: [{ 'js-controller': '>=8.0.0' }] }), {
            message:
                'Adapter dependency not fulfilled: Invalid version of "js-controller". Installed "7.2.0", required ">=8.0.0"',
        });
    });
});

describe('lib/controller/dependencyChecker: same-host dependencies keep their messages', () => {
    it('names this host when the adapter is only installed elsewhere', async () => {
        await assert.rejects(
            check([instance('system.adapter.admin.0', 'admin', '7.6.0', 'slave1')], { deps: [{ admin: '>=7.4.10' }] }),
            { message: 'Adapter dependency not fulfilled on "master": required adapter "admin" not found!' },
        );
    });

    it('names this host when the version is wrong', async () => {
        await assert.rejects(
            check([instance('system.adapter.admin.0', 'admin', '7.2.6', 'master')], { deps: [{ admin: '>=7.4.10' }] }),
            {
                message:
                    'Adapter dependency not fulfilled on "master": required adapter "admin" has wrong version. Installed "7.2.6", required ">=7.4.10"!',
            },
        );
    });
});
