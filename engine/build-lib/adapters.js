// 1. Collect all possible adapters in docs/LN/adapterreff and do not collect yet local files marked as "local: true"
// 2. Cross translate adapters in master/front-end/public/LN/adapterreff. start from english

const request = require('request');
const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const consts = require('./consts');

const ADAPTERS_DIR = path.normalize(__dirname + '/../../docs/LANG/adapterref/').replace(/\\/g, '/');

const urlsCache = {};

function fixImages(lang, adapter, body) {
    const prefix = `${lang}/adapterref/iobroker.${adapter}/`;

    // replace all images like "<img src="src/img/rooms/006-double-bed.svg" height="48" />" with "<img src="LN/adapterref/iobroker.adapterName/src/img/rooms/006-double-bed.svg" height="48" />"
    const res = utils.replaceImages(body, prefix);

    return {body: res.body, badges: res.badges, doDownload: res.doDownload};
}

function getAuthor(data) {
    return data && typeof data === 'object' ? `${data.name} <${data.email}>` : data || '';
}

// scan document for images and if some local references found try to find it in the same repo.
// If not found => download them
function downloadImagesForReadme(lang, repo, data) {
    return new Promise(resolve => {
        let text = data.body;
        let {body} = utils.extractHeader(text);
        const result = fixImages(lang, repo.name, body);

        const localDirName = consts.SRC_DOC_DIR + lang + '/adapterref/iobroker.' + repo.name + '/';

        // check that all images are exists
        const promises = result.doDownload.map(link =>
            new Promise(resolve1 => {
                link = link.split('?')[0];
                link = link.split(' ')[0];

                if (!fs.existsSync(localDirName + link)) {
                    let relative;

                    if (data.link) {
                        const parts = data.link.split('/');
                        parts.pop();
                        relative = parts.join('/') + '/';
                    } else {
                        relative = link;
                    }
                    request(relative + link, {encoding: null}, (err, status, body) => {
                        err && console.error('Cannot _download ' + relative + link + ': ' + err);
                        body && utils.writeSafe(localDirName + link, body);
                        resolve1()
                    });
                } else {
                    resolve1();
                }
            }));

        Promise.all(promises).then(() =>
            resolve({body: data.body, name: data.link ? data.link.replace(data.relative, '') : 'README.md'}));
    });
}



// add system information to file header
function prepareAdapterReadme(lang, repo, data) {
    return new Promise(resolve => {
        let text = data.body;

        if (!text) {
            console.error('No data found for ' + repo.name + ': ' + data.link);
            return resolve();
        }

        let {header, body} = utils.extractHeader(text);

        header.adapter = true;
        header.editLink = data.editLink;
        header.license = repo.license;
        header.authors = repo.authors ? repo.authors.map(item => getAuthor(item)).join(', ') : getAuthor(repo.author);
        header.description = repo.desc ? (repo.desc[lang] || repo.desc.en || repo.desc) : '';
        header.title = repo.titleLang ? repo.titleLang[lang] || repo.title : repo.title;
        header.keywords = repo.keywords ? repo.keywords.join(', ') : '';
        header.readme = repo.readme;
        header.mode = repo.mode;
        header.materialize = repo.materialize || false;
        header.compact = repo.compact || false;
        if (repo.published) {
            header.published = repo.published;
        }
        header.version = repo.version;

        const result = fixImages(lang, repo.name, body);

        body = result.body;
        Object.keys(result.badges).forEach(name => {
            header['BADGE-' + name] = result.badges[name];
        });

        const lines = body.split('\n');

        // remove empty lines at start
        while(lines.length && !lines[0].trim()) {
            lines.shift();
        }

        // remove logo
        if (lines.length && lines[0].trim().startsWith('![')) {
            header.logo = utils.normalizePath(lines[0].trim().replace(/^!\[[^\]]*]\(/, '').replace(/\)$/, ''));
            lines.shift();
        }

        // remove empty lines at start
        while(lines.length && !lines[0].trim()) {
            lines.shift();
        }

        // remove title
        if (lines.length && lines[0].trim().startsWith('# ')) {
            lines.shift();
        }

        // remove empty lines at start
        while(lines.length && !lines[0].trim()) {
            lines.shift();
        }
        // remove =======
        if (lines.length && lines[0].trim().startsWith('=======')) {
            lines.shift();
        }

        // remove empty lines at start
        while(lines.length && !lines[0].trim()) {
            lines.shift();
        }

        //let readme = repo.readme || repo.meta.replace('io-package.json', 'README.md');
        //readme = readme.replace('README.md', '');

        const localDirName = consts.FRONT_END_DIR + lang + '/adapterref/iobroker.' + repo.name + '/';

        // check that all images are exists
        const promises = result.doDownload.map(link =>
            new Promise(resolve1 => {
                link = link.split('?')[0];
                link = link.split(' ')[0];

                const fileName = path.normalize(localDirName + link).replace(/\\/g, '/');
                if (!fs.existsSync(fileName)) {
                    let relative;

                    if (data.link) {
                        const parts = data.link.split('/');
                        parts.pop();
                        relative = parts.join('/') + '/';
                    } else {
                        relative = link;
                    }
                    request(relative + link, {encoding: null}, (err, status, body) => {
                        err && console.error('Cannot __download ' + relative + link + ': ' + err);
                        body && utils.writeSafe(localDirName + link, body);
                        resolve1()
                    });
                } else {
                    resolve1();
                }
            }));

        Promise.all(promises).then(() => {
            resolve({body: utils.addHeader(lines.join('\n'), header), name: data.link ? data.link.replace(data.relative, '') : 'README.md'});
        });
    });
}

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
    if (!url) {
        return Promise.resolve();
    }
    if (urlsCache[url]) {
        return urlsCache[url];
    }
    urlsCache[url] = new Promise(resolve => {
        console.log('Requested ' + url);
        request(url, {encoding: null}, (err, state, file) => {
            err && console.error('Cannot download ' + url + ': ' + err);
            if (!state || state.statusCode !== 200) {
                !err && console.error('Cannot download ' + url + ': ' + (state && state.statusCode));
                resolve();
            } else {
                resolve(binary ? file : file.toString());
            }
        });
    });
    return urlsCache[url];
}

