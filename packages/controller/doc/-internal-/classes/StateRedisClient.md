[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StateRedisClient

# Class: StateRedisClient

## Constructors

### new StateRedisClient()

> **new StateRedisClient**(`settings`): [`StateRedisClient`](StateRedisClient.md)

#### Parameters

• **settings**: [`StatesSettings`](../interfaces/StatesSettings.md)

#### Returns

[`StateRedisClient`](StateRedisClient.md)

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:55

## Properties

### namespaceMsg

> **namespaceMsg**: `string`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:36

## Methods

### \_destroyDBHelper()

> **\_destroyDBHelper**(`keys`, `callback`?): `Promise`\<`void`\>

#### Parameters

• **keys**: `string`[]

array of keys which will be deleted from db

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

function to be executed after keys have been deleted

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:90

***

### \_determineProtocolVersion()

> **\_determineProtocolVersion**(): `Promise`\<`void`\>

Checks if we are allowed to start and sets the protocol version accordingly

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:60

***

### connectDb()

> **connectDb**(): `void`

#### Returns

`void`

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:61

***

### delState()

> **delState**(`id`, `callback`?): `Promise`\<`undefined` \| `string` \| `void`\>

#### Parameters

• **id**: `string`

• **callback?**: [`DeleteStateCallback`](../type-aliases/DeleteStateCallback.md)

#### Returns

`Promise`\<`undefined` \| `string` \| `void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:96

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:95

***

### destroyDB()

> **destroyDB**(`callback`?): `Promise`\<`void`\>

#### Parameters

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

cb function to be executed after DB has been destroyed

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:94

***

### destroySession()

> **destroySession**(`id`, `callback`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:121

***

### getKeys()

#### getKeys(pattern, callback, dontModify)

> **getKeys**(`pattern`, `callback`?, `dontModify`?): `Promise`\<`undefined` \| `string`[]\>

##### Parameters

• **pattern**: `string`

• **callback?**: `undefined`

• **dontModify?**: `boolean`

##### Returns

`Promise`\<`undefined` \| `string`[]\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:97

#### getKeys(pattern, callback, dontModify)

> **getKeys**(`pattern`, `callback`, `dontModify`?): `Promise`\<`void`\>

##### Parameters

• **pattern**: `string`

• **callback**: [`GetKeysCallback`](../type-aliases/GetKeysCallback.md)

• **dontModify?**: `boolean`

##### Returns

`Promise`\<`void`\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:98

***

### getProtocolVersion()

> **getProtocolVersion**(): `Promise`\<`null` \| `string`\>

Returns the protocol version from DB

#### Returns

`Promise`\<`null` \| `string`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:126

***

### getSession()

> **getSession**(`id`, `callback`): `Promise`\<`null` \| `void` \| `Record`\<`string`, `any`\>\>

#### Parameters

• **id**: `string`

• **callback**

#### Returns

`Promise`\<`null` \| `void` \| `Record`\<`string`, `any`\>\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:119

***

### getState()

#### getState(id)

> **getState**(`id`): [`GetStatePromise`](../type-aliases/GetStatePromise.md)

##### Parameters

• **id**: `string`

##### Returns

[`GetStatePromise`](../type-aliases/GetStatePromise.md)

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:75

#### getState(id, callback)

> **getState**(`id`, `callback`?): `Promise`\<`undefined` \| `null` \| `void` \| [`State`](../interfaces/State.md)\>

##### Parameters

• **id**: `string`

• **callback?**

##### Returns

`Promise`\<`undefined` \| `null` \| `void` \| [`State`](../interfaces/State.md)\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:76

***

### getStateAsync()

> **getStateAsync**(`id`): `Promise`\<`undefined` \| `null` \| `void` \| [`State`](../interfaces/State.md)\>

Promise-version of getState

#### Parameters

• **id**: `string`

#### Returns

`Promise`\<`undefined` \| `null` \| `void` \| [`State`](../interfaces/State.md)\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:82

***

### getStates()

#### getStates(keys, callback, dontModify)

> **getStates**(`keys`, `callback`?, `dontModify`?): `Promise`\<(`null` \| [`State`](../interfaces/State.md))[]\>

##### Parameters

• **keys**: `string`[]

• **callback?**: `undefined`

• **dontModify?**: `boolean`

##### Returns

`Promise`\<(`null` \| [`State`](../interfaces/State.md))[]\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:83

#### getStates(keys, callback, dontModify)

> **getStates**(`keys`, `callback`, `dontModify`?): `Promise`\<`void`\>

##### Parameters

• **keys**: `string`[]

• **callback**

• **dontModify?**: `boolean`

##### Returns

`Promise`\<`void`\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:84

#### getStates(keys, callback, dontModify)

> **getStates**(`keys`, `callback`, `dontModify`?): `Promise`\<`void`\>

##### Parameters

• **keys**: `string`[]

• **callback**

• **dontModify?**: `boolean`

##### Returns

`Promise`\<`void`\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:85

***

### getStatus()

> **getStatus**(): [`DbStatus`](../interfaces/DbStatus.md)

#### Returns

[`DbStatus`](../interfaces/DbStatus.md)

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:62

***

### pushLog()

> **pushLog**(`id`, `log`, `callback`?): `Promise`\<`string` \| `void`\>

#### Parameters

• **id**: `string`

• **log**: [`LogMessageInternal`](../type-aliases/LogMessageInternal.md)

• **callback?**

#### Returns

`Promise`\<`string` \| `void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:116

***

### pushMessage()

> **pushMessage**(`id`, `message`): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **message**: [`SendableMessage`](../interfaces/SendableMessage.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:113

***

### setProtocolVersion()

> **setProtocolVersion**(`version`): `Promise`\<`void`\>

Sets the protocol version to the DB

#### Parameters

• **version**: `number`

protocol version

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:132

***

### setRawState()

> **setRawState**(`id`, `state`): `Promise`\<`string`\>

#### Parameters

• **id**: `string`

• **state**: [`SettableState`](../type-aliases/SettableState.md)

#### Returns

`Promise`\<`string`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:74

***

### setSession()

> **setSession**(`id`, `expireS`, `obj`, `callback`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **expireS**: `number`

• **obj**: `Record`\<`string`, `any`\>

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:120

***

### setState()

#### setState(id, state)

> **setState**(`id`, `state`): `Promise`\<`string`\>

##### Parameters

• **id**: `string`

• **state**: [`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

##### Returns

`Promise`\<`string`\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:63

#### setState(id, state, callback)

> **setState**(`id`, `state`, `callback`): `Promise`\<`void`\>

##### Parameters

• **id**: `string`

• **state**: [`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

• **callback**

##### Returns

`Promise`\<`void`\>

##### Deprecated

migrate to promisified version (without callback)

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:65

***

### ~~setStateAsync()~~

> **setStateAsync**(`id`, `state`): `Promise`\<`string`\>

Promise-version of setState

#### Parameters

• **id**: `string`

• **state**: [`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

#### Returns

`Promise`\<`string`\>

#### Deprecated

use version without `Async` postfix

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:73

***

### subscribe()

#### subscribe(pattern, callback)

> **subscribe**(`pattern`, `callback`?): `Promise`\<`void`\>

##### Parameters

• **pattern**: `string`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:99

#### subscribe(pattern, asUser, callback)

> **subscribe**(`pattern`, `asUser`, `callback`?): `Promise`\<`void`\>

##### Parameters

• **pattern**: `string`

• **asUser**: `boolean`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:100

***

### subscribeLog()

> **subscribeLog**(`id`, `callback`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:117

***

### subscribeMessage()

> **subscribeMessage**(`id`, `callback`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:114

***

### subscribeUser()

> **subscribeUser**(`pattern`, `callback`?): `Promise`\<`void`\>

#### Parameters

• **pattern**: `string`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:105

***

### unsubscribe()

#### unsubscribe(pattern, asUser, callback)

> **unsubscribe**(`pattern`, `asUser`, `callback`?): `Promise`\<`void`\>

##### Parameters

• **pattern**: `string`

• **asUser**: `boolean`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:106

#### unsubscribe(pattern, callback)

> **unsubscribe**(`pattern`, `callback`?): `Promise`\<`void`\>

##### Parameters

• **pattern**: `string`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`Promise`\<`void`\>

##### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:107

***

### unsubscribeLog()

> **unsubscribeLog**(`id`, `callback`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:118

***

### unsubscribeMessage()

> **unsubscribeMessage**(`id`, `callback`?): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:115

***

### unsubscribeUser()

> **unsubscribeUser**(`pattern`, `callback`?): `Promise`\<`void`\>

#### Parameters

• **pattern**: `string`

• **callback?**: [`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>

#### Defined in

db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:112
