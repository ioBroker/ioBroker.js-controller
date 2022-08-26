[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / EventEmitter

# Class: EventEmitter

[<internal>](../modules/internal_.md).EventEmitter

## Hierarchy

- `EventEmitter`

  ↳ **`EventEmitter`**

  ↳↳ [`AdapterClass`](AdapterClass.md)

  ↳↳ [`Job`](internal_.__home_moritz_workspaces_ioBroker_js_controller_node_modules__types_node_schedule_index_.Job.md)

  ↳↳ [`internal`](internal_.internal-1.md)

## Table of contents

### Constructors

- [constructor](internal_.EventEmitter-1.md#constructor)

### Properties

- [captureRejectionSymbol](internal_.EventEmitter-1.md#capturerejectionsymbol)
- [captureRejections](internal_.EventEmitter-1.md#capturerejections)
- [defaultMaxListeners](internal_.EventEmitter-1.md#defaultmaxlisteners)
- [errorMonitor](internal_.EventEmitter-1.md#errormonitor)

### Methods

- [addListener](internal_.EventEmitter-1.md#addlistener)
- [emit](internal_.EventEmitter-1.md#emit)
- [eventNames](internal_.EventEmitter-1.md#eventnames)
- [getMaxListeners](internal_.EventEmitter-1.md#getmaxlisteners)
- [listenerCount](internal_.EventEmitter-1.md#listenercount)
- [listeners](internal_.EventEmitter-1.md#listeners)
- [off](internal_.EventEmitter-1.md#off)
- [on](internal_.EventEmitter-1.md#on)
- [once](internal_.EventEmitter-1.md#once)
- [prependListener](internal_.EventEmitter-1.md#prependlistener)
- [prependOnceListener](internal_.EventEmitter-1.md#prependoncelistener)
- [rawListeners](internal_.EventEmitter-1.md#rawlisteners)
- [removeAllListeners](internal_.EventEmitter-1.md#removealllisteners)
- [removeListener](internal_.EventEmitter-1.md#removelistener)
- [setMaxListeners](internal_.EventEmitter-1.md#setmaxlisteners)
- [getEventListeners](internal_.EventEmitter-1.md#geteventlisteners)
- [listenerCount](internal_.EventEmitter-1.md#listenercount-1)
- [on](internal_.EventEmitter-1.md#on-1)
- [once](internal_.EventEmitter-1.md#once-1)

## Constructors

### constructor

• **new EventEmitter**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`EventEmitterOptions`](../interfaces/internal_.EventEmitterOptions.md) |

#### Inherited from

NodeJS.EventEmitter.constructor

#### Defined in

node_modules/@types/node/events.d.ts:74

## Properties

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](AdapterClass.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

#### Defined in

node_modules/@types/node/events.d.ts:278

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Defined in

node_modules/@types/node/events.d.ts:279

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](AdapterClass.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:272

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`EventEmitter`](internal_.EventEmitter-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`EventEmitter`](internal_.EventEmitter-1.md)

#### Inherited from

NodeJS.EventEmitter.addListener

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

NodeJS.EventEmitter.emit

#### Defined in

node_modules/@types/node/events.d.ts:555

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

NodeJS.EventEmitter.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

NodeJS.EventEmitter.getMaxListeners

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

NodeJS.EventEmitter.listenerCount

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

NodeJS.EventEmitter.listeners

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): [`EventEmitter`](internal_.EventEmitter-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`EventEmitter`](internal_.EventEmitter-1.md)

#### Inherited from

NodeJS.EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`eventName`, `listener`): [`EventEmitter`](internal_.EventEmitter-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`EventEmitter`](internal_.EventEmitter-1.md)

#### Inherited from

NodeJS.EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`EventEmitter`](internal_.EventEmitter-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`EventEmitter`](internal_.EventEmitter-1.md)

#### Inherited from

NodeJS.EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`EventEmitter`](internal_.EventEmitter-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`EventEmitter`](internal_.EventEmitter-1.md)

#### Inherited from

NodeJS.EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`EventEmitter`](internal_.EventEmitter-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`EventEmitter`](internal_.EventEmitter-1.md)

#### Inherited from

NodeJS.EventEmitter.prependOnceListener

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

NodeJS.EventEmitter.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`EventEmitter`](internal_.EventEmitter-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`EventEmitter`](internal_.EventEmitter-1.md)

#### Inherited from

NodeJS.EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`EventEmitter`](internal_.EventEmitter-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`EventEmitter`](internal_.EventEmitter-1.md)

#### Inherited from

NodeJS.EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`EventEmitter`](internal_.EventEmitter-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`EventEmitter`](internal_.EventEmitter-1.md)

#### Inherited from

NodeJS.EventEmitter.setMaxListeners

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

NodeJS.EventEmitter.listenerCount

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

NodeJS.EventEmitter.on

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

NodeJS.EventEmitter.once

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

NodeJS.EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:158
