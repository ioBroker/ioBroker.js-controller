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

var yargs = require('yargs')
        .alias('d', 'dir')
        .alias('o', 'object')
        .alias('p', 'prefix')
        .demand(['object'])
        .usage('$0 --object object._id [--dir directory] [--prefix prefix]\n' +
            'Example: \n' +
            '  Upload the content of the folder "images" into the virtual folder "img" of the virtual filesystem "fs.www"\n' +
            '  $0 -o fs.www -d images -p img')
    ;

var fs =      require('fs');
var mime =    require('mime');
var Objects = require(__dirname + '/objects.js');
var tools =   require('./tools');

var files = [];
var rev;
var dir;
var prefix;

var db = new Objects({
    logger: {
        silly: function (msg) { },
        debug: function (msg) { },
        info:  function (msg) { },
        warn:  function (msg) {
            console.log(msg);
        },
        error: function (msg) {
            console.log(msg);
        }
    },
    connected: function (type) {

        var id = yargs.argv.object;


        dir = yargs.argv.dir || './';
        prefix = yargs.argv.prefix || '';
        db.getObject(yargs.argv.object, function (err, res) {
            if (err || !res) {
                db.setObject(yargs.argv.object, {
                    type:   'fs',
                    parent: 'fs',
                    common: {
                        name: yargs.argv.object.split('.').pop()
                    },
                    ts: new Date().getTime(),
                    from: 'system.host.' + tools.getHostName() + '.cli',
                    native: {}
                }, function (err, res) {
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
    var file;
    if (!files.length) {
        console.log('done. ' + yargs.argv.object + '._rev=' + rev);
        process.exit(0);
    } else {
        file = files.pop();
        var mimeType = mime.lookup(file);
        var attName = prefix + (file.split('/').slice(1).join('/'));
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
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
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


