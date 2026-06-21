[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectsSettings

# Interface: ObjectsSettings

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:10

Settings for the objects database client

## Properties

### autoConnect?

> `optional` **autoConnect?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:26

Whether to connect to the database immediately (default true)

***

### change?

> `optional` **change?**: [`ChangeFunction`](../type-aliases/ChangeFunction-1.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:20

Handler for system-level object changes

***

### changeFileUser?

> `optional` **changeFileUser?**: [`FileChangeHandler`](../type-aliases/FileChangeHandler.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:24

Handler for user-level file changes

***

### changeUser?

> `optional` **changeUser?**: [`ChangeFunction`](../type-aliases/ChangeFunction-1.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:22

Handler for user-level object changes

***

### connected

> **connected**: () => `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:12

Called once the client is connected

#### Returns

`void`

***

### connection

> **connection**: [`RedisConnectionOptions`](RedisConnectionOptions.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:40

Connection options for the redis server

***

### controller?

> `optional` **controller?**: `boolean`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:14

Whether this client runs inside the controller

***

### defaultNewAcl?

> `optional` **defaultNewAcl?**: [`ACLObject`](ACLObject.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:34

Default ACL applied to newly created objects

***

### disconnected?

> `optional` **disconnected?**: () => `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:18

Called when the client gets disconnected

#### Returns

`void`

***

### hostname?

> `optional` **hostname?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:30

Name of this host

***

### logger

> **logger**: [`InternalLogger`](../type-aliases/InternalLogger.md)

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:28

Logger instance to use

***

### metaNamespace?

> `optional` **metaNamespace?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:36

Namespace used for meta information

***

### namespace?

> `optional` **namespace?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:32

Namespace of this client

***

### primaryHostLost?

> `optional` **primaryHostLost?**: () => `void`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:16

Called when the connection to the primary host is lost

#### Returns

`void`

***

### redisNamespace?

> `optional` **redisNamespace?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:38

Redis key prefix (defaults to "cfg")
