const utils = require('./utils');
const consts = require('./consts');
const translation = require('./translation');
const fs = require('fs');
const path = require('path');

const IGNORE = ['/adapterref'];

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
    consts.LANGUAGES.forEach(lang => {
        if (!words[lang]) {
            words[lang] = (words.en || words.de);
            if (words[lang][2] !== '!') {
                words[lang] = lang + '!' + words[lang];
            }
        }
    });
    // read title from file
    if (words.link) {
        consts.LANGUAGES.forEach(lang => {
            const name = path.join(consts.SRC_DOC_DIR, lang, words.link);
            if (fs.existsSync(name)) {
                const data = fs.readFileSync(name).toString('utf-8');
                const title = utils.getTitle(data);
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
            fs.writeFileSync(consts.FRONT_END_DIR + name, JSON.stringify(content, null, 2));
            resolve(content);
        });
    });
}

// read file and copy it in the front-end directory
async function processFile(fileName, lang, root) {
    root     = root.replace(/\\/g, '/');
    fileName = fileName.replace(/\\/g, '/');

    let data = fs.readFileSync(fileName);
    if (fileName.match(/\.md$/)) {
        let {header, body} = utils.extractHeader(data.toString());

        header.editLink = consts.GITHUB_EDIT_ROOT + 'docs/' + fileName.replace(root, '');

        let prefix = fileName.replace(root, '');
        let pos = prefix.lastIndexOf('/');
        if (pos !== -1) {
            prefix = prefix.substring(0, pos + 1);
        }

        const res = utils.replaceImages(body, prefix, true);

        data = utils.addHeader(res.body, header);
    }

    utils.writeSafe(path.join(consts.FRONT_END_DIR, fileName.replace(root, '/')).replace(/\\/g, '/'), data);

    return Promise.resolve();

    /*return Promise.all(consts.LANGUAGES.filter(ln => ln !== lang).map(ln => {
        const name = fileName.replace('/' + lang + '/', '/' + ln + '/');

        if (!fs.existsSync(name)) {
            if (name.match(/\.md$/)) {
                // create automatic translation
                const langName = path.join(consts.FRONT_END_DIR, name.replace(root, '/')).replace(/\\/g, '/');
                if (!fs.existsSync(langName)) {
                    return translation.translateFile(fileName, data.toString('utf-8'), lang, ln, root)
                        .then(text => {
                            utils.writeSafe(path.join(consts.FRONT_END_DIR, name.replace(root, '/')), text);
                        });
                } else {
                    return Promise.resolve();
                }
            } else {
                console.log(`ERROR: File ${fileName.replace(root, '/')} cannot be translated from ${lang} to ${ln} automatically!`);
                utils.writeSafe(path.join(consts.FRONT_END_DIR, name.replace(root, '/')).replace(/\\/g, '/'), data);
            }
        } else {
            // the file will be copied later
            return Promise.resolve();
        }
    }));*/
}

// replace images during translation
function replaceImages(text, sourceFile, targetFile) {
    const lines = text.split('\n');
    targetFile = targetFile.replace(/\\/g, '/');
    sourceFile = sourceFile.replace(/\\/g, '/');
    let i = 0;
    while (sourceFile[i] === targetFile[i]) i++;
    targetFile = targetFile.substring(i);
    sourceFile = sourceFile.substring(i);
    const tParts = targetFile.split('/');
    const sParts = sourceFile.split('/');
    sParts.pop();

    const prefix = Array(tParts.length).join('../') + sParts.join('/');

    lines.forEach((line, i) => {
        // Find images in line and store it
        let m = line.match(/!\[[^]*]\([^)]+\)/g);
        if (m) {
            m.forEach(item => {
                let mm = item.match(/^!\[([^]*)]\(([^)]+)\)$/);
                if (mm) {
                    let link = mm[2].trim();
                    const text = mm[1].trim();
                    const pos = link.indexOf(' ');
                    let title = '';
                    if (pos !== -1) {
                        title = link.substring(pos + 1).trim().replace(/^"|"$/g, '');
                        link = link.substring(0, pos);
                    }
                    if (!link.match(/^https?:/)) {
                        link = prefix + (link[0] === '/' ? link : '/' + link);

                        lines[i] = lines[i].replace(item, `![${text}](${link}${title ? ' "' + title + '"' : ''})`);
                    }
                }
            });
        }
    });
    return lines.join('\n');
}

