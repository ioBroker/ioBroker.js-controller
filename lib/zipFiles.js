var JSZip;
var tools = require(__dirname + '/tools');


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
            callback('Cannot read file "' + name + '": ' + err, files);
        } else {
            // if handler installed
            if (options.stringify) {
                try {
                    data = options.stringify(name, data, options ? options.settings : null, files);
                } catch (error) {
                    console.error('Cannot stringify file "' + name + '": ' + error);
                    if (!err) err = 'Cannot stringify file "' + name + '": ' + error;
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

// pack all files as zip and send it back
function readDirAsZip(objects, id, name, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = null;
    }
    if (name[0] === '/') name = name.substring(1);
    options = options || {};
    var adapter = id;
    if (adapter.indexOf('.') !== -1) {
        adapter = id.split('.')[0];
    }

    // try to load processor of adapter
    try {
        options.stringify = require(tools.appName + '.' + adapter + '/lib/convert.js').stringify;
    } catch (e) {

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
                                if (!additional[ff] || typeof additional[ff] !== 'string') continue;
                                count++;

                                if (additional[ff][0] === '/') additional[ff] = additional[ff].substring(1);
                                var parts = additional[ff].split('/');
                                var adapter = parts.shift();

                                _addFile(objects, adapter, parts.join('/'), options, zip, null, function (err) {
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
                            if (!count) {
                                zip.generateAsync({type: 'base64'})
                                    .then(function (base64) {
                                        callback(err, base64);
                                    }, function (err) {
                                        callback(err);
                                    });
                                zip = null;
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

function _checkDir(objects, id, root, parts, options, callback) {
    if (!parts || !parts.length) {
        callback();
        return;
    }
    root += '/' + parts.shift();
    objects.readDir(id, root, options, function (err, files) {
        if (err === 'Not exists') {
            objects.mkdir(id, root, options, function (err) {
                _checkDir(objects, id, root, parts, options, callback);
            });
        } else {
            _checkDir(objects, id, root, parts, options, callback);
        }
    });
}

function _writeOneFile(objects, zip, id, name, filename, options, callback) {
    zip.files[filename].async('nodebuffer').then(function (data) {
        var _err;
        if (options.parse) {
            try {
                data = options.parse(name, filename, data, options ? options.settings : null);
            } catch (e) {
                _err = e;
            }
        }
        var fName = name + filename;
        var parts = fName.split('/');
        parts.pop();
        _checkDir(objects, id, '', parts, options, function () {
            objects.writeFile(id, name + filename, data, options, function (err) {
                callback(_err || err);
            });
        });
    }, function (err) {
        callback(err);
    });
}

function writeDirAsZip(objects, id, name, data, options, callback) {
    JSZip = JSZip || require('jszip');
    var zip = new JSZip();

    options = options || {};

    var adapter = id;
    if (adapter.indexOf('.') !== -1) {
        adapter = id.split('.')[0];
    }

    // try to load processor of adapter
    try {
        options.parse = require(tools.appName + '.' + adapter + '/lib/convert.js').parse;
    } catch (e) {

    }

    try {
        zip.loadAsync(data).then(function () {
            var count = 0;
            var error = [];
            if (name[name.length - 1] !== '/') name += '/';
            for (var filename in zip.files) {
                if (!filename || filename[filename.length - 1] === '/') continue;
                count++;
                try {
                    _writeOneFile(objects, zip, id, name, filename, options, function (err) {
                        if (err) {
                            error.push('Cannot write file "' + filename + '":' + err.toString());
                        }
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