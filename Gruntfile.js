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
        replace: {
            core: {
                options: {
                    patterns: [
                        {
                            match: /var version = '[\.0-9]*';/g,
                            replacement: "var version = '" + iopackage.version + "';"
                        },
                        {
                            match: /"version"\: "[\.0-9]*",/g,
                            replacement: '"version": "' + iopackage.version + '",'
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
        jshint: require('./tasks/jshint.js')
    });

    grunt.registerTask('updateReadme', function () {
        var readme = grunt.file.read('CHANGELOG.md');
        if (readme.indexOf(iopackage.version) == -1) {
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

    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');

    grunt.registerTask('default', [
        'replace',
        'updateReadme',
        'jshint',
        'jscs'
    ]);
};