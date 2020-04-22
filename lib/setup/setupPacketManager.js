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
        /** @type {Promise<any>[]} */
        this._readyPromises = [];

        if (process.platform !== 'win32') {
            !this.manager && this._readyPromises.push(this._detectManager()
                .then(manager => {
                    this.logger && this.logger.debug('Detected packet manager: ' + manager);
                    return this._isSudoAvailable();
                })
                .then(isSudo => {
                    if (isSudo) {
                        // Check if sudo is available for packet manager and store information
                        return this._isSudoAvailableForManager().then(res => this.sudo = !!res);
                    }
                })
            );

            this._readyPromises.push(this._isDpkgAvailable().then(result => {
                this.dpkg = !!result;
                this.logger && this.logger.debug('Detected dpkg: ' + this.dpkg);
            }));
        }
    }

    ready() {
        return Promise.all(this._readyPromises);
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
            console.error(e);
            return false;
        }
    }

    async _isDpkgAvailable() {
        try {
            const { stdout, stderr } = await execAsync('dpkg');
            if ((stdout && stdout.includes('dpkg --help')) || (stderr && stderr.includes('dpkg --help'))) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            this.logger && this.logger.error('Cannot detect dpkg: ' + (e.stderr || e.stdout || e));
            return false;
        }
    }

    async _isSudoAvailable() {
        try {
            const { stdout, stderr } = await execAsync('sudo');
            if ((stdout && stdout.includes('sudo -h')) || (stderr && stderr.includes('sudo -h'))) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            this.logger && this.logger.error('Cannot detect sudo: ' + (e.stderr || e.stdout || e));
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
        throw new Error('No supported packet manager found');
    }

    async _listPackages() {
        if (!this.dpkg) {
            throw new Error('No dpkg detected');
        }

        try {
            const { stdout } = await execAsync(`${this.sudo ? 'sudo ' : ''}dpkg -l`);
            return stdout || '';
        } catch (e) {
            // Ignore error
            return '';
        }
    }

    checkInstalled(packets) {
        if (!(packets instanceof Array)) {
            packets = [packets];
        }

        return this._listPackages()
            .catch(() => '')
            .then(text => packets.map(packet => (text || '').includes(packet)));
    }

    /**
     * Installs a packet and returns the stdout if there was any
     * @param {string} packet The packet to install
     */
    async _installPacket(packet) {
        if (!this.manager) {
            // ignore
            return true;
        }
        try {
            const { stdout } = await execAsync(`${(this.sudo ? 'sudo ' : '') + this.manager} install ${packet} -y`);
            return stdout;
        } catch (e) {
            // Log error and continue
            this.logger.error(`Cannot install ${packet}: ${e.stderr || e.stdout || e}`);
        }
    }

    _installPackets(packets, cb) {
        if (!packets || !packets.length) {
            cb && cb();
        } else {
            const packet = packets.shift();

            this._installPacket(packet)
                .catch(e => this.logger.error(`Cannot install "${packet}": ` + e))
                .then(() => setImmediate(() => this._installPackets(packets, cb)));
        }
    }

    install(packets) {
        packets = packets || [];
        if (!(packets instanceof Array)) {
            packets = [packets];
        }

        return this.ready()
            .then(() => this.checkInstalled(packets))
            .then(result => {
                // filter non installed packets
                packets = packets.filter((name, i) => !result[i]);
                // install packets one after each other
                return new Promise(resolve =>
                    this._installPackets(packets, () => resolve()));
            })
            .catch(() => this.logger && this.logger.warn(`Some ${this.manager || 'OS'} packages could not be installed. Please install them manually`));
    }
}

module.exports = PacketManager;
