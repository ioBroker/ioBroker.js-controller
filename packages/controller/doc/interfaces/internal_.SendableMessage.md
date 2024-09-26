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

[types-dev/index.d.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L253)

___

### command

• **command**: `string`

The command to be executed

#### Defined in

[types-dev/index.d.ts:247](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L247)

___

### from

• **from**: `string`

The source of this message

#### Defined in

[types-dev/index.d.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L251)

___

### message

• **message**: `any`

The message payload

#### Defined in

[types-dev/index.d.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L249)
