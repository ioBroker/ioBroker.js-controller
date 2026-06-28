[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StateRedisClient

# Class: StateRedisClient

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:50

Client for the states database backed by Redis (or the in-memory redis-protocol server)

## Constructors

### Constructor

> **new StateRedisClient**(`settings`): `StateRedisClient`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:76

#### Parameters

##### settings

[`StatesSettings`](../interfaces/StatesSettings.md)

Settings for the states client including connection and namespaces

#### Returns

`StateRedisClient`

## Methods

### \_destroyDBHelper()

> **\_destroyDBHelper**(`keys`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:161

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:81

Checks if we are allowed to start and sets the protocol version accordingly

#### Returns

`Promise`\<`void`\>

***

### connectDb()

> **connectDb**(): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:85

Connect to the states database and set up the change and message subscriptions

#### Returns

`void`

***

### delState()

> **delState**(`id`, `callback?`): `Promise`\<`string` \| `void` \| `undefined`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:176

Delete a state and publish the deletion

#### Parameters

##### id

`string`

The id of the state to delete

##### callback?

[`DeleteStateCallback`](../type-aliases/DeleteStateCallback.md)

Optional callback called with the deleted id

#### Returns

`Promise`\<`string` \| `void` \| `undefined`\>

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:169

Destructor of the class. Called when shutting down to close the redis connections.

#### Returns

`Promise`\<`void`\>

***

### destroyDB()

> **destroyDB**(`callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:165

#### Parameters

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

cb function to be executed after DB has been destroyed

#### Returns

`Promise`\<`void`\>

***

### destroySession()

> **destroySession**(`id`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:302

Destroy (delete) a session by its id

#### Parameters

##### id

`string`

The id of the session to destroy

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>

***

### getKeys()

#### Call Signature

> **getKeys**(`pattern`, `callback?`, `dontModify?`): `Promise`\<`string`[] \| `undefined`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:184

Get all state ids matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to match state ids against

###### callback?

`undefined`

Optional callback, leave out and use the promise return type

###### dontModify?

`boolean`

If true, the returned keys are not stripped of the namespace

##### Returns

`Promise`\<`string`[] \| `undefined`\>

#### Call Signature

> **getKeys**(`pattern`, `callback`, `dontModify?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:192

Get all state ids matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to match state ids against

###### callback

[`GetKeysCallback`](../type-aliases/GetKeysCallback.md)

Callback called with the matching keys

###### dontModify?

`boolean`

If true, the returned keys are not stripped of the namespace

##### Returns

`Promise`\<`void`\>

***

### getProtocolVersion()

> **getProtocolVersion**(): `Promise`\<`string` \| `null`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:307

Returns the protocol version from DB

#### Returns

`Promise`\<`string` \| `null`\>

***

### getSession()

> **getSession**(`id`, `callback`): `Promise`\<`void` \| [`Session`](../type-aliases/Session.md) \| `null`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:286

Get a stored session by its id

#### Parameters

##### id

`string`

The id of the session to read

##### callback

(`err`, `session?`) => `void`

Called with the session object, or null if not found

#### Returns

`Promise`\<`void` \| [`Session`](../type-aliases/Session.md) \| `null`\>

***

### getState()

#### Call Signature

> **getState**(`id`): [`GetStatePromise`](../type-aliases/GetStatePromise.md)

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:119

Get state from database

##### Parameters

###### id

`string`

id of the state

##### Returns

[`GetStatePromise`](../type-aliases/GetStatePromise.md)

#### Call Signature

> **getState**(`id`, `callback?`): `Promise`\<`void` \| [`State`](../interfaces/State.md) \| `null` \| `undefined`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:126

Get state from database

##### Parameters

###### id

`string`

id of the state

###### callback?

(`err`, `state?`) => `void`

optional callback, leave out and use promise return type

##### Returns

`Promise`\<`void` \| [`State`](../interfaces/State.md) \| `null` \| `undefined`\>

***

### getStateAsync()

> **getStateAsync**(`id`): `Promise`\<`void` \| [`State`](../interfaces/State.md) \| `null` \| `undefined`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:132

Promise-version of getState

#### Parameters

##### id

`string`

id of the state to get

#### Returns

`Promise`\<`void` \| [`State`](../interfaces/State.md) \| `null` \| `undefined`\>

***

### getStates()

#### Call Signature

> **getStates**(`keys`, `callback?`, `dontModify?`): `Promise`\<([`State`](../interfaces/State.md) \| `null`)[]\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:140

Get the values of multiple states

##### Parameters

###### keys

`string`[]

The ids of the states to read

###### callback?

`undefined`

Optional callback, leave out and use the promise return type

###### dontModify?

`boolean`

If true, the returned states are not cloned/modified

##### Returns

`Promise`\<([`State`](../interfaces/State.md) \| `null`)[]\>

#### Call Signature

> **getStates**(`keys`, `callback`, `dontModify?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:148

Get the values of multiple states

##### Parameters

###### keys

`string`[]

The ids of the states to read

###### callback

(`err`, `states?`) => `void`

Callback called with the read states

###### dontModify?

`boolean`

If true, the returned states are not cloned/modified

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **getStates**(`keys`, `callback`, `dontModify?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:156

Get the values of multiple states

##### Parameters

###### keys

`string`[]

The ids of the states to read

###### callback

(`err`, `states?`) => `void`

Callback called with the read states

###### dontModify?

`boolean`

If true, the returned states are not cloned/modified

##### Returns

`Promise`\<`void`\>

***

### getStatus()

> **getStatus**(): [`DbStatus`](../interfaces/DbStatus.md)

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:89

Get the current status of the database

#### Returns

[`DbStatus`](../interfaces/DbStatus.md)

***

### pushLog()

> **pushLog**(`id`, `log`, `callback?`): `Promise`\<`string` \| `void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:265

Push a log message to the given log target

#### Parameters

##### id

`string`

The id of the log target

##### log

[`LogMessageInternal`](../type-aliases/LogMessageInternal.md)

The log message to push

##### callback?

(`err`, `id?`) => `void`

Optional callback called with the generated log id

#### Returns

`Promise`\<`string` \| `void`\>

***

### pushMessage()

> **pushMessage**(`id`, `message`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:243

Push a message into the message box of the given id

#### Parameters

##### id

`string`

The id of the message box owner

##### message

[`SendableMessage`](../interfaces/SendableMessage.md)

The message to push

#### Returns

`Promise`\<`void`\>

***

### setProtocolVersion()

> **setProtocolVersion**(`version`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:313

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:113

Directly set the raw stored value of a state without publishing a change (used for restore, do not call it)

#### Parameters

##### id

`string`

The id of the state to set

##### state

[`SettableState`](../type-aliases/SettableState.md)

The raw state object to store

#### Returns

`Promise`\<`string`\>

***

### setSession()

> **setSession**(`id`, `expireS`, `obj`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:295

Create or update a session and set its expiration

#### Parameters

##### id

`string`

The id of the session

##### expireS

`number`

Expiration time in seconds from now

##### obj

[`Session`](../type-aliases/Session.md)

The session data to store

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>

***

### setState()

#### Call Signature

> **setState**(`id`, `state`): `Promise`\<`string`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:96

Set the value of a state

##### Parameters

###### id

`string`

The id of the state to set

###### state

[`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

The value (or full state object) to set

##### Returns

`Promise`\<`string`\>

#### Call Signature

> **setState**(`id`, `state`, `callback`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:98

##### Parameters

###### id

`string`

###### state

[`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

###### callback

(`err`, `id`) => `void`

##### Returns

`Promise`\<`void`\>

##### Deprecated

migrate to promisified version (without callback)

***

### ~~setStateAsync()~~

> **setStateAsync**(`id`, `state`): `Promise`\<`string`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:106

Promise-version of setState

#### Parameters

##### id

`string`

The id of the state to set

##### state

[`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

The value (or full state object) to set

#### Returns

`Promise`\<`string`\>

#### Deprecated

use version without `Async` postfix

***

### subscribe()

#### Call Signature

> **subscribe**(`pattern`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:199

Subscribe to state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to subscribe to

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribe**(`pattern`, `asUser`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:207

Subscribe to state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to subscribe to

###### asUser

`boolean`

if true it will be subscribed as user

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

##### Returns

`Promise`\<`void`\>

***

### subscribeLog()

> **subscribeLog**(`id`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:272

Subscribe to log messages of the given id

#### Parameters

##### id

`string`

The id of the log target to subscribe to

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>

***

### subscribeMessage()

> **subscribeMessage**(`id`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:250

Subscribe to messages sent to the given id

#### Parameters

##### id

`string`

The id of the message box to subscribe to

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>

***

### subscribeUser()

> **subscribeUser**(`pattern`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:214

Subscribe to state changes matching the given pattern as a user

#### Parameters

##### pattern

`string`

The pattern to subscribe to

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>

***

### unsubscribe()

#### Call Signature

> **unsubscribe**(`pattern`, `asUser`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:222

Unsubscribe from state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to unsubscribe from

###### asUser

`boolean`

if true it will be unsubscribed as user

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribe**(`pattern`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:229

Unsubscribe from state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to unsubscribe from

###### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

##### Returns

`Promise`\<`void`\>

***

### unsubscribeLog()

> **unsubscribeLog**(`id`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:279

Unsubscribe from log messages of the given id

#### Parameters

##### id

`string`

The id of the log target to unsubscribe from

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>

***

### unsubscribeMessage()

> **unsubscribeMessage**(`id`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:257

Unsubscribe from messages sent to the given id

#### Parameters

##### id

`string`

The id of the message box to unsubscribe from

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>

***

### unsubscribeUser()

> **unsubscribeUser**(`pattern`, `callback?`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:236

Unsubscribe from state changes matching the given pattern as a user

#### Parameters

##### pattern

`string`

The pattern to unsubscribe from

##### callback?

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function (optional)

#### Returns

`Promise`\<`void`\>
