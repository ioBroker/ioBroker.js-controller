'use strict';
const CLICommand = require('./cliCommand.js');
const CLIObjects = require('./cliObjects.js');
const messages = require('./messages.js');
const tools = require('../tools.js');

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
            case 'view':
                return this.view(args);
            default:
                messages.error.unknownCommand('cert', command);
                showHelp();
                return void callback(3);
        }
    }

    /**
     * create new private certificate
     * @param {any[]} [_args]
     */
    create(_args) {
        const id = 'system.certificates';
        const certPropPath = 'native.certificates';

        const certificates = tools.generateDefaultCertificates();
        if (certificates) {
            console.log(JSON.stringify(certificates, null, 2));
            // use the command `iobroker object set ...` to update the certificate
            const objectsCommandArgs = ['set', id, certPropPath + '=' + JSON.stringify(certificates)];
            const objectsCommand = new CLIObjects(this.options);
            objectsCommand.execute(objectsCommandArgs);
        }
    }

    // view-command
    // usage: view [<certificate name>]
    view(_args) {
        let certName = _args[1];
        if (certName === undefined) {
            certName = 'defaultPublic';
        }
        const { callback, dbConnect } = this.options;
        dbConnect((objects, _states, _isOffline, _objectDbType, _config) => {
            objects.getObject('system.certificates', (err, certs) => {
                if (!err && certs && certs.native && certs.native.certificates && certs.native.certificates[certName]) {
                    const certInfo = tools.getCertificateInfo(certs.native.certificates[certName]);
                    if (certInfo) {
                        console.log(JSON.stringify(certInfo, null, 2));
                        return void callback();
                    } else {
                        messages.error.cert(certName);
                        return void callback(3);
                    }
                } else {
                    messages.error.cert(certName);
                    return void callback(3);
                }
            });
        });
    }
};