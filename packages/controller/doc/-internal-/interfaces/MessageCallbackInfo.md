[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackInfo

# Interface: MessageCallbackInfo

Defined in: [types-dev/index.d.ts:284](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/types-dev/index.d.ts#L284)

Callback information for a passed message

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:290](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/types-dev/index.d.ts#L290)

If ack is false, it means the message is a request. If ack is true, it means the message is a response

***

### id

> **id**: `number`

Defined in: [types-dev/index.d.ts:288](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/types-dev/index.d.ts#L288)

ID of this callback

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:286](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/types-dev/index.d.ts#L286)

The original message payload

***

### time

> **time**: `number`

Defined in: [types-dev/index.d.ts:292](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/types-dev/index.d.ts#L292)

Timestamp of this message
