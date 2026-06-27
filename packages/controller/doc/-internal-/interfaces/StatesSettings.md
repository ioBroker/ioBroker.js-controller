[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StatesSettings

# Interface: StatesSettings

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:15

Settings for the states database client

## Properties

### autoConnect?

> `optional` **autoConnect?**: `boolean`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:27

Whether to connect to the database immediately (default true)

***

### change?

> `optional` **change?**: [`ChangeFunction`](../type-aliases/ChangeFunction.md)

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:23

Handler for system-level state and message changes

***

### changeUser?

> `optional` **changeUser?**: [`UserChangeFunction`](../type-aliases/UserChangeFunction.md)

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:21

Handler for user-level state changes

***

### connected?

> `optional` **connected?**: () => `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:17

Called once the client is connected

#### Returns

`void`

***

### connection

> **connection**: [`ConnectionOptions`](ConnectionOptions.md)

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:25

Connection options for the redis server

***

### disconnected?

> `optional` **disconnected?**: () => `void`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:19

Called when the client gets disconnected

#### Returns

`void`

***

### hostname?

> `optional` **hostname?**: `string`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:31

Name of this host

***

### logger?

> `optional` **logger?**: [`InternalLogger`](../type-aliases/InternalLogger.md)

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:29

Logger instance to use

***

### metaNamespace?

> `optional` **metaNamespace?**: `string`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:35

Namespace used for meta information

***

### namespace?

> `optional` **namespace?**: `string`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:33

Namespace of this client

***

### namespaceLog?

> `optional` **namespaceLog?**: `string`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:39

Namespace used for log messages

***

### namespaceMsg?

> `optional` **namespaceMsg?**: `string`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:41

Namespace used for the message box

***

### namespaceSession?

> `optional` **namespaceSession?**: `string`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:37

Namespace used for sessions

***

### redisNamespace?

> `optional` **redisNamespace?**: `string`

Defined in: db-states-redis/build/esm/lib/states/statesInRedisClient.d.ts:43

Redis key prefix (defaults to "io")
