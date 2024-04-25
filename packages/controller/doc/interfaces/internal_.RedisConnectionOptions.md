[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / RedisConnectionOptions

# Interface: RedisConnectionOptions

[\<internal\>](../modules/internal_.md).RedisConnectionOptions

## Hierarchy

- [`ConnectionOptions`](internal_.ConnectionOptions.md)

  ↳ **`RedisConnectionOptions`**

## Table of contents

### Properties

- [backup](internal_.RedisConnectionOptions.md#backup)
- [dataDir](internal_.RedisConnectionOptions.md#datadir)
- [enhancedLogging](internal_.RedisConnectionOptions.md#enhancedlogging)
- [host](internal_.RedisConnectionOptions.md#host)
- [maxQueue](internal_.RedisConnectionOptions.md#maxqueue)
- [options](internal_.RedisConnectionOptions.md#options)
- [pass](internal_.RedisConnectionOptions.md#pass)
- [port](internal_.RedisConnectionOptions.md#port)
- [redisNamespace](internal_.RedisConnectionOptions.md#redisnamespace)
- [sentinelName](internal_.RedisConnectionOptions.md#sentinelname)

## Properties

### backup

• `Optional` **backup**: [`BackupOptions`](internal_.BackupOptions.md)

#### Inherited from

[ConnectionOptions](internal_.ConnectionOptions.md).[backup](internal_.ConnectionOptions.md#backup)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:20

___

### dataDir

• **dataDir**: `string`

relative path to the data dir

#### Inherited from

[ConnectionOptions](internal_.ConnectionOptions.md).[dataDir](internal_.ConnectionOptions.md#datadir)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:22

___

### enhancedLogging

• `Optional` **enhancedLogging**: `boolean`

#### Inherited from

[ConnectionOptions](internal_.ConnectionOptions.md).[enhancedLogging](internal_.ConnectionOptions.md#enhancedlogging)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:19

___

### host

• **host**: `string` \| `string`[]

array on sentinel

#### Inherited from

[ConnectionOptions](internal_.ConnectionOptions.md).[host](internal_.ConnectionOptions.md#host)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:14

___

### maxQueue

• `Optional` **maxQueue**: `number`

#### Inherited from

[ConnectionOptions](internal_.ConnectionOptions.md).[maxQueue](internal_.ConnectionOptions.md#maxqueue)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:18

___

### options

• **options**: `Record`\<`string`, `any`\>

#### Inherited from

[ConnectionOptions](internal_.ConnectionOptions.md).[options](internal_.ConnectionOptions.md#options)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:17

___

### pass

• `Optional` **pass**: `string`

#### Inherited from

[ConnectionOptions](internal_.ConnectionOptions.md).[pass](internal_.ConnectionOptions.md#pass)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:11

___

### port

• **port**: `number` \| `number`[]

array on sentinel

#### Inherited from

[ConnectionOptions](internal_.ConnectionOptions.md).[port](internal_.ConnectionOptions.md#port)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:16

___

### redisNamespace

• `Optional` **redisNamespace**: `string`

#### Defined in

db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:8

___

### sentinelName

• `Optional` **sentinelName**: `string`

#### Inherited from

[ConnectionOptions](internal_.ConnectionOptions.md).[sentinelName](internal_.ConnectionOptions.md#sentinelname)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:12
