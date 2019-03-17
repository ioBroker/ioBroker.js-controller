const request = require('request');
const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const consts = require('./consts');

const ADAPTERS_DIR = path.normalize(__dirname + '/../../docs/LANG/adapterref/').replace(/\\/g, '/');

const ADAPTER_TYPES = {

};
const urlsCache = {};

// todo
function prepareAdapterReadme(text, targetDir, repo) {
    return new Promise(resolve => {
        text = addAllHeaders(text, repo);

        utils.writeSafe(targetDir + 'README.md', text);
        resolve();
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

function addAllHeaders(text, repo) {
    let {header, body} = utils.extractHeader(text);
    header.adapter = true;
    header.license = repo.license;
    return utils.addHeader(body, header);
}

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

            content.pages[repo.type] = content.pages[repo.type] || {title: ADAPTER_TYPES[repo.type] || {en: repo.type}, pages: {}};
            if (fs.existsSync(dirName)) {
                content.pages[repo.type].pages[adapter] = {
                    title: {en: adapter},
                    content: 'adapterref/iobroker.' + adapter + '/README.md'
                };

                if (iconName) {
                    content.pages[repo.type].pages[adapter].icon = 'adapterref/iobroker.' + adapter + '/' + iconName;
                }

                let text = addAllHeaders(fs.readFileSync(dirName + '/README.md').toString(), repo);

                utils.createDir(consts.FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter);
                utils.copyDir(dirName, consts.FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + '/');
                utils.writeSafe(consts.FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + '/README.md', text);
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

                        return prepareAdapterReadme(body, consts.FRONT_END_DIR + lang + '/adapterref/iobroker.' + adapter + '/', repo);
                    });
            }
        });
}

function processAdapter(adapter, repo, content) {
    // Check if the documentation exists
    const promises = consts.LANGUAGES.map(lang => processAdapterLang(adapter, repo, lang, content));

    return Promise.all(promises);
}


function buildAdapterContent() {
    return new Promise(resolve => {
        const content = {pages: {}};
        // get latest repo
        request('http://iobroker.live/sources-dist-latest.json', (err, state, body) => {
            const repo = JSON.parse(body);
            const promises = Object.keys(repo).filter(a => a !== 'js-controller').map(adapter =>
                processAdapter(adapter, repo[adapter], content));

            utils.queuePromises(promises, () => {
                fs.writeFileSync(consts.FRONT_END_DIR + 'adapters.json', JSON.stringify(content, null, 2));
                resolve(content);
            })
        });
    });
}

/*buildAdapterContent().then(content => {
    console.log(JSON.stringify(content));
});
*/

module.exports = {
    buildAdapterContent
};
