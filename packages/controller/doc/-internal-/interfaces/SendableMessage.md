[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendableMessage

# Interface: SendableMessage

Defined in: [types-dev/index.d.ts:429](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L429)

## Extended by

- [`Message`](Message.md)

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:437](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L437)

Callback information. This is set when the source expects a response

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:431](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L431)

The command to be executed

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:435](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L435)

The source of this message

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:433](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L433)

The message payload
