import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { X509Certificate } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { domainToASCII } from 'node:url';
import {
    FORBIDDEN_CHARS,
    execAsync,
    execFileAsync,
    generateDefaultCertificates,
    getHostName,
    isForeignProcess,
    isMalformedDefaultCertificate,
    isProcessRunning,
    nodeVersionSatisfies,
} from '@iobroker/js-controller-common-db/tools';

/**
 * Check whether WMI answers a process query on this machine
 *
 * @returns true if the own process could be looked up
 */
async function wmiAnswers(): Promise<boolean> {
    try {
        const { stdout } = await execFileAsync(
            'powershell.exe',
            [
                '-NoProfile',
                '-NonInteractive',
                '-Command',
                `(Get-CimInstance Win32_Process -Filter 'ProcessId=${process.pid}').Name`,
            ],
            // the first query after a reboot may take a while, which is also what warms WMI up for the test
            { timeout: 90_000 },
        );
        return !!stdout?.trim();
    } catch {
        return false;
    }
}

describe('test tools.js helpers', () => {
    it('FORBIDDEN_CHARS', () => {
        const tests = [
            { input: 'abc?def.0.1.foo-bar_', expected: 'abc_def.0.1.foo-bar_' },
            { input: 'ݑ', expected: '_' }, // Arabic Letter Beh with Dot Below and Three Dots Above (is an "other letter")
            { input: 'ⴃ', expected: 'ⴃ' }, // Georgian Small Letter Don (is a lowercase letter)
            { input: 'Ϣ', expected: 'Ϣ' }, // Coptic Capital Letter Shei (is a uppercase letter)
            { input: 'ok﹏﹏ok', expected: 'ok_ok' }, // multiple disallowed characters are replaced with one "_"
            { input: 'Th1s-IS_0.k4y', expected: 'Th1s-IS_0.k4y' },
        ];
        for (const { input, expected } of tests) {
            assert.strictEqual(input.replace(FORBIDDEN_CHARS, '_'), expected);
        }
    });

    it('execAsync', async () => {
        const res = await execAsync('echo test');
        assert.strictEqual((res.stdout as string).trim(), 'test');
    });

    it('execFileAsync', async () => {
        const res = await execFileAsync(process.execPath, ['-e', 'console.log("test")']);
        assert.strictEqual((res.stdout as string).trim(), 'test');
    });

    it('execFileAsync keeps what the failure was', async () => {
        type Failure = Error & { code?: string | number; killed?: boolean };

        // a caller has to tell a missing command, a timeout and a non-zero exit apart
        await assert.rejects(
            () => execFileAsync('iobroker-no-such-command', []),
            (e: Failure) => e.code === 'ENOENT',
        );

        await assert.rejects(
            () => execFileAsync(process.execPath, ['-e', 'setTimeout(() => {}, 30_000)'], { timeout: 500 }),
            (e: Failure) => e.killed === true,
        );

        // the output on stderr becomes the message, because it says more than "Command failed"
        await assert.rejects(
            () => execFileAsync(process.execPath, ['-e', 'console.error("why it failed"); process.exit(3)']),
            (e: Failure) => e.code === 3 && e.message.includes('why it failed'),
        );
    }).timeout(20_000);

    it('isProcessRunning', () => {
        // our own process is definitely running
        assert.strictEqual(isProcessRunning(process.pid), true);

        // pid 0 addresses the process group instead of a single process, so it must not be
        // mistaken for a running controller
        assert.strictEqual(isProcessRunning(0), false);

        // a pid above the highest one the system can hand out cannot belong to a process,
        // this is what a pids.txt left over by a power loss looks like
        assert.strictEqual(isProcessRunning(0x7fffffff), false);
    });

    it('isForeignProcess', async function () {
        // On a busy GitHub Windows runner WMI sometimes does not answer at all. isForeignProcess then rightly
        // answers "cannot inspect" for every process, which proves nothing about how it tells them apart.
        if (os.platform() === 'win32' && !(await wmiAnswers())) {
            console.warn('WMI does not answer on this machine, isForeignProcess cannot be verified');
            this.skip();
        }

        const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'iob-pids-'));
        // mimic an installation, so the controller directory shows up in both command lines
        const controllerDir = path.join(tmpDir, 'node_modules', 'iobroker.js-controller');
        await fs.mkdir(controllerDir, { recursive: true });
        for (const script of ['controller.js', 'iobroker.js']) {
            await fs.writeFile(path.join(controllerDir, script), 'setInterval(() => {}, 1_000);');
        }

        const controller = spawn(process.execPath, [path.join(controllerDir, 'controller.js')]);
        const cli = spawn(process.execPath, [path.join(controllerDir, 'iobroker.js'), 'start']);
        // e.g. Node-RED or zigbee2mqtt, which took over the pid of the controller after a reboot
        const otherNode = spawn(process.execPath, ['-e', 'setInterval(() => {}, 1_000);']);
        const notNode = os.platform() === 'win32' ? spawn('ping', ['-n', '60', '127.0.0.1']) : spawn('sleep', ['60']);

        try {
            assert.strictEqual(await isForeignProcess(controller.pid!), false);
            assert.strictEqual(await isForeignProcess(cli.pid!), true);
            assert.strictEqual(await isForeignProcess(otherNode.pid!), true);
            assert.strictEqual(await isForeignProcess(notNode.pid!), true);

            // the process asking can never be the controller it is looking for
            assert.strictEqual(await isForeignProcess(process.pid), true);

            // a process which cannot be inspected must be left alone
            assert.strictEqual(await isForeignProcess(0x7fffffff), false);
        } finally {
            controller.kill();
            cli.kill();
            otherNode.kill();
            notNode.kill();
            await fs.rm(tmpDir, { recursive: true, force: true });
        }
    })
        // the WMI probe and six inspections, each of which may need its own PowerShell start on Windows
        .timeout(330_000);
});

