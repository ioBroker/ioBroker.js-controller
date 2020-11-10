'use strict';

const config = require('../config');
const MiniSearch = require('minisearch');
const path = require('path');
const fs = require('fs');
const utils = require('../build-lib/utils');
//const querystring = require('querystring');
//const url = require('url');

let langs;
let titles = {};
function loadDocuments(lang, dir, root, docs) {
    if (dir.endsWith('/') || dir.endsWith('\\')) {
        dir = dir.substring(0, dir.length - 1);
    }

    docs = docs || [];
    root = root || dir.replace(/\\/g, '/');

    fs.readdirSync(dir)
        .forEach(file => {
            const name = path.join(dir, file);
            const stat = fs.statSync(name);
            if (stat.isDirectory()) {
                loadDocuments(lang, name, root, docs);
            } else if (file.match(/\.md$/)) {
                const text = fs.readFileSync(name).toString('utf-8');
                let {header, body} = utils.extractHeader(text);
                let result = utils.extractLicenseAndChangelog(body);

                // console.log('Indexed: ' + name);
                const id = name.replace(/\\/g, '/').replace(root + '/', '');
                const title = header.title || utils.getTitle(result.body);
                if (title.indexOf('object') !== -1) {
                    console.log(`Strange title of ${name}: ${JSON.stringify(title)}`);
                }
                titles[lang] = titles[lang] || {};
                titles[lang][id] = {title};
                docs.push({id, title, text: result.body});
            }
        });

    return docs;
}

// var u = [
//     {
//         "id": "/adapterref/iobroker.denon/README.md",
//         "terms": ["denon"],
//         "score": 26.63112720771678,
//         "match": {"denon": ["title", "text"]}
//     },
//     {
//         "id": "/adapterref/iobroker.discovery/README.md",
//         "terms": ["denon"],
//         "score": 9.211863689116457,
//         "match": {"denon": ["text"]}
//     },
//     {
//         "id": "/adapterref/iobroker.harmony/README.md",
//         "terms": ["denon"],
//         "score": 6.095566231905757,
//         "match": {"denon": ["text"]}
//     },
//     {
//         "id": "/dev/adapterpublish.md",
//         "terms": ["denon"],
//         "score": 3.9913573609001656,
//         "match": {"denon": ["text"]}
//     }
// ];

function init(app) {
    langs = {};

    config.LANGUAGES.forEach(lang => {
        const documents = loadDocuments(lang, path.join(__dirname, '..', config.public, lang));
        let miniSearch = new MiniSearch({
            fields: ['title', 'text'],
            searchOptions: {
                boost: { title: 2 },
                //fuzzy: 0.2
            }
        });
        miniSearch.addAll(documents);
        langs[lang] = miniSearch;
    });
    app.get('/search', (req, res) => {
        /*let parsedUrl = url.parse(req.url);
        let query = querystring.parse(parsedUrl.query);*/
        res.json(search(req.query.ln || 'de', req.query.q));
    });
}

// ToDo: add cache

function search(lang, text) {
    if (!langs[lang]) {
        return [{id: 0, text: 'language unknown'}];
    } else {
        const r = langs[lang].search(text).map(s =>
            s.title = Object.assign({}, s, titles[lang][s.id]));
        if (r.length > 12) {
            const l = r.length;
            r.splice(12, r.length - 1);
            r.push({id: '...', title: l - 12});
        }
        return r;
    }
}
/*
// A collection of documents for our examples
const documents = [
    { id: 1, title: 'Moby Dick', text: 'Call me Ishmael. Some years ago...' },
    { id: 2, title: 'Zen and the Art of Motorcycle Maintenance', text: 'I can see by my watch...' },
    { id: 3, title: 'Neuromancer', text: 'The sky above the port was...' },
    { id: 4, title: 'Zen and the Art of Archery', text: 'At first sight it must seem...' },
    // ...and more
]

let miniSearch = new MiniSearch({ fields: ['title', 'text'] })

// Index all documents
miniSearch.addAll(documents)

// Search with default options
let results = miniSearch.search('zen art motorcycle')*/
module.exports = {
    init,
    search,
};