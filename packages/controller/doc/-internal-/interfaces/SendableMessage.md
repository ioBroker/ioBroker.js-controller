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

[types-dev/index.d.ts:267](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L267)

***

### command

> **command**: `string`

The command to be executed

#### Defined in

[types-dev/index.d.ts:261](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L261)

***

### from

> **from**: `string`

The source of this message

#### Defined in

[types-dev/index.d.ts:265](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L265)

***

### message

> **message**: `any`

The message payload

#### Defined in

[types-dev/index.d.ts:263](https://github.com/ioBroker/ioBroker.js-controller/blob/6c3a3884e29c4b6f03de102d699f9813dd546c7d/packages/types-dev/index.d.ts#L263)
