const Resp = require('respjs');
const { EventEmitter } = require('events');

/**
 * Class to handle a redis connection and provide events to react on for
 * all incoming Redis commands
 */
class RedisHandler extends EventEmitter {
    /**
     * Initialize and register all data handlers to send out events on new commands
     * @param socket Network Socket/Connection
     * @param options options objects, currently mainly for logger
     */
    constructor(socket, options) {
        super();

        options = options || {};
        this.options = options;
        this.log = options.log || console;
        this.logScope = options.logScope || '';
        if (this.logScope.length) {
            this.logScope += ' ';
        }
        this.socket = socket;

        this.socketId = this.logScope + socket.remoteAddress + ':' + socket.remotePort;
        this.initialized = false;
        this.stop = false;

        this.writeQueue = [];

        this.handleBuffers = false;
        const respOptions = {};
        if (options.handleAsBuffers) {
            this.handleBuffers = true;
            respOptions.bufBulk = true;
        }
        this.resp = new Resp(respOptions);

        this.resp.on('error', err => {
            this.log.error(`${this.socketId} (Init=${this.initialized}) Redis error:${err}`);
            if (this.initialized) {
                this.sendError(null,new Error('PARSER ERROR ' + err)); // TODO
            } else {
                this.close();
            }
        });

        this.resp.on('data', data => this._handleCommand(data));

        socket.on('data', data => {
            if (this.options.enhancedLogging) {
                this.log.silly(`${this.socketId} New Redis request: ${(data.length > 1024) ? data.toString().replace(/[\r\n]+/g, '').substring(0, 100) + ' -- ' + data.length + ' bytes' : data.toString().replace(/[\r\n]+/g, '')}`);
            }
            this.resp.write(data);
        });

        socket.on('error', err => {
            if (!this.stop) {
                this.log.debug(`${this.socketId} Redis Socket error: ${err}`);
            }
            if (this.socket) {
                this.socket.destroy();
            }
        });
    }

    /**
     * Handle one incoming command, assign responseId and emit event to be handled
     * @param data Array RESP data
     * @private
     */
    _handleCommand(data) {
        let command = data.splice(0, 1)[0];
        if (this.handleBuffers) {
            // Command and pot. first parameter should always be Buffer
            command = command.toString('utf-8');
            if (Buffer.isBuffer(data[0])) {
                data[0] = data[0].toString('utf-8');
            }
            // Binary data only relevant for GET and SET in our case
            if (command !== 'set' && data.length > 1) {
                for (let i = 1; i < data.length; i++) {
                    if (Buffer.isBuffer(data[i])) {
                        data[i] = data[i].toString('utf-8');
                    }
                }
            }
        }
        if (command === 'info') {
            this.initialized = true;
        }
        const t = process.hrtime();
        const responseId = (t[0] * 1e3) + (t[1] / 1e6);
        if (this.options.enhancedLogging) {
            this.log.silly(`${this.socketId} Parser result: id=${responseId}, command=${command}, data=${(JSON.stringify(data).length > 1024) ? JSON.stringify(data).substring(0, 100) + ' -- ' + JSON.stringify(data).length + ' bytes' : JSON.stringify(data)}`);
        }
        this.writeQueue.push({id: responseId, data: false});
        if (this.listenerCount(command) !== 0) {
            setImmediate(() => this.emit(command, data, responseId));
        } else {
            this.sendError(responseId, new Error(command + ' NOT SUPPORTED'));
        }
    }

    /**
     * Check if the response to a certain command can be send out directly or
     * if it needs to wait till earlier responses are ready
     * @param responseId ID of the response
     * @param data Buffer to send out
     * @private
     */
    _sendQueued(responseId, data) {
        let idx = 0;
        while (this.writeQueue.length && idx < this.writeQueue.length) {
            // we found the queue entry that matches with the responseId, so store the data so be sent out
            if (this.writeQueue[idx].id === responseId) {
                this.writeQueue[idx].data = data;
                // if we found it not on first index we are done because we can not send it out,
                // need to wait for index 0 to have a complete answer
                if (idx > 0) {
                    break;
                }
            }
            // when data for queue entry 0 are preset (!== false) we can send it, remove the first entry
            // and check the other entries if they have completed responses too
            if (idx === 0 && this.writeQueue[idx].data !== false) {
                const response = this.writeQueue.shift();
                if (this.options.enhancedLogging) {
                    this.log.silly(`${this.socketId} Redis response (${response.id}): ${(response.data.length > 1024) ? data.length + ' bytes' : response.data.toString().replace(/[\r\n]+/g, '')}`);
                }
                this._write(response.data);
                // We sended out first queue entry but no further response is ready
                // and we do not need to check the whole queue, so we are done here
                if (this.writeQueue.length && this.writeQueue[idx].data === false) {
                    break;
                }
            } else {
                // we have not found the response on the current index, try next one
                idx++;
            }
        }

        if (idx > 0) {
            if (this.options.enhancedLogging) {
                this.log.silly(`${this.socketId} Redis response (${responseId}): Response queued`);
            }
        }
    }

