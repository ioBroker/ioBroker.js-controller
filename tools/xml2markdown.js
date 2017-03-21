var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;
var toMarkdown = require('to-markdown');
var fs = require('fs');
var request = require('request');
var http;
var terms;
var rels;
var trans = [];


var options = {
    filter: 'code',
    replacement: function(content) {
        return '```' + content + '```';
    }
};

function wpString2Json(text) {
    // a:3:{s:2:\"de\";i:5634;s:2:\"en\";i:5639;s:2:\"ru\";i:5637;} => {de: 5634, en: 5639, ru: 5637}
    var result = {};
    if (!text || text[0] !== 'a' && text[1] !== ':') {
        console.error('Invalid string: ' + text);
    } else {
        var parts = text.substring(5, text.length - 1).split(';');
        for (var i = 0; i < parts.length; i++) {
            if (!parts[i]) break;
            if (parts[i][0] === 's') {
                parts[i] = parts[i].substring(6, parts[i].length - 2);
            } else {
                parts[i] = parts[i].substring(2);
            }
        }
        for (var j = 0; j < parts.length; j += 2) {
            if (parts[j + 1] !== undefined) result[parts[j]] = parts[j + 1];
        }
    }
    return result;
}

function readTerms() {
    var data = fs.readFileSync(__dirname + '/wp_terms.csv').toString();
    var tax = fs.readFileSync(__dirname + '/wp_term_taxonomy.csv').toString();
    var lines1 = data.split(/\n/g);
    var lines2 = tax.split(/\n/g);
    var result = {};
    for (var i = 0; i < lines1.length; i++) {
        if (!lines1[i]) continue;
        var parts1 = lines1[i].split(',');
        var parts2 = lines2[i].split(',');
        if (!parts2[2]) {
            console.log('a');
        }
        var id = parts1[0].substring(1, parts1[0].length - 1);
        result[id] = {
            taxonomy: parts2[2].substring(1, parts2[2].length - 1),
            description:  parts2[3].substring(1, parts2[3].length - 1),
            parent:  parts2[4].substring(1, parts2[4].length - 1),
            count:  parts2[5].substring(1, parts2[5].length - 1),
            name: parts1[1].substring(1, parts1[1].length - 1),
            slug: parts1[2].substring(1, parts1[2].length - 1)
        };
        if (result[id].taxonomy === 'post_translations') {
            trans.push(wpString2Json(result[id].description));
        }
    }
    return result;
}

function readRelations() {
    var data = fs.readFileSync(__dirname + '/wp_term_relationships.csv').toString();
    var lines = data.split(/\n/g);
    var result = {};
    for (var i = 0; i < lines.length; i++) {
        if (!lines[i]) continue;
        var parts = lines[i].split(',');
        var id = parts[0].substring(1, parts[0].length - 1);
        result[id] = result[id] || [];
        result[id].push(parts[1].substring(1, parts[1].length - 1));
    }
    return result;
}


/**
 * Tries to read HTML page.
 *
 * @alias httpGet
 * @memberof tools
 * @param {string} link http link, like http://192.168.1.2:80/abc/de.xml
 * @param {number} timeout timeout in ms (default 500)
 * @param {function} callback return result
 *        <pre><code>function (error, resultAsString, link) {}</code></pre>
 */
