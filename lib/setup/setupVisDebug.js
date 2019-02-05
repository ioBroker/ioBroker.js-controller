'use strict';

function VisDebug(options) {
    const fs         = require('fs');
    const tools      = require('../tools');
    const path       = require('path');
    const EXIT_CODES = require('../exitCodes');

    // allow use without new operator
    if (!(this instanceof VisDebug)) return new VisDebug(options);

    options = options || {};

    if (!options.objects)           throw 'Invalid arguments: objects is missing';
    if (!options.processExit)       throw 'Invalid arguments: processExit is missing';

    const objects           = options.objects;
    const processExit       = options.processExit;

    // upload widget directory to vis directory
    function uploadWidgets(dir, adapter, path, callback) {
        const dirs = fs.readdirSync(dir);
        let count = 0;
        for (let d = 0; d < dirs.length; d++) {
            const stat = fs.statSync(dir + '/' + dirs[d]);
            count++;
            if (stat.isDirectory()) {
                uploadWidgets(dir + '/' + dirs[d], adapter, path + '/' + dirs[d], function () {
                    if (!--count && callback) callback();
                });
            } else {
                console.log('Upload "' + dir + '/' + dirs[d] + '"');
                objects.writeFile(adapter, path  + '/' + dirs[d], fs.readFileSync(dir + '/' + dirs[d]), function () {
                    if (!--count && callback) callback();
                });
            }
        }
        if (!count && callback) callback();
    }

    this.enableDebug = function (widgetset) {

        let adapterDir;
        if (widgetset) {
            // Try to find out the adapter directory out of a list of options
            const adapterNames2Try = ['vis-' + widgetset, widgetset];
            if (adapterNames2Try[0] === adapterNames2Try[1]) adapterNames2Try.splice(1, 1);
            for (let i = 0; i < adapterNames2Try.length; i++) {
                try {
                    const adapterDir2Try = tools.getAdapterDir(adapterNames2Try[i]);
                    // Query the entry
                    const stats = fs.lstatSync(adapterDir2Try);

                    // Is it a directory?
                    if (stats.isDirectory()) {
                        //found it!
                        adapterDir = adapterDir2Try;
                        break;
                    }
                } catch (e) {
                    // OK
                }
            }

            if (!adapterDir) throw 'Adapter not found. Tried: ' + adapterNames2Try.join(', ');
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
                        processExit(EXIT_CODES.MISSING_ADAPTER_CODE);
                    }
                }
            }
        }

        console.log('Upload "' + path.normalize(visDir + '/www/index.html.original') + '"');
        let file = fs.readFileSync(visDir + '/www/index.html.original');
        objects.writeFile('vis', 'index.html', file);

        console.log('Upload "' + path.normalize(visDir + '/www/edit.html.original') + '"');
        file = fs.readFileSync(visDir + '/www/edit.html.original');
        objects.writeFile('vis', 'edit.html', file);

        console.log('Modify "' + path.normalize(visDir + '/www/cache.manifest') + '"');
        file = fs.readFileSync(visDir + '/www/cache.manifest', 'utf8');
        let n = file.match(/# dev build (\d+)/, '5');
        n = n[1];
        file = file.replace('# dev build '+ n, '# dev build ' + (parseInt(n, 10) + 1));
        objects.writeFile('vis', 'cache.manifest', file);

        file = fs.readFileSync(tools.getConfigFileName(), 'utf8');
        file = JSON.parse(file);

        let count = 0;
        if (!file.objects.noFileCache) {
            file.objects.noFileCache = true;
            fs.writeFileSync(tools.getConfigFileName(), JSON.stringify(file, null, 2));
            count++;
            objects.enableFileCache(false, (_err, _actual) => {
                console.log('Disable cache');
                if (!--count) processExit();
            });
        }

        if (widgetset) {
            count++;
            objects.readFile('vis', 'js/config.js', null, function (_err, data) {
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
                    const pckg = JSON.parse(fs.readFileSync(adapterDir + '/io-package.json').toString());
                    if (pckg.native && pckg.native.dependencies && pckg.native.dependencies.length){
                        json.push({
                            name: widgetset,
                            depends: pckg.native.dependencies
                        });
                    } else {
                        json.push(widgetset);
                    }

                    data =  data.replace(/"widgetSets":\s+.*};/, '"widgetSets": ' + JSON.stringify(json, null, 2) + '};');

                    objects.writeFile('vis', 'js/config.js', data, function () {
                        // upload all files into vis
                        console.log('Upload ' + adapterDir + '/widgets');
                        uploadWidgets(adapterDir + '/widgets', 'vis', 'widgets', function () {
                            if (!--count) {
                                // timeoout to print all messages
                                setTimeout(function () {
                                    processExit();
                                }, 100);
                            }
                        });
                    });
                } else {
                    // upload all files into vis
                    console.log('Upload "' + adapterDir + '/widgets' + '"');
                    uploadWidgets(adapterDir + '/widgets', 'vis', 'widgets', function () {
                        if (!--count) {
                            // timeoout to print all messages
                            setTimeout(function () {
                                processExit();
                            }, 100);
                        }
                    });
                }

            });
        } else {
            if (!count) processExit();
        }
    };
}

module.exports = VisDebug;
