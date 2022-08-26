[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [<internal\>](internal_.md) / internal

# Namespace: internal

[<internal>](internal_.md).internal

## Table of contents

### References

- [Duplex](internal_.internal.md#duplex)
- [Readable](internal_.internal.md#readable)
- [Stream](internal_.internal.md#stream)
- [Transform](internal_.internal.md#transform)
- [TransformCallback](internal_.internal.md#transformcallback)
- [TransformOptions](internal_.internal.md#transformoptions)
- [Writable](internal_.internal.md#writable)

### Namespaces

- [finished](internal_.internal.finished.md)
- [pipeline](internal_.internal.pipeline.md)

### Classes

- [PassThrough](../classes/internal_.internal.PassThrough.md)

### Interfaces

- [DuplexOptions](../interfaces/internal_.internal.DuplexOptions.md)
- [FinishedOptions](../interfaces/internal_.internal.FinishedOptions.md)
- [Pipe](../interfaces/internal_.internal.Pipe.md)
- [PipelineOptions](../interfaces/internal_.internal.PipelineOptions.md)
- [ReadableOptions](../interfaces/internal_.internal.ReadableOptions.md)
- [StreamOptions](../interfaces/internal_.internal.StreamOptions.md)
- [WritableOptions](../interfaces/internal_.internal.WritableOptions.md)

### Type Aliases

- [PipelineCallback](internal_.internal.md#pipelinecallback)
- [PipelineDestination](internal_.internal.md#pipelinedestination)
- [PipelineDestinationIterableFunction](internal_.internal.md#pipelinedestinationiterablefunction)
- [PipelineDestinationPromiseFunction](internal_.internal.md#pipelinedestinationpromisefunction)
- [PipelinePromise](internal_.internal.md#pipelinepromise)
- [PipelineSource](internal_.internal.md#pipelinesource)
- [PipelineSourceFunction](internal_.internal.md#pipelinesourcefunction)
- [PipelineTransform](internal_.internal.md#pipelinetransform)
- [PipelineTransformSource](internal_.internal.md#pipelinetransformsource)

### Variables

- [consumers](internal_.internal.md#consumers)
- [promises](internal_.internal.md#promises)

### Functions

- [addAbortSignal](internal_.internal.md#addabortsignal)
- [finished](internal_.internal.md#finished)
- [pipeline](internal_.internal.md#pipeline)

## References

### Duplex

Re-exports [Duplex](../classes/internal_.Duplex.md)

___

### Readable

Re-exports [Readable](../classes/internal_.Readable.md)

___

### Stream

Re-exports [Stream](../classes/internal_.Stream.md)

___

### Transform

Re-exports [Transform](../classes/internal_.Transform.md)

___

### TransformCallback

Re-exports [TransformCallback](internal_.md#transformcallback)

___

### TransformOptions

Re-exports [TransformOptions](../interfaces/internal_.TransformOptions.md)

___

### Writable

Re-exports [Writable](../classes/internal_.Writable.md)

## Type Aliases

### PipelineCallback

Ƭ **PipelineCallback**<`S`\>: `S` extends [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`any`, infer P\> ? (`err`: [`ErrnoException`](../interfaces/internal_.ErrnoException.md) \| ``null``, `value`: `P`) => `void` : (`err`: [`ErrnoException`](../interfaces/internal_.ErrnoException.md) \| ``null``) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`PipelineDestination`](internal_.internal.md#pipelinedestination)<`any`, `any`\> |

#### Defined in

node_modules/@types/node/stream.d.ts:1024

___

### PipelineDestination

Ƭ **PipelineDestination**<`S`, `P`\>: `S` extends [`PipelineTransformSource`](internal_.internal.md#pipelinetransformsource)<infer ST\> ? [`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`ST`\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`ST`, `P`\> : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`PipelineTransformSource`](internal_.internal.md#pipelinetransformsource)<`any`\> |
| `P` | `P` |

#### Defined in

node_modules/@types/node/stream.d.ts:1021

___

### PipelineDestinationIterableFunction

Ƭ **PipelineDestinationIterableFunction**<`T`\>: (`source`: [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`T`\>) => [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`any`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`source`): [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`T`\> |

##### Returns

[`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`any`\>

#### Defined in

node_modules/@types/node/stream.d.ts:1019

___

### PipelineDestinationPromiseFunction

Ƭ **PipelineDestinationPromiseFunction**<`T`, `P`\>: (`source`: [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`T`\>) => `Promise`<`P`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `P` |

#### Type declaration

▸ (`source`): `Promise`<`P`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`T`\> |

##### Returns

`Promise`<`P`\>

#### Defined in

node_modules/@types/node/stream.d.ts:1020

___

### PipelinePromise

Ƭ **PipelinePromise**<`S`\>: `S` extends [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`any`, infer P\> ? `Promise`<`P`\> : `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`PipelineDestination`](internal_.internal.md#pipelinedestination)<`any`, `any`\> |

#### Defined in

node_modules/@types/node/stream.d.ts:1027

___

### PipelineSource

Ƭ **PipelineSource**<`T`\>: [`Iterable`](../interfaces/internal_.Iterable.md)<`T`\> \| [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`T`\> \| [`ReadableStream`](../interfaces/internal_.ReadableStream.md) \| [`PipelineSourceFunction`](internal_.internal.md#pipelinesourcefunction)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/@types/node/stream.d.ts:1014

___

### PipelineSourceFunction

Ƭ **PipelineSourceFunction**<`T`\>: () => [`Iterable`](../interfaces/internal_.Iterable.md)<`T`\> \| [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (): [`Iterable`](../interfaces/internal_.Iterable.md)<`T`\> \| [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`T`\>

##### Returns

[`Iterable`](../interfaces/internal_.Iterable.md)<`T`\> \| [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`T`\>

#### Defined in

node_modules/@types/node/stream.d.ts:1013

___

### PipelineTransform

Ƭ **PipelineTransform**<`S`, `U`\>: [`ReadWriteStream`](../interfaces/internal_.ReadWriteStream.md) \| (`source`: `S` extends (...`args`: `any`[]) => [`Iterable`](../interfaces/internal_.Iterable.md)<infer ST\> \| [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<infer ST\> ? [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`ST`\> : `S`) => [`AsyncIterable`](../interfaces/internal_.AsyncIterable.md)<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`PipelineTransformSource`](internal_.internal.md#pipelinetransformsource)<`any`\> |
| `U` | `U` |

#### Defined in

node_modules/@types/node/stream.d.ts:1015

___

### PipelineTransformSource

Ƭ **PipelineTransformSource**<`T`\>: [`PipelineSource`](internal_.internal.md#pipelinesource)<`T`\> \| [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`any`, `T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/@types/node/stream.d.ts:1018

## Variables

### consumers

• `Const` **consumers**: typeof [`"node:stream/consumers"`](internal_._node_stream_consumers_.md)

#### Defined in

node_modules/@types/node/stream.d.ts:1242

___

### promises

• `Const` **promises**: typeof [`"node:stream/promises"`](internal_._node_stream_promises_.md)

#### Defined in

node_modules/@types/node/stream.d.ts:1241

## Functions

### addAbortSignal

▸ **addAbortSignal**<`T`\>(`signal`, `stream`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Stream`](../classes/internal_.Stream.md)<`T`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signal` | [`AbortSignal`](internal_.md#abortsignal) |  |
| `stream` | `T` |  |

#### Returns

`T`

#### Defined in

node_modules/@types/node/stream.d.ts:946

___

### finished

▸ **finished**(`stream`, `options`, `callback`): () => `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`ReadableStream`](../interfaces/internal_.ReadableStream.md) \| [`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`ReadWriteStream`](../interfaces/internal_.ReadWriteStream.md) |  |
| `options` | [`FinishedOptions`](../interfaces/internal_.internal.FinishedOptions.md) | - |
| `callback` | (`err?`: ``null`` \| [`ErrnoException`](../interfaces/internal_.ErrnoException.md)) => `void` |  |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/@types/node/stream.d.ts:1008

▸ **finished**(`stream`, `callback`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | [`ReadableStream`](../interfaces/internal_.ReadableStream.md) \| [`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`ReadWriteStream`](../interfaces/internal_.ReadWriteStream.md) |
| `callback` | (`err?`: ``null`` \| [`ErrnoException`](../interfaces/internal_.ErrnoException.md)) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

node_modules/@types/node/stream.d.ts:1009

___

### pipeline

▸ **pipeline**<`A`, `B`\>(`source`, `destination`, `callback?`): `B` extends [`WritableStream`](../interfaces/internal_.WritableStream.md) ? `B` : [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`PipelineSource`](internal_.internal.md#pipelinesource)<`any`\> |
| `B` | extends [`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`string` \| [`Buffer`](internal_.md#buffer)\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`string` \| [`Buffer`](internal_.md#buffer), `any`\> \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`any`\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`any`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `A` | - |
| `destination` | `B` | - |
| `callback?` | [`PipelineCallback`](internal_.internal.md#pipelinecallback)<`B`\> |  |

#### Returns

`B` extends [`WritableStream`](../interfaces/internal_.WritableStream.md) ? `B` : [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Defined in

node_modules/@types/node/stream.d.ts:1156

▸ **pipeline**<`A`, `T1`, `B`\>(`source`, `transform1`, `destination`, `callback?`): `B` extends [`WritableStream`](../interfaces/internal_.WritableStream.md) ? `B` : [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`PipelineSource`](internal_.internal.md#pipelinesource)<`any`\> |
| `T1` | extends [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`A`, `any`\> |
| `B` | extends [`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`string` \| [`Buffer`](internal_.md#buffer)\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`string` \| [`Buffer`](internal_.md#buffer), `any`\> \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`any`\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `A` |
| `transform1` | `T1` |
| `destination` | `B` |
| `callback?` | [`PipelineCallback`](internal_.internal.md#pipelinecallback)<`B`\> |

#### Returns

`B` extends [`WritableStream`](../interfaces/internal_.WritableStream.md) ? `B` : [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Defined in

node_modules/@types/node/stream.d.ts:1161

▸ **pipeline**<`A`, `T1`, `T2`, `B`\>(`source`, `transform1`, `transform2`, `destination`, `callback?`): `B` extends [`WritableStream`](../interfaces/internal_.WritableStream.md) ? `B` : [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`PipelineSource`](internal_.internal.md#pipelinesource)<`any`\> |
| `T1` | extends [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`A`, `any`\> |
| `T2` | extends [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`T1`, `any`\> |
| `B` | extends [`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`string` \| [`Buffer`](internal_.md#buffer)\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`string` \| [`Buffer`](internal_.md#buffer), `any`\> \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`any`\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `A` |
| `transform1` | `T1` |
| `transform2` | `T2` |
| `destination` | `B` |
| `callback?` | [`PipelineCallback`](internal_.internal.md#pipelinecallback)<`B`\> |

#### Returns

`B` extends [`WritableStream`](../interfaces/internal_.WritableStream.md) ? `B` : [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Defined in

node_modules/@types/node/stream.d.ts:1167

▸ **pipeline**<`A`, `T1`, `T2`, `T3`, `B`\>(`source`, `transform1`, `transform2`, `transform3`, `destination`, `callback?`): `B` extends [`WritableStream`](../interfaces/internal_.WritableStream.md) ? `B` : [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`PipelineSource`](internal_.internal.md#pipelinesource)<`any`\> |
| `T1` | extends [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`A`, `any`\> |
| `T2` | extends [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`T1`, `any`\> |
| `T3` | extends [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`T2`, `any`\> |
| `B` | extends [`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`string` \| [`Buffer`](internal_.md#buffer)\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`string` \| [`Buffer`](internal_.md#buffer), `any`\> \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`any`\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `A` |
| `transform1` | `T1` |
| `transform2` | `T2` |
| `transform3` | `T3` |
| `destination` | `B` |
| `callback?` | [`PipelineCallback`](internal_.internal.md#pipelinecallback)<`B`\> |

#### Returns

`B` extends [`WritableStream`](../interfaces/internal_.WritableStream.md) ? `B` : [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Defined in

node_modules/@types/node/stream.d.ts:1174

▸ **pipeline**<`A`, `T1`, `T2`, `T3`, `T4`, `B`\>(`source`, `transform1`, `transform2`, `transform3`, `transform4`, `destination`, `callback?`): `B` extends [`WritableStream`](../interfaces/internal_.WritableStream.md) ? `B` : [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`PipelineSource`](internal_.internal.md#pipelinesource)<`any`\> |
| `T1` | extends [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`A`, `any`\> |
| `T2` | extends [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`T1`, `any`\> |
| `T3` | extends [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`T2`, `any`\> |
| `T4` | extends [`PipelineTransform`](internal_.internal.md#pipelinetransform)<`T3`, `any`\> |
| `B` | extends [`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`string` \| [`Buffer`](internal_.md#buffer)\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`string` \| [`Buffer`](internal_.md#buffer), `any`\> \| [`PipelineDestinationIterableFunction`](internal_.internal.md#pipelinedestinationiterablefunction)<`any`\> \| [`PipelineDestinationPromiseFunction`](internal_.internal.md#pipelinedestinationpromisefunction)<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `A` |
| `transform1` | `T1` |
| `transform2` | `T2` |
| `transform3` | `T3` |
| `transform4` | `T4` |
| `destination` | `B` |
| `callback?` | [`PipelineCallback`](internal_.internal.md#pipelinecallback)<`B`\> |

#### Returns

`B` extends [`WritableStream`](../interfaces/internal_.WritableStream.md) ? `B` : [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Defined in

node_modules/@types/node/stream.d.ts:1181

▸ **pipeline**(`streams`, `callback?`): [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `streams` | readonly ([`ReadableStream`](../interfaces/internal_.ReadableStream.md) \| [`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`ReadWriteStream`](../interfaces/internal_.ReadWriteStream.md))[] |
| `callback?` | (`err`: ``null`` \| [`ErrnoException`](../interfaces/internal_.ErrnoException.md)) => `void` |

#### Returns

[`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Defined in

node_modules/@types/node/stream.d.ts:1189

▸ **pipeline**(`stream1`, `stream2`, ...`streams`): [`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream1` | [`ReadableStream`](../interfaces/internal_.ReadableStream.md) |
| `stream2` | [`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`ReadWriteStream`](../interfaces/internal_.ReadWriteStream.md) |
| `...streams` | ([`WritableStream`](../interfaces/internal_.WritableStream.md) \| [`ReadWriteStream`](../interfaces/internal_.ReadWriteStream.md) \| (`err`: ``null`` \| [`ErrnoException`](../interfaces/internal_.ErrnoException.md)) => `void`)[] |

#### Returns

[`WritableStream`](../interfaces/internal_.WritableStream.md)

#### Defined in

node_modules/@types/node/stream.d.ts:1193
