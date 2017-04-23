// Include gulp
const fs = require('fs');
const path = require('path');
const request = require('request');

// Include Our Plugins
const gulp = require('gulp');
const gulpDebug = require('gulp-debug');
const gulpGitbook = require('gulp-gitbook');
const gulpServe   = require('gulp-serve');
const del = require('del');

const languages = ['en', 'de', 'ru'];
const dest = '_dist/';
const src = './src/';
const book = require(__dirname + '/' + src + '/book.json');
const adaptersName = '30_adapters';

gulp.task('clean', function (done) {
    del([
        dest + '**/*.*',
        dest + '**/.*',
        dest + '**/*'
    ]).then(function () {
        done();
    });
});
function downloadFiles(files, callback) {
    if (!files || !files.length) {

    } else {
        var task = files.shift();
        request(task.url, function (err, resp, body) {
            if (body) {
                if (!fs.existsSync(path.dirname(task.name))) {
                    fs.mkdirSync(path.dirname(task.name));
                }
                fs.writeFileSync(task.name, body);
            } else {
                console.error('Cannot load "' + task.url + '": ' + err);
            }
            process.nextTick(downloadFiles, files, callback);
        });
    }
}

function makeChange() {
    // you're going to receive Vinyl files as chunks
    function transform(file, cb) {
        // read and modify file contents
        console.log(file.history[0]);
        var lines = String(file.contents).replace(/\r\n/g, '\n').split('\n');
        var files = [];
        var found = false;
        if (file.history[0].match(/email\.md$/)) {
            console.log('A');
        }
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/http:\/\/www\.iobroker\.net\/wp-content\/uploads\/\//g, 'http://iobroker.net/wp-content/uploads/');
            lines[i] = lines[i].replace(/http:\/\/www\.iobroker\.net\/wp-content\/uploads\//g, 'http://iobroker.net/wp-content/uploads/');
            lines[i] = lines[i].replace(/http:\/\/iobroker\.net\/wp-content\/uploads\/\//g, 'http://iobroker.net/wp-content/uploads/');
            // [![](http://www.iobroker.net/wp-content/uploads//email_set.png)](http://www.iobroker.net/wp-content/uploads//email_set.png)]
            var m = lines[i].match(/(\[caption[^\]]*\])?\!\[[^\]]*\]\(http:\/\/iobroker\.net\/[^\)]+\)(\]\([^\)]*\))?\]?(.*\[\/caption\])?/g);
            if (m) {
                for (var j = 0; j < m.length; j++) {
                    found = true;
                    // try to extract caption
                    var caption = m[j].match(/\)\]?(.+)\[\/caption\]/);
                    if (caption) {
                        caption = caption[1].trim();
                    }

                    // change it to \n![](img/filename_oldf_filename)\n
                    var mm = m[j].split('](')[1];
                    mm = mm.replace(/\).*$/, '');
                    // noe we have "http://www.iobroker.net/wp-content/uploads/email_set.png"
                    var fileName = mm.split('/').pop();
                    var mdPath = file.history[0].replace(/\\/g, '/');
                    var parts = mdPath.split('/');
                    var mdFileName = parts.pop().replace(/\.md$/, '');
                    mdPath = parts.join('/');

                    var task = {url: mm, name: mdPath + '/img/' + mdFileName + '_' + fileName, relative: 'img/' + mdFileName + '_' + fileName};
                    files.push(task);
                    lines[i] = lines[i].replace(m[j], '\n![' + (caption || '') + '](' + task.relative + ')\n');
                }
            }
        }
        downloadFiles(files, function () {
            if (found) {
                file.contents_ = new Buffer(lines.join('\n'));
            }

            // if there was some error, just pass as the first parameter here
            cb(null, file);
        });
    }

    // returning the map will cause your transform function to be called
    // for each one of the chunks (files) you receive. And when this stream
    // receives a 'end' signal, it will end as well.
    //
    // Additionally, you want to require the `event-stream` somewhere else.
    return require('event-stream').map(transform);
}

gulp.task('format', function (done) {
    return gulp.src([src + '**/*.md'])
        .pipe(makeChange())
        .pipe(gulp.dest(src));
});

