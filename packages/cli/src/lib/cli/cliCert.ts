import { CLICommand, type CLICommandOptions } from './cliCommand.js';
import { CLIObjects } from './cliObjects.js';
import * as messages from './messages.js';
import { tools, EXIT_CODES } from '@iobroker/js-controller-common';

/** Command ioBroker cert ... */
export class CLICert extends CLICommand {
    constructor(options: CLICommandOptions) {
        super(options);
    }

    /**
     * Executes a command
     *
     * @param args
     */
    execute(args: any[]): void | Promise<void> {
        const { callback, showHelp } = this.options;
        const command = args[0];

        switch (command) {
            case 'renew':
            case 'create':
                return this.create();
            case 'view':
                return this.view(args);
            default:
                messages.error.unknownCommand('cert', command);
                showHelp();
                return void callback(3);
        }
    }

    /**
     * Create new private certificate
     */
    async create(): Promise<void> {
        const id = 'system.certificates';
        const certPropPath = 'native.certificates';

        const certificates = tools.generateDefaultCertificates();
        if (certificates) {
            console.log(JSON.stringify(certificates, null, 2));
            for (const [certName, cert] of Object.entries(certificates)) {
                // use the command `iobroker object set ...` to update the certificate
                console.log(`Update certificate ${certName}`);

                const objectsCommandArgs = ['set', id, `${certPropPath}.${certName}=${cert as string}`];
                await new Promise(resolve => {
                    const objectsCommand = new CLIObjects({ ...this.options, callback: resolve });
                    objectsCommand.execute(objectsCommandArgs);
                });
            }
        }

        this.options.callback(EXIT_CODES.NO_ERROR);
    }

    /**
     * View the certificates on CLI
     *
     * @param _args
     */
    view(_args: any[]): void {
        let certName = _args[1];
        if (certName === undefined) {
            certName = 'defaultPublic';
        }
        const { callback, dbConnect } = this.options;
        dbConnect(params => {
            const { objects } = params;

            objects.getObject('system.certificates', (err, certs) => {
                if (!err && certs?.native?.certificates?.[certName]) {
                    const certInfo = tools.getCertificateInfo(certs.native.certificates[certName]);
                    if (certInfo) {
                        console.log(JSON.stringify(certInfo, null, 2));
                        return void callback(EXIT_CODES.NO_ERROR);
                    }
                    messages.error.cert(certName);
                    return void callback(3);
                }
                messages.error.cert(certName);
                return void callback(3);
            });
        });
    }
}
