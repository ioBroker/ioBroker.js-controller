[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Writable

# Class: Writable

[<internal>](../modules/internal_.md).Writable

## Hierarchy

- [`Stream`](internal_.Stream.md)

  ↳ **`Writable`**

## Implements

- [`WritableStream`](../interfaces/internal_.WritableStream.md)

## Implemented by

- [`Duplex`](internal_.Duplex.md)

## Table of contents

### Constructors

- [constructor](internal_.Writable.md#constructor)

### Properties

- [destroyed](internal_.Writable.md#destroyed)
- [writable](internal_.Writable.md#writable)
- [writableCorked](internal_.Writable.md#writablecorked)
- [writableEnded](internal_.Writable.md#writableended)
- [writableFinished](internal_.Writable.md#writablefinished)
- [writableHighWaterMark](internal_.Writable.md#writablehighwatermark)
- [writableLength](internal_.Writable.md#writablelength)
- [writableObjectMode](internal_.Writable.md#writableobjectmode)
- [captureRejectionSymbol](internal_.Writable.md#capturerejectionsymbol)
- [captureRejections](internal_.Writable.md#capturerejections)
- [defaultMaxListeners](internal_.Writable.md#defaultmaxlisteners)
- [errorMonitor](internal_.Writable.md#errormonitor)

### Methods

- [\_construct](internal_.Writable.md#_construct)
- [\_destroy](internal_.Writable.md#_destroy)
- [\_final](internal_.Writable.md#_final)
- [\_write](internal_.Writable.md#_write)
- [\_writev](internal_.Writable.md#_writev)
- [addListener](internal_.Writable.md#addlistener)
- [cork](internal_.Writable.md#cork)
- [destroy](internal_.Writable.md#destroy)
- [emit](internal_.Writable.md#emit)
- [end](internal_.Writable.md#end)
- [eventNames](internal_.Writable.md#eventnames)
- [getMaxListeners](internal_.Writable.md#getmaxlisteners)
- [listenerCount](internal_.Writable.md#listenercount)
- [listeners](internal_.Writable.md#listeners)
- [off](internal_.Writable.md#off)
- [on](internal_.Writable.md#on)
- [once](internal_.Writable.md#once)
- [pipe](internal_.Writable.md#pipe)
- [prependListener](internal_.Writable.md#prependlistener)
- [prependOnceListener](internal_.Writable.md#prependoncelistener)
- [rawListeners](internal_.Writable.md#rawlisteners)
- [removeAllListeners](internal_.Writable.md#removealllisteners)
- [removeListener](internal_.Writable.md#removelistener)
- [setDefaultEncoding](internal_.Writable.md#setdefaultencoding)
- [setMaxListeners](internal_.Writable.md#setmaxlisteners)
- [uncork](internal_.Writable.md#uncork)
- [write](internal_.Writable.md#write)
- [getEventListeners](internal_.Writable.md#geteventlisteners)
- [listenerCount](internal_.Writable.md#listenercount-1)
- [on](internal_.Writable.md#on-1)
- [once](internal_.Writable.md#once-1)

## Constructors

### constructor

• **new Writable**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`WritableOptions`](../interfaces/internal_.internal.WritableOptions.md) |

#### Overrides

[Stream](internal_.Stream.md).[constructor](internal_.Stream.md#constructor)

#### Defined in

node_modules/@types/node/stream.d.ts:544

## Properties

### destroyed

• **destroyed**: `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:543

___

### writable

• `Readonly` **writable**: `boolean`

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[writable](../interfaces/internal_.WritableStream.md#writable)

#### Defined in

node_modules/@types/node/stream.d.ts:504

___

### writableCorked

• `Readonly` **writableCorked**: `number`

#### Defined in

node_modules/@types/node/stream.d.ts:538

___

### writableEnded

• `Readonly` **writableEnded**: `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:510

___

### writableFinished

• `Readonly` **writableFinished**: `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:515

___

### writableHighWaterMark

• `Readonly` **writableHighWaterMark**: `number`

#### Defined in

node_modules/@types/node/stream.d.ts:520

___

### writableLength

• `Readonly` **writableLength**: `number`

#### Defined in

node_modules/@types/node/stream.d.ts:527

___

### writableObjectMode

• `Readonly` **writableObjectMode**: `boolean`

#### Defined in

node_modules/@types/node/stream.d.ts:532

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

### \_construct

▸ `Optional` **_construct**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Defined in

node_modules/@types/node/stream.d.ts:553

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

node_modules/@types/node/stream.d.ts:554

___

### \_final

▸ **_final**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Defined in

node_modules/@types/node/stream.d.ts:555

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

#### Defined in

node_modules/@types/node/stream.d.ts:545

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

#### Defined in

node_modules/@types/node/stream.d.ts:546

___

### addListener

▸ **addListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[addListener](../interfaces/internal_.WritableStream.md#addlistener)

#### Overrides

[Stream](internal_.Stream.md).[addListener](internal_.Stream.md#addlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:721

▸ **addListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:722

▸ **addListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:723

▸ **addListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:724

▸ **addListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:725

▸ **addListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:726

▸ **addListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.addListener

#### Overrides

Stream.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:727

___

### cork

▸ **cork**(): `void`

#### Returns

`void`

#### Defined in

node_modules/@types/node/stream.d.ts:659

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

node_modules/@types/node/stream.d.ts:710

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

[WritableStream](../interfaces/internal_.WritableStream.md).[emit](../interfaces/internal_.WritableStream.md#emit)

#### Overrides

[Stream](internal_.Stream.md).[emit](internal_.Stream.md#emit)

#### Defined in

node_modules/@types/node/stream.d.ts:728

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |

#### Returns

`boolean`

#### Implementation of

NodeJS.WritableStream.emit

#### Overrides

Stream.emit

#### Defined in

node_modules/@types/node/stream.d.ts:729

▸ **emit**(`event`, `err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `err` | [`Error`](../modules/internal_.md#error) |

#### Returns

`boolean`

#### Implementation of

NodeJS.WritableStream.emit

#### Overrides

Stream.emit

#### Defined in

node_modules/@types/node/stream.d.ts:730

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |

#### Returns

`boolean`

#### Implementation of

NodeJS.WritableStream.emit

#### Overrides

Stream.emit

#### Defined in

node_modules/@types/node/stream.d.ts:731

▸ **emit**(`event`, `src`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `src` | [`Readable`](internal_.Readable.md) |

#### Returns

`boolean`

#### Implementation of

NodeJS.WritableStream.emit

#### Overrides

Stream.emit

#### Defined in

node_modules/@types/node/stream.d.ts:732

▸ **emit**(`event`, `src`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `src` | [`Readable`](internal_.Readable.md) |

#### Returns

`boolean`

#### Implementation of

NodeJS.WritableStream.emit

#### Overrides

Stream.emit

#### Defined in

node_modules/@types/node/stream.d.ts:733

▸ **emit**(`event`, ...`args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Implementation of

NodeJS.WritableStream.emit

#### Overrides

Stream.emit

#### Defined in

node_modules/@types/node/stream.d.ts:734

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

[WritableStream](../interfaces/internal_.WritableStream.md).[end](../interfaces/internal_.WritableStream.md#end)

#### Defined in

node_modules/@types/node/stream.d.ts:642

▸ **end**(`chunk`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `cb?` | () => `void` |

#### Returns

`void`

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[end](../interfaces/internal_.WritableStream.md#end)

#### Defined in

node_modules/@types/node/stream.d.ts:643

▸ **end**(`chunk`, `encoding`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `cb?` | () => `void` |

#### Returns

`void`

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[end](../interfaces/internal_.WritableStream.md#end)

#### Defined in

node_modules/@types/node/stream.d.ts:644

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[eventNames](../interfaces/internal_.WritableStream.md#eventnames)

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

[WritableStream](../interfaces/internal_.WritableStream.md).[getMaxListeners](../interfaces/internal_.WritableStream.md#getmaxlisteners)

#### Inherited from

[Stream](internal_.Stream.md).[getMaxListeners](internal_.Stream.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:471

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

[WritableStream](../interfaces/internal_.WritableStream.md).[listenerCount](../interfaces/internal_.WritableStream.md#listenercount)

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

[WritableStream](../interfaces/internal_.WritableStream.md).[listeners](../interfaces/internal_.WritableStream.md#listeners)

#### Inherited from

[Stream](internal_.Stream.md).[listeners](internal_.Stream.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[off](../interfaces/internal_.WritableStream.md#off)

#### Inherited from

[Stream](internal_.Stream.md).[off](internal_.Stream.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[on](../interfaces/internal_.WritableStream.md#on)

#### Overrides

[Stream](internal_.Stream.md).[on](internal_.Stream.md#on)

#### Defined in

node_modules/@types/node/stream.d.ts:735

▸ **on**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:736

▸ **on**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:737

▸ **on**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:738

▸ **on**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:739

▸ **on**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:740

▸ **on**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.on

#### Overrides

Stream.on

#### Defined in

node_modules/@types/node/stream.d.ts:741

___

### once

▸ **once**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[once](../interfaces/internal_.WritableStream.md#once)

#### Overrides

[Stream](internal_.Stream.md).[once](internal_.Stream.md#once)

#### Defined in

node_modules/@types/node/stream.d.ts:742

▸ **once**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:743

▸ **once**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:744

▸ **once**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:745

▸ **once**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:746

▸ **once**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:747

▸ **once**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.once

#### Overrides

Stream.once

#### Defined in

node_modules/@types/node/stream.d.ts:748

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

[Stream](internal_.Stream.md).[pipe](internal_.Stream.md#pipe)

#### Defined in

node_modules/@types/node/stream.d.ts:24

___

### prependListener

▸ **prependListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[prependListener](../interfaces/internal_.WritableStream.md#prependlistener)

#### Overrides

[Stream](internal_.Stream.md).[prependListener](internal_.Stream.md#prependlistener)

#### Defined in

node_modules/@types/node/stream.d.ts:749

▸ **prependListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:750

▸ **prependListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:751

▸ **prependListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:752

▸ **prependListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:753

▸ **prependListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:754

▸ **prependListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependListener

#### Overrides

Stream.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:755

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[prependOnceListener](../interfaces/internal_.WritableStream.md#prependoncelistener)

#### Overrides

[Stream](internal_.Stream.md).[prependOnceListener](internal_.Stream.md#prependoncelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:756

▸ **prependOnceListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:757

▸ **prependOnceListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:758

▸ **prependOnceListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:759

▸ **prependOnceListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:760

▸ **prependOnceListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:761

▸ **prependOnceListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.prependOnceListener

#### Overrides

Stream.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:762

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

[WritableStream](../interfaces/internal_.WritableStream.md).[rawListeners](../interfaces/internal_.WritableStream.md#rawlisteners)

#### Inherited from

[Stream](internal_.Stream.md).[rawListeners](internal_.Stream.md#rawlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[removeAllListeners](../interfaces/internal_.WritableStream.md#removealllisteners)

#### Inherited from

[Stream](internal_.Stream.md).[removeAllListeners](internal_.Stream.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[removeListener](../interfaces/internal_.WritableStream.md#removelistener)

#### Overrides

[Stream](internal_.Stream.md).[removeListener](internal_.Stream.md#removelistener)

#### Defined in

node_modules/@types/node/stream.d.ts:763

▸ **removeListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:764

▸ **removeListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:765

▸ **removeListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:766

▸ **removeListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:767

▸ **removeListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: [`Readable`](internal_.Readable.md)) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:768

▸ **removeListener**(`event`, `listener`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

NodeJS.WritableStream.removeListener

#### Overrides

Stream.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:769

___

### setDefaultEncoding

▸ **setDefaultEncoding**(`encoding`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |  |

#### Returns

[`Writable`](internal_.Writable.md)

#### Defined in

node_modules/@types/node/stream.d.ts:619

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`Writable`](internal_.Writable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`Writable`](internal_.Writable.md)

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[setMaxListeners](../interfaces/internal_.WritableStream.md#setmaxlisteners)

#### Inherited from

[Stream](internal_.Stream.md).[setMaxListeners](internal_.Stream.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### uncork

▸ **uncork**(): `void`

#### Returns

`void`

#### Defined in

node_modules/@types/node/stream.d.ts:693

___

### write

▸ **write**(`chunk`, `callback?`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chunk` | `any` |  |
| `callback?` | (`error`: `undefined` \| ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |  |

#### Returns

`boolean`

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[write](../interfaces/internal_.WritableStream.md#write)

#### Defined in

node_modules/@types/node/stream.d.ts:612

▸ **write**(`chunk`, `encoding`, `callback?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `callback?` | (`error`: `undefined` \| ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`boolean`

#### Implementation of

[WritableStream](../interfaces/internal_.WritableStream.md).[write](../interfaces/internal_.WritableStream.md#write)

#### Defined in

node_modules/@types/node/stream.d.ts:613

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
