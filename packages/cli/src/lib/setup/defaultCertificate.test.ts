import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tools } from '@iobroker/js-controller-common';
import { needsDefaultCertificate } from '@/lib/setup/defaultCertificate.js';

describe('needsDefaultCertificate', () => {
    const { defaultPrivate, defaultPublic } = tools.generateDefaultCertificates('iobroker-test');
    let dir: string;

    before(async () => {
        dir = await mkdtemp(path.join(os.tmpdir(), 'iob-default-cert-'));
    });

    after(async () => {
        await rm(dir, { recursive: true, force: true });
    });

    it('creates one on a fresh installation', () => {
        assert.equal(needsDefaultCertificate(undefined), true);
        assert.equal(needsDefaultCertificate(null), true);
        // the initial object of io-package.json
        assert.equal(needsDefaultCertificate({ defaultPrivate: null, defaultPublic: null }), true);
    });

    it('creates one if a part is missing or the certificate cannot be read', () => {
        assert.equal(needsDefaultCertificate({ defaultPrivate, defaultPublic: '' }), true);
        assert.equal(needsDefaultCertificate({ defaultPrivate: '', defaultPublic }), true);
        assert.equal(needsDefaultCertificate({ defaultPrivate, defaultPublic: 'no certificate' }), true);
    });

    it('keeps an existing certificate, e.g. on an upgrade', () => {
        assert.equal(needsDefaultCertificate({ defaultPrivate, defaultPublic }), false);
    });

    it('keeps a certificate the user configured as file', async () => {
        const publicFile = path.join(dir, 'public.pem');
        const privateFile = path.join(dir, 'private.pem');
        await writeFile(publicFile, defaultPublic);
        await writeFile(privateFile, defaultPrivate);

        assert.equal(needsDefaultCertificate({ defaultPrivate: privateFile, defaultPublic: publicFile }), false);
    });
});