// copy from src to dist
gulp.task('prepare-dist', ['clean'], function (done) {
    var count = 0;
    function localDone() {
        if (!--count) done();
    }
    count++;
    gulp.src([src + '*.*', src + '.*']).pipe(gulp.dest(dest)).on('end', localDone);

    count++;
    gulp.src([
        src + '_layouts/*/*.*',
        src + '_layouts/*.*']).pipe(gulp.dest(dest + '/_layouts/')).on('end', localDone);

    count++;
    gulp.src([
        src + '_i18n/*/*.*',
        src + '_i18n/*.*']).pipe(gulp.dest(dest + '/_i18n/')).on('end', localDone);

    count++;
    gulp.src([
        src + 'css/*/*.*',
        src + 'css/*.*']).pipe(gulp.dest(dest + '/css/')).on('end', localDone);

    count++;
    gulp.src([
        src + 'img/*/*.*',
        src + 'img/*.*']).pipe(gulp.dest(dest + '/img/')).on('end', localDone);

    languages.forEach(function (lang) {
        count++;
        gulp.src([
            src + lang + '/*/*.*',
            src + lang + '/*.*'
        ]).pipe(gulp.dest(dest + lang + '/')).on('end', localDone);

        count++;
        gulp.src([
            src + 'styles/*/*.*',
            src + 'styles/*.*']).pipe(gulp.dest(dest + lang + '/styles/')).on('end', localDone);

        count++;
        gulp.src([
            src + 'img/*/*.*',
            src + 'img/*.*']).pipe(gulp.dest(dest + lang + '/img/')).on('end', localDone);

        count++;
        gulp.src([
            src + '_layouts/*/*.*',
            src + '_layouts/*.*']).pipe(gulp.dest(dest + lang + '/_layouts/')).on('end', localDone);


        count++;
        gulp.src([
            src + '_i18n/*/*.*',
            src + '_i18n/*.*']).pipe(gulp.dest(dest + lang + '/_i18n/')).on('end', localDone);
    });
});

