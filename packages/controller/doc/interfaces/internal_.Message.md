[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / Message

# Interface: Message

[\<internal\>](../modules/internal_.md).Message

A message being passed between adapter instances

## Hierarchy

- [`SendableMessage`](internal_.SendableMessage.md)

  ↳ **`Message`**

## Table of contents

### Properties

- [\_id](internal_.Message.md#_id)
- [callback](internal_.Message.md#callback)
- [command](internal_.Message.md#command)
- [from](internal_.Message.md#from)
- [message](internal_.Message.md#message)

## Properties

### \_id

• **\_id**: `number`

ID of this message

#### Defined in

[types-dev/index.d.ts:259](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L259)

___

### callback

• `Optional` **callback**: [`MessageCallbackInfo`](internal_.MessageCallbackInfo.md)

Callback information. This is set when the source expects a response

#### Inherited from

[SendableMessage](internal_.SendableMessage.md).[callback](internal_.SendableMessage.md#callback)

#### Defined in

[types-dev/index.d.ts:253](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L253)

___

### command

• **command**: `string`

The command to be executed

#### Inherited from

[SendableMessage](internal_.SendableMessage.md).[command](internal_.SendableMessage.md#command)

#### Defined in

[types-dev/index.d.ts:247](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L247)

___

### from

• **from**: `string`

The source of this message

#### Inherited from

[SendableMessage](internal_.SendableMessage.md).[from](internal_.SendableMessage.md#from)

#### Defined in

[types-dev/index.d.ts:251](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L251)

___

### message

• **message**: `any`

The message payload

#### Inherited from

[SendableMessage](internal_.SendableMessage.md).[message](internal_.SendableMessage.md#message)

#### Defined in

[types-dev/index.d.ts:249](https://github.com/ioBroker/ioBroker.js-controller/blob/91f9b082f16aa9a511b440c286768c78810f47d7/packages/types-dev/index.d.ts#L249)
