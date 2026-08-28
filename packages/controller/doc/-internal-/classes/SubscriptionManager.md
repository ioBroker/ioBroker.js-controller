[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SubscriptionManager

# Class: SubscriptionManager

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:27](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L27)

Owns object-, file- and state-change subscriptions plus the auto-subscribe bookkeeping.

## Extends

- [`AdapterContextBase`](AdapterContextBase.md)

## Constructors

### Constructor

> **new SubscriptionManager**(`ctx`, `fixId`, `aliasManager`, `objectAccess`): `SubscriptionManager`

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:39](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L39)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

##### fixId

[`FixId`](../type-aliases/FixId.md)

Namespace-prefixer bound to the adapter's Validator

##### aliasManager

[`AliasManager`](AliasManager.md)

Alias subscription cache and bookkeeping

##### objectAccess

[`ObjectAccess`](../interfaces/ObjectAccess.md)

Reader for state-typed objects matching a pattern

#### Returns

`SubscriptionManager`

#### Overrides

[`AdapterContextBase`](AdapterContextBase.md).[`constructor`](AdapterContextBase.md#constructor)

## Methods

### addSubscribableInstance()

> **addSubscribableInstance**(`id`): `void`

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:119](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L119)

Register an instance as auto-subscribable (its `subscribes` counter is maintained on subscribe/unsubscribe).

#### Parameters

##### id

`string`

instance id, e.g. `pushover.0`

#### Returns

`void`

***

### autoSubscribeOn()

> **autoSubscribeOn**(): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:138](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L138)

Populate the auto-subscribe instance list from the objects DB.

#### Returns

`Promise`\<`void`\>

***

### removeSubscribableInstance()

> **removeSubscribableInstance**(`id`): `void`

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:130](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L130)

Stop treating an instance as auto-subscribable.

#### Parameters

##### id

`string`

instance id, e.g. `pushover.0`

#### Returns

`void`

***

### subscribeForeignFiles()

> **subscribeForeignFiles**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:99](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L99)

Subscribe to file changes in a specific instance.

#### Parameters

##### id

`string`

adapter id, e.g. `vis-2.0`

##### pattern

[`Pattern`](../type-aliases/Pattern.md)

pattern or array of patterns

##### options?

[`SubOptions`](../type-aliases/SubOptions.md)

optional user context

#### Returns

`Promise`\<`void`\>

***

### subscribeForeignObjects()

> **subscribeForeignObjects**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:78](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L78)

Subscribe to object changes in any instance.

#### Parameters

##### pattern

[`Pattern`](../type-aliases/Pattern.md)

pattern or array of patterns

##### options?

[`SubOptions`](../type-aliases/SubOptions.md)

optional user context

#### Returns

`Promise`\<`void`\>

***

### subscribeForeignStates()

> **subscribeForeignStates**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:172](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L172)

Subscribe to state changes in any instance, resolving aliases and maintaining auto-subscribe counters.

#### Parameters

##### pattern

[`Pattern`](../type-aliases/Pattern.md)

pattern, `*`, an `alias.*` id, or an array of ids/patterns

##### options?

[`SubOptions`](../type-aliases/SubOptions.md)

optional user context

#### Returns

`Promise`\<`void`\>

***

### subscribeObjects()

> **subscribeObjects**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:53](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L53)

Subscribe to object changes within this instance's namespace.

#### Parameters

##### pattern

[`Pattern`](../type-aliases/Pattern.md)

pattern without namespace, `*` for all own objects, or an array of patterns
       passed through as-is (not namespaced)

##### options?

[`SubOptions`](../type-aliases/SubOptions.md)

optional user context

#### Returns

`Promise`\<`void`\>

***

### unsubscribeForeignFiles()

> **unsubscribeForeignFiles**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:110](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L110)

Unsubscribe from file changes in a specific instance.

#### Parameters

##### id

`string`

adapter id, e.g. `vis-2.0`

##### pattern

[`Pattern`](../type-aliases/Pattern.md)

pattern or array of patterns (defaults to `*`)

##### options?

[`SubOptions`](../type-aliases/SubOptions.md)

optional user context

#### Returns

`Promise`\<`void`\>

***

### unsubscribeForeignObjects()

> **unsubscribeForeignObjects**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:88](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L88)

Unsubscribe from object changes in any instance.

#### Parameters

##### pattern

[`Pattern`](../type-aliases/Pattern.md)

pattern or array of patterns (defaults to `*`)

##### options?

[`SubOptions`](../type-aliases/SubOptions.md)

optional user context

#### Returns

`Promise`\<`void`\>

***

### unsubscribeForeignStates()

> **unsubscribeForeignStates**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:337](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L337)

Unsubscribe from state changes in any instance, mirroring [subscribeForeignStates](#subscribeforeignstates).

#### Parameters

##### pattern

[`Pattern`](../type-aliases/Pattern.md)

pattern, `*`, an `alias.*` id, or an array of ids/patterns

##### options?

[`SubOptions`](../type-aliases/SubOptions.md)

optional user context

#### Returns

`Promise`\<`void`\>

***

### unsubscribeObjects()

> **unsubscribeObjects**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:66](https://github.com/ioBroker/ioBroker.js-controller/blob/f73c97291ecab11b4e7119c158d0ddbf508a91f5/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L66)

Unsubscribe from object changes within this instance's namespace.

#### Parameters

##### pattern

[`Pattern`](../type-aliases/Pattern.md)

pattern without namespace, `*` for all own objects, or an array of patterns
       passed through as-is (not namespaced)

##### options?

[`SubOptions`](../type-aliases/SubOptions.md)

optional user context

#### Returns

`Promise`\<`void`\>
