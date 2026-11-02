[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / UserInterfaceClientSubscribeReturnType

# Interface: UserInterfaceClientSubscribeReturnType

Defined in: [adapter/src/lib/\_Types.ts:161](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L161)

Result returned by the adapter when a UI client subscribes

## Properties

### accepted

> **accepted**: `boolean`

Defined in: [adapter/src/lib/\_Types.ts:163](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L163)

If the adapter has accepted the client subscription

***

### error?

> `optional` **error?**: `string`

Defined in: [adapter/src/lib/\_Types.ts:167](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L167)

Optional error if not accepted

***

### heartbeat?

> `optional` **heartbeat?**: `number`

Defined in: [adapter/src/lib/\_Types.ts:165](https://github.com/ioBroker/ioBroker.js-controller/blob/5f38a087bb763386b99c4383020aa2de144ca730/packages/adapter/src/lib/_Types.ts#L165)

Optional heartbeat, if set, the client needs to re-subscribe every heartbeat interval
