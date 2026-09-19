[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceClientSubscribeReturnType

# Interface: UserInterfaceClientSubscribeReturnType

Defined in: [adapter/src/lib/\_Types.ts:147](https://github.com/ioBroker/ioBroker.js-controller/blob/617b2e7b40020b088e9d786fd9a930a250ea708b/packages/adapter/src/lib/_Types.ts#L147)

## Properties

### accepted

> **accepted**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:149](https://github.com/ioBroker/ioBroker.js-controller/blob/617b2e7b40020b088e9d786fd9a930a250ea708b/packages/adapter/src/lib/_Types.ts#L149)

If the adapter has accepted the client subscription

***

### error?

> `optional` **error?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:153](https://github.com/ioBroker/ioBroker.js-controller/blob/617b2e7b40020b088e9d786fd9a930a250ea708b/packages/adapter/src/lib/_Types.ts#L153)

Optional error if not accepted

***

### heartbeat?

> `optional` **heartbeat?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:151](https://github.com/ioBroker/ioBroker.js-controller/blob/617b2e7b40020b088e9d786fd9a930a250ea708b/packages/adapter/src/lib/_Types.ts#L151)

Optional heartbeat, if set, the client needs to re-subscribe every heartbeat interval
