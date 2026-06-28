[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCreateStateOptions

# Interface: InternalCreateStateOptions

Defined in: [adapter/src/lib/\_Types.ts:623](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L623)

Options for creating a state

## Properties

### \_native

> **\_native**: `Record`\<`string`, `any`\>

Defined in: [adapter/src/lib/\_Types.ts:633](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L633)

The native section of the state object

***

### callback?

> `optional` **callback?**: [`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:637](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L637)

Called once the state has been created

***

### common

> **common**: `Partial`\<[`StateCommon`](StateCommon.md)\>

Defined in: [adapter/src/lib/\_Types.ts:631](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L631)

The common section of the state object

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:635](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L635)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:627](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L627)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:625](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L625)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:629](https://github.com/ioBroker/ioBroker.js-controller/blob/287090c3a05820509691e1c5c69f840e68111d1c/packages/adapter/src/lib/_Types.ts#L629)

The name of the state
