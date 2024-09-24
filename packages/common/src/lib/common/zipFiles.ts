import { tools } from '@iobroker/js-controller-common';
import JSZip from 'jszip';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

function _getAllFilesInDir(
    objects: ObjectsClient,
    id: string,
    name: string,
    options: any,
    callback: (errs: null | string[], res: string[]) => void,
    result?: string[],
): void {
    objects.readDir(id, name, options, (err, files) => {
        result = result || [];

        let count = 0;
        const errors: string[] = [];
        if (files) {
            for (const file of files) {
                if (file.isDir) {
                    count++;
                    _getAllFilesInDir(
                        objects,
                        id,
                        `${name}/${file.file}`,
                        options,
                        (errs, _result) => {
                            errs && errors.push(...errs);
                            if (!--count) {
                                callback(errors.length ? errors : null, _result);
                            }
                        },
                        result,
                    );
                } else {
                    result.push(`${name}/${file.file}`);
                }
            }
        }

        if (!count) {
            callback(null, result);
        }
    });
}

function _addFile(
    objects: ObjectsClient,
    id: string,
    name: string,
    options: any,
    zip: JSZip,
    callback: (err: Error | null | undefined) => void,
): void {
    objects.readFile(id, name, options, (err, data, _mime) => {
        if (err) {
            console.log(err);
            callback(new Error(`Cannot read file "${name}": ${err.message}`));
        } else {
            // if handler installed
            if (options.stringify) {
                try {
                    data = options.stringify(name, data, options ? options.settings : null);
                } catch (e) {
                    console.error(`Cannot stringify file "${name}": ${e.message}`);
                    if (!err) {
                        err = new Error(`Cannot stringify file "${name}": ${e.message}`);
                    }
                }
            }
            const parts = name.split('/');
            if (parts.length > 1) {
                parts.shift();
                name = parts.join('/');
            }

            zip.file(name, data!);
            setImmediate(() => callback(err));
        }
    });
}

// pack all files as zip and send it back
export async function readDirAsZip(
    objects: ObjectsClient,
    id: string,
    name: string,
    options: any,
    callback: (err?: Error | null, base64?: string) => void,
): Promise<void> {
    if (typeof options === 'function') {
        callback = options;
        options = null;
    }
    if (name[0] === '/') {
        name = name.substring(1);
    }
    options = options || {};
    let adapter = id;
    if (adapter.indexOf('.') !== -1) {
        adapter = id.split('.')[0];
    }

    // try to load processor of adapter
    try {
        options.stringify = (await import(`${tools.appName.toLowerCase()}.${adapter}/lib/convert.js`)).stringify;
    } catch {
        // OK
    }

    _getAllFilesInDir(objects, id, name, options, (errs, files) => {
        let count = 0;
        if (files) {
            const zip = new JSZip();
            for (const file of files) {
                count++;
                _addFile(objects, id, file, options, zip, async err => {
                    if (!--count) {
                        try {
                            const base64 = await zip.generateAsync({ type: 'base64' });
                            callback(err, base64);
                        } catch (e) {
                            callback(e.message);
                        }
                    }
                });
            }
        }

        if (!count) {
            callback(errs?.length ? new Error(errs.join(', ')) : null);
        }
    });
}

interface CheckDirOptions {
    objects: ObjectsClient;
    id: string;
    root: string;
    parts: string[];
    options: any;
}

/**
 * Check that directory exists recursive
 *
 * @param _options directory information and objects db
 */
async function _checkDir(_options: CheckDirOptions): Promise<void> {
    const { parts, id, options, objects } = _options;
    let { root } = _options;

    if (!parts?.length) {
        return;
    }

    root += `/${parts.shift()}`;

    try {
        await objects.readDirAsync(id, root, options);
    } catch (e) {
        if (e.message === tools.ERRORS.ERROR_NOT_FOUND) {
            await objects.mkdirAsync(id, root, options);
        }
    }

    return _checkDir({ id, objects, options, root, parts });
}

async function _writeOneFile(
    objects: ObjectsClient,
    zip: JSZip,
    id: string,
    name: string,
    filename: string,
    options: any,
): Promise<void> {
    let data = await zip.files[filename].async('nodebuffer');

    if (options.parse) {
        data = options.parse(name, filename, data, options ? options.settings : null);
    }
    const fName = name + filename;
    const parts = fName.split('/');
    parts.pop();

    await _checkDir({ objects, id, root: '', parts, options });
    return objects.writeFileAsync(id, name + filename, data, options);
}

