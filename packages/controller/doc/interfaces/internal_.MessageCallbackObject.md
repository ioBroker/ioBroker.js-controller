[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / MessageCallbackObject

# Interface: MessageCallbackObject

[<internal>](../modules/internal_.md).MessageCallbackObject

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

[adapter/src/lib/_Types.ts:337](https://github.com/ioBroker/ioBroker.js-controller/blob/63242509/packages/adapter/src/lib/_Types.ts#L337)

___

### time

• **time**: `number`

The timestamp of the initial message

#### Defined in

[adapter/src/lib/_Types.ts:339](https://github.com/ioBroker/ioBroker.js-controller/blob/63242509/packages/adapter/src/lib/_Types.ts#L339)

___

### timer

• `Optional` **timer**: `Timeout`

An optional timer, if a timeout has been specified

#### Defined in

[adapter/src/lib/_Types.ts:341](https://github.com/ioBroker/ioBroker.js-controller/blob/63242509/packages/adapter/src/lib/_Types.ts#L341)
