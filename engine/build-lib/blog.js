'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const consts = require('./consts');
const translation = require('./translation');

// build list of blogs
function build(lang, content) {
    return new Promise(resolve => {
        if (!fs.existsSync(consts.SRC_BLOG_DIR + lang)) {
            return resolve(content);
        }
        fs.readdirSync(consts.SRC_BLOG_DIR + lang).forEach(item => {
            if (item === 'README.md') {
                return;
            }
            if (item.match(/^\d\d\d\d_\d\d/)) {
                const name = item.replace(/\.md/i, '');
                const d = name.match(/^(\d\d\d\d)_(\d\d)_(\d\d)(_\d)?/);
                let text = fs.readFileSync(path.join(consts.SRC_BLOG_DIR + lang, item)).toString('utf-8');
                let {body, header} = utils.extractHeader(text);
                body = body.replace(/\r/g, '');
                header.title = header.title || utils.getTitle(body) || '';
                header.editLink = consts.GITHUB_EDIT_ROOT + 'blog/' + lang + '/' + item;

                const lines = body.trim().split('\n');

                if (text.match(/!\[/)) {
                    const m = lines[0].match(/!\[([^\]]*)]\(([^)]*)\)/);
                    if (m && m.length === 3) {
                        lines.shift();
                        let link = m[2];
                        if (!link.toLowerCase().match(/^https?:\/\//)) {
                            if (link.startsWith('../')) {
                                link = lang + '/blog/' + link.substring(3);
                            } else {
                                link = lang + '/blog/' + link;
                            }
                        }
                        header.logo = link;
                    }
                }

                // remove leading empty lines
                while(lines.length && !lines[0]) lines.shift();

                // remove title from text
                if (header.title) {
                    if (lines[0].startsWith('# ')) {
                        lines.shift();

                        // remove leading empty lines
                        while(lines.length && !lines[0]) lines.shift();
                    }
                }

                // take first paragraph as description
                const desc = [];
                let i = 0;
                while(lines[i]) {
                    if (lines[i].startsWith('<!-- SOURCE: ') || lines[i].startsWith('<!-- ID: ')) {
                        break;
                    }
                    desc.push(lines[i]);
                    i++;
                }

                if (d) {
                    const date = d[1] + '.' + d[2] + '.' + d[3] + (d[4] ? '_' + d[4] : '');
                    content.pages[name] = content.pages[name] || {
                        date,
                        title: {},
                        logo: header.logo || '',
                        type: header.type || 'news',
                        originalName: item,
                        desc: {}
                    };
                    content.pages[name].title[lang] = header.title || date;
                    content.pages[name].desc[lang] = desc.join('\\n');
                    utils.writeSafe(consts.FRONT_END_DIR + lang + '/blog/' + name + '.md', utils.addHeader(lines.join('\n'), header));
                } else {
                    console.error('Invalid name format: ' + name + '. Expected YEAR_MM_DD.md or YEAR_MM_DD_N.md');
                }
            }
        });

        // copy blog/images if exists
        if (fs.existsSync(consts.SRC_BLOG_DIR + 'images/')) {
            utils.createDir(consts.FRONT_END_DIR + lang + '/blog/images/');
            utils.copyDir(consts.SRC_BLOG_DIR + 'images/', consts.FRONT_END_DIR + lang  + '/blog/images/');
        }

        // copy images
        if (fs.existsSync(consts.SRC_BLOG_DIR + lang + '/images/')) {
            utils.createDir(consts.FRONT_END_DIR + lang + '/blog/images/');
            utils.copyDir(consts.SRC_BLOG_DIR + lang + '/images/', consts.FRONT_END_DIR + lang + '/blog/images/');
        }

        resolve(content);
    });
}

