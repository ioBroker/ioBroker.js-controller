'use strict';

/**
 * Format number in seconds to time text
 * @param {!number} seconds
 * @returns {String}
 */
function formatSeconds(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    let hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = '0' + hours;
    }
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    seconds %= 60;
    seconds = Math.floor(seconds);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    let text = '';
    if (days) {
        text += days + 'd. ';
    }
    text += hours + ':' + minutes + ':' + seconds;

    return text;
}

/**
 * Format bytes to MB or GB
 * @param {!number} bytes
 * @returns {String}
 */
function formatRam(bytes) {
    const GB = Math.floor(bytes / (1024 * 1024 * 1024) * 10) / 10;
    bytes %= (1024 * 1024 * 1024);
    const MB = Math.floor(bytes / (1024 * 1024) * 10) / 10;
    let text = '';
    if (GB > 1) {
        text += GB + ' GB ';
    } else {
        text += MB + ' MB ';
    }

    return text;
}

/**
 * Format speed
 * @param {!number} mhz
 * @returns {String}
 */
function formatSpeed(mhz) {
    return mhz + ' MHz';
}

/**
 * Format bytes to human readable form
 * @param {!number} bytes
 * @returns {String}
 */

function formatBytes(bytes) {
    if (Math.abs(bytes) < 1024) {
        return bytes + ' B';
    }
    const units = ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    let u = -1;
    do {
        bytes /= 1024;
        ++u;
    } while (Math.abs(bytes) >= 1024 && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}
module.exports = {
    formatSpeed,
    formatRam,
    formatSeconds,
    formatBytes
};
