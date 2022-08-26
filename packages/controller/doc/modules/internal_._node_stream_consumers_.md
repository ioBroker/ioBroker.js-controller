[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](internal_.md) / "node:stream/consumers"

# Namespace: "node:stream/consumers"

[<internal>](internal_.md)."node:stream/consumers"

## Table of contents

### Functions

- [arrayBuffer](internal_._node_stream_consumers_.md#arraybuffer)
- [blob](internal_._node_stream_consumers_.md#blob)
- [buffer](internal_._node_stream_consumers_.md#buffer)
- [json](internal_._node_stream_consumers_.md#json)
- [text](internal_._node_stream_consumers_.md#text)

## Functions

### arrayBuffer

▸ **arrayBuffer**(`stream`): `Promise`<`ArrayBuffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`Readable`](../classes/internal_.Readable.md) \| [`ReadableStream`](../interfaces/internal_.ReadableStream.md) \| [`AsyncIterator`](../interfaces/internal_.AsyncIterator.md)<`any`, `any`, `undefined`\> |

#### Returns

`Promise`<`ArrayBuffer`\>

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:18

___

### blob

▸ **blob**(`stream`): `Promise`<[`Blob`](../interfaces/internal_.Blob.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`Readable`](../classes/internal_.Readable.md) \| [`ReadableStream`](../interfaces/internal_.ReadableStream.md) \| [`AsyncIterator`](../interfaces/internal_.AsyncIterator.md)<`any`, `any`, `undefined`\> |

#### Returns

`Promise`<[`Blob`](../interfaces/internal_.Blob.md)\>

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:19

___

### buffer

▸ **buffer**(`stream`): `Promise`<[`Buffer`](internal_.md#buffer)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`Readable`](../classes/internal_.Readable.md) \| [`ReadableStream`](../interfaces/internal_.ReadableStream.md) \| [`AsyncIterator`](../interfaces/internal_.AsyncIterator.md)<`any`, `any`, `undefined`\> |

#### Returns

`Promise`<[`Buffer`](internal_.md#buffer)\>

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:16

___

### json

▸ **json**(`stream`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`Readable`](../classes/internal_.Readable.md) \| [`ReadableStream`](../interfaces/internal_.ReadableStream.md) \| [`AsyncIterator`](../interfaces/internal_.AsyncIterator.md)<`any`, `any`, `undefined`\> |

#### Returns

`Promise`<`unknown`\>

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:20

___

### text

▸ **text**(`stream`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`Readable`](../classes/internal_.Readable.md) \| [`ReadableStream`](../interfaces/internal_.ReadableStream.md) \| [`AsyncIterator`](../interfaces/internal_.AsyncIterator.md)<`any`, `any`, `undefined`\> |

#### Returns

`Promise`<`string`\>

#### Defined in

node_modules/@types/node/stream/consumers.d.ts:17
