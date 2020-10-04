/**
 *      Gulp tasks: update default repo files, create template for news.
 *
 *      Copyright 2018-2020 bluefox <dogafox@gmail.com>,
 *      MIT License
 *
 */
'use strict';

const gulp      = require('gulp');
const fs        = require('fs-extra');
const pkg       = require('./package.json');
const iopackage = require('./io-package.json');
const version   = (pkg && pkg.version) ? pkg.version : iopackage.common.version;
const request   = require('request');
const replace   = require('gulp-replace');
const jsdoc     = require('gulp-jsdoc3');

const appName   = getAppName();
const srcDir    = __dirname + '/';

function getAppName() {
    const parts = __dirname.replace(/\\/g, '/').split('/');
    return parts[parts.length - 1].split('.')[0].toLowerCase();
}

function processAdapters(sources, adapters, callback, result) {
    result = result || {};
    if (!adapters || !adapters.length) {
        callback(result);
    } else {
        const adapter = adapters.shift();
        request(sources[adapter].meta, (err, status, body) => {
            try {
                result[adapter] = JSON.parse(body).common;
            } catch (e) {
                console.error('Cannot parse "' + adapter + '": ' + e);
            }
            setImmediate(processAdapters, sources, adapters, callback, result);
        });
    }
}

gulp.task('updateRepo', done => {
    const sources = fs.readJSONSync(__dirname + '/conf/sources-dist.json');
    const adapters = Object.keys(sources);

    processAdapters(sources, adapters, result => {
        for (const adapter of Object.keys(result)) {
            const meta = sources[adapter].meta;
            const url  = sources[adapter].url;
            sources[adapter] = result[adapter];
            sources[adapter].meta = meta;
            sources[adapter].url  = url;
            sources[adapter].icon = sources[adapter].extIcon;
        }
        fs.writeFileSync(__dirname + '/conf/sources-dist.json', JSON.stringify(sources, null, 2));
        done();
    });
});

gulp.task('renameFiles', done => {
    fs.unlink(__dirname + '/lib/img/iobroker.png');
    if (fs.existsSync(__dirname + '/iobroker'))                 {
        fs.renameSync(__dirname + '/iobroker',                __dirname + '/' + appName);
    }
    if (fs.existsSync(__dirname + '/_service_iobroker.bat'))    {
        fs.renameSync(__dirname + '/_service_iobroker.bat',   __dirname + '/_service_' + appName + '.bat');
    }
    if (fs.existsSync(__dirname + '/iobroker.bat'))             {
        fs.renameSync(__dirname + '/iobroker.bat',            __dirname + '/' + appName + '.bat');
    }
    if (fs.existsSync(__dirname + '/iobroker.js'))              {
        fs.renameSync(__dirname + '/iobroker.js',             __dirname + '/' + appName + '.js');
    }
    if (fs.existsSync(__dirname + '/conf/iobroker-dist.json'))  {
        fs.renameSync(__dirname + '/conf/iobroker-dist.json', __dirname + '/conf/' + appName + '-dist.json');
    }
    done();
});

gulp.task('replaceName', () => {
    const patterns = [
        {
            match:       /iobroker/gi,
            replacement: appName
        },
        {
            match:       /"iobroker\.admin": "\*"/i,
            replacement: ''
        }
    ];
    const files = [
        {
            expand:  true,
            flatten: true,
            src:     [
                srcDir + '*.*',
                srcDir + '.travis.yml',
                srcDir + '.npmignore',
                srcDir + '.gitignore'
            ],
            dest:    srcDir
        },
        {
            expand:  true,
            flatten: true,
            src:     [
                srcDir + 'admin/*.*',
                '!' + srcDir + 'admin/*.png'
            ],
            dest:    srcDir + 'admin'
        },
        {
            expand:  true,
            flatten: true,
            src:     [
                srcDir + 'lib/*.*'
            ],
            dest:    srcDir + 'lib'
        },
        {
            expand:  true,
            flatten: true,
            src:     [
                srcDir + 'example/*.*'
            ],
            dest:    srcDir + 'example'
        },
        {
            expand:  true,
            flatten: true,
            src:     [
                srcDir + 'www/*.*'
            ],
            dest:    srcDir + 'www'
        },
        {
            expand:  true,
            flatten: true,
            src:     [
                srcDir + 'conf/*.*'
            ],
            dest:    srcDir + 'conf'
        }
    ];

    const tasks = [];

    files.forEach(task =>
        tasks.push(gulp.src(task.src)
            .pipe(replace(patterns[0].match, patterns[0].replacement))
            .pipe(replace(patterns[1].match, patterns[1].replacement))
            .pipe(gulp.dest(task.dest))
        )
    );

    return Promise.all(tasks);
});

