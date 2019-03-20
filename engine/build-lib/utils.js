const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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
    return {header: attrs, body: text};
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

module.exports = {
    queuePromises,
    extractHeader,
    getTitle,
    addHeader,
    createDir,
    writeSafe,
    copyDir,
    delDir,
    getFileHash
};
