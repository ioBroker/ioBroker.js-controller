[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ConnectionOptions

# Interface: ConnectionOptions

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:11

Options describing how to connect to the database server

## Extended by

- [`RedisConnectionOptions`](RedisConnectionOptions.md)

## Properties

### backup?

> `optional` **backup?**: [`BackupOptions`](BackupOptions.md)

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:25

Backup configuration

***

### dataDir?

> `optional` **dataDir?**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:27

relative path to the data dir

***

### enhancedLogging?

> `optional` **enhancedLogging?**: `boolean`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:23

Enable more verbose connection logging

***

### host

> **host**: `string` \| `string`[]

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:17

array on sentinel

***

### options

> **options**: `Record`\<`string`, `any`\>

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:21

Additional connection options passed to the database driver

***

### pass?

> `optional` **pass?**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:13

Password for authentication, if required

***

### port

> **port**: `number` \| `number`[]

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:19

array on sentinel

***

### sentinelName?

> `optional` **sentinelName?**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:15

Name of the sentinel master to connect to
