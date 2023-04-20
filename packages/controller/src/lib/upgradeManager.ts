import { spawn } from 'child_process';
import { ChildProcessPromise, exec as execAsync } from 'promisify-child-process';
import { tools } from '@iobroker/js-controller-common';
import { valid } from 'semver';

interface UpgradeArguments {
    /** Version of controller to upgrade too */
    version: string;
}

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
function npmInstall(version: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const installArgs = [
            'i',
            `iobroker.js-controller@${version}`,
            '--omit=dev',
            '--prefix',
            '/opt/iobroker',
            '--loglevel',
            'verbose'
        ];

        console.log(`Executing "npm ${installArgs.join(' ')}"`);
        const proc = spawn('npm', installArgs, {});

        proc.stdout.on('data', message => {
            console.log('stdout: ' + message);
        });

        proc.stderr.on('data', message => {
            console.error('stderr: ' + message);
        });

        proc.on('exit', code => {
            code === 0 ? resolve() : reject(new Error('Could not install js-controller'));
        });
    });
}

/**
 * Main logic
 */
async function main(): Promise<void> {
    const { version } = parseCliCommands();
    await stopController();
    console.log('Successfully stopped js-controller');

    await npmInstall(version);

    await startController();
    console.log('Successfully started js-controller');
}

/**
 * This file always needs to be executed in a process different from js-controller
 * else it will be canceled when the file itself stops the controller
 */
if (require.main === module) {
    main();
}
