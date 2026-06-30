[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StatesDatabaseOptions

# Interface: StatesDatabaseOptions

Defined in: [types-dev/config.d.ts:143](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L143)

Configuration of the states database connection

## Extends

- [`DatabaseOptions`](DatabaseOptions.md)

## Properties

### backup

> **backup**: [`DatabaseBackupOptions`](DatabaseBackupOptions.md)

Defined in: [types-dev/config.d.ts:131](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L131)

Backup configuration for the database

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`backup`](DatabaseOptions.md#backup)

***

### connectTimeout

> **connectTimeout**: `number`

Defined in: [types-dev/config.d.ts:123](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L123)

Maximum time in milliseconds to wait for a connection to be established

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`connectTimeout`](DatabaseOptions.md#connecttimeout)

***

### dataDir?

> `optional` **dataDir?**: `string`

Defined in: [types-dev/config.d.ts:127](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L127)

Directory where the database files are stored, relative to the controller dir

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`dataDir`](DatabaseOptions.md#datadir)

***

### host

> **host**: `string` \| `string`[]

Defined in: [types-dev/config.d.ts:119](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L119)

Host name(s) or IP address(es) of the database server

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`host`](DatabaseOptions.md#host)

***

### jsonlOptions

> **jsonlOptions**: [`JsonlOptions`](JsonlOptions.md)

Defined in: [types-dev/config.d.ts:133](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L133)

Options specific to the JSONL database backend

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`jsonlOptions`](DatabaseOptions.md#jsonloptions)

***

### maxQueue

> **maxQueue**: `number`

Defined in: [types-dev/config.d.ts:145](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L145)

Limit maximum number of log entries in the list (only read by adapter.ts from the config file)

***

### options

> **options**: [`DatabaseConnectionOptions`](DatabaseConnectionOptions.md)

Defined in: [types-dev/config.d.ts:129](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L129)

Low-level connection options passed to the database driver

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`options`](DatabaseOptions.md#options)

***

### port

> **port**: `number` \| `number`[]

Defined in: [types-dev/config.d.ts:121](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L121)

Port(s) of the database server

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`port`](DatabaseOptions.md#port)

***

### sentinelName?

> `optional` **sentinelName?**: `string`

Defined in: [types-dev/config.d.ts:117](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L117)

Name of the sentinel master to connect to

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`sentinelName`](DatabaseOptions.md#sentinelname)

***

### type

> **type**: `"file"` \| `"jsonl"` \| `"redis"`

Defined in: [types-dev/config.d.ts:115](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L115)

Possible values: 'file' - [port 9001], 'jsonl' - [port 9001], 'redis' - [port 6379 or 26379 for sentinel].

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`type`](DatabaseOptions.md#type)

***

### writeFileInterval

> **writeFileInterval**: `number`

Defined in: [types-dev/config.d.ts:125](https://github.com/ioBroker/ioBroker.js-controller/blob/0b31cfcb0a3320f2dd617abef69dfbed9328e49b/packages/types-dev/config.d.ts#L125)

Interval in milliseconds between flushing the in-memory database to file

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`writeFileInterval`](DatabaseOptions.md#writefileinterval)
