[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackInfo

# Interface: MessageCallbackInfo

Defined in: [types-dev/index.d.ts:424](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/index.d.ts#L424)

Callback information for a passed message

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:430](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/index.d.ts#L430)

If ack is false, it means the message is a request. If ack is true, it means the message is a response

***

### id

> **id**: `number`

Defined in: [types-dev/index.d.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/index.d.ts#L428)

ID of this callback

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:426](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/index.d.ts#L426)

The original message payload

***

### time

> **time**: `number`

Defined in: [types-dev/index.d.ts:432](https://github.com/ioBroker/ioBroker.js-controller/blob/96dcc7d328cfa50d439edfd331dfdddc8337b2c0/packages/types-dev/index.d.ts#L432)

Timestamp of this message
