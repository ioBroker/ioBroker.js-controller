[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DatabaseOptions

# Interface: DatabaseOptions

## Extended by

- [`ObjectsDatabaseOptions`](ObjectsDatabaseOptions.md)
- [`StatesDatabaseOptions`](StatesDatabaseOptions.md)

## Properties

### backup

> **backup**: [`DatabaseBackupOptions`](DatabaseBackupOptions.md)

#### Defined in

[types-dev/config.d.ts:76](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/config.d.ts#L76)

***

### connectTimeout

> **connectTimeout**: `number`

#### Defined in

[types-dev/config.d.ts:55](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/config.d.ts#L55)

***

### dataDir?

> `optional` **dataDir**: `string`

#### Defined in

[types-dev/config.d.ts:57](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/config.d.ts#L57)

***

### host

> **host**: `string` \| `string`[]

#### Defined in

[types-dev/config.d.ts:53](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/config.d.ts#L53)

***

### jsonlOptions

> **jsonlOptions**: [`JsonlOptions`](JsonlOptions.md)

#### Defined in

[types-dev/config.d.ts:77](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/config.d.ts#L77)

***

### options

> **options**: `object`

#### auth\_pass

> **auth\_pass**: `string`

#### db

> **db**: `number`

#### family

> **family**: `number`

#### retry\_max\_count

> **retry\_max\_count**: `number`

#### retry\_max\_delay

> **retry\_max\_delay**: `number`

#### tls?

> `optional` **tls**: `object`

As soon as the tls property is defined, redis will try to connect via tls (currently only for redis)

#### tls.ca?

> `optional` **ca**: `string`

The certificate content

#### tls.cert?

> `optional` **cert**: `string`

The cert file content

#### tls.key?

> `optional` **key**: `string`

The key file content

#### tls.rejectUnauthorized?

> `optional` **rejectUnauthorized**: `boolean`

Needs to be false with self-signed certs

#### Defined in

[types-dev/config.d.ts:58](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/config.d.ts#L58)

***

### port

> **port**: `number` \| `number`[]

#### Defined in

[types-dev/config.d.ts:54](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/config.d.ts#L54)

***

### sentinelName?

> `optional` **sentinelName**: `string`

#### Defined in

[types-dev/config.d.ts:52](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/config.d.ts#L52)

***

### type

> **type**: `"file"` \| `"jsonl"` \| `"redis"`

Possible values: 'file' - [port 9001], 'jsonl' - [port 9001], 'redis' - [port 6379 or 26379 for sentinel].

#### Defined in

[types-dev/config.d.ts:51](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/config.d.ts#L51)

***

### writeFileInterval

> **writeFileInterval**: `number`

#### Defined in

[types-dev/config.d.ts:56](https://github.com/ioBroker/ioBroker.js-controller/blob/c076985d5f9cb553ad8698e07a8071745c06d4ff/packages/types-dev/config.d.ts#L56)
