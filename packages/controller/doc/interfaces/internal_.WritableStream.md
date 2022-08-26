[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / WritableStream

# Interface: WritableStream

[<internal>](../modules/internal_.md).WritableStream

## Hierarchy

- `EventEmitter`

  ↳ **`WritableStream`**

  ↳↳ [`ReadWriteStream`](internal_.ReadWriteStream.md)

## Implemented by

- [`Writable`](../classes/internal_.Writable.md)

## Table of contents

### Properties

- [writable](internal_.WritableStream.md#writable)

### Methods

- [addListener](internal_.WritableStream.md#addlistener)
- [emit](internal_.WritableStream.md#emit)
- [end](internal_.WritableStream.md#end)
- [eventNames](internal_.WritableStream.md#eventnames)
- [getMaxListeners](internal_.WritableStream.md#getmaxlisteners)
- [listenerCount](internal_.WritableStream.md#listenercount)
- [listeners](internal_.WritableStream.md#listeners)
- [off](internal_.WritableStream.md#off)
- [on](internal_.WritableStream.md#on)
- [once](internal_.WritableStream.md#once)
- [prependListener](internal_.WritableStream.md#prependlistener)
- [prependOnceListener](internal_.WritableStream.md#prependoncelistener)
- [rawListeners](internal_.WritableStream.md#rawlisteners)
- [removeAllListeners](internal_.WritableStream.md#removealllisteners)
- [removeListener](internal_.WritableStream.md#removelistener)
- [setMaxListeners](internal_.WritableStream.md#setmaxlisteners)
- [write](internal_.WritableStream.md#write)

## Properties

### writable

• **writable**: `boolean`

#### Defined in

node_modules/@types/node/globals.d.ts:205

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`WritableStream`](internal_.WritableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WritableStream`](internal_.WritableStream.md)

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

### end

▸ **end**(`cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb?` | () => `void` |

#### Returns

`void`

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

#### Defined in

node_modules/@types/node/globals.d.ts:210

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

▸ **off**(`eventName`, `listener`): [`WritableStream`](internal_.WritableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WritableStream`](internal_.WritableStream.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`eventName`, `listener`): [`WritableStream`](internal_.WritableStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`WritableStream`](internal_.WritableStream.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`WritableStream`](internal_.WritableStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`WritableStream`](internal_.WritableStream.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`WritableStream`](internal_.WritableStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`WritableStream`](internal_.WritableStream.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`WritableStream`](internal_.WritableStream.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`WritableStream`](internal_.WritableStream.md)

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

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`WritableStream`](internal_.WritableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`WritableStream`](internal_.WritableStream.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`WritableStream`](internal_.WritableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`WritableStream`](internal_.WritableStream.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`WritableStream`](internal_.WritableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`WritableStream`](internal_.WritableStream.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:465

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

#### Defined in

node_modules/@types/node/globals.d.ts:207
