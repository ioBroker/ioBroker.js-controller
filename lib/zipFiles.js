var JSZip;

function _getAllFilesInDir(objects, id, name, options, callback, result) {
    result = result || [];
    objects.readDir(id, name, options, function (err, files) {
        var count = 0;
        var errors = [];
        if (files) {
            for (var f = 0; f < files.length; f++) {
                if (files[f].isDir) {
                    count++;
                    _getAllFilesInDir(objects, id, name + '/' + files[f].file, options, function (err, _result) {
                        if (err) errors.push(err);
                        if (!--count) callback(errors.length ? errors : null, _result);
                    }, result);
                } else {
                    result.push(name + '/' + files[f].file);
                }
            }
        }
        if (!count) callback(null, result);
    });
}

function _addFile(objects, id, name, options, zip, files, callback) {
    objects.readFile(id, name, options, function (err, data, mime) {
        if (!zip) {
            console.log(err);
            callback(err, files);
        } else {
            // if handler installed
            if (options.processFunc) {
                try {
                    data = options.processFunc(name, data, files);
                } catch (error) {
                    console.error(error);
                    err = err || error;
                }
            }
            var parts = name.split('/');
            if (parts.length > 1) {
                parts.shift();
                name = parts.join('/');
            }

            zip.file(name, data);
            setTimeout(function () {
                callback(err, files);
            }, 0);
        }
    });
}

