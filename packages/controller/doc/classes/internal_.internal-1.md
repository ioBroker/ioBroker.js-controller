[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / internal

# Class: internal

[<internal>](../modules/internal_.md).internal

## Hierarchy

- [`EventEmitter`](internal_.EventEmitter-1.md)

  ↳ **`internal`**

  ↳↳ [`Stream`](internal_.Stream.md)

## Table of contents

### Constructors

- [constructor](internal_.internal-1.md#constructor)

### Properties

- [captureRejectionSymbol](internal_.internal-1.md#capturerejectionsymbol)
- [captureRejections](internal_.internal-1.md#capturerejections)
- [defaultMaxListeners](internal_.internal-1.md#defaultmaxlisteners)
- [errorMonitor](internal_.internal-1.md#errormonitor)

### Methods

- [addListener](internal_.internal-1.md#addlistener)
- [emit](internal_.internal-1.md#emit)
- [eventNames](internal_.internal-1.md#eventnames)
- [getMaxListeners](internal_.internal-1.md#getmaxlisteners)
- [listenerCount](internal_.internal-1.md#listenercount)
- [listeners](internal_.internal-1.md#listeners)
- [off](internal_.internal-1.md#off)
- [on](internal_.internal-1.md#on)
- [once](internal_.internal-1.md#once)
- [pipe](internal_.internal-1.md#pipe)
- [prependListener](internal_.internal-1.md#prependlistener)
- [prependOnceListener](internal_.internal-1.md#prependoncelistener)
- [rawListeners](internal_.internal-1.md#rawlisteners)
- [removeAllListeners](internal_.internal-1.md#removealllisteners)
- [removeListener](internal_.internal-1.md#removelistener)
- [setMaxListeners](internal_.internal-1.md#setmaxlisteners)
- [getEventListeners](internal_.internal-1.md#geteventlisteners)
- [listenerCount](internal_.internal-1.md#listenercount-1)
- [on](internal_.internal-1.md#on-1)
- [once](internal_.internal-1.md#once-1)

## Constructors

### constructor

• **new internal**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`EventEmitterOptions`](../interfaces/internal_.EventEmitterOptions.md) |

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[constructor](internal_.EventEmitter-1.md#constructor)

#### Defined in

node_modules/@types/node/events.d.ts:74

## Properties

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](AdapterClass.md#capturerejectionsymbol)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[captureRejectionSymbol](internal_.EventEmitter-1.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[captureRejections](internal_.EventEmitter-1.md#capturerejections)

#### Defined in

node_modules/@types/node/events.d.ts:278

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[defaultMaxListeners](internal_.EventEmitter-1.md#defaultmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:279

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](AdapterClass.md#errormonitor)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[errorMonitor](internal_.EventEmitter-1.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:272

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`internal`](internal_.internal-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`internal`](internal_.internal-1.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[addListener](internal_.EventEmitter-1.md#addlistener)

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

[EventEmitter](internal_.EventEmitter-1.md).[emit](internal_.EventEmitter-1.md#emit)

#### Defined in

node_modules/@types/node/events.d.ts:555

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[eventNames](internal_.EventEmitter-1.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[getMaxListeners](internal_.EventEmitter-1.md#getmaxlisteners)

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

[EventEmitter](internal_.EventEmitter-1.md).[listenerCount](internal_.EventEmitter-1.md#listenercount)

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

[EventEmitter](internal_.EventEmitter-1.md).[listeners](internal_.EventEmitter-1.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`internal`](internal_.internal-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`internal`](internal_.internal-1.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[off](internal_.EventEmitter-1.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`eventName`, `listener`): [`internal`](internal_.internal-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`internal`](internal_.internal-1.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[on](internal_.EventEmitter-1.md#on)

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`internal`](internal_.internal-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`internal`](internal_.internal-1.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[once](internal_.EventEmitter-1.md#once)

#### Defined in

node_modules/@types/node/events.d.ts:359

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

#### Defined in

node_modules/@types/node/stream.d.ts:24

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`internal`](internal_.internal-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`internal`](internal_.internal-1.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[prependListener](internal_.EventEmitter-1.md#prependlistener)

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`internal`](internal_.internal-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`internal`](internal_.internal-1.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[prependOnceListener](internal_.EventEmitter-1.md#prependoncelistener)

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

[EventEmitter](internal_.EventEmitter-1.md).[rawListeners](internal_.EventEmitter-1.md#rawlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`internal`](internal_.internal-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`internal`](internal_.internal-1.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[removeAllListeners](internal_.EventEmitter-1.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`internal`](internal_.internal-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`internal`](internal_.internal-1.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[removeListener](internal_.EventEmitter-1.md#removelistener)

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`internal`](internal_.internal-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`internal`](internal_.internal-1.md)

#### Inherited from

[EventEmitter](internal_.EventEmitter-1.md).[setMaxListeners](internal_.EventEmitter-1.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:465

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

[EventEmitter](internal_.EventEmitter-1.md).[getEventListeners](internal_.EventEmitter-1.md#geteventlisteners)

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

[EventEmitter](internal_.EventEmitter-1.md).[listenerCount](internal_.EventEmitter-1.md#listenercount-1)

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

[EventEmitter](internal_.EventEmitter-1.md).[on](internal_.EventEmitter-1.md#on-1)

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

[EventEmitter](internal_.EventEmitter-1.md).[once](internal_.EventEmitter-1.md#once-1)

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

[EventEmitter](internal_.EventEmitter-1.md).[once](internal_.EventEmitter-1.md#once-1)

#### Defined in

node_modules/@types/node/events.d.ts:158
