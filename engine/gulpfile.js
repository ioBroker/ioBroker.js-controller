/*!
 * Copyright 2019, bluefox <dogafox@gmail.com>
 * ioBroker gulpfile
 * Date: 2019-03-17
 * Build documentation site
 */
'use strict';

const gulp = require('gulp');
const documentation = require('./build-lib/documentaion');
const adapters = require('./build-lib/adapters');
const blog = require('./build-lib/blog');
const consts = require('./build-lib/consts');
const utils = require('./build-lib/utils');
const path = require('path');
const fs = require('fs');

const dir = __dirname + '/front-end/src/i18n/';
gulp.task('i18n=>flat', done => {
    const files = fs.readdirSync(dir).filter(name => name.match(/\.json$/));
    const index = {};
    const langs = [];
    files.forEach(file => {
        const lang = file.replace(/\.json$/, '');
        langs.push(lang);
        const text = require(dir + file);

        for (const id in text) {
            if (text.hasOwnProperty(id)) {
                index[id] = index[id] || {};
                index[id][lang] = text[id] === undefined ? id : text[id];
            }
        }
    });

    const keys = Object.keys(index);
    keys.sort();

    if (!fs.existsSync(dir + '/flat/')) {
        fs.mkdirSync(dir + '/flat/');
    }

    langs.forEach(lang => {
        const words = [];
        keys.forEach(key => {
            words.push(index[key][lang]);
        });
        fs.writeFileSync(dir + '/flat/' + lang + '.txt', words.join('\n'));
    });
    fs.writeFileSync(dir + '/flat/index.txt', keys.join('\n'));
    done();
});

gulp.task('flat=>i18n', done => {
    if (!fs.existsSync(dir + '/flat/')) {
        console.error(dir + '/flat/ directory not found');
        return done();
    }
    const keys = fs.readFileSync(dir + '/flat/index.txt').toString().split(/[\r\n]/);
    while (!keys[keys.length - 1]) keys.splice(keys.length - 1, 1);

    const files = fs.readdirSync(dir + '/flat/').filter(name => name.match(/\.txt$/) && name !== 'index.txt');
    const index = {};
    const langs = [];
    files.forEach(file => {
        const lang = file.replace(/\.txt$/, '');
        langs.push(lang);
        const lines = fs.readFileSync(dir + '/flat/' + file).toString().split(/[\r\n]/);
        lines.forEach((word, i) => {
            index[keys[i]] = index[keys[i]] || {};
            index[keys[i]][lang] = word;
        });
    });
    langs.forEach(lang => {
        const words = {};
        keys.forEach((key, line) => {
            if (!index[key]) {
                console.log('No word ' + key + ', ' + lang + ', line: ' + line);
            }
            words[key] = index[key][lang];
        });
        fs.writeFileSync(dir + '/' + lang + '.json', JSON.stringify(words, null, 2));
    });
    done();
});


gulp.task('translate', async function () {
    let yandex;
    const i = process.argv.indexOf('--yandex');
    if (i > -1) {
        yandex = process.argv[i + 1];
    }
    if (fs.existsSync('./front-end/src/i18n/en/en.json')) {
        let enTranslations = require('./front-end/src/i18n/en.json');
        for (let l in languages) {
            console.log('Translate Text: ' + l);
            let existing = {};
            if (fs.existsSync('./front-end/src/i18n/' + l + '.json')) {
                existing = require('./front-end/src/i18n/' + l + '.json');
            }
            for (let t in enTranslations) {
                if (enTranslations.hasOwnProperty(t) && !existing[t]) {
                    existing[t] = await translate(enTranslations[t], l, yandex);
                }
            }
            fs.writeFileSync('./front-end/src/i18n/' + l + '.json', JSON.stringify(existing, null, 4));
        }
    }
});

gulp.task('translateAndUpdateWordsJS', gulp.series('translate'));


gulp.task('clean', done => {
    consts.LANGUAGES.forEach(lang => utils.delDir(path.join(consts.FRONT_END_DIR, lang)));
    done();
});

// Build content.md file
gulp.task('documentation', () => {
    // build content
    return documentation.processContent(path.join(consts.SRC_DOC_DIR, 'content.md'));
});

// translate and copy blogs
gulp.task('blog', () => {
    return blog.build()
        .then(() => {
            console.log('Done');
        });
});

// download all adapters
gulp.task('downloadAdapters', () => {
    return adapters.buildAdapterContent()
        .then(content => {
            console.log(JSON.stringify(content));
        });
});

// copy all docs/LN/adapterref/* => engine/front-end/public/LN/adapterref/*
gulp.task('copyFiles', () => {
    return Promise.all([adapters.copyAllAdaptersToFrontEnd(), documentation.processFiles(consts.SRC_DOC_DIR)]);
});

// translate all documents: adapters and docu
gulp.task('syncDocs', done => {
    documentation.syncDocs(done);
});

gulp.task('default', gulp.series(
    'clean',            // clean dir
    'blog',             // translate and copy blogs
    'downloadAdapters', // download all adapters an create adapter.json
    'syncDocs',         // translate documents and adapters
    'documentation',    // create content for documentation
    'copyFiles'         // copy all adapters and docs to public
));


