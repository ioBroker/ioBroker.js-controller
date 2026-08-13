[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectAccess

# Interface: ObjectAccess

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:14](https://github.com/ioBroker/ioBroker.js-controller/blob/2ebf28464ebc247e66c1058f25b2ab47f7574935/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L14)

Reads the objects matching a pattern, used to discover alias objects during state subscription.

## Methods

### getForeignStateObjects()

> **getForeignStateObjects**(`pattern`, `options?`): `Promise`\<`Record`\<`string`, [`AnyObject`](../type-aliases/AnyObject.md)\>\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:20](https://github.com/ioBroker/ioBroker.js-controller/blob/2ebf28464ebc247e66c1058f25b2ab47f7574935/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L20)

Objects matching `pattern`, keyed by id. Bound to the legacy `getForeignObjects(pattern, null, null, options)`
call, whose `null` type/enums args clobber `options` — so no type filter and no user-ACL are applied;
only `alias.*` ids in the result are consumed. Kept as-is for behavior parity.

#### Parameters

##### pattern

`string`

##### options?

\{ `user?`: `` `system.user.${string}` ``; \} \| `null`

#### Returns

`Promise`\<`Record`\<`string`, [`AnyObject`](../type-aliases/AnyObject.md)\>\>
