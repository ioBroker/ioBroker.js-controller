[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / InternalSendToHostOptions

# Interface: InternalSendToHostOptions

[<internal>](../modules/internal_.md).InternalSendToHostOptions

## Table of contents

### Properties

- [callback](internal_.InternalSendToHostOptions.md#callback)
- [command](internal_.InternalSendToHostOptions.md#command)
- [hostName](internal_.InternalSendToHostOptions.md#hostname)
- [message](internal_.InternalSendToHostOptions.md#message)

## Properties

### callback

• `Optional` **callback**: [`MessageCallback`](../modules/internal_.md#messagecallback) \| [`MessageCallbackInfo`](internal_.MessageCallbackInfo.md)

#### Defined in

[adapter/src/lib/_Types.ts:349](https://github.com/ioBroker/ioBroker.js-controller/blob/40736237/packages/adapter/src/lib/_Types.ts#L349)

___

### command

• **command**: `string`

#### Defined in

[adapter/src/lib/_Types.ts:347](https://github.com/ioBroker/ioBroker.js-controller/blob/40736237/packages/adapter/src/lib/_Types.ts#L347)

___

### hostName

• **hostName**: ``null`` \| `string`

if null, send to all hosts

#### Defined in

[adapter/src/lib/_Types.ts:346](https://github.com/ioBroker/ioBroker.js-controller/blob/40736237/packages/adapter/src/lib/_Types.ts#L346)

___

### message

• **message**: `any`

#### Defined in

[adapter/src/lib/_Types.ts:348](https://github.com/ioBroker/ioBroker.js-controller/blob/40736237/packages/adapter/src/lib/_Types.ts#L348)
