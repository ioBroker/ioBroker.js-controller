[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / BufferConstructor

# Interface: BufferConstructor

[<internal>](../modules/internal_.md).BufferConstructor

## Table of contents

### Constructors

- [constructor](internal_.BufferConstructor.md#constructor)

### Properties

- [poolSize](internal_.BufferConstructor.md#poolsize)

### Methods

- [alloc](internal_.BufferConstructor.md#alloc)
- [allocUnsafe](internal_.BufferConstructor.md#allocunsafe)
- [allocUnsafeSlow](internal_.BufferConstructor.md#allocunsafeslow)
- [byteLength](internal_.BufferConstructor.md#bytelength)
- [compare](internal_.BufferConstructor.md#compare)
- [concat](internal_.BufferConstructor.md#concat)
- [from](internal_.BufferConstructor.md#from)
- [isBuffer](internal_.BufferConstructor.md#isbuffer)
- [isEncoding](internal_.BufferConstructor.md#isencoding)
- [of](internal_.BufferConstructor.md#of)

## Constructors

### constructor

• **new BufferConstructor**(`str`, `encoding?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` |  |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |  |

#### Defined in

node_modules/@types/node/buffer.d.ts:189

• **new BufferConstructor**(`size`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` |  |

#### Defined in

node_modules/@types/node/buffer.d.ts:196

• **new BufferConstructor**(`array`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `Uint8Array` |  |

#### Defined in

node_modules/@types/node/buffer.d.ts:203

• **new BufferConstructor**(`arrayBuffer`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrayBuffer` | `ArrayBuffer` \| [`SharedArrayBuffer`](../modules/internal_.md#sharedarraybuffer) |  |

#### Defined in

node_modules/@types/node/buffer.d.ts:212

• **new BufferConstructor**(`array`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | readonly `any`[] |  |

#### Defined in

node_modules/@types/node/buffer.d.ts:219

• **new BufferConstructor**(`buffer`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buffer` | [`Buffer`](../modules/internal_.md#buffer) |  |

#### Defined in

node_modules/@types/node/buffer.d.ts:226

## Properties

### poolSize

• **poolSize**: `number`

#### Defined in

node_modules/@types/node/buffer.d.ts:529

## Methods

### alloc

▸ **alloc**(`size`, `fill?`, `encoding?`): [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` |  |
| `fill?` | `string` \| `number` \| [`Buffer`](../modules/internal_.md#buffer) | - |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) | - |

#### Returns

[`Buffer`](../modules/internal_.md#buffer)

#### Defined in

node_modules/@types/node/buffer.d.ts:441

___

### allocUnsafe

▸ **allocUnsafe**(`size`): [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` |  |

#### Returns

[`Buffer`](../modules/internal_.md#buffer)

#### Defined in

node_modules/@types/node/buffer.d.ts:478

___

### allocUnsafeSlow

▸ **allocUnsafeSlow**(`size`): [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `size` | `number` |  |

#### Returns

[`Buffer`](../modules/internal_.md#buffer)

#### Defined in

node_modules/@types/node/buffer.d.ts:523

___

### byteLength

▸ **byteLength**(`string`, `encoding?`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` \| `ArrayBuffer` \| [`SharedArrayBuffer`](../modules/internal_.md#sharedarraybuffer) \| [`ArrayBufferView`](../modules/internal_.md#arraybufferview) |  |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) | - |

#### Returns

`number`

#### Defined in

node_modules/@types/node/buffer.d.ts:336

___

### compare

▸ **compare**(`buf1`, `buf2`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf1` | `Uint8Array` |
| `buf2` | `Uint8Array` |

#### Returns

`number`

#### Defined in

node_modules/@types/node/buffer.d.ts:393

___

### concat

▸ **concat**(`list`, `totalLength?`): [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | readonly `Uint8Array`[] |  |
| `totalLength?` | `number` |  |

#### Returns

[`Buffer`](../modules/internal_.md#buffer)

#### Defined in

node_modules/@types/node/buffer.d.ts:375

___

### from

▸ **from**(`arrayBuffer`, `byteOffset?`, `length?`): [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrayBuffer` | [`WithImplicitCoercion`](../modules/internal_.md#withimplicitcoercion)<`ArrayBuffer` \| [`SharedArrayBuffer`](../modules/internal_.md#sharedarraybuffer)\> |
| `byteOffset?` | `number` |
| `length?` | `number` |

#### Returns

[`Buffer`](../modules/internal_.md#buffer)

#### Defined in

node_modules/@types/node/buffer.d.ts:244

▸ **from**(`data`): [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` \| readonly `number`[] |  |

#### Returns

[`Buffer`](../modules/internal_.md#buffer)

#### Defined in

node_modules/@types/node/buffer.d.ts:249

▸ **from**(`data`): [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`WithImplicitCoercion`](../modules/internal_.md#withimplicitcoercion)<`string` \| `Uint8Array` \| readonly `number`[]\> |

#### Returns

[`Buffer`](../modules/internal_.md#buffer)

#### Defined in

node_modules/@types/node/buffer.d.ts:250

▸ **from**(`str`, `encoding?`): [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | [`WithImplicitCoercion`](../modules/internal_.md#withimplicitcoercion)<`string`\> \| { `[toPrimitive]`: (`hint`: ``"string"``) => `string`  } |
| `encoding?` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |

#### Returns

[`Buffer`](../modules/internal_.md#buffer)

#### Defined in

node_modules/@types/node/buffer.d.ts:256

___

### isBuffer

▸ **isBuffer**(`obj`): obj is Buffer

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

obj is Buffer

#### Defined in

node_modules/@types/node/buffer.d.ts:283

___

### isEncoding

▸ **isEncoding**(`encoding`): encoding is BufferEncoding

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encoding` | `string` |  |

#### Returns

encoding is BufferEncoding

#### Defined in

node_modules/@types/node/buffer.d.ts:306

___

### of

▸ **of**(...`items`): [`Buffer`](../modules/internal_.md#buffer)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...items` | `number`[] |

#### Returns

[`Buffer`](../modules/internal_.md#buffer)

#### Defined in

node_modules/@types/node/buffer.d.ts:268