// 1. reads from remote repo the remoteRepo/README.md and all files in remoteRepo/docs/LN (if exist)
// 2a. if local version for this adapter exists, merge local version and remoteRepo/README.md
// 2b. if remote version is in remoteRepo/docs/LN, so merge data with remote remoteRepo/README.md
// returns the array of files that must be stored locally
function getReadme(lang, dirName, repo, adapter) {
    if (!repo.readme) {
        repo.readme = repo.meta.replace('io-package.json', 'README.md');
    }
    // download readme
    const readme = repo.readme
        .replace('github.com', 'raw.githubusercontent.com')
        .replace('/blob/master/', '/master/');

    return getUrl(readme)
        .then(readmeDoc => {
            let links = [];

            if (repo.docs && repo.docs[lang]) {
                if (repo.docs[lang] instanceof Array) {
                    links = repo.docs[lang].map(link => readme.replace('/README.md', '/' + link));
                } else {
                    links.push(readme.replace('/README.md', '/' + repo.docs[lang]));
                }
            }

            const promises = links.map(link =>
                getUrl(link).then(body =>
                {return {body, downloaded: true, link}}));

            return new Promise(resolve =>
                Promise.all(promises)
                    .then(results => {
                        if (links.length) {
                            const readmeParsed = utils.extractHeader(readmeDoc);
                            if (!results[0].body) {
                                return;
                            }

                            // insert the changelog, logo, licenses, badges info from readme into first file
                            const {badges} = fixImages(lang, adapter, readmeParsed.body);
                            const linkParsed = utils.extractHeader(results[0].body) || {};
                            Object.keys(badges).forEach(name => {
                                linkParsed.header['BADGE-' + name] = badges[name];
                            });

                            if (readmeParsed.logo) {
                                linkParsed.logo = linkParsed.logo || readmeParsed.logo
                            }
                            const logValid = utils.extractLicenseAndChangelog(readmeParsed.body);
                            const logInvalid = utils.extractLicenseAndChangelog(linkParsed.body);
                            linkParsed.body = utils.addChangelogAndLicense(logInvalid.body, logValid.changelog, logValid.license);

                            results[0].body = utils.addHeader(linkParsed.body, linkParsed.header);
                        } else {
                            lang === 'en' && results.push({body: readmeDoc, link: readme});
                        }

                        if (results.length) {
                            let relative = results[0].link.split('/');
                            relative.pop();
                            relative = relative.join('/') + '/';
                            results.forEach(item => {
                                item.relative = relative;
                                item.editLink = item.link.replace('/master/', '/edit/master/').replace('raw.githubusercontent.com', 'github.com');
                            });

                            results[0].link = relative + 'README.md';
                        }

                        let local = false;
                        if (fs.existsSync(dirName + '/README.md')) {
                            let text = fs.readFileSync(dirName + '/README.md').toString('utf-8');
                            const localResult = utils.extractHeader(text);
                            if (localResult.header.local) {
                                local = true;
                                // merge the whole data to this file
                                const remoteHeader = utils.extractHeader(readmeDoc);
                                const remoteLog = utils.extractLicenseAndChangelog(remoteHeader.body);

                                const localLog = utils.extractLicenseAndChangelog(localResult.body);

                                // replace changelog and license with remote one
                                localLog.body = utils.addChangelogAndLicense(localLog.body, remoteLog.changelog, remoteLog.license);
                                results[0] = [{}];

                                // merge headers
                                results[0].body = utils.addHeader(localLog.body, Object.assign(remoteHeader.header, localResult.header));
                                results[0].editLink = consts.GITHUB_EDIT_ROOT + 'docs/' + lang + '/adapterref/iobroker.' + adapter + '/README.md';
                            }
                        }

                        if (!local) {
                            // check may be locally other languages exists.
                            const isLocalExist = consts.LANGUAGES.find(lang => {
                                const file = consts.SRC_DOC_DIR + lang + '/adapterref/iobroker.' + adapter + '/README.md';
                                if (fs.existsSync(file)) {
                                    const {header} = utils.extractHeader(fs.readFileSync(file).toString('utf-8'));
                                    return header.local;
                                }
                            });
                            if (isLocalExist) {
                                console.log('Ignore ' + lang + ' for ' + adapter + ' because locally exists in ' + isLocalExist);
                                // ignore the whole info
                                return resolve([]);
                            }
                        }


                        resolve(results);
                    }));
        });
}

