[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / AliasManager

# Class: AliasManager

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:18](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L18)

Owns the alias subscription cache and its bookkeeping: which real (source) states feed which
`alias.*` targets, the alias subscription patterns, and the single `alias.*` object subscription.
The source-state change fan-out ([resolveSourceChange](#resolvesourcechange)) is synchronous by contract so the
state-change handler cannot interleave a cache mutation mid-fan-out.

## Extends

- [`AdapterContextBase`](AdapterContextBase.md)

## Constructors

### Constructor

> **new AliasManager**(`ctx`, `validateId`): `AliasManager`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:28](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L28)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

##### validateId

[`ValidateId`](../type-aliases/ValidateId.md)

Bound id validator from the adapter's Validator instance

#### Returns

`AliasManager`

#### Overrides

[`AdapterContextBase`](AdapterContextBase.md).[`constructor`](AdapterContextBase.md#constructor)

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:43](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L43)

Number of tracked source states.

##### Returns

`number`

## Methods

### addAliasSubscribe()

> **addAliasSubscribe**(`aliasObj`, `pattern`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:222](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L222)

Register an alias target for its source state, subscribing the source state (and reading its
metadata once). Preserves the create-before-await ordering and the post-await existence
re-check that guard a concurrent removal.

#### Parameters

##### aliasObj

[`AnyObject`](../type-aliases/AnyObject.md)

the `alias.*` object being subscribed

##### pattern

`string`

the subscription pattern that pulled it in

#### Returns

`Promise`\<`void`\>

***

### addPattern()

> **addPattern**(`pattern`): `void`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:61](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L61)

Track a subscription pattern.

#### Parameters

##### pattern

`string`

the subscription pattern

#### Returns

`void`

***

### deletePattern()

> **deletePattern**(`pattern`): `void`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:70](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L70)

Stop tracking a subscription pattern.

#### Parameters

##### pattern

`string`

the subscription pattern

#### Returns

`void`

***

### ensureAliasObjectSubscription()

> **ensureAliasObjectSubscription**(): `void`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:199](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L199)

Subscribe the `alias.*` object range once (idempotent).

#### Returns

`void`

***

### handleAliasObjectChange()

> **handleAliasObjectChange**(`id`, `obj`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:102](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L102)

Reacts to a change of an `alias.*` object: re-points, updates, or removes the target across the
tracked sources, and picks up a newly-appeared alias that falls into a tracked pattern.
Live-iterates the cache while awaiting add/remove — the loop lives here, with the map, to
preserve the original mutation-during-iteration semantics exactly.

#### Parameters

##### id

`string`

the changed alias object id

##### obj

[`Object`](../type-aliases/Object.md) \| `null` \| `undefined`

the new object (null/undefined if deleted)

#### Returns

`Promise`\<`void`\>

***

### hasPattern()

> **hasPattern**(`pattern`): `boolean`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:52](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L52)

Whether the given subscription pattern is tracked.

#### Parameters

##### pattern

`string`

the subscription pattern

#### Returns

`boolean`

***

### hasSource()

> **hasSource**(`id`): `boolean`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:38](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L38)

Whether the given source (real) state id currently feeds any alias.

#### Parameters

##### id

`string`

the real source state id

#### Returns

`boolean`

***

### matchesAnyPattern()

> **matchesAnyPattern**(`id`): `boolean`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:79](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L79)

Whether `id` falls into any tracked alias pattern (wildcards via pattern2RegEx).

#### Parameters

##### id

`string`

the id to test against the tracked patterns

#### Returns

`boolean`

***

### maybeDropAliasObjectSubscription()

> **maybeDropAliasObjectSubscription**(): `void`

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:207](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L207)

Drop the `alias.*` object subscription when no aliases remain.

#### Returns

`void`

***

### removeAliasSubscribe()

> **removeAliasSubscribe**(`sourceId`, `aliasObjOrIdx`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:276](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L276)

Remove one alias target from its source; when the source has no targets left, delete the entry
and unsubscribe the source state.

#### Parameters

##### sourceId

`string`

the real source state id

##### aliasObjOrIdx

`number` \| [`AliasTargetEntry`](../interfaces/AliasTargetEntry.md)

the target entry or its index in the targets array

#### Returns

`Promise`\<`void`\>

***

### removeTargetsForPattern()

> **removeTargetsForPattern**(`pattern`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:144](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L144)

Removes every target subscribed under the given pattern, live-iterating the cache so a removal
mutating the map mid-loop keeps the original semantics. Awaits each removal.

#### Parameters

##### pattern

`string`

the subscription pattern being unsubscribed

#### Returns

`Promise`\<`void`\>

***

### resolveSourceChange()

> **resolveSourceChange**(`sourceId`, `state`): `object`[]

Defined in: [adapter/src/lib/adapter/managers/AliasManager.ts:164](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/AliasManager.ts#L164)

Synchronously computes the fan-out of a source (real) state change to its alias targets.
Returns one `{ targetId, state }` per unique target. MUST NOT await — the caller relies on the
cache not mutating between read and emit.

#### Parameters

##### sourceId

`string`

the changed real state id

##### state

[`State`](../interfaces/State.md) \| `null` \| `undefined`

the new state value (or null on deletion)

#### Returns

`object`[]
