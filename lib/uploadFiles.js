/**
 *
 *  upload.js
 *
 *      bulk upload a folder as attachment into one CouchDB object
 *
 *      8'2014 hobbyquaker <hq@ccu.io>
 *
 */
'use strict';

const yargs = require('yargs')
    .alias('d', 'dir')
    .alias('o', 'object')
    .alias('p', 'prefix')
    .demand(['object'])
    .usage('$0 --object object._id [--dir directory] [--prefix prefix]\n' +
            'Example: \n' +
            '  Upload the content of the folder "images" into the virtual folder "img" of the virtual filesystem "fs.www"\n' +
            '  $0 -o fs.www -d images -p img')
    ;

const fs =      require('fs');
const mime =    require('mime');
const Objects = require('./objects');
const tools =   require('./tools');

let files = [];
let rev;
let dir;
let prefix;

const db = new Objects({
    logger: {
        silly: function (_msg) { },
        debug: function (_msg) { },
        info:  function (_msg) { },
        warn:  function (msg) {
            console.log(msg);
        },
        error: function (msg) {
            console.log(msg);
        }
    },
    connected: function () {
        dir = yargs.argv.dir || './';
        prefix = yargs.argv.prefix || '';
        const argObject = yargs.argv.object.toString();
        db.getObject(argObject, function (err, res) {
            if (err || !res) {
                db.setObject(argObject, {
                    type:   'fs',
                    parent: 'fs',
                    common: {
                        name: argObject.split('.').pop()
                    },
                    ts: new Date().getTime(),
                    from: 'system.host.' + tools.getHostName() + '.cli',
                    native: {}
                }, function (_err, res) {
                    rev = res.rev;
                    main();
                });

            } else {
                rev = res._rev;
                main();
            }

        });

    }
});

function main() {
    walk(dir, function (err, res) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        files = res;
        upload();
    });
}

function upload() {
    let file;
    if (!files.length) {
        console.log('done. ' + yargs.argv.object + '._rev=' + rev);
        process.exit(0);
    } else {
        file = files.pop();
        const mimeType = mime.getType(file);
        const attName = prefix + (file.split('/').slice(1).join('/'));
        console.log('upload', file, attName, mimeType);

        fs.createReadStream(file).pipe(
            db.insert(yargs.argv.object, attName, null, mimeType, {
                rev: rev
            }, function (err, res) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                rev = res.rev;
                setTimeout(function () {
                    upload();
                }, 50);
            })
        );
    }

}

function walk(dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) {
            return done(err);
        }
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) {
                return done(null, results);
            }
            file = dir + '/' + file;
            fs.stat(file, function (_err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (_err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
}
