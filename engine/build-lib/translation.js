const utils = require('./utils');
const consts = require('./consts');
const request = require('request');
let lastRequest = null;

/**
 * Choose the right tranalation API
 * @param {string} text The text to translate
 * @param {string} targetLang The target languate
 * @param {string} yandex api key
 * @returns {Promise<string>}
 */
async function _translateText(text, targetLang, yandex, sourceLang) {
    if (yandex) {
        return await translateYandex(text, targetLang, yandex, sourceLang);
    } else {
        return await translateGoogle(text, targetLang, sourceLang);
    }
}

/**
 * Translates text with Yandex API
 * @param {string} text The text to translate
 * @param {string} targetLang The target languate
 * @param {string} yandex api key
 * @returns {Promise<string>}
 */
async function translateYandex(text, targetLang, yandex) {
    if (targetLang === 'zh-cn') {
        targetLang = 'zh';
    }
    try {
        const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandex}&text=${encodeURIComponent(text)}&lang=en-${targetLang}`;
        return new Promise((resolve, reject) => {
            request(url, (err, state, body) => {
                if (err || !state || state.statusCode !== 200) {
                    reject(err || state.statusCode);
                } else {
                    try {
                        const json = JSON.parse(body);
                        if (json && json.text && json.text[0]) {
                            resolve(json.text[0]);
                        } else {
                            reject('Invalid answer: ' + body)
                        }
                    } catch (e) {
                        reject('Cannot parse answer: ' + body)
                    }
                }
            });
        });
    } catch (e) {
        throw new Error(`Could not translate to '${targetLang}': ${e}`);
    }
}


function translateGoogleSync(text, targetLang, sourceLang, cb) {
    /*if (lastRequest && Date.now() - lastRequest < 1000) {
        return setTimeout(() => translateGoogleSync(text, targetLang, sourceLang, cb), 1000 - Date.now() + lastRequest);
    }*/
    return cb(null, 'TOO_MANY: ' + text);

    const url = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang || 'en'}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}&ie=UTF-8&oe=UTF-8`;
    console.log(`Translate ${sourceLang} => ${targetLang} : ${text}`);
    request(url, (err, state, body) => {
        if (err || !state || state.statusCode !== 200) {
            if (state.statusCode === 429) {
                cb(null, 'TOO_MANY: ' + text);
            } else {
                cb(err || state.statusCode);
            }
        } else {
            try {
                const json = JSON.parse(body);
                if (json instanceof Array) {
                    // we got a valid response
                    cb(null, json[0][0][0]);
                } else {
                    cb('Invalid answer: ' + body);
                }
            } catch (e) {
                cb('Cannot parse answer: ' + body);
            }
        }
    });
}
/**
 * Translates text with Google API
 * @param {string} text The text to translate
 * @param {string} targetLang The target language
 * @param {string} sourceLang The source language (optional)
 * @returns {Promise<string>}
 */
async function translateGoogle(text, targetLang, sourceLang) {
    try {
        return new Promise((resolve, reject) => {
            translateGoogleSync(text, targetLang, sourceLang, (err, text) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(text);
                }
            });
        });
    } catch (e) {
        throw new Error(`Could not translate to '${targetLang}': ${e}`);
    }
}

async function translateFile(fileName, data, originalLanguage, targetLanguage, root) {
    const name = fileName.replace('/' + originalLanguage + '/', '/' + targetLanguage + '/');
    let {header, body} = utils.extractHeader(data);
    header.translatedFrom = originalLanguage;
    header.editLink = consts.GITHUB_EDIT_ROOT + 'docs/' + fileName.replace(root, '');
    console.log(`WARNING: File ${fileName.replace(root, '/')} was translated from ${originalLanguage} to ${targetLanguage} automatically`);
    return Promise.resolve(utils.addHeader(body, header));
}

function partsTake(text) {
    const lines = text.trim().replace(/\r/g, '').split('\n');

    const parts = [];
    // remove leading empty lines
    while(lines.length && !lines[0].trim()) lines.shift();

    // remove trailing empty lines
    while(lines.length && !lines[lines.length - 1].trim()) lines.pop();

    let source = false;
    lines.forEach((line, i) => {
        if (source) {
            if (line.endsWith(' -->')) {
                source = false;
                line = line.substring(0, line.length - 3);
            }
            parts[parts.length - 1].source.push(line);
        } else
        if (line.trim().startsWith('<!-- SOURCE: ')) {
            if (!parts[parts.length - 1]) {
                parts.push({type: 'p', lines: []});
            }
            parts[parts.length - 1].source = parts[parts.length - 1].source || [];
            line = line.substring('<!-- SOURCE: '.length);
            parts[parts.length - 1].source.push(line);
        } else
        // If chapter
        if (line.trim().startsWith('#')) {
            parts.push({type: 'h', lines: [line]});
            parts.push({type: 'p', lines: []});
        } else if (!line.trim()) {
            if (!parts[parts.length - 1]) {
                parts.push({type: 'p', lines: []});
            }
            parts[parts.length - 1].lines.push('');
            parts.push({type: 'p', lines: []});
        } else {
            if (!parts[parts.length - 1]) {
                parts.push({type: 'p', lines: []});
            }
            parts[parts.length - 1].lines.push(line);
        }
    });
    return parts;
}

function partsSave(parts) {
    const lines = [];
    parts.forEach(part => {
        if (part.original) {
            // if last line is empty, put <!----> just before it
            if (part.text && part.text.match(/\n$/)) {
                const text = part.text.replace(/\n$/, '');
                lines.push(text);
                lines.push('<!-- SOURCE: ' + (part.original || part.lines.join('\n')) + ' -->');
                lines.push('');
            } else {
                lines.push(part.text || part.lines.join('\n'));
                lines.push('<!-- SOURCE: ' + (part.original || part.lines.join('\n')) + ' -->');
            }
        } else {
            lines.push(part.text || part.lines.join('\n'));
        }
    });
    return lines.join('\n');
}

function partsTranslate(fromLang, parts, toLang, cb) {
    const untranslated = parts.find(item => !item.translated && item.lines.join().replace(/[\n\s]/).trim());
    if (untranslated) {
        untranslated.original = untranslated.lines.join('\n');
        return translateText(fromLang, untranslated.original, toLang)
            .then(text => {
                untranslated.translated = true;
                untranslated.text = text;
                setTimeout(() => partsTranslate(fromLang, parts, toLang, cb), 0);
            }).catch(e => {
                console.error('Cannot translate: ' + e);
                untranslated.translated = true;
                untranslated.text = untranslated.original;
            })
    } else {
        cb && cb(parts);
    }
}

function translateMD(fromLang, text, toLang) {
    return new Promise(resolve => {
        const parts = partsTake(text);
        console.log(`____________TRANSLATE ${fromLang} => ${toLang}_______________`);
        partsTranslate(fromLang, parts, toLang, parts => {
            resolve(partsSave(parts));
        });
    });
}

function translateText(fromLang, text, toLang) {
    return _translateText(text, toLang, false, fromLang);
}

module.exports = {
    translateFile,
    translateMD,
    translateText
};
