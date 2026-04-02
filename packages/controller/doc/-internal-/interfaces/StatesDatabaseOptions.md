[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / StatesDatabaseOptions

# Interface: StatesDatabaseOptions

Defined in: [types-dev/config.d.ts:84](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L84)

## Extends

- [`DatabaseOptions`](DatabaseOptions.md)

## Properties

### backup

> **backup**: [`DatabaseBackupOptions`](DatabaseBackupOptions.md)

Defined in: [types-dev/config.d.ts:76](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L76)

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`backup`](DatabaseOptions.md#backup)

***

### connectTimeout

> **connectTimeout**: `number`

Defined in: [types-dev/config.d.ts:55](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L55)

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`connectTimeout`](DatabaseOptions.md#connecttimeout)

***

### dataDir?

> `optional` **dataDir?**: `string`

Defined in: [types-dev/config.d.ts:57](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L57)

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`dataDir`](DatabaseOptions.md#datadir)

***

### host

> **host**: `string` \| `string`[]

Defined in: [types-dev/config.d.ts:53](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L53)

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`host`](DatabaseOptions.md#host)

***

### jsonlOptions

> **jsonlOptions**: [`JsonlOptions`](JsonlOptions.md)

Defined in: [types-dev/config.d.ts:77](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L77)

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`jsonlOptions`](DatabaseOptions.md#jsonloptions)

***

### maxQueue

> **maxQueue**: `number`

Defined in: [types-dev/config.d.ts:86](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L86)

Limit maximum number of log entries in the list (only read by adapter.ts from the config file)

***

### options

> **options**: `object`

Defined in: [types-dev/config.d.ts:58](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L58)

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

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`options`](DatabaseOptions.md#options)

***

### port

> **port**: `number` \| `number`[]

Defined in: [types-dev/config.d.ts:54](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L54)

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`port`](DatabaseOptions.md#port)

***

### sentinelName?

> `optional` **sentinelName?**: `string`

Defined in: [types-dev/config.d.ts:52](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L52)

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`sentinelName`](DatabaseOptions.md#sentinelname)

***

### type

> **type**: `"file"` \| `"jsonl"` \| `"redis"`

Defined in: [types-dev/config.d.ts:51](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L51)

Possible values: 'file' - [port 9001], 'jsonl' - [port 9001], 'redis' - [port 6379 or 26379 for sentinel].

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`type`](DatabaseOptions.md#type)

***

### writeFileInterval

> **writeFileInterval**: `number`

Defined in: [types-dev/config.d.ts:56](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/types-dev/config.d.ts#L56)

#### Inherited from

[`DatabaseOptions`](DatabaseOptions.md).[`writeFileInterval`](DatabaseOptions.md#writefileinterval)
