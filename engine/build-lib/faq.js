'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const consts = require('./consts');

const IGNORE = [];

function replaceImages(body, fileFolder, mediaFolder) {
    // replace all images like "mediaDir/blabla.png" with "LN/adapterref/iobroker.adapterName/mediaDir/blabla.png"
    let images = body.match(/!\[[^\]]*]\([^)]*\)/g);
    if (images) {
        images.forEach(image => {
            const m = image.match(/!\[([^\]]*)]\(([^)]*)\)/);
            if (m && m.length === 3) {
                let alt = m[1];
                let link = m[2];
                if (!link.toLowerCase().match(/^https?:\/\//)) {
                    if (link[0] === '/') {
                        link = link.substring(1);
                    }
                    const newFileName = path.basename(fileFolder) + '_' + link.replace(/\\/g, '_').replace(/\//g, '_');
                    if (fs.existsSync(path.join(fileFolder, link))) {
                        fs.writeFileSync(path.join(mediaFolder, newFileName), fs.readFileSync(path.join(fileFolder, link)));
                    }
                    body = body.replace(image, `![${alt}](media/${newFileName})`);
                }
            }
        });

        // remove delete lines from array
        const lines = body.split('\n');
        for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i].indexOf('--delete--') !== -1) {
                lines.splice(i, 1);
            }
        }

        body = lines.join('\n');
    }

    // replace all images like "<img src="src/img/rooms/006-double-bed.svg" height="48" />" with "<img src="LN/adapterref/iobroker.adapterName/src/img/rooms/006-double-bed.svg" height="48" />"
    images = body.match(/<img [^>]+>/g);
    if (images) {
        images.forEach(image => {
            const m = image.match(/src="([^"]*)"/);
            if (m && m.length === 2) {
                let link = m[1];
                if (!link.toLowerCase().match(/^https?:\/\//)) {
                    if (link[0] === '/') {
                        link = link.substring(1);
                    }
                    const newFileName = path.basename(fileFolder) + '_' + link.replace(/\\/g, '_').replace(/\//g, '_');
                    if (fs.existsSync(path.join(fileFolder, link))) {
                        fs.writeFileSync(path.join(mediaFolder, newFileName), fs.readFileSync(path.join(fileFolder, link)));
                    }
                    const newImage = image.replace(link, 'media/' + newFileName);
                    body = body.replace(image, newImage);
                }
            }
        });
    }

    return body;
}

function processFolder(folder, lang) {
    const files = fs.readdirSync(folder).filter(name => !name.startsWith('_') && name !== 'README.md' && name.endsWith('.md')).sort();
    if (!fs.existsSync(path.join(folder, 'README.md'))) {
        console.warn('Folder ' + folder + ' skipped, because no README.md found');
        return;
    }
    const parts = [fs.readFileSync(path.join(folder, 'README.md')).toString('utf-8')];

    files.forEach(file => parts.push(fs.readFileSync(path.join(folder, file)).toString('utf-8')));

    let text = parts.join('\n\n');
    const media = path.join(consts.FRONT_END_DIR, lang, 'faq', 'media');

    !fs.existsSync(media) && utils.createDir(media);

    // replace all media files and copy it in one directory
    text = replaceImages(text, folder, media);

    fs.writeFileSync(path.join(consts.FRONT_END_DIR, lang, 'faq', path.basename(folder)) + '.md', text);
}

function processFiles(root, lang) {
    root = root.replace(/\\/g, '/');
    if (!lang) {
        return Promise.all(consts.LANGUAGES.map(lang =>
            processFiles(path.join(root, lang, 'faq').replace(/\\/g, '/'), lang, root)));
    } else {
        fs.readdirSync(root).map(name => {
            const folderName = path.join(root, name).replace(/\\/g, '/');
            const stat = fs.statSync(folderName);
            if (stat.isDirectory()) {
                if (IGNORE.indexOf(folderName.replace(root, '')) === -1) {
                    processFolder(folderName, lang);
                } else {
                    fs.writeFileSync(path.join(consts.FRONT_END_DIR, lang, 'faq', name) + '.md', fs.readFileSync(folderName));
                }
            }
        });
        return Promise.resolve();
    }
}

if (!module.parent) {
    processFiles(consts.SRC_DOC_DIR).then(() => console.log('done'));
} else {
    module.exports = {
        processFiles,
    };
}