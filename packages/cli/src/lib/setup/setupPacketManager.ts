import { execAsync } from '@iobroker/js-controller-common/tools';
import type { InternalLogger } from '@iobroker/js-controller-common/build/lib/common/tools';

enum LOG_LEVELS {
    silly = 4,
    debug = 3,
    log = 3,
    info = 2,
    warn = 1,
    error = 0
}

interface Logger extends InternalLogger {
    log(message: string): void;
}

type Manager = 'apt' | 'apt-get' | 'yum' | '';

interface PacketManagerOptions {
    logLevel: LOG_LEVELS;
    manager?: Manager;
    logger?: Logger;
}

export class PacketManager {
    private manager: Manager;
    private readonly logger: Logger;
    private dpkg: boolean;
    private sudo: boolean;
    private readonly _readyPromise: Promise<void>;

    constructor(options: PacketManagerOptions = { logLevel: LOG_LEVELS.info }) {
        // detect apt, apt-get or yum
        this.manager = (options && options.manager) || '';
        this.logger = (options && options.logger) || {
            silly: text => options.logLevel >= LOG_LEVELS.silly && console.log(text),
            info: text => options.logLevel >= LOG_LEVELS.info && console.log(text),
            log: text => options.logLevel >= LOG_LEVELS.log && console.log(text),
            warn: text => options.logLevel >= LOG_LEVELS.warn && console.warn(text),
            error: text => options.logLevel >= LOG_LEVELS.error && console.error(text),
            debug: text => options.logLevel >= LOG_LEVELS.debug && console.log(text)
        };
        this.dpkg = false;
        this.sudo = false;
        this._readyPromise = this._init();
    }

    /** Starts the initialization process */
    private async _init(): Promise<void> {
        if (process.platform !== 'win32') {
            if (!this.manager) {
                const manager = await this._detectManager();
                if (manager) {
                    this.logger && this.logger.debug(`Detected packet manager: ${manager}`);
                    // Check if sudo is available for packet manager and store information
                    this.sudo = (await this._isSudoAvailable()) && (await this._isSudoAvailableForManager());
                }
            }

            // Check if dpkg is available
            this.dpkg = await this._isDpkgAvailable();
            this.logger && this.logger.debug(`Detected dpkg: ${this.dpkg}`);
        }
    }

    ready(): Promise<void> {
        return this._readyPromise;
    }

    /**
     * Tests if the given command can be executed
     * @param cmd The command to test
     * @returns True if the execution was successful, false otherwise
     */
    private async _isCmd(cmd: string): Promise<boolean> {
        try {
            const { stderr } = await execAsync(cmd);
            return !stderr;
        } catch (e) {
            // non zero exit code, however lets check if ok
            if (e.stderr === '') {
                return true;
            }
            console.error(e.stderr || e.stdout || e);
            return false;
        }
    }

    private async _isDpkgAvailable(): Promise<boolean> {
        try {
            const { stdout, stderr } = await execAsync('dpkg');
            return !!((stdout && stdout.includes('dpkg --help')) || (stderr && stderr.includes('dpkg --help')));
        } catch (err) {
            // non zero exit code, however lets check if ok
            if (
                (err.stdout && err.stdout.includes('dpkg --help')) ||
                (err.stderr && err.stderr.includes('dpkg --help'))
            ) {
                return true;
            } else {
                this.logger && this.logger.error(`Cannot detect dpkg: ${err.stderr || err.stdout || err}`);
                return false;
            }
        }
    }

    private async _isSudoAvailable(): Promise<boolean> {
        try {
            const { stdout, stderr } = await execAsync('sudo');
            return !!((stdout && stdout.includes('sudo -h')) || (stderr && stderr.includes('sudo -h')));
        } catch (err) {
            // non zero exit code, however lets check if ok
            if ((err.stdout && err.stdout.includes('sudo -h')) || (err.stderr && err.stderr.includes('sudo -h'))) {
                return true;
            } else {
                this.logger && this.logger.error(`Cannot detect sudo: ${err.stderr || err.stdout || err}`);
                return false;
            }
        }
    }

    private async _isSudoAvailableForManager(): Promise<boolean> {
        try {
            await execAsync(`sudo -n ${this.manager} -v`);
            return true;
        } catch (err) {
            this.logger &&
                this.logger.error(`Cannot detect \\"sudo -n ${this.manager} -v\\": ${err.stderr || err.stdout || err}`);
            return false;
        }
    }

    /**
     * Detects which package manager is installed. Throws if none can be found
     */
    private async _detectManager(): Promise<Manager | void> {
        for (const cmd of ['apt-get', 'apt', 'yum'] as const) {
            if (await this._isCmd(cmd)) {
                this.manager = cmd;
                return cmd;
            }
        }
        this.logger && this.logger.info('No supported packet manager found');
    }

    private async _listPackages(): Promise<string> {
        if (!this.dpkg) {
            throw new Error('No dpkg detected');
        }

        try {
            const { stdout } = await execAsync(`${this.sudo ? 'sudo ' : ''}dpkg -l`);
            const res = Buffer.isBuffer(stdout) ? stdout.toString('utf-8') : stdout;
            return res || '';
        } catch {
            // Ignore error
            return '';
        }
    }

    /**
     * Checks which packages are installed and returns them
     * @param packets The packets to test
     */
    async checkInstalled(packets: string[] | string): Promise<string[]> {
        if (!(packets instanceof Array)) {
            packets = [packets];
        }

        const installed = await this._listPackages();
        return packets.filter(p => installed.includes(p));
    }

    /**
     * Installs a single packet using the configured manager and returns the stdout if there was any
     * @param packet The packet to install
     */
    private async _installPacket(packet: string): Promise<void> {
        if (!this.manager) {
            // ignore
            return;
        }

        // if it fails, let it throw and get caught by _installPackets
        await execAsync(`${(this.sudo ? 'sudo ' : '') + this.manager} install ${packet} -y`);
    }

    /**
     * Installs multiple packets. The returned Promise contains the list of failed packets
     * @param packets
     */
    private async _installPackets(packets: string[]): Promise<string[]> {
        const failed: string[] = [];

        if (packets && packets.length) {
            // Install all packets
            for (const packet of packets) {
                try {
                    await this._installPacket(packet);
                } catch (err) {
                    failed.push(packet);
                    this.logger.error(`Cannot install "${packet}": ${err.stderr || err.stdout || err}`);
                    // Continue with the next packet
                }
            }
        }
        return failed;
    }

    /**
     * Installs all given packets
     * @param packets
     */
    async install(packets: string[] | string): Promise<void> {
        packets = packets || [];
        if (!(packets instanceof Array)) {
            packets = [packets];
        }

        await this.ready();

        // Filter empty packets out
        packets = packets && packets.filter(p => p && p.trim());

        if (!packets || !packets.length) {
            // nothing must be installed
            return;
        }
        const installed = await this.checkInstalled(packets);
        const notInstalled = packets.filter(packet => !installed.includes(packet));
        // Install all non-installed packets
        const failed = await this._installPackets(notInstalled);
        if (this.logger) {
            if (failed.length > 0) {
                this.logger.warn(
                    `The following ${this.manager || 'OS'} packages could not be installed: ${failed.join(
                        ', '
                    )}. Please install them manually.`
                );
            } else {
                notInstalled.length &&
                    this.logger.info(
                        `Installed the following ${this.manager || 'OS'} packages: ${notInstalled.join(', ')}`
                    );
                installed.length &&
                    this.logger.info(
                        `These ${this.manager || 'OS'} packages were already installed: ${installed.join(', ')}`
                    );
            }
        }
    }
}
