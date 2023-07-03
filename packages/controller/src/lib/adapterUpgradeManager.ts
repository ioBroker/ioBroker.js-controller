import { tools } from '@iobroker/js-controller-common';
import { ChildProcessPromise, exec as execAsync } from 'promisify-child-process';
import http from 'http';
import https from 'https';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import { setTimeout as wait } from 'timers/promises';
import type { Logger } from 'winston';

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

export type AdapterUpgradeManagerOptions = WebServerParameters & {
    /** Version of adapter to upgrade too */
    version: string;
    /** Name of the adapter to upgrade */
    adapterName: string;
    /** The objects DB client */
    objects: ObjectsClient;
    /** A logger instance */
    logger: Logger;
};

interface GetCertificatesParams {
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

export class AdapterUpgradeManager {
    /** Wait ms until controller is stopped */
    private readonly STOP_TIMEOUT_MS = 3_000;
    /** Wait ms for delivery of final response */
    private readonly SHUTDOWN_TIMEOUT = 10_000;
    /** Name of the adapter to upgrade */
    private readonly adapterName: string;
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
    /** The objects DB client */
    private readonly objects: ObjectsClient;
    /** List of instances which have been stopped */
    private stoppedInstances: string[] = [];

    constructor(options: AdapterUpgradeManagerOptions) {
        this.adapterName = options.adapterName;
        this.version = options.version;
        this.logger = options.logger;
        this.objects = options.objects;
    }

    /**
     * Stops the adapter and returns ids of stopped instances
     */
    async stopAdapter(): Promise<void> {
        this.stoppedInstances = await this.getAllEnabledInstances();
        await this.enableInstances(this.stoppedInstances, false);
        await wait(this.STOP_TIMEOUT_MS);
    }

    /**
     * Start all instances which were enabled before the upgrade
     */
    async startAdapter(): Promise<void> {
        await this.enableInstances(this.stoppedInstances, true);
    }

    /**
     * Start or stop given instances
     *
     * @param instances id of instances which will be stopped
     * @param enabled if enable or disable instances
     */
    async enableInstances(instances: string[], enabled: boolean): Promise<void> {
        const ts = Date.now();
        for (const instance of instances) {
            const updatedObj = {
                common: {
                    enabled
                },
                from: `system.host.${this.hostname}`,
                ts
            } as Partial<ioBroker.InstanceObject>;

            await this.objects.extendObjectAsync(instance, updatedObj);
        }
    }

    /**
     * Install given version of adapter
     */
    async performUpgrade(): Promise<void> {
        const res = await tools.installNodeModule(`${tools.appName}.${this.adapterName}@${this.version}`, {
            cwd: '/opt/iobroker',
            debug: true
        });

        this.response.stderr.push(...res.stderr.split('\n'));
        this.response.stdout.push(...res.stdout.split('\n'));

        if (res.stderr) {
            this.logger.error(`${this.hostname} ${res.stderr}`);
        } else if (res.stdout) {
            this.logger.info(`${this.hostname} ${res.stdout}`);
        }

        this.response.success = res.success;
        await this.setFinished();
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
     * Shuts down the server, restarts the adapter and exits the program
     */
    shutdownApp(): void {
        if (this.shutdownAbortController) {
            this.shutdownAbortController.abort();
        }

        if (!this.server) {
            process.exit();
        }

        this.server.close(async () => {
            await this.startAdapter();
            this.logger.info(`${this.hostname} Successfully started adapter`);

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
            this.logger.info(`${this.hostname} Final information delivered`);
            this.shutdownApp();
        }
    }

    /**
     * Get all instances of the adapter
     */
    async getAllEnabledInstances(): Promise<string[]> {
        const res = await this.objects.getObjectListAsync({
            startkey: `system.adapter.${this.adapterName}.`,
            endkey: `system.adapter.${this.adapterName}.\u9999`
        });

        let enabledInstances: string[] = [];

        if (res) {
            enabledInstances = res.rows
                .filter(row => row.value.common.enabled && this.hostname === row.value.common.host)
                .map(row => row.value._id);
        }

        return enabledInstances;
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
            this.logger.info(`${this.hostname} Server is running on http://localhost:${port}`);
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
            this.logger.info(`${this.hostname} Server is running on http://localhost:${port}`);
        });
    }

    /**
     * Get certificates from the DB
     *
     * @param params certificate information
     */
    async getCertificates(params: GetCertificatesParams): Promise<Certificates> {
        const { certPublicName, certPrivateName } = params;

        const obj = await this.objects.getObjectAsync('system.certificates');

        if (!obj) {
            throw new Error('No certificates found');
        }

        const certs = obj.native.certificates;

        return { certPrivate: certs[certPrivateName], certPublic: certs[certPublicName] };
    }

    /**
     * Tells the upgrade manager, that server can be shut down on next response or on timeout
     */
    async setFinished(): Promise<void> {
        this.response.running = false;

        await this.startShutdownTimeout();
    }

    /**
     * Start a timeout which starts adapter and shuts down the server if expired
     */
    async startShutdownTimeout(): Promise<void> {
        this.shutdownAbortController = new AbortController();
        try {
            await wait(this.SHUTDOWN_TIMEOUT, null, { signal: this.shutdownAbortController.signal });

            this.logger.info(`${this.hostname} Timeout expired, initializing shutdown`);
            this.shutdownApp();
        } catch (e) {
            if (e.code !== 'ABORT_ERR') {
                this.logger.error(`${this.hostname} ${e.message}`);
            }
        }
    }
}
