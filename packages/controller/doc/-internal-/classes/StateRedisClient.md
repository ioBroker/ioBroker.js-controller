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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:158

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:176

Delete a state and publish the deletion

##### Parameters

###### id

`string`

The id of the state to delete

##### Returns

`Promise`\<`string` \| `undefined`\>

#### Call Signature

> **delState**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:183

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:170

Destructor of the class. Called when shutting down to close the redis connections.

#### Returns

`Promise`\<`void`\>

***

### destroyDB()

#### Call Signature

> **destroyDB**(): `Promise`\<`void`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:162

Destroy (delete) all states in the database

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **destroyDB**(`callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:166

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:392

Destroy (delete) a session by its id

##### Parameters

###### id

`string`

The id of the session to destroy

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **destroySession**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:399

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:191

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:199

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:404

Returns the protocol version from DB

#### Returns

`Promise`\<`string` \| `null`\>

***

### getSession()

#### Call Signature

> **getSession**(`id`): `Promise`\<[`Session`](../type-aliases/Session.md) \| `null`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:362

Get a stored session by its id

##### Parameters

###### id

`string`

The id of the session to read

##### Returns

`Promise`\<[`Session`](../type-aliases/Session.md) \| `null`\>

#### Call Signature

> **getSession**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:369

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:124

Get state from database

##### Parameters

###### id

`string`

id of the state

##### Returns

[`GetStatePromise`](../type-aliases/GetStatePromise.md)

#### Call Signature

> **getState**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:131

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:137

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:145

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:153

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:94

Get the current status of the database

#### Returns

[`DbStatus`](../interfaces/DbStatus.md)

***

### pushLog()

#### Call Signature

> **pushLog**(`id`, `log`): `Promise`\<`string`\>

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:322

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:330

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:288

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:410

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:118

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:377

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:386

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:101

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:103

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:111

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:205

Subscribe to state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to subscribe to

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribe**(`pattern`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:212

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:219

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:227

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:336

Subscribe to log messages of the given id

##### Parameters

###### id

`string`

The id of the log target to subscribe to

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribeLog**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:343

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:294

Subscribe to messages sent to the given id

##### Parameters

###### id

`string`

The id of the message box to subscribe to

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribeMessage**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:301

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:233

Subscribe to state changes matching the given pattern as a user

##### Parameters

###### pattern

`string`

The pattern to subscribe to

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **subscribeUser**(`pattern`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:240

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:246

Unsubscribe from state changes matching the given pattern

##### Parameters

###### pattern

`string`

The pattern to unsubscribe from

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribe**(`pattern`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:253

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:260

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:268

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:349

Unsubscribe from log messages of the given id

##### Parameters

###### id

`string`

The id of the log target to unsubscribe from

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribeLog**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:356

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:307

Unsubscribe from messages sent to the given id

##### Parameters

###### id

`string`

The id of the message box to unsubscribe from

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribeMessage**(`id`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:314

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

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:274

Unsubscribe from state changes matching the given pattern as a user

##### Parameters

###### pattern

`string`

The pattern to unsubscribe from

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **unsubscribeUser**(`pattern`, `callback`): `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:281

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
