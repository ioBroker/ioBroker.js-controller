[**@iobroker/js-controller-adapter**](../../README.md) • **Docs**

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StatesDatabaseOptions

# Interface: StatesDatabaseOptions

## Extends

- [`DatabaseOptions`](DatabaseOptions.md)

## Properties

### // type

> **// type**: `string`

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`// type`](DatabaseOptions.md#/%20type)

#### Defined in

[types-dev/config.d.ts:52](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L52)

***

### backup

> **backup**: [`DatabaseBackupOptions`](DatabaseBackupOptions.md)

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`backup`](DatabaseOptions.md#backup)

#### Defined in

[types-dev/config.d.ts:76](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L76)

***

### connectTimeout

> **connectTimeout**: `number`

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`connectTimeout`](DatabaseOptions.md#connecttimeout)

#### Defined in

[types-dev/config.d.ts:55](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L55)

***

### dataDir

> **dataDir**: `string`

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`dataDir`](DatabaseOptions.md#datadir)

#### Defined in

[types-dev/config.d.ts:57](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L57)

***

### host

> **host**: `string`

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`host`](DatabaseOptions.md#host)

#### Defined in

[types-dev/config.d.ts:53](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L53)

***

### jsonlOptions

> **jsonlOptions**: [`JsonlOptions`](JsonlOptions.md)

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`jsonlOptions`](DatabaseOptions.md#jsonloptions)

#### Defined in

[types-dev/config.d.ts:77](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L77)

***

### maxQueue

> **maxQueue**: `number`

Limit maximum number of log entries in the list (only read by adapter.ts from the config file)

#### Defined in

[types-dev/config.d.ts:86](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L86)

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

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`options`](DatabaseOptions.md#options)

#### Defined in

[types-dev/config.d.ts:58](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L58)

***

### port

> **port**: `number`

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`port`](DatabaseOptions.md#port)

#### Defined in

[types-dev/config.d.ts:54](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L54)

***

### type

> **type**: `"file"` \| `"jsonl"` \| `"redis"`

Possible values: 'file' - [port 9001], 'jsonl' - [port 9001], 'redis' - [port 6379 or 26379 for sentinel].

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`type`](DatabaseOptions.md#type)

#### Defined in

[types-dev/config.d.ts:51](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L51)

***

### writeFileInterval

> **writeFileInterval**: `number`

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`writeFileInterval`](DatabaseOptions.md#writefileinterval)

#### Defined in

[types-dev/config.d.ts:56](https://github.com/ioBroker/ioBroker.js-controller/blob/5cf8c0f8f818a3bd00a8d0bf4c2516676b695603/packages/types-dev/config.d.ts#L56)
