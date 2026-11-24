[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackInfo

# Interface: MessageCallbackInfo

Defined in: [types-dev/index.d.ts:432](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/index.d.ts#L432)

Callback information for a passed message

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:438](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/index.d.ts#L438)

If ack is false, it means the message is a request. If ack is true, it means the message is a response

***

### id

> **id**: `number`

Defined in: [types-dev/index.d.ts:436](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/index.d.ts#L436)

ID of this callback

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/index.d.ts#L434)

The original message payload

***

### time

> **time**: `number`

Defined in: [types-dev/index.d.ts:440](https://github.com/ioBroker/ioBroker.js-controller/blob/86bf1182d08e1fcbb51ac5fb0c89fed002e8bdd6/packages/types-dev/index.d.ts#L440)

Timestamp of this message
