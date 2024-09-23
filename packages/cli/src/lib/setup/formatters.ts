/**
 * Format number in seconds to time text
 *
 * @param seconds
 */
export function formatSeconds(seconds: number): string {
    let _seconds: number | string = seconds;

    const days = Math.floor(_seconds / (3_600 * 24));
    _seconds %= 3_600 * 24;
    let hours: number | string = Math.floor(_seconds / 3_600);
    if (hours < 10) {
        hours = `0${hours}`;
    }
    _seconds %= 3_600;
    let minutes: number | string = Math.floor(_seconds / 60);
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    _seconds %= 60;
    _seconds = Math.floor(_seconds);
    if (_seconds < 10) {
        _seconds = `0${_seconds}`;
    }
    let text = '';
    if (days) {
        text += `${days}d. `;
    }
    text += `${hours}:${minutes}:${_seconds}`;

    return text;
}

/**
 * Format bytes to MB or GB
 *
 * @param bytes
 */
export function formatRam(bytes: number): string {
    const GB = Math.floor((bytes / (1024 * 1024 * 1024)) * 10) / 10;
    bytes %= 1024 * 1024 * 1024;
    const MB = Math.floor((bytes / (1024 * 1024)) * 10) / 10;
    let text = '';
    if (GB > 1) {
        text += `${GB} GB`;
    } else {
        text += `${MB} MB`;
    }

    return text;
}

/**
 * Format speed
 *
 * @param mhz
 */
export function formatSpeed(mhz: number): string {
    return `${mhz} MHz`;
}

/**
 * Format bytes to human readable form
 *
 * @param bytes
 */
export function formatBytes(bytes: number): string {
    if (Math.abs(bytes) < 1024) {
        return `${bytes} B`;
    }
    const units = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
        bytes /= 1024;
        ++u;
    } while (Math.abs(bytes) >= 1024 && u < units.length - 1);
    return `${bytes.toFixed(1)} ${units[u]}`;
}