/** ASN.1 tag of a UTF8String */
const UTF8_STRING = 0x0c;
/** ASN.1 tag of a PrintableString */
const PRINTABLE_STRING = 0x13;
/** Start of the encoded OIDs 2.5.4.x of the attributes in a name, e.g. 2.5.4.3 for commonName */
const NAME_ATTRIBUTE_OID = Buffer.from([0x06, 0x03, 0x55, 0x04]);

/**
 * Find the offsets of the value tags of all CN, O and OU attributes in a DER encoded certificate
 *
 * @param der the DER encoded certificate
 */
function nameValueTagOffsets(der: Buffer): number[] {
    const offsets: number[] = [];
    for (let pos = der.indexOf(NAME_ATTRIBUTE_OID); pos !== -1; pos = der.indexOf(NAME_ATTRIBUTE_OID, pos + 1)) {
        // 0x03 commonName, 0x0a organizationName, 0x0b organizationalUnitName
        if ([0x03, 0x0a, 0x0b].includes(der[pos + NAME_ATTRIBUTE_OID.length])) {
            offsets.push(pos + NAME_ATTRIBUTE_OID.length + 1);
        }
    }
    return offsets;
}

/**
 * Change bytes in the DER encoding of a PEM certificate (the signature does not match afterward)
 *
 * @param pem the PEM encoded certificate
 * @param change function that changes the DER encoded certificate in place
 */
function changeCertificate(pem: string, change: (der: Buffer) => void): string {
    const der = Buffer.from(new X509Certificate(pem).raw);
    change(der);
    const base64 = der.toString('base64').replace(/(.{64})/g, '$1\n');
    return `-----BEGIN CERTIFICATE-----\n${base64.trim()}\n-----END CERTIFICATE-----\n`;
}

/**
 * Encode the names of a certificate as PrintableString like older js-controller versions did
 *
 * @param pem the PEM encoded certificate
 */
function asPrintableStrings(pem: string): string {
    return changeCertificate(pem, der => {
        for (const offset of nameValueTagOffsets(der)) {
            der[offset] = PRINTABLE_STRING;
        }
    });
}

/**
 * Replace bytes in the DER encoding of a PEM certificate by bytes of the same length
 *
 * @param pem the PEM encoded certificate
 * @param search the bytes to replace
 * @param replacement the new bytes, as long as search
 */
function replaceInCertificate(pem: string, search: Buffer, replacement: Buffer): string {
    return changeCertificate(pem, der => {
        for (let pos = der.indexOf(search); pos !== -1; pos = der.indexOf(search, pos + 1)) {
            replacement.copy(der, pos);
        }
    });
}

