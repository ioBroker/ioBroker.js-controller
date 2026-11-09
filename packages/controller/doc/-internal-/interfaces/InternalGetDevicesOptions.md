[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetDevicesOptions

# Interface: InternalGetDevicesOptions

Defined in: [adapter/src/lib/\_Types.ts:827](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L827)

Options for reading all devices

## Properties

### callback

> **callback**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`DeviceObject`](DeviceObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:831](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L831)

Called with the devices

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:829](https://github.com/ioBroker/ioBroker.js-controller/blob/35649f21e4f20d2707b133cc45f16a31003db77b/packages/adapter/src/lib/_Types.ts#L829)

Optional settings including the user context
