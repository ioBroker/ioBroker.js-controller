[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SendableMessage

# Interface: SendableMessage

## Extended by

- [`Message`](Message.md)

## Properties

### callback?

> `optional` **callback**: [`MessageCallbackInfo`](MessageCallbackInfo.md)

Callback information. This is set when the source expects a response

#### Defined in

[types-dev/index.d.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/index.d.ts#L253)

***

### command

> **command**: `string`

The command to be executed

#### Defined in

[types-dev/index.d.ts:247](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/index.d.ts#L247)

***

### from

> **from**: `string`

The source of this message

#### Defined in

[types-dev/index.d.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/index.d.ts#L251)

***

### message

> **message**: `any`

The message payload

#### Defined in

[types-dev/index.d.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/dae94f706cc75e41fc7f1fe6bb283f8c8f9ede06/packages/types-dev/index.d.ts#L249)
