[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackInfo

# Interface: MessageCallbackInfo

Defined in: [types-dev/index.d.ts:417](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/types-dev/index.d.ts#L417)

Callback information for a passed message

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:423](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/types-dev/index.d.ts#L423)

If ack is false, it means the message is a request. If ack is true, it means the message is a response

***

### id

> **id**: `number`

Defined in: [types-dev/index.d.ts:421](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/types-dev/index.d.ts#L421)

ID of this callback

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:419](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/types-dev/index.d.ts#L419)

The original message payload

***

### time

> **time**: `number`

Defined in: [types-dev/index.d.ts:425](https://github.com/ioBroker/ioBroker.js-controller/blob/09c6db0d139e54806793dd9e609f30d8a4def223/packages/types-dev/index.d.ts#L425)

Timestamp of this message