function sync2Languages(fromLang, toLang, content, cb) {
    const file = Object.keys(content.pages).find(file => {
        const fromFile = consts.SRC_BLOG_DIR + fromLang + '/' + content.pages[file].originalName;
        const toFile = consts.SRC_BLOG_DIR + toLang + '/' + content.pages[file].originalName;

        //const fromFilePublic = consts.FRONT_END_DIR + fromLang + '/blog/' + file + '.md';
        //const toFilePublic = consts.FRONT_END_DIR + toLang + '/blog/' + file + '.md';


        // read from
        if (fs.existsSync(fromFile)) {
            let {header} = utils.extractHeader(fs.readFileSync(fromFile).toString('utf-8'));
            if (!header.translatedFrom) {
                let doTranslate = !fs.existsSync(toFile);
                if (!doTranslate) {
                    let {header} = utils.extractHeader(fs.readFileSync(toFile).toString('utf-8'));
                    let {body} = utils.extractHeader(fs.readFileSync(fromFile).toString('utf-8'));
                    if (header.translatedFrom === fromLang) {
                        doTranslate = header.hash !== utils.getFileHash(body);
                    }
                }
                return doTranslate;
            }
        }
    });

    if (file) {
        const fromFile = consts.SRC_BLOG_DIR + fromLang + '/' + content.pages[file].originalName;
        const toFile = consts.SRC_BLOG_DIR + toLang + '/' + content.pages[file].originalName;

        const fromFilePublic = consts.FRONT_END_DIR + fromLang + '/blog/' + file + '.md';
        const toFilePublic = consts.FRONT_END_DIR + toLang + '/blog/' + file + '.md';

        // read from
        let {body, header} = utils.extractHeader(fs.readFileSync(fromFile).toString('utf-8'));
        let originalBody = body;
        const originalHeader = header;
        let translatedBody;
        if (fs.existsSync(toFile)) {
            let {body} = utils.extractHeader(fs.readFileSync(toFile).toString('utf-8'));
            translatedBody = body;
        }

        translation.translateMD(fromLang, originalBody, toLang, translatedBody)
            .then(result => {
                body = utils.trim(result.result, '\n');
                originalBody = utils.trim(result.source, '\n');
                const text = utils.addHeader(originalBody, originalHeader);
                utils.writeSafe(fromFile, utils.addHeader(originalBody, originalHeader));
                let rr = utils.extractHeader(fs.readFileSync(fromFile).toString('utf-8'));
                originalBody = rr.body;
                return translation.translateText(fromLang, originalHeader.title, toLang);
            }).then(title => {
                originalHeader.title = title;
                content.pages[file].title[toLang] = title;
                originalHeader.translatedFrom = fromLang;
                originalHeader.hash = utils.getFileHash(originalBody);
                const localHeader = JSON.parse(JSON.stringify(originalHeader));
                delete localHeader.editLink;
                content.pages[file].title[toLang] = title;

                const lines = body.trim().split('\n');

                // remove leading empty lines
                while(lines.length && !lines[0]) lines.shift();

                // take first paragraph as description
                const desc = [];
                let i = 0;
                while(lines[i]) {
                    if (lines[i].startsWith('<!-- SOURCE: ')) {
                        break;
                    }
                    desc.push(lines[i]);
                    i++;
                }

                content.pages[file].desc[toLang] = desc.join('\\n');

                utils.writeSafe(toFile, utils.addHeader(body, localHeader));
                utils.writeSafe(toFilePublic, utils.addHeader(body, originalHeader));
                setTimeout(() => sync2Languages(fromLang, toLang, content, cb), 200);
            });
    } else {
        cb && cb(content);
    }
}

function processTasks(tasks, content, cb) {
    if (!tasks || !tasks.length) {
        cb && cb();
    } else {
        const task = tasks.shift();
        sync2Languages(task.fromLang, task.toLang, content, () =>
            setTimeout(() => processTasks(tasks, content, cb), 0));
    }
}

function buildAll() {
    const content = {pages: {}};
    return new Promise(resolve => {
        Promise.all(consts.LANGUAGES.map(lang => build(lang, content)))
            .then(contents => {
                console.log(JSON.stringify(contents[0]));

                // sync all directories
                const tasks = [];
                consts.LANGUAGES.map(lang => {
                    consts.LANGUAGES
                        .filter(lang2 => lang2 !== lang)
                        .map(lang2 => tasks.push({fromLang: lang, toLang: lang2}));
                });
                processTasks(tasks, content, () => {
                    // sort files
                    const names = Object.keys(content.pages);
                    names.sort((a, b) => {
                        if (b > a) return 1;
                        if (b < a) return -1;
                        return 0;
                    });
                    const old = content.pages;
                    content.pages = {};
                    names.forEach(name => content.pages[name] = old[name]);

                    fs.writeFileSync(consts.FRONT_END_DIR + 'blog.json', JSON.stringify(contents[0], null, 2));

                    buildRSS().then(() => resolve(content));
                });
            });
    });
}

function buildRSS() {
    return new Promise(resolve => {
        const blog = JSON.parse(fs.readFileSync(consts.FRONT_END_DIR + 'blog.json').toString('utf-8'));

        consts.LANGUAGES.forEach(lang => {
            let rss =
                '<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">\n';
            rss += `    <channel>\n`;
            rss += `        <title><![CDATA[ ioBroker Blog ]]></title>\n`;
            rss += `        <description><![CDATA[${consts.BLOG_TITLE[lang]}]]></description>\n`;
            rss += `        <link>https://www.iobroker.net/#${lang}/blog</link>\n`;
            rss += `        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
            rss += `        <ttl>1440</ttl>\n`;

            Object.keys(blog.pages).forEach(date => {
                const item = blog.pages[date];
                const dateObj = new Date(date.replace(/_/g, '-') + 'T06:00:00.000Z');
                rss += `        <item>\n`;
                rss += `            <title><![CDATA[${item.title[lang]}]]></title>\n`;
                rss += `            <description><![CDATA[\n`;
                rss += `                <p>${item.desc[lang].replace(/\n/g, '<br />').replace(/>/g, '=&gt;').replace(/<>/g, '=&lt;')}</p>\n`;
                rss += `            ]]></description>\n`;
                rss += `            <link>https://www.iobroker.net/#${lang}/blog/` + date + `</link>\n`;
                rss += `            <guid isPermaLink="true">https://www.iobroker.net/#${lang}/blog/` + date + `</guid>\n`;
                rss += `            <dc:creator><![CDATA[ ioBroker ]]></dc:creator>\n`;
                rss += `            <pubDate>${dateObj.toUTCString()}</pubDate>\n`;
                rss += `        </item>\n`
            });
            rss += `    </channel>\n`;
            rss += `</rss>\n`;

            fs.writeFileSync(consts.FRONT_END_DIR + `blog_${lang}.xml`, rss);
        });

        resolve();
    });
}

if (!module.parent) {
    buildAll().then(() => console.log('Done'));
} else {
    module.exports = {
        build: buildAll,
        buildRSS: buildRSS,
    };
}
