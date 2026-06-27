[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetChannelsOfOptions

# Interface: InternalGetChannelsOfOptions

Defined in: [adapter/src/lib/\_Types.ts:526](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L526)

Options for reading the channels of a device

## Properties

### callback?

> `optional` **callback?**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`ChannelObject`](ChannelObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:530](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L530)

Called with the channels

***

### options?

> `optional` **options?**: `Record`\<`string`, `any`\> \| `null`

Defined in: [adapter/src/lib/\_Types.ts:532](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L532)

Optional settings including the user context

***

### parentDevice?

> `optional` **parentDevice?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:528](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/adapter/src/lib/_Types.ts#L528)

The parent device to read the channels of