function specialVis(name, data, files) {
    if (name.match(/vis-views\.json$/)) {
        var parts = name.split('/');
        var project = parts.shift();
        // detect: /vis/, /vis.0/, /icon-blabla/, ...
        var m = data.match(/": "\/[-_0-9\w]+(\.[-_0-9\w]+)?\/.+\.(png|jpg|jpeg|gif|wav|mp3|bmp|svg)+"/g);
        if (m) {
            for (var mm = 0; mm < m.length; mm++) {
                var fn = m[mm].substring(5); // remove ": "/
                var originalFileName = fn.replace(/"/g, ''); // remove last "
                var p  = fn.split('/');
                var adapter = p.shift(); // remove vis.0 or whatever
                var _project = p.shift();
                fn  = p.shift(); // keep only one subdirectory
                fn += p.length ? '/' + p.join('') : '';// all other subdirectories combine in one name because of store bug

                if (adapter === 'vis.0' && _project !== project) {
                    // add to files
                    if (files.indexOf(originalFileName.substring('vis.0/'.length)) === -1) { // if "vis.0/dir/otherProject.png"
                        files.push(originalFileName.substring('vis.0/'.length));
                    }
                    data = data.replace(m[mm], '": "vis.0/' + project + '/' + fn);
                }
            }
        }
        // try to replace <img src="/vis.0/main...">
        m = data.match(/src=\\"\/[-_0-9\w]+(\.[-_0-9\w]+)?\/.+\.(png|jpg|jpeg|gif|wav|mp3|bmp|svg)+\\"/g);
        if (m) {
            for (var mm = 0; mm < m.length; mm++) {
                var fn = m[mm].substring(7); // remove src=\"/
                var originalFileName = fn.replace(/\\"/g, ''); // remove last "
                var p  = fn.split('/');
                var adapter = p.shift(); // remove vis.0 or whatever
                var _project = p.shift();
                fn  = p.shift(); // keep only one subdirectory
                fn += p.length ? '/' + p.join('') : '';// all other subdirectories combine in one name because of store bug

                if (adapter === 'vis.0' && _project !== project) {
                    // add to files
                    if (files.indexOf(originalFileName.substring('vis.0/'.length)) === -1) { // if "vis.0/dir/otherProject.png"
                        files.push(originalFileName.substring('vis.0/'.length));
                    }
                    data = data.replace(m[mm], 'src=\\"vis.0/' + project + '/' + fn);
                }
            }
        }
        // try to replace <img src='/vis.0/main...'>
        m = data.match(/src='\/[-_0-9\w]+(\.[-_0-9\w]+)?\/.+\.(png|jpg|jpeg|gif|wav|mp3|bmp|svg)+'/g);
        if (m) {
            for (var mm = 0; mm < m.length; mm++) {
                var fn = m[mm].substring(6); // remove src="/
                var originalFileName = fn.replace(/'/g, ''); // remove last "
                var p  = fn.split('/');
                var adapter = p.shift(); // remove vis.0 or whatever
                var _project = p.shift();
                fn  = p.shift(); // keep only one subdirectory
                fn += p.length ? '/' + p.join('') : '';// all other subdirectories combine in one name because of store bug

                if (adapter === 'vis.0' && _project !== project) {
                    // add to files
                    if (files.indexOf(originalFileName.substring('vis.0/'.length)) === -1) { // if "vis.0/dir/otherProject.png"
                        files.push(originalFileName.substring('vis.0/'.length));
                    }
                    data = data.replace(m[mm], "src='vis.0/" + project + '/' + fn);
                }
            }
        }
        // try to replace <img src='/vis.0/main...'>
        m = data.match(/\.[A-Z]{3}\d{7}\./g);
        if (m) {
            for (var mm = 0; mm < m.length; mm++) {
                data = data.replace(m[mm], '.ABC' + Math.round(Math.random() * 1000000) + '.');
            }
        }
    }
    return data;
}

// pack all files as zip and send it back
function readDirAsZip(objects, id, name, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = null;
    }
    if (name[0] === '/') name = name.substring(1);

    if (options && options.processFunc && typeof options.processFunc === 'string') {
        try {
            options.processFunc = specialVis;
        } catch (error) {
            console.error(error);
        }
    }

    _getAllFilesInDir(objects, id, name, options, function (err, files) {
        var count = 0;
        if (files) {
            JSZip = JSZip || require('jszip');
            var zip = new JSZip();
            var additional = [];
            for (var f = 0; f < files.length; f++) {
                count++;
                _addFile(objects, id, files[f], options, zip, additional, function (err, additional) {
                    if (!--count) {
                        if (additional && additional.length) {
                            for (var ff = 0; ff < additional.length; ff++) {
                                count++;
                                _addFile(objects, id, additional[ff], options, zip, null, function (err) {
                                    if (!--count) {
                                        zip.generateAsync({type: 'base64'})
                                            .then(function (base64) {
                                                callback(err, base64);
                                            }, function (err) {
                                                callback(err);
                                            });
                                        zip = null;
                                    }
                                });
                            }
                        } else {
                            zip.generateAsync({type: 'base64'})
                                .then(function (base64) {
                                    callback(err, base64);
                                }, function (err) {
                                    callback(err);
                                });
                            zip = null;   
                        }
                    }
                });
            }
        }
        if (!count) {
            callback(err, null);
        }
    });
}

function _writeOneFile(objects, zip, id, name, filename, options, callback) {
    zip.files[filename].async('nodebuffer').then(function (data) {
        objects.writeFile(id, name + filename, data, options, function (err) {
            callback(err);
        });
    }, function (err) {
        callback(err);
    });
}

function writeDirAsZip(objects, id, name, data, options, callback) {
    JSZip = JSZip || require('jszip');
    var zip = new JSZip();
    try {
        zip.loadAsync(data).then(function () {
            var count = 0;
            var error = [];
            if (name[name.length - 1] !== '/') name += '/';
            for (var filename in zip.files) {
                count++;
                try {
                    _writeOneFile(objects, zip, id, name, filename, options, function (err) {
                        if (err) error.push(err.toString());
                        if (!--count && callback) {
                            callback(error.length ? error.join(', ') : null);
                            callback = null;
                        }
                    });
                } catch (error) {
                    if (callback) {
                        callback(error.toString());
                        callback = null;
                    }
                }
            }
        }, function (error) {
            if (callback) {
                callback(error.toString());
                callback = null;
            }
        });
    } catch (error) {
        if (callback) {
            callback(error.toString());
            callback = null;
        }
    }
}

// pack all files as zip and send it back
function readObjectsAsZip(objects, root, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = null;
    }
    objects.getConfigKeys(root + '.*', options, function (err, keys) {
        objects.getObjects(keys, options, function(err, objs) {
            JSZip = JSZip || require('jszip');
            var zip = new JSZip();
            var count = 0;
            for (var f = 0; f < objs.length; f++) {
                var path = objs.replace(/\./g, '/');
                var path = parts.join('/');
                zip.file(keys[f].replace(/\./g, '/'), JSON.stringify(objs[f]));
                zip.generateAsync({type: 'base64'})
                    .then(function (base64) {
                        callback(err, base64);
                    }, function (err) {
                        callback(err);
                    });
            }
        });
    });
}

function _writeOneObject(objects, zip, filename, options, callback) {
    zip.files[filename].async('nodebuffer').then(function (data) {
        var id = filename.replace(/\//g, '.');
        try {
            objects.setObject(id, JSON.parse(data), options, function (err) {
                callback(err);
            });
        } catch (err) {
            callback(err);
        }
    }, function (err) {
        callback(err);
    });
}

function writeObjectsAsZip(objects, data, options, callback) {
    JSZip = JSZip || require('jszip');
    var zip = new JSZip();
    try {
        zip.loadAsync(data).then(function () {
            var count = 0;
            var error = [];
            for (var filename in zip.files) {
                count++;
                _writeOneObject(objects, zip, filename, options, function (err) {
                    if (err) error.push(err.toString());
                    if (!--count && callback) {
                        callback(error.length ? error.join(', ') : null);
                        callback = null;
                    }
                });
            }
        }, function (error) {
            if (callback) {
                callback(error.toString());
                callback = null;
            }
        });
    } catch (error) {
        if (callback) {
            callback(error.toString());
            callback = null;
        }
    }
}

module.exports.readDirAsZip      = readDirAsZip;
module.exports.writeDirAsZip     = writeDirAsZip;
module.exports.readObjectsAsZip  = readObjectsAsZip;
module.exports.writeObjectsAsZip = writeObjectsAsZip;