function httpGet(link, timeout, callback) {
    http = http || require('http');

    if (typeof timeout === 'function') {
        callback = timeout;
        timeout = 500;
    }
    timeout = parseInt(timeout, 10) || 500;

    var req = http.get(link, function (res) {
        var statusCode = res.statusCode;

        if (statusCode !== 200) {
            // consume response data to free up memory
            res.resume();
            callback(statusCode, null, link);
        }

        res.setEncoding('utf8');
        var rawData = '';
        res.on('data', function (chunk) {
            rawData += chunk;
        });
        res.on('end', function () {
            callback && callback(null, rawData ? rawData : null, link);
        });
    }).on('error', function (e) {
        callback && callback(e.message, null, link);
    });

    req.setTimeout(timeout, function () {
        this.abort();
        callback && callback('timeout', null, link);
        callback = null;
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

function removeFork(text) {
    var original = 'array';
    if (typeof text !== 'object') {
        text = text.replace(/\r\n/g, '\n');
        text = text.split('\n');
        original = 'string';
    }
    for (var i = text.length - 1; i >= 0; i--) {
        if (text[i].match(/Fork me on GitHub/)) text.splice(i, 1);

        /*if (text[i].indexOf('<span') !== -1) {
            var m = text[i].match(/<span[^>]*>(-*)<\/span>/);
            if (m && m[1]) {
                text[i] = text[i].replace(/<span[^>]*>(-*)<\/span>/, m[1]);
            }
        }*/
    }
    return original === 'string' ? text.join('\n') : text;
}

var images = [];
function replaceImg(text, adapter) {
    var original = 'array';
    if (typeof text !== 'object') {
        text = text.replace(/\r\n/g, '\n');
        text = text.split('\n');
        original = 'string';
    }
    for (var i = 0; i < text.length; i++) {
        //[![flot_konfig](http://www.iobroker.net/aaa.jpg)](http://www.iobroker.net/aaa.jpg)
        var m = text[i].match(/\[\!\[.*\]\(([^\s]+)\)/);

        if (m && m[1]) {
            if (m[1].indexOf('iobroker.net')) {
                var name = m[1].split('/').pop();
                name = name.replace(/\?/, '_').replace(/=/, '_').replace(/&/, '_');
                text[i] = text[i].replace(m[1], 'img/' + name).replace(m[1], 'img/' + name);
                var link = m[1];
                if (m[1].indexOf('http://') === -1) link = 'http://iobroker.net' + link;

                images.push({
                    link: link,
                    path: adapter,
                    name: name
                });
                //console.log('Found image: ' + name);
            } else {
                console.log('Foreign image: ' + m[1]);
            }
        }
    }

    return original === 'string' ? text.join('\n') : text;
}

function removeInfo(text) {
    var original = 'array';
    if (typeof text !== 'object') {
        text = text.replace(/\r\n/g, '\n');
        text = text.split('\n');
        original = 'string';
    }
    var start = null;
    var isInfoDetected = false;
    var count = 0;
    for (var i = 0; i < text.length; i++) {
        text[i] = text[i].trim();
        if (text[i].match(/^\<table/)) {
            start = i;
        } else if (start !== null && text[i] === '</table>') {
            if (isInfoDetected) {
                text.splice(start, count + 2);
                break;
            }
        } else if (start !== null) {
            count++;
            if (text[i].indexOf('Steckbrief') !== -1) isInfoDetected = true;
            if (text[i].indexOf('Current version') !== -1) isInfoDetected = true;
            if (text[i].indexOf('Actual version') !== -1) isInfoDetected = true;
            if (text[i].indexOf('actual version') !== -1) isInfoDetected = true;
            if (text[i].indexOf('Актуальная версия') !== -1) isInfoDetected = true;
            if (text[i].indexOf('Информация') !== -1) isInfoDetected = true;
        }
    }

    return original === 'string' ? text.join('\n') : text;
}

function getImages(imgs, callback) {
    if (!imgs || !imgs.length) {
        callback && callback();
    } else {
        var img = images.shift();
        if (fs.existsSync(img.link, img.path + 'output/img/' + img.name)) {
            setTimeout(getImages, 0, imgs, callback);
        } else {
            mkpathSync(__dirname + '/', img.path + '_' + img.name);
            download(img.link, img.path + '_' + img.name, function () {
                setTimeout(getImages, 0, imgs, callback);
            });
        }
    }
}

//var text = toMarkdown('<h1>Hello world!</h1>', options);
var xml = fs.readFileSync('wp_posts.xml');
var unknown = 0;

if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
}

if (!fs.existsSync('output/img')) {
    fs.mkdirSync('output/img');
}

function getPath(id, fileName, parts) {
    parts = parts || [];
    if (rels[id]) {
        for (var i = 0; i < rels[id].length; i++) {
            if (terms[rels[id][i]].slug === 'de' || terms[rels[id][i]].slug === 'ru' || terms[rels[id][i]].slug === 'en') {
                if (parts.indexOf(terms[rels[id][i]].slug) === -1) parts.push(terms[rels[id][i]].slug);
            }
        }
    }
    var name = trans.find(function (e) {
        if (e.en === id) return true;
    });
    if (!name) {
        name = trans.find(function (e) {
            if (e.de === id) return true;
        });
    }
    if (!name) {
        name = trans.find(function (e) {
            if (e.ru === id) return true;
        });
    }
    if (name) {
        parts.push(names[name.en || name.de || name.ru] || fileName);
    } else {
        parts.push(fileName);
    }

    return parts;
}

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

var names = {};
parseString(xml, function (err, result) {
    var posts = result.pma_xml_export.database[0].table;
    for (var p = 0; p < posts.length; p++) {
        var idd = posts[p].column.find(function (e) { return e.$.name === 'ID'; })._;
        var title = posts[p].column.find(function (e) { return e.$.name === 'post_name'; });
        if (!title || !title._ || title._ === 'undefined') {
            title = posts[p].column.find(function (e) { return e.$.name === 'post_title'; });
        }
        title = title ? decodeURIComponent(title._) : 'unknown_' + unknown++;
        title = title.replace(/"/g, '');
        names[idd] = title.replace('adapter_', '')
            .replace('_deutsch', '')
            .replace('_english', '')
            .replace('-english', '')
            .replace('_russisch', '')
            .replace(/-en$/)
            .replace(' (en)')
            .replace(' (de)')
            .trim();
    }
    terms = readTerms();
    rels = readRelations();

    for (var d = 0; d < posts.length; d++) {
        var post = posts[d];
        var id = post.column.find(function (e) { return e.$.name === 'ID'; })._;
        var path = getPath(id, names[id]);
        var text = post.column.find(function (e) { return e.$.name === 'post_content'; });
        text = text._;
        title = names[id];
        if (!title || !text) {
            console.error('No title found for ' + title);
            continue;
        } else {
            //console.log('Convert ' + title);
        }

        var html = toMarkdown(text, options);

        // convert [toc]
        html = html.replace(/\[toc\]/g, '');

        html = html.replace(/\[no_toc\]/g, '');
        html = html.replace(/\[subpages\]/g, '');
        html = html.replace(/\[pagelist_ext\]/g, '');
        html = html.replace(/\[pagelist_ext sort_column="post_title"[^\]]*\]/g, '');
        html = html.replace(/\r\n/g, '\n');
        html = html.trim();
        var lines = html.split('\n');

        // convert img
        lines = replaceImg(lines, 'output/' + path.join('/'));
        lines = removeInfo(lines);
        // remove [![Fork me on GitHub]
        lines = removeFork(lines);

        html = lines.join('\n');

        // detect language
        // detect position
        if (html) {
            var file = 'output/' + path.join('/');
            mkpathSync(__dirname + '/', file);
            //console.log(title + ' => ' + file + '.md');
            //fs.writeFileSync(file + '.md', html);
        } else {
            console.warn('"' + title  + '" is empty');
        }
    }
    getImages(images, function () {
        process.exit();
    });
});