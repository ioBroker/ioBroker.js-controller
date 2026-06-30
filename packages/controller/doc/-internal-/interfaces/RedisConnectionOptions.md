[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / RedisConnectionOptions

# Interface: RedisConnectionOptions

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:7

Options describing how to connect to the database server

## Extends

- [`ConnectionOptions`](ConnectionOptions.md)

## Properties

### backup?

> `optional` **backup?**: [`BackupOptions`](BackupOptions.md)

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:45

Backup configuration

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`backup`](ConnectionOptions.md#backup)

***

### dataDir?

> `optional` **dataDir?**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:47

relative path to the data dir

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`dataDir`](ConnectionOptions.md#datadir)

***

### enhancedLogging?

> `optional` **enhancedLogging?**: `boolean`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:39

Enable more verbose connection logging

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`enhancedLogging`](ConnectionOptions.md#enhancedlogging)

***

### host

> **host**: `string` \| `string`[]

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:29

array on sentinel

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`host`](ConnectionOptions.md#host)

***

### jsonlOptions?

> `optional` **jsonlOptions?**: [`JsonlOptions`](JsonlOptions.md)

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:35

Options forwarded to the JSONL database backend

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`jsonlOptions`](ConnectionOptions.md#jsonloptions)

***

### noFileCache?

> `optional` **noFileCache?**: `boolean`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:41

Disable the in-memory file cache and always read files from disk

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`noFileCache`](ConnectionOptions.md#nofilecache)

***

### options

> **options**: [`DatabaseConnectionOptions`](DatabaseConnectionOptions.md)

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:33

Additional connection options passed to the database driver

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`options`](ConnectionOptions.md#options)

***

### pass?

> `optional` **pass?**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:25

Password for authentication, if required

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`pass`](ConnectionOptions.md#pass)

***

### port

> **port**: `number` \| `number`[]

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:31

array on sentinel

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`port`](ConnectionOptions.md#port)

***

### redisNamespace?

> `optional` **redisNamespace?**: `string`

Defined in: db-objects-redis/build/esm/lib/objects/objectsInRedisClient.d.ts:8

Redis key prefix used by the in-memory server

#### Overrides

[`ConnectionOptions`](ConnectionOptions.md).[`redisNamespace`](ConnectionOptions.md#redisnamespace)

***

### secure?

> `optional` **secure?**: `boolean`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:43

Whether the connection should be secured via TLS

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`secure`](ConnectionOptions.md#secure)

***

### sentinelName?

> `optional` **sentinelName?**: `string`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:27

Name of the sentinel master to connect to

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`sentinelName`](ConnectionOptions.md#sentinelname)

***

### writeFileInterval?

> `optional` **writeFileInterval?**: `number`

Defined in: db-base/build/esm/lib/inMemFileDB.d.ts:49

Interval in milliseconds in which the in-memory states are persisted to disk

#### Inherited from

[`ConnectionOptions`](ConnectionOptions.md).[`writeFileInterval`](ConnectionOptions.md#writefileinterval)
