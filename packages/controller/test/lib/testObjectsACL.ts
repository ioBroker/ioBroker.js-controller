import type { TestContext } from '../_Types.js';

export function register(it: Mocha.TestFunction, expect: Chai.ExpectStatic, context: TestContext): void {
    const textName = `${context.name} objects: `;

    const secretId = 'system.adapter.userMayNotReadIt';

    it(`${textName}should create users and groups`, () => {
        const objects = context.objects;

        return objects
            .setObject('system.group.user', {
                _id: 'system.group.user',
                type: 'group',
                common: {
                    name: 'User',
                    members: ['system.user.user'],
                    dontDelete: true,
                    acl: {
                        object: {
                            list: true,
                            read: true,
                            write: false,
                            delete: false,
                            create: false,
                        },
                        state: {
                            list: true,
                            read: true,
                            write: true,
                            create: true,
                            delete: false,
                        },
                        users: {
                            list: true,
                            read: true,
                            write: false,
                            create: false,
                            delete: false,
                        },
                        other: {
                            execute: false,
                            http: true,
                            sendto: false,
                        },
                        file: {
                            list: true,
                            read: true,
                            write: false,
                            create: false,
                            delete: false,
                        },
                    },
                },
                native: {},
            })
            .then(() =>
                objects.setObject('system.user.user', {
                    _id: 'system.user.user',
                    common: {
                        name: 'User',
                        icon: '',
                        color: '#44d8f1',
                        enabled: true,
                        password:
                            'pbkdf2$10000$47785e10d8e468765c06b371f45981d625274dec3f8f6261b12d67320d07e7844e1e30df575f55ed3686804fbbae442ee9503c9c93fdcff4c46b8243200e1839b77fa18f769c9f71b13f12c4002e1cee03e6fa54878a2d6a9629589bd9169459989fc63abddce94690e5744e69658be43e1a9c7b38f1535eb9946a05394ee16f3724b75e0829ece04a05ef8848509d27b7944a9e064bba9341350d39d7a7e5bc4fe1980ae6da737c9e5e79e5a5a7e969825e94302c047a6054f3524b71c52acd33f2f83b1ed026c05af514da0a2e57c2267aeb10021f9503b5db02d8cc946421604f73548ceecc2a10b44be6a5b859e43e706cc86ee36b21984fc33abf9b2d66$0c4a5d538c84116846aac1c20fdc3fdd',
                    },
                    type: 'user',
                    native: {},
                    from: 'system.adapter.admin.0',
                    user: 'system.user.admin',
                    ts: 1534947164702,
                    acl: {
                        object: 1636, // 0664
                        owner: 'system.user.admin',
                        ownerGroup: 'system.group.administrator',
                    },
                }),
            )
            .then(() =>
                objects.setObject(secretId, {
                    _id: secretId,
                    common: {
                        name: 'userMayNotReadIt',
                        enabled: true,
                        installedVersion: '1.0.0',
                        version: '1.0.0',
                        mode: 'daemon',
                        platform: 'Javascript/Node.js',
                        materialize: false,
                        materializeTab: false,
                    },
                    type: 'adapter',
                    native: {},
                    acl: {
                        object: 1536, // 0600
                        owner: 'system.user.admin',
                        ownerGroup: 'system.group.administrator',
                    },
                    objects: [],
                    instanceObjects: [],
                }),
            );
    }).timeout(2_000);

    it(`${textName}invalid user name must be checked #1`, async () => {
        const objects = context.objects;
        try {
            await objects.getObject(secretId, { user: 'admin' });
            expect(1).to.be.equal('Never happens');
        } catch (e) {
            console.error(e.message);
            expect(e.message).to.be.equal('permissionError');
        }
    }).timeout(2_000);

    it(`${textName}invalid user name must be checked #2`, () => {
        const objects = context.objects;
        return objects
            .getObject(secretId, { user: 'system.user.admin1' })
            .then(_obj => {
                expect(1).to.be.equal('Never happens');
            })
            .catch(err => {
                console.error(err.message);
                expect(err.message).to.be.equal('permissionError');
            });
    }).timeout(2_000);

    it(`${textName}admin may read secret object`, () => {
        const objects = context.objects;
        return objects
            .getObject(secretId, { user: 'system.user.admin' })
            .then(obj => {
                expect(obj).to.be.ok;
            })
            .catch(err => {
                console.error(err.message);
                expect(1).to.be.equal('Never happens');
            });
    }).timeout(2_000);

    it(`${textName}user may not read secret object`, () => {
        const objects = context.objects;
        return objects
            .getObject(secretId, { user: 'system.user.user' })
            .then(_obj => {
                expect(1).to.be.equal('Never happens');
            })
            .catch(err => {
                expect(err.message).to.be.equal('permissionError');
            });
    }).timeout(2_000);

    it(`${textName}default acl from system.config should be used`, async () => {
        const objects = context.objects;

        await objects.setObjectAsync('test.defAcl', {
            type: 'state',
            common: {
                type: 'number',
                read: true,
                write: true,
                role: 'state',
                name: 'test ack',
            },
            native: {},
        });
        const obj = await objects.getObjectAsync('test.defAcl');

        expect(obj!.acl!.owner).to.be.equal('system.user.governor');
        expect(obj!.acl!.ownerGroup).to.be.equal('system.group.senatorGroup');
    }).timeout(2_000);

    it(`${textName}default acl from system.config can be overwritten via acl`, async () => {
        const objects = context.objects;
        await objects.setObjectAsync('test.overwriteAclDef', {
            type: 'state',
            common: {
                type: 'string',
                name: 'Test',
                role: 'state',
                read: true,
                write: true,
            },
            native: {},
            acl: {
                object: 1636,
                state: 1636,
                owner: 'system.user.user',
                ownerGroup: 'system.group.administrator',
            },
        });
        const obj = await objects.getObjectAsync('test.overwriteAclDef');
        expect(obj!.acl!.owner).to.be.equal('system.user.user');
        expect(obj!.acl!.ownerGroup).to.be.equal('system.group.administrator');
    }).timeout(2_000);

    it(`${textName}default acl from system.config is used when user is admin`, async () => {
        const objects = context.objects;
        await objects.setObjectAsync(
            'test.aclAdmin',
            {
                type: 'state',
                common: {
                    type: 'string',
                    role: 'state',
                    read: true,
                    write: true,
                    name: 'test',
                },
                native: {},
            },
            { user: 'system.user.admin' },
        );
        const obj = await objects.getObjectAsync('test.aclAdmin');
        expect(obj!.acl!.owner).to.be.equal('system.user.governor');
        expect(obj!.acl!.ownerGroup).to.be.equal('system.group.senatorGroup');
    }).timeout(2_000);

    it(`${textName}default acl from system.config is used when user is admin and can be modified on the fly`, async () => {
        const objects = context.objects;

        // get the system.config to save the acl
        const config = await objects.getObject('system.config');

        config!.common.defaultNewAcl = {
            object: 1636,
            state: 1636,
            file: 1636,
            owner: 'system.user.notGovernor',
            ownerGroup: 'system.group.notSenatorGroup',
        };

        // we change the acl during runtime - it has to be applied on next setObject
        await objects.setObject('system.config', config!);

        await objects.setObject(
            'test.aclAdminChange',
            {
                type: 'state',
                common: {
                    type: 'string',
                    role: 'state',
                    name: 'test',
                    read: true,
                    write: true,
                },
                native: {},
            },
            { user: 'system.user.admin' },
        );
        const obj = await objects.getObjectAsync('test.aclAdminChange');
        expect(obj!.acl!.owner).to.be.equal('system.user.notGovernor');
        expect(obj!.acl!.ownerGroup).to.be.equal('system.group.notSenatorGroup');
    }).timeout(2_000);
}
