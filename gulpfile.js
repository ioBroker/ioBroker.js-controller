'use strict';

var gulp      = require('gulp');
var fs        = require('fs');
var pkg       = require('./package.json');
var iopackage = require('./io-package.json');
var version   = (pkg && pkg.version) ? pkg.version : iopackage.common.version;


gulp.task('updateRepo1', function () {
    var sources = JSON.parse(fs.readFileSync(__dirname + '/conf/sources-dist.json'));

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