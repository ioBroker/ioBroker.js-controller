
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
        const lines = text.split('\n');
        const content = {};
        let current = [null, null, null, null, null];

        let license = false;
        let log = false;
        const licenseLines = [];
        const changeLog = [];

        lines.forEach((line, i) => {
            if (line.startsWith('=========')) {
                line = '';
                lines[i] = '--delete--';
            }
            if (header.adapter) {
                if (!license && lines[i].startsWith('## License')) {
                    license = true;
                    log = false;
                    lines[i] = '--delete--';
                    line = '';
                } else if (license) {
                    licenseLines.push(lines[i]);
                    lines[i] = '--delete--';
                    line = '';
                }
                if (license && lines[i].startsWith('## ')) {
                    license = false;
                }

                if (!log && lines[i].match(/^## Changelog/i)) {
                    log = true;
                    license = false;
                    lines[i] = '--delete--';
                    line = '';
                } else if (log) {
                    changeLog.push(lines[i]);
                    lines[i] = '--delete--';
                    line = '';
                }
                if (log && lines[i].startsWith('## ')) {
                    log = false;
                }
            }

            if (line.trim().startsWith('@@@')) {
                lines[i] = line.substring(3).trim();
                const _ll = [];

                let j = i;
                while (j < lines.length && !lines[j].match(/@@@$/)) {
                    _ll.push(lines[j]);
                    lines[j] = '';
                    j++;
                }
                _ll.push(lines[j].replace(/@@@$/, ''));
                lines[j] = '';

                if (j > i + 1) {
                    _ll[0] = '<b>' + _ll[0] + '</b>';
                }

                lines[i] = `<div class="notice" markdown>
    ${_ll.join('\n')}
    </div>`;
            } else if (line.startsWith('?> ') || line.startsWith('!> ') || line.startsWith('> ')) {
                const _ll = [line.substring(3) + '<br/>'];
                let j = i + 1;
                while (j < lines.length && lines[j].startsWith('   ')) {
                    _ll.push(lines[j].substring(3));
                    lines[j] = '';
                    j++;
                }
                if (j > i + 1) {
                    _ll[0] = '<b>' + _ll[0] + '</b>';
                }

                lines[i] = `<div class="${line[0] === '?' ? 'warn' : (line[0] === '!' ? 'alarm' : 'notice')}" markdown>
    ${_ll.join('\n')}
    </div>`;
            } else if (line.startsWith('## ')) {
                const cont = Utils.findTitle(line, 0, path);
                content[cont.href] = cont;
                current[0] = cont;
                current[2] = null;
                current[3] = null;
                current[4] = null;
                current[5] = null;
            } else if (line.startsWith('### ')) {
                const cont = Utils.findTitle(line, 1, path);
                content[cont.href] = cont;

                if (current[0]) {
                    current[0].children = current[0].children || [];
                    current[0].children.push(cont.href);
                }

                current[1] = cont;
                current[2] = null;
                current[3] = null;
                current[4] = null;
            } else if (line.startsWith('#### ')) {
                const cont = Utils.findTitle(line, 2, path);
                content[cont.href] = cont;
                if (current[1]) {
                    current[1].children = current[1].children || [];
                    current[1].children.push(cont.href);
                }

                current[2] = cont;
                current[3] = null;
                current[4] = null;
            } else if (line.startsWith('##### ')) {
                const cont = Utils.findTitle(line, 3, path);
                content[cont.href] = cont;
                if (current[2]) {
                    current[2].children = current[2].children || [];
                    current[2].children.push(cont.href);
                }

                current[3] = cont;
                current[4] = null;
            }
        });
        return {
            lines: lines.filter(line => line !== '--delete--'),
            content,
            changeLog: changeLog.join('\n'),
            license: licenseLines.join('\n')
        };
    }
}

export default Utils;
