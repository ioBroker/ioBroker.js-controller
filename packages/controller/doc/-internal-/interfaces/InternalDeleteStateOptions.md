[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalDeleteStateOptions

# Interface: InternalDeleteStateOptions

Defined in: [adapter/src/lib/\_Types.ts:769](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L769)

Options for deleting a state by device/channel/name

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:779](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L779)

Called once the state has been deleted

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:777](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L777)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:773](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L773)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:771](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L771)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:775](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/adapter/src/lib/_Types.ts#L775)

The name of the state
