[@iobroker/js-controller-adapter](../README.md) / [Exports](../modules.md) / [\<internal\>](../modules/internal_.md) / ConnectionOptions

# Interface: ConnectionOptions

[\<internal\>](../modules/internal_.md).ConnectionOptions

## Hierarchy

- **`ConnectionOptions`**

  ↳ [`RedisConnectionOptions`](internal_.RedisConnectionOptions.md)

## Table of contents

### Properties

- [backup](internal_.ConnectionOptions.md#backup)
- [dataDir](internal_.ConnectionOptions.md#datadir)
- [enhancedLogging](internal_.ConnectionOptions.md#enhancedlogging)
- [host](internal_.ConnectionOptions.md#host)
- [maxQueue](internal_.ConnectionOptions.md#maxqueue)
- [options](internal_.ConnectionOptions.md#options)
- [pass](internal_.ConnectionOptions.md#pass)
- [port](internal_.ConnectionOptions.md#port)
- [sentinelName](internal_.ConnectionOptions.md#sentinelname)

## Properties

### backup

• `Optional` **backup**: [`BackupOptions`](internal_.BackupOptions.md)

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:20

___

### dataDir

• **dataDir**: `string`

relative path to the data dir

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:22

___

### enhancedLogging

• `Optional` **enhancedLogging**: `boolean`

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:19

___

### host

• **host**: `string` \| `string`[]

array on sentinel

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:14

___

### maxQueue

• `Optional` **maxQueue**: `number`

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:18

___

### options

• **options**: `Record`\<`string`, `any`\>

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:17

___

### pass

• `Optional` **pass**: `string`

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:11

___

### port

• **port**: `number` \| `number`[]

array on sentinel

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:16

___

### sentinelName

• `Optional` **sentinelName**: `string`

#### Defined in

db-base/build/esm/lib/inMemFileDB.d.ts:12
