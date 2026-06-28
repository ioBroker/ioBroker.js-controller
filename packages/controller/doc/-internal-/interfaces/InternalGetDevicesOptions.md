[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetDevicesOptions

# Interface: InternalGetDevicesOptions

Defined in: [adapter/src/lib/\_Types.ts:781](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L781)

Options for reading all devices

## Properties

### callback

> **callback**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`DeviceObject`](DeviceObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:785](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L785)

Called with the devices

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:783](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L783)

Optional settings including the user context
