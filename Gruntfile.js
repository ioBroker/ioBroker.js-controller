// To use this file in WebStorm, right click on the file name in the Project Panel (normally left) and select "Open Grunt Console"

/** @namespace __dirname */
/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

module.exports = function (grunt) {

    var srcDir    = __dirname + "/";
    var pkg       = grunt.file.readJSON('package.json');
    var iopackage = grunt.file.readJSON('io-package.json');

    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        clean: {
            all: ['tmp/*.json']
        },
        replace: {
            core: {
                options: {
                    patterns: [
                        {
                            match: /var version = '[\.0-9]*';/g,
                            replacement: "var version = '" + iopackage.common.version + "';"
                        },
                        {
                            match: /"version"\: "[\.0-9]*",/g,
                            replacement: '"version": "' + iopackage.common.version + '",'
                        }
                    ]
                },
                files: [
                    {
                        expand:  true,
                        flatten: true,
                        src:     [
                                srcDir + 'controller.js',
                                srcDir + 'package.json'
                        ],
                        dest:    srcDir
                    }
                ]
            }
        },
        // Javascript code styler
        jscs: require('./tasks/jscs.js'),
        // Lint
        jshint: require('./tasks/jshint.js'),
        http: {
            get_http: {
                options: {
                    url: 'http://<%= grunt.task.current.args[0] %>'
                },
                dest: 'tmp/<%= grunt.task.current.args[1] %>.json'
            },
            get_https: {
                options: {
                    url: 'https://<%= grunt.task.current.args[0] %>'
                },
                dest: 'tmp/<%= grunt.task.current.args[1] %>.json'
            }
        },
        exec: {
            npm: {
                cmd: 'npm install'
                }
        }
    });

    grunt.registerTask('updateReadme', function () {
        var readme = grunt.file.read('CHANGELOG.md');
        if (iopackage.common && readme.indexOf(iopackage.common.version) == -1) {
            var timestamp = new Date();
            var date = timestamp.getFullYear() + '-' +
                ("0" + (timestamp.getMonth() + 1).toString(10)).slice(-2) + '-' +
                ("0" + (timestamp.getDate()).toString(10)).slice(-2);

            var news = "";
            if (iopackage.whatsNew) {
                for (var i = 0; i < iopackage.whatsNew.length; i++) {
                    if (typeof iopackage.whatsNew[i] == 'string') {
                        news += '* ' + iopackage.whatsNew[i] + '\r\n';
                    } else {
                        news += '* ' + iopackage.whatsNew[i].en + '\r\n';
                    }
                }
            }
            grunt.file.write('CHANGELOG.md', '# ' + iopackage.version + ' (' + date + ')\r\n' + news + '\r\n' + readme);
        }
    });

    grunt.registerTask('updateRepo1', function () {
        var sources = JSON.parse(grunt.file.read(__dirname + '/conf/sources-dist.json'));

        var count = 0;
        for (var adapter in sources) {
            if (sources[adapter].meta) {
                if (sources[adapter].meta.substring(0, 'http://'.length) == 'http://') {
                    grunt.task.run(['http:get_http:' + sources[adapter].meta.substring('http://'.length) + ':' + adapter]);
                } else
                if (sources[adapter].meta.substring(0, 'https://'.length) == 'https://') {
                    grunt.task.run(['http:get_https:' + sources[adapter].meta.substring('https://'.length) + ':' + adapter]);
                }
            }
        }
    });

    grunt.registerTask('updateRepo2', function () {
        var fs = require('fs');
        var dir = fs.readdirSync('tmp');
        var sources = grunt.file.readJSON(__dirname + '/conf/sources-dist.json');
        for (var i = 0; i < dir.length; i++) {
            if (dir[i].indexOf('.json') != -1) {
                var adapter = dir[i].substring(0, dir[i].length - '.json'.length);
                var meta = sources[adapter].meta;
                var url  = sources[adapter].url;
                sources[adapter] = JSON.parse(grunt.file.read('tmp/' + dir[i])).common;
                sources[adapter].meta = meta;
                sources[adapter].url  = url;
                sources[adapter].icon = sources[adapter].extIcon;
            }
        }
        grunt.file.write(__dirname + '/conf/sources-dist.json', JSON.stringify(sources, null, 2));
    });

    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-http');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', [
        'exec',
        'clean',
        'replace',
        'updateReadme',
        'jshint',
        'jscs',
        'updateRepo1',
        'updateRepo2',
        'clean'
    ]);
};