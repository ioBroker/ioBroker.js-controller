const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const request = require('request');
const tools = require('./build-lib/tools');

const languages = ['de', 'en', 'ru'];
const FRONT_END_DIR = __dirname + '/front-end/public/';
const SRC_DOC_DIR = path.join(path.normalize(__dirname + '/../docs/')).replace(/\\/g, '/');
const IGNORE = ['/adapterref'];
const GITHUB_ROOT = 'https://github.com/ioBroker/ioBroker.docs/edit/engine/docs/';
const ADAPTERS_DIR = path.normalize(__dirname + '/../docs/LANG/adapterref/').replace(/\\/g, '/');

// possible inputs:
// [en:Bascis;de:Einleitung;ru:Основы](basics/README)
// de:Grundlagen;en:Fundamentals
// Title
async function translateTitle(title) {
    const words = {};
    title = title.trim();
    if (title.startsWith('[')) {
        const m = title.match(/\[(.+)]\((.*)\)/);
        title = m[1];
        words.link = m[2].trim();
        if (words.link.indexOf('.') === -1) {
            words.link += '.md';
        }
        /*if (!words.link.startsWith('/')) {
            words.link = '/' + words.link;
        }*/
    }
    const langs = title.split(';');
    langs.forEach(lang => {
        const parts = lang.split(':');
        if (parts.length === 2) {
            words[parts[0].trim()] = parts[1].trim();
        } else {
            words.en = lang.trim();
        }
    });
    languages.forEach(lang => {
        if (!words[lang]) {
            words[lang] = (words.en || words.de);
            if (words[lang][2] !== '!') {
                words[lang] = lang + '!' + words[lang];
            }
        }
    });
    // read title from file
    if (words.link) {
        languages.forEach(lang => {
            const name = path.join(SRC_DOC_DIR, lang, words.link);
            if (fs.existsSync(name)) {
                const data = fs.readFileSync(name).toString('utf-8');
                const title = getTitle(data);
                if (title) {
                    words[lang] = title;
                }
            }
        });
    }


    return words;
}

