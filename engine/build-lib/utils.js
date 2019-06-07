'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BADGES = [
    'shields.io',
    'herokuapp.com',
    'snyk.io',
    'appveyor.com',
    'travis-ci.org',
    'codacy.com',
    'iobroker.live',
    'greenkeeper.io',
    'nodei.co'
];

function getFileHash(text) {
    return crypto.createHash('sha256').update(text.trim()).digest('base64');
}

function queuePromises(promises, cb) {
    if (!promises || !promises.length) {
        cb && cb();
    } else {
        const task = promises.shift();
        task.then(() =>
            setTimeout(() => queuePromises(promises, cb), 100));
    }
}

function extractHeader(text) {
    const attrs = {};
    if (text === undefined || text === null) return ;
    if (text.substring(0, 3) === '---') {
        const pos = text.substring(3).indexOf('\n---');
        if (pos !== -1) {
            const _header = text.substring(3, pos + 3);
            const lines = _header.replace(/\r/g, '').split('\n');
            lines.forEach(line => {
                if (!line.trim()) {
                    return;
                }
                const pos = line.indexOf(':');
                if (pos !== -1) {
                    const attr = line.substring(0, pos).trim();
                    attrs[attr] = line.substring(pos + 1).trim();
                    attrs[attr] = attrs[attr].replace(/^['"]|['"]$/g, '');
                    if (attrs[attr] === 'true') {
                        attrs[attr] = true;
                    } else if (attrs[attr] === 'false') {
                        attrs[attr] = false;
                    } else if (parseFloat(attrs[attr]).toString() === attrs[attr]) {
                        attrs[attr] = parseFloat(attrs[attr]);
                    }
                } else {
                    attrs[line.trim()] = true;
                }
            });
            text = text.substring(pos + 7);
        }
    }

    return {header: attrs, body: trim(text, '\n').trimRight()};
}

function trim(text, char) {
    char = char || ' ';
    // remove leading \n
    while(text && text[0] === char) {
        text = text.substring(1);
    }
    // remove trailing \n
    while(text && text[text.length - 1] ===char) {
        text = text.substring(0, text.length - 1);
    }
    return text;
}

function getTitle(text) {
    let {body, header} = extractHeader(text);
    if (!header.title) {
        // remove {docsify-bla}
        body = body.replace(/{[^}]*}/g, '');
        body = body.trim();

        const lines = body.replace(/\r/g, '').split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('# ')) {
                return lines[i].substring(2).trim();
            }
        }
        return 'no title';
    } else {
        return header.title;
    }
}

function addHeader(text, header) {
    const lines = Object.keys(header).map(attr => `${attr}: ${header[attr]}`);
    lines.unshift('---');
    lines.push('---');
    return lines.join('\n') + '\n' + text;
}

function createDir(dir) {
    const parts = dir.replace(/\\/g, '/').split('/');
    let dirs = [];
    parts.forEach(part => {
        dirs.push(part);
        !fs.existsSync(dirs.join('/')) && fs.mkdirSync(dirs.join('/'));
    });
}

function writeSafe(fileName, data) {
    const parts = fileName.replace(/\\/g, '/').split('/');
    parts.pop();
    createDir(parts.join('/'));
    fs.writeFileSync(fileName, data);
}

function copyDir(source, target) {
    fs.readdirSync(source).forEach(file => {
        const sourceName = path.join(source, file);
        const targetName = path.join(target, file);
        const stat = fs.statSync(sourceName);
        if (stat.isDirectory()) {
            if (!fs.existsSync(targetName)) {
                fs.mkdirSync(targetName);
            }
            copyDir(sourceName, targetName);
        } else {
            fs.writeFileSync(targetName, fs.readFileSync(sourceName));
        }
    });
}

function delDir(source) {
    if (fs.existsSync(source)) {
        const stat = fs.statSync(source);
        if (stat.isDirectory()) {
            fs.readdirSync(source).forEach(file => {
                const sourceName = path.join(source, file);
                const stat = fs.statSync(sourceName);
                if (stat.isDirectory()) {
                    delDir(sourceName);
                    //fs.rmdirSync(sourceName)
                } else {
                    fs.unlinkSync(sourceName);
                }
            });
            fs.rmdirSync(source);
        } else {
            console.error(`${source} is not a directory`);
        }
    }
}

