[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalDeleteStateOptions

# Interface: InternalDeleteStateOptions

Defined in: [adapter/src/lib/\_Types.ts:790](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/adapter/src/lib/_Types.ts#L790)

Options for deleting a state by device/channel/name

## Properties

### callback?

> `optional` **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:800](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/adapter/src/lib/_Types.ts#L800)

Called once the state has been deleted

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:798](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/adapter/src/lib/_Types.ts#L798)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:794](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/adapter/src/lib/_Types.ts#L794)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:792](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/adapter/src/lib/_Types.ts#L792)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:796](https://github.com/ioBroker/ioBroker.js-controller/blob/fbcb96b805024a3fe1d4616ca7344b605c640ae5/packages/adapter/src/lib/_Types.ts#L796)

The name of the state
