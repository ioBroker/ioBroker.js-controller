[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DatabaseOptions

# Interface: DatabaseOptions

Defined in: [types-dev/config.d.ts:113](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L113)

Configuration of a database connection (objects or states)

## Extended by

- [`ObjectsDatabaseOptions`](ObjectsDatabaseOptions.md)
- [`StatesDatabaseOptions`](StatesDatabaseOptions.md)

## Properties

### backup

> **backup**: [`DatabaseBackupOptions`](DatabaseBackupOptions.md)

Defined in: [types-dev/config.d.ts:131](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L131)

Backup configuration for the database

***

### connectTimeout

> **connectTimeout**: `number`

Defined in: [types-dev/config.d.ts:123](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L123)

Maximum time in milliseconds to wait for a connection to be established

***

### dataDir?

> `optional` **dataDir?**: `string`

Defined in: [types-dev/config.d.ts:127](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L127)

Directory where the database files are stored, relative to the controller dir

***

### host

> **host**: `string` \| `string`[]

Defined in: [types-dev/config.d.ts:119](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L119)

Host name(s) or IP address(es) of the database server

***

### jsonlOptions

> **jsonlOptions**: [`JsonlOptions`](JsonlOptions.md)

Defined in: [types-dev/config.d.ts:133](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L133)

Options specific to the JSONL database backend

***

### options

> **options**: [`DatabaseConnectionOptions`](DatabaseConnectionOptions.md)

Defined in: [types-dev/config.d.ts:129](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L129)

Low-level connection options passed to the database driver

***

### port

> **port**: `number` \| `number`[]

Defined in: [types-dev/config.d.ts:121](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L121)

Port(s) of the database server

***

### sentinelName?

> `optional` **sentinelName?**: `string`

Defined in: [types-dev/config.d.ts:117](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L117)

Name of the sentinel master to connect to

***

### type

> **type**: `"file"` \| `"jsonl"` \| `"redis"`

Defined in: [types-dev/config.d.ts:115](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L115)

Possible values: 'file' - [port 9001], 'jsonl' - [port 9001], 'redis' - [port 6379 or 26379 for sentinel].

***

### writeFileInterval

> **writeFileInterval**: `number`

Defined in: [types-dev/config.d.ts:125](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/types-dev/config.d.ts#L125)

Interval in milliseconds between flushing the in-memory database to file
