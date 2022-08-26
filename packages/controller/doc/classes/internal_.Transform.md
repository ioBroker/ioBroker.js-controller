[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Transform

# Class: Transform

[<internal>](../modules/internal_.md).Transform

## Hierarchy

- [`Duplex`](internal_.Duplex.md)

  ↳ **`Transform`**

  ↳↳ [`Logger`](../interfaces/internal_.Logger.md)

  ↳↳ [`PassThrough`](internal_.internal.PassThrough.md)

## Table of contents

### Constructors

- [constructor](internal_.Transform.md#constructor)

### Properties

- [allowHalfOpen](internal_.Transform.md#allowhalfopen)
- [destroyed](internal_.Transform.md#destroyed)
- [readable](internal_.Transform.md#readable)
- [readableAborted](internal_.Transform.md#readableaborted)
- [readableDidRead](internal_.Transform.md#readabledidread)
- [readableEncoding](internal_.Transform.md#readableencoding)
- [readableEnded](internal_.Transform.md#readableended)
- [readableFlowing](internal_.Transform.md#readableflowing)
- [readableHighWaterMark](internal_.Transform.md#readablehighwatermark)
- [readableLength](internal_.Transform.md#readablelength)
- [readableObjectMode](internal_.Transform.md#readableobjectmode)
- [writable](internal_.Transform.md#writable)
- [writableCorked](internal_.Transform.md#writablecorked)
- [writableEnded](internal_.Transform.md#writableended)
- [writableFinished](internal_.Transform.md#writablefinished)
- [writableHighWaterMark](internal_.Transform.md#writablehighwatermark)
- [writableLength](internal_.Transform.md#writablelength)
- [writableObjectMode](internal_.Transform.md#writableobjectmode)
- [captureRejectionSymbol](internal_.Transform.md#capturerejectionsymbol)
- [captureRejections](internal_.Transform.md#capturerejections)
- [defaultMaxListeners](internal_.Transform.md#defaultmaxlisteners)
- [errorMonitor](internal_.Transform.md#errormonitor)

### Methods

- [[asyncIterator]](internal_.Transform.md#[asynciterator])
- [\_construct](internal_.Transform.md#_construct)
- [\_destroy](internal_.Transform.md#_destroy)
- [\_final](internal_.Transform.md#_final)
- [\_flush](internal_.Transform.md#_flush)
- [\_read](internal_.Transform.md#_read)
- [\_transform](internal_.Transform.md#_transform)
- [\_write](internal_.Transform.md#_write)
- [\_writev](internal_.Transform.md#_writev)
- [addListener](internal_.Transform.md#addlistener)
- [cork](internal_.Transform.md#cork)
- [destroy](internal_.Transform.md#destroy)
- [emit](internal_.Transform.md#emit)
- [end](internal_.Transform.md#end)
- [eventNames](internal_.Transform.md#eventnames)
- [getMaxListeners](internal_.Transform.md#getmaxlisteners)
- [isPaused](internal_.Transform.md#ispaused)
- [listenerCount](internal_.Transform.md#listenercount)
- [listeners](internal_.Transform.md#listeners)
- [off](internal_.Transform.md#off)
- [on](internal_.Transform.md#on)
- [once](internal_.Transform.md#once)
- [pause](internal_.Transform.md#pause)
- [pipe](internal_.Transform.md#pipe)
- [prependListener](internal_.Transform.md#prependlistener)
- [prependOnceListener](internal_.Transform.md#prependoncelistener)
- [push](internal_.Transform.md#push)
- [rawListeners](internal_.Transform.md#rawlisteners)
- [read](internal_.Transform.md#read)
- [removeAllListeners](internal_.Transform.md#removealllisteners)
- [removeListener](internal_.Transform.md#removelistener)
- [resume](internal_.Transform.md#resume)
- [setDefaultEncoding](internal_.Transform.md#setdefaultencoding)
- [setEncoding](internal_.Transform.md#setencoding)
- [setMaxListeners](internal_.Transform.md#setmaxlisteners)
- [uncork](internal_.Transform.md#uncork)
- [unpipe](internal_.Transform.md#unpipe)
- [unshift](internal_.Transform.md#unshift)
- [wrap](internal_.Transform.md#wrap)
- [write](internal_.Transform.md#write)
- [from](internal_.Transform.md#from)
- [getEventListeners](internal_.Transform.md#geteventlisteners)
- [isDisturbed](internal_.Transform.md#isdisturbed)
- [listenerCount](internal_.Transform.md#listenercount-1)
- [on](internal_.Transform.md#on-1)
- [once](internal_.Transform.md#once-1)

## Constructors

### constructor

• **new Transform**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`TransformOptions`](../interfaces/internal_.TransformOptions.md) |

#### Overrides

[Duplex](internal_.Duplex.md).[constructor](internal_.Duplex.md#constructor)

#### Defined in

node_modules/@types/node/stream.d.ts:892

## Properties

### allowHalfOpen

• **allowHalfOpen**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[allowHalfOpen](internal_.Duplex.md#allowhalfopen)

#### Defined in

node_modules/@types/node/stream.d.ts:819

___

### destroyed

• **destroyed**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[destroyed](internal_.Duplex.md#destroyed)

#### Defined in

node_modules/@types/node/stream.d.ts:115

___

### readable

• **readable**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[readable](internal_.Duplex.md#readable)

#### Defined in

node_modules/@types/node/stream.d.ts:71

___

### readableAborted

• `Readonly` **readableAborted**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[readableAborted](internal_.Duplex.md#readableaborted)

#### Defined in

node_modules/@types/node/stream.d.ts:65

___

### readableDidRead

• `Readonly` **readableDidRead**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[readableDidRead](internal_.Duplex.md#readabledidread)

#### Defined in

node_modules/@types/node/stream.d.ts:77

___

### readableEncoding

• `Readonly` **readableEncoding**: ``null`` \| [`BufferEncoding`](../modules/internal_.md#bufferencoding)

#### Inherited from

[Duplex](internal_.Duplex.md).[readableEncoding](internal_.Duplex.md#readableencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:82

___

### readableEnded

• `Readonly` **readableEnded**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[readableEnded](internal_.Duplex.md#readableended)

#### Defined in

node_modules/@types/node/stream.d.ts:87

___

### readableFlowing

• `Readonly` **readableFlowing**: ``null`` \| `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[readableFlowing](internal_.Duplex.md#readableflowing)

#### Defined in

node_modules/@types/node/stream.d.ts:93

___

### readableHighWaterMark

• `Readonly` **readableHighWaterMark**: `number`

#### Inherited from

[Duplex](internal_.Duplex.md).[readableHighWaterMark](internal_.Duplex.md#readablehighwatermark)

#### Defined in

node_modules/@types/node/stream.d.ts:98

___

### readableLength

• `Readonly` **readableLength**: `number`

#### Inherited from

[Duplex](internal_.Duplex.md).[readableLength](internal_.Duplex.md#readablelength)

#### Defined in

node_modules/@types/node/stream.d.ts:105

___

### readableObjectMode

• `Readonly` **readableObjectMode**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[readableObjectMode](internal_.Duplex.md#readableobjectmode)

#### Defined in

node_modules/@types/node/stream.d.ts:110

___

### writable

• `Readonly` **writable**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[writable](internal_.Duplex.md#writable)

#### Defined in

node_modules/@types/node/stream.d.ts:803

___

### writableCorked

• `Readonly` **writableCorked**: `number`

#### Inherited from

[Duplex](internal_.Duplex.md).[writableCorked](internal_.Duplex.md#writablecorked)

#### Defined in

node_modules/@types/node/stream.d.ts:809

___

### writableEnded

• `Readonly` **writableEnded**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[writableEnded](internal_.Duplex.md#writableended)

#### Defined in

node_modules/@types/node/stream.d.ts:804

___

### writableFinished

• `Readonly` **writableFinished**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[writableFinished](internal_.Duplex.md#writablefinished)

#### Defined in

node_modules/@types/node/stream.d.ts:805

___

### writableHighWaterMark

• `Readonly` **writableHighWaterMark**: `number`

#### Inherited from

[Duplex](internal_.Duplex.md).[writableHighWaterMark](internal_.Duplex.md#writablehighwatermark)

#### Defined in

node_modules/@types/node/stream.d.ts:806

___

### writableLength

• `Readonly` **writableLength**: `number`

#### Inherited from

[Duplex](internal_.Duplex.md).[writableLength](internal_.Duplex.md#writablelength)

#### Defined in

node_modules/@types/node/stream.d.ts:807

___

### writableObjectMode

• `Readonly` **writableObjectMode**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[writableObjectMode](internal_.Duplex.md#writableobjectmode)

#### Defined in

node_modules/@types/node/stream.d.ts:808

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](AdapterClass.md#capturerejectionsymbol)

#### Inherited from

[Duplex](internal_.Duplex.md).[captureRejectionSymbol](internal_.Duplex.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[captureRejections](internal_.Duplex.md#capturerejections)

#### Defined in

node_modules/@types/node/events.d.ts:278

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

[Duplex](internal_.Duplex.md).[defaultMaxListeners](internal_.Duplex.md#defaultmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:279

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](AdapterClass.md#errormonitor)

#### Inherited from

[Duplex](internal_.Duplex.md).[errorMonitor](internal_.Duplex.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:272

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): [`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

#### Returns

[`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

#### Inherited from

[Duplex](internal_.Duplex.md).[[asyncIterator]](internal_.Duplex.md#[asynciterator])

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

[Duplex](internal_.Duplex.md).[_construct](internal_.Duplex.md#_construct)

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

[Duplex](internal_.Duplex.md).[_destroy](internal_.Duplex.md#_destroy)

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

[Duplex](internal_.Duplex.md).[_final](internal_.Duplex.md#_final)

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

[Duplex](internal_.Duplex.md).[_read](internal_.Duplex.md#_read)

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

[Duplex](internal_.Duplex.md).[_write](internal_.Duplex.md#_write)

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

[Duplex](internal_.Duplex.md).[_writev](internal_.Duplex.md#_writev)

#### Defined in

node_modules/@types/node/stream.d.ts:844

___

### addListener

▸ **addListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[addListener](internal_.Duplex.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:423

▸ **addListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[addListener](internal_.Duplex.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:424

▸ **addListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[addListener](internal_.Duplex.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:425

▸ **addListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[addListener](internal_.Duplex.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:426

▸ **addListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[addListener](internal_.Duplex.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:427

▸ **addListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[addListener](internal_.Duplex.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:428

▸ **addListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[addListener](internal_.Duplex.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:429

▸ **addListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[addListener](internal_.Duplex.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:430

___

### cork

▸ **cork**(): `void`

#### Returns

`void`

#### Inherited from

[Duplex](internal_.Duplex.md).[cork](internal_.Duplex.md#cork)

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

[Duplex](internal_.Duplex.md).[destroy](internal_.Duplex.md#destroy)

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

[Duplex](internal_.Duplex.md).[emit](internal_.Duplex.md#emit)

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

[Duplex](internal_.Duplex.md).[emit](internal_.Duplex.md#emit)

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

[Duplex](internal_.Duplex.md).[emit](internal_.Duplex.md#emit)

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

[Duplex](internal_.Duplex.md).[emit](internal_.Duplex.md#emit)

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

[Duplex](internal_.Duplex.md).[emit](internal_.Duplex.md#emit)

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

[Duplex](internal_.Duplex.md).[emit](internal_.Duplex.md#emit)

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

[Duplex](internal_.Duplex.md).[emit](internal_.Duplex.md#emit)

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

[Duplex](internal_.Duplex.md).[emit](internal_.Duplex.md#emit)

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

[Duplex](internal_.Duplex.md).[end](internal_.Duplex.md#end)

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

[Duplex](internal_.Duplex.md).[end](internal_.Duplex.md#end)

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

[Duplex](internal_.Duplex.md).[end](internal_.Duplex.md#end)

#### Defined in

node_modules/@types/node/stream.d.ts:858

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[Duplex](internal_.Duplex.md).[eventNames](internal_.Duplex.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

[Duplex](internal_.Duplex.md).[getMaxListeners](internal_.Duplex.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### isPaused

▸ **isPaused**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[isPaused](internal_.Duplex.md#ispaused)

#### Defined in

node_modules/@types/node/stream.d.ts:278

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

[Duplex](internal_.Duplex.md).[listenerCount](internal_.Duplex.md#listenercount)

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

[Duplex](internal_.Duplex.md).[listeners](internal_.Duplex.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[off](internal_.Duplex.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[on](internal_.Duplex.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:439

▸ **on**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[on](internal_.Duplex.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:440

▸ **on**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[on](internal_.Duplex.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:441

▸ **on**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[on](internal_.Duplex.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:442

▸ **on**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[on](internal_.Duplex.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:443

▸ **on**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[on](internal_.Duplex.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:444

▸ **on**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[on](internal_.Duplex.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:445

▸ **on**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[on](internal_.Duplex.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:446

___

### once

▸ **once**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[once](internal_.Duplex.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:447

▸ **once**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[once](internal_.Duplex.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:448

▸ **once**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[once](internal_.Duplex.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:449

▸ **once**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[once](internal_.Duplex.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:450

▸ **once**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[once](internal_.Duplex.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:451

▸ **once**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[once](internal_.Duplex.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:452

▸ **once**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[once](internal_.Duplex.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:453

▸ **once**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[once](internal_.Duplex.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:454

___

### pause

▸ **pause**(): [`Transform`](internal_.Transform.md)

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[pause](internal_.Duplex.md#pause)

#### Defined in

node_modules/@types/node/stream.d.ts:242

___

### pipe

▸ **pipe**<`T`\>(`destination`, `options?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`WritableStream`](../interfaces/internal_.WritableStream.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination` | `T` |
| `options?` | `Object` |
| `options.end?` | `boolean` |

#### Returns

`T`

#### Inherited from

[Duplex](internal_.Duplex.md).[pipe](internal_.Duplex.md#pipe)

#### Defined in

node_modules/@types/node/stream.d.ts:24

___

### prependListener

▸ **prependListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependListener](internal_.Duplex.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:455

▸ **prependListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependListener](internal_.Duplex.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:456

▸ **prependListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependListener](internal_.Duplex.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:457

▸ **prependListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependListener](internal_.Duplex.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:458

▸ **prependListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependListener](internal_.Duplex.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:459

▸ **prependListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependListener](internal_.Duplex.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:460

▸ **prependListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependListener](internal_.Duplex.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:461

▸ **prependListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependListener](internal_.Duplex.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:462

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependOnceListener](internal_.Duplex.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:463

▸ **prependOnceListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependOnceListener](internal_.Duplex.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:464

▸ **prependOnceListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependOnceListener](internal_.Duplex.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:465

▸ **prependOnceListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependOnceListener](internal_.Duplex.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:466

▸ **prependOnceListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependOnceListener](internal_.Duplex.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:467

▸ **prependOnceListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependOnceListener](internal_.Duplex.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:468

▸ **prependOnceListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependOnceListener](internal_.Duplex.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:469

▸ **prependOnceListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[prependOnceListener](internal_.Duplex.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:470

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

[Duplex](internal_.Duplex.md).[push](internal_.Duplex.md#push)

#### Defined in

node_modules/@types/node/stream.d.ts:398

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

[Duplex](internal_.Duplex.md).[rawListeners](internal_.Duplex.md#rawlisteners)

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

[Duplex](internal_.Duplex.md).[read](internal_.Duplex.md#read)

#### Defined in

node_modules/@types/node/stream.d.ts:195

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[removeAllListeners](internal_.Duplex.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[removeListener](internal_.Duplex.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:471

▸ **removeListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[removeListener](internal_.Duplex.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:472

▸ **removeListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[removeListener](internal_.Duplex.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:473

▸ **removeListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[removeListener](internal_.Duplex.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:474

▸ **removeListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[removeListener](internal_.Duplex.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:475

▸ **removeListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[removeListener](internal_.Duplex.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:476

▸ **removeListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[removeListener](internal_.Duplex.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:477

▸ **removeListener**(`event`, `listener`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[removeListener](internal_.Duplex.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:478

___

### resume

▸ **resume**(): [`Transform`](internal_.Transform.md)

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[resume](internal_.Duplex.md#resume)

#### Defined in

node_modules/@types/node/stream.d.ts:261

___

### setDefaultEncoding

▸ **setDefaultEncoding**(`encoding`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[setDefaultEncoding](internal_.Duplex.md#setdefaultencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:855

___

### setEncoding

▸ **setEncoding**(`encoding`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |  |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[setEncoding](internal_.Duplex.md#setencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:220

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[setMaxListeners](internal_.Duplex.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### uncork

▸ **uncork**(): `void`

#### Returns

`void`

#### Inherited from

[Duplex](internal_.Duplex.md).[uncork](internal_.Duplex.md#uncork)

#### Defined in

node_modules/@types/node/stream.d.ts:860

___

### unpipe

▸ **unpipe**(`destination?`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination?` | [`WritableStream`](../interfaces/internal_.WritableStream.md) |  |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[unpipe](internal_.Duplex.md#unpipe)

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

[Duplex](internal_.Duplex.md).[unshift](internal_.Duplex.md#unshift)

#### Defined in

node_modules/@types/node/stream.d.ts:371

___

### wrap

▸ **wrap**(`stream`): [`Transform`](internal_.Transform.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`ReadableStream`](../interfaces/internal_.ReadableStream.md) |  |

#### Returns

[`Transform`](internal_.Transform.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[wrap](internal_.Duplex.md#wrap)

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

[Duplex](internal_.Duplex.md).[write](internal_.Duplex.md#write)

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

[Duplex](internal_.Duplex.md).[write](internal_.Duplex.md#write)

#### Defined in

node_modules/@types/node/stream.d.ts:854

___

### from

▸ `Static` **from**(`src`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | `string` \| [`Object`](../modules/internal_.md#object-1) \| [`Stream`](internal_.Stream.md) \| `Promise`<`any`\> \| `ArrayBuffer` \| [`Blob`](../interfaces/internal_.Blob.md) \| [`Iterable`](../interfaces/internal_.Iterable.md)<`any`\> \| [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`any`\> \| [`AsyncGeneratorFunction`](../interfaces/internal_.AsyncGeneratorFunction.md) |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Inherited from

[Duplex](internal_.Duplex.md).[from](internal_.Duplex.md#from)

#### Defined in

node_modules/@types/node/stream.d.ts:842

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| [`DOMEventTarget`](../interfaces/internal_.DOMEventTarget.md) |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[Duplex](internal_.Duplex.md).[getEventListeners](internal_.Duplex.md#geteventlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:262

___

### isDisturbed

▸ `Static` **isDisturbed**(`stream`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`Readable`](internal_.Readable.md) \| [`ReadableStream`](../interfaces/internal_.ReadableStream.md) |

#### Returns

`boolean`

#### Inherited from

[Duplex](internal_.Duplex.md).[isDisturbed](internal_.Duplex.md#isdisturbed)

#### Defined in

node_modules/@types/node/stream.d.ts:59

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` |  |
| `eventName` | `string` \| `symbol` |  |

#### Returns

`number`

#### Inherited from

[Duplex](internal_.Duplex.md).[listenerCount](internal_.Duplex.md#listenercount-1)

#### Defined in

node_modules/@types/node/events.d.ts:234

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): [`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` |  |
| `options?` | [`StaticEventEmitterOptions`](../interfaces/internal_.StaticEventEmitterOptions.md) | - |

#### Returns

[`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

#### Inherited from

[Duplex](internal_.Duplex.md).[on](internal_.Duplex.md#on-1)

#### Defined in

node_modules/@types/node/events.d.ts:217

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [`NodeEventTarget`](../interfaces/internal_.NodeEventTarget.md) |
| `eventName` | `string` \| `symbol` |
| `options?` | [`StaticEventEmitterOptions`](../interfaces/internal_.StaticEventEmitterOptions.md) |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[Duplex](internal_.Duplex.md).[once](internal_.Duplex.md#once-1)

#### Defined in

node_modules/@types/node/events.d.ts:157

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [`DOMEventTarget`](../interfaces/internal_.DOMEventTarget.md) |
| `eventName` | `string` |
| `options?` | [`StaticEventEmitterOptions`](../interfaces/internal_.StaticEventEmitterOptions.md) |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[Duplex](internal_.Duplex.md).[once](internal_.Duplex.md#once-1)

#### Defined in

node_modules/@types/node/events.d.ts:158
