[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalGetDevicesOptions

# Interface: InternalGetDevicesOptions

Defined in: [adapter/src/lib/\_Types.ts:792](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/adapter/src/lib/_Types.ts#L792)

Options for reading all devices

## Properties

### callback

> **callback**: [`GetObjectsCallback3`](../type-aliases/GetObjectsCallback3.md)\<[`DeviceObject`](DeviceObject.md)\>

Defined in: [adapter/src/lib/\_Types.ts:796](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/adapter/src/lib/_Types.ts#L796)

Called with the devices

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:794](https://github.com/ioBroker/ioBroker.js-controller/blob/45e1308b97991aa172e3f71f94494b11cc461548/packages/adapter/src/lib/_Types.ts#L794)

Optional settings including the user context