function extractLicenseAndChangelog(text) {
    const lines = (text || '').trim().split('\n');
    const changelog = [];
    let changelogA = false;
    const license = [];
    let licenseA = false;
    let newLines = [];
    lines.forEach(line => {
        if (line.match(/#+\sChangelog/i)) {
            changelog.push('## Changelog');
            changelogA = true;
            licenseA = false;
        } else if (line.match(/#+\sLicense/i)) {
            license.push('## License');
            changelogA = false;
            licenseA = true;
        } else if (line.match(/^# |^## /)) {
            // if some other chapter detected
            newLines.push(line);
            changelogA = false;
            licenseA = false;
        } else if (licenseA) {
            license.push(line);
        } else if (changelogA) {
            changelog.push(line);
        } else {
            newLines.push(line);
        }
    });
    while (newLines.length && !newLines[0].trim()) newLines.shift();
    while (newLines.length && !newLines[newLines.length - 1].trim()) newLines.pop();

    while (changelog.length && !changelog[0].trim()) changelog.shift();
    while (changelog.length && !changelog[changelog.length - 1].trim()) changelog.pop();

    while (license.length && !license[0].trim()) license.shift();
    while (license.length && !license[license.length - 1].trim()) license.pop();

    return {body: newLines.join('\n'), license: license.join('\n'), changelog: changelog.join('\n')};
}

function addChangelogAndLicense(body, changelog, license) {
    return body.trim().replace(/\n+$/, '') +
        (changelog ? '\n\n' + changelog.trim().replace(/\n+$/, '') : '') +
        (license ? '\n\n' + license.trim().replace(/\n+$/, '') : '');
}

function getAllFiles(root, onlyMd, _result) {
    _result = _result || [];
    fs.readdirSync(root).filter(name => !name.startsWith('_')).forEach(name => {
        const fileName = path.join(root, name).replace(/\\/g, '/');
        const stat = fs.statSync(fileName);
        if (stat.isDirectory()) {
            getAllFiles(fileName, onlyMd, _result);
        } else {
            if (!onlyMd || name.match(/\.md$/i)) {
                _result.push(fileName);
            }
        }
    });
    return _result;
}

function extractBadges(body) {
    const badges = {};

    // replace all images like "mediaDir/blabla.png" with "LN/adapterref/iobroker.adapterName/mediaDir/blabla.png"
    let images = body.match(/!\[[^\]]*]\([^)]*\)/g);
    if (images) {
        images.forEach(image => {
            const m = image.match(/!\[([^\]]*)]\(([^)]*)\)/);
            if (m && m.length === 3) {
                let alt = m[1];
                let link = m[2];
                if (link.toLowerCase().match(/^https?:\/\//) &&
                    BADGES.find(badge => link.indexOf(badge) !== -1)) {
                    badges[alt] = link;
                    body = body.replace(image, '--delete--');
                }
            }
        });
    }

    // [](https://www.npmjs.com/package/iobroker.admin)
    const lines = body.split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].indexOf('--delete--') !== -1) {
            lines.splice(i, 1);
        }
    }
    body = lines.join('\n').trim();

    return {body, badges};
}

function addBadgesToBody(body, badges) {
    if (!badges  || !Object.keys(badges).length) return body;
    const lines = body.split('\n');
    let i = 0;
    // skip logo and title
    while (lines[i].startsWith('# ') || lines[i].startsWith('![')) i++;

    lines.splice(i, 0, '');

    Object.keys(badges).map((badge, j) =>
        lines.splice(i + j + 1, 0, `![${badge}](${badges[badge]})`));

    if (lines[i + 1 + Object.keys(badges).length]) {
        lines.splice(i + 1 + Object.keys(badges).length, 0, '');
    }

    return lines.join('\n');
}

function replaceImages(body, prefix, noBadges) {
    const doDownload = [];
    const badges = {};

    if (prefix[prefix.length - 1] !== '/') {
        prefix += '/';
    }

    // replace all images like "mediaDir/blabla.png" with "LN/adapterref/iobroker.adapterName/mediaDir/blabla.png"
    let images = body.match(/!\[[^\]]*]\([^)]*\)/g);
    if (images) {
        images.forEach(image => {
            const m = image.match(/!\[([^\]]*)]\(([^)]*)\)/);
            if (m && m.length === 3) {
                let alt = m[1];
                let link = m[2];
                if (!link.toLowerCase().match(/^https?:\/\//)) {
                    doDownload.indexOf(link) === -1 && doDownload.push(link);
                    body = body.replace(image, `![${alt}](${prefix + (link[0] === '/' ? link.substring(1) : link)})`);
                } else if (!noBadges && BADGES.find(badge => link.indexOf(badge) !== -1)) {
                    badges[alt] = link;
                    body = body.replace(image, '--delete--');
                }
            }
        });

        // remove delete lines from array
        const lines = body.split('\n');
        for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i].indexOf('--delete--') !== -1) {
                lines.splice(i, 1);
            }
        }

        body = lines.join('\n');
    }

    // replace all images like "<img src="src/img/rooms/006-double-bed.svg" height="48" />" with "<img src="LN/adapterref/iobroker.adapterName/src/img/rooms/006-double-bed.svg" height="48" />"
    images = body.match(/<img [^>]+>/g);
    if (images) {
        images.forEach(image => {
            const m = image.match(/src="([^"]*)"/);
            if (m && m.length === 2) {
                let link = m[1];
                if (!link.toLowerCase().match(/^https?:\/\//)) {
                    let newImage = image.replace(link, prefix + (link[0] === '/' ? link.substring(1) : link));
                    doDownload.indexOf(link) === -1 && doDownload.push(link);
                    body = body.replace(image, newImage);
                }
            }
        });
    }

    return {body, doDownload, badges};
}

// de/adapterref/iobroker.ping/../../../en/adapterref/iobroker.ping/admin/ping.png
//
function normalizePath(path) {
    if (path.indexOf('../') !== -1) {
        const parts = path.split('/');
        const pos = parts.indexOf('..');
        if (pos > 0) {
            parts.splice(pos - 1, 2);
            path = parts.join('/');
            return normalizePath(path);
        }
    }
    return path;
}

module.exports = {
    queuePromises,
    extractHeader,
    getTitle,
    addHeader,
    createDir,
    writeSafe,
    copyDir,
    delDir,
    getFileHash,
    extractLicenseAndChangelog,
    addChangelogAndLicense,
    getAllFiles,
    extractBadges,
    addBadgesToBody,
    replaceImages,
    normalizePath,
    trim
};