/*
function getReadme(lang, dirName, repo, adapter) {
    return new Promise(resolve => {
        if (fs.existsSync(dirName + '/README.md')) {
            let body = fs.readFileSync(dirName + '/README.md').toString();
            utils.createDir(consts.FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter);
            utils.copyDir(dirName, consts.FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + '/');
            let editLink = consts.GITHUB_EDIT_ROOT + 'docs/' + dirName.replace(consts.SRC_DOC_DIR, '') + '/README.md';
            resolve([{body, editLink}]);
        } else {
            if (!repo.readme) {
                repo.readme = repo.meta.replace('io-package.json', 'README.md');
            }

            // download readme
            const readme = repo.readme
                .replace('github.com', 'raw.githubusercontent.com')
                .replace('/blob/master/', '/master/');

            let links = [];

            if (repo.docs && repo.docs[lang]) {
                if (repo.docs[lang] instanceof Array) {
                    links = repo.docs[lang].map(link => readme.replace('/README.md', '/' + link));
                } else {
                    links.push(readme.replace('/README.md', '/' + repo.docs[lang]));
                }
            } else {
                links.push(readme);
            }

            const promises = links.map(link =>
                getUrl(link).then(body =>
                    {return {body, link}}));

            return Promise.all(promises)
                .then(results => {
                    let relative = results[0].link.split('/');
                    relative.pop();
                    relative = relative.join('/') + '/';
                    results.forEach(item => {
                        item.relative = relative;
                        item.editLink = item.link.replace('/master/', '/edit/master/').replace('raw.githubusercontent.com', 'github.com');
                    });

                    results[0].link = relative + 'README.md';

                    // const {body, header} = utils.extractHeader(main.body);
                    // repo.docs[lang].shift();
                    // repo.docs[lang].forEach((file, i) => {
                    //     repo.docs[lang][i] = consts.LANGUAGES[0] + '/adapterref/iobroker.' + adapter + '/' + file;
                    //     utils.writeSafe(consts.FRONT_END_DIR + consts.LANGUAGES[0] + '/adapterref/iobroker.' + adapter + '/' + file, results[i]);
                    // });
                    // header.chapters = repo.docs[lang].join(', ');

                    // store all other files
                    resolve(results);
                });
        }
    });
}
*/