gulp.task('adapters', ['prepare-dist'], function (done) {
    var types = {
        'common adapters': '10_common_adapters'
    };

    var noReadme = {
        en: 'No text here.',
        de: 'Keine Beschriebung, aber es gibt <a href="%s">englishe Beschreibung</a>.',
        ru: 'Описание доступно только на <a href="%s">английском</a>.'
    };

    function mkpathSync(rootpath, dirpath) {
        // Remove filename
        dirpath = dirpath.split('/');
        dirpath.pop();
        if (!dirpath.length) return;

        for (var i = 0; i < dirpath.length; i++) {
            rootpath += dirpath[i] + '/';
            if (!fs.existsSync(rootpath)) {
                fs.mkdirSync(rootpath);
            }
        }
    }

    function getReadme(url, fileName, adapter, lang, callback) {
        // https://github.com/ioBroker/ioBroker.admin/blob/master/README.md
        //https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/README.md
        url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        console.log('Request ' + url);
        request(url, function (err, res, body) {
            mkpathSync(dest, fileName);
            if (!body || res.statusCode !== 200) {
                fs.writeFileSync(dest + fileName, new Array(fileName.split('/').length).join('../') + noReadme[lang].replace('%s', fileName.replace(/^ru/, 'en').replace(/^de/, 'en')));
                callback();
            } else {
                readme2md(body, adapter, lang, url, fileName, function (err, text) {
                    if (text) fs.writeFileSync(dest + fileName, text);
                    if (err) console.error(err);
                    callback && callback(err);
                });
            }
        });
    }

    var download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
            if (res) {
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);

                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            } else {
                console.error(err);
                callback(err);
            }
        });
    };

    function getImages(images, callback) {
        if (!images || !images.length) {
            callback && callback();
        } else {
            var img = images.shift();
            if (fs.existsSync(dest + img.name)) {
                setTimeout(getImages, 0, images, callback);
            } else {
                mkpathSync(dest + '/', img.name);
                download(img.link, dest + img.name, function () {
                    setTimeout(getImages, 0, images, callback);
                });
            }
        }
    }

    function readme2md(text, name, lang, link, fileName, callback) {
        // escape all {{ and }}
        text = text.replace(/\{\{/g, '{% raw %}{{').replace(/\}\}/g, '}}{% endraw %}');

        // cut ## Changelog

        var pos = text.indexOf('### Changelog');
        if (pos !== -1) {
            text = text.substring(0, pos);
        } else {
            pos = text.indexOf('## Changelog');
            if (pos !== -1) {
                text = text.substring(0, pos);
            } else {
                pos = text.indexOf('# Changelog');
                if (pos !== -1) {
                    text = text.substring(0, pos);
                }
            }
        }

        // cut additional information
        //![Logo](admin/vis.png)
        //iobroker.vis
        //============
        //
        //[![NPM version](http://img.shields.io/npm/v/iobroker.vis.svg)](https://www.npmjs.com/package/iobroker.vis)
        //[![Downloads](https://img.shields.io/npm/dm/iobroker.vis.svg)](https://www.npmjs.com/package/iobroker.vis)
        //
        //[![NPM](https://nodei.co/npm/iobroker.vis.png?downloads=true)](https://nodei.co/npm/iobroker.vis/)
        text = text.replace(/\r\n/g, '\n');
        var lines = text.split('\n');
        name = name.replace(/-beta$/, '');
        var images = [];
        for (var i = 0, len = lines.length; i < 50 && i < len; i++) {
            if (lines[i].trim() === 'iobroker.' + name) {
                lines.splice(i--, 1);
                len--;
                continue;
            }
            if (lines[i].trim() === 'ioBroker.' + name) {
                lines.splice(i--, 1);
                len--;
                continue;
            }
            if (lines[i].match(/^\!\[Logo\]/)) {
                lines.splice(i--, 1);
                len--;
                continue;
            }
            if (lines[i].match(/^===/)) {
                lines.splice(i--, 1);
                len--;
                continue;
            }
            if (lines[i].match(/^\[!\[NPM/)) {
                lines.splice(i--, 1);
                len--;
                continue;
            }
            if (lines[i].match(/^\[\!\[Down/)) {
                lines.splice(i--, 1);
                len--;
                continue;
            }
            var m = lines[i].match(/!\[[^\]]*\]\(([^\)]+)\)/);
            if (lines[i].indexOf('.jpg') !== -1 || lines[i].indexOf('.png') !== -1) {
                if (m && m[1] && m[1].substring(0, 4) !== 'http') {
                    var parts = fileName.split('/');
                    parts.pop();
                    fileName = parts.join('/') + '/' + m[1];
                    var pparts = link.split('/');
                    pparts.pop();

                    images.push({
                        link: pparts.join('/') + '/' + m[1],
                        name: fileName
                    });
                }
            }

            // extract images
            // ![Demo interface](https://github.com/GermanBluefox/DashUI/raw/master/images/user0.png)
            // ==>
            // ![Demo interface](/en/img/vis/images/user0.png)
        }
        if (callback) {
            getImages(images, function () {
                callback && callback(null, lines.join('\n'));
            });
        } else {
            return lines.join('\n');
        }
    }
    var debugAdapter = 'admin';

    function processTasks(tasks, sources, callback) {
        if (!tasks || !tasks.length) {
            callback && callback();
        } else {
            var task = tasks.shift();
            var name = task.name;
            var link = task.link;
            var readme;
            var type = sources[name].type;
            type = types[type] || type || types['common adapters'];
            request(link, function (err, res, body) {
                if (body) {
                    var pack = JSON.parse(body);
                    var count = 0;
                    if (pack.common.docs) {
                        var langs = pack.common.docs;
                        if (!langs.de) langs.de = '';
                        if (!langs.ru) langs.ru = '';
                        if (!langs.en) langs.en = '';
                        //if (!langs.pt) langs.pt = '';
                        for (var lang in langs) {
                            var files = langs[lang];
                            if (typeof files !== 'object') files = [files];
                            count += files.length;
                            for (var f = 0; f < files.length; f++) {
                                getReadme(link.replace('io-package.json', files[f]),
                                    files[f].replace('docs/en/', 'en/' + adaptersName + '/' + type + '/')
                                        .replace('docs/de/', 'de/' + adaptersName + '/' + type + '/')
                                        .replace('docs/ru/', 'ru/' + adaptersName + '/' + type + '/'),
                                    name, lang, function () {
                                        if (!--count) setTimeout(processTasks, 0, tasks, sources, callback);
                                    });
                            }
                        }
                    } else {
                        count = languages.length;
                        languages.forEach(function (lang) {
                            readme = link.replace('io-package.json', 'README.md');
                            if (readme && readme.match(/README\.md$/) && lang !== 'en') {
                                readme = readme.replace('README.md', 'README_' + lang + '.md');
                            }
                            getReadme(readme, lang + '/' + adaptersName + '/' + type + '/' + name + '.md', name, lang, function () {
                                if (!--count) setTimeout(processTasks, 0, tasks, sources, callback);
                            });
                        });
                    }
                } else {
                    console.error('cannot read "' + link + '": ' + err);
                    callback && callback();
                }
            });
        }
    }

    var tasks = [];
    request('http://download.iobroker.net/sources-dist-latest.json', function (err, res, body) {
        var list = JSON.parse(body);
        for (var a in list) {
            if (!list.hasOwnProperty(a)) continue;
            if (debugAdapter && a !== debugAdapter) continue;

            //var path = dest + lang + '/30_adapters/' + name;
            //if (!fs.existsSync(path)) fs.mkdirSync(path);

            //if (fs.existsSync(src + lang + '/30_adapters/' + name + '/' + a + '.md')) return;

            /*var readme = list[a].readme;
             if (!readme) {
             readme = list[a].meta.replace('io-package.json', 'README.md');
             }

             if (readme && readme.match(/README\.md$/) && lang !== 'en') {
             readme = readme.replace('README.md', 'README_' + lang + '.md');
             }*/
            tasks.push({
                link: list[a].meta,
                name: a
            });
            /*getReadme(readme, path + '/' + a + '.md', a, lang, function () {

             });*/
        }

        processTasks(tasks, list, function () {
            done();
        });
    });
});

