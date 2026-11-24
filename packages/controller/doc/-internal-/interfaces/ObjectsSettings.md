[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectsSettings

# Interface: ObjectsSettings

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:11

Settings for the objects database client

## Properties

### autoConnect?

> `optional` **autoConnect?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:34

Whether to connect to the database immediately (default true)

***

### change?

> `optional` **change?**: [`ChangeFunction`](../type-aliases/ChangeFunction-1.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:28

Handler for system-level object changes

***

### changeFileUser?

> `optional` **changeFileUser?**: [`FileChangeHandler`](../type-aliases/FileChangeHandler.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:32

Handler for user-level file changes

***

### changeUser?

> `optional` **changeUser?**: [`ChangeFunction`](../type-aliases/ChangeFunction-1.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:30

Handler for user-level object changes

***

### connected

> **connected**: () => `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:13

Called once the client is connected

#### Returns

`void`

***

### connection

> **connection**: [`RedisConnectionOptions`](RedisConnectionOptions.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:48

Connection options for the redis server

***

### controller?

> `optional` **controller?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:15

Whether this client runs inside the controller

***

### defaultNewAcl?

> `optional` **defaultNewAcl?**: [`ACLObject`](ACLObject.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:42

Default ACL applied to newly created objects

***

### disconnected?

> `optional` **disconnected?**: () => `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:19

Called when the client gets disconnected

#### Returns

`void`

***

### fence?

> `optional` **fence?**: () => `Promise`\<`boolean`\>

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:24

Adapters only: from a lost connection until this resolves true, commands and subscription replays are held.
If it resolves false, nothing held is sent.

#### Returns

`Promise`\<`boolean`\>

***

### hostname?

> `optional` **hostname?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:38

Name of this host

***

### logger

> **logger**: [`InternalLogger`](../type-aliases/InternalLogger.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:36

Logger instance to use

***

### metaNamespace?

> `optional` **metaNamespace?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:44

Namespace used for meta-information

***

### namespace?

> `optional` **namespace?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:40

Namespace of this client

***

### primaryHostLost?

> `optional` **primaryHostLost?**: () => `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:17

Called when the connection to the primary host is lost

#### Returns

`void`

***

### redisNamespace?

> `optional` **redisNamespace?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:46

Redis key prefix (defaults to "cfg")

***

### resubscribed?

> `optional` **resubscribed?**: () => `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:26

Called after the system subscriptions were restored on a reconnect, events of the gap may be lost

#### Returns

`void`
