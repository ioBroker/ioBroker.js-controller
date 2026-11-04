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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:153

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

#### Call Signature

> **delState**(`id`): `Promise`\<`string` \| `undefined`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:171

Delete a state and publish the deletion

##### Parameters

###### id

`string`

The id of the state to delete

##### Returns

`Promise`\<`string` \| `undefined`\>

#### Call Signature

> **delState**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:178

Delete a state and publish the deletion

##### Parameters

###### id

`string`

The id of the state to delete

###### callback

[`DeleteStateCallback`](../type-aliases/DeleteStateCallback.md)

Callback called with the deleted id

##### Returns

`void`

***

### destroy()

> **destroy**(): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:165

Destructor of the class. Called when shutting down to close the redis connections.

#### Returns

`Promise`\<`void`\>

***

### destroyDB()

#### Call Signature

> **destroyDB**(): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:157

Destroy (delete) all states in the database

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **destroyDB**(`callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:161

##### Parameters

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

cb function to be executed after DB has been destroyed

##### Returns

`void`

***

### destroySession()

#### Call Signature

> **destroySession**(`id`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:387

Destroy (delete) a session by its id

##### Parameters

###### id

`string`

The id of the session to destroy

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **destroySession**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:394

Destroy (delete) a session by its id

##### Parameters

###### id

`string`

The id of the session to destroy

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

***

### getKeys()

#### Call Signature

> **getKeys**(`pattern`, `callback?`, `dontModify?`): `Promise`\<`string`[] \| `undefined`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:186

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

> **getKeys**(`pattern`, `callback`, `dontModify?`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:194

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

`void`

***

### getProtocolVersion()

> **getProtocolVersion**(): `Promise`\<`string` \| `null`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:399

Returns the protocol version from DB

#### Returns

`Promise`\<`string` \| `null`\>

***

### getSession()

#### Call Signature

> **getSession**(`id`): `Promise`\<[`Session`](../type-aliases/Session.md) \| `null`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:357

Get a stored session by its id

##### Parameters

###### id

`string`

The id of the session to read

##### Returns

`Promise`\<[`Session`](../type-aliases/Session.md) \| `null`\>

#### Call Signature

> **getSession**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:364

Get a stored session by its id

##### Parameters

###### id

`string`

The id of the session to read

###### callback

(`err`, `session?`) => `void`

Called with the session object, or null if not found

##### Returns

`void`

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

> **getState**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:126

Get state from database

##### Parameters

###### id

`string`

id of the state

###### callback

(`err`, `state?`) => `void`

optional callback, leave out and use promise return type

##### Returns

`void`

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

> **getStates**(`keys`, `callback`, `dontModify?`): `void`

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

`void`

***

### getStatus()

> **getStatus**(): [`DbStatus`](../interfaces/DbStatus.md)

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:89

Get the current status of the database

#### Returns

[`DbStatus`](../interfaces/DbStatus.md)

***

### pushLog()

#### Call Signature

> **pushLog**(`id`, `log`): `Promise`\<`string`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:317

Push a log message to the given log target

##### Parameters

###### id

`string`

The id of the log target

###### log

[`LogMessageInternal`](../type-aliases/LogMessageInternal.md)

The log message to push

##### Returns

`Promise`\<`string`\>

#### Call Signature

> **pushLog**(`id`, `log`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:325

Push a log message to the given log target

##### Parameters

###### id

`string`

The id of the log target

###### log

[`LogMessageInternal`](../type-aliases/LogMessageInternal.md)

The log message to push

###### callback

(`err`, `id?`) => `void`

Callback called with the generated log id

##### Returns

`void`

***

### pushMessage()

> **pushMessage**(`id`, `message`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:283

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:405

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

#### Call Signature

> **setSession**(`id`, `expireS`, `obj`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:372

Create or update a session and set its expiration

##### Parameters

###### id

`string`

The id of the session

###### expireS

`number`

Expiration time in seconds from now

###### obj

[`Session`](../type-aliases/Session.md)

The session data to store

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **setSession**(`id`, `expireS`, `obj`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:381

Create or update a session and set its expiration

##### Parameters

###### id

`string`

The id of the session

###### expireS

`number`

Expiration time in seconds from now

###### obj

[`Session`](../type-aliases/Session.md)

The session data to store

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

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

> **setState**(`id`, `state`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:98

##### Parameters

###### id

`string`

###### state

[`SettableState`](../type-aliases/SettableState.md) \| [`StateValue`](../type-aliases/StateValue.md)

###### callback

(`err`, `id`) => `void`

##### Returns

`void`

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

> **subscribe**(`pattern`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:200

Subscribe to state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to subscribe to

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribe**(`pattern`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:207

Subscribe to state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to subscribe to

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

#### Call Signature

> **subscribe**(`pattern`, `asUser`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:214

Subscribe to state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to subscribe to

###### asUser

`boolean`

if true it will be subscribed as user

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribe**(`pattern`, `asUser`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:222

Subscribe to state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to subscribe to

###### asUser

`boolean`

if true it will be subscribed as user

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

***

### subscribeLog()

#### Call Signature

> **subscribeLog**(`id`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:331

Subscribe to log messages of the given id

##### Parameters

###### id

`string`

The id of the log target to subscribe to

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribeLog**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:338

Subscribe to log messages of the given id

##### Parameters

###### id

`string`

The id of the log target to subscribe to

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

***

### subscribeMessage()

#### Call Signature

> **subscribeMessage**(`id`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:289

Subscribe to messages sent to the given id

##### Parameters

###### id

`string`

The id of the message box to subscribe to

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribeMessage**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:296

Subscribe to messages sent to the given id

##### Parameters

###### id

`string`

The id of the message box to subscribe to

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

***

### subscribeUser()

#### Call Signature

> **subscribeUser**(`pattern`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:228

Subscribe to state changes matching the given pattern as a user

##### Parameters

###### pattern

`string`

The pattern to subscribe to

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribeUser**(`pattern`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:235

Subscribe to state changes matching the given pattern as a user

##### Parameters

###### pattern

`string`

The pattern to subscribe to

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

***

### unsubscribe()

#### Call Signature

> **unsubscribe**(`pattern`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:241

Unsubscribe from state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to unsubscribe from

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribe**(`pattern`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:248

Unsubscribe from state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to unsubscribe from

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

#### Call Signature

> **unsubscribe**(`pattern`, `asUser`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:255

Unsubscribe from state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to unsubscribe from

###### asUser

`boolean`

if true it will be unsubscribed as user

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribe**(`pattern`, `asUser`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:263

Unsubscribe from state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to unsubscribe from

###### asUser

`boolean`

if true it will be unsubscribed as user

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

***

### unsubscribeLog()

#### Call Signature

> **unsubscribeLog**(`id`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:344

Unsubscribe from log messages of the given id

##### Parameters

###### id

`string`

The id of the log target to unsubscribe from

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribeLog**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:351

Unsubscribe from log messages of the given id

##### Parameters

###### id

`string`

The id of the log target to unsubscribe from

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

***

### unsubscribeMessage()

#### Call Signature

> **unsubscribeMessage**(`id`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:302

Unsubscribe from messages sent to the given id

##### Parameters

###### id

`string`

The id of the message box to unsubscribe from

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribeMessage**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:309

Unsubscribe from messages sent to the given id

##### Parameters

###### id

`string`

The id of the message box to unsubscribe from

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`

***

### unsubscribeUser()

#### Call Signature

> **unsubscribeUser**(`pattern`): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:269

Unsubscribe from state changes matching the given pattern as a user

##### Parameters

###### pattern

`string`

The pattern to unsubscribe from

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribeUser**(`pattern`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:276

Unsubscribe from state changes matching the given pattern as a user

##### Parameters

###### pattern

`string`

The pattern to unsubscribe from

###### callback

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

callback function

##### Returns

`void`
