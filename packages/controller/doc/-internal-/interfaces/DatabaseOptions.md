[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DatabaseOptions

# Interface: DatabaseOptions

Defined in: [types-dev/config.d.ts:50](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L50)

Configuration of a database connection (objects or states)

## Extended by

- [`ObjectsDatabaseOptions`](ObjectsDatabaseOptions.md)
- [`StatesDatabaseOptions`](StatesDatabaseOptions.md)

## Properties

### backup

> **backup**: [`DatabaseBackupOptions`](DatabaseBackupOptions.md)

Defined in: [types-dev/config.d.ts:90](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L90)

Backup configuration for the database

***

### connectTimeout

> **connectTimeout**: `number`

Defined in: [types-dev/config.d.ts:60](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L60)

Maximum time in milliseconds to wait for a connection to be established

***

### dataDir?

> `optional` **dataDir?**: `string`

Defined in: [types-dev/config.d.ts:64](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L64)

Directory where the database files are stored, relative to the controller dir

***

### host

> **host**: `string` \| `string`[]

Defined in: [types-dev/config.d.ts:56](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L56)

Host name(s) or IP address(es) of the database server

***

### jsonlOptions

> **jsonlOptions**: [`JsonlOptions`](JsonlOptions.md)

Defined in: [types-dev/config.d.ts:92](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L92)

Options specific to the JSONL database backend

***

### options

> **options**: `object`

Defined in: [types-dev/config.d.ts:66](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L66)

Low-level connection options passed to the database driver

#### auth\_pass

> **auth\_pass**: `string`

Password used to authenticate against the database

#### db

> **db**: `number`

Redis database index to use

#### family

> **family**: `number`

IP stack to use (4 for IPv4, 6 for IPv6)

#### retry\_max\_count

> **retry\_max\_count**: `number`

Maximum number of reconnection attempts

#### retry\_max\_delay

> **retry\_max\_delay**: `number`

Maximum delay in milliseconds between reconnection attempts

#### tls?

> `optional` **tls?**: `object`

As soon as the tls property is defined, redis will try to connect via tls (currently only for redis)

##### tls.ca?

> `optional` **ca?**: `string`

The certificate content

##### tls.cert?

> `optional` **cert?**: `string`

The cert file content

##### tls.key?

> `optional` **key?**: `string`

The key file content

##### tls.rejectUnauthorized?

> `optional` **rejectUnauthorized?**: `boolean`

Needs to be false with self-signed certs

***

### port

> **port**: `number` \| `number`[]

Defined in: [types-dev/config.d.ts:58](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L58)

Port(s) of the database server

***

### sentinelName?

> `optional` **sentinelName?**: `string`

Defined in: [types-dev/config.d.ts:54](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L54)

Name of the sentinel master to connect to

***

### type

> **type**: `"file"` \| `"jsonl"` \| `"redis"`

Defined in: [types-dev/config.d.ts:52](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L52)

Possible values: 'file' - [port 9001], 'jsonl' - [port 9001], 'redis' - [port 6379 or 26379 for sentinel].

***

### writeFileInterval

> **writeFileInterval**: `number`

Defined in: [types-dev/config.d.ts:62](https://github.com/ioBroker/ioBroker.js-controller/blob/61726ea22de3a4f2b7365192167e82e58a398676/packages/types-dev/config.d.ts#L62)

Interval in milliseconds between flushing the in-memory database to file
