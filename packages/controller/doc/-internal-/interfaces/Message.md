[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Message

# Interface: Message

A message being passed between adapter instances

## Extends

- [`SendableMessage`](SendableMessage.md)

## Properties

### \_id

> **\_id**: `number`

ID of this message

#### Defined in

[types-dev/index.d.ts:273](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L273)

***

### callback?

> `optional` **callback**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Callback information. This is set when the source expects a response

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`callback`](SendableMessage.md#callback)

#### Defined in

[types-dev/index.d.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L267)

***

### command

> **command**: `string`

The command to be executed

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`command`](SendableMessage.md#command)

#### Defined in

[types-dev/index.d.ts:261](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L261)

***

### from

> **from**: `string`

The source of this message

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`from`](SendableMessage.md#from)

#### Defined in

[types-dev/index.d.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L265)

***

### message

> **message**: `any`

The message payload

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`message`](SendableMessage.md#message)

#### Defined in

[types-dev/index.d.ts:263](https://github.com/ioBroker/ioBroker.js-controller/blob/98c8e13a2785a2eeac3b3ee2a60dcd41754c14ad/packages/types-dev/index.d.ts#L263)
