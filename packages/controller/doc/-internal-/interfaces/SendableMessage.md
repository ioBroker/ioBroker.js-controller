[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendableMessage

# Interface: SendableMessage

Defined in: [types-dev/index.d.ts:428](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L428)

## Extended by

- [`Message`](Message.md)

## Properties

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:436](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L436)

Callback information. This is set when the source expects a response

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:430](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L430)

The command to be executed

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:434](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L434)

The source of this message

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:432](https://github.com/ioBroker/ioBroker.js-controller/blob/a3df0c4fe763e40516a914de87ed1c9d2fe9f3fc/packages/types-dev/index.d.ts#L432)

The message payload
