[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Readable

# Class: Readable

[<internal>](../modules/internal_.md).Readable

## Hierarchy

- [`Stream`](internal_.Stream.md)

  ↳ **`Readable`**

  ↳↳ [`Duplex`](internal_.Duplex.md)

## Implements

- [`ReadableStream`](../interfaces/internal_.ReadableStream.md)

## Table of contents

### Constructors

- [constructor](internal_.Readable.md#constructor)

### Properties

- [destroyed](internal_.Readable.md#destroyed)
- [readable](internal_.Readable.md#readable)
- [readableAborted](internal_.Readable.md#readableaborted)
- [readableDidRead](internal_.Readable.md#readabledidread)
- [readableEncoding](internal_.Readable.md#readableencoding)
- [readableEnded](internal_.Readable.md#readableended)
- [readableFlowing](internal_.Readable.md#readableflowing)
- [readableHighWaterMark](internal_.Readable.md#readablehighwatermark)
- [readableLength](internal_.Readable.md#readablelength)
- [readableObjectMode](internal_.Readable.md#readableobjectmode)
- [captureRejectionSymbol](internal_.Readable.md#capturerejectionsymbol)
- [captureRejections](internal_.Readable.md#capturerejections)
- [defaultMaxListeners](internal_.Readable.md#defaultmaxlisteners)
- [errorMonitor](internal_.Readable.md#errormonitor)

### Methods

- [[asyncIterator]](internal_.Readable.md#[asynciterator])
- [\_construct](internal_.Readable.md#_construct)
- [\_destroy](internal_.Readable.md#_destroy)
- [\_read](internal_.Readable.md#_read)
- [addListener](internal_.Readable.md#addlistener)
- [destroy](internal_.Readable.md#destroy)
- [emit](internal_.Readable.md#emit)
- [eventNames](internal_.Readable.md#eventnames)
- [getMaxListeners](internal_.Readable.md#getmaxlisteners)
- [isPaused](internal_.Readable.md#ispaused)
- [listenerCount](internal_.Readable.md#listenercount)
- [listeners](internal_.Readable.md#listeners)
- [off](internal_.Readable.md#off)
- [on](internal_.Readable.md#on)
- [once](internal_.Readable.md#once)
- [pause](internal_.Readable.md#pause)
- [pipe](internal_.Readable.md#pipe)
- [prependListener](internal_.Readable.md#prependlistener)
- [prependOnceListener](internal_.Readable.md#prependoncelistener)
- [push](internal_.Readable.md#push)
- [rawListeners](internal_.Readable.md#rawlisteners)
- [read](internal_.Readable.md#read)
- [removeAllListeners](internal_.Readable.md#removealllisteners)
- [removeListener](internal_.Readable.md#removelistener)
- [resume](internal_.Readable.md#resume)
- [setEncoding](internal_.Readable.md#setencoding)
- [setMaxListeners](internal_.Readable.md#setmaxlisteners)
- [unpipe](internal_.Readable.md#unpipe)
- [unshift](internal_.Readable.md#unshift)
- [wrap](internal_.Readable.md#wrap)
- [from](internal_.Readable.md#from)
- [getEventListeners](internal_.Readable.md#geteventlisteners)
- [isDisturbed](internal_.Readable.md#isdisturbed)
- [listenerCount](internal_.Readable.md#listenercount-1)
- [on](internal_.Readable.md#on-1)
- [once](internal_.Readable.md#once-1)

## Constructors

### constructor

• **new Readable**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`ReadableOptions`](../interfaces/internal_.internal.ReadableOptions.md) |

#### Overrides

[Stream](internal_.Stream.md).[constructor](internal_.Stream.md#constructor)

#### Defined in

node_modules/@types/node/stream.d.ts:116

## Properties

### destroyed

• **destroyed**: `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:115

___

### readable

• **readable**: `boolean`

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[readable](../interfaces/internal_.ReadableStream.md#readable)

#### Defined in

node_modules/@types/node/stream.d.ts:71

___

### readableAborted

• `Readonly` **readableAborted**: `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:65

___

### readableDidRead

• `Readonly` **readableDidRead**: `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:77

___

### readableEncoding

• `Readonly` **readableEncoding**: ``null`` \| [`BufferEncoding`](../modules/internal_.md#bufferencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:82

___

### readableEnded

• `Readonly` **readableEnded**: `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:87

___

### readableFlowing

• `Readonly` **readableFlowing**: ``null`` \| `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:93

___

### readableHighWaterMark

• `Readonly` **readableHighWaterMark**: `number`

#### Defined in

node_modules/@types/node/stream.d.ts:98

___

### readableLength

• `Readonly` **readableLength**: `number`

#### Defined in

node_modules/@types/node/stream.d.ts:105

___

### readableObjectMode

• `Readonly` **readableObjectMode**: `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:110

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](AdapterClass.md#capturerejectionsymbol)

#### Inherited from

[Stream](internal_.Stream.md).[captureRejectionSymbol](internal_.Stream.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

#### Inherited from

[Stream](internal_.Stream.md).[captureRejections](internal_.Stream.md#capturerejections)

#### Defined in

node_modules/@types/node/events.d.ts:278

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

[Stream](internal_.Stream.md).[defaultMaxListeners](internal_.Stream.md#defaultmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:279

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](AdapterClass.md#errormonitor)

#### Inherited from

[Stream](internal_.Stream.md).[errorMonitor](internal_.Stream.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:272

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): [`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

#### Returns

[`AsyncIterableIterator`](../interfaces/internal_.AsyncIterableIterator.md)<`any`\>

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[[asyncIterator]](../interfaces/internal_.ReadableStream.md#[asynciterator])

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

#### Defined in

node_modules/@types/node/stream.d.ts:117

___

### \_destroy

▸ **_destroy**(`error`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | ``null`` \| [`Error`](../modules/internal_.md#error) |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Defined in

node_modules/@types/node/stream.d.ts:399

___

### \_read

▸ **_read**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`void`

#### Defined in

node_modules/@types/node/stream.d.ts:118

___

### addListener

▸ **addListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[addListener](../interfaces/internal_.ReadableStream.md#addlistener)

#### Overrides

[Stream](internal_.Stream.md).[addListener](internal_.Stream.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:423

▸ **addListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:424

▸ **addListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:425

▸ **addListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:426

▸ **addListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:427

▸ **addListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:428

▸ **addListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:429

▸ **addListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:430

___

### destroy

▸ **destroy**(`error?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error?` | [`Error`](../modules/internal_.md#error) |  |

#### Returns

`void`

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

[ReadableStream](../interfaces/internal_.ReadableStream.md).[emit](../interfaces/internal_.ReadableStream.md#emit)

#### Overrides

[Stream](internal_.Stream.md).[emit](internal_.Stream.md#emit)

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

NodeJS.ReadableStream.emit

#### Overrides

Stream.emit

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

NodeJS.ReadableStream.emit

#### Overrides

Stream.emit

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

NodeJS.ReadableStream.emit

#### Overrides

Stream.emit

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

NodeJS.ReadableStream.emit

#### Overrides

Stream.emit

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

NodeJS.ReadableStream.emit

#### Overrides

Stream.emit

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

NodeJS.ReadableStream.emit

#### Overrides

Stream.emit

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

NodeJS.ReadableStream.emit

#### Overrides

Stream.emit

#### Defined in

node_modules/@types/node/stream.d.ts:438

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[eventNames](../interfaces/internal_.ReadableStream.md#eventnames)

#### Inherited from

[Stream](internal_.Stream.md).[eventNames](internal_.Stream.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[getMaxListeners](../interfaces/internal_.ReadableStream.md#getmaxlisteners)

#### Inherited from

[Stream](internal_.Stream.md).[getMaxListeners](internal_.Stream.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### isPaused

▸ **isPaused**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[isPaused](../interfaces/internal_.ReadableStream.md#ispaused)

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

[ReadableStream](../interfaces/internal_.ReadableStream.md).[listenerCount](../interfaces/internal_.ReadableStream.md#listenercount)

#### Inherited from

[Stream](internal_.Stream.md).[listenerCount](internal_.Stream.md#listenercount)

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

[ReadableStream](../interfaces/internal_.ReadableStream.md).[listeners](../interfaces/internal_.ReadableStream.md#listeners)

#### Inherited from

[Stream](internal_.Stream.md).[listeners](internal_.Stream.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[off](../interfaces/internal_.ReadableStream.md#off)

#### Inherited from

[Stream](internal_.Stream.md).[off](internal_.Stream.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[on](../interfaces/internal_.ReadableStream.md#on)

#### Overrides

[Stream](internal_.Stream.md).[on](internal_.Stream.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:439

▸ **on**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:440

▸ **on**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:441

▸ **on**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:442

▸ **on**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:443

▸ **on**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:444

▸ **on**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:445

▸ **on**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:446

___

### once

▸ **once**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[once](../interfaces/internal_.ReadableStream.md#once)

#### Overrides

[Stream](internal_.Stream.md).[once](internal_.Stream.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:447

▸ **once**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:448

▸ **once**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:449

▸ **once**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:450

▸ **once**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:451

▸ **once**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:452

▸ **once**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:453

▸ **once**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:454

___

### pause

▸ **pause**(): [`Readable`](internal_.Readable.md)

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[pause](../interfaces/internal_.ReadableStream.md#pause)

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

[ReadableStream](../interfaces/internal_.ReadableStream.md).[pipe](../interfaces/internal_.ReadableStream.md#pipe)

#### Inherited from

[Stream](internal_.Stream.md).[pipe](internal_.Stream.md#pipe)

#### Defined in

node_modules/@types/node/stream.d.ts:24

___

### prependListener

▸ **prependListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[prependListener](../interfaces/internal_.ReadableStream.md#prependlistener)

#### Overrides

[Stream](internal_.Stream.md).[prependListener](internal_.Stream.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:455

▸ **prependListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:456

▸ **prependListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:457

▸ **prependListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:458

▸ **prependListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:459

▸ **prependListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:460

▸ **prependListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:461

▸ **prependListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:462

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[prependOnceListener](../interfaces/internal_.ReadableStream.md#prependoncelistener)

#### Overrides

[Stream](internal_.Stream.md).[prependOnceListener](internal_.Stream.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:463

▸ **prependOnceListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:464

▸ **prependOnceListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:465

▸ **prependOnceListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:466

▸ **prependOnceListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:467

▸ **prependOnceListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:468

▸ **prependOnceListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:469

▸ **prependOnceListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

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

[ReadableStream](../interfaces/internal_.ReadableStream.md).[rawListeners](../interfaces/internal_.ReadableStream.md#rawlisteners)

#### Inherited from

[Stream](internal_.Stream.md).[rawListeners](internal_.Stream.md#rawlisteners)

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

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[read](../interfaces/internal_.ReadableStream.md#read)

#### Defined in

node_modules/@types/node/stream.d.ts:195

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[removeAllListeners](../interfaces/internal_.ReadableStream.md#removealllisteners)

#### Inherited from

[Stream](internal_.Stream.md).[removeAllListeners](internal_.Stream.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[removeListener](../interfaces/internal_.ReadableStream.md#removelistener)

#### Overrides

[Stream](internal_.Stream.md).[removeListener](internal_.Stream.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:471

▸ **removeListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"data"`` |
| `listener` | (`chunk`: `any`) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:472

▸ **removeListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:473

▸ **removeListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:474

▸ **removeListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pause"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:475

▸ **removeListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"readable"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:476

▸ **removeListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"resume"`` |
| `listener` | () => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:477

▸ **removeListener**(`event`, `listener`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

NodeJS.ReadableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:478

___

### resume

▸ **resume**(): [`Readable`](internal_.Readable.md)

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[resume](../interfaces/internal_.ReadableStream.md#resume)

#### Defined in

node_modules/@types/node/stream.d.ts:261

___

### setEncoding

▸ **setEncoding**(`encoding`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |  |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[setEncoding](../interfaces/internal_.ReadableStream.md#setencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:220

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[setMaxListeners](../interfaces/internal_.ReadableStream.md#setmaxlisteners)

#### Inherited from

[Stream](internal_.Stream.md).[setMaxListeners](internal_.Stream.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### unpipe

▸ **unpipe**(`destination?`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination?` | [`WritableStream`](../interfaces/internal_.WritableStream.md) |  |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[unpipe](../interfaces/internal_.ReadableStream.md#unpipe)

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

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[unshift](../interfaces/internal_.ReadableStream.md#unshift)

#### Defined in

node_modules/@types/node/stream.d.ts:371

___

### wrap

▸ **wrap**(`stream`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`ReadableStream`](../interfaces/internal_.ReadableStream.md) |  |

#### Returns

[`Readable`](internal_.Readable.md)

#### Implementation of

[ReadableStream](../interfaces/internal_.ReadableStream.md).[wrap](../interfaces/internal_.ReadableStream.md#wrap)

#### Defined in

node_modules/@types/node/stream.d.ts:397

___

### from

▸ `Static` **from**(`iterable`, `options?`): [`Readable`](internal_.Readable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `iterable` | [`Iterable`](../interfaces/internal_.Iterable.md)<`any`\> \| [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`any`\> |
| `options?` | [`ReadableOptions`](../interfaces/internal_.internal.ReadableOptions.md) |

#### Returns

[`Readable`](internal_.Readable.md)

#### Defined in

node_modules/@types/node/stream.d.ts:54

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

[Stream](internal_.Stream.md).[getEventListeners](internal_.Stream.md#geteventlisteners)

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

[Stream](internal_.Stream.md).[listenerCount](internal_.Stream.md#listenercount-1)

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

[Stream](internal_.Stream.md).[on](internal_.Stream.md#on-1)

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

[Stream](internal_.Stream.md).[once](internal_.Stream.md#once-1)

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

[Stream](internal_.Stream.md).[once](internal_.Stream.md#once-1)

#### Defined in

node_modules/@types/node/events.d.ts:158
