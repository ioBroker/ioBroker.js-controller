[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StateRedisClient

# Class: StateRedisClient

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:32

## Constructors

### Constructor

> **new StateRedisClient**(`settings`): `StateRedisClient`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:55

#### Parameters

##### settings

[`StatesSettings`](../interfaces/StatesSettings.md)

#### Returns

`StateRedisClient`

## Properties

### namespaceMsg

> **namespaceMsg**: `string`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:36

## Methods

### \_destroyDBHelper()

> **\_destroyDBHelper**(`keys`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:90

#### Parameters

##### keys

`string`[]

array of keys which will be deleted from db

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

function to be executed after keys have been deleted

#### Returns

`Promise`\<`void`\>

***

### \_determineProtocolVersion()

> **\_determineProtocolVersion**(): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:60

Checks if we are allowed to start and sets the protocol version accordingly

#### Returns

`Promise`\<`void`\>

***

### connectDb()

> **connectDb**(): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:61

#### Returns

`void`

***

### delState()

> **delState**(`id`, `callback?`): `Promise`\<`string` \| `void` \| `undefined`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:96

#### Parameters

##### id

`string`

##### callback?

[`DeleteStateCallback`](../type-aliases/DeleteStateCallback.md)

#### Returns

`Promise`\<`string` \| `void` \| `undefined`\>

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:95

#### Returns

`Promise`\<`void`\>

***

### destroyDB()

> **destroyDB**(`callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:94

#### Parameters

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

cb function to be executed after DB has been destroyed

#### Returns

`Promise`\<`void`\>

***

### destroySession()

> **destroySession**(`id`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:121

#### Parameters

##### id

`string`

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

***

### getKeys()

#### Call Signature

> **getKeys**(`pattern`, `callback?`, `dontModify?`): `Promise`\<`string`[] \| `undefined`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:97

##### Parameters

###### pattern

`string`

###### callback?

`undefined`

###### dontModify?

`boolean`

##### Returns

`Promise`\<`string`[] \| `undefined`\>

#### Call Signature

> **getKeys**(`pattern`, `callback`, `dontModify?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:98

##### Parameters

###### pattern

`string`

###### callback

[`GetKeysCallback`](../type-aliases/GetKeysCallback.md)

###### dontModify?

`boolean`

##### Returns

`Promise`\<`void`\>

***

### getProtocolVersion()

> **getProtocolVersion**(): `Promise`\<`string` \| `null`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:126

Returns the protocol version from DB

#### Returns

`Promise`\<`string` \| `null`\>

***

### getSession()

> **getSession**(`id`, `callback`): `Promise`\<`void` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:119

#### Parameters

##### id

`string`

##### callback

(`err`, `session?`) => `void`

#### Returns

`Promise`\<`void` \| `Record`\<`string`, `any`\> \| `null`\>

***

### getState()

#### Call Signature

> **getState**(`id`): [`GetStatePromise`](../type-aliases/GetStatePromise.md)

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:75

##### Parameters

###### id

`string`

##### Returns

[`GetStatePromise`](../type-aliases/GetStatePromise.md)

#### Call Signature

> **getState**(`id`, `callback?`): `Promise`\<`void` \| [`State`](../interfaces/State.md) \| `null` \| `undefined`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:76

##### Parameters

###### id

`string`

###### callback?

(`err`, `state?`) => `void`

##### Returns

`Promise`\<`void` \| [`State`](../interfaces/State.md) \| `null` \| `undefined`\>

***

### getStateAsync()

> **getStateAsync**(`id`): `Promise`\<`void` \| [`State`](../interfaces/State.md) \| `null` \| `undefined`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:82

Promise-version of getState

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`void` \| [`State`](../interfaces/State.md) \| `null` \| `undefined`\>

***

### getStates()

#### Call Signature

> **getStates**(`keys`, `callback?`, `dontModify?`): `Promise`\<([`State`](../interfaces/State.md) \| `null`)[]\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:83

##### Parameters

###### keys

`string`[]

###### callback?

`undefined`

###### dontModify?

`boolean`

##### Returns

`Promise`\<([`State`](../interfaces/State.md) \| `null`)[]\>

#### Call Signature

> **getStates**(`keys`, `callback`, `dontModify?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:84

##### Parameters

###### keys

`string`[]

###### callback

(`err`, `states?`) => `void`

###### dontModify?

`boolean`

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **getStates**(`keys`, `callback`, `dontModify?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:85

##### Parameters

###### keys

`string`[]

###### callback

(`err`, `states?`) => `void`

###### dontModify?

`boolean`

##### Returns

`Promise`\<`void`\>

***

### getStatus()

> **getStatus**(): [`DbStatus`](../interfaces/DbStatus.md)

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:62

#### Returns

[`DbStatus`](../interfaces/DbStatus.md)

***

### pushLog()

> **pushLog**(`id`, `log`, `callback?`): `Promise`\<`string` \| `void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:116

#### Parameters

##### id

`string`

##### log

[`LogMessageInternal`](../type-aliases/LogMessageInternal.md)

##### callback?

(`err`, `id?`) => `void`

#### Returns

`Promise`\<`string` \| `void`\>

***

### pushMessage()

> **pushMessage**(`id`, `message`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:113

#### Parameters

##### id

`string`

##### message

[`SendableMessage`](../interfaces/SendableMessage.md)

#### Returns

`Promise`\<`void`\>

***

### setProtocolVersion()

> **setProtocolVersion**(`version`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:132

Sets the protocol version to the DB

#### Parameters

##### version

`number`

protocol version

#### Returns

`Promise`\<`void`\>

***

### setRawState()

> **setRawState**(`id`, `state`): `Promise`\<`string`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:74

#### Parameters

##### id

`string`

##### state

[`SettableState`](../type-aliases/SettableState.md)

#### Returns

`Promise`\<`string`\>

***

### setSession()

> **setSession**(`id`, `expireS`, `obj`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:120

#### Parameters

##### id

`string`

##### expireS

`number`

##### obj

`Record`\<`string`, `any`\>

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

***

### setState()

#### Call Signature

> **setState**(`id`, `state`): `Promise`\<`string`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:63

##### Parameters

###### id

`string`

###### state

[`SettableState`](../type-aliases/SettableState.md) | [`StateValue`](../type-aliases/StateValue.md)

##### Returns

`Promise`\<`string`\>

#### Call Signature

> **setState**(`id`, `state`, `callback`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:65

##### Parameters

###### id

`string`

###### state

[`SettableState`](../type-aliases/SettableState.md) | [`StateValue`](../type-aliases/StateValue.md)

###### callback

(`err`, `id`) => `void`

##### Returns

`Promise`\<`void`\>

##### Deprecated

migrate to promisified version (without callback)

***

### ~~setStateAsync()~~

> **setStateAsync**(`id`, `state`): `Promise`\<`string`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:73

Promise-version of setState

#### Parameters

##### id

`string`

##### state

[`SettableState`](../type-aliases/SettableState.md) | [`StateValue`](../type-aliases/StateValue.md)

#### Returns

`Promise`\<`string`\>

#### Deprecated

use version without `Async` postfix

***

### subscribe()

#### Call Signature

> **subscribe**(`pattern`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:99

##### Parameters

###### pattern

`string`

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribe**(`pattern`, `asUser`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:100

##### Parameters

###### pattern

`string`

###### asUser

`boolean`

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

***

### subscribeLog()

> **subscribeLog**(`id`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:117

#### Parameters

##### id

`string`

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

***

### subscribeMessage()

> **subscribeMessage**(`id`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:114

#### Parameters

##### id

`string`

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

***

### subscribeUser()

> **subscribeUser**(`pattern`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:105

#### Parameters

##### pattern

`string`

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>

***

### unsubscribe()

#### Call Signature

> **unsubscribe**(`pattern`, `asUser`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:106

##### Parameters

###### pattern

`string`

###### asUser

`boolean`

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribe**(`pattern`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:107

##### Parameters

###### pattern

`string`

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

***

### unsubscribeLog()

> **unsubscribeLog**(`id`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:118

#### Parameters

##### id

`string`

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

***

### unsubscribeMessage()

> **unsubscribeMessage**(`id`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:115

#### Parameters

##### id

`string`

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

***

### unsubscribeUser()

> **unsubscribeUser**(`pattern`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:112

#### Parameters

##### pattern

`string`

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>