gulp.task('replaceCore', done => {
    const patterns = [
        {
            match: /var version = '[.0-9]*';/g,
            replacement: "var version = '" + iopackage.common.version + "';"
        },
        {
            match: /"version": "[.0-9]*",/g,
            replacement: '"version": "' + iopackage.common.version + '",'
        }
    ];
    const files = [
        srcDir + 'controller.js',
        srcDir + 'package.json'
    ];
    for (let f = 0; f < files.length; f++) {
        if (fs.existsSync(files[f])) {
            let text = fs.readFileSync(files[f], 'utf8');
            patterns.forEach(pattern => {
                text = text.replace(pattern.match, pattern.replacement);
            });
            fs.writeFileSync(files[f], text);

        }
    }
    done();
});

gulp.task('cleanRepo', done => {
    const sources = fs.readJSONSync(__dirname + '/conf/sources-dist.json');
    for (const adapter of Object.keys(sources)) {
        const meta = sources[adapter].meta;
        const url  = sources[adapter].url;
        const icon = sources[adapter].icon;

        sources[adapter] = {};
        if (meta) {
            sources[adapter].meta = meta;
        }
        if (url)  {
            sources[adapter].url  = url;
        }
        if (icon) {
            sources[adapter].icon = icon;
        }
    }
    fs.writeFileSync(__dirname + '/conf/sources-dist.json', JSON.stringify(sources, null, 2));
    done();
});

gulp.task('updateReadme', done => {
    const readme = fs.readFileSync('CHANGELOG.md');
    if (readme.indexOf(version) === -1) {
        const timestamp = new Date();
        const date = timestamp.getFullYear() + '-' +
            ('0' + (timestamp.getMonth() + 1).toString(10)).slice(-2) + '-' +
            ('0' + (timestamp.getDate()).toString(10)).slice(-2);

        let news = '';
        if (iopackage.common.whatsNew) {
            for (let i = 0; i < iopackage.common.whatsNew.length; i++) {
                if (typeof iopackage.common.whatsNew[i] === 'string') {
                    news += '* ' + iopackage.common.whatsNew[i] + '\n';
                } else {
                    news += '* ' + iopackage.common.whatsNew[i].en + '\n';
                }
            }
        }
        fs.writeFileSync('CHANGELOG.md', '# ' + version + ' (' + date + ')\n' + news + '\n' + readme);
    }
    done();
});

gulp.task('jsdoc', done => {
    gulp.src(['lib/adapter.js'], {read: false})
        .pipe(jsdoc(
            {
                tags: {
                    allowUnknownTags: true
                },
                opts: {
                    destination: './doc'
                },
                plugins: [
                    'plugins/markdown'
                ],
                templates: {
                    cleverLinks: false,
                    monospaceLinks: false,
                    default: {
                        outputSourceFiles: true
                    },
                    path: 'ink-docstrap',
                    theme: 'cerulean',
                    navType: 'vertical',
                    linenums: true
                    //dateFormat: "MMMM Do YYYY, h:mm:ss a"
                }
            },
            done));
});

gulp.task('default',    gulp.series('replaceCore', 'updateReadme'));
gulp.task('p',          gulp.series('replaceCore', 'updateReadme'));
gulp.task('rename',     gulp.series('replaceName', 'renameFiles'));
gulp.task('doc',        gulp.series('jsdoc'));