// 1. Check if file exists on disk
// 2. If file on disk is marked as local. If yes: Download remote file and get License and Changelog, write it into local file
// 3. For non local files, download the remote files and replace local ones
function processAdapterLang(adapter, repo, lang, content) {
    const dirName = ADAPTERS_DIR.replace('/LANG/', '/' + lang + '/') + 'iobroker.' + adapter;

    let iconName = repo.extIcon && repo.extIcon.split('/').pop();

    // download logo
    return getIcon(repo.extIcon, consts.FRONT_END_DIR + consts.LANGUAGES[0] + '/adapterref/iobroker.' + adapter + '/' + iconName)
        .then(icon => {
            if (icon) {
                utils.writeSafe(consts.FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + '/' + iconName, icon);
            } else if (adapter !== 'js-controller') {
                console.error('ADAPTER has no icon: ' + adapter);
            }

            content.pages[repo.type] = content.pages[repo.type] || {title: consts.ADAPTER_TYPES[repo.type] || {en: repo.type}, pages: {}};

            content.pages[repo.type].pages[adapter] = content.pages[repo.type].pages[adapter] || {
                title: {[lang]: adapter},
                content: 'adapterref/iobroker.' + adapter + '/README.md'
            };
            content.pages[repo.type].pages[adapter].title[lang] = adapter;

            if (iconName) {
                content.pages[repo.type].pages[adapter].icon = 'adapterref/iobroker.' + adapter + '/' + iconName;
            }

            // download readme files direct from repo or read locally and merge it with downloaded
            getReadme(lang, dirName, repo, adapter)
                .then(results => {
                    if (!results || !results[0] || !results[0].body) {
                        return Promise.resolve();
                    }
                    const {body} = utils.extractHeader(results[0].body);

                    // if data from remoteRepo/docs/LN
                    if (results.length > 1) {
                        const chapters = {pages: {}};
                        // add title to every file
                        results.forEach(item => {
                            const name = lang + '/adapterref/iobroker.' + adapter + '/' + item.link.replace(item.relative, '');
                            const title = utils.getTitle(item.body);
                            chapters.pages[name] = {title: {[lang]: title}, content: name};
                        });

                        // add chapters (links to other files)
                        results.forEach(item => {
                            const {body, header} = utils.extractHeader(item.body);
                            header.chapters = JSON.stringify(chapters);
                            item.body = utils.addHeader(body, header);
                        });
                    }

                    // store this information in content
                    if (repo.keywords) {
                        content.pages[repo.type].pages[adapter].keywords = repo.keywords.join(', ');
                    }
                    content.pages[repo.type].pages[adapter].authors     = repo.authors ? repo.authors.map(item => getAuthor(item)).join(', ') : getAuthor(repo.author);
                    content.pages[repo.type].pages[adapter].license     = repo.license;
                    content.pages[repo.type].pages[adapter].published   = repo.published;
                    content.pages[repo.type].pages[adapter].version     = repo.version;
                    content.pages[repo.type].pages[adapter].materialize = repo.materialize;
                    content.pages[repo.type].pages[adapter].compact     = repo.compact;
                    content.pages[repo.type].pages[adapter].description = repo.desc;
                    content.pages[repo.type].pages[adapter].titleFull   = repo.titleLang || repo.title;
                    content.pages[repo.type].pages[adapter].created     = repo.created;
                    content.pages[repo.type].pages[adapter].github      = repo.readme.replace('/blob/master/README.md', '').replace('raw.githubusercontent.com', 'github.com');

                    return Promise.all(results.map(result =>
                        downloadImagesForReadme(lang, repo, result)
                            .then(result =>
                                result && utils.writeSafe(dirName + '/' + result.name, result.body))));
                });
        });
}

// Call processAdapterLang for given adapter and for every language
function processAdapter(adapter, repo, content) {
    return new Promise(resolve => {
        // Check if the documentation exists
        const promises = consts.LANGUAGES.map(lang => processAdapterLang(adapter, repo, lang, content));

        return Promise.all(promises)
            .then(() => resolve());
    });
}

let repoPromise;
function downloadRepo() {
    repoPromise = repoPromise || new Promise(resolve => {
        request('http://iobroker.live/sources-dist-latest.json', (err, state, body) => {
            const stable = JSON.parse(body);
            request('http://iobroker.live/sources-dist-latest.json', (err, state, body) => {
                const latest = JSON.parse(body);
                // get stable versions
                Object.keys(latest).forEach(adapter =>
                    latest[adapter].version = stable[adapter] ? stable[adapter].version : '-.-.-');

                resolve(latest);
            });
        });
    });

    return repoPromise;
}

let statisticsPromise;
function downloadStatistics() {
    statisticsPromise = statisticsPromise || new Promise(resolve => {
        request('http://iobroker.live/statistics.json', (err, state, body) => {
            const stat = JSON.parse(body);
            resolve(stat);
        });
    });

    return statisticsPromise;

}

