[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / MessageCallbackInfo

# Interface: MessageCallbackInfo

Defined in: [types-dev/index.d.ts:423](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L423)

Callback information for a passed message

## Properties

### ack

> **ack**: `boolean`

Defined in: [types-dev/index.d.ts:429](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L429)

If ack is false, it means the message is a request. If ack is true, it means the message is a response

***

### id

> **id**: `number`

Defined in: [types-dev/index.d.ts:427](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L427)

ID of this callback

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:425](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L425)

The original message payload

***

### time

> **time**: `number`

Defined in: [types-dev/index.d.ts:431](https://github.com/ioBroker/ioBroker.js-controller/blob/5f1282043f999cdf804278f2c26fca61ad596533/packages/types-dev/index.d.ts#L431)

Timestamp of this message
