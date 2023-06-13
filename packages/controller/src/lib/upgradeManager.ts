import { ChildProcessPromise, exec as execAsync } from 'promisify-child-process';
import { tools, logger } from '@iobroker/js-controller-common';
import { valid } from 'semver';
import { dbConnectAsync } from '@iobroker/js-controller-cli';
import http from 'http';
import https from 'https';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import { setTimeout as wait } from 'timers/promises';
import type { Logger } from 'winston';
import fs from 'fs-extra';

interface UpgradeArguments {
    /** Version of controller to upgrade too */
    version: string;
    /** Admin instance which triggered the upgrade */
    adminInstance: number;
}

interface Certificates {
    /** Public certificate */
    certPublic: string;
    /** Private certificate */
    certPrivate: string;
}

interface InsecureWebServerParameters {
    /** if https should be used for the webserver */
    useHttps: false;
    /** port of the web server */
    port: number;
}

type SecureWebServerParameters = Omit<InsecureWebServerParameters, 'useHttps'> & { useHttps: true } & Certificates;
type WebServerParameters = InsecureWebServerParameters | SecureWebServerParameters;

interface GetCertificatesParams {
    /** The objects DB */
    objects: ObjectsClient;
    /** Name of the public certificate */
    certPublicName: string;
    /** Name of the private certificate */
    certPrivateName: string;
}

interface ServerResponse {
    /** If the update is still running */
    running: boolean;
    stderr: string[];
    stdout: string[];
    /** if installation process succeeded */
    success?: boolean;
}

class UpgradeManager {
    /** Wait ms until controller is stopped */
    private readonly STOP_TIMEOUT_MS = 3_000;
    /** Wait ms for delivery of final response */
    private readonly SHUTDOWN_TIMEOUT = 10_000;
    /** Instance of admin to get information from */
    private readonly adminInstance: number;
    /** Desired controller version */
    private readonly version: string;
    /** Response send by webserver */
    private readonly response: ServerResponse = {
        running: true,
        stderr: [],
        stdout: []
    };
    /** Used to stop the stop shutdown timeout */
    private shutdownAbortController?: AbortController;
    /** Logger to log to file and other transports */
    private readonly logger: Logger;

    /** The server used for communicating upgrade status */
    private server?: https.Server | http.Server;
    /** Name of the host for logging purposes */
    private readonly hostname = tools.getHostName();

    constructor(args: UpgradeArguments) {
        this.adminInstance = args.adminInstance;
        this.version = args.version;
        this.logger = this.setupLogger();
    }

    /**
     * Set up the logger, to stream to file and other configured transports
     */
    private setupLogger(): Logger {
        const config = fs.readJSONSync(tools.getConfigFileName());
        return logger({ ...config.log, noStdout: false });
    }

    /**
     * Parse the commands from the cli
     */
    static parseCliCommands(): UpgradeArguments {
        const additionalArgs = process.argv.slice(2);

        const version = additionalArgs[0];
        const adminInstance = parseInt(additionalArgs[1]);

        const isValid = !!valid(version);

        if (!isValid) {
            UpgradeManager.printUsage();
            throw new Error('The provided version is not valid');
        }

        if (isNaN(adminInstance)) {
            UpgradeManager.printUsage();
            throw new Error('Please provide a valid admin instance');
        }

        return { version, adminInstance };
    }

    /**
     * Log via console and provide the logs for the server too
     *
     * @param message the message which will be logged
     * @param error if it is an error
     */
    log(message: string, error = false): void {
        if (error) {
            this.logger.error(`host.${this.hostname} [CONTROLLER_AUTO_UPGRADE] ${message}`);
            this.response.stderr.push(message);
            return;
        }

        this.logger.info(`host.${this.hostname} [CONTROLLER_AUTO_UPGRADE] ${message}`);
        this.response.stdout.push(message);
    }

    /**
     * Stops the js-controller via cli call
     */
    async stopController(): Promise<void> {
        await execAsync(`${tools.appNameLowerCase} stop`);
        await wait(this.STOP_TIMEOUT_MS);
    }

    /**
     * Starts the js-controller via cli
     */
    startController(): ChildProcessPromise {
        return execAsync(`${tools.appNameLowerCase} start`);
    }

    /**
     * Print how the module should be used
     */
    static printUsage(): void {
        console.info('Example usage: "node upgradeManager.js <version> <adminInstance>"');
    }

    /**
     * Install given version of js-controller
     */
    async npmInstall(): Promise<void> {
        const res = await tools.installNodeModule(`iobroker.js-controller@${this.version}`, {
            cwd: '/opt/iobroker',
            debug: true
        });

        this.response.stderr.push(...res.stderr.split('\n'));
        this.response.stdout.push(...res.stdout.split('\n'));

        if (res.stderr) {
            this.log(res.stderr, true);
        } else if (res.stdout) {
            this.log(res.stdout);
        }

        this.response.success = res.success;

        if (!res.success) {
            throw new Error(`Could not install js-controller@${this.version}`);
        }
    }