describe('generateDefaultCertificates', () => {
    it('generates a valid self-signed TLS server certificate', () => {
        const { defaultPublic } = generateDefaultCertificates();
        const cert = new X509Certificate(defaultPublic);

        assert.equal(cert.issuer, cert.subject);
        assert.equal(cert.verify(cert.publicKey), true);

        const altNames = cert.subjectAltName ?? '';
        assert.ok(altNames.includes(`DNS:${domainToASCII(getHostName())}`), altNames);
        assert.ok(altNames.includes('DNS:localhost'), altNames);
        assert.ok(altNames.includes('IP Address:127.0.0.1'), altNames);

        // a certificate with CA:FALSE must not be able to sign other certificates
        assert.equal(cert.ca, false);
        // keyUsage: OID 2.5.29.15, critical flag (01 01 ff), OCTET STRING and BIT STRING header, unused bits, flags
        const keyUsage = cert.raw.indexOf(Buffer.from([0x06, 0x03, 0x55, 0x1d, 0x0f, 0x01, 0x01, 0xff]));
        assert.notEqual(keyUsage, -1);
        const keyUsageFlags = cert.raw[keyUsage + 13];
        // digitalSignature and keyEncipherment
        assert.equal(keyUsageFlags & 0xa0, 0xa0);
        // no keyCertSign and no cRLSign
        assert.equal(keyUsageFlags & 0x06, 0);

        // an empty authorityKeyIdentifier (OID 2.5.29.35 followed by the empty SEQUENCE 0x3000) is rejected by Chrome
        assert.equal(cert.raw.includes(Buffer.from([0x06, 0x03, 0x55, 0x1d, 0x23])), false);
    }).timeout(30_000);

    it('writes the names as UTF8String, so browsers accept a host name with "_"', () => {
        const { defaultPublic } = generateDefaultCertificates('iobroker_test');
        const cert = new X509Certificate(defaultPublic);

        assert.ok(cert.subject.includes('CN=iobroker_test'), cert.subject);
        assert.ok((cert.subjectAltName ?? '').includes('DNS:iobroker_test'), cert.subjectAltName);

        // CN, O and OU of subject and issuer; a PrintableString (0x13) must not contain "_",
        // Chrome rejects such a certificate with ERR_SSL_SERVER_CERT_BAD_FORMAT
        const tags = nameValueTagOffsets(cert.raw).map(offset => cert.raw[offset]);
        assert.equal(tags.length, 6);
        assert.ok(
            tags.every(tag => tag === UTF8_STRING),
            tags.map(tag => tag.toString(16)).join(),
        );
        assert.equal(isMalformedDefaultCertificate(defaultPublic), false);
    }).timeout(30_000);

    it('puts a host name with an umlaut as punycode into the alternative names', () => {
        const { defaultPublic } = generateDefaultCertificates('iobrökertest');
        const altNames = new X509Certificate(defaultPublic).subjectAltName ?? '';

        assert.ok(altNames.includes('DNS:xn--iobrkertest-ufb'), altNames);
        assert.equal(/[^\x20-\x7e]/.test(altNames), false, altNames);
    }).timeout(30_000);
});

describe('isMalformedDefaultCertificate', () => {
    let underscoreCert: string;
    let hyphenCert: string;

    before(function () {
        this.timeout(60_000);
        underscoreCert = generateDefaultCertificates('iobroker_test').defaultPublic;
        hyphenCert = generateDefaultCertificates('iobroker-test').defaultPublic;
    });

    it('reports a default certificate of an older version for a host name with "_"', () => {
        assert.equal(isMalformedDefaultCertificate(asPrintableStrings(underscoreCert)), true);
    });

    it('does not report a default certificate of an older version for a host name browsers accept', () => {
        assert.equal(isMalformedDefaultCertificate(asPrintableStrings(hyphenCert)), false);
    });

    it('does not report a certificate that was not generated by js-controller', () => {
        const foreign = replaceInCertificate(
            asPrintableStrings(underscoreCert),
            Buffer.from('ioBroker GmbH'),
            Buffer.from('Other Company'),
        );
        assert.equal(isMalformedDefaultCertificate(foreign), false);
        assert.equal(isMalformedDefaultCertificate('no certificate'), false);
    });
});

describe('nodeVersionSatisfies', () => {
    it('takes a prerelease or nightly build by its version', () => {
        assert.equal(nodeVersionSatisfies('>=22.22.2', 'v27.0.0-alpha.0'), true);
        assert.equal(nodeVersionSatisfies('>=22.22.2', '27.0.0-nightly20261101abcdef'), true);
    });

    it('does not take a prerelease for the release it leads to', () => {
        assert.equal(nodeVersionSatisfies('>=22.22.2', 'v22.22.2-rc.1'), false);
        assert.equal(nodeVersionSatisfies('>=22 <27', 'v27.0.0-alpha.0'), false);
    });

    it('lets a range without minor and patch start with the prereleases of that major', () => {
        assert.equal(nodeVersionSatisfies('>=22', 'v22.0.0-rc.1'), true);
    });

    it('checks released versions as before', () => {
        assert.equal(nodeVersionSatisfies('>=22.22.2', 'v22.22.2'), true);
        assert.equal(nodeVersionSatisfies('>=22.22.2', 'v26.1.0'), true);
        assert.equal(nodeVersionSatisfies('>=22.22.2', 'v22.22.1'), false);
    });

    it('checks the running version if no other is given', () => {
        assert.equal(nodeVersionSatisfies('*'), true);
        assert.equal(nodeVersionSatisfies(`>${process.version}`), false);
    });

    it('does not throw on what it cannot read', () => {
        assert.equal(nodeVersionSatisfies('not a range', 'v22.22.2'), false);
        assert.equal(nodeVersionSatisfies('>=22', 'not a version'), false);
    });
});
