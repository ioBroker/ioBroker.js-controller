'use strict';
const exec = require('child_process').exec;

class PacketManager {
    constructor(options) {
        // detect apt, apt-get or yum
        this.manager = (options && options.manager) || '';
        this.logger = (options && options.logger) || {
            log: text => console.log(text),
            warn: text => console.warn(text),
            error: text => console.error(text),
            debug: text => console.log(text)
        };
        this.dpkg = false;

        if (process.platform !== 'win32') {
            !this.manager && this._detectManager()
                .then(manager => this.logger && this.logger.debug('Detected packet manager: ' + manager));

            this._isDpkgAvailable().then(result => {
                this.dpkg = !!result;
                this.logger && this.logger.debug('Detected dpkg: ' + this.dpkg);
            });
        }
    }

    _isCmd(cmd) {
        return new Promise(resolve => {
            try {
                const _cmd = exec(cmd, {windowsHide: true}, (err, stdout) => {
                    if (stdout && stdout.includes(cmd + ' [options]')) {
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
                } else {
                    this.logger && this.logger.warn('No packet manager found');
                }
                return this.manager;
            });
    }

    _listPackages() {
        if (!this.dpkg) {
            return Promise.reject('No dpkg detected');
        } else {
            return new Promise(resolve => {
                try {
                    const _cmd = exec('dpkg -l', {windowsHide: true}, (err, stdout) => {
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
                const _cmd = exec(this.manager + ' install ' + packet, {windowsHide: true}, (err, stdout) => {
                    if (err) {
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

    install(packets) {
        if (!(packets instanceof Array)) {
            packets = [packets];
        }

        return this.checkInstalled(packets)
            .then(result => {
                packets = packets.filter((name, i) => result[i]);
                return Promise.all(packets.map(packet => this._installPacket(packet)));
            })
            .catch(() => this.logger && this.logger.warn('Some packets could not be installed. Please install them manually'));
    }
}

module.exports = PacketManager;
