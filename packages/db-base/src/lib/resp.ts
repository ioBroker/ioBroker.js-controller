/*
 * RESP (REdis Serialization Protocol) encoder and streaming parser.
 *
 * Based on RESP.js 4.2.0 (https://github.com/zensh/resp.js), licensed under the MIT License:
 *
 * Copyright (c) 2014-2019 Yan Qing
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Changed for ioBroker: the parser no longer copies everything received so far for every incoming chunk.
 * A bulk string that is not complete yet - also inside an array - is collected chunk by chunk and copied
 * once when its announced length has arrived; the parser learns that length in the same pass that parses. Before, a 13 MB message received in 64 KB chunks allocated
 * about 200 buffers with 1.3 GB in total.
 */
import { EventEmitter } from 'node:events';

const CRLF = '\r\n';

/**
 * End index (in the buffer) that the bulk string at which the last parseBuffer call stopped needs; 0 if that call
 * stopped at an incomplete header line instead. Set in the same pass that parses, so no second walk is needed.
 */
let incompleteEnd = 0;

/** A decoded RESP value */
export type RespValue = string | number | null | Buffer | Error | RespValue[];

/** Options of the streaming parser */
export interface RespOptions {
    /** Return bulk strings as Buffer instead of string */
    bufBulk?: boolean;
}

/** Result of reading one value */
class ReadRes {
    constructor(
        public content: any,
        public index: number,
    ) {}
}

/**
 * Encoder and streaming parser for RESP, emits `data` for every complete value and `error` for invalid input
 */
export class Resp extends EventEmitter {
    /** Return bulk strings as Buffer */
    private readonly _bufBulk: boolean;
    /** Received data that is not parsed yet */
    private _buf: Buffer | null = null;
    /** Parse position in `_buf` */
    private _pos = 0;
    /** Chunks collected while waiting for a value of known length */
    private _pending: Buffer[] | null = null;
    /** Number of bytes in `_pending` */
    private _pendingLength = 0;
    /** Number of bytes the pending value needs at least */
    private _needed = 0;
    /** Legacy from the old stream implementation */
    public writable = true;

    /**
     * Encode a RESP Null value
     */
    static encodeNull(): Buffer {
        return Buffer.from('$-1\r\n');
    }

    /**
     * Encode a RESP Null array
     */
    static encodeNullArray(): Buffer {
        return Buffer.from('*-1\r\n');
    }

    /**
     * Encode a RESP simple string
     *
     * @param str the string, must not contain CR or LF
     */
    static encodeString(str: string): Buffer {
        if (typeof str !== 'string') {
            throw new TypeError(`${String(str)} must be string`);
        }
        return Buffer.from(`+${str}${CRLF}`);
    }

    /**
     * Encode a RESP error
     *
     * @param err the error, its message must not contain CR or LF
     */
    static encodeError(err: Error): Buffer {
        if (!(err instanceof Error)) {
            throw new TypeError(`${String(err)} must be Error object`);
        }
        return Buffer.from(`-${err.name} ${err.message}${CRLF}`);
    }

    /**
     * Encode a RESP integer
     *
     * @param num the integer
     */
    static encodeInteger(num: number): Buffer {
        if (!Number.isInteger(num)) {
            throw new TypeError(`${String(num)} must be Integer`);
        }
        return Buffer.from(`:${num}${CRLF}`);
    }

    /**
     * Encode a RESP bulk string
     *
     * @param str the value, converted to a string
     */
    static encodeBulk(str: unknown): Buffer {
        if (!arguments.length) {
            throw new Error('no value to encode');
        }
        str = String(str);
        return Buffer.from(`$${Buffer.byteLength(str as string, 'utf8')}${CRLF}${str as string}${CRLF}`);
    }

    /**
     * Encode a Buffer as RESP bulk string
     *
     * @param buf the Buffer
     */
    static encodeBufBulk(buf: Buffer): Buffer {
        if (!Buffer.isBuffer(buf)) {
            throw new TypeError(`${String(buf)} must be Buffer object`);
        }
        const prefix = `$${buf.length}${CRLF}`;
        const buffer = Buffer.allocUnsafe(prefix.length + buf.length + 2);
        buffer.write(prefix);
        buf.copy(buffer, prefix.length);
        buffer.write(CRLF, prefix.length + buf.length);
        return buffer;
    }

