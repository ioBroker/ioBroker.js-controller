import assert from 'node:assert/strict';
import sinon from 'sinon';
import fs from 'fs-extra';
import { tools } from '@iobroker/js-controller-common';
import { CertificateManager } from './CertificateManager.js';
import type { AdapterContext } from '../context.js';

function makeContext(over: Partial<AdapterContext> = {}): AdapterContext {
    return {
        namespace: 'test.0',
        namespaceLog: 'test.0',
        logger: { silly() {}, debug() {}, info() {}, warn() {}, error() {} } as any,
        uiMessagingController: {} as any,
        states: null,
        objects: null,
        common: undefined,
        config: {} as ioBroker.AdapterConfig,
        host: 'localhost',
        ...over,
    };
}

const certsObj = {
    native: {
        certificates: {
            defaultPublic: '-----BEGIN CERTIFICATE-----\npub\n-----END CERTIFICATE-----',
            defaultPrivate: '-----BEGIN PRIVATE KEY-----\npriv\n-----END PRIVATE KEY-----',
        },
        letsEncrypt: true,
    },
} as any;

describe('CertificateManager.getCertificates', () => {
    it('throws ERROR_DB_CLOSED when objects DB is not connected', async () => {
        const mgr = new CertificateManager(makeContext({ objects: null }));
        await assert.rejects(
            () => mgr.getCertificates({ publicName: 'defaultPublic', privateName: 'defaultPrivate' }),
            new RegExp(tools.ERRORS.ERROR_DB_CLOSED),
        );
    });

    it('throws ERROR_NOT_FOUND when the named certificates are missing', async () => {
        const getObject = sinon.stub().resolves({ native: { certificates: {} } });
        const mgr = new CertificateManager(makeContext({ objects: { getObject } as any }));
        await assert.rejects(
            () => mgr.getCertificates({ publicName: 'defaultPublic', privateName: 'defaultPrivate' }),
            new RegExp(tools.ERRORS.ERROR_NOT_FOUND),
        );
    });

    it('returns inline certs, the letsEncrypt flag, and no file paths for inline values', async () => {
        const getObject = sinon.stub().resolves(certsObj);
        const mgr = new CertificateManager(makeContext({ objects: { getObject } as any }));

        const res = await mgr.getCertificates({ publicName: 'defaultPublic', privateName: 'defaultPrivate' });

        assert.equal(res.certs.key, certsObj.native.certificates.defaultPrivate);
        assert.equal(res.certs.cert, certsObj.native.certificates.defaultPublic);
        assert.equal(res.useLetsEncrypt, true);
        assert.deepEqual(res.certFilePaths, []);
    });

    it('reads a file-backed cert value and reports its deduped path', async () => {
        const existsSync = sinon.stub(fs, 'existsSync').returns(true);
        const readFileSync = sinon.stub(fs, 'readFileSync').returns('FILE-CERT-CONTENT');
        try {
            const getObject = sinon.stub().resolves({
                native: { certificates: { defaultPublic: '/etc/c.pem', defaultPrivate: '/etc/c.pem' } },
            });
            const mgr = new CertificateManager(makeContext({ objects: { getObject } as any }));

            const res = await mgr.getCertificates({ publicName: 'defaultPublic', privateName: 'defaultPrivate' });

            assert.equal(res.certs.cert, 'FILE-CERT-CONTENT');
            assert.equal(res.certs.key, 'FILE-CERT-CONTENT');
            assert.deepEqual(res.certFilePaths, ['/etc/c.pem']);
        } finally {
            existsSync.restore();
            readFileSync.restore();
        }
    });

    it('assembles the CA chain when a chained certificate is provided', async () => {
        const oneCert = `-----BEGIN CERTIFICATE-----\n${'A'.repeat(200)}\n-----END CERTIFICATE-----\r\n`;
        const chainedValue = oneCert.repeat(3);
        const getObject = sinon.stub().resolves({
            native: {
                certificates: {
                    defaultPublic: certsObj.native.certificates.defaultPublic,
                    defaultPrivate: certsObj.native.certificates.defaultPrivate,
                    defaultChained: chainedValue,
                },
            },
        });
        const mgr = new CertificateManager(makeContext({ objects: { getObject } as any }));

        const res = await mgr.getCertificates({
            publicName: 'defaultPublic',
            privateName: 'defaultPrivate',
            chainedName: 'defaultChained',
        });

        assert.equal(res.certs.ca, chainedValue);
        assert.deepEqual(res.certFilePaths, []);
    });

    it('leaves ca undefined when the chained certificate is below the length threshold', async () => {
        const getObject = sinon.stub().resolves({
            native: {
                certificates: {
                    defaultPublic: certsObj.native.certificates.defaultPublic,
                    defaultPrivate: certsObj.native.certificates.defaultPrivate,
                    defaultChained: '-----BEGIN CERTIFICATE-----\nA\n-----END CERTIFICATE-----\r\n',
                },
            },
        });
        const mgr = new CertificateManager(makeContext({ objects: { getObject } as any }));

        const res = await mgr.getCertificates({
            publicName: 'defaultPublic',
            privateName: 'defaultPrivate',
            chainedName: 'defaultChained',
        });

        assert.equal(res.certs.ca, undefined);
    });

    it('throws ERROR_NOT_FOUND when getObject rejects', async () => {
        const getObject = sinon.stub().rejects(new Error('boom'));
        const mgr = new CertificateManager(makeContext({ objects: { getObject } as any }));
        await assert.rejects(
            () => mgr.getCertificates({ publicName: 'defaultPublic', privateName: 'defaultPrivate' }),
            new RegExp(tools.ERRORS.ERROR_NOT_FOUND),
        );
    });

    it('falls back to the raw path value when reading the cert file throws', async () => {
        const existsSync = sinon.stub(fs, 'existsSync').returns(true);
        const readFileSync = sinon.stub(fs, 'readFileSync').throws(new Error('EACCES'));
        try {
            const getObject = sinon.stub().resolves({
                native: { certificates: { defaultPublic: '/etc/c.pem', defaultPrivate: '/etc/c.pem' } },
            });
            const mgr = new CertificateManager(makeContext({ objects: { getObject } as any }));

            const res = await mgr.getCertificates({ publicName: 'defaultPublic', privateName: 'defaultPrivate' });

            assert.equal(res.certs.cert, '/etc/c.pem');
            assert.equal(res.certs.key, '/etc/c.pem');
            assert.deepEqual(res.certFilePaths, []);
        } finally {
            existsSync.restore();
            readFileSync.restore();
        }
    });
});
