import { inspect } from 'node:util';
import { setTimeout as wait } from 'node:timers/promises';
import { SYSTEM_ADAPTER_PREFIX } from '@iobroker/js-controller-common-db/constants';
import { ControllerContextBase } from '@/lib/controller/contextBase.js';
import type { HostInformation, SendResponseToOptions } from '@/lib/controller/types.js';

/** How long a callback of a sent message is stored before it is considered as lost */
const CALLBACK_LIFETIME = 3_600_000;
/** How long we wait for the answer of another host */
const ANSWER_TIMEOUT = 5_000;

/**
 * Sends messages to other hosts and adapter instances and keeps track of the pending callbacks
 */
export class MessageBus extends ControllerContextBase {
    /** Id of the next message which expects an answer */
    #callbackId = 1;
    /** All callbacks of messages which are waiting for an answer */
    readonly #callbacks: Record<string, { time: number; cb: (message: ioBroker.MessagePayload) => void }> = {};

    /**
     * Subscribe on the message queue of this host
     */
    initMessageQueue(): void {
        const { logger, hostLogPrefix, hostObjectPrefix } = this;

        this.states
            .subscribeMessage(hostObjectPrefix)
            .catch(e => logger.error(`${hostLogPrefix} Cannot subscribe to host messages: ${e.message}`));
    }

    /**
     * Send a message to another adapter instance
     *
     * @param objName - adapter name (hm-rpc) or id like system.host.rpi/system.adapter,hm-rpc
     * @param command The command to send
     * @param message The message payload to send
     */
    sendTo(objName: string, command: string, message: ioBroker.MessagePayload): Promise<void>;
    /**
     * Send a message to another adapter instance
     *
     * @param objName - adapter name (hm-rpc) or id like system.host.rpi/system.adapter,hm-rpc
     * @param command The command to send
     * @param message The message payload to send
     * @param callback Called with the response from the target instance
     */
    sendTo(
        objName: string,
        command: string,
        message: ioBroker.MessagePayload,
        callback: ioBroker.ErrorCallback | ioBroker.MessageCallbackInfo,
    ): void;

    /**
     * Send a message to another adapter instance
     *
     * @param objName - adapter name (hm-rpc) or id like system.host.rpi/system.adapter,hm-rpc
     * @param command The command to send
     * @param message The message payload to send
     * @param callback Called with the response from the target instance
     */
    async sendTo(
        objName: string,
        command: string,
        message: ioBroker.MessagePayload,
        callback?: ioBroker.ErrorCallback | ioBroker.MessageCallbackInfo,
    ): Promise<void> {
        const { logger, hostLogPrefix, hostObjectPrefix } = this;

        if (!this.isStatesConnected) {
            return;
        }

        if (message === undefined) {
            message = command;
            command = 'send';
        }

        const obj: ioBroker.SendableMessage = { command, message, from: hostObjectPrefix };

        if (!objName.startsWith(SYSTEM_ADAPTER_PREFIX) && !objName.startsWith('system.host.')) {
            objName = `${SYSTEM_ADAPTER_PREFIX}${objName}`;
        }

        if (callback) {
            if (typeof callback === 'function') {
                obj.callback = {
                    message: message,
                    id: this.#callbackId++,
                    ack: false,
                    time: Date.now(),
                };
                if (this.#callbackId > 0xffffffff) {
                    this.#callbackId = 1;
                }

                this.#callbacks[`_${obj.callback.id}`] = { cb: callback, time: Date.now() };
            } else {
                obj.callback = callback;
                obj.callback.ack = true;
            }
        }

        try {
            await this.states.pushMessage(objName, obj);
        } catch (e) {
            // do not stringify the object, we had the issue with the invalid string length on serialization
            logger.error(
                `${hostLogPrefix} [sendTo] Could not push message "${inspect(obj)}" to "${objName}": ${e.message}`,
            );
            if (obj.callback && obj.callback.id) {
                if (typeof callback === 'function') {
                    callback(e);
                }
                delete this.#callbacks[`_${obj.callback.id}`];
            }
        }
    }

    /**
     * Send a message to another adapter instance and wait for its answer
     *
     * @param objName - adapter name (hm-rpc) or id like system.host.rpi/system.adapter,hm-rpc
     * @param command The command to send
     * @param message The message payload to send
     */
    async sendToAndWait(objName: string, command: string, message: ioBroker.MessagePayload): Promise<any> {
        return new Promise(resolve => this.sendTo(objName, command, message, resolve));
    }

    /**
     * Check if the given message is the answer to a message sent by this host and if so, execute the stored callback
     *
     * @param msg The incoming message
     * @returns true if the message has been consumed as an answer to a former request
     */
    handleResponse(msg: ioBroker.Message): boolean {
        if (!msg.callback || !msg.callback.ack || !msg.callback.id || !this.#callbacks[`_${msg.callback.id}`]) {
            return false;
        }

        this.#callbacks[`_${msg.callback.id}`].cb(msg.message);
        delete this.#callbacks[`_${msg.callback.id}`];

        // delete too old callbacks IDs
        const now = Date.now();
        for (const id of Object.keys(this.#callbacks)) {
            if (now - this.#callbacks[id].time > CALLBACK_LIFETIME) {
                delete this.#callbacks[id];
            }
        }

        return true;
    }

    /**
     * Wrapper around sendTo for message responses
     *
     * @param options The received message and response payload
     */
    sendResponseTo(options: SendResponseToOptions): void {
        const { receivedMsg, payload } = options;

        if (receivedMsg.callback && receivedMsg.from) {
            this.sendTo(receivedMsg.from, receivedMsg.command, payload, receivedMsg.callback);
        }
    }

    /**
     * Get the version information from given host
     *
     * @param hostId host to get the version information from
     */
    async getVersionFromHost(hostId: ioBroker.ObjectIDs.Host): Promise<HostInformation | null> {
        const { logger, hostLogPrefix } = this;

        const state = await this.states.getState(`${hostId}.alive`);

        if (!state?.val) {
            logger.warn(`${hostLogPrefix} "${hostId}" is offline`);
            return null;
        }

        // do not wait forever for the answer of the other host
        const ioPack = await Promise.race([
            this.sendToAndWait(hostId, 'getVersion', null),
            wait(ANSWER_TIMEOUT, null, { ref: false }),
        ]);

        if (!ioPack) {
            logger.warn(`${hostLogPrefix} too delayed answer for ${hostId}`);
            return null;
        }

        return ioPack;
    }
}