    /**
     * Encode an array of already encoded RESP values (or nested arrays of them)
     *
     * @param arr the encoded values, anything else throws
     */
    static encodeArray(arr: unknown[]): Buffer {
        if (!Array.isArray(arr)) {
            throw new Error(`${String(arr)} must be Array object`);
        }
        const prefix = `*${arr.length}${CRLF}`;
        let length = prefix.length;
        const bufs: Buffer[] = [Buffer.from(prefix)];

        for (const value of arr) {
            let buf: Buffer;
            if (Array.isArray(value)) {
                buf = Resp.encodeArray(value);
            } else if (Buffer.isBuffer(value)) {
                buf = value;
            } else {
                throw new TypeError(`${String(value)} must be RESP Buffer value`);
            }
            bufs.push(buf);
            length += buf.length;
        }

        return Buffer.concat(bufs, length);
    }

    /**
     * Encode a request (array of bulk strings)
     *
     * @param arr the request arguments
     */
    static encodeRequest(arr: (string | Buffer)[]): Buffer {
        if (!Array.isArray(arr) || arr.length === 0) {
            throw new Error(`${String(arr)} must be array of value`);
        }
        const bulks = arr.map(value => (Buffer.isBuffer(value) ? Resp.encodeBufBulk(value) : Resp.encodeBulk(value)));
        return Resp.encodeArray(bulks);
    }

    /**
     * Decode one complete RESP value
     *
     * @param buf the encoded value
     * @param bufBulk return bulk strings as Buffer
     */
    static decode(buf: Buffer, bufBulk?: boolean): RespValue {
        const res = parseBuffer(buf, 0, !!bufBulk);
        if (!res || (!(res instanceof Error) && res.index < buf.length)) {
            throw new Error(`Parse "${buf.toString()}" failed`);
        }
        if (res instanceof Error) {
            throw res;
        }
        return res.content;
    }

    /**
     * @param options parser options
     */
    constructor(options?: RespOptions) {
        super();
        this._bufBulk = !!options?.bufBulk;
    }

    /**
     * Feed received data into the parser
     *
     * @param buf the received chunk
     */
    write(buf: Buffer): boolean {
        if (!Buffer.isBuffer(buf)) {
            this.emit('error', new Error('Invalid buffer chunk'));
            return true;
        }

        if (this._pending) {
            // a value larger than the data received so far is pending: collect the chunks and copy them once
            this._pending.push(buf);
            this._pendingLength += buf.length;
            if (this._pendingLength < this._needed) {
                this.emit('drain');
                return true;
            }
            buf = Buffer.concat(this._pending, this._pendingLength);
            this._pending = null;
        }

        if (!this._buf) {
            this._buf = buf;
        } else {
            const ret = this._buf.length - this._pos;
            const _buf = Buffer.allocUnsafe(buf.length + ret);

            this._buf.copy(_buf, 0, this._pos);
            buf.copy(_buf, ret);
            this._buf = _buf;
            this._pos = 0;
        }

        while (this._pos < this._buf.length) {
            incompleteEnd = 0;
            const result = parseBuffer(this._buf, this._pos, this._bufBulk);
            if (result == null) {
                // parseBuffer stopped at a bulk string whose announced end lies beyond the received data
                const needed = incompleteEnd - this._pos;
                if (incompleteEnd > this._buf.length) {
                    // wait until the announced length has arrived instead of copying the whole buffer for every chunk
                    this._pending = [this._buf.subarray(this._pos)];
                    this._pendingLength = this._buf.length - this._pos;
                    this._needed = needed;
                    this._buf = null;
                    this._pos = 0;
                }
                this.emit('drain');
                return true;
            }
            if (result instanceof Error) {
                this.clearState();
                this.emit('error', result);
                return false;
            }
            this._pos = result.index;
            this.emit('data', result.content);
        }

        this.clearState();
        this.emit('drain');
        return true;
    }

