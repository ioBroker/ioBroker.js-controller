[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / SendableMessage

# Interface: SendableMessage

[<internal>](../modules/internal_.md).SendableMessage

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

[types-dev/index.d.ts:225](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/index.d.ts#L225)

___

### command

• **command**: `string`

The command to be executed

#### Defined in

[types-dev/index.d.ts:219](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/index.d.ts#L219)

___

### from

• **from**: `string`

The source of this message

#### Defined in

[types-dev/index.d.ts:223](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/index.d.ts#L223)

___

### message

• **message**: `any`

The message payload

#### Defined in

[types-dev/index.d.ts:221](https://github.com/ioBroker/ioBroker.js-controller/blob/a9d11a29/packages/types-dev/index.d.ts#L221)