    /**
     * Starts the web server for admin communication either secure or insecure
     *
     * @param params Web server configuration
     */
    startWebServer(params: WebServerParameters): void {
        const { useHttps } = params;
        if (useHttps) {
            this.startSecureWebServer(params);
        } else {
            this.startInsecureWebServer(params);
        }
    }

    /**
     * Shuts down the server, restarts the controller and exists the program
     */
    shutdownApp(): void {
        if (this.shutdownAbortController) {
            this.shutdownAbortController.abort();
        }

        if (!this.server) {
            process.exit();
        }

        this.server.close(async () => {
            await this.startController();
            this.log('Successfully started js-controller');

            process.exit();
        });
    }

    /**
     * This function is called when the webserver receives a message
     *
     * @param req received message
     * @param res server response
     */
    webServerCallback(req: http.IncomingMessage, res: http.ServerResponse): void {
        res.writeHead(200);
        res.end(JSON.stringify(this.response));

        if (!this.response.running) {
            this.log('Final information delivered');
            this.shutdownApp();
        }
    }

    /**
     * Start an insecure web server for admin communication
     *
     * @param params Web server configuration
     */
    startInsecureWebServer(params: InsecureWebServerParameters): void {
        const { port } = params;

        this.server = http.createServer((req, res) => {
            this.webServerCallback(req, res);
        });

        this.server.listen(port, () => {
            this.log(`Server is running on http://localhost:${port}`);
        });
    }

    /**
     * Start a secure web server for admin communication
     *
     * @param params Web server configuration
     */
    startSecureWebServer(params: SecureWebServerParameters): void {
        const { port, certPublic, certPrivate } = params;

        this.server = https.createServer({ key: certPrivate, cert: certPublic }, (req, res) => {
            this.webServerCallback(req, res);
        });

        this.server.listen(port, () => {
            this.log(`Server is running on http://localhost:${port}`);
        });
    }

    /**
     * Get certificates from the DB
     *
     * @param params certificate information
     */
    async getCertificates(params: GetCertificatesParams): Promise<Certificates> {
        const { objects, certPublicName, certPrivateName } = params;

        const obj = await objects.getObjectAsync('system.certificates');

        if (!obj) {
            throw new Error('No certificates found');
        }

        const certs = obj.native.certificates;

        return { certPrivate: certs[certPrivateName], certPublic: certs[certPublicName] };
    }

    /**
     * Collect parameters for webserver from admin instance
     */
    async collectWebServerParameters(): Promise<WebServerParameters> {
        const { objects } = await dbConnectAsync(false);

        const obj = await objects.getObjectAsync(`system.adapter.admin.${this.adminInstance}`);

        if (!obj) {
            UpgradeManager.printUsage();
            throw new Error('Please provide a valid admin instance');
        }

        if (obj.native.secure) {
            const { certPublic: certPublicName, certPrivate: certPrivateName } = obj.native;
            const { certPublic, certPrivate } = await this.getCertificates({
                objects,
                certPublicName,
                certPrivateName
            });

            return {
                useHttps: obj.native.secure,
                port: obj.native.port,
                certPublic,
                certPrivate
            };
        }

        return {
            useHttps: false,
            port: obj.native.port
        };
    }

    /**
     * Tells the upgrade manager, that server can be shut down on next response or on timeout
     */
    async setFinished(): Promise<void> {
        this.response.running = false;

        await this.startShutdownTimeout();
    }

    /**
     * Start a timeout which starts controller and shuts down the app if expired
     */
    async startShutdownTimeout(): Promise<void> {
        this.shutdownAbortController = new AbortController();
        try {
            await wait(this.SHUTDOWN_TIMEOUT, null, { signal: this.shutdownAbortController.signal });

            this.log('Timeout expired, initializing shutdown');
            this.shutdownApp();
        } catch (e) {
            if (e.code !== 'ABORT_ERR') {
                this.log(e.message, true);
            }
        }
    }
}

/**
 * Main logic
 */
async function main(): Promise<void> {
    const upgradeArguments = UpgradeManager.parseCliCommands();
    const upgradeManager = new UpgradeManager(upgradeArguments);

    const webServerParameters = await upgradeManager.collectWebServerParameters();

    upgradeManager.log('Stopping controller');
    await upgradeManager.stopController();
    upgradeManager.log('Successfully stopped js-controller');

    upgradeManager.startWebServer(webServerParameters);

    try {
        await upgradeManager.npmInstall();
    } catch (e) {
        upgradeManager.log(e.message, true);
    }

    await upgradeManager.setFinished();
}

/**
 * This file always needs to be executed in a process different from js-controller
 * else it will be canceled when the file itself stops the controller
 */
if (require.main === module) {
    main();
}
