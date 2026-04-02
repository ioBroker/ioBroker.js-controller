[**@iobroker/js-controller-adapter**](../../README.md)

***

[@iobroker/js-controller-adapter](../../globals.md) / [\<internal\>](../README.md) / Log

# Class: Log

Defined in: [adapter/src/lib/adapter/log.ts:8](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/log.ts#L8)

Log class for adapter.js

It prefixes every message with the given namespace

## Implements

- [`Logger`](../interfaces/Logger.md)

## Constructors

### Constructor

> **new Log**(`namespaceLog`, `level`, `logger`): `Log`

Defined in: [adapter/src/lib/adapter/log.ts:25](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/log.ts#L25)

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

Defined in: [adapter/src/lib/adapter/log.ts:10](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/log.ts#L10)

Verbosity of the log output

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`level`](../interfaces/Logger.md#level)

## Methods

### debug()

> **debug**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/log.ts:45](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/log.ts#L45)

log a message with debug level

#### Parameters

##### msg

`string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`debug`](../interfaces/Logger.md#debug)

***

### error()

> **error**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/log.ts:53](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/log.ts#L53)

log a message with error severity

#### Parameters

##### msg

`string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`error`](../interfaces/Logger.md#error)

***

### info()

> **info**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/log.ts:49](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/log.ts#L49)

log a message with info level (default output level for all adapters)

#### Parameters

##### msg

`string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`info`](../interfaces/Logger.md#info)

***

### silly()

> **silly**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/log.ts:41](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/log.ts#L41)

log a message with silly level

#### Parameters

##### msg

`string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`silly`](../interfaces/Logger.md#silly)

***

### warn()

> **warn**(`msg`): `void`

Defined in: [adapter/src/lib/adapter/log.ts:57](https://github.com/ioBroker/ioBroker.js-controller/blob/93ef165ef84e6ce31045ad6cc46ece0914bfee18/packages/adapter/src/lib/adapter/log.ts#L57)

log a message with warning severity

#### Parameters

##### msg

`string`

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`warn`](../interfaces/Logger.md#warn)
