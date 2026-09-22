[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackInfo

# Interface: MessageCallbackInfo

Defined in: [types-dev/index.d.ts:410](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L410)

Callback information for a passed message

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:416](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L416)

If ack is false, it means the message is a request. If ack is true, it means the message is a response

***

### id

> **id**: `number`

Defined in: [types-dev/index.d.ts:414](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L414)

ID of this callback

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:412](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L412)

The original message payload

***

### time

> **time**: `number`

Defined in: [types-dev/index.d.ts:418](https://github.com/ioBroker/ioBroker.js-controller/blob/d3655d6ed748f46a3339f5631e239130a00e0ddd/packages/types-dev/index.d.ts#L418)

Timestamp of this message
