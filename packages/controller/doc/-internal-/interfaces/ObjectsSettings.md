[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ObjectsSettings

# Interface: ObjectsSettings

## Properties

### autoConnect?

> `optional` **autoConnect**: `boolean`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:17

***

### change?

> `optional` **change**: [`ChangeFunction`](../type-aliases/ChangeFunction.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:14

***

### changeFileUser?

> `optional` **changeFileUser**: [`FileChangeHandler`](../type-aliases/FileChangeHandler.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:16

***

### changeUser?

> `optional` **changeUser**: [`ChangeFunction`](../type-aliases/ChangeFunction.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:15

***

### connected()

> **connected**: () => `void`

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:10

***

### connection

> **connection**: [`RedisConnectionOptions`](RedisConnectionOptions.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:24

***

### controller?

> `optional` **controller**: `boolean`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:11

***

### defaultNewAcl?

> `optional` **defaultNewAcl**: [`ACLObject`](ACLObject.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:21

***

### disconnected()?

> `optional` **disconnected**: () => `void`

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:13

***

### hostname?

> `optional` **hostname**: `string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:19

***

### logger

> **logger**: [`InternalLogger`](../type-aliases/InternalLogger.md)

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:18

***

### metaNamespace?

> `optional` **metaNamespace**: `string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:22

***

### namespace?

> `optional` **namespace**: `string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:20

***

### primaryHostLost()?

> `optional` **primaryHostLost**: () => `void`

#### Returns

`void`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:12

***

### redisNamespace?

> `optional` **redisNamespace**: `string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:23
