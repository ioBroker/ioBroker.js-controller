[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / TransformOptions

# Interface: TransformOptions

[<internal>](../modules/internal_.md).TransformOptions

## Hierarchy

- [`DuplexOptions`](internal_.internal.DuplexOptions.md)

  ↳ **`TransformOptions`**

## Table of contents

### Properties

- [allowHalfOpen](internal_.TransformOptions.md#allowhalfopen)
- [autoDestroy](internal_.TransformOptions.md#autodestroy)
- [decodeStrings](internal_.TransformOptions.md#decodestrings)
- [defaultEncoding](internal_.TransformOptions.md#defaultencoding)
- [emitClose](internal_.TransformOptions.md#emitclose)
- [encoding](internal_.TransformOptions.md#encoding)
- [highWaterMark](internal_.TransformOptions.md#highwatermark)
- [objectMode](internal_.TransformOptions.md#objectmode)
- [readableHighWaterMark](internal_.TransformOptions.md#readablehighwatermark)
- [readableObjectMode](internal_.TransformOptions.md#readableobjectmode)
- [signal](internal_.TransformOptions.md#signal)
- [writableCorked](internal_.TransformOptions.md#writablecorked)
- [writableHighWaterMark](internal_.TransformOptions.md#writablehighwatermark)
- [writableObjectMode](internal_.TransformOptions.md#writableobjectmode)

### Methods

- [construct](internal_.TransformOptions.md#construct)
- [destroy](internal_.TransformOptions.md#destroy)
- [final](internal_.TransformOptions.md#final)
- [flush](internal_.TransformOptions.md#flush)
- [read](internal_.TransformOptions.md#read)
- [transform](internal_.TransformOptions.md#transform)
- [write](internal_.TransformOptions.md#write)
- [writev](internal_.TransformOptions.md#writev)

## Properties

### allowHalfOpen

• `Optional` **allowHalfOpen**: `boolean`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[allowHalfOpen](internal_.internal.DuplexOptions.md#allowhalfopen)

#### Defined in

node_modules/@types/node/stream.d.ts:772

___

### autoDestroy

• `Optional` **autoDestroy**: `boolean`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[autoDestroy](internal_.internal.DuplexOptions.md#autodestroy)

#### Defined in

node_modules/@types/node/stream.d.ts:41

___

### decodeStrings

• `Optional` **decodeStrings**: `boolean`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[decodeStrings](internal_.internal.DuplexOptions.md#decodestrings)

#### Defined in

node_modules/@types/node/stream.d.ts:482

___

### defaultEncoding

• `Optional` **defaultEncoding**: [`BufferEncoding`](../modules/internal_.md#bufferencoding)

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[defaultEncoding](internal_.internal.DuplexOptions.md#defaultencoding)

#### Defined in

node_modules/@types/node/stream.d.ts:483

___

### emitClose

• `Optional` **emitClose**: `boolean`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[emitClose](internal_.internal.DuplexOptions.md#emitclose)

#### Defined in

node_modules/@types/node/stream.d.ts:36

___

### encoding

• `Optional` **encoding**: [`BufferEncoding`](../modules/internal_.md#bufferencoding)

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[encoding](internal_.internal.DuplexOptions.md#encoding)

#### Defined in

node_modules/@types/node/stream.d.ts:44

___

### highWaterMark

• `Optional` **highWaterMark**: `number`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[highWaterMark](internal_.internal.DuplexOptions.md#highwatermark)

#### Defined in

node_modules/@types/node/stream.d.ts:37

___

### objectMode

• `Optional` **objectMode**: `boolean`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[objectMode](internal_.internal.DuplexOptions.md#objectmode)

#### Defined in

node_modules/@types/node/stream.d.ts:38

___

### readableHighWaterMark

• `Optional` **readableHighWaterMark**: `number`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[readableHighWaterMark](internal_.internal.DuplexOptions.md#readablehighwatermark)

#### Defined in

node_modules/@types/node/stream.d.ts:775

___

### readableObjectMode

• `Optional` **readableObjectMode**: `boolean`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[readableObjectMode](internal_.internal.DuplexOptions.md#readableobjectmode)

#### Defined in

node_modules/@types/node/stream.d.ts:773

___

### signal

• `Optional` **signal**: [`AbortSignal`](../modules/internal_.md#abortsignal)

When provided the corresponding `AbortController` can be used to cancel an asynchronous action.

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[signal](internal_.internal.DuplexOptions.md#signal)

#### Defined in

node_modules/@types/node/events.d.ts:289

___

### writableCorked

• `Optional` **writableCorked**: `number`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[writableCorked](internal_.internal.DuplexOptions.md#writablecorked)

#### Defined in

node_modules/@types/node/stream.d.ts:777

___

### writableHighWaterMark

• `Optional` **writableHighWaterMark**: `number`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[writableHighWaterMark](internal_.internal.DuplexOptions.md#writablehighwatermark)

#### Defined in

node_modules/@types/node/stream.d.ts:776

___

### writableObjectMode

• `Optional` **writableObjectMode**: `boolean`

#### Inherited from

[DuplexOptions](internal_.internal.DuplexOptions.md).[writableObjectMode](internal_.internal.DuplexOptions.md#writableobjectmode)

#### Defined in

node_modules/@types/node/stream.d.ts:774

## Methods

### construct

▸ `Optional` **construct**(`this`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Transform`](../classes/internal_.Transform.md) |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Overrides

[DuplexOptions](internal_.internal.DuplexOptions.md).[construct](internal_.internal.DuplexOptions.md#construct)

#### Defined in

node_modules/@types/node/stream.d.ts:864

___

### destroy

▸ `Optional` **destroy**(`this`, `error`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Transform`](../classes/internal_.Transform.md) |
| `error` | ``null`` \| [`Error`](../modules/internal_.md#error) |
| `callback` | (`error`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Overrides

[DuplexOptions](internal_.internal.DuplexOptions.md).[destroy](internal_.internal.DuplexOptions.md#destroy)

#### Defined in

node_modules/@types/node/stream.d.ts:876

___

### final

▸ `Optional` **final**(`this`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Transform`](../classes/internal_.Transform.md) |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Overrides

[DuplexOptions](internal_.internal.DuplexOptions.md).[final](internal_.internal.DuplexOptions.md#final)

#### Defined in

node_modules/@types/node/stream.d.ts:875

___

### flush

▸ `Optional` **flush**(`this`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Transform`](../classes/internal_.Transform.md) |
| `callback` | [`TransformCallback`](../modules/internal_.md#transformcallback) |

#### Returns

`void`

#### Defined in

node_modules/@types/node/stream.d.ts:878

___

### read

▸ `Optional` **read**(`this`, `size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Transform`](../classes/internal_.Transform.md) |
| `size` | `number` |

#### Returns

`void`

#### Overrides

[DuplexOptions](internal_.internal.DuplexOptions.md).[read](internal_.internal.DuplexOptions.md#read)

#### Defined in

node_modules/@types/node/stream.d.ts:865

___

### transform

▸ `Optional` **transform**(`this`, `chunk`, `encoding`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Transform`](../classes/internal_.Transform.md) |
| `chunk` | `any` |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `callback` | [`TransformCallback`](../modules/internal_.md#transformcallback) |

#### Returns

`void`

#### Defined in

node_modules/@types/node/stream.d.ts:877

___

### write

▸ `Optional` **write**(`this`, `chunk`, `encoding`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Transform`](../classes/internal_.Transform.md) |
| `chunk` | `any` |
| `encoding` | [`BufferEncoding`](../modules/internal_.md#bufferencoding) |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Overrides

[DuplexOptions](internal_.internal.DuplexOptions.md).[write](internal_.internal.DuplexOptions.md#write)

#### Defined in

node_modules/@types/node/stream.d.ts:866

___

### writev

▸ `Optional` **writev**(`this`, `chunks`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Transform`](../classes/internal_.Transform.md) |
| `chunks` | { `chunk`: `any` ; `encoding`: [`BufferEncoding`](../modules/internal_.md#bufferencoding)  }[] |
| `callback` | (`error?`: ``null`` \| [`Error`](../modules/internal_.md#error)) => `void` |

#### Returns

`void`

#### Overrides

[DuplexOptions](internal_.internal.DuplexOptions.md).[writev](internal_.internal.DuplexOptions.md#writev)

#### Defined in

node_modules/@types/node/stream.d.ts:867
