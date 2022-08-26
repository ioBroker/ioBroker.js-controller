[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / ReadWriteStream

# Interface: ReadWriteStream

[<internal>](../modules/internal_.md).ReadWriteStream

## Hierarchy

- [`ReadableStream`](internal_.ReadableStream.md)

- [`WritableStream`](internal_.WritableStream.md)

  ↳ **`ReadWriteStream`**

## Table of contents

### Properties

- [readable](internal_.ReadWriteStream.md#readable)
- [writable](internal_.ReadWriteStream.md#writable)

### Methods

- [[asyncIterator]](internal_.ReadWriteStream.md#[asynciterator])
- [addListener](internal_.ReadWriteStream.md#addlistener)
- [emit](internal_.ReadWriteStream.md#emit)
- [end](internal_.ReadWriteStream.md#end)
- [eventNames](internal_.ReadWriteStream.md#eventnames)
- [getMaxListeners](internal_.ReadWriteStream.md#getmaxlisteners)
- [isPaused](internal_.ReadWriteStream.md#ispaused)
- [listenerCount](internal_.ReadWriteStream.md#listenercount)
- [listeners](internal_.ReadWriteStream.md#listeners)
- [off](internal_.ReadWriteStream.md#off)
- [on](internal_.ReadWriteStream.md#on)
- [once](internal_.ReadWriteStream.md#once)
- [pause](internal_.ReadWriteStream.md#pause)
- [pipe](internal_.ReadWriteStream.md#pipe)
- [prependListener](internal_.ReadWriteStream.md#prependlistener)
- [prependOnceListener](internal_.ReadWriteStream.md#prependoncelistener)
- [rawListeners](internal_.ReadWriteStream.md#rawlisteners)
- [read](internal_.ReadWriteStream.md#read)
- [removeAllListeners](internal_.ReadWriteStream.md#removealllisteners)
- [removeListener](internal_.ReadWriteStream.md#removelistener)
- [resume](internal_.ReadWriteStream.md#resume)
- [setEncoding](internal_.ReadWriteStream.md#setencoding)
- [setMaxListeners](internal_.ReadWriteStream.md#setmaxlisteners)
- [unpipe](internal_.ReadWriteStream.md#unpipe)
- [unshift](internal_.ReadWriteStream.md#unshift)
- [wrap](internal_.ReadWriteStream.md#wrap)
- [write](internal_.ReadWriteStream.md#write)

## Properties

### readable

• **readable**: `boolean`

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[readable](internal_.ReadableStream.md#readable)

#### Defined in

node_modules/@types/node/globals.d.ts:191

___

### writable

• **writable**: `boolean`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[writable](internal_.WritableStream.md#writable)

#### Defined in

node_modules/@types/node/globals.d.ts:205

## Methods

### [asyncIterator]

▸ **[asyncIterator]**(): [`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)<`string` \| [`Buffer`](../modules/internal_.md#buffer)\>

#### Returns

[`AsyncIterableIterator`](internal_.AsyncIterableIterator.md)<`string` \| [`Buffer`](../modules/internal_.md#buffer)\>

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[[asyncIterator]](internal_.ReadableStream.md#[asynciterator])

#### Defined in

node_modules/@types/node/globals.d.ts:201

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[addListener](internal_.WritableStream.md#addlistener)

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

[WritableStream](internal_.WritableStream.md).[emit](internal_.WritableStream.md#emit)

#### Defined in

node_modules/@types/node/events.d.ts:555

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

[WritableStream](internal_.WritableStream.md).[end](internal_.WritableStream.md#end)

#### Defined in

node_modules/@types/node/globals.d.ts:208

▸ **end**(`data`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` \| `Uint8Array` |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[end](internal_.WritableStream.md#end)

#### Defined in

node_modules/@types/node/globals.d.ts:209

▸ **end**(`str`, `encoding?`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[end](internal_.WritableStream.md#end)

#### Defined in

node_modules/@types/node/globals.d.ts:210

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[WritableStream](internal_.WritableStream.md).[eventNames](internal_.WritableStream.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[getMaxListeners](internal_.WritableStream.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### isPaused

▸ **isPaused**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[isPaused](internal_.ReadableStream.md#ispaused)

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

[WritableStream](internal_.WritableStream.md).[listenerCount](internal_.WritableStream.md#listenercount)

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

[WritableStream](internal_.WritableStream.md).[listeners](internal_.WritableStream.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[off](internal_.WritableStream.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[on](internal_.WritableStream.md#on)

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[once](internal_.WritableStream.md#once)

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### pause

▸ **pause**(): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[pause](internal_.ReadableStream.md#pause)

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

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[pipe](internal_.ReadableStream.md#pipe)

#### Defined in

node_modules/@types/node/globals.d.ts:197

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[prependListener](internal_.WritableStream.md#prependlistener)

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[prependOnceListener](internal_.WritableStream.md#prependoncelistener)

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

[WritableStream](internal_.WritableStream.md).[rawListeners](internal_.WritableStream.md#rawlisteners)

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

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[read](internal_.ReadableStream.md#read)

#### Defined in

node_modules/@types/node/globals.d.ts:192

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[removeAllListeners](internal_.WritableStream.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[removeListener](internal_.WritableStream.md#removelistener)

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### resume

▸ **resume**(): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[resume](internal_.ReadableStream.md#resume)

#### Defined in

node_modules/@types/node/globals.d.ts:195

___

### setEncoding

▸ **setEncoding**(`encoding`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[setEncoding](internal_.ReadableStream.md#setencoding)

#### Defined in

node_modules/@types/node/globals.d.ts:193

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[WritableStream](internal_.WritableStream.md).[setMaxListeners](internal_.WritableStream.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### unpipe

▸ **unpipe**(`destination?`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination?` | [`WritableStream`](internal_.WritableStream.md) |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[unpipe](internal_.ReadableStream.md#unpipe)

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

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[unshift](internal_.ReadableStream.md#unshift)

#### Defined in

node_modules/@types/node/globals.d.ts:199

___

### wrap

▸ **wrap**(`oldStream`): [`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldStream` | [`ReadableStream`](internal_.ReadableStream.md) |

#### Returns

[`ReadWriteStream`](internal_.ReadWriteStream.md)

#### Inherited from

[ReadableStream](internal_.ReadableStream.md).[wrap](internal_.ReadableStream.md#wrap)

#### Defined in

node_modules/@types/node/globals.d.ts:200

___

### write

▸ **write**(`buffer`, `cb?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `string` \| `Uint8Array` |
| `cb?` | (`err?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`boolean`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[write](internal_.WritableStream.md#write)

#### Defined in

node_modules/@types/node/globals.d.ts:206

▸ **write**(`str`, `encoding?`, `cb?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `cb?` | (`err?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`boolean`

#### Inherited from

[WritableStream](internal_.WritableStream.md).[write](internal_.WritableStream.md#write)

#### Defined in

node_modules/@types/node/globals.d.ts:207
