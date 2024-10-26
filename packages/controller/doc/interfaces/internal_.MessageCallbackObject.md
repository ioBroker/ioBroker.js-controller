[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / MessageCallbackObject

# Interface: MessageCallbackObject

[\<internal\>](../modules/internal_.md).MessageCallbackObject

Message Callback used internally

## Table of contents

### Properties

- [cb](internal_.MessageCallbackObject.md#cb)
- [time](internal_.MessageCallbackObject.md#time)
- [timer](internal_.MessageCallbackObject.md#timer)

## Properties

### cb

• **cb**: [`MessageCallback`](../modules/internal_.md#messagecallback)

the callback itself

#### Defined in

[adapter/src/lib/_Types.ts:487](https://github.com/ioBroker/ioBroker.js-controller/blob/8055a2557df8dde044ef06d40117396b9c86cabc/packages/adapter/src/lib/_Types.ts#L487)

___

### time

• **time**: `number`

The timestamp of the initial message

#### Defined in

[adapter/src/lib/_Types.ts:489](https://github.com/ioBroker/ioBroker.js-controller/blob/8055a2557df8dde044ef06d40117396b9c86cabc/packages/adapter/src/lib/_Types.ts#L489)

___

### timer

• `Optional` **timer**: `Timeout`

An optional timer, if a timeout has been specified

#### Defined in

[adapter/src/lib/_Types.ts:491](https://github.com/ioBroker/ioBroker.js-controller/blob/8055a2557df8dde044ef06d40117396b9c86cabc/packages/adapter/src/lib/_Types.ts#L491)
