[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / DatabaseConnectionOptions

# Interface: DatabaseConnectionOptions

Defined in: [types-dev/config.d.ts:49](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L49)

## Properties

### auth\_pass

> **auth\_pass**: `string`

Defined in: [types-dev/config.d.ts:51](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L51)

Password used to authenticate against the database

***

### autoResubscribe?

> `optional` **autoResubscribe?**: `boolean`

Defined in: [types-dev/config.d.ts:104](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L104)

After reconnected, if the previous connection was in the subscriber mode, client will auto re-subscribe these channels.
default: true.

***

### connectionName?

> `optional` **connectionName?**: `string`

Defined in: [types-dev/config.d.ts:79](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L79)

***

### db?

> `optional` **db?**: `number`

Defined in: [types-dev/config.d.ts:87](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L87)

Database index to use.

***

### enableReadyCheck?

> `optional` **enableReadyCheck?**: `boolean`

Defined in: [types-dev/config.d.ts:94](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L94)

When a connection is established to the Redis server, the server might still be loading
the database from disk. While loading, the server not respond to any commands.
To work around this, when this option is true, ioredis will check the status of the Redis server,
and when the Redis server is able to process commands, a ready event will be emitted.

***

### family?

> `optional` **family?**: `number`

Defined in: [types-dev/config.d.ts:74](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L74)

4 (IPv4) or 6 (IPv6), Defaults to 4.

***

### host?

> `optional` **host?**: `string` \| `string`[]

Defined in: [types-dev/config.d.ts:70](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L70)

***

### name?

> `optional` **name?**: `string`

Defined in: [types-dev/config.d.ts:108](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L108)

default: null.

***

### password?

> `optional` **password?**: `string`

Defined in: [types-dev/config.d.ts:83](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L83)

If set, client will send AUTH command with the value of this option when connected.

***

### path?

> `optional` **path?**: `string`

Defined in: [types-dev/config.d.ts:78](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L78)

Local domain socket path. If set the port, host and family will be ignored.

***

### port?

> `optional` **port?**: `number` \| `number`[]

Defined in: [types-dev/config.d.ts:69](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L69)

***

### retry\_max\_count

> **retry\_max\_count**: `number`

Defined in: [types-dev/config.d.ts:55](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L55)

Maximum number of reconnection attempts

***

### retry\_max\_delay?

> `optional` **retry\_max\_delay?**: `number`

Defined in: [types-dev/config.d.ts:53](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L53)

Maximum delay in milliseconds between reconnection attempts

***

### sentinels?

> `optional` **sentinels?**: `object`[]

Defined in: [types-dev/config.d.ts:109](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L109)

#### host

> **host**: `string`

#### port

> **port**: `number`

***

### tls?

> `optional` **tls?**: `object`

Defined in: [types-dev/config.d.ts:57](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L57)

As soon as the tls property is defined, redis will try to connect via tls (currently only for redis)

#### ca?

> `optional` **ca?**: `string`

The certificate content

#### cert?

> `optional` **cert?**: `string`

The cert file content

#### key?

> `optional` **key?**: `string`

The key file content

#### rejectUnauthorized?

> `optional` **rejectUnauthorized?**: `boolean`

Needs to be false with self-signed certs

## Methods

### retryStrategy()?

> `optional` **retryStrategy**(`times`): `number` \| `Error`

Defined in: [types-dev/config.d.ts:99](https://github.com/ioBroker/ioBroker.js-controller/blob/fdfa3f85955579352bce54ed1205ba1bf9a4297a/packages/types-dev/config.d.ts#L99)

When the return value isn't a number, ioredis will stop trying to reconnect.
Fixed in: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/15858

#### Parameters

##### times

`number`

#### Returns

`number` \| `Error`
