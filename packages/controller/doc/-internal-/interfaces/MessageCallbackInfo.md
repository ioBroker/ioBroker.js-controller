[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackInfo

# Interface: MessageCallbackInfo

Defined in: [types-dev/index.d.ts:278](https://github.com/ioBroker/ioBroker.js-controller/blob/31c2c03f7a285c1b12a59af218633d714c7959ef/packages/types-dev/index.d.ts#L278)

Callback information for a passed message

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:284](https://github.com/ioBroker/ioBroker.js-controller/blob/31c2c03f7a285c1b12a59af218633d714c7959ef/packages/types-dev/index.d.ts#L284)

If ack is false, it means the message is a request. If ack is true, it means the message is a response

***

### id

> **id**: `number`

Defined in: [types-dev/index.d.ts:282](https://github.com/ioBroker/ioBroker.js-controller/blob/31c2c03f7a285c1b12a59af218633d714c7959ef/packages/types-dev/index.d.ts#L282)

ID of this callback

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:280](https://github.com/ioBroker/ioBroker.js-controller/blob/31c2c03f7a285c1b12a59af218633d714c7959ef/packages/types-dev/index.d.ts#L280)

The original message payload

***

### time

> **time**: `number`

Defined in: [types-dev/index.d.ts:286](https://github.com/ioBroker/ioBroker.js-controller/blob/31c2c03f7a285c1b12a59af218633d714c7959ef/packages/types-dev/index.d.ts#L286)

Timestamp of this message
