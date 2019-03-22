const utils = require('./utils');
const consts = require('./consts');
const request = require('request');
const fs = require('fs');
let lastRequest = null;
const {Translate} = require('@google-cloud/translate');
// Your Google Cloud Platform project ID
const projectId = 'web-site-1377';
process.env.GOOGLE_APPLICATION_CREDENTIALS = __dirname + '/../google-keys.json';

// Instantiates a client
const translate = new Translate({projectId: projectId,});

const TRANSLATE_DELAY = 5000;

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
    if (fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
        translate
            .translate(text, {to: targetLang, from: sourceLang})
            .then(results => {
                cb(null, results[0]);
            })
            .catch(err => {
                cb(err);
            });
    } else {
        return cb(null, 'TR: ' + text);
        if (lastRequest && Date.now() - lastRequest < TRANSLATE_DELAY) {
            return setTimeout(() => translateGoogleSync(text, targetLang, sourceLang, cb), TRANSLATE_DELAY - Date.now() + lastRequest);
        }

        lastRequest = Date.now();

        const url = `http://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang || 'en'}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}&ie=UTF-8&oe=UTF-8`;
        console.log(`Translate ${sourceLang} => ${targetLang} : ${text}`);
        request(url, (err, state, body) => {
            if (err || !state || state.statusCode !== 200) {
                if (state.statusCode === 429) {
                    cb(null, 'TR: ' + text);
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

function partsTake(text, addIds) {
    const lines = text.trim().replace(/\r/g, '').split('\n');

    let parts = [];
    // remove leading empty lines
    while(lines.length && !lines[0].trim()) lines.shift();

    // remove trailing empty lines
    while(lines.length && !lines[lines.length - 1].trim()) lines.pop();

    let current = '';
    lines.forEach(line => {
        let last = parts.length - 1;

        if (current === 'code') {
            if (line.trim().endsWith('```')) {
                current = '';
            }
            parts[last].lines.push(line);
            return;
        }

        line = line.trim();
        if (line.trim().startsWith('```')) {
            parts.push({type: 'code', lines: []});
            last++;

            parts[last].lines = parts[last].lines || [];
            parts[last].lines.push(line);

            if (!line.substring(3).endsWith('```')) {
                current = 'code';
            } else {
                current = '';
            }
        } else
        if (line.startsWith('|') && line.endsWith('|')) {
            parts.push({type: 't', lines: [line]});
        } else
        if (line.startsWith('<!-- ID: ')) {
            parts[last].id = parseInt(line.substring('<!-- ID: '.length, line.length - 4));
            current = '';
        } else
        if (current === 'source') {
            if (line.endsWith(' -->')) {
                current = '';
                line = line.substring(0, line.length - 4);
            }
            parts[last].source.push(line);
        } else
        if (line.startsWith('<!-- SOURCE: ')) {
            if (!parts[last]) {
                console.error('Source without text!!!');
            }
            if (!line.endsWith(' -->')) {
                current = 'source';
            } else {
                line = line.substring(0, line.length - 4);
                current = '';
            }
            parts[last].source = parts[last].source || [];
            line = line.substring('<!-- SOURCE: '.length);

            // extract id
            const m = line.match(/^(\d+)\s|^(\d+)$/);
            if (m) {
                parts[last].id = parseInt(m[1] || m[2], 10);
                line = line.substring((m[1] || m[2]).length + 1);
            }
            if (line) {
                parts[last].source.push(line);
            } else {
                parts[last].doNotTranslate = true;
            }
        } else
        // If chapter
        if (line.startsWith('#')) {
            parts.push({type: 'h', lines: [line]});
        } else if (line) {
            if (!current) {
                current = 'p';
                parts.push({type: current, lines: []});
                last++;
            }
            parts[last].lines.push(line);
        } else {
            current = '';
        }

        let changed = false;
        // Find images in line and store it
        let m = line.match(/!\[[^]*]\([^)]+\)/g);
        if (m) {
            m.forEach(item => {
                let mm = item.match(/^!\[([^]*)]\(([^)]+)\)$/);
                if (mm) {
                    mm[2] = mm[2].trim();
                    const pos = mm[2].indexOf(' ');
                    parts[last].images = parts[last].images || [];
                    if (pos !== -1) {
                        parts[last].images.push({
                            text: mm[1].trim(),
                            link: mm[2].substring(0, pos),
                            title: mm[2].substring(pos + 1).trim().replace(/^"|"$/g, '')
                        });
                    } else {
                        parts[last].images.push({
                            text: mm[1].trim(),
                            link: mm[2]
                        });
                    }

                    line = line.replace(item, '§§IIIII_' + (parts[last].images.length - 1) + '§§');
                    changed = true;
                }
            });
        }

        // Find links in line and store it
        m = line.match(/\[[^]*]\([^)]+\)/g);
        if (m) {
            m.forEach((item, i) => {
                let mm = item.match(/^\[([^]*)]\(([^)]+)\)$/);
                if (mm) {
                    mm[2] = mm[2].trim();
                    parts[last].links = parts[last].links || [];
                    parts[last].links.push({
                        text: mm[1].trim(),
                        link: mm[2].trim(),
                    });

                    line = line.replace(item, '§§LLLLL_' + (parts[last].links.length - 1) + '§§');
                    changed = true;
                }
            });
        }
        // Find codes in line and store it
        m = line.match(/```[^`]+```/g);
        if (m) {
            m.forEach((item, i) => {
                let mm = item.match(/^```([^`]+)```$/);
                if (mm) {
                    parts[last].codes = parts[last].codes || [];
                    parts[last].codes.push({code: mm[1], single: false});
                    // do not CAOT, because it can be replaced with cyrillic one
                    line = line.replace(item, '§§JJJJJ_' + (parts[last].codes.length - 1) + '§§');
                    changed = true;
                }
            });
        }

        m = line.match(/`[^`]+`/g);
        if (m) {
            m.forEach((item, i) => {
                let mm = item.match(/^`([^`]+)`$/);
                if (mm) {
                    parts[last].codes = parts[last].codes || [];
                    parts[last].codes.push({code: mm[1], single: true});
                    line = line.replace(item, '§§SSSSS_' + (parts[last].codes.length - 1) + '§§');
                    changed = true;
                }
            });
        }
        if (changed) {
            parts[last].lines[parts[last].lines.length - 1] = line;
        }

    });

    parts = parts.filter(part => part.lines.length);

    if (addIds) {
        parts.forEach(part => {
            if (!part.id) {
                part.id = Math.round((Math.random() * 1000000));
            }
        });
    }

    return parts;
}

