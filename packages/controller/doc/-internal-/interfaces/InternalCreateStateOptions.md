[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / InternalCreateStateOptions

# Interface: InternalCreateStateOptions

Defined in: [adapter/src/lib/\_Types.ts:634](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L634)

Options for creating a state

## Properties

### \_native

> **\_native**: `Record`\<`string`, `any`\>

Defined in: [adapter/src/lib/\_Types.ts:644](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L644)

The native section of the state object

***

### callback?

> `optional` **callback?**: [`SetObjectCallback`](../type-aliases/SetObjectCallback.md)

Defined in: [adapter/src/lib/\_Types.ts:648](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L648)

Called once the state has been created

***

### common

> **common**: `Partial`\<[`StateCommon`](StateCommon.md)\>

Defined in: [adapter/src/lib/\_Types.ts:642](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L642)

The common section of the state object

***

### options?

> `optional` **options?**: \{ `user?`: `` `system.user.${string}` ``; \} \| `null`

Defined in: [adapter/src/lib/\_Types.ts:646](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L646)

Optional settings including the user context

***

### parentChannel

> **parentChannel**: `string`

Defined in: [adapter/src/lib/\_Types.ts:638](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L638)

The parent channel name

***

### parentDevice

> **parentDevice**: `string`

Defined in: [adapter/src/lib/\_Types.ts:636](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L636)

The parent device name

***

### stateName

> **stateName**: `string`

Defined in: [adapter/src/lib/\_Types.ts:640](https://github.com/ioBroker/ioBroker.js-controller/blob/da1005b6bc059f298a1976c82df5fc4c6fcd7c65/packages/adapter/src/lib/_Types.ts#L640)

The name of the state
