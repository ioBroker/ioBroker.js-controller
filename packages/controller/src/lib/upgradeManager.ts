import { ChildProcessPromise, exec as execAsync } from 'promisify-child-process';
import { tools } from '@iobroker/js-controller-common';
import { valid } from 'semver';
import { dbConnectAsync } from '@iobroker/js-controller-cli';
import http from 'http';
import https from 'https';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

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

const response: ServerResponse = {
    running: true,
    stderr: [],
    stdout: []
};

/**
 * Stops the js-controller via cli call
 */
function stopController(): ChildProcessPromise {
    return execAsync(`${tools.appNameLowerCase} stop`);
}

/**
 * Starts the js-controller via cli
 */
function startController(): ChildProcessPromise {
    return execAsync(`${tools.appNameLowerCase} start`);
}

/**
 * Print how the module should be used
 */
function printUsage(): void {
    console.info('Example usage: "node upgradeManager.js <version> <adminInstance>"');
}

/**
 * Parse the commands from the cli
 */
function parseCliCommands(): UpgradeArguments {
    const additionalArgs = process.argv.slice(2);

    const version = additionalArgs[0];
    const adminInstance = parseInt(additionalArgs[1]);

    const isValid = !!valid(version);

    if (!isValid) {
        printUsage();
        throw new Error('The provided version is not valid');
    }

    if (isNaN(adminInstance)) {
        printUsage();
        throw new Error('Please provide a valid admin instance');
    }

    return { version, adminInstance };
}

/**
 * Install given version of js-controller
 *
 * @param version version to install
 */
async function npmInstall(version: string): Promise<void> {
    const res = await tools.installNodeModule(`iobroker.js-controller@${version}`, {
        cwd: '/opt/iobroker',
        debug: true
    });

    response.stderr = res.stderr.split('\n');
    response.stdout = res.stdout.split('\n');
    response.success = res.success;

    if (!res.success) {
        throw new Error(`Could not install js-controller@${version}`);
    }
}

/**
 * Starts the web server for admin communication either secure or insecure
 *
 * @param params Web server configuration
 */
function startWebServer(params: WebServerParameters): void {
    const { useHttps } = params;

    if (useHttps) {
        startSecureWebServer(params);
    } else {
        startInsecureWebServer(params);
    }
}

/**
 * This function is called when the webserver receives a message
 *
 * @param req received message
 * @param res server response
 * @param server https or https server instance
 */
function webServerCallback(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    server: http.Server | https.Server
): void {
    res.writeHead(200);
    res.end(JSON.stringify(response));

    if (!response.running) {
        console.log('Final information delivered');

        server.close(async () => {
            await startController();
            console.log('Successfully started js-controller');

            process.exit();
        });
    }
}

/**
 * Start an insecure web server for admin communication
 *
 * @param params Web server configuration
 */
function startInsecureWebServer(params: InsecureWebServerParameters): void {
    const { port } = params;

    const server = http.createServer((req, res) => {
        webServerCallback(req, res, server);
    });

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

/**
 * Start a secure web server for admin communication
 *
 * @param params Web server configuration
 */
function startSecureWebServer(params: SecureWebServerParameters): void {
    const { port, certPublic, certPrivate } = params;

    const server = https.createServer({ key: certPrivate, cert: certPublic }, (req, res) => {
        webServerCallback(req, res, server);
    });

    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

/**
 * Get certificates from the DB
 *
 * @param params certificate information
 */
async function getCertificates(params: GetCertificatesParams): Promise<Certificates> {
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
 *
 * @param adminInstance specified admin instance
 */
async function collectWebServerParameters(adminInstance: number): Promise<WebServerParameters> {
    const { objects } = await dbConnectAsync(false);

    const obj = await objects.getObjectAsync(`system.adapter.admin.${adminInstance}`);

    if (!obj) {
        printUsage();
        throw new Error('Please provide a valid admin instance');
    }

    if (obj.native.secure) {
        const { certPublic: certPublicName, certPrivate: certPrivateName } = obj.native;
        const { certPublic, certPrivate } = await getCertificates({
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
 * Main logic
 */
async function main(): Promise<void> {
    const { version, adminInstance } = parseCliCommands();
    const webServerParameters = await collectWebServerParameters(adminInstance);

    await stopController();
    console.log('Successfully stopped js-controller');

    startWebServer(webServerParameters);

    try {
        await npmInstall(version);
    } catch (e) {
        console.error(e.message);
    }

    response.running = false;
}

/**
 * This file always needs to be executed in a process different from js-controller
 * else it will be canceled when the file itself stops the controller
 */
if (require.main === module) {
    main();
}
