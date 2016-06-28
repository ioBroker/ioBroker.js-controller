var AdmZip = require('adm-zip');

function _getAllFilesInDir(objects, id, name, options, callback, result) {
    result = result || [];
    objects.readDir(id, name, options, function (err, files) {
        var count = 0;
        var errors = [];
        if (files) {
            for (var f = 0; f < files.length; f++) {
                if (files[f].isDir) {
                    count++;
                    _getAllFilesInDir(id, name + '/' + files[f].file, options, function (err, _result) {
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

function _addFile(objects, id, name, options, zip, callback) {
    objects.readFile(id, name, options, function (err, data, mime) {
        if (!zip) {
            console.log(err);
        } else {
            zip.addFile(name, data, mime);
            setTimeout(function () {
                callback(err);
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
    if (name[0] == '/') name = name.substring(1);

    _getAllFilesInDir(objects, id, name, options, function (err, files) {
        var count = 0;
        if (files) {
            AdmZip = AdmZip || require('adm-zip');
            var zip = new AdmZip();

            for (var f = 0; f < files.length; f++) {
                count++;
                _addFile(objects, id, files[f], options, zip, function (err) {
                    if (!--count) {
                        callback(err, zip.toBuffer());
                        zip = null;
                    }

                });
            }
        }
        if (!count) {
            callback(err, null);
        }
    });
}

function writeDirAsZip(objects, id, name, options, data, callback) {

}

module.exports.readDirAsZip  = readDirAsZip;
module.exports.writeDirAsZip = writeDirAsZip;