import { execAsync, type InternalLogger } from '@iobroker/js-controller-common-db/tools';

enum LOG_LEVELS {
    silly = 5,
    debug = 4,
    log = 3,
    info = 2,
    warn = 1,
    error = 0,
}

interface Logger extends InternalLogger {
    log(message: string): void;
}

type Manager = 'apt' | 'yum' | '';

interface PacketManagerOptions {
    logLevel: LOG_LEVELS;
    manager?: Manager;
    logger?: Logger;
}

/** Describes a system packet that should be upgraded */
export interface UpgradePacket {
    /** Name of the packet which should be upgraded */
    name: string;
    /** Optional version */
    version?: string;
}

/** A Debian package name, optionally with the architecture, e.g. `libc6:i386` */
const APT_PACKAGE_NAME = /^[a-z0-9][a-z0-9+.-]*(?::[a-z0-9-]+)?$/;
/** A Debian version, optionally with epoch and revision, e.g. `1:2.36-9+deb12u10` */
const APT_PACKAGE_VERSION = /^[A-Za-z0-9.+~:-]+$/;

/**
 * Builds the command that upgrades exactly the given packets with apt-get.
 *
 * `apt upgrade <name>` upgrades every package of the system and only marks `<name>` in addition, and dpkg waits for
 * an answer when a configuration file was changed locally, while nobody is there to give it. `apt-get install
 * --only-upgrade` touches only the given packets (and what they need), never installs a packet that is not installed
 * yet, keeps a changed configuration file, waits for a running apt instead of failing on its lock, and gets no input.
 * All packets go into one call, so that apt resolves their dependencies together.
 * A name or version that apt would not accept is refused, as they end up in a shell command.
 *
 * @param packets the packets to upgrade, with an optional version
 * @param sudo whether apt-get has to run with sudo
 */
export function aptUpgradeCommand(packets: UpgradePacket[], sudo: boolean): string {
    const invalid = packets.filter(
        p =>
            typeof p?.name !== 'string' ||
            !APT_PACKAGE_NAME.test(p.name) ||
            (p.version !== undefined &&
                p.version !== '' &&
                (typeof p.version !== 'string' || !APT_PACKAGE_VERSION.test(p.version))),
    );
    if (invalid.length) {
        throw new Error(`Invalid package name or version: ${invalid.map(p => JSON.stringify(p)).join(', ')}`);
    }

    return [
        ...(sudo ? ['sudo'] : []),
        'apt-get install --only-upgrade -y -q',
        // keep a locally changed configuration file, take the default of the package otherwise
        '-o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold',
        // another apt, e.g. the automatic updates, is waited for up to 5 minutes
        '-o DPkg::Lock::Timeout=300',
        ...packets.map(p => (p.version ? `${p.name}=${p.version}` : p.name)),
        // whatever still asks reads the end of the input instead of waiting forever
        '</dev/null',
    ].join(' ');
}

/**
 * Wrapper around the system packet manager (apt or yum) to query and upgrade system packages
 */
export class PacketManager {
    private manager: Manager;
    private readonly logger: Logger;
    private dpkg: boolean;
    private sudo: boolean;
    private readonly _readyPromise: Promise<void>;
    private readonly COMMANDS = {
        listUpgradeable: {
            apt: 'list --upgradeable',
            yum: 'check-update',
        },
    } as const;

    /**
     * @param options The packet manager to use, a logger and the log level
     */
    constructor(options: PacketManagerOptions = { logLevel: LOG_LEVELS.info }) {
        // detect apt or yum
        this.manager = options?.manager || '';
        this.logger = options?.logger || {
            silly: text => options.logLevel >= LOG_LEVELS.silly && console.log(text),
            info: text => options.logLevel >= LOG_LEVELS.info && console.log(text),
            log: text => options.logLevel >= LOG_LEVELS.log && console.log(text),
            warn: text => options.logLevel >= LOG_LEVELS.warn && console.warn(text),
            error: text => options.logLevel >= LOG_LEVELS.error && console.error(text),
            debug: text => options.logLevel >= LOG_LEVELS.debug && console.log(text),
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
                    this.logger.debug(`Detected packet manager: ${manager}`);
                    // Check if sudo is available for packet manager and store information
                    this.sudo = (await this._isSudoAvailable()) && (await this._isSudoAvailableForManager());
                }
            }

