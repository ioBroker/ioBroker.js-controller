import { tools } from '@iobroker/js-controller-common';
import JSZip from 'jszip';
import type { Client as ObjectsClient } from '@iobroker/db-objects-redis';

/**
 * Collect all files of the given directory and all its subdirectories
 *
 * @param objects The objects database client
 * @param id The object ID owning the files
 * @param name Path of the directory to read inside the object's file storage
 * @param options Optional settings passed to the objects client
 */
async function _getAllFilesInDir(objects: ObjectsClient, id: string, name: string, options: any): Promise<string[]> {
    const result: string[] = [];
    let dirContent: ioBroker.ReadDirResult[] | undefined;

    try {
        dirContent = await objects.readDirAsync(id, name, options);
    } catch {
        // a directory which cannot be read does not contribute any files
        return result;
    }

    for (const file of dirContent || []) {
        if (file.isDir) {
            result.push(...(await _getAllFilesInDir(objects, id, `${name}/${file.file}`, options)));
        } else {
            result.push(`${name}/${file.file}`);
        }
    }

    return result;
}

/**
 * Read one file of the objects database and add it to the zip archive
 *
 * @param objects The objects database client
 * @param id The object ID owning the file
 * @param name Path of the file inside the object's file storage
 * @param options Optional settings passed to the objects client
 * @param zip The archive the file is added to
 */
async function _addFile(objects: ObjectsClient, id: string, name: string, options: any, zip: JSZip): Promise<void> {
    let data: string | Buffer | null;

    try {
        ({ file: data } = await objects.readFile(id, name, options));
    } catch (e) {
        throw new Error(`Cannot read file "${name}": ${e.message}`);
    }

    // if handler installed
    if (options.stringify) {
        try {
            data = options.stringify(name, data, options ? options.settings : null);
        } catch (e) {
            throw new Error(`Cannot stringify file "${name}": ${e.message}`);
        }
    }

    const parts = name.split('/');
    if (parts.length > 1) {
        parts.shift();
        name = parts.join('/');
    }

    zip.file(name, data!);
}

/** Gets the result of {@link readDirAsZip}, for callers which still pass a callback */
export type ReadDirAsZipCallback = (err?: Error | null, base64?: string) => void;

/** Gets the result of {@link writeObjectsAsZip}, for callers which still pass a callback */
export type WriteObjectsAsZipCallback = (err?: Error | null) => void;

/**
 * Pack all files of a directory into a zip archive
 *
 * Files which cannot be read are skipped. If no file at all could be packed, but at least one has failed,
 * the error is thrown.
 *
 * @param objects The objects database client
 * @param id The object ID owning the files
 * @param name Path of the directory to read inside the object's file storage
 * @param options Optional settings passed to the objects client, or the callback
 * @param callback Deprecated, use the returned promise. If given, it gets the archive or the error, and the
 *     promise does not reject - as before, when the callback was the only way to get the result
 * @returns The base64 encoded zip archive or undefined if the directory contains no files
 */
export async function readDirAsZip(
    objects: ObjectsClient,
    id: string,
    name: string,
    options?: any,
    callback?: ReadDirAsZipCallback,
): Promise<string | undefined> {
    if (typeof options === 'function') {
        callback = options;
        options = null;
    }
    if (!callback) {
        return _readDirAsZip(objects, id, name, options);
    }

    let base64: string | undefined;
    try {
        base64 = await _readDirAsZip(objects, id, name, options);
    } catch (e) {
        callback(e);
        return;
    }
    // outside the try, so that an exception of the callback is not reported to it a second time
    callback(null, base64);
    return base64;
}

/**
 * Pack all files of a directory into a zip archive, see {@link readDirAsZip}
 *
 * @param objects The objects database client
 * @param id The object ID owning the files
 * @param name Path of the directory to read inside the object's file storage
 * @param options Optional settings passed to the objects client
 */
async function _readDirAsZip(
    objects: ObjectsClient,
    id: string,
    name: string,
    options?: any,
): Promise<string | undefined> {
    if (name[0] === '/') {
        name = name.substring(1);
    }
    options = options || {};
    let adapter = id;
    if (adapter.includes('.')) {
        adapter = id.split('.')[0]!;
    }

    // try to load processor of adapter
    try {
        options.stringify = (await import(`${tools.appName.toLowerCase()}.${adapter}/lib/convert.js`)).stringify;
    } catch {
        // OK
    }

    const files = await _getAllFilesInDir(objects, id, name, options);

    if (!files.length) {
        return;
    }

    const zip = new JSZip();
    const errors: string[] = [];
    let packedFiles = 0;

    for (const file of files) {
        try {
            await _addFile(objects, id, file, options, zip);
            packedFiles++;
        } catch (e) {
            errors.push(e.message);
        }
    }

    if (!packedFiles && errors.length) {
        throw new Error(errors.join(', '));
    }

    if (errors.length) {
        console.error(`Some files could not be packed: ${errors.join(', ')}`);
    }

    return zip.generateAsync({ type: 'base64' });
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
    const zipFile = zip.files[filename];

    if (!zipFile) {
        throw new Error(`Cannot write file "${filename}", because JSZip instance is incomplete`);
    }

    let data = await zipFile.async('nodebuffer');

    if (options.parse) {
        data = options.parse(name, filename, data, options ? options.settings : null);
    }
    const fName = name + filename;
    const parts = fName.split('/');
    parts.pop();

    await _checkDir({ objects, id, root: '', parts, options });
    return objects.writeFileAsync(id, name + filename, data, options);
}

