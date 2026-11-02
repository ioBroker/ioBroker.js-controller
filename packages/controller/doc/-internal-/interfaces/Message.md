[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Message

# Interface: Message

Defined in: [types-dev/index.d.ts:441](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L441)

A message being passed between adapter instances

## Extends

- [`SendableMessage`](SendableMessage.md)

## Properties

### \_id

> **\_id**: `number`

Defined in: [types-dev/index.d.ts:443](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L443)

ID of this message

***

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:437](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L437)

Callback information. This is set when the source expects a response

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`callback`](SendableMessage.md#callback)

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:431](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L431)

The command to be executed

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`command`](SendableMessage.md#command)

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:435](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L435)

The source of this message

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`from`](SendableMessage.md#from)

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:433](https://github.com/ioBroker/ioBroker.js-controller/blob/b65f8b5d8246d1d25f6419b6835a75aff50dd38e/packages/types-dev/index.d.ts#L433)

The message payload

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`message`](SendableMessage.md#message)
