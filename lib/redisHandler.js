const Resp = require('respjs');
const EventEmitter = require('events');

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
        this.log = options.log || console;
        this.socket = socket;

        this.sockedId = socket.remoteAddress + ':' + socket.remotePort;
        this.initialized = false;

        this.writeQueue = [];

        this.resp = new Resp();

        this.resp.on('error', (err) => {
            this.log.error(this.sockedId + ' (Init=' + this.initialized + ') Redis error:' + err);
            if (this.initialized) {
                this.sendError(null,new Error('PARSER ERROR ' + err)); // TODO
            }
            else {
                this.close();
            }
        });

        this.resp.on('data', (data) => {
            const command = data.splice(0, 1)[0];
            if (command === 'info') this.initialized = true;
            const t = process.hrtime();
            const responseId = (t[0] * 1e3) + (t[1] / 1e6);
            this.log.silly(this.sockedId + ' Parser result: id=' + responseId + ', command=' + command + ', data=' + JSON.stringify(data)); // TODO remove data logging (performance)
            this.writeQueue.push({id: responseId, data: false});
            if (this.listenerCount(command) !== 0) {
                this.emit(command, data, responseId);
            }
            else {
                this.sendError(responseId, new Error(command + 'NOT SUPPORTED'));
            }
        });
        this.resp.on('finish', () => {
            this.log.debug(this.sockedId + ' Redis finish');
        });

        socket.on('data', (data) => {
            if (!data) return;
            this.log.silly(this.sockedId + ' New Redis request: ' + data.toString().replace(/[\r\n]*/g, '')); // TODO remove data logging (performance)
            this.resp.write(data);
        });

        socket.on('error', (err) => {
            this.log.error(this.sockedId + ' Redis error: ' + err);
            this.socket.destroy();
        });
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
        while (this.writeQueue.length && idx <= this.writeQueue.length && this.writeQueue[idx]) {
            if (this.writeQueue[idx].id === responseId) {
                this.writeQueue[idx].data = data;
                if (idx > 0) break;
            }
            if (idx === 0 && this.writeQueue[idx].data !== false) {
                const response = this.writeQueue.shift();
                this.log.silly(this.sockedId + ' Redis response (' + response.id + '): ' + response.data.toString().replace(/[\r\n]+/g, '')); // TODO remove data logging (performance)
                this._write(response.data);
            }
            else {
                idx++;
            }
        }

        if (idx > 0) {
            this.log.silly(this.sockedId + ' Redis response (' + responseId + '): Response queued');
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
     * Guard to make sure a response is valid to be send out
     * @param responseId ID of the response
     * @param data Buffer to send out
     */
    send(responseId, data) {
        if (responseId === null) {
            this.log.silly(this.sockedId + ' Redis response DIRECT: ' + data.toString().replace(/[\r\n]+/g, '')); // TODO remove data logging (performance)
            return this._write(data);
        }
        if (!responseId) {
            throw Error('Invalid implementation: no responseId provided!');
        }
        if (!data) {
            this.log.error('Not able to write ' + JSON.stringify(data));
            data = Resp.encodeError(new Error('INVALID RESPONSE: ' + JSON.stringify(data)));
        }
        this._sendQueued(responseId, data);
    }

    /**
     * Close network connection
     */
    close() {
        this.log.silly(this.sockedId + ' Redis connection close');
        this.socket.end();
    }

    /**
     * Encode RESP's Null value to RESP buffer and send out
     * @param responseId ID of the response
     */
    sendNull(responseId) {
        this.send(responseId, Resp.encodeNull());
    }

    /**
     * Encode RESP's Null Array value to RESP buffer and send out
     * @param responseId ID of the response
     */
    sendNullArray(responseId) {
        this.send(responseId, Resp.encodeNullArray());
    }

    /**
     * Encode string to RESP buffer and send out
     * @param responseId ID od the response
     * @param str String to encode
     */
    sendString(responseId, str) {
        this.send(responseId, Resp.encodeString(str));
    }

    /**
     * Encode error object to RESP buffer and send out
     * @param responseId ID of the response
     * @param error Error object with error details to send out
     */
    sendError(responseId, error) {
        this.send(responseId, Resp.encodeError(error));
    }

    /**
     * Encode integer to RESP buffer and send out
     * @param responseId ID of the response
     * @param num Integer to send out
     */
    sendInteger(responseId, num) {
        this.send(responseId, Resp.encodeInteger(num));
    }

    /**
     * Encode RESP's bulk string to RESP buffer and send out
     * @param responseId ID of the response
     * @param str String to send out
     */
    sendBulk(responseId, str) {
        this.send(responseId, Resp.encodeBulk(str));
    }

    /**
     * Encode RESP's bulk buffer to RESP buffer.
     * @param responseId ID of the response
     * @param buf Buffer to send out
     */
    sendBufBulk(responseId, buf) {
        this.send(responseId, Resp.encodeBufBulk(buf));
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
            }
            else if (Buffer.isBuffer(arr[i])) {
                arr[i] = Resp.encodeBufBulk(arr[i]);
            }
            else if (arr[i] === null) {
                arr[i] = Resp.encodeNull();
            }
            else if (typeof arr[i] === 'number') {
                arr[i] = Resp.encodeInteger(arr[i]);
            }
            else {
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
        this.send(responseId, Resp.encodeArray(this.encodeRespArray(arr)));
    }
}

module.exports = RedisHandler;