gulp.task('summary', ['adapters'], function (done) {
    function getFileTitle(file) {
        var text = fs.readFileSync(file);
        var fileName = path.basename(file, '.md');

        var lines = text.toString().split('\n');
        var title = fileName.replace(/_/g, ' ').replace(/^\d+/, '').trim();
        lines.forEach(function (line) {
            if (line.trim().match(/^#\s/)) {
                title = line.substring(2).replace(/\r/, '').trim();
                return false;
            }
        });
        return title;
    }

    function collectStructure(dir, level) {
        var _tree = null;
        level = level || 0;

        var files = fs.readdirSync(dir);
        for (var f = 0; f < files.length; f++) {
            var stat = fs.statSync(dir + files[f]);
            //console.log('Check ' + dir + files[f]);
            if (files[f] === 'SUMMARY.md' || files[f][0] === '_') continue;
            if (stat.isDirectory()) {
                var child;
                if (fs.existsSync(dir + files[f] + '/README.md')) {
                    child = {name: files[f], title: getFileTitle(dir + files[f] + '/README.md'), link: dir + files[f] + '/README.md', children: null};
                } else {
                    child = {name: files[f], title: files[f].replace(/_/g, ' ').replace(/^\d+/, '').trim(), children: null};
                }
                _tree = _tree || [];
                _tree.push(child);
                //console.log('Add Folder ' + child.title + ' - ' + child.link);
                child.children = collectStructure(dir + files[f] + '/', level + 1);
                if (!child.children || !child.children.length) {
                    child.children = null;
                    if (!child.name.match(/\.md$/)) {
                        _tree.splice(_tree.length - 1, 1);
                    }
                }
            } else if (files[f].match(/\.md$/) && (level === 0 || files[f] !== 'README.md')) {
                _tree = _tree || [];
                var item = {name: files[f], title: getFileTitle(dir + files[f]), link: dir + files[f]};
                _tree.push(item);
                //console.log('Add ' + item.title + ' - ' + item.link);
            }
        }
        if (_tree) {
            _tree.sort(function (a, b) {
                var aL = a.name;
                var bL = b.name;
                if (aL === 'README.md') return -1;
                if (bL === 'README.md') return 1;
                if (aL === '100_footer') return 1;
                if (bL === '100_footer') return -1;
                var aM = aL.match(/^(\d+)[_\s]/);
                if (aM) aL = parseInt(aM[1], 10);

                var bM = bL.match(/^(\d+)[_\s]/);
                if (bM) bL = parseInt(bM[1], 10);

                if (aL.name > bL.name) return 1;
                if (aL.name < bL.name) return -1;
                return 0;
            });
        }
        return _tree;
    }

    function buildTree(tree, level) {
        var text = '';
        level = level || 0;
        tree.forEach(function (item) {
            if (!item.title) return;
            if (item.link) {
                text += new Array(level + 1).join('\t') + '* [' + item.title + '](' + item.link.substring(dest.length + 3) + ')\n';
            } else {
                text += new Array(level + 1).join('\t') + '* ' + item.title + '\n';
            }
            if (item.children) {
                text += buildTree(item.children, level + 1);
            }
        });

        return text;
    }

	languages.forEach(function (lang) {
		var tree = collectStructure(dest + lang + '/');
		//console.log(JSON.stringify(tree, null, 2));
		var summary = buildTree(tree);
		fs.writeFileSync(dest + lang + '/SUMMARY.md', summary);
    });
	done();
});

// generate GitBook
gulp.task('build-doc', ['summary'], function (done) {
    gulpGitbook('./_dist/', function () {
        done();
    });
});

gulp.task('post-build', ['build-doc'], function (done) {
    if (book.pluginsConfig && book.pluginsConfig.favicon && fs.existsSync(__dirname + '/' + src + book.pluginsConfig.favicon)) {
        var gitbookFaviconPath = path.join(dest, '_book', 'gitbook', 'images', 'favicon.ico');
        fs.unlinkSync(gitbookFaviconPath);
        fs.createReadStream(__dirname + '/' + src + book.pluginsConfig.favicon).pipe(fs.createWriteStream(gitbookFaviconPath));
        // copy apply icon
        gitbookFaviconPath = path.join(dest, '_book', 'gitbook', 'images', 'apple-touch-icon-precomposed-152.png');
        fs.createReadStream(__dirname + '/' + src + '/img/apple-touch-icon-precomposed-152.png').pipe(fs.createWriteStream(gitbookFaviconPath));
    }
    done();
});

// Start web server
gulp.task('serve', gulpServe('_dist/_book'));

gulp.task('watch', ['build'], function () {
    return gulp.watch([src + '*/*.*', src + '*.*']);
});

gulp.task('build', ['clean', 'prepare-dist', 'adapters', 'summary', 'build-doc', 'post-build']);

gulp.task('default', ['build']);