async function translateFile(sourceFileName, fromLang, toLang, root) {
    root = root || consts.SRC_DOC_DIR;
    const targetFileName = sourceFileName.replace('/' + fromLang + '/', '/' + toLang + '/');

    const resultSrc = utils.extractHeader(fs.readFileSync(sourceFileName).toString('utf-8'));
    if (!resultSrc) {
        console.error('File ' + sourceFileName  + ' is empty!!!');
        return Promise.resolve();
    }

    let header = resultSrc.header;
    if (header.translatedFrom) {
        // this is not the source
        return Promise.resolve();
    }

    header.translatedFrom = fromLang;
    header.translatedWarning = consts.TRANSLATION_NOTICE[toLang];
    header.editLink = consts.GITHUB_EDIT_ROOT + 'docs/' + targetFileName.replace(root, '');

    const data = utils.extractLicenseAndChangelog(resultSrc.body);
    const {badges, body} = utils.extractBadges(data.body);

    let localHash = utils.getFileHash(body);

    let actualText;
    if (fs.existsSync(targetFileName)) {
        let result = utils.extractHeader(fs.readFileSync(targetFileName).toString('utf-8'));
        actualText = result.body;
        if (result.header.translatedFrom !== fromLang) {
            return Promise.resolve();
        }

        // Check src hash and compare it with stored one
        if (result.header.hash === localHash) {
            return Promise.resolve();
        }
    }

    // console.log(`Translate ${fromLang} => ${toLang}: "${sourceFileName}"`);

    return translation.translateMD(fromLang, body, toLang, actualText, true, sourceFileName)
        .then(result => {
            actualText = result.result;
            actualText = replaceImages(actualText, sourceFileName, targetFileName);
            header.title = header.title || utils.getTitle(body);
            return translation.translateText(fromLang, header.title, toLang);
        }).then(title => {
            header.title = title;
            header.translatedFrom = fromLang;
            header.translatedWarning = consts.TRANSLATION_NOTICE[toLang];
            header.hash = localHash;

            return new Promise(resolve => {
                // translate badges
                Promise.all(Object.keys(badges).map(name =>
                    translation.translateText(fromLang, name, toLang)))
                    .then(results => {
                        const nBadges = {};
                        Object.keys(badges).map((name, i) => nBadges[results[i]] = badges[name]);

                        actualText = utils.addBadgesToBody(actualText, nBadges);

                        // add badges
                        utils.writeSafe(targetFileName, utils.addHeader(utils.addChangelogAndLicense(actualText, data.changelog, data.license), header));
                        console.log(`WARNING: File ${sourceFileName.replace(root, '/')} was translated from ${fromLang} to ${toLang} automatically`);
                        resolve(true);
                    });
            });
        });
}

function sync2Languages(fromLang, toLang, testDir, cb, files) {
    if (typeof testDir === 'function') {
        cb = testDir;
        testDir = '';
    }

    files = files || utils.getAllFiles(consts.SRC_DOC_DIR + fromLang, true).sort();

    if (testDir) {
        files = files.filter(file => file.indexOf('/' + testDir + '/') !== -1);
    }

    if (!files.length) {
        return cb && cb();
    }

    const file = files.shift();
    console.log(`Sync ${fromLang} => ${toLang} - ${file}`);
    translateFile(file, fromLang, toLang).then(translated => {
        if (translated) {
            const parts = file.replace(/\\/g, '/').split('/');
            parts.pop();
            const fls = utils.getAllFiles(parts.join('/'), false).sort();
            fls.filter(f => !f.match(/\.md$/))
                .forEach(file =>
                    utils.writeSafe(file.replace('/' + fromLang + '/', '/' + toLang + '/'), fs.readFileSync(file)));
        }
        setTimeout(() => sync2Languages(fromLang, toLang, testDir, cb, files), 100);
    });
}

function processTasks(tasks, testDir, cb) {
    if (typeof testDir === 'function') {
        cb = testDir;
        testDir = '';
    }

    if (!tasks || !tasks.length) {
        cb && cb();
    } else {
        const task = tasks.shift();
        sync2Languages(task.fromLang, task.toLang, testDir, () =>
            setTimeout(() => processTasks(tasks, testDir, cb), 0));
    }
}

function syncDocs(testDir, cb) {
    const tasks = [];
    if (typeof testDir === 'function') {
        cb = testDir;
        testDir = '';
    }
    consts.LANGUAGES.map(lang => {
        consts.LANGUAGES
            .filter(lang2 => lang2 !== lang)
            .map(lang2 => tasks.push({fromLang: lang, toLang: lang2}));
    });
    processTasks(tasks, testDir, cb);
}

// process all files in directory recursively
async function processFiles(root, lang, originalRoot) {
    root = root.replace(/\\/g, '/');
    if (!lang) {
        return Promise.all(consts.LANGUAGES.map(lang =>
            processFiles(path.join(root, lang).replace(/\\/g, '/'), lang, root)));
    } else {
        const promises = fs.readdirSync(root).filter(name => !name.startsWith('_') && name !== 'adapterref').map(name => {
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

if (!module.parent) {
    /*syncDocs(() => {
        processContent(path.join(consts.SRC_DOC_DIR, 'content.md'))
        .then(content => {
            console.log(JSON.stringify(content));
            return processFiles(consts.SRC_DOC_DIR);
        });
    });*/

    /*translateFile('C:/pWork/ioBroker.docs/docs/de/adapterref/iobroker.harmony/README.md', 'de', 'ru')
        .then(() => {
            console.log('done');
        })*/
    //console.log(replaceImages(fs.readFileSync('C:/pWork/ioBroker.docs/docs/ru/adapterref/iobroker.fritzbox/README.md').toString(), 'C:/pWork/ioBroker.docs/docs/de/adapterref/iobroker.fritzbox/README.md', 'C:/pWork/ioBroker.docs/docs/ru/adapterref/iobroker.fritzbox/README.md'));
    //sync2Languages('de', 'en', () => console.log('done1'), ['C:/pWork/ioBroker.docs/docs/de/README.md'])
    //syncDocs(() => console.log('DONE'));
    processFiles(consts.SRC_DOC_DIR).then(() => console.log('done'));
} else {
    module.exports = {
        processContent,
        processFiles,
        syncDocs
    };
}
