[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Duplex

# Class: Duplex

[<internal>](../modules/internal_.md).Duplex

## Hierarchy

- [`Readable`](internal_.Readable.md)

  ↳ **`Duplex`**

  ↳↳ [`Transform`](internal_.Transform.md)

## Implements

- [`Writable`](internal_.Writable.md)

## Table of contents

### Constructors

- [constructor](internal_.Duplex.md#constructor)

### Properties

- [allowHalfOpen](internal_.Duplex.md#allowhalfopen)
- [destroyed](internal_.Duplex.md#destroyed)
- [readable](internal_.Duplex.md#readable)
- [readableAborted](internal_.Duplex.md#readableaborted)
- [readableDidRead](internal_.Duplex.md#readabledidread)
- [readableEncoding](internal_.Duplex.md#readableencoding)
- [readableEnded](internal_.Duplex.md#readableended)
- [readableFlowing](internal_.Duplex.md#readableflowing)
- [readableHighWaterMark](internal_.Duplex.md#readablehighwatermark)
- [readableLength](internal_.Duplex.md#readablelength)
- [readableObjectMode](internal_.Duplex.md#readableobjectmode)
- [writable](internal_.Duplex.md#writable)
- [writableCorked](internal_.Duplex.md#writablecorked)
- [writableEnded](internal_.Duplex.md#writableended)
- [writableFinished](internal_.Duplex.md#writablefinished)
- [writableHighWaterMark](internal_.Duplex.md#writablehighwatermark)
- [writableLength](internal_.Duplex.md#writablelength)
- [writableObjectMode](internal_.Duplex.md#writableobjectmode)
- [captureRejectionSymbol](internal_.Duplex.md#capturerejectionsymbol)
- [captureRejections](internal_.Duplex.md#capturerejections)
- [defaultMaxListeners](internal_.Duplex.md#defaultmaxlisteners)
- [errorMonitor](internal_.Duplex.md#errormonitor)

### Methods

- [[asyncIterator]](internal_.Duplex.md#[asynciterator])
- [\_construct](internal_.Duplex.md#_construct)
- [\_destroy](internal_.Duplex.md#_destroy)
- [\_final](internal_.Duplex.md#_final)
- [\_read](internal_.Duplex.md#_read)
- [\_write](internal_.Duplex.md#_write)
- [\_writev](internal_.Duplex.md#_writev)
- [addListener](internal_.Duplex.md#addlistener)
- [cork](internal_.Duplex.md#cork)
- [destroy](internal_.Duplex.md#destroy)
- [emit](internal_.Duplex.md#emit)
- [end](internal_.Duplex.md#end)
- [eventNames](internal_.Duplex.md#eventnames)
- [getMaxListeners](internal_.Duplex.md#getmaxlisteners)
- [isPaused](internal_.Duplex.md#ispaused)
- [listenerCount](internal_.Duplex.md#listenercount)
- [listeners](internal_.Duplex.md#listeners)
- [off](internal_.Duplex.md#off)
- [on](internal_.Duplex.md#on)
- [once](internal_.Duplex.md#once)
- [pause](internal_.Duplex.md#pause)
- [pipe](internal_.Duplex.md#pipe)
- [prependListener](internal_.Duplex.md#prependlistener)
- [prependOnceListener](internal_.Duplex.md#prependoncelistener)
- [push](internal_.Duplex.md#push)
- [rawListeners](internal_.Duplex.md#rawlisteners)
- [read](internal_.Duplex.md#read)
- [removeAllListeners](internal_.Duplex.md#removealllisteners)
- [removeListener](internal_.Duplex.md#removelistener)
- [resume](internal_.Duplex.md#resume)
- [setDefaultEncoding](internal_.Duplex.md#setdefaultencoding)
- [setEncoding](internal_.Duplex.md#setencoding)
- [setMaxListeners](internal_.Duplex.md#setmaxlisteners)
- [uncork](internal_.Duplex.md#uncork)
- [unpipe](internal_.Duplex.md#unpipe)
- [unshift](internal_.Duplex.md#unshift)
- [wrap](internal_.Duplex.md#wrap)
- [write](internal_.Duplex.md#write)
- [from](internal_.Duplex.md#from)
- [getEventListeners](internal_.Duplex.md#geteventlisteners)
- [isDisturbed](internal_.Duplex.md#isdisturbed)
- [listenerCount](internal_.Duplex.md#listenercount-1)
- [on](internal_.Duplex.md#on-1)
- [once](internal_.Duplex.md#once-1)

## Constructors

### constructor

• **new Duplex**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`DuplexOptions`](../interfaces/internal_.internal.DuplexOptions.md) |

#### Overrides

[Readable](internal_.Readable.md).[constructor](internal_.Readable.md#constructor)

#### Defined in

node_modules/@types/node/stream.d.ts:820

## Properties

### allowHalfOpen

• **allowHalfOpen**: `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:819

___

### destroyed

• **destroyed**: `boolean`

#### Implementation of

Writable.destroyed

#### Inherited from

[Readable](internal_.Readable.md).[destroyed](internal_.Readable.md#destroyed)

#### Defined in

node_modules/@types/node/stream.d.ts:115

___

### readable

• **readable**: `boolean`

#### Inherited from

[Readable](internal_.Readable.md).[readable](internal_.Readable.md#readable)

#### Defined in

node_modules/@types/node/stream.d.ts:71

___

### readableAborted

• `Readonly` **readableAborted**: `boolean`

#### Inherited from

[Readable](internal_.Readable.md).[readableAborted](internal_.Readable.md#readableaborted)

#### Defined in

node_modules/@types/node/stream.d.ts:65

___

### readableDidRead

• `Readonly` **readableDidRead**: `boolean`

#### Inherited from

[Readable](internal_.Readable.md).[readableDidRead](internal_.Readable.md#readabledidread)

#### Defined in

node_modules/@types/node/stream.d.ts:77

___

### readableEncoding

• `Readonly` **readableEncoding**: ``null`` \| [`BufferEncoding`](../modules/internal_.md#bufferencoding)

#### Inherited from

[Readable](internal_.Readable.md).[readableEncoding](internal_.Readable.md#readableencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:82

___

### readableEnded

• `Readonly` **readableEnded**: `boolean`

#### Inherited from

[Readable](internal_.Readable.md).[readableEnded](internal_.Readable.md#readableended)

#### Defined in

node_modules/@types/node/stream.d.ts:87

___

### readableFlowing

• `Readonly` **readableFlowing**: ``null`` \| `boolean`

#### Inherited from

[Readable](internal_.Readable.md).[readableFlowing](internal_.Readable.md#readableflowing)

#### Defined in

node_modules/@types/node/stream.d.ts:93

___

### readableHighWaterMark

• `Readonly` **readableHighWaterMark**: `number`

#### Inherited from

[Readable](internal_.Readable.md).[readableHighWaterMark](internal_.Readable.md#readablehighwatermark)

#### Defined in

node_modules/@types/node/stream.d.ts:98

___

### readableLength

• `Readonly` **readableLength**: `number`

#### Inherited from

[Readable](internal_.Readable.md).[readableLength](internal_.Readable.md#readablelength)

#### Defined in

node_modules/@types/node/stream.d.ts:105

___

### readableObjectMode

• `Readonly` **readableObjectMode**: `boolean`

#### Inherited from

[Readable](internal_.Readable.md).[readableObjectMode](internal_.Readable.md#readableobjectmode)

#### Defined in

node_modules/@types/node/stream.d.ts:110

___

### writable

• `Readonly` **writable**: `boolean`

#### Implementation of

Writable.writable

#### Defined in

node_modules/@types/node/stream.d.ts:803

___

### writableCorked

• `Readonly` **writableCorked**: `number`

#### Implementation of

Writable.writableCorked

#### Defined in

node_modules/@types/node/stream.d.ts:809

___

### writableEnded

• `Readonly` **writableEnded**: `boolean`

#### Implementation of

Writable.writableEnded

#### Defined in

node_modules/@types/node/stream.d.ts:804

___

### writableFinished

• `Readonly` **writableFinished**: `boolean`

#### Implementation of

Writable.writableFinished

#### Defined in

node_modules/@types/node/stream.d.ts:805

___

### writableHighWaterMark

• `Readonly` **writableHighWaterMark**: `number`

#### Implementation of

Writable.writableHighWaterMark

#### Defined in

node_modules/@types/node/stream.d.ts:806

___

### writableLength

• `Readonly` **writableLength**: `number`

#### Implementation of

Writable.writableLength

#### Defined in

node_modules/@types/node/stream.d.ts:807

___

### writableObjectMode

• `Readonly` **writableObjectMode**: `boolean`

#### Implementation of

Writable.writableObjectMode

#### Defined in

node_modules/@types/node/stream.d.ts:808

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](AdapterClass.md#capturerejectionsymbol)

#### Inherited from

[Readable](internal_.Readable.md).[captureRejectionSymbol](internal_.Readable.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

#### Inherited from

[Readable](internal_.Readable.md).[captureRejections](internal_.Readable.md#capturerejections)

#### Defined in

node_modules/@types/node/events.d.ts:278

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

[Readable](internal_.Readable.md).[defaultMaxListeners](internal_.Readable.md#defaultmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:279

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](AdapterClass.md#errormonitor)

#### Inherited from

[Readable](internal_.Readable.md).[errorMonitor](internal_.Readable.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:272

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): [`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

#### Returns

[`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

#### Inherited from

[Readable](internal_.Readable.md).[[asyncIterator]](internal_.Readable.md#[asynciterator])

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

#### Implementation of

Writable.\_construct

#### Inherited from

[Readable](internal_.Readable.md).[_construct](internal_.Readable.md#_construct)

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

#### Implementation of

Writable.\_destroy

#### Overrides

[Readable](internal_.Readable.md).[_destroy](internal_.Readable.md#_destroy)

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

#### Implementation of

Writable.\_final

#### Defined in

node_modules/@types/node/stream.d.ts:852

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

[Readable](internal_.Readable.md).[_read](internal_.Readable.md#_read)

#### Defined in

node_modules/@types/node/stream.d.ts:118

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

#### Implementation of

Writable.\_write

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

#### Implementation of

Writable.\_writev

#### Defined in

node_modules/@types/node/stream.d.ts:844

___

### addListener

▸ **addListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.addListener

#### Inherited from

[Readable](internal_.Readable.md).[addListener](internal_.Readable.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:423

▸ **addListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.addListener

#### Inherited from

[Readable](internal_.Readable.md).[addListener](internal_.Readable.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:424

▸ **addListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.addListener

#### Inherited from

[Readable](internal_.Readable.md).[addListener](internal_.Readable.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:425

▸ **addListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.addListener

#### Inherited from

[Readable](internal_.Readable.md).[addListener](internal_.Readable.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:426

▸ **addListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.addListener

#### Inherited from

[Readable](internal_.Readable.md).[addListener](internal_.Readable.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:427

▸ **addListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.addListener

#### Inherited from

[Readable](internal_.Readable.md).[addListener](internal_.Readable.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:428

▸ **addListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.addListener

#### Inherited from

[Readable](internal_.Readable.md).[addListener](internal_.Readable.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:429

▸ **addListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.addListener

#### Inherited from

[Readable](internal_.Readable.md).[addListener](internal_.Readable.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:430

___

### cork

▸ **cork**(): `void`

#### Returns

`void`

#### Implementation of

Writable.cork

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

#### Implementation of

Writable.destroy

#### Inherited from

[Readable](internal_.Readable.md).[destroy](internal_.Readable.md#destroy)

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

#### Implementation of

Writable.emit

#### Inherited from

[Readable](internal_.Readable.md).[emit](internal_.Readable.md#emit)

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

#### Implementation of

Writable.emit

#### Inherited from

[Readable](internal_.Readable.md).[emit](internal_.Readable.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:432

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |

#### Returns

`boolean`

#### Implementation of

Writable.emit

#### Inherited from

[Readable](internal_.Readable.md).[emit](internal_.Readable.md#emit)

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

#### Implementation of

Writable.emit

#### Inherited from

[Readable](internal_.Readable.md).[emit](internal_.Readable.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:434

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |

#### Returns

`boolean`

#### Implementation of

Writable.emit

#### Inherited from

[Readable](internal_.Readable.md).[emit](internal_.Readable.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:435

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |

#### Returns

`boolean`

#### Implementation of

Writable.emit

#### Inherited from

[Readable](internal_.Readable.md).[emit](internal_.Readable.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:436

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |

#### Returns

`boolean`

#### Implementation of

Writable.emit

#### Inherited from

[Readable](internal_.Readable.md).[emit](internal_.Readable.md#emit)

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

#### Implementation of

Writable.emit

#### Inherited from

[Readable](internal_.Readable.md).[emit](internal_.Readable.md#emit)

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

#### Implementation of

Writable.end

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

#### Implementation of

Writable.end

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

#### Implementation of

Writable.end

#### Defined in

node_modules/@types/node/stream.d.ts:858

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Implementation of

Writable.eventNames

#### Inherited from

[Readable](internal_.Readable.md).[eventNames](internal_.Readable.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Implementation of

Writable.getMaxListeners

#### Inherited from

[Readable](internal_.Readable.md).[getMaxListeners](internal_.Readable.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### isPaused

▸ **isPaused**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Readable](internal_.Readable.md).[isPaused](internal_.Readable.md#ispaused)

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

#### Implementation of

Writable.listenerCount

#### Inherited from

[Readable](internal_.Readable.md).[listenerCount](internal_.Readable.md#listenercount)

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

#### Implementation of

Writable.listeners

#### Inherited from

[Readable](internal_.Readable.md).[listeners](internal_.Readable.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.off

#### Inherited from

[Readable](internal_.Readable.md).[off](internal_.Readable.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.on

#### Inherited from

[Readable](internal_.Readable.md).[on](internal_.Readable.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:439

▸ **on**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.on

#### Inherited from

[Readable](internal_.Readable.md).[on](internal_.Readable.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:440

▸ **on**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.on

#### Inherited from

[Readable](internal_.Readable.md).[on](internal_.Readable.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:441

▸ **on**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.on

#### Inherited from

[Readable](internal_.Readable.md).[on](internal_.Readable.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:442

▸ **on**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.on

#### Inherited from

[Readable](internal_.Readable.md).[on](internal_.Readable.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:443

▸ **on**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.on

#### Inherited from

[Readable](internal_.Readable.md).[on](internal_.Readable.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:444

▸ **on**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.on

#### Inherited from

[Readable](internal_.Readable.md).[on](internal_.Readable.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:445

▸ **on**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.on

#### Inherited from

[Readable](internal_.Readable.md).[on](internal_.Readable.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:446

___

### once

▸ **once**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.once

#### Inherited from

[Readable](internal_.Readable.md).[once](internal_.Readable.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:447

▸ **once**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.once

#### Inherited from

[Readable](internal_.Readable.md).[once](internal_.Readable.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:448

▸ **once**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.once

#### Inherited from

[Readable](internal_.Readable.md).[once](internal_.Readable.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:449

▸ **once**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.once

#### Inherited from

[Readable](internal_.Readable.md).[once](internal_.Readable.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:450

▸ **once**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.once

#### Inherited from

[Readable](internal_.Readable.md).[once](internal_.Readable.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:451

▸ **once**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.once

#### Inherited from

[Readable](internal_.Readable.md).[once](internal_.Readable.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:452

▸ **once**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.once

#### Inherited from

[Readable](internal_.Readable.md).[once](internal_.Readable.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:453

▸ **once**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.once

#### Inherited from

[Readable](internal_.Readable.md).[once](internal_.Readable.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:454

___

### pause

▸ **pause**(): [`Duplex`](internal_.Duplex.md)

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Inherited from

[Readable](internal_.Readable.md).[pause](internal_.Readable.md#pause)

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

#### Implementation of

Writable.pipe

#### Inherited from

[Readable](internal_.Readable.md).[pipe](internal_.Readable.md#pipe)

#### Defined in

node_modules/@types/node/stream.d.ts:24

___

### prependListener

▸ **prependListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependListener

#### Inherited from

[Readable](internal_.Readable.md).[prependListener](internal_.Readable.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:455

▸ **prependListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependListener

#### Inherited from

[Readable](internal_.Readable.md).[prependListener](internal_.Readable.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:456

▸ **prependListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependListener

#### Inherited from

[Readable](internal_.Readable.md).[prependListener](internal_.Readable.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:457

▸ **prependListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependListener

#### Inherited from

[Readable](internal_.Readable.md).[prependListener](internal_.Readable.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:458

▸ **prependListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependListener

#### Inherited from

[Readable](internal_.Readable.md).[prependListener](internal_.Readable.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:459

▸ **prependListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependListener

#### Inherited from

[Readable](internal_.Readable.md).[prependListener](internal_.Readable.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:460

▸ **prependListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependListener

#### Inherited from

[Readable](internal_.Readable.md).[prependListener](internal_.Readable.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:461

▸ **prependListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependListener

#### Inherited from

[Readable](internal_.Readable.md).[prependListener](internal_.Readable.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:462

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependOnceListener

#### Inherited from

[Readable](internal_.Readable.md).[prependOnceListener](internal_.Readable.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:463

▸ **prependOnceListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependOnceListener

#### Inherited from

[Readable](internal_.Readable.md).[prependOnceListener](internal_.Readable.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:464

▸ **prependOnceListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependOnceListener

#### Inherited from

[Readable](internal_.Readable.md).[prependOnceListener](internal_.Readable.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:465

▸ **prependOnceListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependOnceListener

#### Inherited from

[Readable](internal_.Readable.md).[prependOnceListener](internal_.Readable.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:466

▸ **prependOnceListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependOnceListener

#### Inherited from

[Readable](internal_.Readable.md).[prependOnceListener](internal_.Readable.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:467

▸ **prependOnceListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependOnceListener

#### Inherited from

[Readable](internal_.Readable.md).[prependOnceListener](internal_.Readable.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:468

▸ **prependOnceListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependOnceListener

#### Inherited from

[Readable](internal_.Readable.md).[prependOnceListener](internal_.Readable.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:469

▸ **prependOnceListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.prependOnceListener

#### Inherited from

[Readable](internal_.Readable.md).[prependOnceListener](internal_.Readable.md#prependoncelistener)

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

[Readable](internal_.Readable.md).[push](internal_.Readable.md#push)

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

#### Implementation of

Writable.rawListeners

#### Inherited from

[Readable](internal_.Readable.md).[rawListeners](internal_.Readable.md#rawlisteners)

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

[Readable](internal_.Readable.md).[read](internal_.Readable.md#read)

#### Defined in

node_modules/@types/node/stream.d.ts:195

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.removeAllListeners

#### Inherited from

[Readable](internal_.Readable.md).[removeAllListeners](internal_.Readable.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.removeListener

#### Inherited from

[Readable](internal_.Readable.md).[removeListener](internal_.Readable.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:471

▸ **removeListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.removeListener

#### Inherited from

[Readable](internal_.Readable.md).[removeListener](internal_.Readable.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:472

▸ **removeListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.removeListener

#### Inherited from

[Readable](internal_.Readable.md).[removeListener](internal_.Readable.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:473

▸ **removeListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.removeListener

#### Inherited from

[Readable](internal_.Readable.md).[removeListener](internal_.Readable.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:474

▸ **removeListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.removeListener

#### Inherited from

[Readable](internal_.Readable.md).[removeListener](internal_.Readable.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:475

▸ **removeListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.removeListener

#### Inherited from

[Readable](internal_.Readable.md).[removeListener](internal_.Readable.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:476

▸ **removeListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.removeListener

#### Inherited from

[Readable](internal_.Readable.md).[removeListener](internal_.Readable.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:477

▸ **removeListener**(`event`, `listener`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.removeListener

#### Inherited from

[Readable](internal_.Readable.md).[removeListener](internal_.Readable.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:478

___

### resume

▸ **resume**(): [`Duplex`](internal_.Duplex.md)

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Inherited from

[Readable](internal_.Readable.md).[resume](internal_.Readable.md#resume)

#### Defined in

node_modules/@types/node/stream.d.ts:261

___

### setDefaultEncoding

▸ **setDefaultEncoding**(`encoding`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.setDefaultEncoding

#### Defined in

node_modules/@types/node/stream.d.ts:855

___

### setEncoding

▸ **setEncoding**(`encoding`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |  |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Inherited from

[Readable](internal_.Readable.md).[setEncoding](internal_.Readable.md#setencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:220

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Implementation of

Writable.setMaxListeners

#### Inherited from

[Readable](internal_.Readable.md).[setMaxListeners](internal_.Readable.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### uncork

▸ **uncork**(): `void`

#### Returns

`void`

#### Implementation of

Writable.uncork

#### Defined in

node_modules/@types/node/stream.d.ts:860

___

### unpipe

▸ **unpipe**(`destination?`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination?` | [`WritableStream`](../interfaces/internal_.WritableStream.md) |  |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Inherited from

[Readable](internal_.Readable.md).[unpipe](internal_.Readable.md#unpipe)

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

[Readable](internal_.Readable.md).[unshift](internal_.Readable.md#unshift)

#### Defined in

node_modules/@types/node/stream.d.ts:371

___

### wrap

▸ **wrap**(`stream`): [`Duplex`](internal_.Duplex.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`ReadableStream`](../interfaces/internal_.ReadableStream.md) |  |

#### Returns

[`Duplex`](internal_.Duplex.md)

#### Inherited from

[Readable](internal_.Readable.md).[wrap](internal_.Readable.md#wrap)

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

#### Implementation of

Writable.write

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

#### Implementation of

Writable.write

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

#### Overrides

[Readable](internal_.Readable.md).[from](internal_.Readable.md#from)

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

[Readable](internal_.Readable.md).[getEventListeners](internal_.Readable.md#geteventlisteners)

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

[Readable](internal_.Readable.md).[isDisturbed](internal_.Readable.md#isdisturbed)

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

[Readable](internal_.Readable.md).[listenerCount](internal_.Readable.md#listenercount-1)

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

[Readable](internal_.Readable.md).[on](internal_.Readable.md#on-1)

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

[Readable](internal_.Readable.md).[once](internal_.Readable.md#once-1)

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

[Readable](internal_.Readable.md).[once](internal_.Readable.md#once-1)

#### Defined in

node_modules/@types/node/events.d.ts:158
