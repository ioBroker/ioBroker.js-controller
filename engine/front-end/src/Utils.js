
class Utils {

    static extractHeader(text) {
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

    static addHeader(text, header) {
        const lines = Object.keys(header).map(attr => `${attr}: ${header[attr]}`);
        lines.unshift('---');
        lines.push('---');
        return lines.join('\n') + '\n' + text;
    }

    static removeDocsify(text) {
        const m = text.match(/{docsify-[^}]*}/g);
        if (m) {
            m.forEach(doc => text = text.replace(doc, ''));
        }
        return text;
    }

    static getTitle(text) {
        let {body, header} = Utils.extractHeader(text);
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
            return '';
        } else {
            return header.title;
        }
    }

    static text2link(text) {
        const m = text.match(/\d+\.\)\s/);
        if (m) {
            text = text.replace(m[0], m[0].replace(/\s/, '&nbsp;'));
        }

        return text.replace(/[^a-zA-Zа-яА-Я0-9]/g, '').trim().replace(/\s/g, '').toLowerCase();
    }

    static text2docLink(text, path) {
        const m = text.match(/\[([^\]]*)]\(([^)]*)\)/);
        if (m) {
            const parts = path.split('/');
            parts.pop();
            return {link: parts.join('/') + '/' + m[2], name: m[1]};
        } else {
            return null;
        }
    }

    static findTitle(line, level, path) {
        let name = line.substring(level + 3).trim()
        // remove bold and italic modifier
            .replace(/^\*|\*$/g, '')
            .replace(/^\*|\*$/g, '')
            .replace(/^\*|\*$/g, '');

        const t = Utils.text2link(name);

        // detect <a id="Systemeinstellungen"></a>9.) Systemeinstellungen
        const m = name.match(/<a [^>]*>(.*)<\/a>/);
        if (m) {
            name = name.replace(m[0], m[1]).trim();
        }

        const link = Utils.text2docLink(name, path);

        return {
            level: level,
            title: link ? link.name : name,
            link: link ? link.link : t,
            href: t,
            external: !!link
        };
    }

    static decorateText(text, header, path) {
        path = path || '';
        const lines = text.split('\n');
        const content = {};
        let current = [null, null, null, null];

        const parts = [];
        let changeLog;
        let licenseLines;
        while (lines.length && !lines[0].trim()) lines.shift();
        while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

        let title;

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trimRight();
            let last = parts.length - 1;

            if (line.startsWith('=========')) {
                // ignore it
            } else
            if (line.match(/^# /)) {
                const cont = Utils.findTitle(line, -1, path);
                title = cont.title;
            } else
            if (line.match(/^##+ /)) {
                parts.push({lines: [line], type: 'chapter'});
                last++;
                if (line.match(/ license$/i)) {
                    parts[last].license = true;
                    licenseLines = last;
                } else
                if (line.match(/ changelog$/i)) {
                    parts[last].changelog = true;
                    changeLog = last;
                } else {
                    let level = line.split('#') - 3;
                    const cont = Utils.findTitle(line, 0, path);
                    content[cont.href] = cont;
                    current[level] = cont;
                    level++;
                    while(current[level] !== undefined) level = null;
                }
            } else
            if (line.startsWith('@@@')) {
                line = line.substring(3).trim();
                parts.push({lines: [line], type: '@@@'});
                last++;
                if (line.trim().endsWith('@@@')) {
                    parts[last].lines[0] = line.substring(0, line.length - 3);
                } else {
                    while(i + 1 < lines.length && !lines[i + 1].trim().endsWith('@@@')) {
                        parts[last].lines.push(lines[i + 1].trim());
                        i++;
                    }
                }
            } else if (line.startsWith('```')) {
                parts.push({lines: [line], type: 'code'});
                last++;
                if (!line.trim().endsWith('```')) {
                    while(i + 1 < lines.length && !lines[i + 1].trim().endsWith('```')) {
                        parts[last].lines.push(lines[i + 1]);
                        i++;
                    }
                }
            } else if (line.startsWith('?> ') || line.startsWith('!> ')) {
                parts.push({lines: [line.substring(3)], type: line.startsWith('?>') ? 'warn' : 'alarm'});
                last++;
                while(i + 1 < lines.length && lines[i + 1].trim()) {
                    parts[last].lines.push(lines[i + 1]);
                    i++;
                }
            } else if (line.startsWith('> ')) {
                parts.push({lines: [line.substring(2)], type: 'notice'});
                last++;
                while(i + 1 < lines.length && lines[i + 1].trim()) {
                    parts[last].lines.push(lines[i + 1]);
                    i++;
                }
            } else if (line.trim()) {
                parts.push({lines: [line], type: 'p'});
                last++;
                while(i + 1 < lines.length && lines[i + 1].trim()) {
                    parts[last].lines.push(lines[i + 1].trim());
                    i++;
                }
            }
        }

        if (changeLog !== undefined) {
            const _changeLog = changeLog;
            changeLog = parts[changeLog].lines.join('\n');
            parts.splice(_changeLog, 1);
        }
        if (licenseLines !== undefined) {
            const _licenseLines = licenseLines;
            licenseLines = parts[licenseLines].lines.join('\n');
            parts.splice(licenseLines, 1);
        }
        return {
            parts,
            content,
            title,
            changeLog: changeLog,
            license: licenseLines
        };
    }

    static onCopy(e, text) {
        const el = window.document.createElement('textarea');
        el.value = text;
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        window.document.body.appendChild(el);
        el.select();
        const selection = window.document.getSelection();
        const range = window.document.createRange();
        range.selectNode(el);
        selection.removeAllRanges();
        selection.addRange(range);
        console.log('copy success', window.document.execCommand('copy'));
        selection.removeAllRanges();
        window.document.body.removeChild(el);
        console.log(text);
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    static openLink(url, target) {
        if (target === 'this') {
            window.location = url;
        } else {
            window.open(url, target || '_blank');
        }
    }

    static padding(num) {
        return num > 10 ? num.toString() : '0' + num;
    }
}

export default Utils;