// Download stable and latest repositories
// Apply versions from stable to latest repo
// For every adapter in latest repo
//    execute processAdapter (it downloads the readme from repo and stores it in docs)
// and then save adapters.json with the full list of adapters.
function buildAdapterContent(adapter) {
    return downloadRepo()
        .then(repo =>
            new Promise(resolve => {
                const content = {pages: {
                    overview: {
                        title: consts.OVERVIEW,
                        content: 'adapters.md'
                    }
                }};

                const promises = Object.keys(repo)
                    .filter(a => a !== 'js-controller' && (!adapter || a === adapter))
                    .map(adapter =>
                        processAdapter(adapter, repo[adapter], content));

                downloadStatistics()
                    .then(stat => {
                        utils.queuePromises(promises, () => {
                            Object.keys(stat.adapters).filter(a => !adapter || adapter === a).forEach(a => {
                                Object.keys(content.pages).find(type => {
                                   if (content.pages[type].pages && content.pages[type].pages[a]) {
                                       content.pages[type].pages[a].installs = stat.adapters[a];
                                       return true;
                                   }
                                });
                            });

                            fs.writeFileSync(consts.FRONT_END_DIR + 'adapters.json', JSON.stringify(content, null, 2));
                            resolve(content);
                        });
                    })

                /*const a = 'fritzbox';
                const dirName = ADAPTERS_DIR.replace('/LANG/', '/en/') + 'iobroker.' + a;
                downloadReadme('en', dirName, repo[a], a)
                    .then(links => {
                        console.log(JSON.stringify(links));
                    })*/
            }));
}

function copyAdapterToFrontEnd(lang, adapter) {
    return downloadRepo()
        .then(repo => {
            const dirName = consts.SRC_DOC_DIR + lang + '/adapterref/iobroker.' + adapter;
            if (fs.existsSync(dirName)) {
                const files = utils.getAllFiles(dirName, false);

                // first copy images
                files.forEach(file => {
                    if (!file.match(/\.md$/i)) {
                        const data = fs.readFileSync(file);
                        utils.writeSafe(consts.FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + file.replace(dirName, ''), data);
                    }
                });
                return Promise.all(files.filter(f => f.match(/\.md$/i)).map(file => {
                    const text = fs.readFileSync(file).toString('utf-8');
                    const {header} = utils.extractHeader(text);
                    let link = '';
                    if (header.local) {
                        link = consts.GITHUB_EDIT_ROOT.replace('/edit/', '/').replace('github.com', 'raw.githubusercontent.com') +
                            'docs/' + lang + '/adapterref/iobroker.' + adapter + file.replace(dirName, '');
                    } else {
                        if (!repo[adapter].readme) {
                            console.error(`Adapter ${adapter} has no readme. Please fix it!!!!`);
                        } else {
                            link = repo[adapter].readme.replace('/blob/master/README.md', '')
                                .replace('/master/README.md', '')
                                .replace('github.com', 'raw.githubusercontent.com') + '/master/' + file.replace(dirName, '');
                        }
                    }

                    return prepareAdapterReadme(lang, repo[adapter], {
                        body: text,
                        relative: dirName,
                        link: file,
                        editLink: link.replace('raw.githubusercontent.com', 'github.com').replace('/master/', '/edit/master/')
                    }).then(result =>
                        result && utils.writeSafe(consts.FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + result.name, result.body));
                }));
            } else {
                console.error('No local files found for ' + adapter + ' in ' + lang);
                return Promise.resolve();
            }
        })
}

function copyAllAdaptersToFrontEnd() {
    return new Promise(resolve => {
        return Promise.all(consts.LANGUAGES.map(lang => {
            const dirs = fs.readdirSync(consts.SRC_DOC_DIR + lang + '/adapterref/');
            return Promise.all(dirs.map(adapter =>
                copyAdapterToFrontEnd(lang, adapter.replace('iobroker.', ''))));
        }))
        .then(() => resolve());
    });
}

if (!module.parent) {
    /*buildAdapterContent().then(content => {
        console.log(JSON.stringify(content));
    });*/
    copyAdapterToFrontEnd('de', 'fritzbox')
        .then(() => console.log('done'))
} else {
    module.exports = {
        buildAdapterContent,
        copyAdapterToFrontEnd,
        copyAllAdaptersToFrontEnd
    };
}
