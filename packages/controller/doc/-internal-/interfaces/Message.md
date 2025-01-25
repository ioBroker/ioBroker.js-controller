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

[types-dev/index.d.ts:277](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/index.d.ts#L277)

***

### callback?

> `optional` **callback**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Callback information. This is set when the source expects a response

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`callback`](SendableMessage.md#callback)

#### Defined in

[types-dev/index.d.ts:271](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/index.d.ts#L271)

***

### command

> **command**: `string`

The command to be executed

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`command`](SendableMessage.md#command)

#### Defined in

[types-dev/index.d.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/index.d.ts#L265)

***

### from

> **from**: `string`

The source of this message

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`from`](SendableMessage.md#from)

#### Defined in

[types-dev/index.d.ts:269](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/index.d.ts#L269)

***

### message

> **message**: `any`

The message payload

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`message`](SendableMessage.md#message)

#### Defined in

[types-dev/index.d.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/99469b9944509b9c64b9a28da6d8dabf17a8ea74/packages/types-dev/index.d.ts#L267)