            // Check if dpkg is available
            this.dpkg = await this._isDpkgAvailable();
            this.logger.debug(`Detected dpkg: ${this.dpkg}`);
        }
    }

    /**
     * Resolve once the packet manager has finished its asynchronous initialization
     */
    ready(): Promise<void> {
        return this._readyPromise;
    }

    /**
     * Tests if the given command can be executed
     *
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
            }
            this.logger.error(`Cannot detect dpkg: ${err.stderr || err.stdout || err}`);
            return false;
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
            }
            this.logger.error(`Cannot detect sudo: ${err.stderr || err.stdout || err}`);
            return false;
        }
    }

    private async _isSudoAvailableForManager(): Promise<boolean> {
        try {
            await execAsync(`sudo -n ${this.manager} -v`);
            return true;
        } catch (err) {
            this.logger.error(`Cannot detect \\"sudo -n ${this.manager} -v\\": ${err.stderr || err.stdout || err}`);
            return false;
        }
    }

    /**
     * Detects which package manager is installed. Throws if none can be found
     */
    private async _detectManager(): Promise<Manager | void> {
        for (const cmd of ['apt', 'yum'] as const) {
            if (await this._isCmd(cmd)) {
                this.manager = cmd;
                return cmd;
            }
        }
        this.logger.info('No supported packet manager found');
    }

    /**
     * Updates the sources if apt is used
     */
    async update(): Promise<void> {
        await this.ready();

        if (this.manager !== 'apt') {
            // ignore
            return;
        }

        try {
            await execAsync(`${(this.sudo ? 'sudo ' : '') + this.manager} update`);
        } catch (e) {
            this.logger.warn(`Cannot update apt sources: ${e.message}`);
        }
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
     *
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
     *
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
     * List all packages for which updates are available
     */
    async listUpgradeablePackages(): Promise<string[]> {
        if (!this.manager) {
            return [];
        }

        const { stdout } = await execAsync(
            `${(this.sudo ? 'sudo ' : '') + this.manager} ${this.COMMANDS.listUpgradeable[this.manager]}`,
        );

        const res = Buffer.isBuffer(stdout) ? stdout.toString('utf-8') : stdout;

        if (!res) {
            return [];
        }

        const packagesList = res.split('\n').filter(packageInfo => packageInfo.trim() !== '');
        // first line is no package, just Listing...
        packagesList.shift();

        return packagesList;
    }

    /**
     * Installs multiple packets. The returned Promise contains the list of failed packets
     *
     * @param packets list of packets to install
     */
    private async _installPackets(packets: string[]): Promise<string[]> {
        const failed: string[] = [];

        if (packets?.length) {
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
     * Upgrade given OS packets to given version or newest available version
     *
     * @param packets the packet names and version information
     */
    async upgrade(packets: UpgradePacket[]): Promise<void> {
        await this.ready();

        if (!this.manager || !packets?.length) {
            return;
        }

        if (this.manager === 'apt') {
            const command = aptUpgradeCommand(packets, this.sudo);
            // package lists that are a few days old name versions which the mirror has deleted meanwhile (404)
            await this.update();
            // no dialog of debconf: sudo drops the variable, there the closed input keeps debconf from waiting
            await execAsync(command, {
                env: { ...process.env, DEBIAN_FRONTEND: 'noninteractive' },
                maxBuffer: 16 * 1024 * 1024,
            });
            return;
        }

        for (const packet of packets) {
            const upgradeCmd = packet.version
                ? `install -y ${packet.name}-${packet.version}`
                : `upgrade -y ${packet.name}`;

            await execAsync(`${(this.sudo ? 'sudo ' : '') + this.manager} ${upgradeCmd}`);
        }
    }

    /**
     * Installs all given packets
     *
     * @param packets list of packets or single packet to upgrade
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
                        ', ',
                    )}. Please install them manually.`,
                );

                if (notInstalled.length) {
                    this.logger.info(
                        `Installed the following ${this.manager || 'OS'} packages: ${notInstalled.join(', ')}`,
                    );
                }

                if (installed.length) {
                    this.logger.info(
                        `These ${this.manager || 'OS'} packages were already installed: ${installed.join(', ')}`,
                    );
                }
            }
        }
    }
}
