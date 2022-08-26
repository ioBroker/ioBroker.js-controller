[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](../modules/internal_.md) / Blob

# Interface: Blob

[<internal>](../modules/internal_.md).Blob

## Table of contents

### Properties

- [size](internal_.Blob.md#size)
- [type](internal_.Blob.md#type)

### Methods

- [arrayBuffer](internal_.Blob.md#arraybuffer)
- [slice](internal_.Blob.md#slice)
- [stream](internal_.Blob.md#stream)
- [text](internal_.Blob.md#text)

## Properties

### size

• `Readonly` **size**: `number`

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:7

___

### type

• `Readonly` **type**: `string`

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:8

## Methods

### arrayBuffer

▸ **arrayBuffer**(): `Promise`<`ArrayBuffer`\>

#### Returns

`Promise`<`ArrayBuffer`\>

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:9

___

### slice

▸ **slice**(`start?`, `end?`, `contentType?`): [`Blob`](internal_.Blob.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `start?` | `number` |
| `end?` | `number` |
| `contentType?` | `string` |

#### Returns

[`Blob`](internal_.Blob.md)

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:10

___

### stream

▸ **stream**(): [`ReadableStream`](internal_.ReadableStream.md)

#### Returns

[`ReadableStream`](internal_.ReadableStream.md)

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:11

___

### text

▸ **text**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:12
