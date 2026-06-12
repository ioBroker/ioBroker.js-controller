[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Message

# Interface: Message

Defined in: [types-dev/index.d.ts:301](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/index.d.ts#L301)

A message being passed between adapter instances

## Extends

- [`SendableMessage`](SendableMessage.md)

## Properties

### \_id

> **\_id**: `number`

Defined in: [types-dev/index.d.ts:303](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/index.d.ts#L303)

ID of this message

***

### callback?

> `optional` **callback?**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Defined in: [types-dev/index.d.ts:297](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/index.d.ts#L297)

Callback information. This is set when the source expects a response

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`callback`](SendableMessage.md#callback)

***

### command

> **command**: `string`

Defined in: [types-dev/index.d.ts:291](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/index.d.ts#L291)

The command to be executed

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`command`](SendableMessage.md#command)

***

### from

> **from**: `string`

Defined in: [types-dev/index.d.ts:295](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/index.d.ts#L295)

The source of this message

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`from`](SendableMessage.md#from)

***

### message

> **message**: `any`

Defined in: [types-dev/index.d.ts:293](https://github.com/ioBroker/ioBroker.js-controller/blob/c8582fd1bb3ec1d7630b6ec1db13ec462b1d219e/packages/types-dev/index.d.ts#L293)

The message payload

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`message`](SendableMessage.md#message)