    /**
     * Really write out a response to the network connection
     * @param data Buffer to send out
     * @private
     */
    _write(data) {
        this.socket.write(data);
    }

    /**
     * Guard to make sure a response is valid to be sent out
     * @param responseId ID of the response
     * @param data Buffer to send out
     */
    sendResponse(responseId, data) {
        // handle responses without a specific request like publishing data, so send directly
        if (responseId === null) {
            if (this.options.enhancedLogging) {
                this.log.silly(`${this.socketId} Redis response DIRECT: ${data.toString().replace(/[\r\n]+/g, '')}`);
            }
            return this._write(data);
        }
        if (!responseId) {
            throw new Error('Invalid implementation: no responseId provided!');
        }
        if (!data) {
            this.log.warn(`${this.socketId} Not able to write ${JSON.stringify(data)}`);
            data = Resp.encodeError(new Error('INVALID RESPONSE: ' + JSON.stringify(data)));
        }
        setImmediate(() => this._sendQueued(responseId, data));
    }

    /**
     * Close network connection
     */
    close() {
        this.log.silly(`${this.socketId} close Redis connection`);
        this.stop = true;
        this.socket.end();
    }

    /**
     * Return if socket/handler active or closed
     * @returns {boolean} is Handler/Connection active (not closed)
     */
    isActive() {
        return !this.stop;
    }

    /**
     * Encode RESP's Null value to RESP buffer and send out
     * @param responseId ID of the response
     */
    sendNull(responseId) {
        this.sendResponse(responseId, Resp.encodeNull());
    }

    /**
     * Encode RESP's Null Array value to RESP buffer and send out
     * @param responseId ID of the response
     */
    sendNullArray(responseId) {
        this.sendResponse(responseId, Resp.encodeNullArray());
    }

    /**
     * Encode string to RESP buffer and send out
     * @param responseId ID od the response
     * @param str String to encode
     */
    sendString(responseId, str) {
        this.sendResponse(responseId, Resp.encodeString(str));
    }

    /**
     * Encode error object to RESP buffer and send out
     * @param responseId ID of the response
     * @param error Error object with error details to send out
     */
    sendError(responseId, error) {
        this.log.warn(`${this.socketId} Error from InMemDB: ${error}`);
        this.sendResponse(responseId, Resp.encodeError(error));
    }

    /**
     * Encode integer to RESP buffer and send out
     * @param responseId ID of the response
     * @param num Integer to send out
     */
    sendInteger(responseId, num) {
        this.sendResponse(responseId, Resp.encodeInteger(num));
    }

    /**
     * Encode RESP's bulk string to RESP buffer and send out
     * @param responseId ID of the response
     * @param str String to send out
     */
    sendBulk(responseId, str) {
        this.sendResponse(responseId, Resp.encodeBulk(str));
    }

    /**
     * Encode RESP's bulk buffer to RESP buffer.
     * @param responseId ID of the response
     * @param buf Buffer to send out
     */
    sendBufBulk(responseId, buf) {
        this.sendResponse(responseId, Resp.encodeBufBulk(buf));
    }

    /**
     * Encode an Array depending on the type of the elements
     * @param arr Array to encode
     * @returns {Array} Array with Buffers with encoded values
     */
    encodeRespArray(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                arr[i] = this.encodeRespArray(arr[i]);
            } else if (Buffer.isBuffer(arr[i])) {
                arr[i] = Resp.encodeBufBulk(arr[i]);
            } else if (arr[i] === null) {
                arr[i] = Resp.encodeNull();
            } else if (typeof arr[i] === 'number') {
                arr[i] = Resp.encodeInteger(arr[i]);
            } else {
                arr[i] = Resp.encodeBulk(arr[i]);
            }
        }
        return arr;
    }

    /**
     * Encode a array values to buffers and send out
     * @param responseId ID of the response
     * @param arr Array to send out
     */
    sendArray(responseId, arr) {
        this.sendResponse(responseId, Resp.encodeArray(this.encodeRespArray(arr)));
    }
}

module.exports = RedisHandler;
