[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / SendableMessage

# Interface: SendableMessage

[\<internal\>](../modules/internal_.md).SendableMessage

## Hierarchy

- **`SendableMessage`**

  ↳ [`Message`](internal_.Message.md)

## Table of contents

### Properties

- [callback](internal_.SendableMessage.md#callback)
- [command](internal_.SendableMessage.md#command)
- [from](internal_.SendableMessage.md#from)
- [message](internal_.SendableMessage.md#message)

## Properties

### callback

• `Optional` **callback**: [`MessageCallbackInfo`](internal_.MessageCallbackInfo.md)

Callback information. This is set when the source expects a response

#### Defined in

[types-dev/index.d.ts:256](https://github.com/ioBroker/ioBroker.js-controller/blob/92c3310c84236d95c9e4b3ae9d8146bf78922374/packages/types-dev/index.d.ts#L256)

___

### command

• **command**: `string`

The command to be executed

#### Defined in

[types-dev/index.d.ts:250](https://github.com/ioBroker/ioBroker.js-controller/blob/92c3310c84236d95c9e4b3ae9d8146bf78922374/packages/types-dev/index.d.ts#L250)

___

### from

• **from**: `string`

The source of this message

#### Defined in

[types-dev/index.d.ts:254](https://github.com/ioBroker/ioBroker.js-controller/blob/92c3310c84236d95c9e4b3ae9d8146bf78922374/packages/types-dev/index.d.ts#L254)

___

### message

• **message**: `any`

The message payload

#### Defined in

[types-dev/index.d.ts:252](https://github.com/ioBroker/ioBroker.js-controller/blob/92c3310c84236d95c9e4b3ae9d8146bf78922374/packages/types-dev/index.d.ts#L252)
