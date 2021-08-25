'use strict';

// TODO: how to pass sudo requirement for apt-get?

const { execAsync } = require('../tools');

const LOG_LEVELS = {
    'silly': 4,
    'debug': 3,
    'log': 3,
    'info': 2,
    'warn': 1,
    'error': 0
};

class PacketManager {
    constructor(options) {
        options = options || {logLevel: LOG_LEVELS.info};

        // detect apt, apt-get or yum
        /** @type {string} */
        this.manager = (options && options.manager) || '';
        this.logger = (options && options.logger) || {
            silly: text => options.logLevel >= LOG_LEVELS.silly && console.log(text),
            info:  text => options.logLevel >= LOG_LEVELS.info  && console.log(text),
            log:   text => options.logLevel >= LOG_LEVELS.log   && console.log(text),
            warn:  text => options.logLevel >= LOG_LEVELS.warn  && console.warn(text),
            error: text => options.logLevel >= LOG_LEVELS.error && console.error(text),
            debug: text => options.logLevel >= LOG_LEVELS.debug && console.log(text)
        };
        this.dpkg = false;
        this.sudo = false;
        this._readyPromise = this._init();
    }

    /** Starts the initialization process */
    async _init() {
        if (process.platform !== 'win32') {
            if (!this.manager) {
                const manager = await this._detectManager();
                this.logger && this.logger.debug('Detected packet manager: ' + manager);
                // Check if sudo is available for packet manager and store information
                this.sudo = await this._isSudoAvailable() && await this._isSudoAvailableForManager();
            }

            // Check if dpkg is available
            this.dpkg = await this._isDpkgAvailable();
            this.logger && this.logger.debug(`Detected dpkg: ${this.dpkg}`);
        }
    }

    ready() {
        return this._readyPromise;
    }

    /**
     * Tests if the given command can be executed
     * @param {string} cmd The command to test
     * @returns {Promise<boolean>} True if the execution was successful, false otherwise
     */
    async _isCmd(cmd) {
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

    async _isDpkgAvailable() {
        try {
            const { stdout, stderr } = await execAsync('dpkg');
            return !!((stdout && stdout.includes('dpkg --help')) || (stderr && stderr.includes('dpkg --help')));
        } catch (e) {
            // non zero exit code, however lets check if ok
            if ((e.stdout && e.stdout.includes('dpkg --help')) || (e.stderr && e.stderr.includes('dpkg --help'))) {
                return true;
            }
            this.logger && this.logger.error(`Cannot detect dpkg: ${e.stderr || e.stdout || e}`);
            return false;
        }
    }

    async _isSudoAvailable() {
        try {
            const { stdout, stderr } = await execAsync('sudo');
            return !!((stdout && stdout.includes('sudo -h')) || (stderr && stderr.includes('sudo -h')));
        } catch (e) {
            // non zero exit code, however lets check if ok
            if ((e.stdout && e.stdout.includes('sudo -h')) || (e.stderr && e.stderr.includes('sudo -h'))) {
                return true;
            }
            this.logger && this.logger.error(`Cannot detect sudo: ${e.stderr || e.stdout || e}`);
            return false;
        }
    }

    async _isSudoAvailableForManager() {
        try {
            await execAsync(`sudo -n ${this.manager} -v`);
            return true;
        } catch (e) {
            this.logger && this.logger.error(`Cannot detect \\"sudo -n ${this.manager} -v\\": ${e.stderr || e.stdout || e}`);
            return false;
        }
    }

    /**
     * Detects which package manager is installed. Throws if none can be found
     */
    async _detectManager() {
        for (const cmd of ['apt-get', 'apt', 'yum']) {
            if (await this._isCmd(cmd)) {
                this.manager = cmd;
                return cmd;
            }
        }
        this.logger && this.logger.info('No supported packet manager found');
    }

    async _listPackages() {
        if (!this.dpkg) {
            throw new Error('No dpkg detected');
        }

        try {
            const { stdout } = await execAsync(`${this.sudo ? 'sudo ' : ''}dpkg -l`);
            return stdout || '';
        } catch {
            // Ignore error
            return '';
        }
    }

    /**
     * Checks which packages are installed and returns them
     * @param {string[]} packets The packets to test
     * @returns {Promise<string[]>}
     */
    async checkInstalled(packets) {
        if (!(packets instanceof Array)) {
            packets = [packets];
        }

        const installed = await this._listPackages();
        return packets.filter(p => installed.includes(p));
    }

    /**
     * Installs a single packet using the configured manager and returns the stdout if there was any
     * @param {string} packet The packet to install
     */
    async _installPacket(packet) {
        if (!this.manager) {
            // ignore
            return true;
        }

        // if it fails, let it throw and get caught by _installPackets
        const { stdout } = await execAsync(`${(this.sudo ? 'sudo ' : '') + this.manager} install ${packet} -y`);
        return stdout;
    }

    /**
     * Installs multiple packets. The returned Promise contains the list of failed packets
     * @param {string[]} packets
     * @returns {Promise<string[]>}
     */
    async _installPackets(packets) {
        /** @type {string[]} */
        const failed = [];

        if (packets && packets.length) {
            // Install all packets
            for (const packet of packets) {
                try {
                    await this._installPacket(packet);
                } catch (e) {
                    failed.push(packet);
                    this.logger.error(`Cannot install "${packet}": ${e.stderr || e.stdout || e}`);
                    // Continue with the next packet
                }
            }
        }
        return failed;
    }

    /**
     * Installs all given packets
     * @param {string[] | string} packets
     * @returns {Promise<void>}
     */
    async install(packets) {
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
                this.logger.warn(`The following ${this.manager || 'OS'} packages could not be installed: ${failed.join(', ')}. Please install them manually.`);
            } else {
                notInstalled.length && this.logger.info(`Installed the following ${this.manager || 'OS'} packages: ${notInstalled.join(', ')}`);
                installed.length && this.logger.info(`These ${this.manager || 'OS'} packages were already installed: ${installed.join(', ')}`);
            }
        }
    }
}

module.exports = PacketManager;