/**
 * Unpack a zip archive and write all contained files into the object's file storage
 *
 * @param objects The objects database client
 * @param id The object ID that should own the files
 * @param name Target directory path inside the object's file storage
 * @param data The zip archive as a buffer
 * @param options Optional settings passed to the objects client
 */
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
        adapter = id.split('.')[0]!;
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
        } catch (e) {
            errors.push(`Cannot write file "${filename}": ${e.toString()}`);
        }
    }
    if (errors.length) {
        throw new Error(errors.join(', '));
    }
}

/**
 * Read all objects below the given root ID and pack them into a zip archive
 *
 * @param objects The objects database client
 * @param rootId The root object ID whose child objects should be exported
 * @param adapter The adapter the objects belong to
 * @param options Optional settings passed to the objects client
 */
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

    for (const obj of objs) {
        const id = obj._id;

        let data: Record<string, any> = { id, data: obj };

        if (options.stringify) {
            try {
                data = options.stringify(data, options ? options.settings : null);
            } catch {
                data.id = `${id.replace(/\./g, '/').substring(rootId.length + 1)}.json`;
            }
        } else {
            data.id = `${id.replace(/\./g, '/').substring(rootId.length + 1)}.json`;
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
): Promise<void> {
    const zipFile = zip.files[filename];

    if (!zipFile) {
        throw new Error(`Cannot write file "${filename}", because JSZip instance is incomplete`);
    }

    const bufferData = await zipFile.async('nodebuffer');
    let data: Record<string, any> = { data: bufferData.toString(), id: filename };
    if (options.parse) {
        try {
            data = options.parse(data, options ? options.settings : null);
        } catch (e) {
            throw new Error(`Cannot custom parse "${data.id}": ${e}`);
        }
    } else {
        data.id = (rootId ? `${rootId}.` : '') + data.id.replace(/\//g, '.').replace(/\.json$/, '');
    }
    if (data && typeof data.data !== 'object') {
        try {
            data.data = JSON.parse(data.data);
        } catch (e) {
            throw new Error(`Cannot parse "${data.id}": ${e.message}`);
        }
    }
    if (data && data.id && data.data) {
        options.ts = new Date().getTime();
        options.from = `system.host.${tools.getHostName()}.cli`;
        await objects.setObject(data.id, data.data, options);
        return;
    }

    if (data?.error) {
        throw data.error;
    }
}

/**
 * Unpack a zip archive of objects and store them below the given root ID
 *
 * @param objects The objects database client
 * @param rootId The root object ID the imported objects should be stored under
 * @param adapter The adapter the objects belong to
 * @param data The zip archive as a buffer
 * @param options Optional settings passed to the objects client
 * @param callback Deprecated, use the returned promise. If given, it gets the error, and the promise does not
 *     reject - as before, when the callback was the only way to get the result
 * @throws {Error} if the archive cannot be read or at least one object cannot be written
 */
export async function writeObjectsAsZip(
    objects: ObjectsClient,
    rootId: string,
    adapter: string,
    data: Buffer,
    options?: any,
    callback?: WriteObjectsAsZipCallback,
): Promise<void> {
    if (!callback) {
        return _writeObjectsAsZip(objects, rootId, adapter, data, options);
    }

    try {
        await _writeObjectsAsZip(objects, rootId, adapter, data, options);
    } catch (e) {
        callback(e);
        return;
    }
    // outside the try, so that an exception of the callback is not reported to it a second time
    callback(null);
}

/**
 * Unpack a zip archive of objects and store them below the given root ID, see {@link writeObjectsAsZip}
 *
 * @param objects The objects database client
 * @param rootId The root object ID the imported objects should be stored under
 * @param adapter The adapter the objects belong to
 * @param data The zip archive as a buffer
 * @param options Optional settings passed to the objects client
 */
async function _writeObjectsAsZip(
    objects: ObjectsClient,
    rootId: string,
    adapter: string,
    data: Buffer,
    options?: any,
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
    const errors: string[] = [];

    await zip.loadAsync(data);

    for (const filename of Object.keys(zip.files)) {
        if (filename[filename.length - 1] === '/') {
            continue;
        }

        try {
            await _writeOneObject(objects, zip, rootId, filename, options);
        } catch (e) {
            errors.push(e.toString());
        }
    }

    if (errors.length) {
        throw new Error(errors.join(', '));
    }
}
