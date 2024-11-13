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

[types-dev/index.d.ts:259](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/index.d.ts#L259)

***

### callback?

> `optional` **callback**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Callback information. This is set when the source expects a response

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`callback`](SendableMessage.md#callback)

#### Defined in

[types-dev/index.d.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/index.d.ts#L253)

***

### command

> **command**: `string`

The command to be executed

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`command`](SendableMessage.md#command)

#### Defined in

[types-dev/index.d.ts:247](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/index.d.ts#L247)

***

### from

> **from**: `string`

The source of this message

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`from`](SendableMessage.md#from)

#### Defined in

[types-dev/index.d.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/index.d.ts#L251)

***

### message

> **message**: `any`

The message payload

#### Inherited from

[`SendableMessage`](SendableMessage.md).[`message`](SendableMessage.md#message)

#### Defined in

[types-dev/index.d.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/index.d.ts#L249)