export async function writeDirAsZip(
    objects: ObjectsClient,
    id: string,
    name: string,
    data: Buffer,
    options: any,
): Promise<void> {
    const zip = new JSZip();

    options = options || {};

    let adapter = id;
    if (adapter.includes('.')) {
        adapter = id.split('.')[0];
    }

    // try to load processor of adapter
    try {
        options.parse = (await import(`${tools.appName.toLowerCase()}.${adapter}/lib/convert.js`)).parse;
    } catch {
        // OK
    }

    await zip.loadAsync(data);
    const errors = [];
    if (name[name.length - 1] !== '/') {
        name += '/';
    }
    for (const filename of Object.keys(zip.files)) {
        if (!filename || filename[filename.length - 1] === '/') {
            continue;
        }
        try {
            await _writeOneFile(objects, zip, id, name, filename, options);
        } catch (error) {
            errors.push(`Cannot write file "${filename}": ${error.toString()}`);
        }
    }
    if (errors.length) {
        throw new Error(errors.join(', '));
    }
}

// pack all files as zip and send it back
export async function readObjectsAsZip(
    objects: ObjectsClient,
    rootId: string,
    adapter: string,
    options: any = {},
): Promise<string> {
    if (adapter) {
        // try to load processor of adapter
        try {
            options.stringify = (await import(`${tools.appName.toLowerCase()}.${adapter}/lib/convert.js`)).stringify;
        } catch {
            // OK
        }
    }

    const keys = await objects.getKeysAsync(`${rootId}.*`, options);
    if (!keys) {
        throw new Error('No matching keys found');
    }

    const objs = await objects.getObjectsAsync(keys, options);
    const zip = new JSZip();

    for (let f = 0; f < objs.length; f++) {
        let data: Record<string, any> = { id: keys[f], data: objs[f] };

        if (options.stringify) {
            try {
                data = options.stringify(data, options ? options.settings : null);
            } catch {
                data.id = `${keys[f].replace(/\./g, '/').substring(rootId.length + 1)}.json`;
            }
        } else {
            data.id = `${keys[f].replace(/\./g, '/').substring(rootId.length + 1)}.json`;
        }
        if (typeof data.data === 'object') {
            data.data = JSON.stringify(data.data, null, 2);
        }

        zip.file(data.id, data.data);
    }

    const base64 = await zip.generateAsync({ type: 'base64' });
    return base64;
}

async function _writeOneObject(
    objects: ObjectsClient,
    zip: JSZip,
    rootId: string,
    filename: string,
    options: any,
    callback: (err?: Error | null) => void,
): Promise<void> {
    try {
        const bufferData = await zip.files[filename].async('nodebuffer');
        let data: Record<string, any> = { data: bufferData.toString(), id: filename };
        if (options.parse) {
            try {
                data = options.parse(data, options ? options.settings : null);
            } catch (e) {
                callback(new Error(`Cannot custom parse "${data.id}": ${e}`));
                return;
            }
        } else {
            data.id = (rootId ? `${rootId}.` : '') + data.id.replace(/\//g, '.').replace(/\.json$/, '');
        }
        if (data && typeof data.data !== 'object') {
            try {
                data.data = JSON.parse(data.data);
            } catch (e) {
                callback(new Error(`Cannot parse "${data.id}": ${e.message}`));
                return;
            }
        }
        if (data && data.id && data.data) {
            options.ts = new Date().getTime();
            options.from = `system.host.${tools.getHostName()}.cli`;
            objects.setObject(data.id, data.data, options, err => callback(err));
        } else {
            if (data?.error) {
                callback(data.error);
            } else {
                callback();
            }
        }
    } catch (e) {
        callback(new Error(`Cannot parse unzip: ${e.message}`));
    }
}

export async function writeObjectsAsZip(
    objects: ObjectsClient,
    rootId: string,
    adapter: string,
    data: Buffer,
    options: any,
    callback: (err?: Error | null) => void,
): Promise<void> {
    options = options || {};

    if (adapter) {
        // try to load processor of adapter
        try {
            options.parse = (await import(`${tools.appName.toLowerCase()}.${adapter}/lib/convert.js`)).parse;
        } catch {
            // OK
        }
    }

    const zip = new JSZip();
    try {
        await zip.loadAsync(data);
        let count = 0;
        const error: string[] = [];
        for (const filename of Object.keys(zip.files)) {
            if (filename[filename.length - 1] === '/') {
                continue;
            }
            count++;
            _writeOneObject(objects, zip, rootId, filename, options, err => {
                if (err) {
                    error.push(err.toString());
                }
                if (!--count && callback) {
                    callback(error.length ? new Error(error.join(', ')) : null);
                    // @ts-expect-error promisify later on
                    callback = null;
                }
            });
        }
    } catch (e) {
        if (callback) {
            callback(e.toString());
            // @ts-expect-error promisify later on
            callback = null;
        }
    }
}
