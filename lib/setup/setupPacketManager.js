'use strict';

// TODO: how to pass sudo requirement for apt-get?

const exec = require('child_process').exec;

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

    _isCmd(cmd) {
        return new Promise(resolve => {
            try {
                const _cmd = exec(cmd, {windowsHide: true}, (err, stdout, stderr) => {
                    if (!stderr) {
                        resolve(cmd);
                    } else {
                        resolve();
                    }
                });

                _cmd.on('error', e => {
                    console.error(e);
                    resolve();
                });
            } catch (e) {
                console.error(e);
                resolve();
            }
        });
    }

    _isDpkgAvailable() {
        return new Promise(resolve => {
            try {
                const _cmd = exec('dpkg', {windowsHide: true}, (err, stdout, stderr) => {
                    if ((stdout && stdout.includes('dpkg --help')) || (stderr && stderr.includes('dpkg --help'))) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });

                _cmd.on('error', e => {
                    this.logger && this.logger.error('Cannot detect dpkg: ' + e);
                    resolve(false);
                });
            } catch (e) {
                this.logger && this.logger.error('Cannot detect dpkg: ' + e);
                resolve(false);
            }
        });
    }

    _isSudoAvailable() {
        return new Promise(resolve => {
            try {
                const _cmd = exec('sudo', {windowsHide: true}, (err, stdout, stderr) => {
                    if ((stdout && stdout.includes('sudo -h')) || (stderr && stderr.includes('sudo -h'))) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });

                _cmd.on('error', e => {
                    this.logger && this.logger.error('Cannot detect sudo: ' + e);
                    resolve(false);
                });
            } catch (e) {
                this.logger && this.logger.error('Cannot detect sudo: ' + e);
                resolve(false);
            }
        });
    }

    _isSudoAvailableForManager() {
        return new Promise(resolve => {
            try {
                const _cmd = exec('sudo -n ' + this.manager + ' -v', {windowsHide: true}, (err, stdout, stderr) => {
                    this.logger && stderr && this.logger.error('Cannot detect "sudo -n ' + this.manager + ' -v": ' + stderr);
                });
                _cmd.on('exit', code => {
                    if (!code) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
                _cmd.on('error', e => {
                    this.logger && this.logger.error('Cannot detect sudo: ' + e);
                    resolve(false);
                });
            } catch (e) {
                this.logger && this.logger.error('Cannot detect sudo: ' + e);
                resolve(false);
            }
        });
    }

    _detectManager() {
        return this._isCmd('apt-get')
            .then(result => {
                if (result) {
                    this.manager = result;
                    return this.manager;
                } else {
                    return this._isCmd('apt');
                }
            })
            .then(result => {
                if (result) {
                    this.manager = result;
                    return this.manager;
                } else {
                    return this._isCmd('yum');
                }
            })
            .then(result => {
                if (result) {
                    this.manager = result;
                    return this.manager;
                } else {
                    this.logger && this.logger.info('No supported packet manager found');
                    return Promise.reject('No supported packet manager found');
                }
            });
    }

    _listPackages() {
        if (!this.dpkg) {
            return Promise.reject('No dpkg detected');
        } else {
            return new Promise(resolve => {
                try {
                    const _cmd = exec((this.sudo ? 'sudo ' : '') + 'dpkg -l', {windowsHide: true}, (err, stdout) => {
                        if (stdout) {
                            resolve(stdout);
                        } else {
                            resolve('');
                        }
                    });

                    _cmd.on('error', () => resolve(''));
                } catch (e) {
                    resolve('');
                }
            });
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

    _installPacket(packet) {
        if (!this.manager) {
            // ignore
            return Promise.resolve(true);
        }
        return new Promise(resolve => {
            try {
                const _cmd = exec((this.sudo ? 'sudo ' : '') + this.manager + ' install ' + packet + ' -y', {windowsHide: true}, (err, stdout) => {
                    if (err) {
                        this.logger.error(`Cannot install ${packet}: ${err.toString()}`);
                        resolve();
                    } else {
                        resolve(stdout);
                    }
                });

                _cmd.on('error', () => resolve());
            } catch (e) {
                resolve();
            }
        });
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
