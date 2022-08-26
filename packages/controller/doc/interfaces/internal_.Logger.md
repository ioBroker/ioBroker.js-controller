[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Logger

# Interface: Logger

[<internal>](../modules/internal_.md).Logger

## Hierarchy

- [`Transform`](../classes/internal_.Transform.md)

  ↳ **`Logger`**

## Table of contents

### Constructors

- [constructor](internal_.Logger.md#constructor)

### Properties

- [alert](internal_.Logger.md#alert)
- [allowHalfOpen](internal_.Logger.md#allowhalfopen)
- [crit](internal_.Logger.md#crit)
- [data](internal_.Logger.md#data)
- [debug](internal_.Logger.md#debug)
- [defaultMeta](internal_.Logger.md#defaultmeta)
- [destroyed](internal_.Logger.md#destroyed)
- [emerg](internal_.Logger.md#emerg)
- [error](internal_.Logger.md#error)
- [exceptions](internal_.Logger.md#exceptions)
- [exitOnError](internal_.Logger.md#exitonerror)
- [format](internal_.Logger.md#format)
- [help](internal_.Logger.md#help)
- [http](internal_.Logger.md#http)
- [info](internal_.Logger.md#info)
- [input](internal_.Logger.md#input)
- [level](internal_.Logger.md#level)
- [levels](internal_.Logger.md#levels)
- [log](internal_.Logger.md#log)
- [notice](internal_.Logger.md#notice)
- [profilers](internal_.Logger.md#profilers)
- [prompt](internal_.Logger.md#prompt)
- [readable](internal_.Logger.md#readable)
- [readableAborted](internal_.Logger.md#readableaborted)
- [readableDidRead](internal_.Logger.md#readabledidread)
- [readableEncoding](internal_.Logger.md#readableencoding)
- [readableEnded](internal_.Logger.md#readableended)
- [readableFlowing](internal_.Logger.md#readableflowing)
- [readableHighWaterMark](internal_.Logger.md#readablehighwatermark)
- [readableLength](internal_.Logger.md#readablelength)
- [readableObjectMode](internal_.Logger.md#readableobjectmode)
- [rejections](internal_.Logger.md#rejections)
- [silent](internal_.Logger.md#silent)
- [silly](internal_.Logger.md#silly)
- [transports](internal_.Logger.md#transports)
- [verbose](internal_.Logger.md#verbose)
- [warn](internal_.Logger.md#warn)
- [warning](internal_.Logger.md#warning)
- [writable](internal_.Logger.md#writable)
- [writableCorked](internal_.Logger.md#writablecorked)
- [writableEnded](internal_.Logger.md#writableended)
- [writableFinished](internal_.Logger.md#writablefinished)
- [writableHighWaterMark](internal_.Logger.md#writablehighwatermark)
- [writableLength](internal_.Logger.md#writablelength)
- [writableObjectMode](internal_.Logger.md#writableobjectmode)

### Methods

- [[asyncIterator]](internal_.Logger.md#[asynciterator])
- [\_construct](internal_.Logger.md#_construct)
- [\_destroy](internal_.Logger.md#_destroy)
- [\_final](internal_.Logger.md#_final)
- [\_flush](internal_.Logger.md#_flush)
- [\_read](internal_.Logger.md#_read)
- [\_transform](internal_.Logger.md#_transform)
- [\_write](internal_.Logger.md#_write)
- [\_writev](internal_.Logger.md#_writev)
- [add](internal_.Logger.md#add)
- [addListener](internal_.Logger.md#addlistener)
- [child](internal_.Logger.md#child)
- [clear](internal_.Logger.md#clear)
- [close](internal_.Logger.md#close)
- [configure](internal_.Logger.md#configure)
- [cork](internal_.Logger.md#cork)
- [destroy](internal_.Logger.md#destroy)
- [emit](internal_.Logger.md#emit)
- [end](internal_.Logger.md#end)
- [eventNames](internal_.Logger.md#eventnames)
- [getMaxListeners](internal_.Logger.md#getmaxlisteners)
- [isDebugEnabled](internal_.Logger.md#isdebugenabled)
- [isErrorEnabled](internal_.Logger.md#iserrorenabled)
- [isInfoEnabled](internal_.Logger.md#isinfoenabled)
- [isLevelEnabled](internal_.Logger.md#islevelenabled)
- [isPaused](internal_.Logger.md#ispaused)
- [isSillyEnabled](internal_.Logger.md#issillyenabled)
- [isVerboseEnabled](internal_.Logger.md#isverboseenabled)
- [isWarnEnabled](internal_.Logger.md#iswarnenabled)
- [listenerCount](internal_.Logger.md#listenercount)
- [listeners](internal_.Logger.md#listeners)
- [off](internal_.Logger.md#off)
- [on](internal_.Logger.md#on)
- [once](internal_.Logger.md#once)
- [pause](internal_.Logger.md#pause)
- [pipe](internal_.Logger.md#pipe)
- [prependListener](internal_.Logger.md#prependlistener)
- [prependOnceListener](internal_.Logger.md#prependoncelistener)
- [profile](internal_.Logger.md#profile)
- [push](internal_.Logger.md#push)
- [query](internal_.Logger.md#query)
- [rawListeners](internal_.Logger.md#rawlisteners)
- [read](internal_.Logger.md#read)
- [remove](internal_.Logger.md#remove)
- [removeAllListeners](internal_.Logger.md#removealllisteners)
- [removeListener](internal_.Logger.md#removelistener)
- [resume](internal_.Logger.md#resume)
- [setDefaultEncoding](internal_.Logger.md#setdefaultencoding)
- [setEncoding](internal_.Logger.md#setencoding)
- [setMaxListeners](internal_.Logger.md#setmaxlisteners)
- [startTimer](internal_.Logger.md#starttimer)
- [stream](internal_.Logger.md#stream)
- [uncork](internal_.Logger.md#uncork)
- [unpipe](internal_.Logger.md#unpipe)
- [unshift](internal_.Logger.md#unshift)
- [wrap](internal_.Logger.md#wrap)
- [write](internal_.Logger.md#write)

## Constructors

### constructor

• **new Logger**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`LoggerOptions`](internal_.LoggerOptions.md) |

#### Inherited from

[Transform](../classes/internal_.Transform.md).[constructor](../classes/internal_.Transform.md#constructor)

#### Defined in

node_modules/winston/index.d.ts:162

## Properties

### alert

• **alert**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:139

___

### allowHalfOpen

• **allowHalfOpen**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[allowHalfOpen](../classes/internal_.Transform.md#allowhalfopen)

#### Defined in

node_modules/@types/node/stream.d.ts:819

___

### crit

• **crit**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:140

___

### data

• **data**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:128

___

### debug

• **debug**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:130

___

### defaultMeta

• `Optional` **defaultMeta**: `any`

#### Defined in

node_modules/winston/index.d.ts:116

___

### destroyed

• **destroyed**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[destroyed](../classes/internal_.Transform.md#destroyed)

#### Defined in

node_modules/@types/node/stream.d.ts:115

___

### emerg

• **emerg**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:138

___

### error

• **error**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:125

___

### exceptions

• **exceptions**: [`ExceptionHandler`](../modules/internal_.md#exceptionhandler)

#### Defined in

node_modules/winston/index.d.ts:112

___

### exitOnError

• **exitOnError**: `boolean` \| `Function`

#### Defined in

node_modules/winston/index.d.ts:115

___

### format

• **format**: [`Format`](../classes/internal_.Format.md)

#### Defined in

node_modules/winston/index.d.ts:108

___

### help

• **help**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:127

___

### http

• **http**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:132

___

### info

• **info**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:129

___

### input

• **input**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:134

___

### level

• **level**: `string`

#### Defined in

node_modules/winston/index.d.ts:110

___

### levels

• **levels**: [`AbstractConfigSetLevels`](internal_.AbstractConfigSetLevels.md)

#### Defined in

node_modules/winston/index.d.ts:109

___

### log

• **log**: [`LogMethod`](internal_.LogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:118

___

### notice

• **notice**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:142

___

### profilers

• **profilers**: `object`

#### Defined in

node_modules/winston/index.d.ts:114

___

### prompt

• **prompt**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:131

___

### readable

• **readable**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[readable](../classes/internal_.Transform.md#readable)

#### Defined in

node_modules/@types/node/stream.d.ts:71

___

### readableAborted

• `Readonly` **readableAborted**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[readableAborted](../classes/internal_.Transform.md#readableaborted)

#### Defined in

node_modules/@types/node/stream.d.ts:65

___

### readableDidRead

• `Readonly` **readableDidRead**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[readableDidRead](../classes/internal_.Transform.md#readabledidread)

#### Defined in

node_modules/@types/node/stream.d.ts:77

___

### readableEncoding

• `Readonly` **readableEncoding**: ``null`` \| [`BufferEncoding`](../modules/internal_.md#bufferencoding)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[readableEncoding](../classes/internal_.Transform.md#readableencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:82

___

### readableEnded

• `Readonly` **readableEnded**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[readableEnded](../classes/internal_.Transform.md#readableended)

#### Defined in

node_modules/@types/node/stream.d.ts:87

___

### readableFlowing

• `Readonly` **readableFlowing**: ``null`` \| `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[readableFlowing](../classes/internal_.Transform.md#readableflowing)

#### Defined in

node_modules/@types/node/stream.d.ts:93

___

### readableHighWaterMark

• `Readonly` **readableHighWaterMark**: `number`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[readableHighWaterMark](../classes/internal_.Transform.md#readablehighwatermark)

#### Defined in

node_modules/@types/node/stream.d.ts:98

___

### readableLength

• `Readonly` **readableLength**: `number`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[readableLength](../classes/internal_.Transform.md#readablelength)

#### Defined in

node_modules/@types/node/stream.d.ts:105

___

### readableObjectMode

• `Readonly` **readableObjectMode**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[readableObjectMode](../classes/internal_.Transform.md#readableobjectmode)

#### Defined in

node_modules/@types/node/stream.d.ts:110

___

### rejections

• **rejections**: [`RejectionHandler`](../modules/internal_.md#rejectionhandler)

#### Defined in

node_modules/winston/index.d.ts:113

___

### silent

• **silent**: `boolean`

#### Defined in

node_modules/winston/index.d.ts:107

___

### silly

• **silly**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:135

___

### transports

• **transports**: `TransportStream`[]

#### Defined in

node_modules/winston/index.d.ts:111

___

### verbose

• **verbose**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:133

___

### warn

• **warn**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:126

___

### warning

• **warning**: [`LeveledLogMethod`](internal_.LeveledLogMethod.md)

#### Defined in

node_modules/winston/index.d.ts:141

___

### writable

• `Readonly` **writable**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[writable](../classes/internal_.Transform.md#writable)

#### Defined in

node_modules/@types/node/stream.d.ts:803

___

### writableCorked

• `Readonly` **writableCorked**: `number`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[writableCorked](../classes/internal_.Transform.md#writablecorked)

#### Defined in

node_modules/@types/node/stream.d.ts:809

___

### writableEnded

• `Readonly` **writableEnded**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[writableEnded](../classes/internal_.Transform.md#writableended)

#### Defined in

node_modules/@types/node/stream.d.ts:804

___

### writableFinished

• `Readonly` **writableFinished**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[writableFinished](../classes/internal_.Transform.md#writablefinished)

#### Defined in

node_modules/@types/node/stream.d.ts:805

___

### writableHighWaterMark

• `Readonly` **writableHighWaterMark**: `number`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[writableHighWaterMark](../classes/internal_.Transform.md#writablehighwatermark)

#### Defined in

node_modules/@types/node/stream.d.ts:806

___

### writableLength

• `Readonly` **writableLength**: `number`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[writableLength](../classes/internal_.Transform.md#writablelength)

#### Defined in

node_modules/@types/node/stream.d.ts:807

___

### writableObjectMode

• `Readonly` **writableObjectMode**: `boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[writableObjectMode](../classes/internal_.Transform.md#writableobjectmode)

#### Defined in

node_modules/@types/node/stream.d.ts:808

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): [`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)<`any`\>

#### Returns

[`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)<`any`\>

#### Inherited from

[Transform](../classes/internal_.Transform.md).[[asyncIterator]](../classes/internal_.Transform.md#[asynciterator])

#### Defined in

node_modules/@types/node/stream.d.ts:479

___

### \_construct

▸ `Optional` **_construct**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[_construct](../classes/internal_.Transform.md#_construct)

#### Defined in

node_modules/@types/node/stream.d.ts:117

___

### \_destroy

▸ **_destroy**(`error`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | ``null`` \| [`Error`](../modules/internal_.md#error) |
| `callback` | (`error`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[_destroy](../classes/internal_.Transform.md#_destroy)

#### Defined in

node_modules/@types/node/stream.d.ts:851

___

### \_final

▸ **_final**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[_final](../classes/internal_.Transform.md#_final)

#### Defined in

node_modules/@types/node/stream.d.ts:852

___

### \_flush

▸ **_flush**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`TransformCallback`](../modules/internal_.md#transformcallback) |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[_flush](../classes/internal_.Transform.md#_flush)

#### Defined in

node_modules/@types/node/stream.d.ts:894

___

### \_read

▸ **_read**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[_read](../classes/internal_.Transform.md#_read)

#### Defined in

node_modules/@types/node/stream.d.ts:118

___

### \_transform

▸ **_transform**(`chunk`, `encoding`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `callback` | [`TransformCallback`](../modules/internal_.md#transformcallback) |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[_transform](../classes/internal_.Transform.md#_transform)

#### Defined in

node_modules/@types/node/stream.d.ts:893

___

### \_write

▸ **_write**(`chunk`, `encoding`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[_write](../classes/internal_.Transform.md#_write)

#### Defined in

node_modules/@types/node/stream.d.ts:843

___

### \_writev

▸ `Optional` **_writev**(`chunks`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunks` | { `chunk`: `any` ; `encoding`: [`BufferEncoding`](../modules/internal_.md#bufferencoding)  }[] |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[_writev](../classes/internal_.Transform.md#_writev)

#### Defined in

node_modules/@types/node/stream.d.ts:844

___

### add

▸ **add**(`transport`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transport` | `TransportStream` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:119

___

### addListener

▸ **addListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[addListener](../classes/internal_.Transform.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:423

▸ **addListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[addListener](../classes/internal_.Transform.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:424

▸ **addListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[addListener](../classes/internal_.Transform.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:425

▸ **addListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[addListener](../classes/internal_.Transform.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:426

▸ **addListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[addListener](../classes/internal_.Transform.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:427

▸ **addListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[addListener](../classes/internal_.Transform.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:428

▸ **addListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[addListener](../classes/internal_.Transform.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:429

▸ **addListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[addListener](../classes/internal_.Transform.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:430

___

### child

▸ **child**(`options`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Object`](../modules/internal_.md#object-1) |

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:152

___

### clear

▸ **clear**(): [`Logger`](internal_.Logger.md)

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:121

___

### close

▸ **close**(): [`Logger`](internal_.Logger.md)

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:122

___

### configure

▸ **configure**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`LoggerOptions`](internal_.LoggerOptions.md) |

#### Returns

`void`

#### Defined in

node_modules/winston/index.d.ts:150

___

### cork

▸ **cork**(): `void`

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[cork](../classes/internal_.Transform.md#cork)

#### Defined in

node_modules/@types/node/stream.d.ts:859

___

### destroy

▸ **destroy**(`error?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error?` | [`Error`](../modules/internal_.md#error) |  |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[destroy](../classes/internal_.Transform.md#destroy)

#### Defined in

node_modules/@types/node/stream.d.ts:411

___

### emit

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[emit](../classes/internal_.Transform.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:431

▸ **emit**(`event`, `chunk`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `chunk` | `any` |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[emit](../classes/internal_.Transform.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:432

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[emit](../classes/internal_.Transform.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:433

▸ **emit**(`event`, `err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `err` | [`Error`](../modules/internal_.md#error) |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[emit](../classes/internal_.Transform.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:434

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[emit](../classes/internal_.Transform.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:435

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[emit](../classes/internal_.Transform.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:436

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[emit](../classes/internal_.Transform.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:437

▸ **emit**(`event`, ...`args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[emit](../classes/internal_.Transform.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:438

___

### end

▸ **end**(`cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[end](../classes/internal_.Transform.md#end)

#### Defined in

node_modules/@types/node/stream.d.ts:856

▸ **end**(`chunk`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[end](../classes/internal_.Transform.md#end)

#### Defined in

node_modules/@types/node/stream.d.ts:857

▸ **end**(`chunk`, `encoding?`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[end](../classes/internal_.Transform.md#end)

#### Defined in

node_modules/@types/node/stream.d.ts:858

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[Transform](../classes/internal_.Transform.md).[eventNames](../classes/internal_.Transform.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[getMaxListeners](../classes/internal_.Transform.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### isDebugEnabled

▸ **isDebugEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/winston/index.d.ts:159

___

### isErrorEnabled

▸ **isErrorEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/winston/index.d.ts:155

___

### isInfoEnabled

▸ **isInfoEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/winston/index.d.ts:157

___

### isLevelEnabled

▸ **isLevelEnabled**(`level`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `string` |

#### Returns

`boolean`

#### Defined in

node_modules/winston/index.d.ts:154

___

### isPaused

▸ **isPaused**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[isPaused](../classes/internal_.Transform.md#ispaused)

#### Defined in

node_modules/@types/node/stream.d.ts:278

___

### isSillyEnabled

▸ **isSillyEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/winston/index.d.ts:160

___

### isVerboseEnabled

▸ **isVerboseEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/winston/index.d.ts:158

___

### isWarnEnabled

▸ **isWarnEnabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/winston/index.d.ts:156

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |

#### Returns

`number`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[listenerCount](../classes/internal_.Transform.md#listenercount)

#### Defined in

node_modules/@types/node/events.d.ts:561

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[Transform](../classes/internal_.Transform.md).[listeners](../classes/internal_.Transform.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[off](../classes/internal_.Transform.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[on](../classes/internal_.Transform.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:439

▸ **on**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[on](../classes/internal_.Transform.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:440

▸ **on**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[on](../classes/internal_.Transform.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:441

▸ **on**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[on](../classes/internal_.Transform.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:442

▸ **on**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[on](../classes/internal_.Transform.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:443

▸ **on**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[on](../classes/internal_.Transform.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:444

▸ **on**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[on](../classes/internal_.Transform.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:445

▸ **on**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[on](../classes/internal_.Transform.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:446

___

### once

▸ **once**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[once](../classes/internal_.Transform.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:447

▸ **once**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[once](../classes/internal_.Transform.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:448

▸ **once**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[once](../classes/internal_.Transform.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:449

▸ **once**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[once](../classes/internal_.Transform.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:450

▸ **once**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[once](../classes/internal_.Transform.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:451

▸ **once**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[once](../classes/internal_.Transform.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:452

▸ **once**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[once](../classes/internal_.Transform.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:453

▸ **once**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[once](../classes/internal_.Transform.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:454

___

### pause

▸ **pause**(): [`Logger`](internal_.Logger.md)

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[pause](../classes/internal_.Transform.md#pause)

#### Defined in

node_modules/@types/node/stream.d.ts:242

___

### pipe

▸ **pipe**<`T`\>(`destination`, `options?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`WritableStream`](internal_.WritableStream.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination` | `T` |
| `options?` | `Object` |
| `options.end?` | `boolean` |

#### Returns

`T`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[pipe](../classes/internal_.Transform.md#pipe)

#### Defined in

node_modules/@types/node/stream.d.ts:24

___

### prependListener

▸ **prependListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependListener](../classes/internal_.Transform.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:455

▸ **prependListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependListener](../classes/internal_.Transform.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:456

▸ **prependListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependListener](../classes/internal_.Transform.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:457

▸ **prependListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependListener](../classes/internal_.Transform.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:458

▸ **prependListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependListener](../classes/internal_.Transform.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:459

▸ **prependListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependListener](../classes/internal_.Transform.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:460

▸ **prependListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependListener](../classes/internal_.Transform.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:461

▸ **prependListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependListener](../classes/internal_.Transform.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:462

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependOnceListener](../classes/internal_.Transform.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:463

▸ **prependOnceListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependOnceListener](../classes/internal_.Transform.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:464

▸ **prependOnceListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependOnceListener](../classes/internal_.Transform.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:465

▸ **prependOnceListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependOnceListener](../classes/internal_.Transform.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:466

▸ **prependOnceListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependOnceListener](../classes/internal_.Transform.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:467

▸ **prependOnceListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependOnceListener](../classes/internal_.Transform.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:468

▸ **prependOnceListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependOnceListener](../classes/internal_.Transform.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:469

▸ **prependOnceListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[prependOnceListener](../classes/internal_.Transform.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:470

___

### profile

▸ **profile**(`id`, `meta?`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `number` |
| `meta?` | [`LogEntry`](internal_.LogEntry.md) |

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:148

___

### push

▸ **push**(`chunk`, `encoding?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[push](../classes/internal_.Transform.md#push)

#### Defined in

node_modules/@types/node/stream.d.ts:398

___

### query

▸ **query**(`options?`, `callback?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`QueryOptions`](internal_.QueryOptions.md) |
| `callback?` | (`err`: [`Error`](../modules/internal_.md#error), `results`: `any`) => `void` |

#### Returns

`any`

#### Defined in

node_modules/winston/index.d.ts:144

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[Transform](../classes/internal_.Transform.md).[rawListeners](../classes/internal_.Transform.md#rawlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### read

▸ **read**(`size?`): `any`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size?` | `number` |  |

#### Returns

`any`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[read](../classes/internal_.Transform.md#read)

#### Defined in

node_modules/@types/node/stream.d.ts:195

___

### remove

▸ **remove**(`transport`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transport` | `TransportStream` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Defined in

node_modules/winston/index.d.ts:120

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[removeAllListeners](../classes/internal_.Transform.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[removeListener](../classes/internal_.Transform.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:471

▸ **removeListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[removeListener](../classes/internal_.Transform.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:472

▸ **removeListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[removeListener](../classes/internal_.Transform.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:473

▸ **removeListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[removeListener](../classes/internal_.Transform.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:474

▸ **removeListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[removeListener](../classes/internal_.Transform.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:475

▸ **removeListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[removeListener](../classes/internal_.Transform.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:476

▸ **removeListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[removeListener](../classes/internal_.Transform.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:477

▸ **removeListener**(`event`, `listener`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[removeListener](../classes/internal_.Transform.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:478

___

### resume

▸ **resume**(): [`Logger`](internal_.Logger.md)

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[resume](../classes/internal_.Transform.md#resume)

#### Defined in

node_modules/@types/node/stream.d.ts:261

___

### setDefaultEncoding

▸ **setDefaultEncoding**(`encoding`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[setDefaultEncoding](../classes/internal_.Transform.md#setdefaultencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:855

___

### setEncoding

▸ **setEncoding**(`encoding`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |  |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[setEncoding](../classes/internal_.Transform.md#setencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:220

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[setMaxListeners](../classes/internal_.Transform.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### startTimer

▸ **startTimer**(): [`Profiler`](internal_.Profiler.md)

#### Returns

[`Profiler`](internal_.Profiler.md)

#### Defined in

node_modules/winston/index.d.ts:147

___

### stream

▸ **stream**(`options?`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `any` |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Defined in

node_modules/winston/index.d.ts:145

___

### uncork

▸ **uncork**(): `void`

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[uncork](../classes/internal_.Transform.md#uncork)

#### Defined in

node_modules/@types/node/stream.d.ts:860

___

### unpipe

▸ **unpipe**(`destination?`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination?` | [`WritableStream`](internal_.WritableStream.md) |  |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[unpipe](../classes/internal_.Transform.md#unpipe)

#### Defined in

node_modules/@types/node/stream.d.ts:305

___

### unshift

▸ **unshift**(`chunk`, `encoding?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chunk` | `any` |  |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |  |

#### Returns

`void`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[unshift](../classes/internal_.Transform.md#unshift)

#### Defined in

node_modules/@types/node/stream.d.ts:371

___

### wrap

▸ **wrap**(`stream`): [`Logger`](internal_.Logger.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`ReadableStream`](internal_.ReadableStream.md) |  |

#### Returns

[`Logger`](internal_.Logger.md)

#### Inherited from

[Transform](../classes/internal_.Transform.md).[wrap](../classes/internal_.Transform.md#wrap)

#### Defined in

node_modules/@types/node/stream.d.ts:397

___

### write

▸ **write**(`chunk`, `encoding?`, `cb?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `cb?` | (`error`: `undefined` \| ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[write](../classes/internal_.Transform.md#write)

#### Defined in

node_modules/@types/node/stream.d.ts:853

▸ **write**(`chunk`, `cb?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `cb?` | (`error`: `undefined` \| ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`boolean`

#### Inherited from

[Transform](../classes/internal_.Transform.md).[write](../classes/internal_.Transform.md#write)

#### Defined in

node_modules/@types/node/stream.d.ts:854
