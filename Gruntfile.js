// To use this file in WebStorm, right click on the file name in the Project Panel (normally left) and select "Open Grunt Console"

/** @namespace __dirname */
/* jshint -W097 */
/* jshint strict:false */
/* jslint node: true */
'use strict';

function getAppName() {
    const parts = __dirname.replace(/\\/g, '/').split('/');
    return parts[parts.length - 1].split('.')[0].toLowerCase();
}

module.exports = function (grunt) {

    const srcDir    = __dirname + '/';
    const pkg       = grunt.file.readJSON('package.json');
    const iopackage = grunt.file.readJSON('io-package.json');
    const appName   = getAppName();

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
            },
			name: {
                options: {
                    patterns: [
                        {
                            match:       /iobroker/gi,
                            replacement: appName
                        },
                        {
                            match:       /"iobroker\.admin": "\*"/i,
                            replacement: ''
                        },
                        {
                            match:       new RegExp('"iobroker\\.admin": "\\*"'),
                            replacement: ''
                        }
                    ]
                },
                files: [
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
        jsdoc : {
            dist : {
                src: ['lib/adapter.js'],
                options: {
                    destination: 'doc'
                }
            }
        }
    });

    grunt.registerTask('updateReadme', function () {
        var readme = grunt.file.read('CHANGELOG.md');
        if (readme.indexOf(version) === -1) {
            var timestamp = new Date();
            var date = timestamp.getFullYear() + '-' +
                ('0' + (timestamp.getMonth() + 1).toString(10)).slice(-2) + '-' +
                ('0' + (timestamp.getDate()).toString(10)).slice(-2);

            var news = '';
            if (iopackage.common.whatsNew) {
                for (var i = 0; i < iopackage.common.whatsNew.length; i++) {
                    if (typeof iopackage.common.whatsNew[i] === 'string') {
                        news += '* ' + iopackage.common.whatsNew[i] + '\n';
                    } else {
                        news += '* ' + iopackage.common.whatsNew[i].en + '\n';
                    }
                }
            }
            grunt.file.write('CHANGELOG.md', '# ' + version + ' (' + date + ')\n' + news + '\n' + readme);
        }
    });

    grunt.registerTask('updateRepo1', function () {
        var sources = JSON.parse(grunt.file.read(__dirname + '/conf/sources-dist.json'));

        var count = 0;
        for (var adapter in sources) {
            if (!sources.hasOwnProperty(adapter)) continue;
            if (sources[adapter].meta) {
                if (sources[adapter].meta.substring(0, 'http://'.length) === 'http://') {
                    grunt.task.run(['http:get_http:' + sources[adapter].meta.substring('http://'.length) + ':' + adapter]);
                } else
                if (sources[adapter].meta.substring(0, 'https://'.length) === 'https://') {
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
            if (dir[i].indexOf('.json') !== -1) {
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

    grunt.registerTask('cleanRepo', function () {
        var fs = require('fs');
        var sources = grunt.file.readJSON(__dirname + '/conf/sources-dist.json');
        for (var adapter in sources) {
            if (!sources.hasOwnProperty(adapter)) continue;
            var meta = sources[adapter].meta;
            var url  = sources[adapter].url;
            var icon = sources[adapter].icon;

            sources[adapter] = {};
            if (meta) sources[adapter].meta = meta;
            if (url)  sources[adapter].url  = url;
            if (icon) sources[adapter].icon = icon;
        }
        grunt.file.write(__dirname + '/conf/sources-dist.json', JSON.stringify(sources, null, 2));
    });
    
	grunt.registerTask('renameFiles', function () {
		var fs = require('fs');
		fs.unlink(__dirname + '/lib/img/iobroker.png');
		if (fs.existsSync(__dirname + '/iobroker'))                 fs.renameSync(__dirname + '/iobroker',                __dirname + '/' + appName);
        if (fs.existsSync(__dirname + '/_service_iobroker.bat'))    fs.renameSync(__dirname + '/_service_iobroker.bat',   __dirname + '/_service_' + appName + '.bat');
        if (fs.existsSync(__dirname + '/iobroker.bat'))             fs.renameSync(__dirname + '/iobroker.bat',            __dirname + '/' + appName + '.bat');
        if (fs.existsSync(__dirname + '/iobroker.js'))              fs.renameSync(__dirname + '/iobroker.js',             __dirname + '/' + appName + '.js');
        if (fs.existsSync(__dirname + '/conf/iobroker-dist.json'))  fs.renameSync(__dirname + '/conf/iobroker-dist.json', __dirname + '/conf/' + appName + '-dist.json');
    });
	
	grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-http');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', [
        'replace:core',
        'updateReadme',
        'jshint',
        'jscs'
//        'updateRepo1',
//        'updateRepo2',
    ]);
	grunt.registerTask('p', [
        'replace:core',
        'updateReadme'
    ]);
	grunt.registerTask('rename', [
        'replace:name',
        'renameFiles'
    ]);
    grunt.registerTask('doc', [
        'jsdoc'
    ]);
};