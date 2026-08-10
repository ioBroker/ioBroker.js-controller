[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / SubscriptionManager

# Class: SubscriptionManager

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:11](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L11)

Owns object- and file-change subscriptions, delegating to the objects DB client.

## Extends

- [`AdapterContextBase`](AdapterContextBase.md)

## Constructors

### Constructor

> **new SubscriptionManager**(`ctx`, `fixId`): `SubscriptionManager`

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:18](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L18)

#### Parameters

##### ctx

[`AdapterContext`](../interfaces/AdapterContext.md)

Shared adapter context providing live runtime state

##### fixId

[`FixId`](../type-aliases/FixId.md)

Namespace-prefixer bound to the adapter's Validator

#### Returns

`SubscriptionManager`

#### Overrides

[`AdapterContextBase`](AdapterContextBase.md).[`constructor`](AdapterContextBase.md#constructor)

## Methods

### subscribeForeignFiles()

> **subscribeForeignFiles**(`id`, `pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:76](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L76)

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

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:55](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L55)

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

### subscribeObjects()

> **subscribeObjects**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:30](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L30)

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

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:87](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L87)

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

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:65](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L65)

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

### unsubscribeObjects()

> **unsubscribeObjects**(`pattern`, `options?`): `Promise`\<`void`\>

Defined in: [adapter/src/lib/adapter/managers/SubscriptionManager.ts:43](https://github.com/ioBroker/ioBroker.js-controller/blob/1bd08742df68169393d8e7f305058eee3421a1d9/packages/adapter/src/lib/adapter/managers/SubscriptionManager.ts#L43)

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
