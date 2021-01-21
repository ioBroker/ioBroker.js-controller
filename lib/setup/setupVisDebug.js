/**
 *      CLI command for VIS debug
 *
 *      Copyright 2013-2020 bluefox <dogafox@gmail.com>
 *
 *      MIT License
 *
 */

'use strict';

/** @class */
function VisDebug(options) {
    const fs         = require('fs-extra');
    const tools      = require('../tools');
    const path       = require('path');
    const EXIT_CODES = require('../exitCodes');

    // allow use without new operator
    if (!(this instanceof VisDebug)) {
        return new VisDebug(options);
    }

    options = options || {};

    if (!options.objects)           {
        throw new Error('Invalid arguments: objects is missing');
    }
    if (!options.processExit)       {
        throw new Error('Invalid arguments: processExit is missing');
    }

    const objects           = options.objects;
    const processExit       = options.processExit;

    // upload widget directory to vis directory
    function uploadWidgets(dir, adapter, pathW, callback) {
        const dirs = fs.readdirSync(dir);
        let count = 0;
        for (let d = 0; d < dirs.length; d++) {
            const stat = fs.statSync(dir + '/' + dirs[d]);
            count++;
            if (stat.isDirectory()) {
                uploadWidgets(dir + '/' + dirs[d], adapter, pathW + '/' + dirs[d], () =>
                    (!--count) && callback && callback());
            } else {
                console.log('Upload "' + dir + '/' + dirs[d] + '"');
                objects.writeFile(adapter, pathW  + '/' + dirs[d], fs.readFileSync(dir + '/' + dirs[d]), () =>
                    (!--count) && callback && callback());
            }
        }
        if (!count && callback) {
            callback();
        }
    }

    this.enableDebug = function (widgetset) {

        let adapterDir;
        if (widgetset) {
            // Try to find out the adapter directory out of a list of options
            const adapterNames2Try = ['vis-' + widgetset, widgetset];
            if (adapterNames2Try[0] === adapterNames2Try[1]) {
                adapterNames2Try.splice(1, 1);
            }
            for (const adapterName of adapterNames2Try) {
                try {
                    const adapterDir2Try = tools.getAdapterDir(adapterName);
                    // Query the entry
                    const stats = fs.statSync(adapterDir2Try);

                    // Is it a directory?
                    if (stats.isDirectory()) {
                        //found it!
                        adapterDir = adapterDir2Try;
                        break;
                    }
                } catch {
                    // OK
                }
            }

            if (!adapterDir) {
                throw new Error(`Adapter not found. Tried: ${adapterNames2Try.join(', ')}`);
            }
        }

        // copy index.html.original to index.html
        // copy edit.html.original to edit.html
        // correct appName.json
        // correct config.js
        let visDir = __dirname + '/../../node_modules/' + tools.appName + '.vis';
        if (!fs.existsSync(visDir)) {
            visDir = __dirname + '/../../node_modules/' + tools.appName.toLowerCase() + '.vis';
            if (!fs.existsSync(visDir)) {
                visDir = __dirname + '/../../../' + tools.appName + '.vis';
                if (!fs.existsSync(visDir)) {
                    visDir = __dirname + '/../../../' + tools.appName.toLowerCase() + '.vis';
                    if (!fs.existsSync(visDir)) {
                        console.error('Cannot find ' + tools.appName + '.vis');
                        return processExit(EXIT_CODES.MISSING_ADAPTER_FILES);
                    }
                }
            }
        }
        let count = 0;

        /** @type {string} */
        if (fs.existsSync(`${visDir}/www/index.html.original`)) {
            console.log(`Upload "${path.normalize(`${visDir}/www/index.html.original`)}"`);
            const file = fs.readFileSync(`${visDir}/www/index.html.original`, 'utf8');
            count++;
            objects.writeFile('vis', 'index.html', file)
                .catch(e => console.error(`Cannot save ${visDir}/vis/index.html: ${e}`))
                .then(() => !--count && processExit());
        }

        if (fs.existsSync(`${visDir}/www/edit.html.original`)) {
            console.log(`Upload "${path.normalize(`${visDir}/www/edit.html.original`)}"`);
            const file = fs.readFileSync(`${visDir}/www/edit.html.original`, 'utf8');
            count++;
            objects.writeFile('vis', 'edit.html', file)
                .catch(e => console.error(`Cannot save ${visDir}/vis/index.html: ${e}`))
                .then(() => !--count && processExit());
        }

        if (fs.existsSync(`${visDir}/www/cache.manifest`)) {
            console.log(`Modify "${path.normalize(`${visDir}/www/cache.manifest`)}"`);
            let file = fs.readFileSync(`${visDir}/www/cache.manifest`, 'utf-8');
            // if file does not exists
            if (!file.toString().trim()) {
                const version = require(`${visDir}/package.json`).version;
                file = `CACHE MANIFEST
#
# vis Version ${version}
# dev build 2



NETWORK:
    *


CACHE:
    ./img/disconnect.png

FALLBACK:
    ./index.html ./offline.html
    ./edit.html ./offline.html
`;
            }
            const n = file.match(/# dev build (\d+)/)[1];
            file = file.replace(`# dev build ${n}`, `# dev build ${parseInt(n, 10) + 1}`);
            // also update it in the vis npm dir like vis does it by itself
            fs.writeFileSync(`${visDir}/www/cache.manifest`, file);
            count++;
            objects.writeFile('vis', 'cache.manifest', file)
                .catch(e => console.error(`Cannot save ${visDir}/www/cache.manifest: ${e}`))
                .then(() => !--count && processExit());
        }

        let file = fs.readFileSync(tools.getConfigFileName(), 'utf8');
        file = JSON.parse(file);

        if (!file.objects.noFileCache) {
            file.objects.noFileCache = true;
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(file, null, 2));
            count++;
            objects.enableFileCache(false, (_err, _actual) => {
                console.log('Disable cache. ioBroker restart required! Execute "iobroker restart"');
                !--count && processExit();
            });
        }

        if (widgetset) {
            count++;
            objects.readFile('vis', 'js/config.js', null, (_err, data) => {
                data = data.replace(/[\r\n]/g, '');
                const json = JSON.parse(data.match(/"widgetSets":\s(.*)};/)[1]);
                let found = false;
                for (let f = 0; f < json.length; f++) {
                    if (json[f] === widgetset || json[f].name === widgetset) {
                        found = true;
                        break;
                    }
                }
                // if widget-set not found in config.js
                if (!found) {
                    console.log('Modify config.js');
                    const pckg = fs.readJSONSync(adapterDir + '/io-package.json');
                    if (pckg.native && pckg.native.dependencies && pckg.native.dependencies.length){
                        json.push({
                            name: widgetset,
                            depends: pckg.native.dependencies
                        });
                    } else {
                        json.push(widgetset);
                    }

                    data =  data.replace(/"widgetSets":\s+.*};/, '"widgetSets": ' + JSON.stringify(json, null, 2) + '};');

                    objects.writeFile('vis', 'js/config.js', data, () => {
                        // upload all files into vis
                        console.log('Upload ' + adapterDir + '/widgets');
                        uploadWidgets(adapterDir + '/widgets', 'vis', 'widgets', () => {
                            if (!--count) {
                                // timeout to print all messages
                                setTimeout(() => processExit(), 100);
                            }
                        });
                    });
                } else {
                    // upload all files into vis
                    console.log('Upload "' + adapterDir + '/widgets' + '"');
                    uploadWidgets(adapterDir + '/widgets', 'vis', 'widgets', () =>
                        // timeout to print all messages
                        (!--count) && setTimeout(() => processExit(), 100));
                }

            });
        } else {
            !count && processExit();
        }
    };
}

module.exports = VisDebug;
