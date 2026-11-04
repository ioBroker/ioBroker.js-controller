[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / ConnectionOptions

# Interface: ConnectionOptions

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:23

Options describing how to connect to the database server

## Extended by

- [`RedisConnectionOptions`](RedisConnectionOptions.md)

## Properties

### backup?

> `optional` **backup?**: [`BackupOptions`](BackupOptions.md)

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:45

Backup configuration

***

### dataDir?

> `optional` **dataDir?**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:47

relative path to the data dir

***

### enhancedLogging?

> `optional` **enhancedLogging?**: `boolean`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:39

Enable more verbose connection logging

***

### host

> **host**: `string` \| `string`[]

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:29

array on sentinel

***

### jsonlOptions?

> `optional` **jsonlOptions?**: [`JsonlOptions`](JsonlOptions.md)

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:35

Options forwarded to the JSONL database backend

***

### noFileCache?

> `optional` **noFileCache?**: `boolean`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:41

Disable the in-memory file cache and always read files from disk

***

### options

> **options**: [`DatabaseConnectionOptions`](DatabaseConnectionOptions.md)

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:33

Additional connection options passed to the database driver

***

### pass?

> `optional` **pass?**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:25

Password for authentication, if required

***

### port

> **port**: `number` \| `number`[]

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:31

array on sentinel

***

### redisNamespace?

> `optional` **redisNamespace?**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:37

Redis key prefix used by the in-memory server

***

### secure?

> `optional` **secure?**: `boolean`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:43

Whether the connection should be secured via TLS

***

### sentinelName?

> `optional` **sentinelName?**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:27

Name of the sentinel master to connect to

***

### writeFileInterval?

> `optional` **writeFileInterval?**: `number`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:49

Interval in milliseconds in which the in-memory states are persisted to disk