async function processContent(filePath) {
    const lines = fs.readFileSync(filePath).toString().replace(/\r/g, '').split('\n');
    const content = {pages: {}};
    const levels = [content, null, null, null];
    return new Promise(resolve => {
        return Promise.all(lines.map(async line => {
            const pos = line.indexOf('*');
            if (pos !== -1) {
                const level = pos / 2;
                const words = await translateTitle(line.substring(pos + 1));
                const link = words.link;
                if (link) {
                    delete words.link;
                }
                const obj = {
                    title: words
                };
                if (link) {
                    obj.content = link;
                }
                levels[level].pages = levels[level].pages || {};
                levels[level].pages[words.en] = obj;
                levels[level + 1] = obj;
            }
        })).then(result => {
            const name = filePath.replace(/\\/g, '/').split('/').pop().replace(/\.md$/, '.json');
            fs.writeFileSync(FRONT_END_DIR + name, JSON.stringify(content, null, 2));
            resolve(content);
        });
    });
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

async function translateFile(fileName, data, originalLanguage, targetLanguage, root) {
    const name = fileName.replace('/' + originalLanguage + '/', '/' + targetLanguage + '/');
    let {header, body} = extractHeader(data);
    header.translatedFrom = originalLanguage;
    header.editLink = GITHUB_ROOT + fileName.replace(root, '');
    writeSafe(path.join(FRONT_END_DIR, name.replace(root, '/')), addHeader(body, header));
    console.log(`WARNING: File ${fileName.replace(root, '/')} was translated from ${originalLanguage} to ${targetLanguage} automatically`);
    return Promise.resolve();
}

function writeSafe(fileName, data) {
    const parts = fileName.replace(/\\/g, '/').split('/');
    parts.pop();
    let dir = [];
    parts.forEach(part => {
        dir.push(part);
        !fs.existsSync(dir.join('/')) && fs.mkdirSync(dir.join('/'));
    });
    fs.writeFileSync(fileName, data);
}

// read file and copy it in the front-end directory
async function processFile(fileName, lang, root) {
    root     = root.replace(/\\/g, '/');
    fileName = fileName.replace(/\\/g, '/');

    let data = fs.readFileSync(fileName);
    if (fileName.match(/\.md$/)) {
        let {header, body} = extractHeader(data.toString());
        header.editLink = GITHUB_ROOT + fileName.replace(root, '');
        data = addHeader(body, header);
    }
    writeSafe(path.join(FRONT_END_DIR, fileName.replace(root, '/')).replace(/\\/g, '/'), data);

    return Promise.all(languages.filter(ln => ln !== lang).map(ln => {
        const name = fileName.replace('/' + lang + '/', '/' + ln + '/');

        if (!fs.existsSync(name)) {
            if (name.match(/\.md$/)) {
                // create automatic translation
                const langName = path.join(FRONT_END_DIR, name.replace(root, '/')).replace(/\\/g, '/');
                if (!fs.existsSync(langName)) {
                    return translateFile(fileName, data.toString('utf-8'), lang, ln, root);
                } else {
                    return Promise.resolve();
                }
            } else {
                console.log(`ERROR: File ${fileName.replace(root, '/')} cannot be translated from ${lang} to ${ln} automatically!`);
                writeSafe(path.join(FRONT_END_DIR, name.replace(root, '/')).replace(/\\/g, '/'), data);
            }
        } else {
            // the file will be copied later
            return Promise.resolve();
        }
    }));
}

// process all files in directory recursively
async function processFiles(root, lang, originalRoot) {
    root = root.replace(/\\/g, '/');
    if (!lang) {
        return Promise.all(languages.map(lang =>
            processFiles(path.join(root, lang).replace(/\\/g, '/'), lang, root)));
    } else {
        const promises = fs.readdirSync(root).filter(name => !name.startsWith('_')).map(name => {
            const fileName = path.join(root, name).replace(/\\/g, '/');
            const stat = fs.statSync(fileName);
            if (stat.isDirectory()) {
                if (IGNORE.indexOf(fileName.replace(root, '')) === -1) {
                    return processFiles(fileName, lang, originalRoot);
                } else {
                    return Promise.resolve();
                }
            } else {
                return processFile(fileName, lang, originalRoot);
            }
        });
        return Promise.all(promises);
    }
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

function prepareAdapterReadme(text, targetDir, repo) {
    return new Promise(resolve => {
        let {header, body} = extractHeader(text);
        header.adapter = true;
        header.license = repo.license;

        writeSafe(targetDir + 'README.md', addHeader(body, header));
        resolve();
    });
}
const ADAPTER_TYPES = {

};
const urlsCache = {};

function getIcon(url, checkFile) {
    if (url) {
        if (checkFile && fs.existsSync(checkFile)) {
            return Promise.resolve(fs.readFileSync(checkFile));
        } else {
            return getUrl(url, true);
        }
    } else {
        return Promise.resolve();
    }
}

function getUrl(url, binary) {
    if (urlsCache[url]) {
        return urlsCache[url];
    }
    urlsCache[url] = new Promise(resolve => {
        console.log('Requested ' + url);
        request(url, {encoding: null}, (err, state, file) => {
            resolve(binary ? file : file.toString());
        });
    });
    return urlsCache[url];
}

function processAdapterLang(adapter, repo, lang, content) {
    const dirName = ADAPTERS_DIR.replace('/LANG/', '/' + lang + '/') + 'iobroker.' + adapter;

    let iconName = repo.extIcon && repo.extIcon.split('/').pop();

    // download logo
    return getIcon(repo.extIcon, FRONT_END_DIR + languages[0] + '/adapterref/iobroker.' + adapter + '/' + iconName)
        .then(icon => {
            if (icon) {
                writeSafe(FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + '/' + iconName, icon);
            } else if (adapter !== 'js-controller') {
                console.error('ADAPTER has no icon: ' + adapter);
            }

            content.pages[repo.type] = content.pages[repo.type] || {title: ADAPTER_TYPES[repo.type] || {en: repo.type}, pages: {}};
            if (fs.existsSync(dirName)) {
                content.pages[repo.type].pages[adapter] = {
                    title: {en: adapter},
                    content: 'adapterref/iobroker.' + adapter + '/README.md'
                };

                if (iconName) {
                    content.pages[repo.type].pages[adapter].icon = 'adapterref/iobroker.' + adapter + '/' + iconName;
                }

                let text = fs.readFileSync(dirName + '/README.md').toString();
                let {header, body} = extractHeader(text);
                header.adapter = true;
                header.license = repo.license;

                writeSafe(FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + '/README.md', addHeader(body, header));
                copyDir(dirName, FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + '/');
                writeSafe(FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + '/README.md', addHeader(body, header));
                return Promise.resolve();
            } else {
                if (!repo.readme) {
                    repo.readme = repo.meta.replace('io-package.json', 'README.md');
                }

                // download readme
                const link = repo.readme.replace('github.com', 'raw.githubusercontent.com').replace('/blob/master/', '/master/');
                return getUrl(link)
                    .then(body => {
                        content.pages[repo.type].pages[adapter] = {
                            title: {en: adapter},
                            content: 'adapterref/iobroker.' + adapter + '/README.md'
                        };
                        if (iconName) {
                            content.pages[repo.type].pages[adapter].icon = 'adapterref/iobroker.' + adapter + '/' + iconName;
                        }

                        return prepareAdapterReadme(body, FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + '/', repo);
                    });
            }
        });
}

function processAdapter(adapter, repo, content) {
    // Check if the documentation exists
    const promises = languages.map(lang => processAdapterLang(adapter, repo, lang, content));

    return Promise.all(promises);
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

function buildAdapterContent() {
    return new Promise(resolve => {
        const content = {pages: {}};
        // get latest repo
        request('http://iobroker.live/sources-dist-latest.json', (err, state, body) => {
            const repo = JSON.parse(body);
            const promises = Object.keys(repo).filter(a => a !== 'js-controller').map(adapter => processAdapter(adapter, repo[adapter], content));
            // const promises = [processAdapter('admin', repo.admin, content)];

            queuePromises(promises, () => {
                fs.writeFileSync(FRONT_END_DIR + 'adapters.json', JSON.stringify(content, null, 2));
                resolve(content);
            })
        });
    });
}

buildAdapterContent().then(content => {
    console.log(JSON.stringify(content));
});

/*processContent(path.join(SRC_DOC_DIR, 'content.md')).then(content => {
    console.log(JSON.stringify(content));
    //return processFiles(SRC_DOC_DIR);
});*/

//gulp.task('build', function (done) {
//    processContent(__dirname + '/docs/content.md');
//    done();
//});
