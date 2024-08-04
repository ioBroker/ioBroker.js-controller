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

[adapter/src/lib/_Types.ts:478](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/adapter/src/lib/_Types.ts#L478)

___

### time

• **time**: `number`

The timestamp of the initial message

#### Defined in

[adapter/src/lib/_Types.ts:480](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/adapter/src/lib/_Types.ts#L480)

___

### timer

• `Optional` **timer**: `Timeout`

An optional timer, if a timeout has been specified

#### Defined in

[adapter/src/lib/_Types.ts:482](https://github.com/ioBroker/ioBroker.js-controller/blob/d9be20474467bb22d1650fad002de9f7a6d253bf/packages/adapter/src/lib/_Types.ts#L482)
