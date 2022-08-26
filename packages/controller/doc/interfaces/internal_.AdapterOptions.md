[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / AdapterOptions

# Interface: AdapterOptions

[<internal>](../modules/internal_.md).AdapterOptions

## Table of contents

### Properties

- [compact](internal_.AdapterOptions.md#compact)
- [compactInstance](internal_.AdapterOptions.md#compactinstance)
- [config](internal_.AdapterOptions.md#config)
- [dirname](internal_.AdapterOptions.md#dirname)
- [error](internal_.AdapterOptions.md#error)
- [fileChange](internal_.AdapterOptions.md#filechange)
- [instance](internal_.AdapterOptions.md#instance)
- [logTransporter](internal_.AdapterOptions.md#logtransporter)
- [message](internal_.AdapterOptions.md#message)
- [name](internal_.AdapterOptions.md#name)
- [objectChange](internal_.AdapterOptions.md#objectchange)
- [objects](internal_.AdapterOptions.md#objects)
- [ready](internal_.AdapterOptions.md#ready)
- [stateChange](internal_.AdapterOptions.md#statechange)
- [states](internal_.AdapterOptions.md#states)
- [strictObjectChecks](internal_.AdapterOptions.md#strictobjectchecks)
- [subscribable](internal_.AdapterOptions.md#subscribable)
- [systemConfig](internal_.AdapterOptions.md#systemconfig)
- [unload](internal_.AdapterOptions.md#unload)
- [useFormatDate](internal_.AdapterOptions.md#useformatdate)

### Methods

- [reconnect](internal_.AdapterOptions.md#reconnect)
- [subscribesChange](internal_.AdapterOptions.md#subscribeschange)

## Properties

### compact

• `Optional` **compact**: `boolean`

#### Defined in

[packages/adapter/src/lib/_Types.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L25)

___

### compactInstance

• `Optional` **compactInstance**: `number`

#### Defined in

[packages/adapter/src/lib/_Types.ts:13](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L13)

___

### config

• `Optional` **config**: [`AdapterOptionsConfig`](internal_.AdapterOptionsConfig.md)

#### Defined in

[packages/adapter/src/lib/_Types.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L27)

___

### dirname

• `Optional` **dirname**: `string`

#### Defined in

[packages/adapter/src/lib/_Types.ts:21](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L21)

___

### error

• `Optional` **error**: [`ErrorHandler`](../modules/internal_.md#errorhandler)

#### Defined in

[packages/adapter/src/lib/_Types.ts:47](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L47)

___

### fileChange

• `Optional` **fileChange**: [`ChangeFileFunction`](../modules/internal_.md#changefilefunction)

#### Defined in

[packages/adapter/src/lib/_Types.ts:37](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L37)

___

### instance

• `Optional` **instance**: `number`

#### Defined in

[packages/adapter/src/lib/_Types.ts:19](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L19)

___

### logTransporter

• `Optional` **logTransporter**: `boolean`

#### Defined in

[packages/adapter/src/lib/_Types.ts:7](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L7)

___

### message

• `Optional` **message**: [`MessageHandler`](../modules/internal_.md#messagehandler)

#### Defined in

[packages/adapter/src/lib/_Types.ts:39](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L39)

___

### name

• **name**: `string`

#### Defined in

[packages/adapter/src/lib/_Types.ts:29](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L29)

___

### objectChange

• `Optional` **objectChange**: [`ObjectChangeHandler`](../modules/internal_.md#objectchangehandler)

#### Defined in

[packages/adapter/src/lib/_Types.ts:33](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L33)

___

### objects

• `Optional` **objects**: `boolean`

#### Defined in

[packages/adapter/src/lib/_Types.ts:17](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L17)

___

### ready

• `Optional` **ready**: [`ReadyHandler`](../modules/internal_.md#readyhandler)

#### Defined in

[packages/adapter/src/lib/_Types.ts:43](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L43)

___

### stateChange

• `Optional` **stateChange**: [`StateChangeHandler`](../modules/internal_.md#statechangehandler)

#### Defined in

[packages/adapter/src/lib/_Types.ts:35](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L35)

___

### states

• `Optional` **states**: `boolean`

#### Defined in

[packages/adapter/src/lib/_Types.ts:15](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L15)

___

### strictObjectChecks

• `Optional` **strictObjectChecks**: `boolean`

#### Defined in

[packages/adapter/src/lib/_Types.ts:23](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L23)

___

### subscribable

• `Optional` **subscribable**: `boolean`

#### Defined in

[packages/adapter/src/lib/_Types.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L11)

___

### systemConfig

• `Optional` **systemConfig**: `boolean`

#### Defined in

[packages/adapter/src/lib/_Types.ts:31](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L31)

___

### unload

• `Optional` **unload**: [`UnloadHandler`](../modules/internal_.md#unloadhandler)

#### Defined in

[packages/adapter/src/lib/_Types.ts:41](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L41)

___

### useFormatDate

• `Optional` **useFormatDate**: `boolean`

#### Defined in

[packages/adapter/src/lib/_Types.ts:9](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L9)

## Methods

### reconnect

▸ `Optional` **reconnect**(): [`MaybePromise`](../modules/internal_.md#maybepromise)

#### Returns

[`MaybePromise`](../modules/internal_.md#maybepromise)

#### Defined in

[packages/adapter/src/lib/_Types.ts:45](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L45)

___

### subscribesChange

▸ `Optional` **subscribesChange**(`subs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subs` | [`Record`](../modules/internal_.md#record)<`string`, { `regex`: `RegExp`  }\> |

#### Returns

`void`

#### Defined in

[packages/adapter/src/lib/_Types.ts:5](https://github.com/ioBroker/ioBroker.js-controller/blob/eaf12470/packages/adapter/src/lib/_Types.ts#L5)
