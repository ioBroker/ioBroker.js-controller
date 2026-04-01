[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RedisConnectionOptions

# Interface: RedisConnectionOptions

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:6

## Extends

- [`ConnectionOptions`](ConnectionOptions.md)

## Properties

### backup?

> `optional` **backup**: [`BackupOptions`](BackupOptions.md)

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:19

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`backup`](ConnectionOptions.md#backup)

***

### dataDir?

> `optional` **dataDir**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:21

relative path to the data dir

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`dataDir`](ConnectionOptions.md#datadir)

***

### enhancedLogging?

> `optional` **enhancedLogging**: `boolean`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:18

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`enhancedLogging`](ConnectionOptions.md#enhancedlogging)

***

### host

> **host**: `string` \| `string`[]

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:14

array on sentinel

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`host`](ConnectionOptions.md#host)

***

### options

> **options**: `Record`\<`string`, `any`\>

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:17

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`options`](ConnectionOptions.md#options)

***

### pass?

> `optional` **pass**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:11

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`pass`](ConnectionOptions.md#pass)

***

### port

> **port**: `number` \| `number`[]

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:16

array on sentinel

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`port`](ConnectionOptions.md#port)

***

### redisNamespace?

> `optional` **redisNamespace**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:7

***

### sentinelName?

> `optional` **sentinelName**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:12

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`sentinelName`](ConnectionOptions.md#sentinelname)
