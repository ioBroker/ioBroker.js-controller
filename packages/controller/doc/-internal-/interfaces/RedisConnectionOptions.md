[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RedisConnectionOptions

# Interface: RedisConnectionOptions

## Extends

- [`ConnectionOptions`](ConnectionOptions.md)

## Properties

### backup?

> `optional` **backup**: [`BackupOptions`](BackupOptions.md)

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`backup`](ConnectionOptions.md#backup)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:19

***

### dataDir?

> `optional` **dataDir**: `string`

relative path to the data dir

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`dataDir`](ConnectionOptions.md#datadir)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:21

***

### enhancedLogging?

> `optional` **enhancedLogging**: `boolean`

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`enhancedLogging`](ConnectionOptions.md#enhancedlogging)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:18

***

### host

> **host**: `string` \| `string`[]

array on sentinel

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`host`](ConnectionOptions.md#host)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:14

***

### options

> **options**: `Record`\<`string`, `any`\>

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`options`](ConnectionOptions.md#options)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:17

***

### pass?

> `optional` **pass**: `string`

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`pass`](ConnectionOptions.md#pass)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:11

***

### port

> **port**: `number` \| `number`[]

array on sentinel

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`port`](ConnectionOptions.md#port)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:16

***

### redisNamespace?

> `optional` **redisNamespace**: `string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:7

***

### sentinelName?

> `optional` **sentinelName**: `string`

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`sentinelName`](ConnectionOptions.md#sentinelname)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:12
