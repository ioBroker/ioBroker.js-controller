'use strict';
const CLICommand = require('./cliCommand.js');
const CLIObjects = require('./cliObjects.js');
const messages = require('./messages.js');
const tools = require('../tools.js');
const forge = require('node-forge');
const os = require('os');

/** Command ioBroker cert ... */
module.exports = class CLICert extends CLICommand {

    /** @param {import('./cliCommand.js').CLICommandOptions} options */
    constructor(options) {
        super(options);
    }

    /**
     * Executes a command
     * @param {any[]} args
     */
    execute(args) {
        const { callback, showHelp } = this.options;
        const command = args[0];

        switch (command) {
            case 'renew':
            case 'create':
                return this.create(args);
            default:
                messages.error.unknownCommand('cert', command);
                showHelp();
                return void callback(3);
        }
    }

    /**
     * create new private certificate
     * @param {any[]} args
     */
    create(args) {

        // If at any time you wish to disable the use of native code, where available, for particular forge features
        // like its secure random number generator, you may set the forge.options.usePureJavaScript flag to true. It
        // is not recommended that you set this flag as native code is typically more performant and may have stronger
        // security properties. It may be useful to set this flag to test certain features that you plan to run in
        // environments that are different from your testing environment.
        forge.options.usePureJavaScript = false;

        const { callback, dbConnect } = this.options;
        const id = "system.certificates";
        const certPropPath = "native.certificates";

        // https://github.com/digitalbazaar/forge
        const pki = forge.pki;

        const keys = pki.rsa.generateKeyPair({bits: 2048, e: 0x10001});
        let cert = pki.createCertificate();

        cert.publicKey = keys.publicKey;
        cert.serialNumber = '01';
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 5);

        const subAttrs = [
            {name:'commonName',value: tools.getHostName()},
            {name:'organizationName',value:'ioBroker GmbH'},
            {shortName:'OU',value:'iobroker'}
        ];

        const issAttrs = [
            {name:'commonName',value: 'iobroker'},
            {name:'organizationName',value:'ioBroker GmbH'},
            {shortName:'OU',value:'iobroker'}
        ];

        cert.setSubject(subAttrs);
        cert.setIssuer(issAttrs);

        cert.setExtensions([{
            name: 'basicConstraints',
            critical: true,
            cA: false
            },
            {
                name: 'keyUsage',
                critical: true,
                digitalSignature: true,
                contentCommitment: true,
                keyEncipherment: true,
                dataEncipherment: true,
                keyAgreement: true,
                keyCertSign: true,
                cRLSign: true,
                encipherOnly: true,
                decipherOnly: true
            },
            {
                name: 'subjectAltName',
                altNames: [{
                    type: 2,
                    value: os.hostname()
                }]
            },
            {
                name: 'subjectKeyIdentifier'
            },
            {
                name: 'extKeyUsage',
                serverAuth: true,
                clientAuth: true,
                codeSigning: false,
                emailProtection: false,
                timeStamping: false
            },
            {
                name: 'authorityKeyIdentifier'
            }
        ]);

        cert.sign(keys.privateKey);

        const pem_pkey = pki.privateKeyToPem(keys.privateKey);
        const pem_cert = pki.certificateToPem(cert);

        console.log(pem_pkey);
        console.log(pem_cert);

        const certificates = {
            defaultPrivate: pem_pkey,
            defaultPublic: pem_cert
        };

        const command = ["set", id, certPropPath + "=" + JSON.stringify(certificates)];

        const objectsCommand = new CLIObjects(this.options);
        objectsCommand.execute(command);
    }
};