[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Log

# Class: Log

Defined in: [adapter/src/lib/adapter/log.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/adapter/log.ts#L8)

Log class for adapter.js

It prefixes every message with the given namespace

## Implements

- [`Logger`](../interfaces/Logger.md)

## Constructors

### Constructor

> **new Log**(`namespaceLog`, `level`, `logger`): `Log`

Defined in: [adapter/src/lib/adapter/log.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/adapter/log.ts#L25)

#### Parameters

##### namespaceLog

`string`

Logging namespace to prefix

##### level

[`LogLevel`](../type-aliases/LogLevel.md)

The log level

##### logger

`any`

logger instance

#### Returns

`Log`

## Properties

### level

> `readonly` **level**: [`LogLevel`](../type-aliases/LogLevel.md)

Defined in: [adapter/src/lib/adapter/log.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/adapter/log.ts#L10)

Verbosity of the log output

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`level`](../interfaces/Logger.md#level)

## Methods

### debug()

> **debug**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/log.ts:55](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/adapter/log.ts#L55)

Log a message at the debug level, prefixed with the adapter namespace

#### Parameters

##### msg

`string`

the message to log

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`debug`](../interfaces/Logger.md#debug)

***

### error()

> **error**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/log.ts:73](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/adapter/log.ts#L73)

Log a message at the error level, prefixed with the adapter namespace

#### Parameters

##### msg

`string`

the message to log

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`error`](../interfaces/Logger.md#error)

***

### info()

> **info**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/log.ts:64](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/adapter/log.ts#L64)

Log a message at the info level, prefixed with the adapter namespace

#### Parameters

##### msg

`string`

the message to log

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`info`](../interfaces/Logger.md#info)

***

### silly()

> **silly**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/log.ts:46](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/adapter/log.ts#L46)

Log a message at the silly level, prefixed with the adapter namespace

#### Parameters

##### msg

`string`

the message to log

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`silly`](../interfaces/Logger.md#silly)

***

### warn()

> **warn**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/log.ts:82](https://github.com/ioBroker/ioBroker.js-controller/blob/7709d5328469497cdfdd530667d5ad433c01ada0/packages/adapter/src/lib/adapter/log.ts#L82)

Log a message at the warn level, prefixed with the adapter namespace

#### Parameters

##### msg

`string`

the message to log

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`warn`](../interfaces/Logger.md#warn)