function partsSave(parts, saveNoSource) {
    const lines = [];
    parts.forEach((part, i) => {
        let text = (part.text || part.lines.join('\n')).trim();

        if (part.type === 'code') {
            console.log(text)

        }

        if (text.replace(/\n/g, '').trim() || (part.original && part.original.replace(/\n$/, ''))) {
            text = text.replace(/\n$/, '');
            if (part.type === 'h') {
                const m = text.match(/^(#*) (.+)$/);
                if (m) {
                    text = m[1] + ' ' + m[2][0].toUpperCase() + m[2].substring(1);
                }
            }

            if (part.links) {
                part.links.forEach((item, i) => {
                    text = text.replace(`§§LLLLL_${i}§§`, `[${item.text}](${item.link})`);
                });
            }
            if (part.codes) {
                part.codes.forEach((item, i) => {
                    if (item.single) {
                        text = text.replace(`§§SSSSS_${i}§§`, `\`${item.code}\``);
                    } else {
                        text = text.replace(`§§JJJJJ_${i}§§`, `\`\`\`${item.code}\`\`\``);
                    }
                });
            }
            if (part.images) {
                part.images.forEach((item, i) => {
                    text = text.replace(`§§IIIII_${i}§§`, `![${item.text}](${item.link}${item.title ? ' "' + item.title + '"' : ''})`);
                });
            }

            if (part.original) {
                // if last line is empty, put <!----> just before it
                if (text.match(/\n$/)) {
                    lines.push(text);
                    !saveNoSource && lines.push('<!-- SOURCE: ' + part.id + ' ' + part.original.replace(/\n$/, '') + ' -->\n');
                } else {
                    lines.push(text + '\n');
                    !saveNoSource && lines.push('<!-- SOURCE: ' + part.id + ' ' + part.original.replace(/\n$/, '') + ' -->\n');
                }
            } else {
                if (text.match(/\n$/)) {
                    lines.push(text);
                    !saveNoSource && lines.push('<!-- ID: ' + part.id + ' -->\n');
                } else {
                    lines.push(text + '\n');
                    !saveNoSource && lines.push('<!-- ID: ' + part.id + ' -->\n');
                }
            }

            // do not add new line after headers and tables (only after last table line)
            if (part.type !== 'h' && part.type !== 't') {
                lines.push('\n');
            } else if (part.type === 't' && parts[i + 1] && parts[i + 1].type !== 't') {
                lines.push('\n');
            }
        }
    });

    // remove double new lines
    let changed;
    do {
        changed = false;
        for (let i = lines.length - 2; i >= 0; i--) {
            if (!lines[i + 1] && !lines[i]) {
                lines.splice(i + 1, 1);
                changed = true;
            }
        }
    } while (changed);

    return lines.join('');
}

function translateLinks(fromLang, part, toLang, cb) {
    if (!part.links && !part.images) {
        cb();
    } else {
        let item = part.links && part.links.find(item => item.text && !item.translated);
        item = item || (part.images && part.images.find(item => item.text && !item.translated));
        if (item) {
            translateText(fromLang, item.text, toLang)
                .then(text => {
                    item.original = item.text;
                    item.text = text;
                    item.translated = true;
                    setTimeout(() => translateLinks(fromLang, part, toLang, cb), 0);
                });
        } else {
            item = (part.images && part.images.find(item => item.title && !item.translatedTitle));
            if (item) {
                translateText(fromLang, item.title, toLang)
                    .then(title => {
                        item.originalTitle = item.title;
                        item.title = title;
                        item.translatedTitle = true;
                        setTimeout(() => translateLinks(fromLang, part, toLang, cb), 0);
                    });
            } else {
                cb();
            }
        }
    }
}

function partsTranslate(fromLang, partsSource, toLang, partsTarget, cb) {
    partsTarget = partsTarget || [];

    let untranslated;
    for (let i = 0; i < partsSource.length; i++) {
        // do not translate twice
        if (partsSource[i].translated) continue;
        // do not translate code, but copy that
        if (partsSource[i].type === 'code') {
            if (!partsTarget[i] || partsSource[i].lines.join().trim() !== partsTarget[i].lines.join().trim()) {
                partsTarget[i] = JSON.parse(JSON.stringify(partsSource[i]));
            }
            partsSource[i].translated = true;
            continue;
        }
        // if nothing exists => translate
        if (!partsTarget || !partsTarget[i] || !partsTarget[i].source) {
            untranslated = i;
            break;
        }
        // Do not translate text, modified by user
        if (partsTarget[i].doNotTranslate) {
            partsSource[i].translated = true;
            continue;
        }
        // If text is not empty and differs => re-translate
        if (partsSource[i].lines.join().replace(/[\n\s]/).trim() &&
            partsTarget[i].source.join('').trim() !== partsSource[i].lines.join('').trim()) {
            untranslated = i;
            break;
        } else if (!partsTarget[i].original) {
            partsSource[i].translated = true;
            partsTarget[i].original = partsTarget[i].lines.join('\n');
        }
    }

    if (untranslated !== undefined) {
        partsTarget[untranslated] = JSON.parse(JSON.stringify(partsSource[untranslated]));
        partsTarget[untranslated].original = partsTarget[untranslated].lines.join('\n');
        return translateText(fromLang, partsTarget[untranslated].original, toLang)
            .then(text => {
                partsTarget[untranslated].text = text; // remember translated text
                //setTimeout(() => partsTranslate(fromLang, partsSource, toLang, partsTarget, cb), 0);
                translateLinks(fromLang, partsTarget[untranslated], toLang, () => {
                    partsSource[untranslated].translated = true;
                    setTimeout(() => partsTranslate(fromLang, partsSource, toLang, partsTarget, cb), 0);
                });
            }).catch(e => {
                console.error('Cannot translate: ' + e);
                partsSource[untranslated].translated = true;
                partsTarget[untranslated].text = partsTarget[untranslated].original;
            });
    } else {
        cb && cb(partsTarget);
    }
}

function tryToMerge(source, target) {
    const newTarget = [];
    source.forEach((item, i) => {
        const found = target.find(it => it.id === item.id);
        if (found) {
            newTarget[i] = found;
            target.splice(target.indexOf(found), 1);
        } else {
            newTarget[i] = JSON.parse(JSON.stringify(item));
        }
    });
    return newTarget;
}

function translateMD(fromLang, text, toLang, translatedText, saveNoSource, fileName) {
    return new Promise(resolve => {
        const partsSource = partsTake(text, true);
        let partsTarget = translatedText && partsTake(translatedText);

        if (partsTarget) {
            partsTarget = tryToMerge(partsSource, partsTarget);
        }

        console.log(`____________TRANSLATE ${fromLang} => ${toLang}_______________: ${fileName}`);

        partsTranslate(fromLang, partsSource, toLang, partsTarget, parts => {
            resolve({result: partsSave(parts, saveNoSource), source: partsSave(partsSource)});
        });
    });
}

function translateText(fromLang, text, toLang) {
    // detect LINKS, IMAGES and CODES and if the line has only that, do not translate it
    if (text.trim().match(/^[^\w]*§§[ILJ]+_\d+§§[^\w]*$/)) {
        return Promise.resolve(text);
    } else
    // detect table header and do not translate it
    if (text.trim().match(/^[-|:]$/)) {
        return Promise.resolve(text);
    } else
    // it must be some words and not only special chars
    if (!text.trim().match(/\w/)) {
        return Promise.resolve(text);
    }

    // remove new lines, because translator thinks it is end of sentence.
    if (text.indexOf('\n') !== -1) {
        // allow \n only after .
        const lines = text.split('\n');
        const newLines = [lines[0].trim()];
        for (let i = 1; i < lines.length; i++) {
            // if previous line ends with . or | => start new line
            if (lines[i - 1].trim().match(/[.|]$/) || lines[i].trim().startsWith('* ')) {
                newLines.push(lines[i].trim());
            } else {
                // add to previous line
                newLines[newLines.length - 1] += ' ' + lines[i].trim();
            }
        }
        text = newLines.join('\n');
    }

    console.log(`${fromLang}=>${toLang}: ${text}`);

    return _translateText(text, toLang, false, fromLang)
        .then(text => {
            // restore formatting of *, **, *** and __
            // | ** точка данных ** | ** Описание ** |  => | **точка данных** | **Описание** |

            if (text.startsWith('!&gt;')) {
                text = text.replace('&gt;', '>');
            }
            if (text.startsWith('° C')) {
                text = text.replace('°C');
            }
            if (text.startsWith('° F')) {
                text = text.replace('°F');
            }
            if (text.startsWith('% s')) {
                text = text.replace(' %s ');
            }
            // start with ***
            if (text.indexOf(' *** ') !== -1) {
                let parts = (text + ' ').split(' ***');
                if (parts.length > 1) {
                    if (parts.length % 2 === 0) {
                        console.error('Cannot restore formatting!: ' + text);
                    } else {
                        text = '';
                        parts.forEach((part, i) => {
                            if (i%2 === 0){
                                text += part;
                            } else {
                                text += ' ***' + part.trim() + '*** ';
                            }
                        });
                        text = text.replace(/\s\s/g, ' ');
                    }
                }
            }
            if (text.indexOf(' **_ ') !== -1) {
                let parts = (text + ' ').split(/ \*\*_| _\*\*/);
                if (parts.length > 1) {
                    if (parts.length % 2 === 0) {
                        console.error('Cannot restore formatting!: ' + text);
                    } else {
                        text = '';
                        parts.forEach((part, i) => {
                            if (i%2 === 0){
                                text += part;
                            } else {
                                text += ' **_' + part.trim() + '_** ';
                            }
                        });
                        text = text.replace(/\s\s/g, ' ');
                    }
                }
            }

            if (text.indexOf(' ** ') !== -1) {
                // then with **
                let parts = (text + ' ').split(/ \*\*[^*]/);
                if (parts.length > 1) {
                    if (parts.length % 2 === 0) {
                        console.error('Cannot restore formatting!: ' + text);
                    } else {
                        text = '';
                        parts.forEach((part, i) => {
                            if (i % 2 === 0) {
                                text += part;
                            } else {
                                text += ' **' + part.trim() + '** ';
                            }
                        });
                    }
                }
                text = text.replace(/\s\s/g, ' ');
            }

            // then with *
            const pos = text.indexOf(' * ') !== -1;
            if (pos !== -1 && pos) {
                let parts = (text + ' ').split(/ \*[^*]/);
                if (parts.length > 1) {
                    if (parts.length % 2 === 0) {
                        console.error('Cannot restore formatting!: ' + text);
                    } else {
                        text = '';
                        parts.forEach((part, i) => {
                            if (i % 2 === 0) {
                                text += part;
                            } else {
                                text += ' *' + part.trim() + '* ';
                            }
                        });
                        text = text.replace(/\s\s/g, ' ');
                    }
                }
            }

            // then with __
            /*parts = text.split(' __');
            if (parts.length > 1) {
                if (parts.length % 2 === 0) {
                    console.error('Cannot restore formatting!: ' + text);
                } else {
                    text = '';
                    parts.forEach((part, i) => {
                        if (i % 2 === 0) {
                            text += part;
                        } else {
                            text += ' __' + part.trim() + '__';
                        }
                    });
                }
            }*/
            text = text.replace(/& EMSP;/ig, '&emsp;');

            return text;
        });
}

module.exports = {
    translateMD,
    translateText
};
