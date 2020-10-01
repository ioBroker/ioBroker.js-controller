'use strict';
// this script reads all iobroker packages from node_modules, deletes all and installs it anew
const fs = require('fs-extra');
const path = require('path');
const exec = require('child_process').exec;
const deepClone = require('deep-clone');

function getNodeModulesRoot() {
    // special case
    // iobroker
    //   |-iobroker.js-controller               <---
    //   |-node_modules                            |
    //      |-iobroker.js-controller (as soft link | )
    let testPath = path.normalize(path.join(__dirname, '/../node_modules/iobroker.js-controller/'));
    if (fs.existsSync(testPath)) {
        return path.normalize(path.join(__dirname, '/..'));
    }
    // iobroker
    //   |-node_modules
    //      |-iobroker.js-controller
    testPath = path.normalize(path.join(__dirname, '/../../node_modules/iobroker.js-controller/'));
    if (fs.existsSync(testPath)) {
        return path.normalize(path.join(__dirname, '/../..'));
    }
    return __dirname;
}

const defaultPack = {
    name: 'iobroker.core',
    version: '1.0.0',
    description: 'Build automatically by reinstall.js',
    private: true,
    dependencies: {}
};

function savePackages(root) {
    root = root || getNodeModulesRoot();
    if (path.join(root, 'reinstall.js') !== path.join(__dirname, 'reinstall.js') && fs.existsSync(path.join(__dirname, 'reinstall.js'))) {
        fs.writeFileSync(path.join(root, 'reinstall.js'), fs.readFileSync(path.join(__dirname, 'reinstall.js')));
    }
    if (!fs.existsSync(root + '/node_modules')) {
        console.log('no node_modules found. Try to use actual package.json');
        return;
    }
    let dirs = fs.readdirSync(root + '/node_modules');
    let newPack = deepClone(defaultPack);
    dirs = dirs.filter(dir => dir.match(/^iobroker\.?/i));
    const deps = dirs.map(dir => {
        const fileName = root + '/node_modules/' + dir + '/package.json';
        try {
            const pack = fs.readJSONSync(fileName);
            return {name: pack.name, version: pack.version};
        } catch (e) {
            console.error(`Cannot read or parse ${fileName}: ${e}`);
        }
        return null;
    }).filter(e => e);
    deps.forEach(pack => {
        newPack.dependencies[pack.name] = pack.version;
    });
    if (fs.existsSync(root + '/package.json')) {
        const actual = require(root + '/package.json');
        actual.dependencies = actual.dependencies || {};
        for (const pack of Object.keys(newPack.dependencies)) {
            if (!actual.dependencies[pack] || !actual.dependencies[pack].match(/^file:/)) {
                actual.dependencies[pack] = newPack.dependencies[pack];
            }
        }
        newPack = actual;
        newPack.description = `Updated by reinstall.js on ${new Date().toISOString()}`;
    }
    fs.writeFileSync(root + '/package.json', JSON.stringify(newPack, null, 2));
}

function deleteFolderSync(dir, level) {
    level = level || 0;
    if (fs.existsSync(dir)) {
        const dirs = fs.readdirSync(dir);
        dirs.forEach((file, i) => {
            const newPath = path.join(dir, file);
            if (fs.lstatSync(newPath).isDirectory()) { // recurse
                deleteFolderSync(newPath, level + 1);
                !level && console.log(`[${i} / ${dirs.length}] Deleted ${file}`);
            } else { // delete file
                fs.unlinkSync(newPath);
            }
        });
        fs.rmdirSync(dir);
    }
}

function runNpm(root) {
    root = root || getNodeModulesRoot();
    return new Promise((resolve, reject) => {
        console.log('\n\n\nReinstall all packages cache...');
        const child = exec('npm install --production', {cwd: root});
        child.stderr.pipe(process.stdout);
        child.stdout.pipe(process.stdout);
        child.on('exit', code => {
            // code 1 is strange error that cannot be explained. Everything is installed but error :(
            if (code && code !== 1) {
                console.error('Error ' + code);
                return reject(code);
            }
            resolve();
        });
        child.on('error', error => {
            console.error('Error: ' + error);
            reject(error);
        });
    });
}

function runNpmClean() {
    return new Promise((resolve, reject) => {
        console.log('\n\n\nCleaning npm cache...');
        const child = exec('npm cache clean -f');
        child.stderr.pipe(process.stdout);
        child.stdout.pipe(process.stdout);
        child.on('exit', code => {
            // code 1 is strange error that cannot be explained. Everything is installed but error :(
            if (code && code !== 1) {
                console.error('Error ' + code);
                return reject(code);
            }
            resolve();
        });
        child.on('error', error => {
            console.error('Error: ' + error);
            reject(error);
        });
    });
}

let hadErrors;
function doAll() {
    const root = getNodeModulesRoot();
    savePackages(root);
    let start = Date.now();
    deleteFolderSync(path.join(root, 'node_modules'));
    console.log(`Deleted in ${Math.round((Date.now() - start) / 1000)} seconds.`);
    runNpmClean()
        .then(() => {
            start = Date.now();
            return runNpm(root);
        })
        .then(() => {
            console.log('\n\n\nEverything is done');
        }).catch(e => {
            console.error('Cannot reinstall all packages: ' + e);
            hadErrors = 1;
        }).then(() => {
            console.log(`\n\n\nFinished in ${Math.round((Date.now() - start) / 1000)} seconds.`);
            process.exit(hadErrors);
        });
}

doAll();
