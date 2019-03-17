const utils = require('./utils');
const consts = require('./consts');
const path = require('path');

async function translateFile(fileName, data, originalLanguage, targetLanguage, root) {
    const name = fileName.replace('/' + originalLanguage + '/', '/' + targetLanguage + '/');
    let {header, body} = utils.extractHeader(data);
    header.translatedFrom = originalLanguage;
    header.editLink = consts.GITHUB_ROOT + fileName.replace(root, '');
    console.log(`WARNING: File ${fileName.replace(root, '/')} was translated from ${originalLanguage} to ${targetLanguage} automatically`);
    return Promise.resolve(utils.addHeader(body, header));
}

module.exports = {
    translateFile
};
