import { tools } from '@iobroker/js-controller-common';
import http from 'node:http';
import https from 'node:https';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';
import type { Client as StatesClient } from '@iobroker/db-states-redis';
import { setTimeout as wait } from 'node:timers/promises';
import type { Logger } from 'winston';
import { Upgrade, type ProcessExitCallback } from '@iobroker/js-controller-cli';
import type { Socket } from 'node:net';
import type { Duplex } from 'node:stream';

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

type SecureWebServerParameters = Omit<InsecureWebServerParameters, 'useHttps'> & {
    useHttps: true;
    certPrivateName: string;
    certPublicName: string;
};
type WebServerParameters = InsecureWebServerParameters | SecureWebServerParameters;

export type AdapterUpgradeManagerOptions = {
    /** Version of adapter to upgrade too */
    version: string;
    /** Name of the adapter to upgrade */
    adapterName: string;
    /** The objects DB client */
    objects: ObjectsClient;
    /** The states DB client */
    states: StatesClient;
    /** A logger instance */
    logger: Logger;
} & WebServerParameters;

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
    /** Wait ms until adapter is stopped */
    private readonly STOP_TIMEOUT_MS = 3_000;
    /** Wait ms for delivery of final response */
    private readonly SHUTDOWN_TIMEOUT = 10_000;
    /** Name of the adapter to upgrade */
    private readonly adapterName: string;
    /** Desired adapter version */
    private readonly version: string;
    /** Response send by webserver */
    private readonly response: ServerResponse = {
        running: true,
        stderr: [],
        stdout: [],
    };
    /** Used to stop the stop shutdown timeout */
    private shutdownAbortController?: AbortController;
    /** Logger to log to file and other transports */
    private readonly logger: Logger;

    /** The server used for communicating upgrade status */
    private server?: https.Server | http.Server;
    /** All socket connections of the webserver */
    private sockets = new Set<Socket | Duplex>();
    /** Name of the host for logging purposes */
    private readonly hostname = tools.getHostName();
    /** The objects DB client */
    private readonly objects: ObjectsClient;
    /** The states DB client */
    private readonly states: StatesClient;
    /** List of instances which have been stopped */
    private stoppedInstances: string[] = [];
    /** If webserver should be started with https */
    private readonly useHttps: boolean;
    /** Public certificate name if https is desired */
    private readonly certPublicName?: string;
    /** Private certificate name if https is desired */
    private readonly certPrivateName?: string;
    /** Port where the webserver should be running */
    private readonly port: number;

    constructor(options: AdapterUpgradeManagerOptions) {
        this.adapterName = options.adapterName;
        this.version = options.version;
        this.logger = options.logger;
        this.objects = options.objects;
        this.states = options.states;
        this.useHttps = options.useHttps;
        this.port = options.port;

        if (options.useHttps) {
            this.certPublicName = options.certPublicName;
            this.certPrivateName = options.certPrivateName;
        }
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
                    enabled,
                },
                from: `system.host.${this.hostname}`,
                ts,
            } as Partial<ioBroker.InstanceObject>;

            await this.objects.extendObjectAsync(instance, updatedObj);
        }
    }

    /**
     * Install given version of adapter
     */
    async performUpgrade(): Promise<void> {
        const processExitHandler: ProcessExitCallback = exitCode => {
            this.log(`Upgrade process exited with code: ${exitCode}`, true);
        };

        const upgrade = new Upgrade({
            objects: this.objects,
            processExit: processExitHandler,
            states: this.states,
            params: {},
        });

        try {
            await upgrade.upgradeAdapter(undefined, `${this.adapterName}@${this.version}`, true, true, false);
            this.response.success = true;
            this.log(`Successfully upgraded ${this.adapterName} to version ${this.version}`);
        } catch (e) {
            this.log(e.message, true);
            this.response.success = false;
        }

        await this.setFinished();
    }

    /**
     * Starts the web server for admin communication either secure or insecure
     */
    async startWebServer(): Promise<void> {
        if (this.useHttps && this.certPublicName && this.certPrivateName) {
            await this.startSecureWebServer({
                certPublicName: this.certPublicName,
                certPrivateName: this.certPrivateName,
                port: this.port,
                useHttps: true,
            });
        } else {
            this.startInsecureWebServer({ port: this.port, useHttps: false });
        }
    }

    /**
     * Shuts down the server, restarts the adapter
     */
    shutdownServer(): void {
        if (this.shutdownAbortController) {
            this.shutdownAbortController.abort();
        }

        if (!this.server) {
            return;
        }

        this.destroySockets();

        this.server.close(async () => {
            await this.startAdapter();
            this.log('Successfully started adapter');
        });
    }

    /**
     * Destroy all sockets, to prevent requests from keeping server alive
     */
    destroySockets(): void {
        for (const socket of this.sockets) {
            socket.destroy();
            this.sockets.delete(socket);
        }
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
            this.shutdownServer();
        }
    }

    /**
     * Get all instances of the adapter
     */
    async getAllEnabledInstances(): Promise<string[]> {
        const res = await this.objects.getObjectListAsync({
            startkey: `system.adapter.${this.adapterName}.`,
            endkey: `system.adapter.${this.adapterName}.\u9999`,
        });

        let enabledInstances: string[] = [];

        enabledInstances = res.rows
            .filter(row => row.value.common.enabled && this.hostname === row.value.common.host)
            .map(row => row.value._id);

        return enabledInstances;
    }

    /**
     * Log via logger and provide the logs for the server too
     *
     * @param message the message which will be logged
     * @param error if it is an error
     */
    log(message: string, error = false): void {
        if (error) {
            this.logger.error(`host.${this.hostname} ${message}`);
            this.response.stderr.push(message);
            return;
        }

        this.logger.info(`host.${this.hostname} [WEBSERVER_UPGRADE] (${this.adapterName}) ${message}`);
        this.response.stdout.push(message);
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

        this.monitorSockets(this.server);

        this.server.listen(port, () => {
            this.log(`Server is running on http://localhost:${port}`);
        });
    }

    /**
     * Start a secure web server for admin communication
     *
     * @param params Web server configuration
     */
    async startSecureWebServer(params: SecureWebServerParameters): Promise<void> {
        const { port, certPublicName, certPrivateName } = params;

        const { certPublic, certPrivate } = await this.getCertificates({ certPublicName, certPrivateName });

        this.server = https.createServer({ key: certPrivate, cert: certPublic }, (req, res) => {
            this.webServerCallback(req, res);
        });

        this.monitorSockets(this.server);

        this.server.listen(port, () => {
            this.log(`Server is running on http://localhost:${port}`);
        });
    }

    /**
     * Keep track of all existing sockets
     *
     * @param server the webserver
     */
    monitorSockets(server: http.Server | https.Server): void {
        server.on('connection', socket => {
            this.sockets.add(socket);

            server.once('close', () => {
                this.sockets.delete(socket);
            });
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
    private async setFinished(): Promise<void> {
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

            this.log('Timeout expired, initializing shutdown');
            this.shutdownServer();
        } catch (e) {
            if (e.code !== 'ABORT_ERR') {
                this.log(e.message, true);
            }
        }
    }
}
