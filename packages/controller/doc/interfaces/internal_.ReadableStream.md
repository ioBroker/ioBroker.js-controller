[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ReadableStream

# Interface: ReadableStream

[<internal>](../modules/internal_.md).ReadableStream

## Hierarchy

- `EventEmitter`

  ↳ **`ReadableStream`**

  ↳↳ [`ReadWriteStream`](internal_.ReadWriteStream.md)

## Implemented by

- [`Readable`](../classes/internal_.Readable.md)

## Table of contents

### Properties

- [readable](internal_.ReadableStream.md#readable)

### Methods

- [[asyncIterator]](internal_.ReadableStream.md#[asynciterator])
- [addListener](internal_.ReadableStream.md#addlistener)
- [emit](internal_.ReadableStream.md#emit)
- [eventNames](internal_.ReadableStream.md#eventnames)
- [getMaxListeners](internal_.ReadableStream.md#getmaxlisteners)
- [isPaused](internal_.ReadableStream.md#ispaused)
- [listenerCount](internal_.ReadableStream.md#listenercount)
- [listeners](internal_.ReadableStream.md#listeners)
- [off](internal_.ReadableStream.md#off)
- [on](internal_.ReadableStream.md#on)
- [once](internal_.ReadableStream.md#once)
- [pause](internal_.ReadableStream.md#pause)
- [pipe](internal_.ReadableStream.md#pipe)
- [prependListener](internal_.ReadableStream.md#prependlistener)
- [prependOnceListener](internal_.ReadableStream.md#prependoncelistener)
- [rawListeners](internal_.ReadableStream.md#rawlisteners)
- [read](internal_.ReadableStream.md#read)
- [removeAllListeners](internal_.ReadableStream.md#removealllisteners)
- [removeListener](internal_.ReadableStream.md#removelistener)
- [resume](internal_.ReadableStream.md#resume)
- [setEncoding](internal_.ReadableStream.md#setencoding)
- [setMaxListeners](internal_.ReadableStream.md#setmaxlisteners)
- [unpipe](internal_.ReadableStream.md#unpipe)
- [unshift](internal_.ReadableStream.md#unshift)
- [wrap](internal_.ReadableStream.md#wrap)

## Properties

### readable

• **readable**: `boolean`

#### Defined in

node_modules/@types/node/globals.d.ts:191

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): [`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)<`string` \| [`Buffer`](../modules/internal_.md#buffer)\>

#### Returns

[`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)<`string` \| [`Buffer`](../modules/internal_.md#buffer)\>

#### Defined in

node_modules/@types/node/globals.d.ts:201

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/events.d.ts:299

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/@types/node/events.d.ts:555

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### isPaused

▸ **isPaused**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/@types/node/globals.d.ts:196

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

EventEmitter.listenerCount

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

EventEmitter.listeners

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`eventName`, `listener`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### pause

▸ **pause**(): [`ReadableStream`](internal_.ReadableStream.md)

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Defined in

node_modules/@types/node/globals.d.ts:194

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

#### Defined in

node_modules/@types/node/globals.d.ts:197

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:595

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

EventEmitter.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### read

▸ **read**(`size?`): `string` \| [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size?` | `number` |

#### Returns

`string` \| [`Buffer`](../modules/internal_.md#buffer)

#### Defined in

node_modules/@types/node/globals.d.ts:192

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### resume

▸ **resume**(): [`ReadableStream`](internal_.ReadableStream.md)

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Defined in

node_modules/@types/node/globals.d.ts:195

___

### setEncoding

▸ **setEncoding**(`encoding`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Defined in

node_modules/@types/node/globals.d.ts:193

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### unpipe

▸ **unpipe**(`destination?`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination?` | [`WritableStream`](internal_.WritableStream.md) |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Defined in

node_modules/@types/node/globals.d.ts:198

___

### unshift

▸ **unshift**(`chunk`, `encoding?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `string` \| `Uint8Array` |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

`void`

#### Defined in

node_modules/@types/node/globals.d.ts:199

___

### wrap

▸ **wrap**(`oldStream`): [`ReadableStream`](internal_.ReadableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldStream` | [`ReadableStream`](internal_.ReadableStream.md) |

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Defined in

node_modules/@types/node/globals.d.ts:200
