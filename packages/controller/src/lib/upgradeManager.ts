import { ChildProcessPromise, exec as execAsync } from 'promisify-child-process';
import { tools } from '@iobroker/js-controller-common';
import { valid } from 'semver';
import http from 'http';

interface UpgradeArguments {
    /** Version of controller to upgrade too */
    version: string;
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
    console.info('Example usage: "node upgradeManager.js <version>"');
}

/**
 * Parse the commands from the cli
 */
function parseCliCommands(): UpgradeArguments {
    const additionalArgs = process.argv.slice(2);

    const version = additionalArgs[0];
    const isValid = !!valid(version);

    if (!isValid) {
        printUsage();
        throw new Error('The provided version is not valid');
    }

    return { version };
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
 * Starts the web server for admin communication
 */
function startWebServer(): void {
    // TODO: use admin protocol and certs
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end(JSON.stringify(response));
        if (!response.running) {
            console.log('Final information delivered, shutting down');
            server.close(() => {
                process.exit();
            });
        }
    });

    // TODO: use admin port?
    server.listen('8086', () => {
        console.log('Server is running on http://localhost:8086');
    });
}

/**
 * Main logic
 */
async function main(): Promise<void> {
    const { version } = parseCliCommands();
    startWebServer();

    await stopController();
    console.log('Successfully stopped js-controller');

    try {
        await npmInstall(version);
        await startController();
        console.log('Successfully started js-controller');
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