    /**
     * End the stream, optionally with a last chunk
     *
     * @param buf the last chunk
     */
    end(buf?: Buffer | null): void {
        if (buf != null) {
            this.write(buf);
        }
        this.emit('finish');
    }

    /**
     * Drop all received data
     */
    private clearState(): void {
        this._pos = 0;
        this._buf = null;
        this._pending = null;
        this._pendingLength = 0;
        this._needed = 0;
    }
}

/**
 * Read a line up to CRLF
 *
 * @param buf the received data
 * @param i start of the line
 */
function readBuffer(buf: Buffer, i: number): ReadRes | null {
    const start = i;
    const len = buf.length;
    while (i < len && !isCRLF(buf, i)) {
        i++;
    }
    return i >= len ? null : new ReadRes(buf.toString('utf8', start, i), i + 2);
}

/**
 * Parse one RESP value
 *
 * @param buf the received data
 * @param index start of the value
 * @param bufBulk return bulk strings as Buffer
 * @returns the value, null if it is incomplete, or an Error for invalid data
 */
function parseBuffer(buf: Buffer, index: number, bufBulk: boolean): ReadRes | Error | null {
    let result: ReadRes | null;
    let num: number | null;
    if (index >= buf.length) {
        return null;
    }

    switch (buf[index]) {
        case 43: {
            // '+'
            return readBuffer(buf, index + 1);
        }

        case 45: {
            // '-'
            result = readBuffer(buf, index + 1);
            if (result == null) {
                return result;
            }
            let fragment: (string | null)[] | null = result.content.match(/^(\S+) ([\s\S]+)$/);
            if (!fragment) {
                fragment = [null, 'Error', result.content];
            }
            const err: Error & { code?: string } = new Error(fragment[2] as string);
            err.name = err.code = fragment[1] as string;
            result.content = err;
            return result;
        }

        case 58: {
            // ':'
            result = readBuffer(buf, index + 1);
            if (result == null) {
                return result;
            }
            num = parseInteger(result.content);
            if (num == null) {
                return new Error('Parse ":" failed');
            }
            result.content = num;
            return result;
        }

        case 36: {
            // '$'
            result = readBuffer(buf, index + 1);
            if (result == null) {
                return result;
            }
            num = parseInteger(result.content);
            if (num == null || num < -1) {
                return new Error('Parse "$" failed, invalid length');
            }
            const endIndex = result.index + num;

            if (num === -1) {
                // Null Bulk
                result.content = null;
            } else if (buf.length < endIndex + 2) {
                incompleteEnd = endIndex + 2;
                return null;
            } else if (!isCRLF(buf, endIndex)) {
                return new Error('Parse "$" failed, invalid CRLF');
            } else {
                result.content = bufBulk
                    ? buf.subarray(result.index, endIndex)
                    : buf.toString('utf8', result.index, endIndex);
                result.index = endIndex + 2;
            }
            return result;
        }

        case 42: {
            // '*'
            result = readBuffer(buf, index + 1);
            if (result == null) {
                return result;
            }
            num = parseInteger(result.content);
            if (num == null || num < -1) {
                return new Error('Parse "*" failed, invalid length');
            }

            if (num === -1) {
                // Null Array
                result.content = null;
            } else if (num === 0) {
                result.content = [];
            } else {
                result.content = new Array(num);
                for (let i = 0; i < num; i++) {
                    const _result = parseBuffer(buf, result.index, bufBulk);
                    if (_result == null || _result instanceof Error) {
                        return _result;
                    }
                    result.content[i] = _result.content;
                    result.index = _result.index;
                }
            }
            return result;
        }
    }
    return new Error('Invalid Chunk: parse failed');
}

/**
 * Parse an integer, null if it is not one
 *
 * @param str the text
 */
function parseInteger(str: string): number | null {
    const num = +str;
    return str && Number.isInteger(num) ? num : null;
}

/**
 * Is there CRLF at position i
 *
 * @param buf the data
 * @param i position
 */
function isCRLF(buf: Buffer, i: number): boolean {
    return buf[i] === 13 && buf[i + 1] === 10;
}
